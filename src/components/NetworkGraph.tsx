import React, { useMemo, useCallback, useState, useRef } from 'react';
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
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { TracerGraph } from '../types';

const NODE_SIZE = 120;
const getRadialLayout = (nodes: any[], edges: any[], r1: number, r2: number) => {
  if (nodes.length === 0) return { nodes, edges };

  // Find root node (type === 'product', or node with fewest incoming edges)
  const inCount = new Map<string, number>();
  edges.forEach(e => inCount.set(e.target, (inCount.get(e.target) || 0) + 1));
  const root = nodes.find(n => n.data?.type === 'product')
    ?? nodes.slice().sort((a, b) => (inCount.get(a.id) || 0) - (inCount.get(b.id) || 0))[0];

  // Depth-1: nodes directly connected to root
  const depth1Ids = new Set<string>();
  edges.forEach(e => {
    if (e.source === root.id) depth1Ids.add(e.target);
    if (e.target === root.id) depth1Ids.add(e.source);
  });

  // Depth-2: nodes connected to depth-1 but not root
  const depth2Map = new Map<string, string[]>(); // parentId -> [childId]
  const depth2Ids = new Set<string>();
  edges.forEach(e => {
    const addChild = (parentId: string, childId: string) => {
      if (depth1Ids.has(parentId) && !depth1Ids.has(childId) && childId !== root.id) {
        if (!depth2Map.has(parentId)) depth2Map.set(parentId, []);
        if (!depth2Map.get(parentId)!.includes(childId)) {
          depth2Map.get(parentId)!.push(childId);
          depth2Ids.add(childId);
        }
      }
    };
    addChild(e.source, e.target);
    addChild(e.target, e.source);
  });

  const positioned = new Map<string, { x: number; y: number }>();
  const CENTER = { x: 0, y: 0 };
  positioned.set(root.id, CENTER);

  // Place depth-1 nodes evenly around center
  const d1List = [...depth1Ids];
  const startAngle = d1List.length === 2 ? Math.PI : -Math.PI / 2;
  d1List.forEach((id, i) => {
    const angle = (2 * Math.PI * i) / d1List.length + startAngle;
    positioned.set(id, {
      x: CENTER.x + r1 * Math.cos(angle),
      y: CENTER.y + r1 * Math.sin(angle),
    });
  });

  // Place depth-2 nodes fanning outward from each depth-1 parent
  depth2Map.forEach((children, parentId) => {
    const p = positioned.get(parentId)!;
    const parentAngle = Math.atan2(p.y - CENTER.y, p.x - CENTER.x);
    const spread = Math.min(Math.PI * 0.55, (children.length - 1) * 0.35);

    children.forEach((childId, i) => {
      const offset = children.length === 1 ? 0
        : spread * (i / (children.length - 1) - 0.5);
      const angle = parentAngle + offset;
      if (!positioned.has(childId)) {
        positioned.set(childId, {
          x: p.x + r2 * Math.cos(angle),
          y: p.y + r2 * Math.sin(angle),
        });
      }
    });
  });

  // Fallback for any unpositioned nodes
  nodes.forEach((n, i) => {
    if (!positioned.has(n.id)) {
      positioned.set(n.id, { x: (i - nodes.length / 2) * 160, y: 500 });
    }
  });

  const newNodes = nodes.map(n => ({
    ...n,
    targetPosition: 'left' as const,
    sourcePosition: 'right' as const,
    position: positioned.get(n.id)!,
  }));

  return { nodes: newNodes, edges };
};


const typeConfig: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  product:  { bg: '#3b82f6', border: '#1d4ed8', text: '#ffffff', ring: '#93c5fd' },
  fund:     { bg: '#f59e0b', border: '#b45309', text: '#ffffff', ring: '#fcd34d' },
  brand:    { bg: '#10b981', border: '#047857', text: '#ffffff', ring: '#6ee7b7' },
  holding:  { bg: '#8b5cf6', border: '#5b21b6', text: '#ffffff', ring: '#c4b5fd' },
  oligarch: { bg: '#ef4444', border: '#b91c1c', text: '#ffffff', ring: '#fca5a5' },
  default:  { bg: '#64748b', border: '#334155', text: '#ffffff', ring: '#94a3b8' },
};

