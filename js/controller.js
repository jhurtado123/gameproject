class Controller {

    constructor(boardWidth, boardHeight, boardPortion ,level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
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