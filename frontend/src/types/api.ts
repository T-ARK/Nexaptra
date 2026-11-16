export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
}

export interface PacketSample {
  index: number;
  timestamp: number;
  length: number;
  src_ip: string | null;
  dst_ip: string | null;
  src_port: number | null;
  dst_port: number | null;
  protocol: string;
  summary: string;
}

export interface TopHost {
  ip: string;
  packet_count: number;
  byte_count: number;
}

export interface CaptureAnalysisData {
  filename: string;
  file_size_bytes: number;
  format_type: string;
  total_packets: number;
  total_bytes: number;
  duration_seconds: number;
  start_time: number | null;
  end_time: number | null;
  protocols: Record<string, number>;
  top_source_ips: TopHost[];
  top_destination_ips: TopHost[];
  unique_source_ips_count: number;
  unique_destination_ips_count: number;
  sampled_packets: PacketSample[];
}

export interface AnalysisApiResponse {
  status: string;
  message: string;
  data: CaptureAnalysisData;
}
