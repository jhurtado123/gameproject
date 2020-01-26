class View {

    constructor() {
        this.root = document.querySelector('#root');
        this.canvas = null;
        this.ctx = null;
        this.interval = null;
        this.domElement = null;
        this.oxygenBar = document.querySelector('#oxygen');
        this.livesWrap = document.querySelector('#livesWrap');
    }

    startGame(player, board) {
        this.createCanvasElement(board);
        this.createDomElement(board);
        this.updatePlayer(player);

    }

    /*
    * EVENTS
    */
    movePlayer(callback) {
        document.addEventListener('keypress', callback);
    }

    stopMovingPlayer(callback) {
        document.addEventListener('keyup', callback);
    }

    jumpPlayer(callback) {
        document.addEventListener('keypress', callback);
    }

    updatePlayer(player) {
        if (!this.interval) {
            this.interval = setInterval(() => {
                if (document.querySelector('.player')) {
                    document.querySelector('.player').remove();
                }
                const playerElement = document.createElement('div');
                this.domElement.appendChild(playerElement);
                playerElement.className = `player ${player.facing}`;
                playerElement.style.width = `${player.width}px`;
                playerElement.style.height = `${player.height}px`;
                playerElement.style.top = `${player.position.y}px`;
                playerElement.style.left = `${player.position.x}px`;
                playerElement.style.backgroundSize = '100% 100%';

                this.oxygenBar.querySelector('.fill-bar').style.width = `${player.oxygen}%`;

                this.livesWrap.innerHTML = '';
                for (let i = 0; i < player.life; i++) {
                    const heart = document.createElement('img');
                    heart.src = 'img/heart.png';
                    this.livesWrap.appendChild(heart);
                }

            });
        }
    }

    createCanvasElement(board) {
        const canvas = document.createElement('canvas');
        canvas.width = board.width;
        canvas.height = board.height;
        canvas.id = 'canvasRoot';
        canvas.style.border = "1px solid black";
        this.root.appendChild(canvas);
        this.canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext('2d');
    }

    createDomElement(board) {
        const htmlCanvas = document.createElement('div');
        htmlCanvas.id = 'htmlCanvas';
        this.root.appendChild(htmlCanvas);
        this.domElement = document.querySelector('#htmlCanvas');

        this._fillDomElement(board);
    }

    _fillDomElement(board) {
        board.levelBricksPositions.forEach(brick => {
            const brickElement = document.createElement('div');
            this.domElement.appendChild(brickElement);
            brickElement.className = 'brick';
            brickElement.style.top = `${brick[1]}px`;
            brickElement.style.left = `${brick[0]}px`;
            brickElement.style.width = `${board.portion}px`;
            brickElement.style.height = `${board.portion}px`;
        });

        this.printBoosters(board);

        this.domElement.scrollLeft = 0;
        this.domElement.scrollTop = 2000;
    }

    printBoosters(board) {

        document.querySelectorAll('.booster').forEach(boosterElement => boosterElement.remove());
        board.boosters.forEach( booster => {
            const boosterElement = document.createElement('div');
            this.domElement.appendChild(boosterElement);
            boosterElement.className = `booster ${booster.type}`;
            boosterElement.style.top = `${booster.position.y}px`;
            boosterElement.style.left = `${booster.position.x}px`;
            boosterElement.style.width = `${booster.width}px`;
            boosterElement.style.height = `${booster.height}px`;
            boosterElement.style.backgroundSize = '100% 100%';


        });
    }

    moveCameraToRight(board, posX) {
        const rightQuart = (this.domElement.scrollLeft + board.width) - (board.width / 4);

        if (posX > rightQuart) {
            this.domElement.scrollLeft += 2;
        }
    }

    moveCameraToLeft(board, posX) {
        const leftQuart = this.domElement.scrollLeft + (board.width / 4);

        if (posX < leftQuart && this.domElement.scrollLeft > 0) {
            this.domElement.scrollLeft -= 2;
        }
    }

    moveCameraToTop(board, posY) {
        const rightQuart = (board.height / 4) * 3;

        if (posY+200 < rightQuart) {
            this.domElement.scrollTop -= 2;
        }
    }
    moveCameraToBottom(board, posY) {
        const rightQuart = 700;

        if (posY+200 > rightQuart) {
            this.domElement.scrollTop += 2;
        }
    }



}