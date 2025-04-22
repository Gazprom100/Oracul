import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock ratings data
const mockRatings = Array.from({ length: 100 }).map((_, index) => {
  return {
    symbol: `COIN${index + 1}`,
    name: `Coin ${index + 1}`,
    rating: Math.min(10, Math.max(0, 5 + (Math.random() * 6) - 3)), // Between 2 and 8
    rank: index + 1,
  };
}).sort((a, b) => b.rating - a.rating)
  .map((item, index) => ({ ...item, rank: index + 1 }));

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '1000');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  // Return paginated results
  const result = mockRatings.slice(offset, offset + limit);
  
  return NextResponse.json({ ok: true, result });
} 