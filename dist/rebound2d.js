// src/index.js
var e = {
	gravity: 980,
	airDrag: .995,
	floorFriction: .98,
	onBounce: null
};
function t(t, n, r, i = {}) {
	let { gravity: a, airDrag: o, floorFriction: s, onBounce: c } = {
		...e,
		...i
	}, l = o ** (t * 60);
	for (let e of n) {
		if (e.vy += a * t, e.vx *= l, e.vy *= l, e.x += e.vx * t, e.y += e.vy * t, e.y + e.radius > r.height) {
			let t = Math.abs(e.vy);
			e.y = r.height - e.radius, e.vy = -e.vy * e.restitution, e.vx *= s, c && c(e, t);
		} else if (e.y - e.radius < 0) {
			let t = Math.abs(e.vy);
			e.y = e.radius, e.vy = -e.vy * e.restitution, c(e, t);
		}
		if (e.x + e.radius > r.width) {
			let t = Math.abs(e.vx);
			e.x = r.width - e.radius, e.vx = -e.vx * e.restitution, c && c(e, t);
		} else if (e.x - e.radius < 0) {
			let t = Math.abs(e.vx);
			e.x = e.radius, e.vx = -e.vx * e.restitution, c(e, t);
		}
	}
}
export { e as DEFAULT_CONFIG, t as updatePhysics };
