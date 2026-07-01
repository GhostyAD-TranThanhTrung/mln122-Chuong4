import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import type { TracerGraph } from '../types';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 220;
const nodeHeight = 120;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

// Custom Node to make it look beautiful
const CustomNode = ({ data }: any) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'brand': return 'bg-green-100 border-green-300 text-green-800';
      case 'holding': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'fund': return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'oligarch': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-slate-100 border-slate-300 text-slate-800';
    }
  };

  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border-2 w-[220px] bg-white transition-all hover:shadow-xl`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-400" />
      <div className={`text-xs font-bold px-2 py-1 rounded-md w-max mb-2 uppercase tracking-wide border ${getTypeColor(data.type)}`}>
        {data.type}
      </div>
      <div className="font-bold text-slate-800 text-sm mb-1 leading-tight">{data.label}</div>
      {data.description && <div className="text-xs text-slate-500 leading-snug">{data.description}</div>}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-slate-400" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface NetworkGraphProps {
  graphData: TracerGraph;
}

export function NetworkGraph({ graphData }: NetworkGraphProps) {
  const initialNodes = useMemo(() => {
    return graphData.nodes.map((n) => ({
      id: n.id,
      type: 'custom',
      data: { label: n.label, type: n.type, description: n.description },
      position: { x: 0, y: 0 },
    }));
  }, [graphData.nodes]);

  const initialEdges = useMemo(() => {
    return graphData.links.map((l, idx) => ({
      id: `e-${l.source}-${l.target}-${idx}`,
      source: l.source,
      target: l.target,
      label: l.label,
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#dc2626', // marx-red
      },
      style: { stroke: '#dc2626', strokeWidth: 2 },
      labelStyle: { fill: '#1e293b', fontWeight: 600, fontSize: 12 },
      labelBgStyle: { fill: 'white', fillOpacity: 0.9, rx: 4, ry: 4 },
      labelBgPadding: [4, 4],
    }));
  }, [graphData.links]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    [initialNodes, initialEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full min-h-[500px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        className="bg-slate-50 rounded-xl"
      >
        <Controls className="bg-white shadow-md border border-slate-200 rounded-lg overflow-hidden" />
        <MiniMap 
          zoomable 
          pannable 
          nodeClassName={(n) => 'bg-slate-300'} 
          className="border border-slate-200 shadow-md rounded-lg overflow-hidden"
        />
        <Background color="#cbd5e1" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
