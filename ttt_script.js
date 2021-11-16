const player = (name, piece_choice) => {

	const getName = () => name;
	const getPiece = () => piece_choice;


	return {getName, getPiece}
};

let jeff = player("jeff", "x")


const gameBoard = (()=> {

	const boardState = [" "," "," "," "," "," "," "," "," "]

	const getBoardState = () => boardState

	const setBoardState = (playerPiece, position) => {
		boardState[position] = playerPiece
	}
	const checkPositionViability = (positionToCheck) => {
		return boardState[positionToCheck] === " "
	}

	return {getBoardState, setBoardState, checkPositionViability}

})();



const boardToDOM = (() => {
	const startBoard = () =>{
		for(let i = 0; i < 9; i++){
			document.getElementById(`square${i}`).addEventListener('click', e => {
				if(gameBoard.checkPositionViability(parseInt(e.target.id.slice(-1))) === true){
					gameBoard.setBoardState("O",parseInt(e.target.id.slice(-1)))
				refreshBoard()
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



// board = gameBoard


const MODULETEMPLATE = (() => {

})();

boardToDOM.startBoard()
console.log(gameBoard.getBoardState())
gameBoard.setBoardState("X",0)
gameBoard.setBoardState("X",8)
boardToDOM.refreshBoard()