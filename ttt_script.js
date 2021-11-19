const player = (name, piece_choice) => {



	const getName = () => name;
	const getPiece = () => piece_choice;


	return {getName, getPiece}
};

const gameBoard = (()=> {

	let boardState = [" "," "," "," "," "," "," "," "," "]

	const getBoardState = () => boardState

	const setBoardState = (playerPiece, position) => {
		boardState[position] = playerPiece
	}
	const checkPositionViability = (positionToCheck) => {
		return boardState[positionToCheck] === " "
	}
  const resetBoard = () => {
    boardState = [" "," "," "," "," "," "," "," "," "]
  }

	return {getBoardState, setBoardState, checkPositionViability, resetBoard}

})();



const boardToDOM = (() => {
	const startBoard = () =>{
    animationActions.highlightPlayer(1,2)
		for(let i = 0; i < 9; i++){
			document.getElementById(`square${i}`).addEventListener('click', e => {
     
				if(gameBoard.checkPositionViability(parseInt(e.target.id.slice(-1))) === true){
          if(gameplayActions.getTurn() == 1){
            gameBoard.setBoardState(promptPlayers.getPlayer(1).getPiece(),parseInt(e.target.id.slice(-1)))
          } else {
            gameBoard.setBoardState(promptPlayers.getPlayer(2).getPiece(),parseInt(e.target.id.slice(-1)))
          }
          refreshBoard()
          
          // setTimeout("",100);
          if (winConditionCheck.windCondMet()){
            refreshBoard()
            setTimeout(function() {
              alert(`game over, player${gameplayActions.getTurn()} wins!`);
            },100)
            gameBoard.resetBoard()
            refreshBoard()
            gameplayActions.resetTurns()
            promptPlayers.promptGo()
          } else{
            gameplayActions.drawReached()
            gameplayActions.changeTurn()  
          }

				}

        
			})
		}
	}

	const refreshBoard = () =>{
		for(let i = 0; i < 9; i++){
			document.getElementById(`square${i}`).innerHTML = gameBoard.getBoardState()[i]
		}
	}


	return	{refreshBoard, startBoard}

})();

const promptPlayers = (() => {
  let player1 = ""
  let player2 = ""

  const setPlayer = (playerNum, name) => {
    if (playerNum == 1){
      player1 = player(name,"X")
    } else {
      player2 = player(name,"O")
    }
  }

  const getPlayer = (num) =>{
    return (num == 1 ?  player1:player2)
  }


  return {setPlayer, getPlayer}
 
})();

const gameplayActions = (() => {
  let turn = 1;
  let turn_count = 0;
  const changeTurn = () => {
    turn_count += 1;
    if (turn == 1){
      turn = 2
      animationActions.highlightPlayer(2,1)
    }
    else{
      turn = 1
      animationActions.highlightPlayer(1,2)
    }

  }
  const resetTurns= () =>{
    turn_count = 0
    turn = 1
  }
  const getTurnCount = () => turn_count
  const getTurn = () => turn
  const drawReached = () => {
    if(turn_count == 9) {
      console.log('draw')
      window.alert("Draw! Try different stuff, y'all")
    }
  }
  return {changeTurn, drawReached, getTurn, getTurnCount, resetTurns}

})();

const winConditionCheck = (() => {
  const windCondMet = () => {
    if (gameBoard.getBoardState()[0] != " " && (gameBoard.getBoardState()[0] == gameBoard.getBoardState()[1]) && (gameBoard.getBoardState()[1] == gameBoard.getBoardState()[2])){
      return true
    }
    if (gameBoard.getBoardState()[3] != " " && (gameBoard.getBoardState()[3] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[5])){
      return true
    }
    if (gameBoard.getBoardState()[6] != " " && (gameBoard.getBoardState()[6] == gameBoard.getBoardState()[7]) && (gameBoard.getBoardState()[7] == gameBoard.getBoardState()[8])){
      return true
    }
    if (gameBoard.getBoardState()[0] != " " && (gameBoard.getBoardState()[0] == gameBoard.getBoardState()[3]) && (gameBoard.getBoardState()[3] == gameBoard.getBoardState()[6])){
      return true
    }
    if (gameBoard.getBoardState()[1] != " " && (gameBoard.getBoardState()[1] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[7])){
      return true
    }
    if (gameBoard.getBoardState()[2] != " " && (gameBoard.getBoardState()[2] == gameBoard.getBoardState()[5]) && (gameBoard.getBoardState()[5] == gameBoard.getBoardState()[8])){
      return true
    }
    if (gameBoard.getBoardState()[0] != " " && (gameBoard.getBoardState()[0] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[8])){
      return true
    }
    if (gameBoard.getBoardState()[2] != " " && (gameBoard.getBoardState()[2] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[6])){
      return true
    }

  }
  return {windCondMet}
})();

const animationActions = (() => {
  const highlightPlayer = (playerUp, playerStandby) => {
    document.getElementById(`player${playerUp}box`).classList.add('highlight-player')
    if(gameplayActions.turn_count != 0){
      document.getElementById(`player${playerStandby}box`).classList.remove('highlight-player')
    }
  }

  const removePlayerNameEntry = (playerNum, name) => {
    document.getElementById(`player${playerNum}box`).innerHTML = name
  }

  return {highlightPlayer, removePlayerNameEntry}

})();

const player1Element = document.getElementById("addPlayer1")
player1Element.addEventListener("submit", e =>{
  if (player1Element.elements['name'].value === ""){
    event.preventDefault()
    return
  }
  promptPlayers.setPlayer(1, player1Element.elements['name'].value)
  animationActions.removePlayerNameEntry(1, player1Element.elements['name'].value)
  
})

const player2Element = document.getElementById("addPlayer2")
player2Element.addEventListener("submit", e =>{
  if (player2Element.elements['name'].value === ""){
    event.preventDefault()
    return
  }
  promptPlayers.setPlayer(2, player2Element.elements['name'].value)
  animationActions.removePlayerNameEntry(2, player2Element.elements['name'].value)
  
})




const MODULETEMPLATE = (() => {

})();

boardToDOM.startBoard()


