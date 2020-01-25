class View {

    constructor() {
        this.root = document.querySelector('#root');
        this.canvas = null;
        this.ctx = null;
        this.interval = null;
        this.dom = null;
    }

    startGame(player, board) {
        this.createCanvasElement(board);
        this.createDomElement(board);
        this.updatePlayer(player);

    }

    updatePlayer(player) {
        this.interval = setInterval(() => {
            if ( document.querySelector('.player')) {
                document.querySelector('.player').remove();
            }
            const playerElement = document.createElement('div');
            this.dom.appendChild(player);
            playerElement.className = `player ${player.direction}`;
            playerElement.style.width =`${player.width}px`;
            playerElement.style.height =`${player.height}px`;
            playerElement.style.top = `${player.position.y}px`;
            playerElement.style.left = `${player.position.x}px`;
        });
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
        this.dom = document.querySelector('#htmlCanvas');

        this._fillDomElement(board);
    }

    _fillDomElement(board) {
        board.level.forEach(brick => {
            const block = document.createElement('div');
            this.dom.appendChild(block);
            block.className = 'brick';
            block.style.top = `${brick[0]}px`;
            block.style.left = `${brick[1]}px`;
        });

        this.dom.scrollLeft = 0;
    }


}