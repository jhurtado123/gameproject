class Controller {

    constructor(boardWidth, boardHeight, boardPortion, level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
        this.player = new Player(this.board.portion, this.board.portion * 2, {
            x: 100,
            y: this.board.height - this.board.portion * 2 - this.board.portion
        }, 3, 100, 2);

        this.setBoostersOnBoard();
        this.setSpidersOnBoard();

        this.view.startGame(this.player, this.board);
        this.startListeners();
        this.player.position.y = this.view.domElement.scrollHeight - this.board.portion * 2 - this.board.portion;
    }

    startListeners() {
        this.movePlayerListener();
        this.stopMovingPlayerListener();
        this.startJumpingListener();
        this.startPlayerShooting();
        this.startLosingOxygen();
    }

    setSpidersOnBoard() {
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 2250,
                y: 850
            }, 0.4)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 1500,
                y: 450
            }, 0.4)
        );
        this.startSpidersWalking();
    }

    startSpidersWalking() {

        this.board.mobs.forEach(spider => {
            if (!spider.moveInterval) {
                spider.moveInterval = setInterval(() => {
                    if (spider.facing === 'right') {

                        spider.position.x += spider.velX;

                        if (this.hasSpiderWallInFront(spider)) {
                            spider.jumpSpider(this.board.portion);
                        } else if (this._canContinueFalling(spider)) {
                          //  spider.fallSpider(this.board.portion);
                        }

                        if (this.isPlayerNextToSpider(spider)) {
                            spider.setSpiderAttackingMode();
                            this.player.getAttacked('right');
                            setTimeout(() => spider.setSpiderHuntingMode(), 1000);
                        } else if (this.hasPlayerInRange(spider) && spider.status !== 'attacking') {
                            spider.setSpiderHuntingMode();
                        } else if (spider.status !== 'attacking') {
                            spider.setSpiderWalkingMode();
                            if (spider.position.x - spider.firstPosition > 100 && spider.status === 'walking') {
                                spider.toggleFacing();
                            }
                        }
                    } else {

                        spider.position.x -= spider.velX;

                        if (this.hasSpiderWallInFront(spider)) {
                          //  spider.jumpSpider(this.board.portion);
                        } else if (this._canContinueFalling(spider)) {
                           // spider.fallSpider(this.board.portion);
                        }

                        if (this.isPlayerNextToSpider(spider)) {
                            spider.setSpiderAttackingMode();
                            this.player.getAttacked('left');
                            setTimeout(() => spider.setSpiderHuntingMode(), 1000);
                        } else if (this.hasPlayerInRange(spider) && spider.status !== 'attacking') {
                            spider.setSpiderHuntingMode();
                        } else if (spider.status !== 'attacking') {
                            spider.setSpiderWalkingMode();
                            if (spider.firstPosition - spider.position.x > 100 && spider.status === 'walking') {
                                spider.toggleFacing();
                            }
                        }
                    }
                }, 1);
            }
        });

    }

    hasSpiderWallInFront(spider) {
        let response = false;
        this.board.getPosiblesCollitionsInX(spider.position.x, 100).forEach(brick => {
            if (spider.facing === 'left') {
                if (this._getRoundedPosition(spider.position.x)  - this.board.portion === brick[0] && spider.position.y + this.board.portion === brick[1] ) {
                    response = true;
                }
            } else {
                if (this._getRoundedPosition(spider.position.x+ spider.width) +this.board.portion === brick[0] && spider.position.y + this.board.portion === brick[1] ) {
                    response = true;
                }
            }
        });
        return response;
    }


    isPlayerNextToSpider(spider) {
        const spiderX = spider.position.x;
        const spiderY = spider.position.y;
        const playerX = this.player.position.x;
        const playerY = this.player.position.y;

        let response = false;

        if (spider.facing === 'left') {
            if (playerX + this.player.width >= spiderX && playerX + this.player.width <= spiderX + spider.width && playerY >= spiderY && playerY <= spiderY + spider.height) {
                response = true;
            }
        } else {
            if (playerX <= spiderX + spider.width && playerX >= spiderX && playerY >= spiderY && playerY <= spiderY + spider.height) {
                response = true;
            }
        }

        return response
    }

    hasPlayerInRange(spider) {
        const spiderX = spider.position.x;
        const spiderY = spider.position.y;
        const playerX = this.player.position.x;
        const playerY = this.player.position.y;

        let response = false;

        if (spider.facing === 'left') {
            if (playerX + this.player.width >= spiderX - 300 && playerX + this.player.width <= spiderX && playerY + this.player.height / 2 >= spiderY - this.board.portion * 3 && playerY + this.player.height / 2 <= spiderY + spider.height + this.board.portion) {
                response = true;
            }
        } else {
            if (playerX <= spiderX + 300 + spider.width && playerX >= spiderX + spider.width && playerY + this.player.height / 2 >= spiderY - this.board.portion * 3 && playerY + this.player.height / 2 <= spiderY + spider.height + this.board.portion) {
                response = true;
            }
        }
        return response;

    }

    setBoostersOnBoard() {
        this.board.boosters.push(new Booster(this.board.portion, this.board.portion, -1, {
                x: 3200,
                y: 1000
            }, -1, 'life'
        ))
    }

    movePlayerListener() {
        this.view.movePlayer((event) => {
            switch (event.key) {
                case 'd':
                    this.player.facing = 'right';
                    this.movePlayer();
                    break;
                case 'a':
                    this.player.facing = 'left';
                    this.movePlayer();
                    break;
            }
        });
    }

    movePlayer() {
        clearInterval(this.player.moveInterval);
        this.player.moveInterval = setInterval(() => {
            switch (this.player.facing) {
                case 'right':
                    if (this.canPlayerMoveRight([this.player.position.x + this.player.velX, this.player.position.y])) {
                        this.player.moveRight();
                        this.view.moveCameraToRight(this.board, this.player.position.x);
                        const anyBooster = this.isThereAnyBoosterInPlayerPosition();
                        if (anyBooster) {
                            this.applyBooster(anyBooster);
                        }
                    }
                    break;
                case 'left':
                    if (this.canPlayerMoveLeft([this.player.position.x - this.player.velX, this.player.position.y])) {
                        this.player.moveLeft();
                        this.view.moveCameraToLeft(this.board, this.player.position.x);
                        const anyBooster = this.isThereAnyBoosterInPlayerPosition();
                        if (anyBooster) {
                            this.applyBooster(anyBooster);
                        }
                    }
                    break;
            }
        }, 1);
    }

    applyBooster(booster) {
        switch (booster.type) {
            case 'oxygen':
                if (this.player.oxygen < 90) {
                    this.player.oxygen += 10;
                } else {
                    this.player.oxygen = 100;
                }
                break;
            case 'life':
                this.player.life++;
                break;
        }
        booster.position = {
            x: -1,
            y: -1
        };
        this.view.printBoosters(this.board);
        booster.sound.play();
    }

    isThereAnyBoosterInPlayerPosition() {
        let response = null;

        this.board.boosters.forEach(booster => {
            if (booster.position.x === this._getRoundedPosition(this.player.position.x) && (booster.position.y === this._getRoundedPosition(this.player.position.y + this.board.portion) || booster.position.y === this._getRoundedPosition(this.player.position.y))) {
                response = booster;
            }
        });

        return response
    }

    canPlayerMoveRight(position) {
        let response = true;
        this.board.getPosiblesCollitionsInX(position[0], 150).forEach(brick => {
            if (brick[0] === this._getRoundedPosition(position[0] + this.player.width / 2 - this.player.velX) && (brick[1] === this._getRoundedPosition(position[1] + this.board.portion) || brick[1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        });
        if (this._canContinueFalling(this.player) && !this.player.jumping && !this.player.falling) {
            this.playerFalling();
        }

        return response;
    }

    canPlayerMoveLeft(position) {
        let response = true;
        this.board.getPosiblesCollitionsInX(position[0], 150).forEach(brick => {
            if (this._getRoundedPosition(position[0] + this.player.velX * 10) === brick[0] + this.board.portion && (brick[1] === this._getRoundedPosition(position[1] + this.board.portion) || brick[1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        });
        if (this._canContinueFalling(this.player) && !this.player.jumping && !this.player.falling) {
            this.playerFalling();
        }

        return response;
    }

    stopMovingPlayerListener() {
        this.view.stopMovingPlayer(() => {
            this.player.stopMoving();
        });
    }

    startLosingOxygen() {
        this.player.startLosingOxygen(setInterval(() => {
            if (this.player.oxygen <= 0) {
                //TODO : GAME OVER SCREEN
            } else {
                this.player.oxygen -= 2;
            }
        }, 1500));
    }

    startJumpingListener() {
        this.view.jumpPlayer((event) => {
            if (event.key === 'w' && !this.player.jumping && !this.player.falling) {

                if (this.player.falling) this.player.stopPlayerJumping();

                const initialPlayerYPos = this.player.position.y;
                this.player.startPlayerJumping(setInterval(() => {
                    if (this.player.position.y < initialPlayerYPos - (this.board.gravity * this.player.height) || !this._canPlayerContinueJumping()) {
                        this.player.stopPlayerJumping();
                        this.playerFalling();
                    } else {
                        this.player.position.y -= 3;
                        this.view.moveCameraToTop(this.board, this.player.position.y);

                    }
                }, 1));
            }
        });
    }

    _canPlayerContinueJumping() {
        let response = true;

        const playerYPos = this.player.position.y;
        const playerXPos = this.player.position.x;
        const portion = this.board.portion;
        const playerWidth = this.player.width;

        this.board.getPosiblesCollitionsInX(playerXPos, 150).forEach(brick => {
            if (playerXPos >= brick[0] + 2 && playerXPos <= brick[0] + portion) {
                if (this._getRoundedPosition(playerYPos + 10) === brick[1]) {
                    response = false;
                }
            } else if (playerXPos + playerWidth <= brick[0] + 1 + portion && playerXPos + playerWidth >= brick[0] + 1) {
                if (this._getRoundedPosition(playerYPos + 10) === brick[1]) {
                    response = false;
                }
            }
        });

        return response;
    }

    playerFalling() {
        this.player.startPlayerFalling(setInterval(() => {

            if (this.player.jumping) this.player.stopPlayerFalling();

            if (this.player.position.y < this.view.domElement.scrollHeight - this.board.portion - this.player.height && this._canContinueFalling(this.player)) {
                this.player.position.y += 2;
                this.view.moveCameraToBottom(this.board, this.player.position.y);
            } else {
                this.player.stopPlayerFalling();
            }
        }, 1));
    }

    _canContinueFalling(entity) {
        let response = true;

        const playerYPos = entity.position.y + entity.height;
        const playerXPos = entity.position.x;
        const portion = this.board.portion;
        const playerWidth = entity.width;

        if (this.player.jumping) return false;

        this.board.getPosiblesCollitionsInX(playerXPos, 150).forEach(brick => {
            if (playerXPos >= brick[0] + 2 && playerXPos <= brick[0] + portion) {
                if (playerYPos <= brick[1] && playerYPos + portion >= brick[1] + portion - 1) {
                    response = false;
                }
            } else if (playerXPos + playerWidth <= brick[0] + 1 + portion && playerXPos + playerWidth >= brick[0] + 1) {
                if (playerYPos <= brick[1] && playerYPos + portion >= brick[1] + portion - 1) {
                    response = false;
                }
            }
        });

        return response;
    }

    startPlayerShooting() {
        this.view.playerShoot((event) => {
            if (event.key === 'Enter') {

                if (Date.now() / 1000 - this.player.lastShot < 1.5) {
                    this.player.noAmmoSound.play();
                    return false;
                }

                const bullet = new Bullet(15, 8, -1,
                    {
                        x: this.player.facing === 'right' ? this.player.position.x + this.player.width : this.player.position.x,
                        y: this.player.position.y + this.board.portion
                    }, 20, this.player.facing
                );
                this.board.shoots.push(bullet);
                bullet.sound.play();
                this.player.lastShot = Date.now() / 1000;
                setTimeout(() => {
                    this.player.ammoRecharged.play();
                }, 1200);
                bullet.moveInterval = setInterval(() => {
                    switch (bullet.facing) {
                        case 'right':
                            if (this.canBulletMoveRight(bullet) && !this.isThereAnySpider(bullet)) {
                                bullet.position.x += bullet.velX;

                            } else {
                                bullet.stopMoving();
                                bullet.position = {
                                    x: -1,
                                    y: -1
                                }
                            }
                            break;
                        case 'left':
                            if (this.canBulletMoveLeft(bullet) && !this.isThereAnySpider(bullet)) {
                                bullet.position.x -= bullet.velX;
                            } else {
                                bullet.stopMoving();
                                bullet.position = {
                                    x: -1,
                                    y: -1
                                }
                            }
                            break;
                    }
                }, 1);
            }
        });
    }

    isThereAnySpider(bullet) {
        let response = false;

        switch (bullet.facing) {
            case "left":
                this.board.mobs.forEach(mob => {
                    if (bullet.position.x + bullet.width >= mob.position.x && bullet.position.x + bullet.width <= mob.position.x + mob.width && (mob.position.y <= bullet.position.y + bullet.height && mob.position.y + this.board.portion * 2 >= bullet.position.y)) {
                        response = true;
                        this.bulletTouchesSpider(mob);
                    }
                });
                break;
            case "right":
                this.board.mobs.forEach(mob => {
                    if (mob.position.x <= bullet.position.x + bullet.width && mob.position.x + mob.width >= bullet.position.x + bullet.width && (mob.position.y <= bullet.position.y + bullet.height && mob.position.y + this.board.portion * 2 >= bullet.position.y)) {
                        response = true;
                        this.bulletTouchesSpider(mob);
                    }
                });
                break;
        }

        return response;
    }

    bulletTouchesSpider(spider) {
        spider.restLife();

        if (spider.life === 0) {

            const posX = spider.position.x;
            const posY = spider.position.y;

            setTimeout(() => {
                this.board.boosters.push(new Booster(this.board.portion, this.board.portion, -1, {
                        x: this._getRoundedPosition(posX + this.board.portion),
                        y: posY + this.board.portion
                    }, -1, 'oxygen')
                );
                this.view.printBoosters(this.board);

            }, 800);

            spider.die();
        }

    }

    canBulletMoveLeft(bullet) {
        let response = true;
        this.board.getPosiblesCollitionsInX(bullet.position.x, 500).forEach(brick => {
            if (this._getRoundedPosition(bullet.position.x + bullet.velX) < 0 || this._getRoundedPosition(bullet.position.x + bullet.velX) === brick[0] + this.board.portion && (brick[1] <= bullet.position.y + bullet.height && brick[1] + this.board.portion >= bullet.position.y)) {
                response = false;
            }
        });

        return response;
    }

    canBulletMoveRight(bullet) {
        let response = true;
        this.board.getPosiblesCollitionsInX(bullet.position.x, 500).forEach(brick => {
            if (this._getRoundedPosition(bullet.position.x + bullet.velX) > this.view.domElement.scrollWidth || brick[0] === this._getRoundedPosition(bullet.position.x + bullet.width - bullet.velX) && (brick[1] <= bullet.position.y + bullet.height && brick[1] + this.board.portion >= bullet.position.y)) {
                response = false;
            }
        });

        return response;
    }

    changeStatusScreen(status) {
        switch (status) {
            case 'start':
                break;
            case 'win':
                break;
            case 'gameOver':
                break;
        }
    }

    startGameListener() {
    }

    resetGameListener() {
    }

    /*
      Redondea el número al mas cercano a la porcion
      302 -> 300
      326 -> 350
      356 -> 350
      389 -> 400
   */
    _getRoundedPosition(position) {

        const portion = this.board.portion;
        if (position % 100 < portion) {
            if (position % 100 < portion / 2) {
                position = position - (position % 100);
            } else {
                position = (position - (position % 100)) + portion;
            }

        } else {
            if (position % 100 < portion * 2 - ((portion * 2) / 4)) {
                position = (position - (position % 100)) + portion;
            } else {
                position = (position - (position % 100)) + portion * 2;
            }
        }

        return position;
    }

}