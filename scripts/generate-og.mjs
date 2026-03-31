import sharp from "sharp";

// Generate random particles
function generateParticles(count) {
  let circles = "";
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 1200;
    const y = Math.random() * 630;
    const r = Math.random() * 2.5 + 0.5;
    const opacity = Math.random() * 0.3 + 0.1;
    circles += `<circle cx="${x}" cy="${y}" r="${r}" fill="#00D282" opacity="${opacity}" />`;
  }
  return circles;
}

const particles = generateParticles(45);

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505" />

  <!-- Particles -->
  ${particles}

  <!-- Name -->
  <text x="600" y="280" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="300" font-size="72" fill="#FAFAFA">Alex Cano</text>

  <!-- Subtitle -->
  <text x="600" y="340" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="400" font-size="24" letter-spacing="4" fill="#00D282">CTO · AI ORCHESTRATOR · BUILDER</text>

  <!-- Decorative line -->
  <line x1="440" y1="370" x2="760" y2="370" stroke="#00D282" stroke-opacity="0.2" stroke-width="1" />

  <!-- Tagline -->
  <text x="600" y="410" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="300" font-size="18" fill="rgba(255,255,255,0.5)">Construyo productos con IA. La IA ejecuta. Yo dirijo.</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile("public/og-image.png");

const stats = await sharp("public/og-image.png").metadata();
const fs = await import("fs");
const size = fs.statSync("public/og-image.png").size;

console.log(`OG image generated: ${stats.width}x${stats.height}, ${(size / 1024).toFixed(1)}KB`);
