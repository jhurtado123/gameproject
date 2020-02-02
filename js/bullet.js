class Bullet extends Entity {

    constructor(width,height, life, position, velX, facing) {
        super(width,height, life, position, velX);
        this.sound =  new Audio('sounds/shoot.mp3');
        this.facing = facing;
        this.sound.volume= 0.5;
    }

}