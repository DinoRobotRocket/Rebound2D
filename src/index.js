export const DEFAULT_CONFIG = {
  gravity: 980,
  airDrag: 0.995,
  floorFriction: 0.98,
  onBounce: null,
};

export function updatePhysics(dt, bodies, canvas, config = {}) {
  // Merge user overrides with defaults so partial configs work cleanly
  const { gravity, airDrag, floorFriction, onBounce } = { ...DEFAULT_CONFIG, ...config };

  // Calculate damping
  const damping = Math.pow(airDrag, dt * 60);

  for (const body of bodies) {

    //Apply gravity
    body.vy += gravity * dt;

    //frame-rate independent air drag
    body.vx *= damping;
    body.vy *= damping;

    //Update position
    body.x += body.vx * dt;
    body.y += body.vy * dt;

    //Floor & ceiling collisions
    if (body.y + body.radius > canvas.height) {
      const impactSpeed = Math.abs(body.vy);
      body.y = canvas.height - body.radius;
      body.vy = -body.vy * body.restitution;
      body.vx *= floorFriction; // Slow down horizontal rolling

      if (onBounce) onBounce(body, impactSpeed);

    } else if (body.y - body.radius < 0) {
      body.y = body.radius;
      body.vy = -body.vy * body.restitution;

      onBounce(body, impactSpeed)
    }

    //Left & right wall collisions
    if (body.x + body.radius > canvas.width) {
      body.x = canvas.width - body.radius;
      body.vx = -body.vx * body.restitution;

      const impactSpeed = Math.abs(body.vx);
      if (onBounce) onBounce(body, impactSpeed);

    } else if (body.x - body.radius < 0) {
      body.x = body.radius;
      body.vx = -body.vx * body.restitution;

      onBounce(body, impactSpeed)
    }
  }
}