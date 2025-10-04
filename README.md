<div align="center">
  <img src="https://res.cloudinary.com/dgxxrnmkt/image/upload/v1741509088/MagnetDrop_Logo-removebg-preview_1_oleubc.png" alt="MagnetDrop Logo" width="250" height="250" />
</div>

# MagnetDrop - Secure P2P File Sharing

![Powered by Render](https://img.shields.io/badge/Powered%20by-Render-blue?style=for-the-badge)

![WebTorrent](https://img.shields.io/badge/WebTorrent-P2P-red?style=for-the-badge) ![WebRTC](https://img.shields.io/badge/WebRTC-RealTime-blue?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)

<video width="400" controls>
  <source src="https://res.cloudinary.com/dgxxrnmkt/video/upload/v1759586888/video_20251003_232624_edit-2_hjtfp9.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> 

A lightweight, privacy-focused web app for **instant, ephemeral P2P file sharing** using magnet links. Share audio, videos, images, or any files peer-to-peer without uploading to servers—links auto-expire in 1 minute for zero traces. Built with Node.js, Express, and WebSockets for real-time magic.

**Why MagnetDrop?** In a world of bloated cloud services, MagnetDrop keeps it simple: Select files client-side, generate a torrent magnet, share a short URL, and let P2P do the rest. Perfect for quick, secure drops like a video clip in a chat or a photo album that vanishes fast.

## 🚀 Features

- **Client-Side Magnet Generation**: Choose files (audio, video, images, etc.)—no server uploads; bundles multiples into one magnet.
- **Ultra-Ephemeral Links**: Short URLs expire in 60 seconds—in-memory storage means no logs or persistence.
- **Real-Time Sharing**: WebSockets for instant responses—no page reloads.
- **Smart Validation & Safety**: Regex checks magnets; rate-limited (10/min) to prevent spam.
- **P2P-Ready**: Recipients get the full magnet for direct torrent streaming in apps like qBittorrent or uTorrent.
- **Media-Optimized**: Handles audio/video/images seamlessly; unlimited size via torrents.
- **Self-Hostable**: Runs locally or on free platforms like Render.

**Pro Tip**: For playlists or folders, select multiple files—they bundle into a single share.

## 📖 How It Works

MagnetDrop is a "spark" for P2P torrents: It generates and shortens magnet links client-side, then serves them temporarily via a Node.js server. The real transfer? Pure peer-to-peer—no central storage.

### Step-by-Step Flow

1. **Setup & Connect**: Open `index.html` in your browser—it auto-connects to the WebSocket server (`ws://localhost:3000`).
2. **Select Files**: Use the "Choose Files" button to pick media (e.g., MP4 video, MP3 audio, JPG images). The frontend (via libraries like WebTorrent) creates a magnet link locally—no data leaves your device.
3. **Share Instantly**: Click "Share"—WebSocket sends the magnet to the server for validation.
4. **Get Short Link**: Server generates a random 6-char ID (e.g., `/share/a1b2c3`), stores it in a Map with 1-min expiry, and replies with the URL.
5. **Distribute**: Copy the short URL and send it (e.g., via chat). It works locally or deployed.
6. **Recipient Retrieves**: They visit the URL—server redirects to `/?magnet=...` (encoded), auto-opening the magnet in their torrent client for P2P download/stream.
7. **Auto-Cleanup**: After 1 minute, the link 404s ("File not found or expired"). No traces—restart the server, and it's all gone.

### Tech Stack
- **Backend**: Node.js + Express (HTTP), `ws` (WebSockets), `crypto` (ID gen), `express-rate-limit` (safety).
- **Frontend**: Static HTML/JS with file input; inferred WebTorrent for magnet creation (add via CDN for full support).
- **Storage**: In-memory `Map`—ephemeral by design.
- **Ports**: Defaults to 3000; env var `PORT` for deployment.

**Behind the Scenes Diagram** (Text-Based):

```
[User Browser] --WebSocket--> [Node Server (Map: ID -> {magnet, expiry})]
  |                                       |
  v                                       v
[File Select] -> [Generate Magnet] -> [Validate & Shorten] -> [Short URL]
  |                                                                 |
  v                                                                 v
[Copy/Share]                                                  [Visit -> Redirect to Magnet -> P2P in Torrent App]
  |                                                                 |
  └─────────────── 1-min Timeout ───────────────┘                  └────────────── Seeder Online ───────────────┘
```

## 🛠️ Installation & Setup

1. **Prerequisites**: Node.js (v18+).
2. **Clone/Setup**:
   ```
   clone the repo  
   cd magnetdrop
   npm init -y
   npm install express ws crypto express-rate-limit
   ```
3. **Run**:
   ```
   node server.js
   ```
   - Server starts on `http://localhost:3000`.
   - Open in browser: Loads `public/index.html`.
4. **Deploy**: Push to Render/Vercel—set `PORT` env. Uncomment production URL in `server.js`.

**Note**: Add WebTorrent CDN to `index.html` for client-side magnet gen:
```html
<script src="https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"></script>
```

## 📱 Usage

- **Sharing**: Load page → Choose files → Share → Copy URL.
- **Receiving**: Paste URL → Auto-redirects to magnet → Open in torrent client.
- **Customization**: Edit `LINK_EXPIRY_TIME` in `server.js` for longer expiry.

**Edge Cases**:
- Invalid magnet? Error via WebSocket.
- Expired? 404 page.
- Offline? Fallback to HTTP for retrieval.

## 🤝 Comparisons with Other Services

MagnetDrop's niche: **Magnet-based, 1-min ephemeral P2P**—beats others for traceless media shares. Quick 2025 snapshot:

| Feature              | MagnetDrop                  | FilePizza                  | Send Anywhere             | ShareDrop                 | ToffeeShare               | Wormhole                  |
|----------------------|-----------------------------|----------------------------|---------------------------|---------------------------|---------------------------|---------------------------|
| **P2P Method**      | Torrent magnets (client)   | WebRTC torrents            | Key-based P2P/relay       | WebRTC local              | E2E encrypted P2P         | E2E links (P2P optional)  |
| **Expiry**          | 1 min (ultra-short)        | None (manual)              | Up to 48 hrs              | One-time                  | Custom/password           | 1 day (self-destruct)     |
| **File Size**       | Unlimited                  | Unlimited                  | Unlimited                 | Unlimited (network)       | Unlimited                 | 10 GB free                |
| **Privacy**         | In-memory; no logs         | Direct P2P; encrypted      | Encrypted access          | Encrypted                 | E2E; no server            | Zero-knowledge            |
| **Upload?**         | No (client-only)           | No                         | No (P2P)                  | No                        | No                        | No                        |
| **Pricing**         | Free (open-source)         | Free                       | Free/Pro $5.99/mo         | Free                      | Free                      | Free/Teams $10/mo         |
| **Best For**        | Quick torrent media        | Browser torrents           | Cross-device              | Local drops               | Password temp files       | Secure one-offs           |

**Insights**: MagnetDrop wins on privacy speed (faster than FilePizza's handshakes). Use Send Anywhere for global reliability; ToffeeShare for flexible expiry.

## ❓ FAQ

- **Supports audio/video/images?** Yes—client-side magnet bundles them for P2P streaming.
- **Why 1-min expiry?** For max privacy; tweak `LINK_EXPIRY_TIME` for more.
- **Big files?** Unlimited—torrents handle it; you seed while they download.
- **Secure?** Random IDs, validation, no storage—but magnets are public, so share wisely.
- **Link expires mid-download?** Short URL dies, but full magnet persists via P2P if you're seeding.
- **Run it?** See Installation; needs torrent client for receiving.


**Why Choose It?** Zero-overhead P2P "burner links"—fast, free, and forgettable. Tired of upload waits? This is your spark.

## 🤝 Contributing

Fork, tweak, PR! Issues welcome.


---

*Built with ❤️  for you. Questions? Open an issue or hit the GitHub star! 🌟*

