// Простой скрипт для проверки загрузки ресурсов на странице
(function() {
  console.log('Status check script loaded');
  
  // Проверяем загрузку CSS-стилей
  const checkStyles = () => {
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    console.log(`CSS styles loaded: ${styles.length}`);
    
    styles.forEach((style, index) => {
      console.log(`Style ${index + 1}: ${style.href}`);
    });
  };
  
  // Проверяем загрузку скриптов
  const checkScripts = () => {
    const scripts = document.querySelectorAll('script');
    console.log(`Scripts loaded: ${scripts.length}`);
    
    // Выводим только внешние скрипты
    Array.from(scripts)
      .filter(script => script.src)
      .forEach((script, index) => {
        console.log(`Script ${index + 1}: ${script.src}`);
      });
  };
  
  // Проверяем загрузку изображений
  const checkImages = () => {
    const images = document.querySelectorAll('img');
    console.log(`Images on page: ${images.length}`);
    
    images.forEach((img, index) => {
      console.log(`Image ${index + 1}: ${img.src}, Loaded: ${img.complete}`);
    });
  };
  
  // Запускаем проверки после полной загрузки страницы
  window.addEventListener('load', () => {
    console.log('Page fully loaded');
    checkStyles();
    checkScripts();
    checkImages();
    
    // Выводим информацию о путях
    console.log('Window location:', window.location.href);
    console.log('Base path:', document.querySelector('base')?.href || 'No base tag');
  });
})(); 