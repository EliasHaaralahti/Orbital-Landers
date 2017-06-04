const gravity = 30;
const thrust = 1.5;
const rotateSpeed = 1;

var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = gravity;
    },

    preload: function () {
        this.load.image('background', 'graphics/temp_background.png');
        this.load.image('spaceShip', 'graphics/temp_spaceShip.png');
        this.load.image('ground', 'graphics/temp_ground.png');
    },

    create: function() {
        this.background = this.add.sprite(
            this.world.centerX, this.world.centerY, 'background');

        this.player1 = this.game.add.sprite(this.game.world.centerX - 150,
            this.game.world.centerY, 'spaceShip')
        this.player1.anchor.setTo(0.5, 0.5);
        this.player1.scale.setTo(0.15);
        this.physics.p2.enable(this.player1);

        this.player2 = this.game.add.sprite(this.game.world.centerX + 150,
            this.game.world.centerY, 'spaceShip')
        this.player2.anchor.setTo(0.5, 0.5);
        this.player2.scale.setTo(0.15);
        this.physics.p2.enable(this.player2);
    },

    update: function() {
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            moveUp(this.player1)
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if(this.player1.body.angle > -90) {
                this.player1.body.angle -= rotateSpeed;
            }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            console.log(this.player1.body.angle)
            if(this.player1.body.angle < 90) {
                this.player1.body.angle += rotateSpeed;
            }
        }

         if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            moveUp(this.player2)
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if(this.player2.body.angle > -90) {
                this.player2.body.angle -= rotateSpeed;
            }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if(this.player2.body.angle < 90) {
                this.player2.body.angle += rotateSpeed;
            }
        }
    }
}

var game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState')

function moveUp(gameobject) {
    var rotation = gameobject.body.angle;
    var direction = new Phaser.Point();
    direction.x = Math.cos(this.game.math.degToRad(rotation-90));
    direction.y = Math.sin(this.game.math.degToRad(rotation-90));

    if(direction.getMagnitude() > 0) {
        direction = direction.normalize()
    }

    gameobject.body.velocity.x = direction.x * 50;
    gameobject.body.velocity.y = direction.y * 50;
}