import { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Shield, Users, Briefcase, Landmark } from 'lucide-react';

const nodeTypes = {
  custom: CustomChartNode,
};

function CustomChartNode({ data }: any) {
  return (
    <div className={`px-5 py-4 shadow-xl rounded-2xl border-2 w-[280px] bg-white transition-transform hover:-translate-y-1 ${data.borderColor}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-400" />
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-inner ${data.iconBg}`}>
          {data.icon}
        </div>
        <div className="font-extrabold text-slate-800 text-base leading-tight uppercase tracking-tight">{data.label}</div>
      </div>
      <div className="text-sm text-slate-600 leading-relaxed font-medium">
        {data.description}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-slate-400" />
    </div>
  );
}

export function StateMonopolyChart() {
  const nodes = useMemo(() => [
    {
      id: 'center',
      type: 'custom',
      position: { x: 300, y: 50 },
      data: { 
        label: 'Độc Quyền Nhà Nước', 
        description: 'Sự kết hợp sức mạnh của tổ chức độc quyền tư nhân và nhà nước tư sản thành một bộ máy thống nhất.',
        icon: <Shield size={20} />,
        iconBg: 'bg-marx-red',
        borderColor: 'border-marx-red'
      },
    },
    {
      id: 'pillar1',
      type: 'custom',
      position: { x: 0, y: 250 },
      data: { 
        label: 'Cơ Chế Nhân Sự', 
        description: 'Thỏa hiệp chia sẻ quyền lực. Thể hiện qua các cuộc bầu cử, liên minh đảng phái (như Liên minh đèn giao thông ở Đức), thương lượng lợi ích.',
        icon: <Users size={20} />,
        iconBg: 'bg-blue-500',
        borderColor: 'border-blue-400'
      },
    },
    {
      id: 'pillar2',
      type: 'custom',
      position: { x: 300, y: 250 },
      data: { 
        label: 'Sở Hữu Nhà Nước', 
        description: 'Nhà nước gánh vác rủi ro hạ tầng & R&D. Cứu trợ khủng hoảng bằng ngân sách (VD: Giải cứu AIG 150 tỷ USD năm 2008).',
        icon: <Landmark size={20} />,
        iconBg: 'bg-amber-500',
        borderColor: 'border-amber-400'
      },
    },
    {
      id: 'pillar3',
      type: 'custom',
      position: { x: 600, y: 250 },
      data: { 
        label: 'Điều Tiết Kinh Tế', 
        description: 'Đa đảng trong khuôn khổ. Dùng biện pháp mạnh khi nguy cơ mất kiểm soát (Đảo chính Chile 1973). Dùng viện trợ nước ngoài mang lợi cho doanh nghiệp trong nước.',
        icon: <Briefcase size={20} />,
        iconBg: 'bg-emerald-500',
        borderColor: 'border-emerald-400'
      },
    }
  ], []);

  const edges = useMemo(() => [
    {
      id: 'e1',
      source: 'center',
      target: 'pillar1',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
    },
    {
      id: 'e2',
      source: 'center',
      target: 'pillar2',
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
    },
    {
      id: 'e3',
      source: 'center',
      target: 'pillar3',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    }
  ], []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
    >
      <Background color="#cbd5e1" gap={20} size={1.5} />
      <Controls showZoom={false} showInteractive={false} />
    </ReactFlow>
  );
}
