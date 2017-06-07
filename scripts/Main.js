const gravity = 11;
const thrust = 0.3;
const rotateSpeed = 1;
const maxSpeed = 60;
const maxLandingVelocity = 20 * 5;
const maxLabelDistance = 125;

const GREEN = 0x00ff00;
const RED = 0xff0000;
const WHITE = 0xffffff;
const YELLOW = 0xffff00;

var labels = []
var groundObjects = []

var player1;
var player2;
var shapeSprite;

var p1LastVelocity;
var p2LastVelocity;
var gameOver;
var p1Destroyed = false;
var p2Destroyed = false;
var p1Flying = true;
var p2Flying = true;
var player1Text;
var player2Text;
var p1Multiplier = 1;
var p2Multiplier = 1;
var p1FinishTime = 0;
var p2FinishTime = 0;
var thrust1;
var thrust2;

var explosionSound;
var actionSound;

// TODO: Wait for both players to finish and calculate score
// TODO: If crash while holding W, leaves "animation" behind :D (remove it too)

var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gravity;
        gameOver = false;
    },

    preload: function () {
        this.load.image('background', 'graphics/background.png');
        this.load.image('spaceShip', 'graphics/spaceShip_normal.png');
        this.load.image('ground', 'graphics/ground.png');
        this.load.image('spaceShip_thrust', 'graphics/spaceShip_thrust.png');

        this.load.audio('explosion', 'sounds/explosion.wav');
        this.load.audio('action', 'sounds/action.wav');
        this.load.audio('thrust', 'sounds/thruster.wav');
    },

    create: function() {
        this.background = this.add.sprite(
            this.world.centerX, this.world.centerY, 'background');
        this.background.scale.setTo(1.5)
        this.background.anchor.set(0.5)

        player1 = this.game.add.sprite(this.game.world.centerX - 150,
          this.game.world.centerY - 450, 'spaceShip')
        setUpPlayer(player1);
        player1.name = "Player 1"
        game.physics.arcade.enable(player1);
        player1.body.collideWorldBound = true;
        player1.body.maxVelocity.set(maxSpeed);

        player2 = this.game.add.sprite(this.game.world.centerX + 150,
            this.game.world.centerY - 450, 'spaceShip')
        setUpPlayer(player2);
        player2.name = "Player 2"
        game.physics.arcade.enable(player2);
        player2.body.collideWorldBound = true;
        player2.body.maxVelocity.set(maxSpeed);

        createLevel(game);

        thrust1 = this.game.add.sprite(-150, -150, 'spaceShip_thrust');
        setUpPlayer(thrust1);
        thrust2 = this.game.add.sprite(-150, -150, 'spaceShip_thrust');
        setUpPlayer(thrust2);


        var style_stats = { font: "15px Arial", fill: "#ffffff" , align: "center" };
        var style_announce = { font: "60px Arial", fill: "#ffffff", align: "center" };

        this.name1 = game.add.text(20, 10, player1.name, style_stats);
        this.xVel1 = game.add.text(20, 30, "Player1 x velocity", style_stats);
        this.yVel1 = game.add.text(20, 50, "Player1 y velocity", style_stats);
        this.rot1 = game.add.text(20, 70, "Player1 rotation", style_stats);

        this.name2 = game.add.text(game.world.width - 100, 10, player2.name, style_stats);
        this.xVel2 = game.add.text(game.world.width - 100, 30, "Player1 x velocity", style_stats);
        this.yVel2 = game.add.text(game.world.width - 100, 50, "Player1 y velocity", style_stats);
        this.rot2 = game.add.text(game.world.width - 100, 70, "Player1 rotation", style_stats);

        this.gameOverText = game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "", style_announce);
        this.gameOverText.anchor.set(0.5);

        player1Text = game.add.text(0, 0, player1.name, style_stats)
        player2Text = game.add.text(0, 0, player2.name, style_stats)

        this.timerText = game.add.text(game.world.centerX,
                                        game.world.centerY - 525,
                                        "", style_stats);

        actionSound = game.add.audio('action');
        actionSound.volume = 0.5;
        explosionSound = game.add.audio('explosion');
        explosionSound.volume = 0.1;
        this.thrustSound = game.add.audio('thrust');
        this.thrustSound.volume = 0.01;

        timer = game.time.create(false);
        timer.loop(2000, updateLastVelocity, this);
        timer.start();
    },

    update: function() {
        this.timerText.text = "Time: " + game.time.totalElapsedSeconds().toFixed(0);
        if(p1Destroyed && p2Destroyed) this.gameOverText.text = "Both destroyed!\nGame Over!";

        if(!p1Destroyed) {
            player1Text.position.x = player1.position.x - 27;
            player1Text.position.y = player1.position.y - 40;

            this.xVel1.text = "Horizontal: " + player1.body.velocity.x.toFixed(0);
            this.yVel1.text = "Vertical: " + player1.body.velocity.y.toFixed(0);
            this.rot1.text = "Angle: " + player1.angle;
        }

        if(!p2Destroyed) {
            player2Text.position.x = player2.position.x - 27;
            player2Text.position.y = player2.position.y - 40;

            this.xVel2.text = "Horizontal: " + player2.body.velocity.x.toFixed(0);
            this.yVel2.text = "Vertical: " + player2.body.velocity.y.toFixed(0);
            this.rot2.text = "Angle: " + player2.angle;
        }

        // Go through all collisions
        for(var i = 0; i < groundObjects.length; i++) {
            game.physics.arcade.collide(
                player1, groundObjects[i], onCollision, null, this);
            game.physics.arcade.collide(
                player2, groundObjects[i], onCollision, null, this);
        }

        if(!p1Destroyed) {
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.thrust1.position.x = player1.position.x;
                this.thrust1.position.y = player1.position.y;
                this.thrust1.angle = player1.angle;
                moveUp(player1, thrust, -90)
                this.thrustSound.play();
            }
            if(!this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.thrust1.position.x = -150;
                this.thrust1.position.y = -150;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                if(player1.angle > -90) {
                    player1.angle -= rotateSpeed;
                }
            }

            if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                if(player1.angle < 90) {
                    player1.angle += rotateSpeed;
                }
            }
        }

        if(!p2Destroyed) {
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.thrust2.position.x = player2.position.x;
                this.thrust2.position.y = player2.position.y;
                this.thrust2.angle = player2.angle;
                moveUp(player2, thrust, -90)
                this.thrustSound.play();
            }
            if(!this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.thrust2.position.x = -150;
                this.thrust2.position.y = -150;
            }

            if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if(player2.angle > -90) {
                    player2.angle -= rotateSpeed;
                }
            }

            if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if(player2.angle < 90) {
                    player2.angle += rotateSpeed;
                }
            }
        }
    }
}

