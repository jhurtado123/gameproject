class View {

    constructor() {
        this.root = document.querySelector('#root');
        this.canvas = null;
        this.ctx = null;
        this.interval = null;
        this.domElement = null;
        this.oxygenBar = document.querySelector('#oxygen');
        this.livesWrap = document.querySelector('#livesWrap');
        this.menu = document.querySelector('#start');
        this.finished = document.querySelector('#win');
        this.lose = document.querySelector('#lose');
        this.choosePlayer = document.querySelector('#charChoose');
        this.setListenersForPreGame();
    }

    startGame(player, board) {
        this.createDomElement(board);
        this.menu.style.display = 'none';
        this.finished.style.display = 'none';
        this.lose.style.display = 'none';
        this.choosePlayer.style.display = 'flex';
    }

    /*
    * EVENTS
    */
    setListenersForPreGame() {
        document.querySelector('.player-chooser .next').addEventListener('click', () => {
           document.querySelectorAll('.player-wrap').forEach(element => {
               element.classList.toggle('active');
           });
        });
        document.querySelector('.player-chooser .prev').addEventListener('click', () => {
            document.querySelectorAll('.player-wrap').forEach(element => {
                element.classList.toggle('active');
            });
        });
    }
    choosePlayerListener(callback) {
        document.querySelector('#playerChoosed').addEventListener('click', callback);
    }
    startGameListener(callback) {
        document.querySelectorAll('.start-game').forEach(element => {
            element.addEventListener('click', callback);
        });
    }

    startMenuListener(callback) {
        document.querySelector('.menu').addEventListener('click', callback);
    }

    startRestartListener(callback) {
        document.querySelector('.restart').addEventListener('click', callback);
    }

    movePlayer(callback) {
        document.addEventListener('keypress', callback);
    }

    stopMovingPlayer(callback) {
        document.addEventListener('keyup', callback);
    }

    jumpPlayer(callback) {
        document.addEventListener('keypress', callback);
    }

    playerShoot(callback) {
        document.addEventListener('keypress', callback);
    }


    updateEntities(board, player) {
        setTimeout(() => {
            this.updatePlayer(player);
            this.updateBullets(board.shoots);
            this.updateSpiders(board.mobs);

            requestAnimationFrame(() => this.updateEntities(board, player));
        }, 1000 / fps);
    }

    updatePlayer(player) {
        this.removeNodes(document.querySelectorAll('.player'));

        const playerElement = document.createElement('div');
        this.domElement.appendChild(playerElement);
        playerElement.className = `player facing-${player.facing} ${player.spriteStatus} ch-${player.character}`;
        playerElement.style.width = `${player.width}px`;
        playerElement.style.height = `${player.height}px`;
        playerElement.style.top = `${player.position.y}px`;
        playerElement.style.left = `${player.position.x}px`;
        playerElement.style.backgroundSize = '100% 100%';

        this.oxygenBar.querySelector('.fill-bar').style.width = `${player.oxygen}%`;

        this.livesWrap.innerHTML = '';
        for (let i = 0; i < player.life; i++) {
            const heart = document.createElement('img');
            heart.src = 'img/heart.png';
            this.livesWrap.appendChild(heart);
        }
    }

    updateBullets(shoots) {
        this.removeNodes(document.querySelectorAll('.bullet'));

        for (let i = shoots.length - 1; i >= 0; i--) {
            const bulletElement = document.createElement('div');
            this.domElement.appendChild(bulletElement);
            bulletElement.className = `bullet facing-${shoots[i].facing}`;
            bulletElement.style.width = `${shoots[i].width}px`;
            bulletElement.style.height = `${shoots[i].height}px`;
            bulletElement.style.left = `${shoots[i].position.x}px`;
            bulletElement.style.top = `${shoots[i].position.y}px`;
            bulletElement.style.backgroundSize = '100% 100%';
        }
    }

    updateSpiders(spiders) {
        this.removeNodes(document.querySelectorAll('.spider'));

        for (let i = spiders.length - 1; i >= 0; i--) {
            if (spiders[i].position.x !== -1 && spiders[i].position.y !== -1) {
                const spiderElement = document.createElement('div');
                this.domElement.appendChild(spiderElement);
                spiderElement.className = `spider facing-${spiders[i].facing} ${spiders[i].spriteStatus}`;
                spiderElement.style.width = `${spiders[i].width}px`;
                spiderElement.style.height = `${spiders[i].height}px`;
                spiderElement.style.left = `${spiders[i].position.x}px`;
                spiderElement.style.top = `${spiders[i].position.y}px`;
                spiderElement.style.backgroundSize = '100% 100%';
            }
        }
    }


    createDomElement(board) {
        const htmlCanvas = document.createElement('div');
        htmlCanvas.id = 'htmlCanvas';
        this.root.appendChild(htmlCanvas);
        this.domElement = document.querySelector('#htmlCanvas');


        this._fillDomElement(board);

        const background = document.createElement('div');
        this.domElement.appendChild(background);
        background.className = "background";
        background.style.width = `${this.domElement.scrollWidth}px`;
        background.style.height = `${this.domElement.scrollHeight}px`;
    }

    _fillDomElement(board) {
        let yPos = 0;
        let xPos = 0;
        for (let y = 0; y < board.level.length; y++) {
            for (let x = 0; x < board.level[y].length; x++) {
                let className = undefined;

                bricksClasses.forEach(brick => {
                    if (brick.keyWord === board.level[y][x]) {
                        className = brick.class;
                    }
                });
                if (className) {
                    const brickElement = document.createElement('div');
                    this.domElement.appendChild(brickElement);
                    brickElement.className = className;
                    brickElement.style.top = `${yPos}px`;
                    brickElement.style.left = `${xPos}px`;
                    brickElement.style.width = `${board.portion}px`;
                    brickElement.style.height = `${board.portion}px`;
                }

                xPos += board.portion;
            }
            xPos = 0;
            yPos += board.portion;
        }

        this.printBoosters(board);

        this.domElement.scrollLeft = 0;
        this.domElement.scrollTop = 2000;
    }

    printShootFire(player) {
        const elementFire = document.createElement('div');
        this.domElement.appendChild(elementFire);
        elementFire.classList.add(`shoot-fire`);
        elementFire.classList.add(`${player.facing}`);
        elementFire.style.top = `${player.position.y +5 + player.height/2}px`;
        elementFire.style.left = player.facing === 'right' ? `${player.position.x + 2 + player.width}px` : `${player.position.x - 30 }px`;
        setTimeout(() => {
            elementFire.remove();
        },40);
    }

    printBoosters(board) {

        this.removeNodes(document.querySelectorAll('.booster'));

        const boosters = board.boosters;
        for (let i = boosters.length - 1; i >= 0; i--) {
            if (boosters[i].position.x !== -1 && boosters[i].position.y !== -1) {
                const boosterElement = document.createElement('div');
                this.domElement.appendChild(boosterElement);
                boosterElement.className = `booster ${boosters[i].type}`;
                boosterElement.style.top = `${boosters[i].position.y}px`;
                boosterElement.style.left = `${boosters[i].position.x}px`;
                boosterElement.style.width = `${boosters[i].width}px`;
                boosterElement.style.height = `${boosters[i].height}px`;
                boosterElement.style.backgroundSize = '100% 100%';
            }
        }

    }

    removeNodes(elements) {
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].remove();
        }
    }

    moveCameraToRight(board, posX) {
        let rightQuart = (this.domElement.scrollLeft + board.width) - (board.width / 4);

        if (posX > rightQuart) {
            for (let i = 0; i <= 1; i++) {
                setTimeout(() => {
                    this.domElement.scrollLeft += 1;
                },20);
            }
        }

    }

    moveCameraToLeft(board, posX) {
        const leftQuart = this.domElement.scrollLeft + (board.width / 4);

        if (posX < leftQuart && this.domElement.scrollLeft > 0) {
            this.domElement.scrollLeft -= 2;
        }
    }

    moveCameraToTop(board, posY) {
        const rightQuart = (board.height / 4) * 3;

        if (posY + 200 < rightQuart) {
            this.domElement.scrollTop -= 2;
        }
    }

    moveCameraToBottom(board, posY) {
        const rightQuart = 700;

        if (posY + 200 > rightQuart) {
            this.domElement.scrollTop += 2;
        }
    }


}