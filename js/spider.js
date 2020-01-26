class Spider extends Entity {
    constructor(width, height, life, position, velX) {
        super(width, height, life, position, velX);

        this.attackSound = null;
        this.moveSound = null;
        this.deatSsound = null;
    }
}