# Skill: Flow Field Canvas
## Purpose: Generative art background for hero section

### Algorithm
1. Create simplex-like 2D noise function (no external deps)
2. Initialize particles array (300 desktop, 150 mobile)
3. Each frame:
   - Apply noise at particle position → get angle
   - Calculate velocity from angle
   - Add mouse influence (gentle attraction within 250px radius)
   - Update position
   - Draw particle (1.2px radius, accent color with alpha based on life)
   - Draw trail (short line segment in velocity direction)
   - Decrement life, respawn if dead or out of bounds
4. Fade effect: fillRect with rgba(5,5,5,0.06) each frame (NOT clearRect)
5. Optional: subtle grid overlay every 3 frames

### React Integration
```tsx
// Use useRef for canvas, particles, mouse, animation frame
// useEffect for setup + animation loop
// useCallback for mouse/touch handlers
// Clean up: cancelAnimationFrame on unmount + remove resize listener
```

### Performance Rules
- Cap particles: `Math.min(Math.floor((w * h) / 3000), 400)`
- Mobile detection: `window.innerWidth < 768 → max 150`
- Use requestAnimationFrame (not setInterval)
- Alpha fade (not clearRect) for trail effect
- No offscreen canvas needed at this scale

### Parameters
```
PARTICLE_COUNT_MAX: 400
PARTICLE_COUNT_MOBILE: 150
NOISE_SCALE: 200
NOISE_SPEED: 0.003
PARTICLE_RADIUS: 1.2
TRAIL_LENGTH: 4 (velocity multiplier)
FADE_ALPHA: 0.06
MOUSE_RADIUS: 250
MOUSE_STRENGTH: 0.003
GRID_SPACING: 80
GRID_ALPHA: 0.015
COLOR: rgba(0, 210, 130, variable_alpha)
```
