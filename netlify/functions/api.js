// Netlify Serverless Function for API
exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api', '');
  const segments = path.split('/').filter(Boolean);
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS enabled' })
    };
  }

  try {
    // Parse query parameters
    const params = event.queryStringParameters || {};
    
    // Handle routes based on path segments
    if (segments.length === 0 || (segments.length === 1 && segments[0] === 'coins')) {
      // GET /api/v1/coins/coins
      // Handle coins list endpoint
      const limit = parseInt(params.limit) || 10;
      const offset = parseInt(params.offset) || 0;
      
      const mockCoins = Array.from({ length: 100 }).map((_, index) => {
        const price = Math.random() * 1000;
        const change24h = (Math.random() * 20) - 10; // Between -10% and +10%
        
        return {
          symbol: `COIN${index + 1}`,
          name: `Coin ${index + 1}`,
          price,
          marketCap: price * (1000000 + Math.random() * 9000000),
          volume24h: price * (100000 + Math.random() * 900000),
          change24h,
        };
      });
      
      // Return paginated results
      const result = mockCoins.slice(offset, offset + limit);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result })
      };
    } 
    else if (segments.length === 1 && segments[0] === 'delprice') {
      // GET /api/v1/coins/delprice
      // Mock DEL price data
      const delPrice = {
        price: 0.0687,
        change24h: 2.34,
        marketCap: 24700000,
        volume24h: 1120000,
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result: delPrice })
      };
    } 
    else if (segments.length === 1 && segments[0] === 'live') {
      // GET /api/v1/coins/live
      // Mock live data
      const liveData = {
        totalCoins: 1025,
        activeCoins: 834,
        totalMarketCap: 203500000000,
        total24hVolume: 10800000000,
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result: liveData })
      };
    } 
    else if (segments.length === 1 && segments[0] === 'native') {
      // GET /api/v1/coins/native
      // Mock native coin data
      const nativeCoin = {
        symbol: 'DEL',
        name: 'Decimal',
        price: 1.25,
        marketCap: 24700000,
        supply: 10550000,
        description: 'Decimal is the native cryptocurrency of the platform. It is used for transaction fees, staking, governance, and various utilities within the ecosystem.'
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result: nativeCoin })
      };
    } 
    else if (segments.length === 1 && segments[0] === 'ratings') {
      // GET /api/v1/coins/ratings
      // Mock ratings data
      const limit = parseInt(params.limit) || 1000;
      const offset = parseInt(params.offset) || 0;

      const mockRatings = Array.from({ length: 100 }).map((_, index) => {
        return {
          symbol: `COIN${index + 1}`,
          name: `Coin ${index + 1}`,
          rating: Math.min(10, Math.max(0, 5 + (Math.random() * 6) - 3)), // Between 2 and 8
          rank: index + 1,
        };
      }).sort((a, b) => b.rating - a.rating)
        .map((item, index) => ({ ...item, rank: index + 1 }));
      
      // Return paginated results
      const result = mockRatings.slice(offset, offset + limit);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result })
      };
    } 
    else if (segments.length === 1) {
      // GET /api/v1/coins/{symbol}
      const symbol = segments[0];
      
      // Generate coin details
      const name = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
      const price = Math.random() * 1000;
      const change24h = (Math.random() * 20) - 10; // Between -10% and +10%
      
      const coinDetails = {
        symbol,
        name,
        price,
        marketCap: price * (1000000 + Math.random() * 9000000),
        volume24h: price * (100000 + Math.random() * 900000),
        change24h,
        supply: 1000000 + Math.floor(Math.random() * 9000000),
        description: `${name} is a cryptocurrency that aims to ${
          ['revolutionize payments', 'enhance privacy', 'improve scalability', 'provide smart contract functionality'][Math.floor(Math.random() * 4)]
        } in the blockchain space.`,
        website: `https://${symbol.toLowerCase()}.org`,
        explorer: `https://explorer.blockchain.com/${symbol.toLowerCase()}`,
        twitter: `https://twitter.com/${symbol.toLowerCase()}`,
        reddit: `https://reddit.com/r/${symbol.toLowerCase()}`,
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, result: coinDetails })
      };
    }
    
    // If no route matches
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ ok: false, error: 'Not Found', message: 'Endpoint not found', statusCode: 404 })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: 'Internal Server Error', message: error.message, statusCode: 500 })
    };
  }
}; 