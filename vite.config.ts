import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import YahooFinance from 'yahoo-finance2'
import Anthropic from '@anthropic-ai/sdk'
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

function yahooFinanceApiPlugin(anthropicApiKey: string): Plugin {
  return {
    name: 'yahoo-finance-api',
    configureServer(server) {
      server.middlewares.use('/api/holders', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          const ticker = url.searchParams.get('ticker');
          const depth = parseInt(url.searchParams.get('depth') || '2', 10);

          if (!ticker) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Ticker is required' }));
            return;
          }

          // Helper to validate a real ticker symbol format
          const isValidTicker = (s: string) => /^[A-Z0-9.\-]{1,10}$/.test(s);

          // Resolve ticker: try direct lookup first, fall back to search if it fails
          let resolvedTicker = ticker.trim().toUpperCase();
          let resolvedName: string | null = null;
          let quote: any = null;

          // Try direct quoteSummary — works if input is already a valid ticker
          if (isValidTicker(resolvedTicker)) {
            try {
              quote = await yahooFinance.quoteSummary(resolvedTicker, {
                modules: ['institutionOwnership', 'fundOwnership', 'price', 'majorHoldersBreakdown']
              }) as any;
              resolvedName = quote?.price?.shortName || quote?.price?.longName || null;
            } catch (_) {
              // Direct lookup failed — fall through to search
              quote = null;
            }
          }

          // If direct lookup failed or input wasn't ticker-shaped, search for it
          if (!quote) {
            const searchResult = await yahooFinance.search(ticker) as any;
            const bestMatch = searchResult?.quotes?.find((q: any) =>
              q.isYahooFinance && q.symbol && isValidTicker(q.symbol) &&
              (q.typeDisp === 'Equity' || q.typeDisp === 'ETF')
            );
            if (!bestMatch) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: `Could not find a company for: "${ticker}". Try a different name or stock symbol like AAPL or KO.` }));
              return;
            }
            resolvedTicker = bestMatch.symbol;
            resolvedName = bestMatch.shortname || bestMatch.longname || null;
            quote = await yahooFinance.quoteSummary(resolvedTicker, {
              modules: ['institutionOwnership', 'fundOwnership', 'price', 'majorHoldersBreakdown']
            }) as any;
            if (!resolvedName) {
              resolvedName = quote?.price?.shortName || quote?.price?.longName || null;
            }
          }

          const rootLabel = resolvedName ? `${resolvedName} (${resolvedTicker})` : resolvedTicker;

          const nodes: any[] = [
            { id: resolvedTicker, label: rootLabel, type: 'product', description: `Target Company · ${resolvedTicker}` }
          ];
          const links: any[] = [];

          // Depth 1 holders already in `quote`

          const institutions = quote.institutionOwnership?.ownershipList || [];
          const funds = quote.fundOwnership?.ownershipList || [];

          // Combine and sort by pctHeld, take top 10
          const combined = [...institutions, ...funds]
            .sort((a, b) => (b.pctHeld || 0) - (a.pctHeld || 0))
            .slice(0, 10);

          for (const holder of combined) {
            const holderName = holder.organization;
            if (!holderName) continue;

            const holderId = holderName;
            if (!nodes.find(n => n.id === holderId)) {
              nodes.push({ id: holderId, label: holderName, type: 'fund', description: `Nắm giữ ${((holder.pctHeld || 0) * 100).toFixed(2)}%` });
            }
            links.push({ source: holderId, target: resolvedTicker, label: `${((holder.pctHeld || 0) * 100).toFixed(2)}%` });

            // 2. Fetch Depth 2 (Holders' Holders)
            if (depth >= 2) try {
              const searchResult = await yahooFinance.search(holderName) as any;
              const bestMatch = searchResult.quotes.find((q: any) => q.isYahooFinance && (q.typeDisp === 'Equity' || q.typeDisp === 'ETF'));

              if (bestMatch && bestMatch.symbol && isValidTicker(bestMatch.symbol)) {
                const holderTicker = bestMatch.symbol;
                const holderQuote = await yahooFinance.quoteSummary(holderTicker, {
                  modules: ['institutionOwnership', 'fundOwnership']
                }) as any;

                const hInst = holderQuote.institutionOwnership?.ownershipList || [];
                const hFunds = holderQuote.fundOwnership?.ownershipList || [];
                const hCombined = [...hInst, ...hFunds]
                  .sort((a, b) => (b.pctHeld || 0) - (a.pctHeld || 0))
                  .slice(0, 10);

                for (const subHolder of hCombined) {
                  const subHolderName = subHolder.organization;
                  if (!subHolderName) continue;

                  if (!nodes.find(n => n.id === subHolderName)) {
                    nodes.push({ id: subHolderName, label: subHolderName, type: 'brand', description: `Nắm giữ ${((subHolder.pctHeld || 0) * 100).toFixed(2)}% của ${holderName}` });
                  }
                  links.push({ source: subHolderName, target: holderId, label: `${((subHolder.pctHeld || 0) * 100).toFixed(2)}%` });

                }
              }
            } catch (e) {
              console.error(`Error fetching depth 2 for ${holderName}:`, e);
              // Ignore and continue
            }
          }

          const breakdown = quote.majorHoldersBreakdown;
          const majorHoldersBreakdown = breakdown ? {
            insidersPercentHeld: breakdown.insidersPercentHeld,
            institutionsPercentHeld: breakdown.institutionsPercentHeld,
            institutionsFloatPercentHeld: breakdown.institutionsFloatPercentHeld,
            institutionsCount: breakdown.institutionsCount
          } : undefined;

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ nodes, links, majorHoldersBreakdown }));
        } catch (error: any) {
          console.error("API Error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
        }
      });

      // POST /api/identify-image — server-side Anthropic call
      server.middlewares.use('/api/identify-image', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req as any) chunks.push(chunk);
          const body = JSON.parse(Buffer.concat(chunks).toString());
          const { imageBase64, mediaType } = body;

          const anthropic = new Anthropic({ apiKey: anthropicApiKey });
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-5',
            max_tokens: 100,
            messages: [{
              role: 'user',
              content: [
                { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
                { type: 'text', text: 'Look at this product. What is the name of the company or brand that manufactures or owns it? Respond ONLY with the exact company name, nothing else.' }
              ]
            }]
          });

          const companyName = (response.content[0] as any).text.trim();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ companyName }));
        } catch (error: any) {
          console.error('Image identify error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message || 'AI error' }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      yahooFinanceApiPlugin(env.VITE_ANTHROPIC_API_KEY),
    ],
    server: {
      proxy: {
        '/api/opensanctions': {
          target: 'https://api.opensanctions.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/opensanctions/, '')
        }
      }
    }
  }
})
