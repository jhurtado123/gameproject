class Controller {

    constructor(boardWidth, boardHeight, boardPortion ,level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
        this.player =  new Player(this.board.portion,this.board.portion*2,{x:0, y: this.board.height - this.board.portion *2 - this.board.portion },3, 100, 5);
        this.view.startGame(this.player, this.board);
    }

    movePlayerListener() {}

    movePlayer() {}

    canPlayerMoveRight() {}

    canPlayerMoveLeft() {}


    changeStatusScreen(status) {
        switch (status) {
            case 'start':
                break;
            case 'win':
                break;
            case 'gameOver':
                break;
        }
    }

    startGameListener() {}
    resetGameListener() {}

}