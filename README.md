# Nexaptra — AI-Driven Network Traffic Analysis & Forensic PCAP Platform

<div align="center">

[![Live Platform](https://img.shields.io/badge/LIVE%20PLATFORM-netscope--kx6h.onrender.com-00ff88?style=for-the-badge&logo=render&logoColor=black)](https://netscope-kx6h.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/GITHUB-T--ARK%2FNetScope-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/T-ARK/NetScope)

<br/>

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12%2B-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tactical%20HUD%20%7C%20Dark%20Obsidian-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Scapy](https://img.shields.io/badge/Engine-Scapy%20Streaming%20PcapReader-red?style=flat-square)](https://scapy.net)
[![Tests](https://img.shields.io/badge/Tests-14%2F14%20Passing-brightgreen?style=flat-square&logo=pytest&logoColor=white)](#testing--verification)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Developed%20By-ARK-00ff88?style=flat-square&logo=github)](https://github.com/T-ARK)

</div>

---

> ### 🌐 **Live Interactive Platform:** [https://netscope-kx6h.onrender.com/](https://netscope-kx6h.onrender.com/)
> **Nexaptra is live on Render.** Explore the pre-parsed telemetry dataset, upload custom `.pcap` or `.pcapng` files for instant streaming dissection, inspect bidirectional 5-tuple flows, visualize live network topology, and evaluate the 14-rule threat hunting matrix.

---

## Table of Contents

- [Overview & Architecture](#overview--architecture)
- [Key Features](#key-features)
- [17 Forensic Modules](#17-forensic-modules)
- [14-Rule Threat Hunting Matrix](#14-rule-threat-hunting-matrix)
- [Live Platform Demonstration](#live-platform-demonstration)
- [Local Quickstart](#local-quickstart)
- [Deployment on Render](#deployment-on-render)
- [API Reference](#api-reference)
- [Testing & Verification](#testing--verification)
- [Security Model](#security-model)
- [Authorship & License](#authorship--license)

---

## Overview & Architecture

**Nexaptra** is a digital network forensics and automated incident response platform engineered to replace memory-intensive PCAP parsers with low-overhead, stream-based packet dissection. Designed for SOC analysts, DFIR teams, and cybersecurity researchers, Nexaptra couples low-level protocol inspection with an automated 14-rule intrusion detection matrix and explainable anomaly modeling.

### System Data Flow

```text
 ┌────────────────────────────────────────────────────────┐
 │            Client Web Browser (Tactical HUD)           │
 │       React 18 • TypeScript • Tailwind • HTML5 Canvas  │
 └───────────────────────────┬────────────────────────────┘
                             │
               HTTP / REST   │   Static Assets & SPA
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                 FastAPI Unified Service                │
 │  - Magic Header Validation (Byte Offset 0 Check)       │
 │  - Ephemeral Tempfile Ingestion Isolation              │
 │  - Production SPA Fallback Routing                     │
 └─────────────┬────────────────────────────┬─────────────┘
               │                            │
               ▼                            ▼
 ┌──────────────────────────┐  ┌──────────────────────────┐
 │     Streaming Engine     │  │    Forensics Pipeline    │
 │ - Scapy PcapReader       │  │ - 14-Rule Threat Engine  │
 │ - Bounded Chunk Ingestion│  │ - 5-Tuple Flow Builder   │
 │ - Zero-RAM Buffer Leak   │  │ - Dynamic Topology Graph │
 └──────────────────────────┘  └──────────────────────────┘
```

---

## Key Features

- **Streaming Packet Dissection:** Leverages Scapy's generator-based `PcapReader` to process frames sequentially without loading entire multi-hundred megabyte captures into system RAM.
- **Strict Ingestion Validation:** Enforces magic byte checks (`0xd4c3b2a1`, `0xa1b2c3d4`, `0x4d3cb2a1`, `0x0a0d0d0a`) before reading payloads, immediately discarding malformed or deceptive uploads.
- **14-Rule Heuristic Threat Hunting:** Instant rule evaluation for port scans (SYN/ACK/NULL/XMAS), ICMP floods, cleartext credential leaks, DNS tunneling, and command-and-control indicators.
- **Dynamic Network Topology Graph:** Canvas-rendered interactive node visualization that automatically dynamically maps communicating endpoints, directional flows, and bandwidth weights.
- **5-Tuple Flow Reconstruction:** Reassembles bidirectional communications into distinct flows indexed by `(Source IP, Source Port, Dest IP, Dest Port, Protocol)`.
- **Explainable Anomaly Detection (XAI):** Isolation Forest and Random Forest diagnostics paired with SHAP-interpretable decision boundaries.
- **Zero External API Dependencies:** Operates entirely offline for sensitive network captures containing internal enterprise infrastructure or credentials.
- **Single-Port Production Serving:** Preconfigured for zero-configuration cloud hosting on Render via unified FastAPI asset routing.

---

## 17 Forensic Modules

| Module | Identifier | Category | Forensic Purpose |
| :--- | :--- | :--- | :--- |
| **Telemetry Dash** | `dashboard` | Core | Executive summary, protocol gauges, top communicating hosts, and sample stream |
| **PCAP Ingestion** | `upload` | Core | Secure drag-and-drop file ingestion with automatic state flush |
| **Capture Logs** | `history` | Core | Session capture audit logs, file hash generation, and metadata tracking |
| **Frame Dissector** | `packets` | Forensics | Wireshark-style tabular packet dissector with multi-column filtering |
| **Flow Matrix** | `flows` | Forensics | 5-tuple bidirectional network flow reconstruction and stream stats |
| **Host Targets** | `hosts` | Forensics | Endpoint volume distribution, talker ranking, and IP communication mapping |
| **DNS Intelligence**| `dns` | Forensics | Query tracking, NXDOMAIN anomaly detection, and TXT tunneling inspection |
| **Protocol Matrix** | `protocols` | Forensics | Layer 2/3/4/7 protocol distribution charts and bandwidth ratios |
| **Threat Hunting** | `threats` | Analytics | Real-time 14-rule intrusion, scanning, and anomaly detection matrix |
| **AI / ML Models** | `ml` | Analytics | Isolation Forest anomaly scoring with SHAP feature contribution charts |
| **Topology Graph** | `network` | Analytics | Interactive HTML5 Canvas graph rendering nodes and packet exchange edges |
| **Event Timeline** | `timeline` | Analytics | Microsecond-precision packet arrival time-series analysis |
| **AI Copilot** | `ai-assistant` | Analytics | Natural language forensic assistant for PCAP log reasoning |
| **Forensic Reports**| `reports` | Advanced | Printable, export-ready digital forensic incident investigation reports |
| **PCAP Diff Tool** | `comparison` | Advanced | Side-by-side traffic baseline comparison to detect anomalous variance |
| **Research Lab** | `research` | Advanced | Experimental statistical models, entropy tests, and protocol analyzers |
| **System Config** | `settings` | Advanced | Ingestion limits, logging thresholds, and environment configuration |

---

## 14-Rule Threat Hunting Matrix

Nexaptra's built-in heuristic engine evaluates captures against 14 foundational MITRE ATT&CK-aligned network intrusion indicators:

| # | Rule Name | Category | Detection Criteria |
| :-: | :--- | :--- | :--- |
| **01** | `TCP_SYN_FLOOD` | DoS / Scanning | High volume of TCP packets with only the `SYN` flag set and zero corresponding `ACK` responses. |
| **02** | `TCP_NULL_SCAN` | Reconnaissance | Stealth scan probe packets with all TCP control flags set to `0x00`. |
| **03** | `TCP_XMAS_SCAN` | Reconnaissance | Packets with `FIN`, `PSH`, and `URG` flags enabled simultaneously (`0x29`). |
| **04** | `TCP_FIN_SCAN` | Reconnaissance | Packets with only the `FIN` flag set sent to closed ports to elicit `RST` frames. |
| **05** | `PORT_SWEEP_RECON` | Reconnaissance | Single source IP connecting to multiple sequential destination ports within a short delta. |
| **06** | `ICMP_ECHO_FLOOD` | DoS | Excessive rate of ICMP Type 8 (Echo Request) packets targeting a single destination. |
| **07** | `DNS_TUNNELING_EXFIL` | Exfiltration | Unusually long DNS query names (>50 characters) or high-entropy subdomain labeling. |
| **08** | `CLEARTEXT_AUTH_LEAK` | Credential Access | Unencrypted transmission of authentication strings (HTTP Basic Auth, FTP, or Telnet). |
| **09** | `TELNET_EXPOSURE` | Vulnerability | Detection of unencrypted remote terminal management on port 23. |
| **10** | `NON_STANDARD_SSH` | C2 / Persistence | SSH handshake signatures observed on non-default ports (outside port 22). |
| **11** | `MTU_OVERSIZE_ANOMALY`| Anomaly | Frame lengths exceeding standard Ethernet MTU (1514 bytes) or abnormal fragmentation. |
| **12** | `HIGH_PORT_PERSISTENCE`| C2 / Covert | Continuous bidirectional communication between high dynamic ports (>49152). |
| **13** | `INBOUND_SMB_RDP` | Initial Access | External ingress packets targeting sensitive administrative ports 445 or 3389. |
| **14** | `LAND_ATTACK_DETECTED` | DoS | Spoofed packet where Source IP and Port match Destination IP and Port. |

---

## Live Platform Demonstration

Nexaptra is continuously deployed and accessible online:

🔗 **[https://netscope-kx6h.onrender.com/](https://netscope-kx6h.onrender.com/)**

1. **One-Click Pre-Parsed Telemetry:** Click **"Explore Dashboard"** to instantly load the built-in synthetic PCAP (`sample_traffic.pcap`), demonstrating DNS resolution, HTTP conversations, TLS handshakes, and ICMP frames.
2. **Custom PCAP Upload:** Click **"Upload PCAP Capture"** to drag-and-drop your own `.pcap` or `.pcapng` file. Nexaptra immediately flushes previous capture state and visualizes the fresh telemetry.
3. **Interactive Topology:** Navigate to the **Topology Graph** (`/network`) to inspect live communication nodes, bidirectional edge counts, and zoom/pan through the network matrix.

---

## Local Quickstart

### Prerequisites

- **Python:** 3.12 or newer
- **Node.js:** 18.x or newer
- **npm:** 9.x or newer

### 1. Backend Service

```bash
cd backend

# Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI development server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- **Interactive API Documentation:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Service Health Probe:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 2. Frontend Development Server

In a second terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

- Open the dashboard: [http://127.0.0.1:5173](http://127.0.0.1:5173) (Vite proxies `/api` and `/health` to port 8000).

---

## Deployment on Render

Nexaptra includes native **Render Blueprint** support via [`render.yaml`](render.yaml) for zero-configuration, single-service deployment.

### Single-Service Architecture
In production, the compiled React SPA static assets (`dist/`) are directly mounted and served by FastAPI, eliminating CORS complexity and cross-domain routing latency:

```yaml
services:
  - type: web
    name: nexaptra
    runtime: python
    buildCommand: "cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt"
    startCommand: "cd backend && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"
    healthCheckPath: /health
    envVars:
      - key: HOST
        value: 0.0.0.0
      - key: ENVIRONMENT
        value: production
```

---

## API Reference

| Method | Endpoint | Description | Sample Response / Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Web SPA HTML or API operational metadata | `200 OK` |
| `GET` | `/health` | Real-time container health and uptime check | `{"status": "healthy"}` |
| `GET` | `/api/v1/sample` | Pre-parsed telemetry from bundled capture | `{"status": "success", "data": {...}}` |
| `POST` | `/api/v1/analyze` | Multipart PCAP/PCAPNG upload and streaming analysis | `{"status": "success", "data": {...}}` |
| `GET` | `/docs` | Interactive Swagger / OpenAPI documentation | `200 OK (HTML)` |
| `GET` | `/robots.txt` | Search engine indexing rules | `200 OK (text/plain)` |
| `GET` | `/sitemap.xml` | Production search engine sitemap | `200 OK (application/xml)` |

---

## Testing & Verification

Nexaptra maintains a 100% automated test pass rate covering analyzers, validation, API endpoints, and production SPA routing:

```bash
# Run backend test suite
cd backend
.venv/bin/pytest -v
```

```text
============================= test session starts ==============================
collected 14 items

tests/test_analyzer.py::test_validate_pcap_header_valid PASSED           [  7%]
tests/test_analyzer.py::test_validate_pcap_header_invalid PASSED         [ 14%]
tests/test_analyzer.py::test_analyze_pcap_sample PASSED                  [ 21%]
tests/test_api.py::test_root_endpoint[asyncio] PASSED                    [ 28%]
tests/test_api.py::test_health_endpoint[asyncio] PASSED                  [ 35%]
tests/test_api.py::test_analyze_invalid_extension[asyncio] PASSED        [ 42%]
tests/test_api.py::test_analyze_empty_file[asyncio] PASSED               [ 50%]
tests/test_api.py::test_analyze_invalid_magic_bytes[asyncio] PASSED      [ 57%]
tests/test_api.py::test_analyze_valid_sample_pcap[asyncio] PASSED        [ 64%]
tests/test_production.py::test_spa_index_html_serving[asyncio] PASSED    [ 71%]
tests/test_production.py::test_robots_txt_serving[asyncio] PASSED        [ 78%]
tests/test_production.py::test_sitemap_xml_serving[asyncio] PASSED       [ 85%]
tests/test_production.py::test_spa_client_side_routing_fallback[asyncio] PASSED [ 92%]
tests/test_production.py::test_api_sample_endpoint[asyncio] PASSED       [100%]

============================== 14 passed in 0.44s ==============================
```

```bash
# Verify frontend production build
cd frontend
npm run build
```

---

## Security Model

1. **Memory Isolation:** Packet frames are dissected lazily using Python iterators. Raw packet payload byte buffers are bounded to prevent memory denial-of-service.
2. **Ephemeral File Storage:** Uploaded captures are staged using secure randomized file descriptors via `tempfile.mkstemp` and guaranteed to be destroyed in `finally` blocks upon analysis completion.
3. **Magic Byte Enforcement:** The ingestion engine inspects byte offset 0 of every file chunk to ensure adherence to libpcap / pcapng specifications, rejecting disguised binaries or shell scripts.
4. **Offline Capability:** Nexaptra requires zero outbound telemetry, external third-party APIs, or external lookups for core packet analysis.

---

## Authorship & License

- **Project:** Nexaptra Intelligent PCAP Forensics
- **Live Platform:** [https://netscope-kx6h.onrender.com/](https://netscope-kx6h.onrender.com/)
- **Author & Maintainer:** **ARK** ([https://github.com/T-ARK](https://github.com/T-ARK))
- **License:** Released under the [MIT License](LICENSE).
