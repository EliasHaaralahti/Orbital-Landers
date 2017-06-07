var groundAmount = 0;

var style_labels = { font: "15px Arial", fill: "#ffffff" , align: "center" };

function createLevel(game) {
  var right = game.world.width - 200;
  var bottom = game.world.height - 150;

  createGround(game.world.centerX, bottom, 2, 0.01, game);

  //Building 1  
  createGround(250, bottom-160, 0.005, 0.5, game);
  createGround(280, bottom-319, 0.05, 0.009, game);
  createGround(310, bottom-160, 0.005, 0.5, game);
  createLabel(275, bottom-350, game, "4x")

  // Building 2
  createGround(387, bottom-100, 0.005, 0.3, game);
  createGround(430, bottom-194, 0.08, 0.009, game);
  createGround(475, bottom-100, 0.005, 0.3, game);

  // Building 3
  createGround(738, bottom-100, 0.005, 0.3, game);
  createGround(850, bottom-194, 0.2, 0.009, game);
  createGround(965, bottom-100, 0.005, 0.3, game);
}

function createGround(x, y, scale, game) {
  createGround(x, y, scale, scale, game);
}

function createGround(x, y, scaleX, scaleY, game) {
    var ground = game.add.sprite( x, y, 'ground');
    ground.scale.setTo(scaleX, scaleY)
    ground.anchor.set(0.5)
    ground.name = "Ground" + groundAmount;
    groundAmount++;
    game.physics.arcade.enable(ground)
    ground.body.enabled = true
    ground.body.allowGravity = false;
    ground.body.immovable = true;
    
    groundObjects.push(ground);
}

function createLabel(x, y, game, multiplier) {
  labels.push(game.add.text(x, y, multiplier, style_labels));
}
