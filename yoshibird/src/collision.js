export function circleIntersectsRect(circle, rect) {
  const nearestX = clamp(circle.x, rect.x, rect.x + rect.width);
  const nearestY = clamp(circle.y, rect.y, rect.y + rect.height);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

export function playerCollisionCircle(player, config) {
  const radius = Math.max(8, Math.min(config.player.radiusX, config.player.radiusY) - config.player.collisionPadding);
  return { x: player.x, y: player.y, radius };
}

export function hitsWorldBounds(player, config) {
  const radius = Math.min(config.player.radiusX, config.player.radiusY) - config.player.collisionPadding;
  return player.y - radius <= config.world.ceiling || player.y + radius >= config.world.height - config.world.groundHeight;
}

export function collidesWithObstacle(player, obstacle, config) {
  const circle = playerCollisionCircle(player, config);
  const topRect = {
    x: obstacle.x,
    y: 0,
    width: obstacle.width,
    height: obstacle.center - obstacle.gap / 2
  };
  const bottomY = obstacle.center + obstacle.gap / 2;
  const bottomRect = {
    x: obstacle.x,
    y: bottomY,
    width: obstacle.width,
    height: config.world.height - config.world.groundHeight - bottomY
  };
  return circleIntersectsRect(circle, topRect) || circleIntersectsRect(circle, bottomRect);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
