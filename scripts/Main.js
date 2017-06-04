const gravity = 30;
const thrust = 50;
const rotateSpeed = 1;

// https://phaser.io/examples/v2/category/p2-physics
// TODO: Use impact events instead? Need to figure which player hit what

// Idea for ground: https://phaser.io/examples/v2/box2d/car-on-terrain
// On collision with ground, check distance to all bonus labels? if close enough
// to one, apply score multiplier?

var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
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
        setUpPlayer(this.player1);
        this.physics.p2.enable(this.player1);
        this.player1.body.onBeginContact.add(onHit, this);

        this.player2 = this.game.add.sprite(this.game.world.centerX + 150,
            this.game.world.centerY, 'spaceShip')
        setUpPlayer(this.player2);
        this.physics.p2.enable(this.player2);
        this.player2.body.onBeginContact.add(onHit, this);
    },

    update: function() {
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.player1.body.thrust(thrust);
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if(this.player1.body.angle > -90) {
                this.player1.body.angle -= rotateSpeed;
            }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            if(this.player1.body.angle < 90) {
                this.player1.body.angle += rotateSpeed;
            }
        }

         if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player2.body.thrust(thrust);
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

function onHit(body1, body2, shape1 ,shape2, equation) {
    if(body1) {
        console.log(body2.sprite + " hit: " + body1.sprite.key)
    } else {
        console.log("hit a wall!");
    }
}

function setUpPlayer(player) {
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.15);
}

var game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState')