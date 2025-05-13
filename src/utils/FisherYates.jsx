// Генерация массива со случайными элементами (алгоритм Фишера Йейтса)
export function fisherYates() {
  const numbers = Array.from({length: 16}, (_, i) => i);
  // i - это индекс, который начинается с 0. => возвращает индекс, таким образом получается массив от 0 до 15

  for (let i = numbers.length - 1; i > 0; i--) { // Перебор с конца массива до i > 0
    const j = Math.floor(Math.random() * (i + 1));
    // Math.floor() - округляет в меньшую сторону
    // Math.random() - возвращает случайное число от 0.0000 до 0.9999
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]] // Перестановка
  }
  return numbers;
}