const CircleNode = ({ data }: any) => {
  const config = typeConfig[data.type] || typeConfig.default;
  const isHighlighted = data.highlighted;
  const isDimmed = data.dimmed;

  return (
    <div
      style={{
        width: NODE_SIZE,
        height: NODE_SIZE,
        borderRadius: '50%',
        background: isDimmed ? '#e2e8f0' : config.bg,
        border: `4px solid ${isDimmed ? '#cbd5e1' : isHighlighted ? '#fff' : config.border}`,
        boxShadow: isHighlighted
          ? `0 0 0 4px ${config.ring}, 0 0 24px ${config.ring}`
          : isDimmed ? 'none' : '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        cursor: 'pointer',
        opacity: isDimmed ? 0.35 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, top: '50%', left: '50%' }} />
      <div style={{
        color: isDimmed ? '#94a3b8' : config.text,
        fontSize: '11px',
        fontWeight: 700,
        textAlign: 'center',
        lineHeight: 1.2,
        wordBreak: 'break-word',
        maxWidth: '90px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      }}>
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, top: '50%', left: '50%' }} />
    </div>
  );
};

const nodeTypes = { circle: CircleNode };

export interface NetworkGraphProps {
  graphData: TracerGraph;
  r1?: number;
  r2?: number;
  interactive?: boolean;
}

