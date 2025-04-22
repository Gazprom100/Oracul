'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SettingsState } from '@/interfaces/settings';

// Значения по умолчанию
const defaultSettings: SettingsState = {
  apiKeys: {
    coinMarketCap: '',
    coingecko: '',
    etherscan: '',
    infura: '',
    alchemy: '',
    chainlink: '',
    custom: {},
  },
  modules: {
    marketOverview: {
      enabled: true,
      apiSource: 'coingecko',
      refreshInterval: 60,
      dataLimit: 100,
    },
    tokenInfo: {
      enabled: true,
      apiSource: 'coingecko',
      refreshInterval: 60,
    },
    holderAnalytics: {
      enabled: true,
      apiSource: 'etherscan',
      refreshInterval: 600,
    },
    priceChart: {
      enabled: true,
      apiSource: 'coingecko',
      refreshInterval: 60,
    },
    socialActivity: {
      enabled: true,
      apiSource: 'custom',
      refreshInterval: 300,
    },
    walletAnalytics: {
      enabled: true,
      apiSource: 'etherscan',
      refreshInterval: 300,
    },
    heatMap: {
      enabled: true,
      apiSource: 'coingecko',
      refreshInterval: 300,
    },
    staking: {
      enabled: true,
      apiSource: 'custom',
      refreshInterval: 300,
    },
    defi: {
      enabled: true,
      apiSource: 'custom',
      refreshInterval: 300,
    },
  },
  ui: {
    theme: 'dark',
    accentColor: 'blue',
    compactMode: false,
    dataFormat: 'decimal',
    chartStyle: 'candlestick',
    language: 'ru',
  },
  notifications: {
    priceAlerts: true,
    newsAlerts: true,
    walletActivity: true,
    emailNotifications: false,
  },
};

interface SettingsContextType {
  settings: SettingsState;
  updateApiKey: (provider: keyof SettingsState['apiKeys'], key: string) => void;
  updateModuleSettings: (
    moduleName: keyof SettingsState['modules'],
    settings: Partial<SettingsState['modules'][keyof SettingsState['modules']]>
  ) => void;
  updateUiSettings: (settings: Partial<SettingsState['ui']>) => void;
  updateNotificationSettings: (settings: Partial<SettingsState['notifications']>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  // Загрузка настроек из localStorage при инициализации
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('oracul_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
  }, []);

  // Сохранение настроек в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem('oracul_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  }, [settings]);

  const updateApiKey = (provider: keyof SettingsState['apiKeys'], key: string) => {
    setSettings((prev) => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [provider]: key,
      },
    }));
  };

  const updateModuleSettings = (
    moduleName: keyof SettingsState['modules'],
    moduleSettings: Partial<SettingsState['modules'][keyof SettingsState['modules']]>
  ) => {
    setSettings((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          ...prev.modules[moduleName],
          ...moduleSettings,
        },
      },
    }));
  };

  const updateUiSettings = (uiSettings: Partial<SettingsState['ui']>) => {
    setSettings((prev) => ({
      ...prev,
      ui: {
        ...prev.ui,
        ...uiSettings,
      },
    }));
  };

  const updateNotificationSettings = (notificationSettings: Partial<SettingsState['notifications']>) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...notificationSettings,
      },
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateApiKey,
        updateModuleSettings,
        updateUiSettings,
        updateNotificationSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 