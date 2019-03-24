module.exports = function solveSudoku(matrix) {

  var possibleSolutions = [];
  for (let i = 0; i < 9; i++) {
    possibleSolutions[i] = [];
    for (let j = 0; j < 9; j++) {
      possibleSolutions[i][j] = [];
    }
  }
  var combination = [];
  for (let i = 0; i < 9; i++) {
    combination[i] = [];
    for (let j = 0; j < 9; j++) {
      combination[i][j] = 0;
    }
  }
  var solution = [];
  for (let i = 0; i < 9; i++) {
    solution[i] = [];
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solution[i][j] = matrix[i][j];
    }
  }

  //looking for possible solutions
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (!matrix[i][j]) {
          for (let k = 0; k <= 9; k++)
            if (isUnique(matrix, i, j, k)) { possibleSolutions[i][j].push(k); }
      } 

  //trying different combinations
  var counter = 0;
  var flag = true;
  while (flag) {
    flag = false;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (!matrix[i][j])
          if (!isUnique(solution, i, j, solution[i][j]) || !solution[i][j]) {
            for (combination[i][j] = 0; combination[i][j] < possibleSolutions[i][j].length; combination[i][j]++) {
              if (isUnique(solution, i, j, possibleSolutions[i][j][combination[i][j]])) {
                solution[i][j] = possibleSolutions[i][j][combination[i][j]];
                break;
              }
            }
            if (!solution[i][j] || !isUnique(solution, i, j, solution[i][j])) {
              solution[i][j] = possibleSolutions[i][j][Math.floor((possibleSolutions[i][j].length)*Math.random())];
              flag = true;
            }
          }
      }
    }
  }

  
  function isUnique(matrix, i_pos, j_pos, value) {
    for (let i = 0; i < 9; i++)
      if (matrix[i][j_pos] == value && i != i_pos) return false;
    for (let j = 0; j < 9; j++)
      if (matrix[i_pos][j] == value && j != j_pos) return false;
    var i_block = 3*Math.floor(i_pos/3);
    var j_block = 3*Math.floor(j_pos/3);
    for (let i = i_block; i < i_block + 3; i++)
      for (let j = j_block; j < j_block + 3; j++)
        if (matrix[i][j] == value && i != i_pos && j != j_pos) return false;
    return true;
  }

  function countDismatches(matrix, i_pos, j_pos, value) {
    var counter = 0;
    for (let i = 0; i < 9; i++)
      if (matrix[i][j_pos] == value && i != i_pos) ++counter;
    for (let j = 0; j < 9; j++)
      if (matrix[i_pos][j] == value && j != j_pos) ++counter;
    var i_block = 3*Math.floor(i_pos/3);
    var j_block = 3*Math.floor(j_pos/3);
    for (let i = i_block; i < i_block + 3; i++)
      for (let j = j_block; j < j_block + 3; j++)
        if (matrix[i][j] == value && i != i_pos && j != j_pos) ++counter;
    return counter;
  }

  // console.log(solution);

  return solution;
}