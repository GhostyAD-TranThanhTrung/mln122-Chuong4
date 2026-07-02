import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, mediaType } = req.body;

    const anthropic = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
          { type: 'text', text: 'Look at this product or logo. Identify the PUBLICLY TRADED parent company that owns or manufactures it (you may want to look up yahoo finances). For example, if it is GitHub, the parent is Microsoft Corporation. If the company is already public, return that company. Respond ONLY with the exact name of the publicly traded parent company, nothing else. Do not include quotes or extra text.' }
        ]
      }]
    });

    const companyName = (response.content[0] as any).text.trim();
    return res.status(200).json({ companyName });
  } catch (error: any) {
    console.error('Image identify error:', error);
    return res.status(500).json({ error: error.message || 'AI error' });
  }
}
