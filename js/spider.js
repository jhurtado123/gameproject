class Spider extends Entity {
    constructor(width, height, life, position, velX, facing, isStatic) {
        super(width, height, life, position, velX);

        this.facing = facing;
        this.firstPosition = position.x;
        this.attackSound = null;
        this.moveSound = null;
        this.deathSound = new Audio('sounds/spider-death.ogg');
        this.status = 'walking';
        this.isStatic = isStatic;
        this.spriteStatus = 'at-1';
        this.startSpriteAnimation();

        this.sprites = {
            walking : ['wl-1','wl-2','wl-3','wl-4','wl-5','wl-6','wl-7','wl-8'],
            hunting : ['wl-1','wl-2','wl-3','wl-4','wl-5','wl-6','wl-7','wl-8'],
            attacking : ['at-1','at-2', 'at-3', 'at-4', 'at-5', 'at-6'],
            waiting: ['wt-1','wt-2','wt-3','wt-4','wt-5'],
            dying: ['di-1','di-2','di-3','di-4','di-5','di-6','di-7'],
            dead: []

        };
        this.spritesVel = 50;
    }

    startSpriteAnimation() {

        this.spritesVel = 175;
        if (this.status === 'hunting') {
            this.spritesVel = 150;
        }
        if (this.status === 'attacking') {
            this.spritesVel = 50;
        }
        if ( this.status === 'waiting') {
            this.spritesVel = 100;
        }
        if ( this.status === 'dying') {
            this.spritesVel = 50;
        }
        setTimeout(() => {
                const indexOfSprite = this.sprites[this.status].indexOf(this.spriteStatus);
                if (indexOfSprite === -1 || indexOfSprite === this.sprites[this.status].length-1) {
                    this.spriteStatus = this.sprites[this.status][0];
                    if (indexOfSprite === this.sprites[this.status].length-1 && this.status === 'attacking') {
                        this.status = 'waiting';
                        this.spriteStatus = this.sprites['waiting'][0];
                    }
                    if (indexOfSprite === this.sprites[this.status].length-1 && this.status === 'dying') {
                        this.die();
                    }
                } else {
                    this.spriteStatus = this.sprites[this.status][indexOfSprite+1];
                }

            this.startSpriteAnimation();

        },this.spritesVel);
    }

    setSpiderAttackingMode() {
        this.status = 'attacking';
        this.velX = 0;
    }

    setSpiderHuntingMode() {
        this.status = 'hunting';
        this.velX = 2.2;
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

    jumpSpider(pixels) {
        for (let i = 0; i < pixels; i++) {
            this.position.y--;
        }
    }
    fallSpider(pixels) {
        for (let i = 0; i < pixels; i++) {
            this.position.y++;
        }
    }

    die() {
        this.status = 'died';
        this.stopMoving();
        setTimeout(() => this.deathSound.play(), 500);
        this.position = {
            x: -1,
            y: -1
        }
    }
}