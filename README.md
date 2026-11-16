# NetScope — AI-Driven Network Traffic Analysis & Forensic Platform

[![Phase](https://img.shields.io/badge/Status-Phase%201%20Complete-brightgreen)](#)
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.14-blue)](#)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-purple)](#)
[![Security](https://img.shields.io/badge/Forensics-Scapy%20Streaming%20PcapReader-cyan)](#)

NetScope is a research-oriented, web-based PCAP analysis and network forensics platform designed for cybersecurity researchers, incident responders, and network security analysts. It combines protocol-aware deep packet analysis, explainable heuristic detection, and flow-based machine learning.

The user interface is engineered with a **Technical Cyberpunk / Dark Obsidian Telemetry** aesthetic—featuring high-contrast violet and cyan glows, dense monospaced packet inspection, and real-time telemetry metrics.

---

## Repository Structure

```text
netscope/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Package initialization
│   │   ├── main.py              # FastAPI application, routing, CORS & upload endpoints
│   │   ├── analyzer.py          # Scapy streaming PcapReader & protocol extractor
│   │   └── config.py            # Pydantic BaseSettings & environment management
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py          # FastAPI endpoint integration tests
│   │   └── test_analyzer.py     # Analyzer unit & magic bytes tests
│   ├── requirements.txt         # Pinned backend dependencies
│   └── .env                     # Local environment settings
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Sticky header with core health monitor
│   │   │   ├── StatCard.tsx           # Cyberpunk metric cards (Total pkts, volume, hosts)
│   │   │   ├── UploadDropzone.tsx     # Drag-and-drop PCAP ingestion component
│   │   │   ├── ProtocolDistribution.tsx # Recharts interactive protocol breakdown
│   │   │   ├── TopHostsTable.tsx      # Tabular top source & destination endpoints
│   │   │   └── PacketSampleTable.tsx  # Wireshark-style packet stream dissector
│   │   ├── services/
│   │   │   └── api.ts                 # Axios API service client
│   │   ├── types/
│   │   │   └── api.ts                 # TypeScript data contracts & models
│   │   ├── App.tsx                    # Main forensic dashboard container
│   │   ├── index.css                  # Tailwind styles and neon glow utilities
│   │   └── main.tsx                   # React root entrypoint
│   ├── package.json
│   ├── vite.config.ts                 # Vite bundler configured with /api and /health proxy
│   └── tailwind.config.js             # Cyber palette (obsidian, purple-light, cyan)
├── sample_pcaps/
│   └── sample_traffic.pcap            # Synthetic test capture (DNS, HTTP, ICMP, TLS)
├── docs/                              # Research documentation
├── research/                          # Datasets, ML notebooks, experiments
├── .gitignore
└── README.md
```

---

## Phase 1 Implementation Summary

- **Streaming Packet Engine:** Uses Scapy's `PcapReader` generator instead of unbounded lists to prevent high memory consumption during large capture parsing.
- **Magic Header Validation:** Strictly inspects file byte headers (`\xd4\xc3\xb2\xa1`, `\xa1\xb2\xc3\xd4`, `\x4d\x3c\xb2\xa1`, `\xa1\xb2\x3c\x4d`, `\x0a\x0d\x0d\x0a`) to prevent untrusted file execution or malformed uploads.
- **Temporary Storage Isolation:** Safely stages uploads using `tempfile.mkstemp` and removes temporary files in all execution paths via `try...finally`.
- **FastAPI Core:** Provides `/` (root), `/health` (monitoring probe), and `POST /api/v1/analyze` (capture analysis).
- **React + Tailwind Frontend:** Dark mode cyber forensic UI inspired by the reference design, featuring stat counters, protocol distribution charts, top endpoint matrices, and packet dissection preview tables.
- **Test Suite:** 100% test pass rate across 9 unit and integration tests.

---

## Quickstart Guide

### 1. Backend Setup & Run

In a terminal:

```bash
cd netscope/backend

# Activate virtual environment
source .venv/bin/activate

# (Optional: install dependencies if creating new venv)
# pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- Swagger Interactive API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Health Check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 2. Frontend Setup & Run

In a second terminal:

```bash
cd netscope/frontend

# (Optional: install npm modules if cloning fresh)
# npm install

# Start Vite development server
npm run dev
```

- Open the dashboard in your browser: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- Vite automatically proxies `/api` and `/health` requests to `http://127.0.0.1:8000`.

### 3. Running Backend Tests

In a terminal:

```bash
cd netscope/backend
PYTHONPATH=. .venv/bin/pytest tests/ -v
```

---

## Phase 1 Verification Steps

1. Start both backend (`uvicorn app.main:app --port 8000`) and frontend (`npm run dev`).
2. Open `http://127.0.0.1:5173` in your browser.
3. Observe the green **Core Active v0.1.0** indicator in the navbar.
4. Drag and drop `netscope/sample_pcaps/sample_traffic.pcap` into the upload zone.
5. Watch the dashboard populate in real time with:
   - Total packets (9 frames)
   - Volume (bytes)
   - Protocol breakdown (DNS, HTTP, ICMP, TLS/HTTPS)
   - Top source and destination host IP addresses
   - Bounded packet stream table with protocol filter.
