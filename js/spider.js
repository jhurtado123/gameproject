class Spider extends Entity {
    constructor(width, height, life, position, velX) {
        super(width, height, life, position, velX);

        this.facing = 'right';
        this.firstPosition = position.x;
        this.attackSound = null;
        this.moveSound = null;
        this.deathSound = new Audio('sounds/spider-death.ogg');

        this.intervalMove = null;
        this.startMoving();
    }

    startMoving() {
        if (!this.intervalMove) {
            this.intervalMove = setInterval(() => {
               if (this.facing === 'right') {
                   this.position.x += this.velX;
                   if (this.position.x - this.firstPosition > 100) {
                       this.toggleFacing();
                   }
               }  else {
                   this.position.x -= this.velX;
                   if (this.firstPosition - this.position.x > 100) {
                       this.toggleFacing();
                   }
               }
            },40);
        }
    }

    toggleFacing() {
        if (this.facing === 'right') {
            this.facing = 'left';
        } else {
            this.facing = 'right';
        }
    }

    restLife() {
        this.life--;
    }

    die() {
        setTimeout(() => this.deathSound.play(), 500);
        this.position = {
            x: -1,
            y: -1
        }
    }
}