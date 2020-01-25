class Entity {
    constructor(width, height, life, position, velX) {
        this.width = width;
        this.height = height;
        this.life = life;
        this.position = position;
        this.velX = velX;
        this.facing = 'right';
        this.moveInterval = null;
    }

    moveRight() {
        this.position.x += this.velX;
    }

    moveLeft() {
        this.position.x -= this.velX;
    }

    stopMoving() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
}