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
    player.scale.setTo(0.05);
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