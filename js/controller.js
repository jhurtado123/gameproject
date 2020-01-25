class Controller {

    constructor(boardWidth, boardHeight, boardPortion, level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
        this.player = new Player(this.board.portion, this.board.portion * 2, {
            x: 100,
            y: this.board.height - this.board.portion * 2 - this.board.portion
        }, 3, 100, 2);
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
            switch (this.player.facing) {
                case 'right':
                    if (this.canPlayerMoveRight([this.player.position.x + this.player.velX, this.player.position.y])) {
                        this.player.moveRight();
                        this.view.moveCameraToRight(this.board, this.player.position.x);
                    }
                    break;
                case 'left':
                    if (this.canPlayerMoveLeft([this.player.position.x - this.player.velX, this.player.position.y])) {
                        this.player.moveLeft();
                        this.view.moveCameraToLeft(this.board, this.player.position.x);
                    }
                    break;
            }
        }, 1);
    }

    canPlayerMoveRight(position) {
        let response = true;
        this.board.getPosiblesCollitionsInX(position[0]).forEach(brick => {
            if (brick[0] === this._getRoundedPosition(position[0] + this.player.width / 2 - this.player.velX) && (brick[1] === this._getRoundedPosition(position[1] + this.board.portion) || brick[1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        });

        return response;
    }

    canPlayerMoveLeft(position) {
        let response = true;
        this.board.getPosiblesCollitionsInX(position[0]).forEach(brick => {
            if (this._getRoundedPosition(position[0] + this.player.velX * 10) === brick[0] + this.board.portion && (brick[1] === this._getRoundedPosition(position[1] + this.board.portion) || brick[1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        });

        return response;
    }

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

    startGameListener() {
    }

    resetGameListener() {
    }

    /*
      Redondea el número al mas cercano a la porcion
      302 -> 300
      326 -> 350
      356 -> 350
      389 -> 400
   */
    _getRoundedPosition(position) {

        const portion = this.board.portion;
        if (position % 100 < portion) {
            if (position % 100 < portion / 2) {
                position = position - (position % 100);
            } else {
                position = (position - (position % 100)) + portion;
            }

        } else {
            if (position % 100 < portion * 2 - ((portion * 2) / 4)) {
                position = (position - (position % 100)) + portion;
            } else {
                position = (position - (position % 100)) + portion * 2;
            }
        }

        return position;
    }

}