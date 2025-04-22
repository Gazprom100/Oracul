export interface ApiResponse<T> {
  ok: boolean;
  result: T;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export interface Coin {
  symbol: string;
  name: string;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  [key: string]: any;
}

export interface DelPrice {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

export interface LiveData {
  totalCoins: number;
  activeCoins: number;
  totalMarketCap: number;
  total24hVolume: number;
}

export interface NativeCoin {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  supply: number;
  [key: string]: any;
}

export interface CoinRating {
  symbol: string;
  name: string;
  rating: number;
  rank: number;
  [key: string]: any;
} 