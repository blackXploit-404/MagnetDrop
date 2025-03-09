const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let fileLinks = {};

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10, 
    message: "Too many requests, please try again later.",
});

app.use(express.static("public"));
app.use("/share", limiter); 


function generateShortID() {
    return crypto.randomBytes(3).toString("hex");
}


function isValidMagnet(magnet) {
    return /^magnet:\?xt=urn:[a-z0-9]+:[a-zA-Z0-9]{32,}/.test(magnet);
}


wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "share") {
                if (!isValidMagnet(data.magnet)) {
                    ws.send(JSON.stringify({ type: "error", message: "Invalid magnet link" }));
                    return;
                }

                const shortID = generateShortID();
                fileLinks[shortID] = data.magnet;

                setTimeout(() => {
                    delete fileLinks[shortID];
                }, 1 * 60 * 1000);

                ws.send(JSON.stringify({ type: "shortURL", url: `http://localhost:3000/share/${shortID}` }));
            }
        } catch (error) {
            ws.send(JSON.stringify({ type: "error", message: "Invalid request format" }));
        }
    });
});

app.get("/share/:id", (req, res) => {
    const shortID = req.params.id;
    if (fileLinks[shortID]) {
        res.redirect(`/?magnet=${encodeURIComponent(fileLinks[shortID])}`);
    } else {
        res.status(404).send("File not found or expired");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
