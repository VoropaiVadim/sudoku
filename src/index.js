
module.exports = function solveSudoku(matrix) {
  const matrixDeepCopy = JSON.parse(JSON.stringify(matrix));
  for(let position_row=0;position_row<9;position_row++)
  for(let position_col=0;position_col<9;position_col++)
  {
      if(matrixDeepCopy[position_row][position_col]===0){
          let solutionScope = findSolution(position_row,position_col,matrixDeepCopy);
          if(solutionScope.length==0){
            return false;
          }
          for(let solution of solutionScope){
              matrixDeepCopy[position_row][position_col] = solution;
              var result = solveSudoku(matrixDeepCopy);
              if(result!=false){
                return solveSudoku(result);
              }
          }
          return false;
      }
  }
  return  matrixDeepCopy;
}

function findSolution(position_row,position_col,matrix){
  const scope = [];
  label: for(let i=1;i<10;i++){
      for(let j=0;j<9;j++){
          if(matrix[position_row][j]==i || matrix[j][position_col]==i || matrix[Math.floor(position_row/3)*3+j%3][Math.floor(position_col/3)*3+Math.floor(j/3)]==i){
              continue label;
          }
      }
      scope.push(i);
  }
return scope;
}