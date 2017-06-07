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
  createLabel(335, bottom-35, game, "10x")

  // Building 2
  createGround(387, bottom-100, 0.005, 0.3, game);
  createGround(430, bottom-194, 0.08, 0.009, game);
  createGround(475, bottom-100, 0.005, 0.3, game);
  createLabel(425, bottom-220, game, "2x")

  //Building 3
  createGround(515, bottom-160, 0.005, 0.5, game);
  createGround(543, bottom-319, 0.05, 0.009, game);
  createGround(573, bottom-160, 0.005, 0.5, game);
  createLabel(535, bottom-350, game, "3x")

  // Building 4
  createGround(738, bottom-100, 0.005, 0.3, game);
  createGround(850, bottom-194, 0.2, 0.009, game);
  createGround(965, bottom-100, 0.005, 0.3, game);

  // Building 5
  createGround(1185, bottom-100, 0.005, 0.3, game);
  createGround(1285, bottom-194, 0.17, 0.009, game);
  createGround(1387, bottom-200, 0.005, 0.625, game);
  createGround(1443, bottom-400, 0.1, 0.009, game);
  createGround(1500, bottom-200, 0.005, 0.625, game);
  createLabel(1275, bottom-230, game, "2x")
  createLabel(1440, bottom-440, game, "4x")

  //Building 6
  createGround(1670, bottom-160, 0.005, 0.5, game);
  createGround(1680, bottom-319, 0.02, 0.009, game);
  createGround(1690, bottom-160, 0.005, 0.5, game);
  createLabel(1672, bottom-350, game, "8x")

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
