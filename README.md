<div align="center">
  <img src="https://res.cloudinary.com/dgxxrnmkt/image/upload/v1741509088/MagnetDrop_Logo-removebg-preview_1_oleubc.png" alt="MagnetDrop Logo" width="250" height="250" />
</div>

# MagnetDrop - Secure P2P File Sharing

![Powered by Render](https://img.shields.io/badge/Powered%20by-Render-blue?style=for-the-badge)

![WebTorrent](https://img.shields.io/badge/WebTorrent-P2P-red?style=for-the-badge) ![WebRTC](https://img.shields.io/badge/WebRTC-RealTime-blue?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)

MagnetDrop is a peer-to-peer (P2P) file-sharing service that allows users to share files instantly using WebTorrent technology. Unlike traditional cloud storage, files are **never uploaded to a server**—they are streamed **directly between users**.

## Features
- **No Server Storage:** Files are not stored on any central server.
- **P2P Streaming:** Uses WebTorrent for real-time file sharing.
- **Instant Sharing:** Share large files instantly without waiting for uploads.
- **No Registration Required:** Users can share files without creating an account.
- **Auto Expiry:** Files disappear once the sender closes their browser.

## How It Works
1. **User A selects a file** to share.
2. **A magnet link is generated** and shared with User B.
3. **User B clicks the link** to start downloading the file directly from User A.
4. **Files are transferred in real-time** using WebRTC-based WebTorrent.
5. **Once the sender leaves, the file becomes unavailable.**

## FAQ
### 1. Does MagnetDrop use the torrent network?
Yes, it uses WebTorrent, which allows file sharing using **torrent-like** technology but without public trackers.

### 2. Can anyone download my file?
No, only people with the **magnet link** can access the file. Once the sender closes the browser, the file is no longer accessible.

### 3. How does MagnetDrop transmit files?
Files are **split into small chunks** and transmitted **directly between peers** via WebRTC, enabling real-time streaming.

### 4. Is there any risk of file leakage?
No, files are **not discoverable** on public torrent networks. However, **anyone with the magnet link can access it**, so share links cautiously.

### 5. What happens if I close my browser?
If you are the only seeder, the file becomes **unavailable**. If others are downloading it, they may continue seeding it.

## Comparison with Other Services
| Feature          | MagnetDrop | FilePizza | Wormhole | Send Anywhere |
|-----------------|------------|-----------|----------|---------------|
| Uses WebTorrent | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| P2P Sharing     | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Encryption      | ❌ No  | ❌ No  | ✅ Yes | ✅ Yes |
| File Expiry     | ⏳ 1 min | ❌ No | ✅ 24 hrs | ✅ Temporary |

## Future Improvements
- ✅ Implement **end-to-end encryption** for enhanced security.
- ✅ Add **password-protected links** for safer sharing.
- ✅ Enable **multi-peer support** for better performance.

## Installation
### Clone the Repository
```sh
git clone https://github.com/blackXploit/MagnetDrop.git
cd MagnetDrop
```

### Install Dependencies
```sh
npm install
```

### Run the Application
```sh
node server
```

## License
This project is open-source under the MIT License.

