var game = null;

game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO);

var GameState = {

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
        this.spaceShip.scale.setTo(0.25);
    },

    update: function() {
        this.spaceShip.angle += 0.5;
    }
}

game.state.add('GameState', GameState);
game.state.start('GameState')