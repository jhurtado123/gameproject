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
        this.hasBulletBoostActive = false;
        this.status = 'waiting';

        this.sprites = {
            walking : ['wl-1','wl-2','wl-3','wl-4','wl-5','wl-6','wl-7','wl-8','wl-9','wl-10','wl-11','wl-12'],
            waiting: ['wt-1', 'wt-2','wt-3','wt-4','wt-5'],
            jumping: ['jm-1', 'jm-2', 'jm-3'],
            dying: ['di-1','di-2','di-3','di-4','di-5']
        };
        this.spriteStatus = 'wt-1';
        this.spritesVel = 50;

        this.startSpriteAnimation();

    }

    startSpriteAnimation() {

        this.spritesVel = 75;

        if (this.status === 'waiting') {
            this.spritesVel = 200;
        }
        if (this.status === 'dying') {
            this.spritesVel = 75;
        }
        if (this.status === 'jumping') {
            this.spritesVel = 50;
        }

        setTimeout(() => {
            const indexOfSprite = this.sprites[this.status].indexOf(this.spriteStatus);
            if (this.status === 'dying') {console.log(indexOfSprite);console.log(this.spriteStatus);}
            if (indexOfSprite === -1 || indexOfSprite === this.sprites[this.status].length-1) {
                this.spriteStatus = this.sprites[this.status][0];
                if (this.status === 'jumping' && indexOfSprite === this.sprites[this.status].length-1) {
                    this.spriteStatus = this.sprites[this.status][this.sprites[this.status].length-1];
                }
                if (this.status === 'dying' && indexOfSprite === this.sprites[this.status].length-1) {
                    this.spriteStatus = this.sprites[this.status][this.sprites[this.status].length-1];
                }
            } else {
                this.spriteStatus = this.sprites[this.status][indexOfSprite+1];
                if (this.status === 'dying' && indexOfSprite > 3) {
                    this.width = 110;
                    this.height = 100;
                    this.position.y += 4;
                }
                if (this.status === 'dying' && indexOfSprite === 0) {
                    this.width = 110;
                    this.height = 110;
                    this.position.y += 4;
                }
                if (this.status === 'dying' && indexOfSprite === 1) {
                    this.width = 110;
                    this.height = 110;
                    this.position.y += 4;
                }
                if (this.status === 'dying' && indexOfSprite === 2) {
                    this.width = 110;
                    this.height = 110;
                    this.position.y += 4;
                }

            }

            this.startSpriteAnimation();

        }, this.spritesVel);
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