let chessBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let possibleMoves = [];
let dangerPossibleMoves = [];
let isCheckingDanger = false;
let currentCase = '';
let teamToMove = 1;

let isKingSideCastlingWhitePossible = true; // petit roque blanc
let isKingSideCastlingBlackPossible = true; // petit roque noir
let isQueenSideCastlingWhitePossible = true; // grand roque blanc
let isQueenSideCastlingBlackPossible = true; // grand roque noir

function init_board() {
  /**
   * 1-: blanc
   * 2-: noir
   * -1: pion
   * -2: tour
   * -3: cheval
   * -4: fou
   * -5: dame
   * -6: roi
   */

  chessBoard = [
    [12, 13, 14, 15, 16, 14, 13, 12],
    [11, 11, 11, 11, 11, 11, 11, 11],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [21, 21, 21, 21, 21, 21, 21, 21],
    [22, 23, 24, 25, 26, 24, 23, 22],
  ];

  // chessBoard = [
  //   [12, 21, 21, 15, 16, 14, 21, 12],
  //   [0, 0, 0, 12, 21, 12, 21, 11],
  //   [0, 0, 12, 0, 0, 0, 12, 0],
  //   [0, 0, 21, 21, 15, 12, 21, 0],
  //   [0, 0, 12, 0, 0, 0, 12, 0],
  //   [0, 0, 0, 0, 0, 21, 0, 0],
  //   [21, 22, 12, 11, 21, 21, 21, 21],
  //   [22, 12, 24, 25, 26, 24, 13, 22],
  // ];

  possibleMoves = [];
}

function setColorBoardDefault() {
  $(document).find('.odd').css('background-color', '#56b4d3');
  $(document).find('.even').css('background-color', '#348f50');
}

function getTeam(chessBoardValue) {
  return Math.floor(chessBoardValue / 10);
}

function getPiece(chessBoardValue) {
  return chessBoardValue % 10;
}

function getRow(nbTh) {
  return Math.floor(nbTh / 8);
}

function getCol(nbTh) {
  return nbTh % 8;
}

function getNumberRowColOfTh(th) {
  const id = th[0] ? th[0].id : th.id;
  const numberTh = parseInt(id.slice(4, 6));
  const row = getRow(numberTh);
  const col = getCol(numberTh);

  return { numberTh, row, col };
}

function display_board() {
  const chessBoardTable = $(document).find('.chess-board');
  for (let i = 0; i < chessBoard.length; i++) {
    for (let j = 0; j < chessBoard[0].length; j++) {
      const chessBoardTh = chessBoardTable.find(`#case${i * 8 + j}`);
      const chessBoardValue = chessBoard[i][j];
      const team = getTeam(chessBoardValue);
      const piece = getPiece(chessBoardValue);
      switch (piece) {
        case 1: // Pion
          chessBoardTh.html('&#x265F;');
          break;
        case 2: // Tour
          chessBoardTh.html('&#x265C;');
          break;
        case 3: // Cheval
          chessBoardTh.html('&#x265E;');
          break;
        case 4: // Fou
          chessBoardTh.html('&#x265D');
          break;
        case 5: // Reine
          chessBoardTh.html('&#x265B;');
          break;
        case 6: // Roi
          chessBoardTh.html('&#x265A;');
          break;
      }
      chessBoardTh.css(
        'color',
        team === 1 ? 'white' : team === 2 ? 'black' : 'transparent'
      );
    }
  }
}

