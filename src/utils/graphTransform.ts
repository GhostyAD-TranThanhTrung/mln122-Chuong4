import type { TracerGraph, TracerNode, TracerLink } from '../types';

export function sanitizeGraphData(data: any): TracerGraph {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.links)) {
    throw new Error('Dữ liệu biểu đồ không hợp lệ (thiếu nodes hoặc links).');
  }

  const nodes: TracerNode[] = data.nodes.map((n: any, index: number) => ({
    id: n.id ? String(n.id) : `node_${index}`,
    label: n.label || 'Unknown',
    type: n.type || 'brand',
    description: n.description || '',
    registrationNumber: n.registrationNumber,
    jurisdiction: n.jurisdiction
  }));

  const nodeIds = new Set(nodes.map(n => n.id));

  const links: TracerLink[] = data.links
    .filter((l: any) => l.source !== undefined && l.target !== undefined)
    .map((l: any) => ({
      source: String(l.source),
      target: String(l.target),
      label: l.label || ''
    }))
    .filter((l: TracerLink) => nodeIds.has(l.source) && nodeIds.has(l.target));

  return { nodes, links };
}

export function mergeGraphs(graph1: TracerGraph, graph2: TracerGraph): TracerGraph {
  const nodeMap = new Map<string, TracerNode>();
  
  graph1.nodes.forEach(n => nodeMap.set(n.id, n));
  graph2.nodes.forEach(n => nodeMap.set(n.id, n));

  const linkSet = new Set<string>();
  const mergedLinks: TracerLink[] = [];

  const addLink = (link: TracerLink) => {
    const key = `${link.source}-${link.target}`;
    if (!linkSet.has(key)) {
      linkSet.add(key);
      mergedLinks.push(link);
    }
  };

  graph1.links.forEach(addLink);
  graph2.links.forEach(addLink);

  return {
    nodes: Array.from(nodeMap.values()),
    links: mergedLinks
  };
}
