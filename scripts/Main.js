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

var fontstyle_stats = { font: "64px Arial", fill: RED, backgroundColor: YELLOW }

var labels = []

var player1;
var player2;
var shapeSprite;

var p1LastVelocity;
var p2LastVelocity;
var gameOver;
var p1Destroyed = false;
var p2Destroyed = false;
var player1Text;
var player2Text;
var multiplier = 1;

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
        this.ground.scale.setTo(2, 0.005)
        this.ground.anchor.set(0.25, 0)
        this.ground.name = "Ground";
        game.physics.arcade.enable(this.ground)
        this.ground.body.enabled = true
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        player1 = this.game.add.sprite(this.game.world.centerX - 150,
          this.game.world.centerY - 200, 'spaceShip')
        setUpPlayer(player1);
        player1.name = "Player 1"
        game.physics.arcade.enable(player1);
        player1.body.collideWorldBound = true;
        player1.body.maxVelocity.set(maxSpeed);


        player2 = this.game.add.sprite(this.game.world.centerX + 150,
            this.game.world.centerY - 200, 'spaceShip')
        setUpPlayer(player2);
        player2.name = "Player 2"
        game.physics.arcade.enable(player2);
        player2.body.collideWorldBound = true;
        player2.body.maxVelocity.set(maxSpeed);

        var style_stats = { font: "15px Arial", fill: "#ffffff" , align: "center" };
        var style_announce = { font: "60px Arial", fill: "#ffffff", align: "center" };

        this.name1 = game.add.text(20, 10, player1.name, style_stats);
        this.xVel1 = game.add.text(20, 30, "Player1 x velocity", style_stats);
        this.yVel1 = game.add.text(20, 50, "Player1 y velocity", style_stats);
        this.rot1 = game.add.text(20, 70, "Player1 rotation", style_stats);

        this.name2 = game.add.text(1800, 10, player2.name, style_stats);
        this.xVel2 = game.add.text(1800, 30, "Player1 x velocity", style_stats);
        this.yVel2 = game.add.text(1800, 50, "Player1 y velocity", style_stats);
        this.rot2 = game.add.text(1800, 70, "Player1 rotation", style_stats);

        this.gameOverText = game.add.text(this.game.world.centerX, this.game.world.centerY, "", style_announce);
        this.gameOverText.anchor.set(0.5);

        player1Text = game.add.text(0, 0, player1.name, style_stats)
        player2Text = game.add.text(0, 0, player2.name, style_stats)

        this.timerText = game.add.text(game.world.centerX, 
                                        game.world.centerY - 525,
                                        "", style_stats);

        labels.push(game.add.text(game.world.centerX + 200,
                                    this.game.world.centerY + 320,
                                    "4x", style_stats));

        labels.push(game.add.text(game.world.centerX - 700,
                                    this.game.world.centerY + 320,
                                    "2x", style_stats));
        
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

        game.physics.arcade.collide(player1, player2, onCollision, null, this);
        game.physics.arcade.collide(player1, this.ground, onCollision, null, this);
        game.physics.arcade.collide(player2, this.ground, onCollision, null, this);

        if(!p1Destroyed) {
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
        }

        if(!p2Destroyed) {
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
        }
    }
}

function onCollision(object, collider) {
    if(collider.name == "Ground") {
        if(!gameOver) {
            if(object.name === player1.name) {
                if(p1LastVelocity > maxLandingVelocity){
                    destroySprite(object);
                    return;
                }
            } 
            if(object.name === player2.name) {
                if(p2LastVelocity > maxLandingVelocity){
                    destroySprite(object);
                    return;
                }
            }
            if(object.angle < -15 || object.angle > 15) {
                destroySprite(object);
                return;
            }
            gameOver = true;       
            winner = decideWinner(); 
            if(multiplier )
            var time = game.time.totalElapsedSeconds().toFixed(1)
            this.gameOverText.text = (
                "Game Over!\nWinner: " + winner + "!\nTime: " + time +
                "!\nMultiplier: " + multiplier + "!\nTotal: " + time / multiplier
            )
        }   
    }
}

function decideWinner() {
    var closestLabel = getClosestLabel(player1);
    if(closestLabel != -1) 
        multiplier = closestLabel.text.substring(0, closestLabel.text.length - 1);

    console.log(multiplier);
    return player1.name;
}

function getClosestLabel(object) {
    var closestdist = 999999;
    var closest = -1;
    for(var i = 0; i < labels.length; i++) {
        distance = distanceBetween(object, labels[i]);
        if(distance < closestdist) { 
            closestdist = distance;
            closest = i;
        }
    }
    if(closestdist > maxLabelDistance) return -1
    if(closest === -1) return -1;
    console.log("ClosestDist: " + closestdist)
    return labels[closest];

}

function distanceBetween(object1, object2) {
    const x1 = object1.x;
    const y1 = object1.y;
    const x2 = object2.x;
    const y2 = object2.y;

    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function destroySprite(sprite) {
    if(sprite.name == player1.name){
        p1Destroyed = true;
        player1Text.text = "";
    }
    if(sprite.name == player2.name) { 
        p2Destroyed = true;
        player2Text.text = "";
    }
    sprite.destroy();
}

var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState')
