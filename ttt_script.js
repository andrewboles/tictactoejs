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
		for(let i = 0; i < 9; i++){
			document.getElementById(`square${i}`).addEventListener('click', e => {
				if(gameBoard.checkPositionViability(parseInt(e.target.id.slice(-1))) === true){
					if(gameplayActions.turn == 1){
            gameBoard.setBoardState(promptPlayers.playerList.player1.getPiece(),parseInt(e.target.id.slice(-1)))
				  } else {
            gameBoard.setBoardState(promptPlayers.playerList.player2.getPiece(),parseInt(e.target.id.slice(-1)))
          }
          refreshBoard()
          if (winConditionCheck.windCondMet()){
            alert(`game over, player${gameplayActions.turn} wins!`)
            gameBoard.resetBoard()
            refreshBoard()
            gameplayActions.turn_count = 0
            promptPlayers.promptGo()
          }
          gameplayActions.turn_count += 1;
          gameplayActions.changeTurn()
          gameplayActions.drawReached() 
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
  let playerList = {}
  const promptGo = () => {
    let playerName = prompt("Please enter your name, Player 1")
    if(playerName != null){
      document.getElementById("player1box").innerHTML = playerName
      playerList.player1 = player(`${playerName}`, "X")
    }
    else{
      playerList.player1  = player(`Player 1box`, "X")
    }
    let playerName2 = prompt("Please enter your name, Player 2")
    if(playerName2 != null){
      document.getElementById("player2box").innerHTML = playerName2
      playerList.player2 = player(`${playerName2}`, "O")
    }
    else{
      playerList.player2 = player(`Player 2`, "O")
    }
   animationActions.highlightPlayer(1,2)
   boardToDOM.startBoard()
  }

  return {promptGo, playerList}
 
})();

const gameplayActions = (() => {
  let turn = 1;
  let turn_count = 0;
  const changeTurn = () => {
    if (gameplayActions.turn == 1){
      gameplayActions.turn = 2
      animationActions.highlightPlayer(2,1)
    }
    else{
      gameplayActions.turn = 1
      animationActions.highlightPlayer(1,2)
    }

  }

  const drawReached = () => {
    if(gameplayActions.turn_count == 9) {
      console.log('draw')
      window.alert("Draw! Try different stuff, y'all")
    }
  }
  return {turn_count, changeTurn, drawReached, turn}

})();

const winConditionCheck = (() => {
  const windCondMet = () => {
    console.log("running check")
    if (gameplayActions.turn_count < 3){
      return false
    }
    if ((gameBoard.getBoardState()[0] == gameBoard.getBoardState()[1]) && (gameBoard.getBoardState()[1] == gameBoard.getBoardState()[2])){
      if (gameBoard.getBoardState()[0] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[3] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[5])){
      if (gameBoard.getBoardState()[3] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[6] == gameBoard.getBoardState()[7]) && (gameBoard.getBoardState()[7] == gameBoard.getBoardState()[8])){
      if (gameBoard.getBoardState()[6] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[0] == gameBoard.getBoardState()[3]) && (gameBoard.getBoardState()[3] == gameBoard.getBoardState()[6])){
      if (gameBoard.getBoardState()[0] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[1] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[7])){
      if (gameBoard.getBoardState()[1] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[2] == gameBoard.getBoardState()[5]) && (gameBoard.getBoardState()[5] == gameBoard.getBoardState()[8])){
      if (gameBoard.getBoardState()[2] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[0] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[8])){
      if (gameBoard.getBoardState()[0] == " ") { return false }
      return true
    }
    if ((gameBoard.getBoardState()[2] == gameBoard.getBoardState()[4]) && (gameBoard.getBoardState()[4] == gameBoard.getBoardState()[6])){
      if (gameBoard.getBoardState()[2] == " ") { return false }
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

  return {highlightPlayer}

})();



const MODULETEMPLATE = (() => {

})();

promptPlayers.promptGo()
