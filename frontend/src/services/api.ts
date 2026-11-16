import axios from 'axios';
import { AnalysisApiResponse, HealthResponse } from '../types/api';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
  },
  timeout: 60000,
});

export const apiService = {
  /**
   * Health status check for backend service
   */
  async checkHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },

  /**
   * Upload and analyze a PCAP/PCAPNG capture file
   */
  async uploadCapture(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<AnalysisApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<AnalysisApiResponse>('/api/v1/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });

    return response.data;
  },

  /**
   * Load bundled sample capture analysis
   */
  async getSampleCapture(): Promise<AnalysisApiResponse> {
    const response = await apiClient.get<AnalysisApiResponse>('/api/v1/sample');
    return response.data;
  },
};
