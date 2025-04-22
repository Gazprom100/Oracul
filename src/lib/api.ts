import axios from 'axios';
import { 
  ApiResponse, 
  Coin, 
  DelPrice, 
  LiveData, 
  NativeCoin, 
  CoinRating 
} from '@/interfaces/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1/coins';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCoins = async (limit = 10, offset = 0): Promise<ApiResponse<Coin[]>> => {
  try {
    const response = await api.get<ApiResponse<Coin[]>>('/', {
      params: { limit, offset },
    });
    
    // Проверяем, что ответ содержит массив
    if (!response.data.result || !Array.isArray(response.data.result)) {
      console.error('API response is not an array:', response.data);
      return { ok: true, result: [] };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return { ok: false, result: [] };
  }
};

export const getDelPrice = async (): Promise<ApiResponse<DelPrice>> => {
  const response = await api.get<ApiResponse<DelPrice>>('/delprice');
  return response.data;
};

export const getLiveData = async (): Promise<ApiResponse<LiveData>> => {
  const response = await api.get<ApiResponse<LiveData>>('/live');
  return response.data;
};

export const getNativeCoin = async (): Promise<ApiResponse<NativeCoin>> => {
  const response = await api.get<ApiResponse<NativeCoin>>('/native');
  return response.data;
};

export const getCoinRatings = async (limit = 1000, offset = 0): Promise<ApiResponse<CoinRating[]>> => {
  const response = await api.get<ApiResponse<CoinRating[]>>('/ratings', {
    params: { limit, offset },
  });
  return response.data;
};

export const getCoinBySymbol = async (symbol: string): Promise<ApiResponse<Coin>> => {
  const response = await api.get<ApiResponse<Coin>>(`/${symbol}`);
  return response.data;
}; 