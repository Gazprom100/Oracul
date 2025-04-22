import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock data
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  // Return paginated results
  const result = mockCoins.slice(offset, offset + limit);
  
  return NextResponse.json({ ok: true, result });
} 