function handleClickTh(event) {
  setColorBoardDefault();
  const { numberTh, row, col } = getNumberRowColOfTh(event.target);

  const chessBoardValue = chessBoard[row][col];

  const piece = getPiece(chessBoardValue);
  const team = getTeam(chessBoardValue);

  console.log(
    `inHandleClickTh: numberTh: ${numberTh}, row: ${row}, col: ${col}, pièce: ${piece}, team:${team}`
  );

  if (possibleMoves.includes(numberTh)) {
    const {
      _,
      row: currentRow,
      col: currentCol,
    } = getNumberRowColOfTh(currentCase);

    console.log(currentRow);
    console.log(currentCol);

    currentPiece = getPiece(chessBoard[currentRow][currentCol]);
    currentTeam = getTeam(chessBoard[currentRow][currentCol]);

    const pieceTaken = getPiece(chessBoard[row][col]);

    chessBoard[row][col] = chessBoard[currentRow][currentCol];
    chessBoard[currentRow][currentCol] = 0;
    if (pieceTaken === 6) {
      console.log(team);
      teamToMove = 0;

      window.alert(`${currentTeam === 1 ? 'White' : 'Black'} have won`);
    }

    teamToMove = teamToMove !== 0 && (teamToMove === 1 ? 2 : 1);

    /** Permet de gérer le roque:
     *  - Annulation du roque dans le cas d'un mouvement d'une des tours ou du roi
     *  - Mouvement de la tour dans le cas de l'utilisation du roque
     */
    if (currentPiece === 2 && currentCol === 0) {
      if (currentTeam === 1) isQueenSideCastlingWhitePossible = false;
      else if (currentTeam === 2) isQueenSideCastlingBlackPossible = false;
    } else if (currentPiece === 2 && currentCol === 7) {
      if (currentTeam === 1) isKingSideCastlingWhitePossible = false;
      else if (currentTeam === 2) isKingSideCastlingBlackPossible = false;
    } else if (currentPiece === 6) {
      if (currentTeam === 1) {
        if (currentCol === col + 2) {
          chessBoard[0][3] = chessBoard[0][0];
          chessBoard[0][0] = 0;
        } else if (currentCol === col - 2) {
          chessBoard[0][5] = chessBoard[0][7];
          chessBoard[0][7] = 0;
        }
        isQueenSideCastlingWhitePossible = false;
        isKingSideCastlingWhitePossible = false;
      } else if (currentTeam === 2) {
        if (currentCol === col + 2) {
          chessBoard[7][3] = chessBoard[7][0];
          chessBoard[7][0] = 0;
        } else if (currentCol === col - 2) {
          chessBoard[7][5] = chessBoard[7][7];
          chessBoard[7][7] = 0;
        }
        isQueenSideCastlingBlackPossible = false;
        isKingSideCastlingBlackPossible = false;
      }
    }
    currentCase = '';
    possibleMoves = [];
    display_board();
  } else {
    currentCase = '';
    possibleMoves = [];
    if (team === teamToMove) {
      isAllowedToPlay(piece, row, col, team);
    }
  }
}

function updateColorPossibleMoves() {
  possibleMoves.forEach((possibleMove) => {
    const casePossibleMove = $(document).find(`#case${possibleMove}`);
    const rowPossibleMove = getRow(possibleMove);
    const colPossibleMove = getCol(possibleMove);
    casePossibleMove.css(
      'background-color',
      getPiece(chessBoard[rowPossibleMove][colPossibleMove]) === 0
        ? 'grey'
        : '#ff6b6b'
    );
  });
}

