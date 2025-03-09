const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const fileLinks = new Map(); // Stores short IDs with magnet links

const LINK_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes (adjust as needed)

// Rate limiter to prevent abuse
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 10, // Limit each IP to 10 requests per window
    message: "Too many requests, please try again later.",
});

app.use(express.static("public"));
app.use("/share", limiter);

// Generate a short random ID for the magnet link
function generateShortID() {
    return crypto.randomBytes(3).toString("hex");
}

// Validate magnet links properly
function isValidMagnet(magnet) {
    return /^magnet:\?xt=urn:[a-z0-9]+:[a-zA-Z0-9]{20,}/.test(magnet);
}

// WebSocket connection
wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "share") {
                if (!isValidMagnet(data.magnet)) {
                    ws.send(JSON.stringify({ type: "error", message: "Invalid magnet link" }));
                    return;
                }

                const shortID = generateShortID();
                fileLinks.set(shortID, {
                    magnet: data.magnet,
                    expiresAt: Date.now() + LINK_EXPIRY_TIME
                });

                // Send short URL back to the client
                ws.send(JSON.stringify({ type: "shortURL", url: `https://magnetdrop.onrender.com/share/${shortID}` }));

                // Schedule automatic deletion
                setTimeout(() => {
                    fileLinks.delete(shortID);
                    console.log(`Deleted expired link: ${shortID}`);
                }, LINK_EXPIRY_TIME);
            }
        } catch (error) {
            ws.send(JSON.stringify({ type: "error", message: "Invalid request format" }));
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

// Endpoint to retrieve magnet link
app.get("/share/:id", (req, res) => {
    const shortID = req.params.id;
    const linkData = fileLinks.get(shortID);

    if (linkData && Date.now() < linkData.expiresAt) {
        res.redirect(`/?magnet=${encodeURIComponent(linkData.magnet)}`);
    } else {
        res.status(404).send("File not found or expired");
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
