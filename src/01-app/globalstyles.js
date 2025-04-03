window.addEventListener('scroll', function() {
    // Получаем текущую позицию прокрутки
    let scrollPosition = window.scrollY;
  
    // 120vh, который эквивалентен 120% от высоты экрана
    let maxScroll = 1.6 * window.innerHeight; // 120vh
  
    // Вычисляем новую прозрачность
    let opacity = Math.min(scrollPosition / maxScroll, 1); // Плавно увеличиваем прозрачность до 1
  
    // Создаем новый линейный градиент с измененной прозрачностью
    let gradient = `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity}))`;
  
    // Обновляем фоновое изображение и градиент
    document.body.style.background = `${gradient}, url(../assets/creation_of_adam.jpg)`;
});