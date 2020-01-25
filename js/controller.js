class Controller {

    constructor(boardWidth, boardHeight, boardPortion ,level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
        this.player =  new Player(this.board.portion,this.board.portion*2,{x:0, y: this.board.height - this.board.portion *2 - this.board.portion },3, 100, 5);
        this.view.startGame(this.player, this.board);
        this.startListeners();

    }

    startListeners() {
        this.movePlayerListener();
        this.stopMovingPlayerListener();
    }

    movePlayerListener() {
        this.view.movePlayer((event) => {
            switch (event.key) {
                case 'd':
                    this.player.facing = 'right';
                    this.movePlayer();
                    break;
                case 'a':
                    this.player.facing = 'left';
                    this.movePlayer();
                    break;
            }
        });
    }

    movePlayer() {
        clearInterval(this.player.moveInterval);
        this.player.moveInterval = setInterval(() => {
            switch(this.player.facing) {
                case 'right':
                    this.player.moveRight();
                    break;
                case 'left':
                    this.player.moveLeft();
                    break;
            }
        }, 1);
    }

    canPlayerMoveRight() {}

    canPlayerMoveLeft() {}

    stopMovingPlayerListener() {
        this.view.stopMovingPlayer(() => {
           this.player.stopMoving();
        });
    }

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