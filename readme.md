# Rebound2D

A lightweight, zero-dependency, frame-rate independent 2D physics engine for HTML5 Canvas.

## Features
- **Frame-rate independent:** Scales gravity and air drag accurately using delta time (`dt`).
- **Canvas boundary collisions:** Built-in bouncing against top, bottom, left, and right canvas edges.
- **Damping & friction:** Includes exponential air drag and horizontal floor friction.
- **Zero dependencies:** Tiny footprint ready for any vanilla JS or framework canvas loop.

## Installation

```bash
npm install rebound2d
```

## Quick Start

```javascript
import { updatePhysics } from 'rebound2d';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const bodies = [
  {
    x: 100,
    y: 50,
    vx: 150,
    vy: 0,
    radius: 20,
    restitution: 0.8 // 0 = no bounce, 1 = full bounce
  }
];

let lastTime = 0;

function loop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.1); // Cap dt to avoid tab-switch jumps
  lastTime = timestamp;

  updatePhysics(dt, bodies, canvas, { gravity: 980 });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const b of bodies) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

## API

### `updatePhysics(dt, bodies, canvas, config)`
### `const bounceSound = new Audio('./audio/bounce.mp3')`

Updates the positions and velocities of all circular bodies in place.

#### Parameters
- **`dt`** (`number`): Delta time in seconds since the last frame.
- **`bodies`** (`Array<Object>`): Array of circular physics objects. Each object requires:
  - `x` (`number`): Horizontal position in pixels.
  - `y` (`number`): Vertical position in pixels.
  - `vx` (`number`): Horizontal velocity in px/s.
  - `vy` (`number`): Vertical velocity in px/s.
  - `radius` (`number`): Circle radius in pixels.
  - `restitution` (`number`): Bounciness factor (`0` to `1`).
- **`canvas`** (`HTMLCanvasElement | { width: number, height: number }`): Canvas element (or object with `width` and `height`) used for boundary collisions.
- **`config`** (`Object`, optional): Override default physics constants.

#### Config Options (`DEFAULT_CONFIG`)

| Option          | Type     | Default | Description                                             |
| :---            | :---     | :---    | :---                                                    |
| `gravity`       | `number` | `980`   | Downward acceleration in px/s².                         |
| `airDrag`       | `number` | `0.995` | Per-frame velocity multiplier normalized to 60 FPS.     |
| `floorFriction` | `number` | `0.98`  | Horizontal velocity multiplier applied on floor impact. |

You can also import `DEFAULT_CONFIG` directly if needed:

```javascript
import { updatePhysics, DEFAULT_CONFIG } from 'rebound2d';
```

Example Audio
```javascript
Rebound2D.updatePhysics(dt, bodies, canvas, {
  onBounce(body, impactSpeed) {
    if (!canPlayAudio || impactSpeed < 40) return;

    const sfx = bounceSound.cloneNode();
    sfx.volume = Math.min(impactSpeed / 800, 1);
    sfx.play().catch(() => {});
  }
});
```

## License

MIT