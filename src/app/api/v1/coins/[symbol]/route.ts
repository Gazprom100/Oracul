import { NextResponse } from 'next/server';

// Mock coin data generator
const generateCoinDetails = (symbol: string) => {
  const name = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
  const price = Math.random() * 1000;
  const change24h = (Math.random() * 20) - 10; // Between -10% and +10%
  
  return {
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
};

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol;
  
  // Generate coin details
  const coinDetails = generateCoinDetails(symbol);
  
  return NextResponse.json({ ok: true, result: coinDetails });
} 