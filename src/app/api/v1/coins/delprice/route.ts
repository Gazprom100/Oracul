import { NextResponse } from 'next/server';

export async function GET() {
  // Mock DEL price data
  const delPrice = {
    price: 0.0687,
    change24h: 2.34,
    marketCap: 24700000,
    volume24h: 1120000,
  };
  
  return NextResponse.json({ ok: true, result: delPrice });
} 