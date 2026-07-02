import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export default async function handler(req: any, res: any) {
  try {
    const { ticker: queryTicker, depth: queryDepth } = req.query;
    const ticker = queryTicker as string;
    const depth = parseInt((queryDepth as string) || '2', 10);

    if (!ticker) {
      return res.status(400).json({ error: 'Ticker is required' });
    }

    const isValidTicker = (s: string) => /^[A-Z0-9.\-]{1,10}$/.test(s);

    let resolvedTicker = ticker.trim().toUpperCase();
    let resolvedName: string | null = null;
    let quote: any = null;

    if (isValidTicker(resolvedTicker)) {
      try {
        quote = await yahooFinance.quoteSummary(resolvedTicker, {
          modules: ['institutionOwnership', 'fundOwnership', 'price', 'majorHoldersBreakdown']
        }) as any;
        resolvedName = quote?.price?.shortName || quote?.price?.longName || null;
      } catch (_) {
        quote = null;
      }
    }

    if (!quote) {
      const searchResult = await yahooFinance.search(ticker) as any;
      const bestMatch = searchResult?.quotes?.find((q: any) =>
        q.isYahooFinance && q.symbol && isValidTicker(q.symbol) &&
        (q.typeDisp === 'Equity' || q.typeDisp === 'ETF')
      );
      if (!bestMatch) {
        return res.status(404).json({ error: `Could not find a company for: "${ticker}". Try a different name or stock symbol like AAPL or KO.` });
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

    const institutions = quote.institutionOwnership?.ownershipList || [];
    const funds = quote.fundOwnership?.ownershipList || [];

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

      if (depth >= 2) {
        try {
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
        }
      }
    }

    const breakdown = quote.majorHoldersBreakdown;
    const majorHoldersBreakdown = breakdown ? {
      insidersPercentHeld: breakdown.insidersPercentHeld,
      institutionsPercentHeld: breakdown.institutionsPercentHeld,
      institutionsFloatPercentHeld: breakdown.institutionsFloatPercentHeld,
      institutionsCount: breakdown.institutionsCount
    } : undefined;

    return res.status(200).json({ nodes, links, majorHoldersBreakdown });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
