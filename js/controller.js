class Controller {

    constructor(boardWidth, boardHeight, boardPortion, level) {
        this.board = new Board(boardWidth, boardHeight, boardPortion, level, 1.5);
        this.view = new View();
        this.player = new Player(this.board.portion + 23, this.board.portion * 2, {
            x: 100,
            y: this.board.height - this.board.portion * 2 - this.board.portion
        }, 3, 100, 1.7);

        this.playerController = null;
        this.setInitGameListener();
        this.setRestartGameListener();
        this.setGoToMenuListener();
        this.restartedGame = false;

    }

    startGame() {
        this.view.startGame(this.player, this.board);
        if (!this.restartedGame) {
            this.startListeners();
        }
    }

    choosedPlayer() {
        this.setBoostersOnBoard();
        this.setSpidersOnBoard();
        this.view.printBoosters(this.board);
        this.player.position.y = this.view.domElement.scrollHeight - this.board.portion * 2 - this.board.portion;
        this.view.interval = requestAnimationFrame(() => this.view.updateEntities(this.board, this.player));
        this.isPlayerDeath();
    }

    resetGame() {
        this.startGame();
    }

    setInitGameListener() {
        this.view.startGameListener(() => {
            this.resetGame();
        });
        this.view.choosePlayerListener(() => {
            const selectedPlayer = document.querySelector('.player-wrap.active').getAttribute('data-player');
            this.player.character = selectedPlayer;
            this.view.choosePlayer.style.display = 'none';
            this.choosedPlayer();
        });
    }

    setRestartGameListener() {
        this.view.startRestartListener(() => {
            this.resetGame();
            this.resetGameMechanichs();
        });
    }

    resetGameMechanichs() {
        clearInterval(this.player.oxygenInterval);
        this.player.oxygenInterval = null;
        this.board.mobs.forEach(mob => {
            clearInterval(mob.moveInterval);
            mob.moveInterval = undefined;
            mob.position = {
                x: -1, y:-1
            };
        });
        this.board.boosters.forEach(booster => {
            booster.position = {
                x: -1, y:-1
            };
        });
        this.board.mobs = [];
        this.board.boosters = [];
        this.player.status = 'waiting';
        this.player.position = {
            x: 150,
            y: this.view.domElement.scrollHeight - this.board.portion * 2 - this.board.portion
        };
        this.player.hasBulletBoostActive = false;
        this.player.facing = 'right';
        this.player.oxygen = 100;
        this.player.life = 3;
        this.view.domElement.scrollLeft = 0;
        this.player.height = this.board.portion*2;
        this.player.width = this.board.portion + 23;
        clearInterval(this.view.interval);
        this.view.interval = undefined;
        clearInterval(this.player.moveInterval);
        this.view.domElement.querySelector('.player').remove();
        this.player.moveInterval = undefined;
        this.restartedGame = true;
        clearInterval(this.playerController);
        this.playerController = undefined;
    }

    setGoToMenuListener() {
        this.view.startMenuListener(() => {
            this.resetGameMechanichs();
            document.body.style.background = "url('./img/body-background.jpg')";
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundSize = 'cover';
            const title = this.view.menu.querySelector('h1');
            title.style.transform = 'translate3d(-50%,0, 0)';
            title.style.opacity = "1";
            const button = this.view.menu.querySelector('button');
            button.style.transform = 'translateY( 0)';
            button.style.opacity = "1";
            this.view.domElement.style.opacity = "0";
            this.view.choosePlayer.classList.remove('active');
            this.view.menu.style.display = 'flex';
        });
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
            }, 0.4, 'right', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion , this.board.portion, 1, {
                x: 5754,
                y: 765
            }, 0.4, 'left', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion*2 , this.board.portion, 1, {
                x: 6050,
                y: 660
            }, 0.4, 'right', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion*2 , this.board.portion, 1, {
                x: 6350,
                y: 510
            }, 0.4, 'left', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion , this.board.portion, 1, {
                x: 6550,
                y: 460
            }, 0.4, 'right', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion , this.board.portion, 1, {
                x: 6750,
                y: 510
            }, 0.4, 'left', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion*2 , this.board.portion, 1, {
                x: 7000,
                y: 460
            }, 0.4, 'right', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion , this.board.portion, 1, {
                x: 7200,
                y: 460
            }, 0.4, 'left', true)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 1500,
                y: 450
            }, 0.4,'left', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 950,
                y: 950
            }, 0.4,'right', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 2550,
                y: 450
            }, 0.4,'left', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 3050,
                y: 950
            }, 0.4,'right', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 5050,
                y: 650
            }, 0.4,'left', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 1, {
                x: 5600,
                y: 950
            }, 0.4,'right', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 6, {
                x: 6450,
                y: 800
            }, 0.4,'left', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 6, {
                x: 6850,
                y: 800
            }, 0.4,'right', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 6, {
                x: 7350,
                y: 900
            }, 0.4,'left', false)
        );
        this.board.mobs.push(
            new Spider(this.board.portion * 4, this.board.portion * 2, 12, {
                x: 8450,
                y: 850
            }, 0.4,'right', false)
        );
        this.startSpidersWalking();
    }

    isPlayerDeath() {
        if (!this.playerController) {
            this.playerController = setInterval(() => {
                if (this.player.life <= 0 || this.player.oxygen <= 0) {
                    //GAME OVER
                    this.player.status = 'dying';
                    setTimeout(() => {
                        clearInterval(this.player.moveInterval);
                        clearInterval(this.view.interval);
                        clearInterval(this.playerController);
                        this.view.lose.style.display = 'flex';
                        this.playerController = null;
                        clearInterval(this.player.falling);
                        this.player.falling = null;
                        clearInterval(this.player.jumping);
                        this.player.jumping = null;
                        this.player.position = {
                            x: -10, y: -10
                        }
                    }, 1000);
                }
            }, 100);
        }
    }

    startSpidersWalking() {

        this.board.mobs.forEach(spider => {
            if (!spider.moveInterval) {
                if (!spider.isStatic) {
                    spider.moveInterval = setInterval(() => {
                        if (spider.facing === 'right') {

                            if (this.hasSpiderWallInFront(spider)) {
                                spider.position.y -= 2;
                            } else {
                                if (!this.hasSpiderFloor(spider)) {
                                    spider.position.y++;
                                }
                                spider.position.x += spider.velX;
                            }

                            if (this.isPlayerNextToSpider(spider) && spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderAttackingMode();
                                setTimeout(() => {
                                    if (this.isPlayerNextToSpider(spider)) this.getAttacked('right')
                                }, 500);
                                setTimeout(() => {
                                    if (spider.status !== 'dying' && spider.status !== 'died') spider.setSpiderHuntingMode()
                                }, 2000);
                            } else if (this.hasPlayerInRange(spider) && spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderHuntingMode();
                            } else if (spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderWalkingMode();
                                if (spider.position.x - spider.firstPosition > 100 && spider.status === 'walking') {
                                    spider.toggleFacing();
                                }
                            }
                        } else {

                            if (this.hasSpiderWallInFront(spider)) {
                                spider.position.y -= 2;
                            } else {
                                if (!this.hasSpiderFloor(spider)) {
                                    spider.position.y++;
                                }
                                spider.position.x -= spider.velX;
                            }


                            if (this.isPlayerNextToSpider(spider) && spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderAttackingMode();
                                setTimeout(() => {
                                    if (this.isPlayerNextToSpider(spider)) this.getAttacked('left')
                                }, 500);
                                setTimeout(() => {
                                    if (spider.status !== 'dying' && spider.status !== 'died') spider.setSpiderHuntingMode()
                                }, 2000);
                            } else if (this.hasPlayerInRange(spider) && spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderHuntingMode();
                            } else if (spider.status !== 'attacking' && spider.status !== 'waiting' && spider.status !== 'dying') {
                                spider.setSpiderWalkingMode();
                                if (spider.firstPosition - spider.position.x > 100 && spider.status === 'walking') {
                                    spider.toggleFacing();
                                }
                            }
                        }
                    }, 1);
                } else {
                    spider.status= 'waiting';
                }
            }
        });

    }

    getAttacked(from) {
        this.player.life--;
        for (let i = 0; i < 50; i++) {
            if (from === 'right') {
                if (this.canPlayerMoveRight([this.player.position.x + 1, this.player.position.y])) {
                    this.player.position.x++;
                }
            } else {
                if (this.canPlayerMoveLeft([this.player.position.x - 1, this.player.position.y])) {
                    this.player.position.x--;
                }
            }
        }
        this.player.hitSound.play();

    }

    hasSpiderFloor(spider) {
        let response = false;

        const posiblesCollitions = this.board.getPosiblesCollitionsInX(spider.position.x, 100);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (spider.facing === 'left') {
                if (spider.position.x + this.board.portion >= posiblesCollitions[i][0] && spider.position.x + this.board.portion <= posiblesCollitions[i][0] + this.board.portion
                    && posiblesCollitions[i][1] === this._getRoundedPosition(spider.position.y + this.board.portion * 2 - 30)) {
                    response = true;
                }
            } else {
                if (spider.position.x + this.board.portion <= posiblesCollitions[i][0] && spider.position.x + this.board.portion >= posiblesCollitions[i][0] - this.board.portion
                    && posiblesCollitions[i][1] === this._getRoundedPosition(spider.position.y + this.board.portion * 2 - 30)) {
                    response = true;
                }
            }
        }


        return response;
    }

    hasSpiderWallInFront(spider) {
        let response = false;
        const posiblesCollitions = this.board.getPosiblesCollitionsInX(spider.position.x, 100);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (spider.facing === 'left') {
                if (this._getRoundedPosition(spider.position.x + this.board.portion) === posiblesCollitions[i][0] && this._getRoundedPosition(spider.position.y + this.board.portion) === posiblesCollitions[i][1]) {
                    response = true;
                }
            } else {
                if (this._getRoundedPosition(spider.position.x + this.board.portion * 2) === posiblesCollitions[i][0] && this._getRoundedPosition(spider.position.y + this.board.portion) === posiblesCollitions[i][1]) {
                    response = true;
                }
            }
        }

        return response;
    }


    isPlayerNextToSpider(spider) {
        const spiderX = spider.position.x;
        const spiderY = spider.position.y;
        const playerX = this.player.position.x;
        const playerY = this.player.position.y;

        let response = false;

        if (spider.facing === 'left') {
            if (playerX + this.player.width >= spiderX && playerX + this.player.width <= spiderX + spider.width && playerY >= spiderY - this.board.portion && playerY <= spiderY + spider.height) {
                response = true;
            }
        } else {
            if (playerX <= spiderX + spider.width + 20 && playerX >= spiderX && playerY >= spiderY - this.board.portion && playerY <= spiderY + spider.height) {
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
            if (playerX + this.player.width >= spiderX - 300 && playerX + this.player.width <= spiderX + spider.width && playerY + this.player.height / 2 >= spiderY - this.board.portion * 4 && playerY + this.player.height / 2 <= spiderY + spider.height + this.board.portion) {
                response = true;
            }
        } else {
            if (playerX <= spiderX + 300 + spider.width && playerX >= spiderX + spider.width && playerY + this.player.height / 2 >= spiderY - this.board.portion * 4 && playerY + this.player.height / 2 <= spiderY + spider.height + this.board.portion) {
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
        ));
        this.board.boosters.push(new Booster(this.board.portion, this.board.portion, -1, {
                x: 3500,
                y: 700
            }, -1, 'bullet-boost'
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
                        this.player.status = 'walking';
                        this.view.moveCameraToRight(this.board, this.player.position.x + this.player.width / 2);
                        this.player.moveRight();
                        const anyBooster = this.isThereAnyBoosterInPlayerPosition();
                        if (anyBooster) {
                            this.applyBooster(anyBooster);
                        }

                    } else {
                        this.player.status = 'waiting';
                    }
                    break;
                case 'left':
                    if (this.canPlayerMoveLeft([this.player.position.x - this.player.velX, this.player.position.y])) {
                        this.player.status = 'walking';
                        this.view.moveCameraToLeft(this.board, this.player.position.x);

                        this.player.moveLeft();
                        const anyBooster = this.isThereAnyBoosterInPlayerPosition();
                        if (anyBooster) {
                            this.applyBooster(anyBooster);
                        }
                    } else {
                        this.player.status = 'waiting';
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
            case 'bullet-boost':
                this.player.hasBulletBoostActive = true;
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

        const boosters = this.board.boosters;

        for (let i = boosters.length - 1; i >= 0; i--) {
            if (boosters[i].position.x === this._getRoundedPosition(this.player.position.x) && (boosters[i].position.y === this._getRoundedPosition(this.player.position.y + this.board.portion) || boosters[i].position.y === this._getRoundedPosition(this.player.position.y))) {
                response = boosters[i];
            }
        }

        return response
    }

    canPlayerMoveRight(position) {
        let response = true;
        const posiblesCollitions = this.board.getPosiblesCollitionsInX(position[0], 150);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (posiblesCollitions[i][0] === this._getRoundedPosition(position[0] + this.player.width / 1.5 - this.player.velX) && (posiblesCollitions[i][1] === this._getRoundedPosition(position[1] + this.board.portion) || posiblesCollitions[i][1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        }
        if (this._canContinueFalling(this.player) && !this.player.jumping && !this.player.falling) {
            this.playerFalling();
        }

        return response;
    }

    canPlayerMoveLeft(position) {
        let response = true;
        const posiblesCollitions = this.board.getPosiblesCollitionsInX(position[0], 150);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (this._getRoundedPosition(position[0] + this.player.velX * 14) === posiblesCollitions[i][0] + this.board.portion && (posiblesCollitions[i][1] === this._getRoundedPosition(position[1] + this.board.portion) || posiblesCollitions[i][1] === this._getRoundedPosition(position[1]))) {
                response = false;
            }
        }

        if (this._canContinueFalling(this.player) && !this.player.jumping && !this.player.falling) {
            this.playerFalling();
        }

        return response;
    }

    stopMovingPlayerListener() {
        this.view.stopMovingPlayer(() => {
            this.player.stopMoving();
            this.player.status = 'waiting';
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
                        this.player.status = 'jumping';
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

        const posiblesCollitions = this.board.getPosiblesCollitionsInX(playerXPos, 150);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (playerXPos >= posiblesCollitions[i][0] + 2 && playerXPos <= posiblesCollitions[i][0] + portion) {
                if (this._getRoundedPosition(playerYPos + 10) === posiblesCollitions[i][1]) {
                    response = false;
                }
            } else if (playerXPos + playerWidth <= posiblesCollitions[i][0] + 1 + portion && playerXPos + playerWidth >= posiblesCollitions[i][0] + 1) {
                if (this._getRoundedPosition(playerYPos + 10) === posiblesCollitions[i][1]) {
                    response = false;
                }
            }
        }

        return response;
    }

    playerFalling() {
        this.player.startPlayerFalling(setInterval(() => {

            if (this.player.jumping) this.player.stopPlayerFalling();

            if (this._canContinueFalling(this.player)) {
                this.status = 'waiting';
                this.player.position.y += 2;
                if (this.player.position.y > 1000) {
                    this.player.die();
                } else {
                    this.view.moveCameraToBottom(this.board, this.player.position.y);
                }
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

        const posiblesCollitions = this.board.getPosiblesCollitionsInX(playerXPos, 150);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (playerXPos >= posiblesCollitions[i][0] && playerXPos <= posiblesCollitions[i][0] + portion) {
                if (playerYPos <= posiblesCollitions[i][1] && playerYPos + portion >= posiblesCollitions[i][1] + portion - 1) {
                    response = false;
                }
            } else if (playerXPos + playerWidth <= posiblesCollitions[i][0] + 1 + portion + 26 && playerXPos + playerWidth >= posiblesCollitions[i][0] + 1) {
                if (playerYPos <= posiblesCollitions[i][1] && playerYPos + portion >= posiblesCollitions[i][1] + portion - 1) {
                    response = false;
                }
            }
        }

        return response;
    }

    startPlayerShooting() {
        this.view.playerShoot((event) => {
            if (event.key === 'Enter') {

                if (Date.now() / 1000 - this.player.lastShot < 1.5) {
                    this.player.noAmmoSound.play();
                    return false;
                }
                const bullets = [];

                if (this.player.hasBulletBoostActive) {
                    bullets.push(new Bullet(15, 8, -1, {
                            x: this.player.facing === 'right' ? this.player.position.x + this.player.width : this.player.position.x,
                            y: this.player.position.y + this.board.portion
                        }, 15, this.player.facing === 'right' ? 'right-bottom' : 'left-bottom'
                    ));
                    bullets.push(new Bullet(15, 8, -1, {
                            x: this.player.facing === 'right' ? this.player.position.x + this.player.width : this.player.position.x,
                            y: this.player.position.y + this.board.portion
                        }, 15, this.player.facing
                    ));
                    bullets.push(new Bullet(15, 8, -1, {
                            x: this.player.facing === 'right' ? this.player.position.x + this.player.width : this.player.position.x,
                            y: this.player.position.y + this.board.portion
                        }, 15, this.player.facing === 'right' ? 'right-top' : 'left-top'
                    ));

                } else {
                    bullets.push(new Bullet(15, 8, -1, {
                            x: this.player.facing === 'right' ? this.player.position.x + this.player.width : this.player.position.x,
                            y: this.player.position.y + this.board.portion
                        }, 15, this.player.facing
                    ));
                }

                bullets[0].sound.play();
                this.view.printShootFire(this.player);
                this.player.lastShot = Date.now() / 1000;
                setTimeout(() => {
                    this.player.ammoRecharged.play();
                }, 1200);

                for (let i = bullets.length - 1; i >= 0; i--) {
                    this.board.shoots.push(bullets[i]);

                    bullets[i].moveInterval = setInterval(() => {
                        switch (bullets[i].facing) {
                            case 'right':
                                if (this.canBulletMoveRight(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x += bullets[i].velX;

                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;
                            case 'right-top':
                                if (this.canBulletMoveRight(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x += bullets[i].velX;
                                    bullets[i].position.y += 1.5;

                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;
                            case 'right-bottom':
                                if (this.canBulletMoveRight(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x += bullets[i].velX;
                                    bullets[i].position.y -= 1.5;

                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;
                            case 'left-top':
                                if (this.canBulletMoveLeft(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x -= bullets[i].velX;
                                    bullets[i].position.y += 1.5;
                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;
                            case 'left':
                                if (this.canBulletMoveLeft(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x -= bullets[i].velX;
                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;
                            case 'left-bottom':
                                if (this.canBulletMoveLeft(bullets[i]) && !this.isThereAnySpider(bullets[i])) {
                                    bullets[i].position.x -= bullets[i].velX;
                                    bullets[i].position.y -= 1.5;
                                } else {
                                    bullets[i].stopMoving();
                                    bullets[i].position = {
                                        x: -1,
                                        y: -1
                                    }
                                }
                                break;

                        }
                    }, 0);
                }

            }
        });
    }

    isThereAnySpider(bullet) {
        let response = false;
        const mobs = this.board.mobs;
        if (bullet.facing.includes('left')) {
            for (let i = mobs.length - 1; i >= 0; i--) {
                if (bullet.position.x + bullet.width >= mobs[i].position.x && bullet.position.x + bullet.width <= mobs[i].position.x + mobs[i].width && (mobs[i].position.y <= bullet.position.y + bullet.height && mobs[i].position.y + this.board.portion * 2 >= bullet.position.y)) {
                    response = true;
                    this.bulletTouchesSpider(mobs[i]);
                }
            }
        } else {
            for (let i = mobs.length - 1; i >= 0; i--) {
                if (mobs[i].position.x <= bullet.position.x + bullet.width && mobs[i].position.x + mobs[i].width >= bullet.position.x + bullet.width && (mobs[i].position.y <= bullet.position.y + bullet.height && mobs[i].position.y + this.board.portion * 2 >= bullet.position.y)) {
                    response = true;
                    this.bulletTouchesSpider(mobs[i]);
                }

            }
        }
        return response;
    }

    bulletTouchesSpider(spider) {
        spider.restLife();

        if (spider.life === 0) {
            spider.velX = 0;
            spider.status = 'dying';

            const posX = spider.position.x;
            const posY = spider.position.y;

            setTimeout(() => {
                this.board.boosters.push(new Booster(this.board.portion, this.board.portion, -1, {
                        x: this._getRoundedPosition(posX + this.board.portion),
                        y: this._getRoundedPosition(posY + this.board.portion)
                    }, -1, 'oxygen')
                );
                this.view.printBoosters(this.board);

            }, 800);
        }

    }

    canBulletMoveLeft(bullet) {
        let response = true;
        const posiblesCollitions = this.board.getPosiblesCollitionsInX(bullet.position.x, 100);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (this._getRoundedPosition(bullet.position.x + bullet.velX) < 0 || this._getRoundedPosition(bullet.position.x + bullet.velX) === posiblesCollitions[i][0] + this.board.portion && (posiblesCollitions[i][1] <= bullet.position.y + bullet.height && posiblesCollitions[i][1] + this.board.portion >= bullet.position.y)) {
                response = false;
            }
        }

        return response;
    }

    canBulletMoveRight(bullet) {
        let response = true;
        const posiblesCollitions = this.board.getPosiblesCollitionsInX(bullet.position.x, 100);

        for (let i = posiblesCollitions.length - 1; i >= 0; i--) {
            if (this._getRoundedPosition(bullet.position.x + bullet.velX) > this.view.domElement.scrollWidth || posiblesCollitions[i][0] === this._getRoundedPosition(bullet.position.x + bullet.width - bullet.velX) && (posiblesCollitions[i][1] <= bullet.position.y + bullet.height && posiblesCollitions[i][1] + this.board.portion >= bullet.position.y)) {
                response = false;
            }
        }

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