import { NextResponse } from 'next/server';

export async function GET() {
  // Mock live data
  const liveData = {
    totalCoins: 1025,
    activeCoins: 834,
    totalMarketCap: 203500000000,
    total24hVolume: 10800000000,
  };
  
  return NextResponse.json({ ok: true, result: liveData });
} 