class Player extends Entity {

    constructor(width, height, position, life, oxygen, velX) {
        super(width, height, life, position, velX);
        this.oxygen = oxygen;
        this.oxygenInterval = null;
        this.jumping = null;
        this.falling = null;
        this.noAmmoSound = new Audio('sounds/no-ammo.mp3');
        this.ammoRecharged = new Audio('sounds/gun-reload.mp3');
        this.lastShot = Date.now() / 1000;
        this.hitSound = new Audio('sounds/hit.mp3');
        this.deathSound = new Audio('');

    }

    startLosingOxygen(interval) {
        if (!this.oxygenInterval) {
            this.oxygenInterval = interval;
        }
    }

    startPlayerJumping(interval) {
        if (!this.jumping && !this.falling) {
            this.jumping = interval;
        }
    }

    stopPlayerJumping() {
        clearInterval(this.jumping);
        this.jumping = null;
    }

    startPlayerFalling(interval) {
        clearInterval(this.falling);
        if (!this.jumping && !this.falling) {
            this.falling = interval;
        }
    }

    stopPlayerFalling() {
        clearInterval(this.falling);
        this.falling = null;
    }


    die() {
        this.life = 0;
    }
}