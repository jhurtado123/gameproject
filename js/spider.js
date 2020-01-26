class Spider extends Entity {
    constructor(width, height, life, position, velX) {
        super(width, height, life, position, velX);

        this.attackSound = null;
        this.moveSound = null;
        this.deathSound = new Audio('sounds/spider-death.ogg');
    }

    die() {
        setTimeout(() => this.deathSound.play(), 500);
        this.position = {
            x: -1,
            y:-1
        }
    }
}