module.exports = function solveSudoku(matrix) {
  const newMatrix = matrix;
  for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if (matrix[row][col] === 0) {
          const suggs = count(row, col, newMatrix);
          for(let sugg of suggs) {
            newMatrix[row][col] = sugg;
            solveSudoku(newMatrix);
          } 
        }
     }
  }
  return newMatrix;
  }
  
  function count(row, col, matrix) {
      const suggs = [];
      row = help(row) * 3;
      col = help(col) * 3;
      for(let i = 0; i < 9; i++) {
        suggs.push([matrix[row][i], matrix[i][col], matrix [row + i % 3][col + help(i)]]);
  
      }
  return suggs;
  }
  
  function help(num) {
    return Math.floor(num/3)  
  }
