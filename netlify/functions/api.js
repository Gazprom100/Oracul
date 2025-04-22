// Пример простой функции Netlify для проверки работы API
exports.handler = async function(event, context) {
  try {
    // Базовый ответ для проверки доступности API
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'API работает корректно',
        timestamp: new Date().toISOString(),
        path: event.path,
        method: event.httpMethod
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Внутренняя ошибка сервера', details: error.message })
    };
  }
}; 