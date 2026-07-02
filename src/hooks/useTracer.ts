import { useState } from 'react';
import type { TracerGraph } from '../types';

export type TracerState = 'idle' | 'searching' | 'analyzing' | 'success' | 'error';

export function useTracer() {
  const [state, setState] = useState<TracerState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<TracerGraph | null>(null);

  const reset = () => {
    setState('idle');
    setError(null);
    setGraphData(null);
  };

  const processImage = async (_file: File) => {
    setError('Tính năng AI nhận diện hình ảnh đã bị vô hiệu hóa.');
    setState('error');
  };

  const processText = async (brandName: string, depth: 1 | 2 = 2) => {
    try {
      reset();
      await runAnalysisPipeline(brandName, depth);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Lỗi xử lý văn bản');
      setState('error');
    }
  };

  const runAnalysisPipeline = async (initialBrand: string, depth: 1 | 2 = 2) => {
    try {
      setState('searching');

      const response = await fetch(`/api/holders?ticker=${encodeURIComponent(initialBrand)}&depth=${depth}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch data from API');
      }

      setState('analyzing');
      const data = await response.json();

      if (!data.nodes || data.nodes.length === 0) {
        throw new Error('No data found for this ticker');
      }

      setGraphData(data as TracerGraph);
      setState('success');
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Lỗi phân tích dữ liệu');
      setState('error');
    }
  };

  return {
    state,
    error,
    graphData,
    processImage,
    processText,
    reset,
  };
}