function NetworkGraphInner({ graphData, r1 = 300, r2 = 200, interactive = true }: NetworkGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [panel, setPanel] = useState<{ label: string; description: string; connections: { dir: string; label: string; pct: string; desc: string }[] } | null>(null);
  const isDragging = useRef(false);

  const allEdges = useMemo(() =>
    graphData.links.map((l, idx) => ({
      id: `e-${l.source}-${l.target}-${idx}`,
      source: String(l.source),
      target: String(l.target),
      label: l.label,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#dc2626' },
      style: { stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5 3' },
      labelStyle: { fill: '#1e293b', fontWeight: 600, fontSize: 11 },
      labelBgStyle: { fill: 'white', fillOpacity: 0.85, rx: 4, ry: 4 },
      labelBgPadding: [3, 3] as [number, number],
    })),
    [graphData.links]
  );

  const allNodes = useMemo(() =>
    graphData.nodes.map((n) => ({
      id: n.id,
      type: 'circle',
      data: { label: n.label, type: n.type, description: n.description, highlighted: false, dimmed: false },
      position: { x: 0, y: 0 },
    })),
    [graphData.nodes]
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getRadialLayout(allNodes, allEdges, r1, r2),
    [allNodes, allEdges, r1, r2]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Mutates only data fields, preserving current drag positions
  const applyHighlight = useCallback((nodeId: string | null) => {
    setNodes(nds => nds.map(n => {
      if (!nodeId) return { ...n, data: { ...n.data, highlighted: false, dimmed: false } };
      const connectedIds = new Set<string>([nodeId]);
      allEdges.forEach(e => {
        if (e.source === nodeId) connectedIds.add(e.target);
        if (e.target === nodeId) connectedIds.add(e.source);
      });
      return { ...n, data: { ...n.data, highlighted: connectedIds.has(n.id), dimmed: !connectedIds.has(n.id) } };
    }));
    setEdges(eds => eds.map(e => {
      if (!nodeId) {
        return {
          ...e,
          style: { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: 'none' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
          animated: false,
          labelStyle: { ...e.labelStyle, fillOpacity: 1 },
          labelBgStyle: { ...e.labelBgStyle, fillOpacity: 0.85 }
        };
      }
      const isConnected = e.source === nodeId || e.target === nodeId;
      return {
        ...e,
        style: isConnected
          ? { stroke: '#f59e0b', strokeWidth: 3, strokeDasharray: 'none' }
          : { stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 3', opacity: 0.3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: isConnected ? '#f59e0b' : '#cbd5e1' },
        animated: isConnected,
        labelStyle: { ...e.labelStyle, fillOpacity: isConnected ? 1 : 0 },
        labelBgStyle: { ...e.labelBgStyle, fillOpacity: isConnected ? 0.85 : 0 }
      };
    }));
  }, [allEdges, setNodes, setEdges]);

  // Click-to-toggle: clicking the same node deselects it
  const onNodeClick = useCallback((_: any, node: any) => {
    if (isDragging.current) return;
    const isSame = selectedNodeId === node.id;
    if (isSame) {
      setSelectedNodeId(null);
      setPanel(null);
      applyHighlight(null);
    } else {
      setSelectedNodeId(node.id);
      applyHighlight(node.id);
      const connections = allEdges
        .filter(e => e.source === node.id || e.target === node.id)
        .map(e => {
          const otherId = e.source === node.id ? e.target : e.source;
          const other = graphData.nodes.find(n => n.id === otherId);
          const dir = e.source === node.id ? 'Sở hữu' : 'Cổ đông';
          return {
            dir,
            label: other?.label || otherId,
            pct: e.label || '',
            desc: other?.description || '',
          };
        });
      setPanel({ label: node.data.label, description: node.data.description || '', connections });
    }
  }, [selectedNodeId, allEdges, graphData.nodes, applyHighlight]);

  // Clicking the canvas background deselects
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setPanel(null);
    applyHighlight(null);
  }, [applyHighlight]);

  const onNodeDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const onNodeDragStop = useCallback(() => {
    setTimeout(() => { isDragging.current = false; }, 50);
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full relative min-h-[400px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={interactive}
        zoomOnScroll={interactive}
        panOnDrag={interactive}
        zoomOnDoubleClick={interactive}
        selectionOnDrag={interactive}
        attributionPosition="bottom-right"
        className="bg-slate-50 rounded-xl"
      >
        {interactive && <Controls className="bg-white shadow-md border border-slate-200 rounded-lg overflow-hidden" />}
        {interactive && (
          <MiniMap
            zoomable
            pannable
            nodeColor={(n) => (typeConfig[n.data?.type as string] || typeConfig.default).bg}
            className="border border-slate-200 shadow-md rounded-lg overflow-hidden"
          />
        )}
        <Background color="#cbd5e1" gap={20} size={1} />
      </ReactFlow>

      {/* Hint when nothing selected */}
      {!panel && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/70 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
          Nhấp vào một nút để xem các liên kết
        </div>
      )}

      {/* Selection Panel */}
      {panel && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur border border-slate-200 shadow-xl rounded-2xl p-4 max-w-[280px] z-50">
          <div className="flex items-start justify-between gap-2 mb-1 border-b pb-2 border-slate-100">
            <div>
              <div className="font-bold text-slate-800 text-sm leading-tight">{panel.label}</div>
              {panel.description && (
                <div className="text-xs text-slate-400 mt-0.5">{panel.description}</div>
              )}
            </div>
            <button
              onClick={() => { setSelectedNodeId(null); setPanel(null); applyHighlight(null); }}
              className="text-slate-400 hover:text-slate-700 text-lg leading-none flex-shrink-0 mt-0.5"
            >×</button>
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Liên kết ({panel.connections.length})
          </div>
          <ul className="space-y-2 max-h-52 overflow-y-auto">
            {panel.connections.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold text-xs mt-0.5 flex-shrink-0 w-16">{c.dir}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-700 font-medium leading-tight truncate">{c.label}</div>
                  {c.pct && (
                    <span className="inline-block mt-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                      {c.pct}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function NetworkGraph(props: NetworkGraphProps) {
  return (
    <ReactFlowProvider>
      <NetworkGraphInner {...props} />
    </ReactFlowProvider>
  );
}
