import axios from 'axios';
import type { MosaicProcessRequest, MosaicProcessResponse } from '../types/mosaic.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000, // 5 minutes
});

export const mosaicApi = {
  async processMosaic(request: MosaicProcessRequest): Promise<MosaicProcessResponse> {
    const response = await api.post<MosaicProcessResponse>('/api/mosaic/process', request);
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/api/mosaic/health');
    return response.data;
  },
};
