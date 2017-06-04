var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 30;
    },

    preload: function () {
        this.load.image('background', 'graphics/temp_background.png');
        this.load.image('spaceShip', 'graphics/temp_spaceShip.png');
    },

    create: function() {
        this.background = this.add.sprite(
            this.world.centerX, this.world.centerY, 'background');

        this.spaceShip = this.game.add.sprite(this.game.world.centerX,
            this.game.world.centerY, 'spaceShip')
        this.spaceShip.anchor.setTo(0.5, 0.5);
        this.spaceShip.scale.setTo(0.15);
        this.physics.p2.enable(this.spaceShip);
    },

    update: function() {
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                this.spaceShip.body.velocity.y -= 1.5;
                // TODO: Instead of just settings y position
                // Calculate direction vector and set x and y position
                // according to it
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                this.spaceShip.body.angle -= 0.5;
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
                 this.spaceShip.body.angle += 0.5;
        }
    }
}

var game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState')