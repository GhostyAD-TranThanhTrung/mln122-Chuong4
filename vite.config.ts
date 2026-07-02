import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import YahooFinance from 'yahoo-finance2'
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

function yahooFinanceApiPlugin(): Plugin {
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
                modules: ['institutionOwnership', 'fundOwnership', 'price']
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
              modules: ['institutionOwnership', 'fundOwnership', 'price']
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

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ nodes, links }));
        } catch (error: any) {
          console.error("API Error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    yahooFinanceApiPlugin(),
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
})
