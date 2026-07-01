import { useState } from 'react';
import type { TracerGraph, OpenSanctionsEntity } from '../types';

export type TracerState = 'idle' | 'searching' | 'analyzing' | 'success' | 'error';

// Giả lập dữ liệu đồ thị khi không dùng API
const mockGraphData: TracerGraph = {
  nodes: [
    { id: '1', label: 'Sản phẩm tìm kiếm', type: 'product', description: 'Sản phẩm bạn vừa nhập' },
    { id: '2', label: 'Tập đoàn đa quốc gia', type: 'brand', description: 'Công ty mẹ sở hữu thương hiệu' },
    { id: '3', label: 'Quỹ đầu tư A', type: 'fund', description: 'Cổ đông lớn khống chế gián tiếp' },
    { id: '4', label: 'Quỹ đầu tư B', type: 'fund', description: 'Cổ đông tổ chức' },
    { id: '5', label: 'Tài phiệt X', type: 'oligarch', description: 'Nắm quyền biểu quyết thực tế' }
  ],
  links: [
    { source: '1', target: '2', label: 'sở hữu bởi' },
    { source: '2', target: '3', label: 'đầu tư' },
    { source: '2', target: '4', label: 'đầu tư' },
    { source: '3', target: '5', label: 'kiểm soát' },
    { source: '4', target: '5', label: 'ủy quyền' }
  ]
};

export function useTracer() {
  const [state, setState] = useState<TracerState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<TracerGraph | null>(null);
  const [corporateData, setCorporateData] = useState<OpenSanctionsEntity | null>(null);
  const [identifiedBrand, setIdentifiedBrand] = useState<string | null>(null);

  const reset = () => {
    setState('idle');
    setError(null);
    setGraphData(null);
    setCorporateData(null);
    setIdentifiedBrand(null);
  };

  const processImage = async (file: File) => {
    setError('Tính năng AI nhận diện hình ảnh đã bị vô hiệu hóa.');
    setState('error');
  };

  const processText = async (brandName: string) => {
    try {
      reset();
      setIdentifiedBrand(brandName);
      await runAnalysisPipeline(brandName);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Lỗi xử lý văn bản');
      setState('error');
    }
  };

  const runAnalysisPipeline = async (initialBrand: string) => {
    try {
      setState('searching');
      
      // Giả lập delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setState('analyzing');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cập nhật tên node sản phẩm theo từ khóa tìm kiếm
      const customMockData = {
        ...mockGraphData,
        nodes: mockGraphData.nodes.map(n => 
          n.id === '1' ? { ...n, label: initialBrand.toUpperCase() } : n
        )
      };

      setGraphData(customMockData);
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
    corporateData,
    identifiedBrand,
    processImage,
    processText,
    reset
  };
}

