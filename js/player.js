class Player extends Entity {

    constructor(width, height, position, life, oxygen, velX) {
        super(width, height, life, position, velX);
        this.oxygen = oxygen;
        this.oxygenInterval = null;
        this.jumping = null;
        this.falling = null;
    }

    startLosingOxygen(interval) {
        if (!this.oxygenInterval) {
            this.oxygenInterval = interval;
        }
    }

    startPlayerJumping(interval) {
        if (!this.jumping) {
            this.jumping = interval;
        }
    }
    stopPlayerJumping() {
        clearInterval(this.jumping);
        this.jumping = null;
    }

}