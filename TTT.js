window.addEventListener('DOMContentLoaded', () =>{
  const box = Array.from(document.querySelectorAll('.box'));
  const displayofPlayer = document.querySelector('.display-player');
  const announcer = document.querySelector('.announcer');


  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const PLAYERUNO_WON = 'PLAYERUNO_WON';
  const PLAYERDOS_WON = 'PLAYERDOS_WON';
  const TIE = 'Owemjiee! It is a TIE';

  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function ValidationofResult(){
    let roundWon = false;
    for (let z = 0; z <= 7; z++) {
      const winCondi = winning[z];
      const ha = board[winCondi[0]];
      const he = board[winCondi[1]];
      const ho = board[winCondi[2]];
      if (ha === '' || he === '' || ho ==='') {
        continue;
      }
      if (ha === he && he === ho) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYERDOS_WON : PLAYERUNO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes(''))
    announce(TIE);
  }

  const announce = (type) => {
    switch(type){
      case PLAYERUNO_WON:
        announcer.innerHTML = 'Player <span class="PlayerUNO">O</span> Won';
        break;
      case PLAYERDOS_WON:
        announcer.innerHTML = 'Player <span class="PlayerDOS">X</span> WON';
        break;
      case TIE:
        announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
  };

  const isValidAction = (box) => {
    if (box.innerText === 'X' || box.innerText === 'O'){
      return false;
    }

    return true;
  };

  const updateBoard = (index) =>{
    board[index] = currentPlayer;
  }

  const changePlayer = () =>{
    displayofPlayer.classList.remove(`players${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayofPlayer.innerText = currentPlayer;
    displayofPlayer.classList.add(`player${currentPlayer}`);
  }

  const action = (box, index) => {
    if(isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      ValidationofResult();
      changePlayer(); 
    }
  }

  const RESTARTBoard = () => {
    box.forEach(tile =>{
      tile.innerText = '';
      tile.classList.remove('playerUNO');
      tile.classList.remove('playerDOS');
    });
  
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
      changePlayer();
    }
  }

 

  box.forEach( (box, index) => {
    box.addEventListener('click', () => action(box,index));
  });


  Restart.addEventListener('click', RESTARTBoard);
});


