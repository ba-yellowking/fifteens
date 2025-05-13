// Нахождение пустой ячейки
export function findEmptyTile(tiles) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (tiles[row][col] === 0) {
        return { row: row, col: col}
      }
    }
  }
  // Возвращаем -1 если пустая ячейка не найдена
  return { row: -1, col: -1 }
}