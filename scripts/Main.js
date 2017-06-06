const gravity = 11;
const thrust = 0.3;
const rotateSpeed = 1;

const GREEN =  0x00ff00;
const RED =    0xff0000;
const WHITE =  0xffffff;
const YELLOW = 0xffff00;

var fontstyle_stats = { font: "64px Arial", fill: RED, backgroundColor: YELLOW }

var labels = []

var player1;
var player2;
var shapeSprite;

var gameOver;

var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gravity;
        gameOver = false;
    },

    preload: function () {
        this.load.image('background', 'graphics/temp_background.png');
        this.load.image('spaceShip', 'graphics/temp_spaceShip.png');
        this.load.image('ground', 'graphics/temp_ground.png');
    },

    create: function() {
      this.background = this.add.sprite(
          this.world.centerX, this.world.centerY, 'background');
        this.background.scale.setTo(1.5)
        this.background.anchor.set(0.5)

    this.ground = this.add.sprite(
        this.world.centerX-400, this.world.centerY+350, 'ground');
    this.ground.scale.setTo(2, 1)
    this.ground.anchor.set(0.25, 0)
    this.ground.name = "Ground";
    game.physics.arcade.enable(this.ground)
    this.ground.body.enabled = true
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

      player1 = this.game.add.sprite(this.game.world.centerX - 150,
          this.game.world.centerY - 200, 'spaceShip')
      setUpPlayer(player1);
      player1.name = "Player1"
      game.physics.arcade.enable(player1);
      player1.body.collideWorldBound = true;
      player1.body.maxVelocity.set(50);


      player2 = this.game.add.sprite(this.game.world.centerX + 150,
          this.game.world.centerY - 200, 'spaceShip')
      setUpPlayer(player2);
      player2.name = "Player2"
      game.physics.arcade.enable(player2);
      player2.body.collideWorldBound = true;
      player2.body.maxVelocity.set(50);

        var style_stats = { font: "15px Arial", fill: "#ffffff" , align: "center" };
        var style_announce = { font: "60px Arial", fill: "#ffffff", align: "center" };

        this.name1 = game.add.text(20, 10, "Player1", style_stats);
        this.xVel1 = game.add.text(20, 30, "Player1 x velocity", style_stats);
        this.yVel1 = game.add.text(20, 50, "Player1 y velocity", style_stats);
        this.rot1 = game.add.text(20, 70, "Player1 rotation", style_stats);

        this.name2 = game.add.text(1750, 10, "Player2", style_stats);
        this.xVel2 = game.add.text(1750, 30, "Player1 x velocity", style_stats);
        this.yVel2 = game.add.text(1750, 50, "Player1 y velocity", style_stats);
        this.rot2 = game.add.text(1750, 70, "Player1 rotation", style_stats);

        this.gameOverText = game.add.text(this.game.world.centerX, this.game.world.centerY, "", style_announce);
        this.gameOverText.anchor.set(0.5);
    },

    update: function() {
        this.xVel1.text = "Horizontal: " + player1.body.velocity.x;
        this.yVel1.text = "Vertical: " + player1.body.velocity.y;
        this.rot1.text = "Angle: " + player1.angle;

        this.xVel2.text = "Horizontal: " + player2.body.velocity.x;
        this.yVel2.text = "Vertical: " + player2.body.velocity.y;
        this.rot2.text = "Angle: " + player2.angle;

        game.physics.arcade.collide(player1, player2, onCollision, null, this);
        game.physics.arcade.collide(player1, this.ground, onCollision, null, this);
        game.physics.arcade.collide(player2, this.ground, onCollision, null, this);

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
          moveUp(player1, thrust, -90)
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

         if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            moveUp(player2, thrust, -90)
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

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
          console.log(player1.position.y)
        }
    }
}

function onCollision(object, collider) {
    if(collider.name == "Ground") {
        object.body.velocity.x = 0;
        if(object.angle < -15 || object.angle > 15) {
            console.log(object.name + " goes BOOM!")
            return;
        }
        if(!gameOver) {
            gameOver = true;        
            this.gameOverText.text =  "Game Over!\nWinner: " + object.name + "!\nTime: " + game.time.totalElapsedSeconds();
        }   
    }
}


var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState')