function isAllowedToPlayRight(row, col, opposingTeam) {
  if (
    col < 7 &&
    (getPiece(chessBoard[row][col + 1]) === 0 ||
      (getPiece(chessBoard[row][col + 1]) !== 0 &&
        getTeam(chessBoard[row][col + 1]) === opposingTeam))
  ) {
    const numberCaseRight = row * 8 + (col + 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseRight);
    else possibleMoves.push(numberCaseRight);

    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayLeft(row, col, opposingTeam) {
  if (
    col > 0 &&
    (getPiece(chessBoard[row][col - 1]) === 0 ||
      (getPiece(chessBoard[row][col - 1]) !== 0 &&
        getTeam(chessBoard[row][col - 1]) === opposingTeam))
  ) {
    const numberCaseLeft = row * 8 + (col - 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseLeft);
    else possibleMoves.push(numberCaseLeft);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayFront(row, col, opposingTeam) {
  if (
    row < 7 &&
    (getPiece(chessBoard[row + 1][col]) === 0 ||
      (getPiece(chessBoard[row + 1][col]) !== 0 &&
        getTeam(chessBoard[row + 1][col]) === opposingTeam))
  ) {
    const numberCaseFront = (row + 1) * 8 + col;
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFront);
    else possibleMoves.push(numberCaseFront);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayBack(row, col, opposingTeam) {
  if (
    row > 0 &&
    (getPiece(chessBoard[row - 1][col]) === 0 ||
      (getPiece(chessBoard[row - 1][col]) !== 0 &&
        getTeam(chessBoard[row - 1][col]) === opposingTeam))
  ) {
    const numberCaseBack = (row - 1) * 8 + col;
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseBack);
    else possibleMoves.push(numberCaseBack);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayFrontLeft(row, col, opposingTeam) {
  if (
    col > 0 &&
    row < 7 &&
    (getPiece(chessBoard[row + 1][col - 1]) === 0 ||
      (getPiece(chessBoard[row + 1][col - 1]) !== 0 &&
        getTeam(chessBoard[row + 1][col - 1]) === opposingTeam))
  ) {
    const numberCaseFrontLeft = (row + 1) * 8 + (col - 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontLeft);
    else possibleMoves.push(numberCaseFrontLeft);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayFrontRight(row, col, opposingTeam) {
  if (
    col < 7 &&
    row < 7 &&
    (getPiece(chessBoard[row + 1][col + 1]) === 0 ||
      (getPiece(chessBoard[row + 1][col + 1]) !== 0 &&
        getTeam(chessBoard[row + 1][col + 1]) === opposingTeam))
  ) {
    const numberCaseFrontRight = (row + 1) * 8 + (col + 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontRight);
    else possibleMoves.push(numberCaseFrontRight);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayBackLeft(row, col, opposingTeam) {
  if (
    col > 0 &&
    row > 0 &&
    (getPiece(chessBoard[row - 1][col - 1]) === 0 ||
      (getPiece(chessBoard[row - 1][col - 1]) !== 0 &&
        getTeam(chessBoard[row - 1][col - 1]) === opposingTeam))
  ) {
    const numberCaseBackLeft = (row - 1) * 8 + (col - 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseBackLeft);
    else possibleMoves.push(numberCaseBackLeft);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlayBackRight(row, col, opposingTeam) {
  if (
    col < 7 &&
    row > 0 &&
    (getPiece(chessBoard[row - 1][col + 1]) === 0 ||
      (getPiece(chessBoard[row - 1][col + 1]) !== 0 &&
        getTeam(chessBoard[row - 1][col + 1]) === opposingTeam))
  ) {
    const numberCaseBackRight = (row - 1) * 8 + (col + 1);
    if (isCheckingDanger) dangerPossibleMoves.push(numberCaseBackRight);
    else possibleMoves.push(numberCaseBackRight);
    return true;
  } else {
    return false;
  }
}

function isAllowedToPlay(piece, row, col, team) {
  const opposingTeam = team === 1 ? 2 : 1;

  if (chessBoard[row][col] !== 0 && !isCheckingDanger && teamToMove === team) {
    currentCase = $(document).find(`#case${row * 8 + col}`);
    currentCase.css('background-color', 'lightgrey');
  }

  let nbChoicePossible = 0;

  const pieceRow = row;
  const pieceCol = col;

  switch (piece) {
    case 0:
      return false;

    case 1:
      if (team === 1) {
        if (
          row < 7 &&
          getPiece(chessBoard[row + 1][col]) === 0 &&
          !isCheckingDanger
        ) {
          // Si aucune pièce en face de lui
          // const caseFront = $(document).find(`#case${(row + 1) * 8 + col}`);
          // caseFront.css(
          //   'background-color',
          //   getPiece(chessBoard[row + 1][col]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFront = (row + 1) * 8 + col;
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFront);
          else possibleMoves.push(numberCaseFront);
          nbChoicePossible++;
        }

        if (
          row === 1 &&
          getPiece(chessBoard[row + 1][col]) === 0 &&
          getPiece(chessBoard[row + 2][col]) === 0 &&
          !isCheckingDanger
        ) {
          // Si pion toujours à son point de départ
          // const case2Front = $(document).find(`#case${(row + 2) * 8 + col}`);
          // case2Front.css(
          //   'background-color',
          //   getPiece(chessBoard[row + 2][col]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCase2Front = (row + 2) * 8 + col;
          if (isCheckingDanger) dangerPossibleMoves.push(numberCase2Front);
          else possibleMoves.push(numberCase2Front);
          nbChoicePossible++;
        }

        if (
          col > 0 &&
          row < 7 &&
          ((getPiece(chessBoard[row + 1][col - 1]) !== 0 &&
            getTeam(chessBoard[row + 1][col - 1]) === opposingTeam) ||
            isCheckingDanger)
        ) {
          // S'il y a une pièce devant lui à gauche de l'autre couleur
          // const caseFrontLeft = $(document).find(
          //   `#case${(row + 1) * 8 + (col - 1)}`
          // );
          // caseFrontLeft.css(
          //   'background-color',
          //   getPiece(chessBoard[row + 1][col - 1]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFrontLeft = (row + 1) * 8 + (col - 1);
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontLeft);
          else possibleMoves.push(numberCaseFrontLeft);
          nbChoicePossible++;
        }

        if (
          col < 7 &&
          row < 7 &&
          ((getPiece(chessBoard[row + 1][col + 1]) !== 0 &&
            getTeam(chessBoard[row + 1][col + 1]) === opposingTeam) ||
            isCheckingDanger)
        ) {
          // S'il y a une pièce devant lui à droite de l'autre couleur
          // const caseFrontRight = $(document).find(
          //   `#case${(row + 1) * 8 + (col + 1)}`
          // );
          // caseFrontRight.css(
          //   'background-color',
          //   getPiece(chessBoard[row + 1][col + 1]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFrontRight = (row + 1) * 8 + (col + 1);
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontRight);
          else possibleMoves.push(numberCaseFrontRight);
          nbChoicePossible++;
        }
      } else {
        if (row > 0 && getPiece(chessBoard[row - 1][col]) === 0) {
          // Si aucune pièce en face de lui
          // const caseFront = $(document).find(`#case${(row - 1) * 8 + col}`);
          // caseFront.css(
          //   'background-color',
          //   getPiece(chessBoard[row - 1][col]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFront = (row - 1) * 8 + col;
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFront);
          else possibleMoves.push(numberCaseFront);
          nbChoicePossible++;
        }

        if (
          col > 0 &&
          row > 0 &&
          getPiece(chessBoard[row - 1][col - 1]) !== 0 &&
          getTeam(chessBoard[row - 1][col - 1]) === opposingTeam
        ) {
          // S'il y a une pièce devant lui à gauche de l'autre couleur
          // const caseFrontLeft = $(document).find(
          //   `#case${(row - 1) * 8 + (col - 1)}`
          // );
          // caseFrontLeft.css(
          //   'background-color',
          //   getPiece(chessBoard[row - 1][col - 1]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFrontLeft = (row - 1) * 8 + (col - 1);
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontLeft);
          else possibleMoves.push(numberCaseFrontLeft);
          nbChoicePossible++;
        }

        if (
          row === 6 &&
          getPiece(chessBoard[row - 1][col]) === 0 &&
          getPiece(chessBoard[row - 2][col]) === 0
        ) {
          // Si pion toujours à son point de départ
          // const case2Front = $(document).find(`#case${(row - 2) * 8 + col}`);
          // case2Front.css(
          //   'background-color',
          //   getPiece(chessBoard[row - 2][col]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCase2Front = (row - 2) * 8 + col;
          if (isCheckingDanger) dangerPossibleMoves.push(numberCase2Front);
          else possibleMoves.push(numberCase2Front);
          nbChoicePossible++;
        }

        if (
          col < 7 &&
          row > 0 &&
          getPiece(chessBoard[row - 1][col + 1]) !== 0 &&
          getTeam(chessBoard[row - 1][col + 1]) === opposingTeam
        ) {
          // S'il y a une pièce devant lui à droite de l'autre couleur
          // const caseFrontRight = $(document).find(
          //   `#case${(row - 1) * 8 + (col + 1)}`
          // );
          // caseFrontRight.css(
          //   'background-color',
          //   getPiece(chessBoard[row - 1][col + 1]) === 0 ? 'grey' : '#ff6b6b'
          // );
          const numberCaseFrontRight = (row - 1) * 8 + (col + 1);
          if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFrontRight);
          else possibleMoves.push(numberCaseFrontRight);
          nbChoicePossible++;
        }
      }

      updateColorPossibleMoves();

      if (nbChoicePossible > 0) return true;
      else return false;

    case 2:
      while (
        col < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayRight(row, col, opposingTeam)) nbChoicePossible++;
        col++;
      }
      col = pieceCol;

      while (
        col > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayLeft(row, col, opposingTeam)) nbChoicePossible++;
        col--;
      }
      col = pieceCol;

      while (
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFront(row, col, opposingTeam)) nbChoicePossible++;
        row++;
      }
      row = pieceRow;

      while (
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBack(row, col, opposingTeam)) nbChoicePossible++;
        row--;
      }
      row = pieceRow;

      updateColorPossibleMoves();

      if (nbChoicePossible > 0) return true;
      else return false;

    case 3:
      if (
        col < 7 &&
        row < 6 &&
        (getPiece(chessBoard[row + 2][col + 1]) === 0 ||
          (getPiece(chessBoard[row + 2][col + 1]) !== 0 &&
            getTeam(chessBoard[row + 2][col + 1]) === opposingTeam))
      ) {
        // Si déplacement possible 2 lignes devant lui à sa droite
        // const case2FrontRight = $(document).find(
        //   `#case${(row + 2) * 8 + (col + 1)}`
        // );
        // case2FrontRight.css(
        //   'background-color',
        //   getPiece(chessBoard[row + 2][col + 1]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCase2FrontRight = (row + 2) * 8 + (col + 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCase2FrontRight);
        else possibleMoves.push(numberCase2FrontRight);
        nbChoicePossible++;
      }

      if (
        col > 0 &&
        row < 6 &&
        (getPiece(chessBoard[row + 2][col - 1]) === 0 ||
          (getPiece(chessBoard[row + 2][col - 1]) !== 0 &&
            getTeam(chessBoard[row + 2][col - 1]) === opposingTeam))
      ) {
        // Si déplacement possible 2 lignes devant lui à sa gauche
        // const case2FrontLeft = $(document).find(
        //   `#case${(row + 2) * 8 + (col - 1)}`
        // );
        // case2FrontLeft.css(
        //   'background-color',
        //   getPiece(chessBoard[row + 2][col - 1]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCase2FrontLeft = (row + 2) * 8 + (col - 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCase2FrontLeft);
        else possibleMoves.push(numberCase2FrontLeft);
        nbChoicePossible++;
      }

      if (
        col < 7 &&
        row > 1 &&
        (getPiece(chessBoard[row - 2][col + 1]) === 0 ||
          (getPiece(chessBoard[row - 2][col + 1]) !== 0 &&
            getTeam(chessBoard[row - 2][col + 1]) === opposingTeam))
      ) {
        // Si déplacement possible 2 lignes derrière lui à sa droite
        // const case2BackRight = $(document).find(
        //   `#case${(row - 2) * 8 + (col + 1)}`
        // );
        // case2BackRight.css(
        //   'background-color',
        //   getPiece(chessBoard[row - 2][col + 1]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCase2BackRight = (row - 2) * 8 + (col + 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCase2BackRight);
        else possibleMoves.push(numberCase2BackRight);
        nbChoicePossible++;
      }

      if (
        col > 0 &&
        row > 1 &&
        (getPiece(chessBoard[row - 2][col - 1]) === 0 ||
          (getPiece(chessBoard[row - 2][col - 1]) !== 0 &&
            getTeam(chessBoard[row - 2][col - 1]) === opposingTeam))
      ) {
        // Si déplacement possible 2 lignes derrière lui à sa gauche
        // const case2backLeft = $(document).find(
        //   `#case${(row - 2) * 8 + (col - 1)}`
        // );
        // case2backLeft.css(
        //   'background-color',
        //   getPiece(chessBoard[row - 2][col - 1]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCase2BackLeft = (row - 2) * 8 + (col - 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCase2BackLeft);
        else possibleMoves.push(numberCase2BackLeft);
        nbChoicePossible++;
      }

      if (
        col < 6 &&
        row < 7 &&
        (getPiece(chessBoard[row + 1][col + 2]) === 0 ||
          (getPiece(chessBoard[row + 1][col + 2]) !== 0 &&
            getTeam(chessBoard[row + 1][col + 2]) === opposingTeam))
      ) {
        // Si déplacement possible devant lui 2 case à droite
        // const caseFront2Right = $(document).find(
        //   `#case${(row + 1) * 8 + (col + 2)}`
        // );
        // caseFront2Right.css(
        //   'background-color',
        //   getPiece(chessBoard[row + 1][col + 2]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCaseFront2Right = (row + 1) * 8 + (col + 2);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFront2Right);
        else possibleMoves.push(numberCaseFront2Right);
        nbChoicePossible++;
      }

      if (
        col < 6 &&
        row > 0 &&
        (getPiece(chessBoard[row - 1][col + 2]) === 0 ||
          (getPiece(chessBoard[row - 1][col + 2]) !== 0 &&
            getTeam(chessBoard[row - 1][col + 2]) === opposingTeam))
      ) {
        // Si déplacement possible derrière lui 2 case à droite
        // const caseBack2Right = $(document).find(
        //   `#case${(row - 1) * 8 + (col + 2)}`
        // );
        // caseBack2Right.css(
        //   'background-color',
        //   getPiece(chessBoard[row - 1][col + 2]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCaseBack2Right = (row - 1) * 8 + (col + 2);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCaseBack2Right);
        else possibleMoves.push(numberCaseBack2Right);
        nbChoicePossible++;
      }

      if (
        col > 1 &&
        row < 7 &&
        (getPiece(chessBoard[row + 1][col - 2]) === 0 ||
          (getPiece(chessBoard[row + 1][col - 2]) !== 0 &&
            getTeam(chessBoard[row + 1][col - 2]) === opposingTeam))
      ) {
        // Si déplacement possible devant lui 2 case à gauche
        // const caseFront2Left = $(document).find(
        //   `#case${(row + 1) * 8 + (col - 2)}`
        // );
        // caseFront2Left.css(
        //   'background-color',
        //   getPiece(chessBoard[row + 1][col - 2]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCaseFront2Left = (row + 1) * 8 + (col - 2);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCaseFront2Left);
        else possibleMoves.push(numberCaseFront2Left);
        nbChoicePossible++;
      }

      if (
        col > 1 &&
        row > 0 &&
        (getPiece(chessBoard[row - 1][col - 2]) === 0 ||
          (getPiece(chessBoard[row - 1][col - 2]) !== 0 &&
            getTeam(chessBoard[row - 1][col - 2]) === opposingTeam))
      ) {
        // Si déplacement possible derrière lui 2 case à gauche
        // const caseBack2Left = $(document).find(
        //   `#case${(row - 1) * 8 + (col - 2)}`
        // );
        // caseBack2Left.css(
        //   'background-color',
        //   getPiece(chessBoard[row - 1][col - 2]) === 0 ? 'grey' : '#ff6b6b'
        // );
        const numberCaseBack2Left = (row - 1) * 8 + (col - 2);
        if (isCheckingDanger) dangerPossibleMoves.push(numberCaseBack2Left);
        else possibleMoves.push(numberCaseBack2Left);
        nbChoicePossible++;
      }

      updateColorPossibleMoves();

      if (nbChoicePossible > 0) return true;
      else return false;

    case 4:
      row = pieceRow;
      col = pieceCol;
      while (
        col < 7 &&
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFrontRight(row, col, opposingTeam))
          nbChoicePossible++;
        row++;
        col++;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col > 0 &&
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFrontLeft(row, col, opposingTeam))
          nbChoicePossible++;
        row++;
        col--;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col < 7 &&
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBackRight(row, col, opposingTeam))
          nbChoicePossible++;
        row--;
        col++;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col > 0 &&
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBackLeft(row, col, opposingTeam)) nbChoicePossible++;
        row--;
        col--;
      }
      row = pieceRow;
      col = pieceCol;

      updateColorPossibleMoves();

      if (nbChoicePossible > 0) return true;
      else return false;

    case 5:
      while (
        col < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayRight(row, col, opposingTeam)) nbChoicePossible++;
        col++;
      }
      col = pieceCol;

      while (
        col > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayLeft(row, col, opposingTeam)) nbChoicePossible++;
        col--;
      }
      col = pieceCol;

      while (
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFront(row, col, opposingTeam)) nbChoicePossible++;
        row++;
      }
      row = pieceRow;

      while (
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBack(row, col, opposingTeam)) nbChoicePossible++;
        row--;
      }
      row = pieceRow;

      while (
        col < 7 &&
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFrontRight(row, col, opposingTeam))
          nbChoicePossible++;
        row++;
        col++;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col > 0 &&
        row < 7 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayFrontLeft(row, col, opposingTeam))
          nbChoicePossible++;
        row++;
        col--;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col < 7 &&
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBackRight(row, col, opposingTeam))
          nbChoicePossible++;
        row--;
        col++;
      }
      row = pieceRow;
      col = pieceCol;

      while (
        col > 0 &&
        row > 0 &&
        ((row === pieceRow && col === pieceCol) ||
          getPiece(chessBoard[row][col]) === 0)
      ) {
        if (isAllowedToPlayBackLeft(row, col, opposingTeam)) nbChoicePossible++;
        row--;
        col--;
      }
      row = pieceRow;
      col = pieceCol;

      updateColorPossibleMoves();

      if (nbChoicePossible > 0) return true;
      else return false;

    case 6:
      const nbCase = row * 8 + col;

      if (
        teamToMove === team &&
        isAllowedToPlayFrontRight(row, col, opposingTeam)
      ) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberFrontRight = (row + 1) * 8 + (col + 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberFrontRight);
        else
          !possibleMoves.includes(numberFrontRight) &&
            possibleMoves.push(numberFrontRight);
        nbChoicePossible++;
      }

      if (
        teamToMove === team &&
        isAllowedToPlayFrontLeft(row, col, opposingTeam)
      ) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberFrontLeft = (row + 1) * 8 + (col - 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberFrontLeft);
        else
          !possibleMoves.includes(numberFrontLeft) &&
            possibleMoves.push(numberFrontLeft);
        nbChoicePossible++;
      }

      if (
        teamToMove === team &&
        isAllowedToPlayBackRight(row, col, opposingTeam)
      ) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberBackRight = (row - 1) * 8 + (col + 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberBackRight);
        else
          !possibleMoves.includes(numberBackRight) &&
            possibleMoves.push(numberBackRight);
        nbChoicePossible++;
      }

      if (
        teamToMove === team &&
        isAllowedToPlayBackLeft(row, col, opposingTeam)
      ) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberBackLeft = (row - 1) * 8 + (col - 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberBackLeft);
        else
          !possibleMoves.includes(numberBackLeft) &&
            possibleMoves.push(numberBackLeft);
        nbChoicePossible++;
      }

      if (teamToMove === team && isAllowedToPlayRight(row, col, opposingTeam)) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberRight = row * 8 + (col + 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberRight);
        else
          !possibleMoves.includes(numberRight) &&
            possibleMoves.push(numberRight);
        nbChoicePossible++;
      }

      if (teamToMove === team && isAllowedToPlayLeft(row, col, opposingTeam)) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberLeft = row * 8 + (col - 1);
        if (isCheckingDanger) dangerPossibleMoves.push(numberLeft);
        else
          !possibleMoves.includes(numberLeft) && possibleMoves.push(numberLeft);
        nbChoicePossible++;
      }

      if (teamToMove === team && isAllowedToPlayFront(row, col, opposingTeam)) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberFront = (row + 1) * 8 + col;
        if (isCheckingDanger) dangerPossibleMoves.push(numberFront);
        else
          !possibleMoves.includes(numberFront) &&
            possibleMoves.push(numberFront);
        nbChoicePossible++;
      }

      if (teamToMove === team && isAllowedToPlayBack(row, col, opposingTeam)) {
        const kingCase = $(document).find(`#case${nbCase}`);

        currentCase = kingCase;

        const numberBack = (row - 1) * 8 + col;
        if (isCheckingDanger) dangerPossibleMoves.push(numberBack);
        else
          !possibleMoves.includes(numberBack) && possibleMoves.push(numberBack);
        nbChoicePossible++;
      }
      console.log(possibleMoves);
      if (!isCheckingDanger) {
        possibleMoves = possibleMoves.filter((possibleMove) => {
          console.log('ok');
          console.log(
            isCaseInDanger(getRow(possibleMove), getCol(possibleMove), team)
          );
          if (
            !isCaseInDanger(getRow(possibleMove), getCol(possibleMove), team)
          ) {
            return possibleMove;
          }
        });
        const kingCase = $(document).find(`#case${nbCase}`);
        currentCase = kingCase;
        console.log(possibleMoves);
        setColorBoardDefault();
        kingCase.css('background-color', 'lightgrey');
        updateColorPossibleMoves();
      }

      if (team === 1 && !isCheckingDanger && !isCaseInDanger(row, col, team)) {
        if (isQueenSideCastlingWhitePossible) {
          if (
            chessBoard[0][2] === 0 &&
            chessBoard[0][3] === 0 &&
            !isCaseInDanger(0, 2, team) &&
            !isCaseInDanger(0, 3, team)
          ) {
            const case2Left = $(document).find(`#case${row * 8 + (col - 2)}`);
            case2Left.css(
              'background-color',
              getPiece(chessBoard[row][col - 2]) === 0 ? 'grey' : '#ff6b6b'
            );
            const numberCase2Left = row * 8 + (col - 2);
            possibleMoves.push(numberCase2Left);
          }
        }
        if (isKingSideCastlingWhitePossible) {
          if (
            chessBoard[0][5] === 0 &&
            chessBoard[0][6] === 0 &&
            !isCaseInDanger(0, 5, team) &&
            !isCaseInDanger(0, 6, team)
          ) {
            const case2Right = $(document).find(`#case${row * 8 + (col + 2)}`);
            case2Right.css(
              'background-color',
              getPiece(chessBoard[row][col + 2]) === 0 ? 'grey' : '#ff6b6b'
            );
            const numberCase2Right = row * 8 + (col + 2);
            possibleMoves.push(numberCase2Right);
          }
        }
      } else if (
        team === 2 &&
        !isCheckingDanger &&
        !isCaseInDanger(row, col, team)
      ) {
        if (isQueenSideCastlingBlackPossible) {
          if (
            chessBoard[7][2] === 0 &&
            chessBoard[7][3] === 0 &&
            !isCaseInDanger(7, 2, team) &&
            !isCaseInDanger(7, 3, team)
          ) {
            const case2Left = $(document).find(`#case${row * 8 + (col - 2)}`);
            case2Left.css(
              'background-color',
              getPiece(chessBoard[row][col - 2]) === 0 ? 'grey' : '#ff6b6b'
            );
            const numberCase2Left = row * 8 + (col - 2);
            possibleMoves.push(numberCase2Left);
          }
        }
        if (isKingSideCastlingBlackPossible) {
          if (
            chessBoard[7][5] === 0 &&
            chessBoard[7][6] === 0 &&
            !isCaseInDanger(7, 5, team) &&
            !isCaseInDanger(7, 6, team)
          ) {
            const case2Right = $(document).find(`#case${row * 8 + (col + 2)}`);
            case2Right.css(
              'background-color',
              getPiece(chessBoard[row][col + 2]) === 0 ? 'grey' : '#ff6b6b'
            );
            const numberCase2Right = row * 8 + (col + 2);
            possibleMoves.push(numberCase2Right);
          }
        }
      }

      if (nbChoicePossible > 0) {
        console.log(`possibleMoves: ${possibleMoves}`);
        console.log(`nbChoicePossible: ${nbChoicePossible}`);
        return true;
      } else return false;
  }
}

function isCaseInDanger(rowCase, colCase, team) {
  isCheckingDanger = true;
  dangerPossibleMoves = [];
  console.log(`row: ${rowCase}, col: ${colCase}, team: ${team}`);
  const opposingTeam = team === 1 ? 2 : 1;
  const nbCase = rowCase * 8 + colCase;
  console.log(`nbCase: ${nbCase}`);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        getPiece(chessBoard[i][j]) !== 0 &&
        getPiece(chessBoard[i][j] !== 6)
      ) {
        if (getTeam(chessBoard[i][j]) === opposingTeam) {
          console.log(`pièce checkée: ${chessBoard[i][j]}`);
          if (isAllowedToPlay(getPiece(chessBoard[i][j]), i, j, opposingTeam)) {
            console.log(possibleMoves);
            if (dangerPossibleMoves.includes(nbCase)) {
              isCheckingDanger = false;
              return true;
            } else {
              dangerPossibleMoves = [];
            }
          }
        }
      }
    }
  }
  isCheckingDanger = false;
  return false;
}

$(document).ready(function () {
  init_board();
  display_board();
});
