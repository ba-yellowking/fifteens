// Проверка на решаемость
export function isSolvable(array2D) {
  const flatArray = array2D.flat(); // Превращаем shuffled array (передаваемый в array2D) в одномерный массив
  const withoutZero = flatArray.filter(n => n !== 0); // Избавляемся от 0 для подсчета инверсий

  let inversions = 0; // Число инверсий
  for (let i = 0; i < withoutZero.length; i++) { // Сравниваем число а и а + 1 (следующее)
    for (let j = i + 1; j < withoutZero.length; j++) {
      if (withoutZero[i] > withoutZero[j]) { // Если первое число больше второго, инверсия +1
        inversions++
      }
    }
  }

  const rowWithZero = array2D.findIndex(row => row.includes(0)); // Индекс строки сверху вниз
  const rowFromBottom = 4 - rowWithZero; // Индекс строки снизу вверх

  // Правило решаемости
  if (4 % 2 === 0) { // 4 - длина поля, если четное, тогда:
    if (rowFromBottom % 2 === 0) { // Если строка с нулем снизу вверх четная:
      return inversions % 2 === 1; // Количество инверсий должно быть нечетное
    } else {
      return inversions % 2 === 0; // И наоборот
    }
  } else {
    return inversions % 2 === 0; // Если поле меньше, достаточно условия, что количество инверсий четное
  }
}