class Spider extends Entity {
    constructor(width, height, life, position, velX) {
        super(width, height, life, position, velX);

        this.facing = 'right';
        this.firstPosition = position.x;
        this.attackSound = null;
        this.moveSound = null;
        this.deathSound = new Audio('sounds/spider-death.ogg');
        this.status = 'walking';
    }

    startFollowingPlayer(player) {

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
        this.stopMoving();
        setTimeout(() => this.deathSound.play(), 500);
        this.position = {
            x: -1,
            y: -1
        }
    }
}