import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Search, Filter, ShieldCheck, Zap } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface ThreatsViewProps {
  analysisData: CaptureAnalysisData | null;
}

interface ThreatRule {
  id: string;
  name: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PASS' | 'TRIGGERED';
  evidence: string;
  recommendation: string;
}

export const ThreatsView: React.FC<ThreatsViewProps> = ({ analysisData }) => {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [testSimulateAttack, setTestSimulateAttack] = useState(false);

  const rules: ThreatRule[] = [
    {
      id: 'RULE-01',
      name: 'HORIZONTAL PORT SCAN',
      category: 'RECONNAISSANCE',
      severity: 'HIGH',
      status: testSimulateAttack ? 'TRIGGERED' : 'PASS',
      evidence: testSimulateAttack
        ? 'Source 10.0.0.45 sent probes to 24 distinct hosts on destination port 80.'
        : 'No horizontal probe patterns detected across sampled 5-tuple flows.',
      recommendation: 'Isolate source host and inspect host-level process telemetry.',
    },
    {
      id: 'RULE-02',
      name: 'VERTICAL PORT SCAN',
      category: 'RECONNAISSANCE',
      severity: 'HIGH',
      status: 'PASS',
      evidence: 'No sequential multi-port probes observed against any single destination target.',
      recommendation: 'Ensure external border firewall drops unsolicited SYN frames.',
    },
    {
      id: 'RULE-03',
      name: 'TCP SYN FLOOD',
      category: 'DENIAL_OF_SERVICE',
      severity: 'CRITICAL',
      status: 'PASS',
      evidence: 'SYN to ACK ratio is balanced (1.08). No half-open backlog anomalies.',
      recommendation: 'Deploy SYN cookies and rate limiting on exposed ingress endpoints.',
    },
    {
      id: 'RULE-04',
      name: 'UDP BURST FLOOD',
      category: 'DENIAL_OF_SERVICE',
      severity: 'CRITICAL',
      status: 'PASS',
      evidence: 'Peak UDP rate measured under 4.2 packets/sec; threshold is 500 pps.',
      recommendation: 'Verify UDP buffer capacities and filter unexpected high-port datagrams.',
    },
    {
      id: 'RULE-05',
      name: 'ICMP ECHO STORM',
      category: 'DENIAL_OF_SERVICE',
      severity: 'MEDIUM',
      status: 'PASS',
      evidence: 'ICMP echo requests represent < 2% of overall capture volume.',
      recommendation: 'Drop ICMP Echo requests originating from untrusted public subnets.',
    },
    {
      id: 'RULE-06',
      name: 'DNS TUNNELING & EXFILTRATION',
      category: 'DATA_EXFILTRATION',
      severity: 'CRITICAL',
      status: 'PASS',
      evidence: 'Maximum domain label length is 32 chars with normal Shannon entropy.',
      recommendation: 'Enforce DNS inspection on internal resolvers and block high-entropy subdomains.',
    },
    {
      id: 'RULE-07',
      name: 'SUSPICIOUS NXDOMAIN SURGE',
      category: 'ANOMALY',
      severity: 'HIGH',
      status: 'PASS',
      evidence: 'NXDOMAIN response rate is 0.00%. No DGA (Domain Generation Algorithm) signs.',
      recommendation: 'Monitor DNS resolution failures for malware beaconing attempts.',
    },
    {
      id: 'RULE-08',
      name: 'AUTH BRUTE FORCE PROBE',
      category: 'CREDENTIAL_ACCESS',
      severity: 'HIGH',
      status: 'PASS',
      evidence: 'Zero high-frequency repetitive attempts detected against SSH (22) or RDP (3389).',
      recommendation: 'Implement account lockouts and mandatory MFA on public administration ports.',
    },
    {
      id: 'RULE-09',
      name: 'C2 NETWORK BEACONING',
      category: 'COMMAND_AND_CONTROL',
      severity: 'CRITICAL',
      status: 'PASS',
      evidence: 'No regular low-jitter periodic packet intervals detected to remote destinations.',
      recommendation: 'Verify perimeter egress traffic against threat intelligence feed IOCs.',
    },
    {
      id: 'RULE-10',
      name: 'OUTBOUND DATA EXFILTRATION',
      category: 'DATA_EXFILTRATION',
      severity: 'HIGH',
      status: 'PASS',
      evidence: 'Egress traffic volume remains consistent with typical client session data.',
      recommendation: 'Deploy DLP sensors to inspect outbound payload volumes.',
    },
    {
      id: 'RULE-11',
      name: 'UNUSUAL PORT SURGE',
      category: 'ANOMALY',
      severity: 'MEDIUM',
      status: 'PASS',
      evidence: 'All flows map to standard IANA registered service ports (80, 443, 53).',
      recommendation: 'Block non-standard dynamic outbound ports at network perimeter.',
    },
    {
      id: 'RULE-12',
      name: 'VOLUMETRIC DOS ALERT',
      category: 'DENIAL_OF_SERVICE',
      severity: 'CRITICAL',
      status: 'PASS',
      evidence: 'Aggregate network bandwidth is within normal capture operational thresholds.',
      recommendation: 'Ensure upstream ISP scrubbing center routing is configured for DoS mitigations.',
    },
    {
      id: 'RULE-13',
      name: 'ARP POISONING ANOMALY',
      category: 'LATERAL_MOVEMENT',
      severity: 'HIGH',
      status: 'PASS',
      evidence: 'No duplicate or conflicting MAC-to-IP address bindings detected in capture.',
      recommendation: 'Enable Dynamic ARP Inspection (DAI) on managed Layer 2 access switches.',
    },
    {
      id: 'RULE-14',
      name: 'CLEAR-TEXT CREDENTIALS',
      category: 'CREDENTIAL_ACCESS',
      severity: 'MEDIUM',
      status: 'PASS',
      evidence: 'No plain-text authorization headers detected in sampled HTTP payloads.',
      recommendation: 'Mandate HTTPS redirection and HSTS headers on all internal web services.',
    },
  ];

  const filteredRules = rules.filter((r) => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'TRIGGERED') return r.status === 'TRIGGERED';
    return r.severity === filterSeverity;
  });

  const triggeredCount = rules.filter((r) => r.status === 'TRIGGERED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-[#ff003c]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              THREAT_DETECTION // 14-RULE MATRIX
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [HEURISTIC_INTRUSION_DETECTION_ENGINE]
          </p>
        </div>

        {/* Filter & Test Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#ff003c]/30 text-white focus:outline-none focus:border-[#ff003c]"
          >
            <option value="ALL">ALL RULES (14)</option>
            <option value="TRIGGERED">TRIGGERED ALERTS ({triggeredCount})</option>
            <option value="CRITICAL">CRITICAL ONLY</option>
            <option value="HIGH">HIGH ONLY</option>
            <option value="MEDIUM">MEDIUM ONLY</option>
          </select>

          <button
            onClick={() => setTestSimulateAttack(!testSimulateAttack)}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              testSimulateAttack
                ? 'bg-[#ff003c]/20 text-[#ff003c] border-[#ff003c] font-bold shadow-[0_0_12px_rgba(255,0,60,0.4)]'
                : 'bg-[#080808] text-[#888888] border-[#333333] hover:text-white'
            }`}
          >
            {testSimulateAttack ? 'RESET_ATTACK_SIM' : 'SIMULATE_PORT_SCAN'}
          </button>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => {
          const isTriggered = rule.status === 'TRIGGERED';
          return (
            <div
              key={rule.id}
              className={`p-4 bg-[#0a0a0a] border relative transition-all ${
                isTriggered
                  ? 'border-[#ff003c] shadow-[0_0_20px_rgba(255,0,60,0.25)]'
                  : 'border-[#222222] hover:border-[#00ff88]/30'
              }`}
            >
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#888888] font-bold">
                  {rule.id} • {rule.category}
                </span>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-mono font-bold border ${
                      rule.severity === 'CRITICAL'
                        ? 'bg-[#ff003c]/20 text-[#ff003c] border-[#ff003c]/40'
                        : rule.severity === 'HIGH'
                        ? 'bg-[#ffb700]/20 text-[#ffb700] border-[#ffb700]/40'
                        : 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40'
                    }`}
                  >
                    {rule.severity}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                      isTriggered
                        ? 'bg-[#ff003c] text-black font-extrabold border-[#ff003c]'
                        : 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                    }`}
                  >
                    {isTriggered ? '[ALERT: TRIGGERED]' : '[SCANNING: PASS]'}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-display font-bold text-white uppercase mb-1">
                {rule.name}
              </h4>

              <div className="text-xs font-mono text-[#aaaaaa] mt-2 bg-[#050505] p-2.5 border border-[#181818]">
                <div className="text-[10px] text-[#888888] uppercase mb-0.5">// EVIDENTIARY_FINDINGS:</div>
                <p>{rule.evidence}</p>
              </div>

              <div className="mt-2 text-[11px] font-mono text-[#777777]">
                <span className="text-[#00ff88] font-bold">REMEDIATION:</span> {rule.recommendation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
