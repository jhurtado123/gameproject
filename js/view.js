class View {

    constructor() {
        this.root = document.querySelector('#root');
        this.canvas = null;
        this.ctx = null;
        this.interval = null;
        this.domElement = null;
    }

    startGame(player, board) {
        this.createCanvasElement(board);
        this.createDomElement(board);
        this.updatePlayer(player);

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
        });

        this.domElement.scrollLeft = 0;
    }


}