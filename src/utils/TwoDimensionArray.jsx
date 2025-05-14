// Массив от 0 до 15 необходимо превратить в двумерный массив
export function twoDArray(numbers) {
  const result = [];
  for (let i = 0; i < 4; i++) { // Одна строка будет содержать 4 числа (0, 1, 2, 3)
    result.push(numbers.slice(i * 4, i * 4 + 4)); // i=0, тогда начинается с 0 и до 0 + 4, то есть [0, 1, 2, 3]
  }
  return result;
}