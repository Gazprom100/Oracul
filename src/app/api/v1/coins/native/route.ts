import { NextResponse } from 'next/server';

export async function GET() {
  // Mock native coin data
  const nativeCoin = {
    symbol: 'DEL',
    name: 'Decimal',
    price: 1.25,
    marketCap: 24700000,
    supply: 10550000,
    description: 'Decimal is the native cryptocurrency of the platform. It is used for transaction fees, staking, governance, and various utilities within the ecosystem.'
  };
  
  return NextResponse.json({ ok: true, result: nativeCoin });
} 