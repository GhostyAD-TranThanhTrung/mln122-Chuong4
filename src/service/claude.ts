import Anthropic from '@anthropic-ai/sdk';
import type { TracerGraph, OpenSanctionsEntity, TracerNode, TracerLink } from '../types';
import { CONFIG_KEYS, getApiKey } from './config';

function getAnthropicClient() {
  const apiKey = getApiKey(CONFIG_KEYS.ANTHROPIC_API_KEY);
  if (!apiKey) return null;
  
  return new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // Required for client-side usage in Vite
  });
}

export async function identifyBrandFromImage(base64Image: string, mimeType: string): Promise<string> {
  const anthropic = getAnthropicClient();
  if (!anthropic) {
    console.warn('No Anthropic API Key provided. Returning mock brand.');
    return 'Coca-Cola';
  }

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify the main brand or product in this image. Return ONLY the brand name as a plain string, nothing else. Example: Nike"
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType as any,
              data: base64Image,
            }
          }
        ]
      }
    ]
  });

  const textContent = response.content.find(c => c.type === 'text');
  return textContent?.type === 'text' ? textContent.text.trim() : 'Unknown';
}

export async function generateOwnershipGraph(
  brandName: string,
  sanctionsData: OpenSanctionsEntity | null
): Promise<TracerGraph> {
  const anthropic = getAnthropicClient();
  
  if (!anthropic) {
    console.warn('No Anthropic API Key provided. Bypassing AI and parsing OpenSanctions data directly.');
    if (sanctionsData) {
      return buildGraphFromSanctions(sanctionsData);
    }
    return getMockGraph(brandName);
  }

  const prompt = `
Act as an expert in Marxist-Leninist political economy and corporate ownership structures.
Analyze the ownership chain of "${brandName}".

I have provided some corporate data from OpenSanctions:
${sanctionsData ? JSON.stringify(sanctionsData, null, 2) : 'No data available from OpenSanctions.'}

Generate a corporate ownership tracer network mapping to Lenin's theory of financial capital and the participation system (chế độ tham dự).
You must output ONLY raw JSON mapping exactly to this TypeScript interface:
{
  "nodes": [
    { "id": "string", "label": "string", "type": "product" | "brand" | "holding" | "fund" | "oligarch", "description": "Vietnamese description matching MLN theory" }
  ],
  "links": [
    { "source": "node_id", "target": "node_id", "label": "string (e.g., 'Sở hữu 15%', 'Sở hữu chéo')" }
  ]
}

The chain must typically flow: Product -> Brand Company (Tư bản công nghiệp) -> Holding/Parent (Tổ chức độc quyền) -> Investment Funds (Tư bản tài chính, e.g., BlackRock, Vanguard) -> Oligarchs (Tài phiệt).
No markdown, no explanation, ONLY the JSON string.
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (textContent?.type === 'text') {
      const cleanJson = textContent.text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    }
    throw new Error('Failed to parse Claude response');
  } catch (e) {
    console.error('Claude API Error:', e);
    return getMockGraph(brandName);
  }
}

function buildGraphFromSanctions(entity: OpenSanctionsEntity): TracerGraph {
  const nodes: TracerNode[] = [];
  const links: TracerLink[] = [];
  const mainId = entity.id;

  const makeId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, '-');

  nodes.push({
    id: mainId,
    label: entity.caption,
    type: entity.schema === 'Person' ? 'oligarch' : (entity.schema === 'Company' ? 'brand' : 'holding'),
    description: `Sanctions Data: ${entity.datasets?.join(', ') || 'N/A'}`
  });

  const addRelations = (propName: string, relationLabel: string, targetType: 'product' | 'brand' | 'holding' | 'fund' | 'oligarch') => {
    const related = entity.properties[propName] || [];
    related.forEach((relName) => {
      const relId = makeId(relName);
      nodes.push({
        id: relId,
        label: relName,
        type: targetType,
        description: `Derived from ${propName}`
      });
      links.push({
        source: mainId,
        target: relId,
        label: relationLabel
      });
    });
  };

  addRelations('owner', 'Sở hữu bởi', 'fund');
  addRelations('parent', 'Công ty mẹ', 'holding');
  addRelations('directors', 'Giám đốc/Lãnh đạo', 'oligarch');
  addRelations('members', 'Thành viên', 'oligarch');
  addRelations('subsidiaries', 'Công ty con', 'brand');
  
  return { nodes, links };
}

function getMockGraph(brandName: string): TracerGraph {
  const brand = brandName || 'Ví dụ';
  
  const makeId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const nodes = [
    { id: makeId(`${brand} Beverage`), label: `${brand} Beverage`, type: 'product', description: 'Hàng hóa tiêu dùng cốt lõi' },
    { id: makeId(`${brand} Apparel`), label: `${brand} Apparel`, type: 'product', description: 'Hàng hóa phụ trợ/thời trang' },
    { id: makeId(`The ${brand} Company`), label: `The ${brand} Company`, type: 'brand', description: 'Tư bản công nghiệp sản xuất trực tiếp' },
    
    { id: makeId(`${brand} Enterprises Inc. (US)`), label: `${brand} Enterprises Inc. (US)`, type: 'holding', description: 'Tổ chức độc quyền (Holding - Trụ sở chính)' },
    { id: makeId(`${brand} Europe Ltd.`), label: `${brand} Europe Ltd.`, type: 'holding', description: 'Chi nhánh Châu Âu' },
    { id: makeId(`${brand} Asia Pacific`), label: `${brand} Asia Pacific`, type: 'holding', description: 'Chi nhánh Châu Á Thái Bình Dương' },
    
    { id: makeId('BlackRock Fund Advisors'), label: 'BlackRock Fund Advisors', type: 'fund', description: 'Tư bản tài chính (Chi phối 6.5%)' },
    { id: makeId('Vanguard Group'), label: 'Vanguard Group', type: 'fund', description: 'Tư bản tài chính (Chi phối 8.2%)' },
    { id: makeId('State Street Corp'), label: 'State Street Corp', type: 'fund', description: 'Tư bản tài chính (Chi phối 4.1%)' },
    { id: makeId('Berkshire Hathaway'), label: 'Berkshire Hathaway', type: 'fund', description: 'Công ty đầu tư đa quốc gia' },
    
    { id: makeId('Tài phiệt Phố Wall'), label: 'Tài phiệt Phố Wall', type: 'oligarch', description: 'Nhóm lợi ích, tầng lớp tinh hoa' },
    { id: makeId('Warren Buffett'), label: 'Warren Buffett', type: 'oligarch', description: 'Tỉ phú kiểm soát vốn' },
    { id: makeId('Gia tộc X'), label: 'Gia tộc X', type: 'oligarch', description: 'Thế lực tư bản ngầm' }
  ] as TracerNode[];

  return {
    nodes,
    links: [
      { source: makeId(`${brand} Beverage`), target: makeId(`The ${brand} Company`), label: 'Sản xuất bởi' },
      { source: makeId(`${brand} Apparel`), target: makeId(`The ${brand} Company`), label: 'Sản xuất bởi' },
      
      { source: makeId(`The ${brand} Company`), target: makeId(`${brand} Enterprises Inc. (US)`), label: 'Công ty con (100%)' },
      { source: makeId(`The ${brand} Company`), target: makeId(`${brand} Europe Ltd.`), label: 'Sở hữu (70%)' },
      { source: makeId(`The ${brand} Company`), target: makeId(`${brand} Asia Pacific`), label: 'Sở hữu (85%)' },
      
      { source: makeId(`${brand} Enterprises Inc. (US)`), target: makeId('BlackRock Fund Advisors'), label: 'Cổ đông lớn' },
      { source: makeId(`${brand} Enterprises Inc. (US)`), target: makeId('Vanguard Group'), label: 'Cổ đông lớn' },
      { source: makeId(`${brand} Enterprises Inc. (US)`), target: makeId('State Street Corp'), label: 'Cổ đông lớn' },
      { source: makeId(`${brand} Enterprises Inc. (US)`), target: makeId('Berkshire Hathaway'), label: 'Sở hữu cổ phần (9%)' },
      
      { source: makeId('BlackRock Fund Advisors'), target: makeId('Tài phiệt Phố Wall'), label: 'Chế độ tham dự' },
      { source: makeId('Vanguard Group'), target: makeId('Tài phiệt Phố Wall'), label: 'Chế độ tham dự' },
      { source: makeId('State Street Corp'), target: makeId('Tài phiệt Phố Wall'), label: 'Chế độ tham dự' },
      
      { source: makeId('Berkshire Hathaway'), target: makeId('Warren Buffett'), label: 'Quyền kiểm soát cốt lõi' },
      { source: makeId('BlackRock Fund Advisors'), target: makeId('Gia tộc X'), label: 'Liên kết ngầm' },
      { source: makeId('Vanguard Group'), target: makeId('Gia tộc X'), label: 'Đồng sở hữu' }
    ]
  };
}
