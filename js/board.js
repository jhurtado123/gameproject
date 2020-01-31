class Board {

    constructor(width, height, portion, level, gravity) {
        this.width = width;
        this.height = height;
        this.portion = portion;
        this.level = level;
        this.levelBricksPositions = [];
        this.gravity = gravity;
        this.boosters = [];
        this.shoots = [];
        this.mobs = [];

        this._setBricksPositions();
    }

    addSpiders() {

    }

    getPosiblesCollitionsInX(x, range) {
        return  this.levelBricksPositions.filter( brick => {
            return brick[0] >= x - range && brick[0] <= x + range;
        });
    }

    _setBricksPositions() {
        const bricksCharacter = ['C', 'X', 'Q', 'E', 'Z'];
        let yPos = 0;
        let xPos = 0;
        for (let y = 0; y < this.level.length; y++) {
            for (let x = 0; x < this.level[y].length; x++) {
                if (bricksCharacter.includes(this.level[y][x])) {
                    this.levelBricksPositions.push([xPos, yPos]);
                }
                xPos += this.portion;
            }
            xPos = 0;
            yPos += this.portion;
        }
    }

}