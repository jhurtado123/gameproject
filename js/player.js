class Player extends Entity {

    constructor(width, height, position, life, oxygen, velX) {
        super(width, height, life, position, velX);
        this.oxygen = oxygen;
    }
}