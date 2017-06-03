var game = null;

function setUp() {
    // TODO: Properly set fullscreen mode
    game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO, '',
            { preload: preload, create: create });

    preload();
    create();
    scale();
}

function preload () {
    game.load.image('background', 'graphics/temp_background.png');
}

function create () {
    var background = game.add.sprite(
        game.world.centerX, game.world.centerY, 'background');
    logo.anchor.setTo(0.5, 0.5);
}

function scale() {
    // TODO: Scale window on resize

    /*
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setShowAll();

    window.addEventListener('resize', function () {  
        this.game.scale.refresh();
    });

    this.game.scale.refresh();
    */

    phaser.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    phaser.scale.setResizeCallback(function() {
        phaser.scale.setMaximum();
    });
}