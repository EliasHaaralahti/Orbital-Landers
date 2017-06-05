const gravity = 11;
const thrust = 0.5;
const rotateSpeed = 1;

const GREEN =  0x00ff00;
const RED =    0xff0000;
const WHITE =  0xffffff;
const YELLOW = 0xffff00;

var fontStyle = { font: "64px Arial", fill: RED, backgroundColor: YELLOW }

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
        /*
        var line = this.game.add.graphics(0,0);
        line.lineStyle(2, WHITE).moveTo(100, 100).lineTo(300, 200);
        // line.boundsPadding = 0;

        shapeSprite = this.game.add.sprite(0,0, 'spaceShip');
        shapeSprite.name = "ShapeSprite";
        shapeSprite.addChild(line)
        // game.physics.arcade.enable(shapeSprite);
        game.physics.enable(shapeSprite, Phaser.Physics.ARCADE)
        // shapeSprite.body.enabled = true;
        // shapeSprite.body.allowGravity = false
        */
        var text = game.add.text(-150, -150, "testiiiiiiiiiiiiiiiiing", fontStyle);
        text.anchor.set(0.5);
        text.width = 50;
        text.height = 50;

      this.background = this.add.sprite(
          this.world.centerX, this.world.centerY, 'background');
        this.background.scale.setTo(1.5)
        this.background.anchor.set(0.5)

        var text2 = game.add.text(150, 150, "testtteagg");
        text2.anchor.set(0.5);

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
      player1.body.maxVelocity.set(25);


      player2 = this.game.add.sprite(this.game.world.centerX + 150,
          this.game.world.centerY - 200, 'spaceShip')
      setUpPlayer(player2);
      player2.name = "Player2"
      game.physics.arcade.enable(player2);
      player2.body.collideWorldBound = true;
      player2.body.maxVelocity.set(25);
    },

    update: function() {
        game.physics.arcade.collide(player1, player2, onCollision, null, this);
        // game.physics.arcade.collide(player1, shapeSprite, onCollision, null, this);
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
        if(!gameOver) {
            gameOver = true;
            console.log("Collision between: " + object.name + " and " + collider.name)
            console.log("timer: " + game.time.totalElapsedSeconds())
            console.log("Winner: " + object.name)
        }   
    }
}


var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState')
