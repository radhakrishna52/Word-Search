const board = [
    ['W', 'O', 'R', 'D', 'S'],
    ['E', 'A', 'R', 'C', 'H'],
    ['T', 'E', 'S', 'T', 'G'],
    ['B', 'A', 'C', 'K', 'T'],
    ['R', 'A', 'C', 'K', 'S']
  ];
  
  const grid = document.getElementById('grid');
  
  // Render the board
  board.forEach(row => {
    row.forEach(letter => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = letter;
      grid.appendChild(cell);
    });
  });
  
  function searchWord() {
    const word = document.getElementById('wordInput').value.toUpperCase();
    const result = document.getElementById('result');
    const found = exist(board, word);
    result.textContent = found ? `"${word}" found in grid!` : `"${word}" not found.`;
  }
  
  function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
  
    const dfs = (i, j, index) => {
      if (index === word.length) return true;
      if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[index]) return false;
  
      const temp = board[i][j];
      board[i][j] = '#'; // mark visited
  
      const found = dfs(i + 1, j, index + 1) ||
                    dfs(i - 1, j, index + 1) ||
                    dfs(i, j + 1, index + 1) ||
                    dfs(i, j - 1, index + 1);
  
      board[i][j] = temp; // backtrack
      return found;
    };
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (dfs(i, j, 0)) return true;
      }
    }
    return false;
  }