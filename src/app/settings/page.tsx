'use client';

import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Tab } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const { settings, updateApiKey, updateModuleSettings, updateUiSettings, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState(0);

  // Форматированные названия модулей для отображения
  const moduleNames: Record<keyof typeof settings.modules, string> = {
    marketOverview: 'Обзор рынка',
    tokenInfo: 'Информация о токене',
    holderAnalytics: 'Анализ держателей',
    priceChart: 'Графики цен',
    socialActivity: 'Социальная активность',
    walletAnalytics: 'Анализ кошельков',
    heatMap: 'Тепловая карта',
    staking: 'Стейкинг',
    defi: 'DeFi интеграции',
  };

  // Форматированные названия API источников
  const apiSourceNames: Record<string, string> = {
    coinMarketCap: 'CoinMarketCap',
    coingecko: 'CoinGecko',
    etherscan: 'Etherscan',
    infura: 'Infura',
    alchemy: 'Alchemy',
    chainlink: 'Chainlink',
    custom: 'Пользовательский API',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Боковая панель с разделами настроек */}
        <div className="lg:col-span-1 space-y-2">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex flex-col space-y-1">
              {['API ключи', 'Модули', 'Интерфейс', 'Уведомления'].map((category, idx) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `px-4 py-3 text-left rounded-lg transition-all ${
                      selected
                        ? 'bg-primary-color text-white'
                        : 'text-text-secondary hover:bg-card-bg hover:text-text-color'
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>

          <div className="mt-8">
            <button
              onClick={resetSettings}
              className="w-full px-4 py-2 text-sm text-danger-color border border-danger-color rounded-lg hover:bg-danger-color/10 transition-colors"
            >
              Сбросить настройки
            </button>
          </div>
        </div>

        {/* Основной контент настроек */}
        <div className="lg:col-span-3">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.Panels>
              {/* API ключи */}
              <Tab.Panel>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">API ключи</h2>
                  <p className="text-text-secondary mb-6">
                    Добавьте API ключи для доступа к внешним сервисам. Ключи хранятся только в вашем браузере.
                  </p>

                  <div className="space-y-4">
                    {Object.entries(apiSourceNames).map(([key, name]) => (
                      <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label htmlFor={`api-key-${key}`} className="text-text-color font-medium">
                          {name}
                        </label>
                        <div className="md:col-span-2">
                          <input
                            id={`api-key-${key}`}
                            type="text"
                            value={key === 'custom' ? '' : (settings.apiKeys[key as keyof typeof settings.apiKeys] || '')}
                            onChange={(e) => updateApiKey(key as keyof typeof settings.apiKeys, e.target.value)}
                            placeholder={`Введите API ключ для ${name}`}
                            className="w-full px-4 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>

              {/* Модули */}
              <Tab.Panel>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Настройки модулей</h2>
                  <p className="text-text-secondary mb-6">
                    Включите или отключите модули и настройте источники данных для каждого из них.
                  </p>

                  <div className="space-y-6">
                    {Object.entries(settings.modules).map(([moduleName, moduleSettings]) => (
                      <div key={moduleName} className="card border-border-color p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">
                            {moduleNames[moduleName as keyof typeof moduleNames]}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-sm text-text-secondary mr-2">
                              {moduleSettings.enabled ? 'Включено' : 'Отключено'}
                            </span>
                            <button
                              onClick={() =>
                                updateModuleSettings(
                                  moduleName as keyof typeof settings.modules,
                                  { enabled: !moduleSettings.enabled }
                                )
                              }
                              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                                moduleSettings.enabled ? 'bg-primary-color' : 'bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                  moduleSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                              Источник данных
                            </label>
                            <select
                              value={moduleSettings.apiSource}
                              onChange={(e) =>
                                updateModuleSettings(
                                  moduleName as keyof typeof settings.modules,
                                  { apiSource: e.target.value as any }
                                )
                              }
                              className="w-full px-3 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                              disabled={!moduleSettings.enabled}
                            >
                              {Object.entries(apiSourceNames).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                              Интервал обновления (сек)
                            </label>
                            <input
                              type="number"
                              value={moduleSettings.refreshInterval}
                              onChange={(e) =>
                                updateModuleSettings(
                                  moduleName as keyof typeof settings.modules,
                                  { refreshInterval: parseInt(e.target.value) || 60 }
                                )
                              }
                              min="10"
                              max="3600"
                              className="w-full px-3 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                              disabled={!moduleSettings.enabled}
                            />
                          </div>

                          {moduleSettings.apiSource === 'custom' && (
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-text-secondary mb-1">
                                Пользовательский эндпоинт
                              </label>
                              <input
                                type="text"
                                value={moduleSettings.customEndpoint || ''}
                                onChange={(e) =>
                                  updateModuleSettings(
                                    moduleName as keyof typeof settings.modules,
                                    { customEndpoint: e.target.value }
                                  )
                                }
                                placeholder="https://api.example.com/endpoint"
                                className="w-full px-3 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                                disabled={!moduleSettings.enabled}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>

              {/* Интерфейс */}
              <Tab.Panel>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Настройки интерфейса</h2>
                  <p className="text-text-secondary mb-6">
                    Настройте внешний вид и поведение интерфейса приложения.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Тема
                        </label>
                        <div className="flex space-x-4">
                          {['light', 'dark', 'system'].map((theme) => (
                            <button
                              key={theme}
                              onClick={() => updateUiSettings({ theme: theme as any })}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                settings.ui.theme === theme
                                  ? 'bg-primary-color text-white'
                                  : 'bg-card-bg text-text-secondary'
                              }`}
                            >
                              {theme === 'light' ? 'Светлая' : theme === 'dark' ? 'Темная' : 'Системная'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Акцентный цвет
                        </label>
                        <div className="flex space-x-4">
                          {[
                            { value: 'blue', label: 'Синий', bg: 'bg-blue-500' },
                            { value: 'green', label: 'Зеленый', bg: 'bg-green-500' },
                            { value: 'purple', label: 'Фиолетовый', bg: 'bg-purple-500' },
                            { value: 'orange', label: 'Оранжевый', bg: 'bg-orange-500' },
                          ].map((color) => (
                            <button
                              key={color.value}
                              onClick={() => updateUiSettings({ accentColor: color.value as any })}
                              className={`w-8 h-8 rounded-full ${color.bg} ${
                                settings.ui.accentColor === color.value
                                  ? 'ring-2 ring-offset-2 ring-offset-background-dark ring-white'
                                  : ''
                              }`}
                              aria-label={color.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="compact-mode" className="text-text-color font-medium">
                          Компактный режим
                        </label>
                        <button
                          onClick={() => updateUiSettings({ compactMode: !settings.ui.compactMode })}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                            settings.ui.compactMode ? 'bg-primary-color' : 'bg-gray-700'
                          }`}
                          id="compact-mode"
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                              settings.ui.compactMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">
                        Уменьшает отступы и размер элементов для отображения большего количества информации.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Формат отображения чисел
                      </label>
                      <select
                        value={settings.ui.dataFormat}
                        onChange={(e) => updateUiSettings({ dataFormat: e.target.value as any })}
                        className="w-full px-3 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                      >
                        <option value="decimal">Десятичный (1,234.56)</option>
                        <option value="abbreviated">Сокращенный (1.2K)</option>
                        <option value="currency">Валюта ($1,234.56)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Стиль графиков
                      </label>
                      <select
                        value={settings.ui.chartStyle}
                        onChange={(e) => updateUiSettings({ chartStyle: e.target.value as any })}
                        className="w-full px-3 py-2 bg-card-bg border border-border-color rounded-lg focus:outline-none focus:border-primary-color"
                      >
                        <option value="candlestick">Свечи</option>
                        <option value="line">Линейный</option>
                        <option value="area">Область</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Уведомления */}
              <Tab.Panel>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Настройки уведомлений</h2>
                  <p className="text-text-secondary mb-6">
                    Управляйте типами уведомлений, которые вы хотите получать.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        id: 'priceAlerts',
                        label: 'Уведомления о ценах',
                        description: 'Получайте уведомления при значительных изменениях цен.',
                      },
                      {
                        id: 'newsAlerts',
                        label: 'Новостные уведомления',
                        description: 'Будьте в курсе важных новостей и событий.',
                      },
                      {
                        id: 'walletActivity',
                        label: 'Активность кошелька',
                        description: 'Уведомления о транзакциях в отслеживаемых кошельках.',
                      },
                      {
                        id: 'emailNotifications',
                        label: 'Email-уведомления',
                        description: 'Получайте уведомления на вашу электронную почту.',
                      },
                    ].map((notification) => (
                      <div key={notification.id} className="flex justify-between items-start py-4 border-b border-border-color">
                        <div>
                          <h3 className="font-medium text-text-color">{notification.label}</h3>
                          <p className="text-sm text-text-secondary mt-1">{notification.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            updateUiSettings({
                              [notification.id]: !settings.notifications[notification.id as keyof typeof settings.notifications],
                            } as any)
                          }
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                            settings.notifications[notification.id as keyof typeof settings.notifications]
                              ? 'bg-primary-color'
                              : 'bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                              settings.notifications[notification.id as keyof typeof settings.notifications]
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
} 