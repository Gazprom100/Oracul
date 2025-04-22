export interface ApiSettings {
  coinMarketCap?: string;
  coingecko?: string;
  etherscan?: string;
  infura?: string;
  alchemy?: string;
  chainlink?: string;
  custom?: Record<string, string>;
}

export interface ModuleSettings {
  enabled: boolean;
  apiSource: 'coinMarketCap' | 'coingecko' | 'etherscan' | 'infura' | 'alchemy' | 'chainlink' | 'custom';
  customEndpoint?: string;
  refreshInterval: number; // в секундах
  dataLimit?: number;
}

export interface SettingsState {
  apiKeys: ApiSettings;
  modules: {
    marketOverview: ModuleSettings;
    tokenInfo: ModuleSettings;
    holderAnalytics: ModuleSettings;
    priceChart: ModuleSettings;
    socialActivity: ModuleSettings;
    walletAnalytics: ModuleSettings;
    heatMap: ModuleSettings;
    staking: ModuleSettings;
    defi: ModuleSettings;
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    accentColor: 'blue' | 'green' | 'purple' | 'orange';
    compactMode: boolean;
    dataFormat: 'decimal' | 'abbreviated' | 'currency';
    chartStyle: 'candlestick' | 'line' | 'area';
    language: string;
  };
  notifications: {
    priceAlerts: boolean;
    newsAlerts: boolean;
    walletActivity: boolean;
    emailNotifications: boolean;
  };
} 