function onCollision(object, collider) {
    if(collider.name.includes("Ground")) {
        object.body.velocity.x = 0;
        if(!gameOver) {
            if(object.angle < -15 || object.angle > 15) {
                destroySprite(object);
                return;
            }
            if(object.name === player1.name) {
                if(p1LastVelocity > maxLandingVelocity){
                    destroySprite(object);
                    return;
                } else {
                  p1FinishTime = game.time.totalElapsedSeconds().toFixed(1);
                }
            }
            if(object.name === player2.name) {
                if(p2LastVelocity > maxLandingVelocity){
                    destroySprite(object);
                    return;
                } else {
                  p2FinishTime = game.time.totalElapsedSeconds().toFixed(1);
                }
            }
            gameOver = true;
            getMultiplier(object);
            if(!p1Flying && !p2Flying) {
              // var time = game.time.totalElapsedSeconds().toFixed(1)
              winner = chooseWinner;
              if(winner == player1.name) {
                this.gameOverText.text = (
                    "Game Over!\nWinner: " + winner + "\nTime: " + p1FinishTime +
                    "\nMultiplier: " + p1Multiplier + "\nTotal: " +
                    p1FinishTimetime / p1Multiplier
                )
              }
              else if(winner == player2.name) {
                this.gameOverText.text = (
                    "Game Over!\nWinner: " + winner + "\nTime: " + p2FinishTime +
                    "\nMultiplier: " + p2Multiplier + "\nTotal: " +
                    p2FinishTimetime / p2Multiplier
                )
              }
              actionSound.play();
            }
        }
    }
}

function chooseWinner() {
  if( (p1FinishTime / p1Multiplier) > (p2FinishTime / p2Multiplier) ) {
    return player1.name;
  } else {
    return player2.name;
  }
}

function getMultiplier(firstPlayer) {
    var closestLabel = getClosestLabel(firstPlayer);
    if(closestLabel != -1)
        if(firstPlayer.name = player1.name) {
          p1Multiplier = closestLabel.text.substring(
              0, closestLabel.text.length - 1);
        }
        else if(firstPlayer.name = player2.name) {
          p2Multiplier = closestLabel.text.substring(
              0, closestLabel.text.length - 1);
        }
}

function destroySprite(sprite) {
    if(sprite.name == player1.name){
        p1Destroyed = true;
        p1Flying = false;
        thrust1.destroy();
        player1Text.text = "";
    }
    if(sprite.name == player2.name) {
        p2Destroyed = true;
        p2Flying = false;
        thrust2.destroy();
        player2Text.text = "";
    }
    explosionSound.play();
    sprite.destroy();
}

var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState')
