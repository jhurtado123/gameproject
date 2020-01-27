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

    setSpiderAttackingMode() {
        this.status = 'attacking';
        this.velX = 0;
    }

    setSpiderHuntingMode() {
        this.status = 'hunting';
        this.velX = 1.1;
    }
    setSpiderWalkingMode() {
        this.status = 'walking';
        this.velX = 0.4;
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