const gravity = 30;
const thrust = 1.5;
const rotateSpeed = 1;

// https://phaser.io/examples/v2/category/p2-physics
// TODO: Use impact events instead? Need to figure which player hit what

// Idea for ground: https://phaser.io/examples/v2/box2d/car-on-terrain
// On collision with ground, check distance to all bonus labels? if close enough
// to one, apply score multiplier?

var GREEN =  0x00ff00;
var RED =    0xff0000;
var WHITE =  0xffffff;
var YELLOW = 0xffff00;


var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 50;
    },

    preload: function () {
        this.load.image('background', 'graphics/temp_background.png');
        this.load.image('spaceShip', 'graphics/temp_spaceShip.png');
        this.load.image('ground', 'graphics/temp_ground.png');
    },

    create: function() {
      this.line = createLine(100, 100, 500, 200);
      game.physics.arcade.enable(this.line, Phaser.Physics.ARCADE);

      this.background = this.add.sprite(
          this.world.centerX, this.world.centerY, 'background');

      this.player1 = this.game.add.sprite(this.game.world.centerX - 150,
          this.game.world.centerY, 'spaceShip')
      setUpPlayer(this.player1);
      game.physics.arcade.enable(this.player1);
      this.player1.body.enable = true;
      this.player1.body.drag.set(10);
      this.player1.body.collideWorldBound = true;
      this.player1.body.maxVelocity.set(200);

      this.player1.onCollide = new Phaser.Signal();
      this.player1.onCollide.add(onCollision, this);


      this.player2 = this.game.add.sprite(this.game.world.centerX + 150,
          this.game.world.centerY, 'spaceShip')
      setUpPlayer(this.player2);
      game.physics.arcade.enable(this.player2);
      this.player2.body.enable = true;
      this.player2.body.drag.set(10);
      this.player2.body.collideWorldBound = true;
      this.player2.body.maxVelocity.set(200);

      this.player2.onCollide = new Phaser.Signal();
      this.player2.onCollide.add(onCollision, this);

    },

    update: function() {
      game.physics.arcade.collide(this.player1, this.line);
      game.physics.arcade.collide(this.player1, this.player2);

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
          moveUp(this.player1, thrust, -90)
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if(this.player1.angle > -90) {
                this.player1.angle -= rotateSpeed;
            }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            if(this.player1.angle < 90) {
                this.player1.angle += rotateSpeed;
            }
        }

         if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            moveUp(this.player2, thrust, -90)
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
          if(this.player2.angle > -90) {
              this.player2.angle -= rotateSpeed;
          }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
          if(this.player2.angle < 90) {
              this.player2.angle += rotateSpeed;
          }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
          console.log(this.player1.position.y)
        }
    }
}

function onCollision(object, collider) {
  console.loc(object);
  console.log(collider);
}

function moveUp(gameobject, thrust, offset) {
   var rotation = gameobject.angle;
   var direction = new Phaser.Point();
   direction.x = Math.cos(this.game.math.degToRad(rotation-offset));
   direction.y = Math.sin(this.game.math.degToRad(rotation-offset));

    if(direction.getMagnitude() > 0) {
        direction = direction.normalize()
    }

    gameobject.body.velocity.x += direction.x * -thrust;
    gameobject.body.velocity.y += direction.y * -thrust;
}

function setUpPlayer(player) {
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.15);
    player.boundsPadding = 0;
}

function createLine(x1, y1, x2, y2) {
  var line = game.add.graphics(0,0);
  line.lineStyle(2, WHITE).moveTo(x1, y1).lineTo(x2, y2);
  line.boundsPadding = 0;

  var shapeSprite = game.add.sprite(0,0);
  shapeSprite.addChild(line)

  return shapeSprite;
}

var game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState')
