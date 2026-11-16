# NetScope — AI-Driven Network Traffic Analysis & Forensic PCAP Platform

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12%2B-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20Tactical%20HUD-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Scapy](https://img.shields.io/badge/Engine-Scapy%20PcapReader-red?style=flat)](https://scapy.net)
[![Deploy on Render](https://img.shields.io/badge/Deploy-Render%20Web%20Service-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Author: ARK](https://img.shields.io/badge/Author-ARK-00ff88?style=flat&logo=github)](https://github.com/T-ARK)

**NetScope** is an advanced, research-grade network forensics and intelligent packet inspection platform engineered for cybersecurity professionals, SOC operators, and network security researchers. Built on a tactical cyberpunk / HUD design system, it delivers deep packet inspection, bidirectional 5-tuple flow reconstruction, a 14-rule heuristic threat hunting engine, interactive HTML5 canvas network topology graphs, and explainable AI (XAI) anomaly detection.

---

## Architecture Overview

```
                          ┌────────────────────────┐
                          │   Client Web Browser   │
                          │   Tactical HUD (SPA)   │
                          └───────────┬────────────┘
                                      │
                         HTTP / REST  │  Proxy / Static
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │            FastAPI Unified Server                │
             │   - Security & Magic Byte Validation             │
             │   - Static Asset / SPA Serving (Render)          │
             │   - Health Probes (/health)                      │
             └────────────┬─────────────────────────┬───────────┘
                          │                         │
                          ▼                         ▼
             ┌─────────────────────────┐  ┌─────────────────────┐
             │ Streaming Engine        │  │ Forensics Pipeline  │
             │ - Scapy PcapReader      │  │ - 14-Rule Matrix    │
             │ - Low-Memory Generator  │  │ - Flow Constructor  │
             │ - Tempfile Isolation    │  │ - XAI Anomaly Score │
             └─────────────────────────┘  └─────────────────────┘
```

---

## Key Capabilities

- **Streaming Packet Dissection:** Uses generator-based `PcapReader` streams to parse PCAP and PCAPNG captures with bounded memory overhead.
- **Strict Ingestion Security:** Performs byte-level magic header inspection (`0xd4c3b2a1`, `0xa1b2c3d4`, `0x0a0d0d0a`) before reading payloads, rejecting corrupted or malicious uploads.
- **14-Rule Heuristic Threat Engine:** Real-time evaluation matrix flagging SYN floods, ACK scans, NULL/XMAS probes, DNS tunneling heuristics, high-port persistence, and cleartext credential transmissions.
- **Dynamic Network Topology Graph:** Canvas-rendered, interactive node graph that automatically renders top endpoints and communication edges from live capture telemetry.
- **5-Tuple Flow Reconstruction:** Automatic grouping of packet frames into bidirectional flows identified by `(Source IP, Source Port, Dest IP, Dest Port, Protocol)`.
- **Explainable AI Anomaly Detection:** Machine-learning pipeline using Isolation Forest and Random Forest diagnostics with SHAP-interpretable decision boundaries.
- **Unified Single-Service Deployment:** Preconfigured to serve the compiled React SPA and FastAPI backend from a single port on Render or Docker containers.

---

## 17 Tactical Forensics Modules

| Module | Identifier | Purpose |
| :--- | :--- | :--- |
| **Telemetry Dash** | `dashboard` | Executive summary, protocol gauges, top hosts, and frame dissector |
| **PCAP Ingestion** | `upload` | Secure drag-and-drop file ingestion with instant previous-state flushing |
| **Capture Logs** | `history` | Session upload history and previous analysis metadata |
| **Frame Dissector** | `packets` | Wireshark-style tabular packet dissector with protocol filtering |
| **Flow Matrix** | `flows` | 5-tuple bidirectional network flow reconstruction |
| **Host Targets** | `hosts` | Endpoint volume analysis, talker ranking, and IP reputation mapping |
| **DNS Intelligence**| `dns` | Query lookup tracking, NXDOMAIN detection, and DNS tunneling checks |
| **Protocol Matrix** | `protocols` | Layer 3/4/7 protocol distribution and bandwidth consumption |
| **Threat Hunting** | `threats` | 14-rule real-time intrusion and scanning detection matrix |
| **AI / ML Models** | `ml` | Isolation Forest anomaly scoring with SHAP feature importance |
| **Topology Graph** | `network` | Interactive visual graph of communicating network nodes |
| **Event Timeline** | `timeline` | Microsecond-precision packet arrival distribution |
| **AI Copilot** | `ai-assistant` | Natural language forensic log reasoning and incident explanation |
| **Forensic Reports**| `reports` | Printable, submission-grade digital forensic incident reports |
| **PCAP Diff Tool** | `comparison` | Side-by-side traffic baseline comparison |
| **Research Lab** | `research` | Protocol anomaly notebooks and experimental classifiers |
| **System Config** | `settings` | Capture size limits, logging thresholds, and API keys |

---

## Quickstart Guide

### Option A: Local Development

#### 1. Backend Service
```bash
cd netscope/backend

# Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend with auto-reload
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- Interactive API Documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Service Health Probe: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

#### 2. Frontend Development Server
In a separate terminal:
```bash
cd netscope/frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```
- Access the web interface at [http://127.0.0.1:5173](http://127.0.0.1:5173). Requests to `/api` and `/health` are automatically proxied to the backend.

---

### Option B: Deploy to Render (Zero Configuration)

NetScope includes native `render.yaml` configuration for 1-click Web Service deployment.

1. Fork or push this repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New** > **Blueprint** and select your repository.
3. Render automatically reads `render.yaml` and executes:
   - **Build Command:**
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
     ```
   - **Start Command:**
     ```bash
     cd backend && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
     ```
   - **Health Check Path:** `/health`

---

## API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Web SPA or service operational metadata |
| `GET` | `/health` | Heartbeat probe (`{"status": "healthy"}`) |
| `GET` | `/api/v1/sample` | Pre-parsed telemetry from bundled sample capture |
| `POST` | `/api/v1/analyze` | Multipart PCAP/PCAPNG upload and streaming analysis |
| `GET` | `/docs` | OpenAPI / Swagger interactive API console |
| `GET` | `/robots.txt` | Crawler indexing instructions |
| `GET` | `/sitemap.xml` | Public SEO sitemap |

---

## Verification & Testing

Run the 14-test verification suite:
```bash
cd netscope/backend
.venv/bin/pytest -v
```

Run frontend production build verification:
```bash
cd netscope/frontend
npm run build
```

---

## Security Model

- **Safe Parser Generators:** Avoids reading entire multi-gigabyte PCAPs into memory by processing frames lazily with Scapy `PcapReader`.
- **Ephemeral Sandbox Storage:** Ingested files are written with unique random prefixes via `tempfile.mkstemp` and securely deleted inside `finally` blocks.
- **MIME & Magic Header Enforcement:** Discards non-PCAP binaries at byte offset 0 without passing them to the dissection engine.

---

## Authorship & Attribution

- **Project:** NetScope Forensic Platform
- **Lead Developer:** **ARK** ([https://github.com/T-ARK](https://github.com/T-ARK))
- **License:** Distributed under the [MIT License](LICENSE).
