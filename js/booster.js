class Booster extends Entity {

    constructor(width,height, life, position ,velX, type) {
        super(width, height, life, position, velX);
        this.type = type;
        this.sound =  new Audio('sounds/pick.mp3');
    }

}