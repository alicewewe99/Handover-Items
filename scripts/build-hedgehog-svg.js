import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function generateSVG() {
  // Generate spiky quills programmatically for natural fluffy hedgehog look
  const quillPaths = [];
  const cx = 512;
  const cy = 470;
  
  // Outer layer quills (darker brown with warm highlights)
  for (let angle = 185; angle <= 355; angle += 4.5) {
    const rad = (angle * Math.PI) / 180;
    const len = 280 + Math.sin(angle * 7) * 25 + Math.cos(angle * 3) * 15;
    const baseX1 = cx + Math.cos(rad - 0.05) * 170;
    const baseY1 = cy + Math.sin(rad - 0.05) * 170;
    const baseX2 = cx + Math.cos(rad + 0.05) * 170;
    const baseY2 = cy + Math.sin(rad + 0.05) * 170;
    const tipX = cx + Math.cos(rad) * len;
    const tipY = cy + Math.sin(rad) * len;
    
    quillPaths.push(`<path d="M ${baseX1.toFixed(1)} ${baseY1.toFixed(1)} Q ${(cx + Math.cos(rad)*220).toFixed(1)} ${(cy + Math.sin(rad)*220).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(cx + Math.cos(rad)*220).toFixed(1)} ${(cy + Math.sin(rad)*220).toFixed(1)} ${baseX2.toFixed(1)} ${baseY2.toFixed(1)} Z" fill="url(#quillGradDark)" />`);
  }

  // Mid layer quills (medium brown with golden cream tips)
  for (let angle = 190; angle <= 350; angle += 5.5) {
    const rad = (angle * Math.PI) / 180;
    const len = 250 + Math.cos(angle * 5) * 20;
    const baseX1 = cx + Math.cos(rad - 0.06) * 140;
    const baseY1 = cy + Math.sin(rad - 0.06) * 140;
    const baseX2 = cx + Math.cos(rad + 0.06) * 140;
    const baseY2 = cy + Math.sin(rad + 0.06) * 140;
    const tipX = cx + Math.cos(rad) * len;
    const tipY = cy + Math.sin(rad) * len;
    
    quillPaths.push(`<path d="M ${baseX1.toFixed(1)} ${baseY1.toFixed(1)} Q ${(cx + Math.cos(rad)*190).toFixed(1)} ${(cy + Math.sin(rad)*190).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(cx + Math.cos(rad)*190).toFixed(1)} ${(cy + Math.sin(rad)*190).toFixed(1)} ${baseX2.toFixed(1)} ${baseY2.toFixed(1)} Z" fill="url(#quillGradMid)" />`);
  }

  // Forehead quills (fluffy layered tips)
  for (let angle = 210; angle <= 330; angle += 7) {
    const rad = (angle * Math.PI) / 180;
    const len = 215 + Math.sin(angle * 9) * 15;
    const baseX1 = cx + Math.cos(rad - 0.07) * 100;
    const baseY1 = cy + Math.sin(rad - 0.07) * 100;
    const baseX2 = cx + Math.cos(rad + 0.07) * 100;
    const baseY2 = cy + Math.sin(rad + 0.07) * 100;
    const tipX = cx + Math.cos(rad) * len;
    const tipY = cy + Math.sin(rad) * len;
    
    quillPaths.push(`<path d="M ${baseX1.toFixed(1)} ${baseY1.toFixed(1)} Q ${(cx + Math.cos(rad)*160).toFixed(1)} ${(cy + Math.sin(rad)*160).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(cx + Math.cos(rad)*160).toFixed(1)} ${(cy + Math.sin(rad)*160).toFixed(1)} ${baseX2.toFixed(1)} ${baseY2.toFixed(1)} Z" fill="url(#quillGradLight)" />`);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF7EE" />
      <stop offset="50%" stop-color="#F6EFE2" />
      <stop offset="100%" stop-color="#EFE5D3" />
    </linearGradient>

    <!-- Warm Radial Glow Behind Mascot -->
    <radialGradient id="glowGrad" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#FFF8EC" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#F6EFE2" stop-opacity="0" />
    </radialGradient>

    <!-- Table Wood Gradient -->
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EEDABE" />
      <stop offset="70%" stop-color="#E2C7A3" />
      <stop offset="100%" stop-color="#D4B48A" />
    </linearGradient>

    <!-- Table Front Edge -->
    <linearGradient id="woodEdge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C29D73" />
      <stop offset="100%" stop-color="#B0895E" />
    </linearGradient>

    <!-- Quill Gradients -->
    <linearGradient id="quillGradDark" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#422D20" />
      <stop offset="65%" stop-color="#765741" />
      <stop offset="100%" stop-color="#D9CCA3" />
    </linearGradient>
    <linearGradient id="quillGradMid" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#543A2A" />
      <stop offset="60%" stop-color="#916E53" />
      <stop offset="100%" stop-color="#EBE1D0" />
    </linearGradient>
    <linearGradient id="quillGradLight" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#6E4D37" />
      <stop offset="50%" stop-color="#B38E70" />
      <stop offset="100%" stop-color="#F5EFE6" />
    </linearGradient>

    <!-- Hedgehog Face Gradient -->
    <radialGradient id="faceGrad" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#FFF8ED" />
      <stop offset="100%" stop-color="#F7EADB" />
    </radialGradient>

    <!-- Hedgehog Body/Belly Gradient -->
    <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF9F0" />
      <stop offset="100%" stop-color="#EEDBC4" />
    </linearGradient>

    <!-- Board Frame Wood Gradient -->
    <linearGradient id="boardFrameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D6AA7C" />
      <stop offset="50%" stop-color="#C29462" />
      <stop offset="100%" stop-color="#AC7D4E" />
    </linearGradient>

    <!-- Board Face Gradient -->
    <linearGradient id="boardFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FAF5EC" />
    </linearGradient>

    <!-- Soft Drop Shadow Filter -->
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#573D29" flood-opacity="0.18" />
    </filter>

    <!-- Small Shadow Filter -->
    <filter id="tinyShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#573D29" flood-opacity="0.15" />
    </filter>

    <!-- App Icon Bevel / Squircle Frame Filter -->
    <filter id="iconBorderShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#452C1E" flood-opacity="0.22" />
    </filter>

    <!-- Clip Path for Rounded Squircle Icon -->
    <clipPath id="squircleClip">
      <rect x="24" y="24" width="976" height="976" rx="220" ry="220" />
    </clipPath>
  </defs>

  <!-- Outer Frame / Container Clip -->
  <g clip-path="url(#squircleClip)">
    <!-- Canvas Warm Background -->
    <rect width="1024" height="1024" fill="url(#bgGrad)" />
    <circle cx="512" cy="460" r="420" fill="url(#glowGrad)" />

    <!-- Quills Base Mass Silhouette -->
    <ellipse cx="512" cy="470" rx="310" ry="330" fill="#3D291C" filter="url(#softShadow)" />
    <ellipse cx="512" cy="460" rx="290" ry="310" fill="#543C2D" />

    <!-- Quills Detailed Ray Paths -->
    <g id="hedgehog-quills">
      ${quillPaths.join('\n      ')}
    </g>

    <!-- Body & Chubby Shoulders -->
    <ellipse cx="512" cy="620" rx="275" ry="190" fill="url(#bellyGrad)" />

    <!-- Head & Chubby Cheeks -->
    <g id="hedgehog-head">
      <!-- Rounded Head Base -->
      <ellipse cx="512" cy="445" rx="215" ry="180" fill="url(#faceGrad)" filter="url(#tinyShadow)" />

      <!-- Left Ear -->
      <g transform="translate(325, 305) rotate(-18)">
        <ellipse cx="0" cy="0" rx="30" ry="38" fill="#F4E8D7" stroke="#4A3425" stroke-width="4" />
        <ellipse cx="0" cy="3" rx="18" ry="24" fill="#F7B2B2" opacity="0.65" />
      </g>

      <!-- Right Ear -->
      <g transform="translate(699, 305) rotate(18)">
        <ellipse cx="0" cy="0" rx="30" ry="38" fill="#F4E8D7" stroke="#4A3425" stroke-width="4" />
        <ellipse cx="0" cy="3" rx="18" ry="24" fill="#F7B2B2" opacity="0.65" />
      </g>

      <!-- Rosy Cheeks -->
      <ellipse cx="395" cy="452" rx="36" ry="24" fill="#FF8D8D" opacity="0.4" />
      <ellipse cx="629" cy="452" rx="36" ry="24" fill="#FF8D8D" opacity="0.4" />

      <!-- Sparkling Big Eyes -->
      <!-- Left Eye -->
      <g id="left-eye">
        <ellipse cx="430" cy="405" rx="27" ry="29" fill="#1C140F" />
        <!-- Big Specular Highlight -->
        <circle cx="438" cy="397" r="9.5" fill="#FFFFFF" />
        <!-- Small Lower Highlight -->
        <circle cx="423" cy="415" r="4.5" fill="#FFFFFF" opacity="0.85" />
      </g>

      <!-- Right Eye -->
      <g id="right-eye">
        <ellipse cx="594" cy="405" rx="27" ry="29" fill="#1C140F" />
        <!-- Big Specular Highlight -->
        <circle cx="602" cy="397" r="9.5" fill="#FFFFFF" />
        <!-- Small Lower Highlight -->
        <circle cx="587" cy="415" r="4.5" fill="#FFFFFF" opacity="0.85" />
      </g>

      <!-- Snout & Nose & Sweet Smile -->
      <g id="snout">
        <!-- Cute Muzzle Area -->
        <ellipse cx="512" cy="446" rx="55" ry="40" fill="#FFF2E0" opacity="0.85" />

        <!-- Button Nose -->
        <ellipse cx="512" cy="434" rx="26" ry="19" fill="#241711" />
        <!-- Nose Highlight -->
        <ellipse cx="508" cy="428" rx="8" ry="4.5" fill="#8C7060" />

        <!-- Smile Mouth -->
        <path d="M 478 454 Q 495 469 512 458 Q 529 469 546 454" fill="none" stroke="#241711" stroke-width="5" stroke-linecap="round" />
      </g>
    </g>

    <!-- Wooden Desk Surface in Foreground -->
    <g id="desk">
      <!-- Shadow cast by hedgehog and objects on table -->
      <ellipse cx="512" cy="740" rx="420" ry="45" fill="#6E4828" opacity="0.12" />

      <!-- Table Top Surface -->
      <rect x="0" y="730" width="1024" height="150" fill="url(#woodGrad)" />
      <!-- Table Top Edge Highlight -->
      <line x1="0" y1="730" x2="1024" y2="730" stroke="#FFF5E5" stroke-width="3" opacity="0.7" />

      <!-- Table Front Apron Edge -->
      <rect x="0" y="875" width="1024" height="150" fill="url(#woodEdge)" />
      <line x1="0" y1="875" x2="1024" y2="875" stroke="#9E764C" stroke-width="4" />
    </g>

    <!-- Accessories on Desk -->

    <!-- 1. Left Side: Coffee Mug & Coaster -->
    <g id="coffee-mug" transform="translate(205, 765)">
      <!-- Coaster Shadow & Wood -->
      <ellipse cx="0" cy="55" rx="56" ry="15" fill="#8A5F3B" opacity="0.25" />
      <ellipse cx="0" cy="50" rx="52" ry="14" fill="#BF9267" stroke="#A87950" stroke-width="3" />

      <!-- Mug Body -->
      <path d="M -34 -25 C -36 10 -34 35 -24 45 C -15 50 15 50 24 45 C 34 35 36 10 34 -25 Z" fill="#FFFFFF" stroke="#E5DDD0" stroke-width="2" filter="url(#tinyShadow)" />

      <!-- Mug Handle -->
      <path d="M 32 -10 C 52 -10 52 28 30 32" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" />
      <path d="M 32 -10 C 52 -10 52 28 30 32" fill="none" stroke="#DCD3C4" stroke-width="2" stroke-linecap="round" />

      <!-- Coffee Interior Rim -->
      <ellipse cx="0" cy="-25" rx="34" ry="11" fill="#F4EFEA" stroke="#E5DDD0" stroke-width="2" />
      <ellipse cx="0" cy="-24" rx="30" ry="9" fill="#3D2417" />
      <ellipse cx="-7" cy="-26" rx="14" ry="3.5" fill="#694632" opacity="0.6" />

      <!-- Text on Mug -->
      <text x="0" y="3" text-anchor="middle" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="800" fill="#4A3A31" letter-spacing="0.5">Good</text>
      <text x="0" y="16" text-anchor="middle" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="800" fill="#4A3A31" letter-spacing="0.5">Food</text>
      <text x="0" y="29" text-anchor="middle" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="9" font-weight="800" fill="#4A3A31" letter-spacing="0.5">Good Day</text>
    </g>

    <!-- 2. Right Side: Spiral Notebook -->
    <g id="notebook" transform="translate(805, 785) rotate(-7)">
      <!-- Notebook Shadow -->
      <rect x="-85" y="-50" width="160" height="105" rx="12" ry="12" fill="#755030" opacity="0.2" transform="translate(4, 6)" />

      <!-- Notebook Cover -->
      <rect x="-85" y="-50" width="160" height="105" rx="12" ry="12" fill="#FFFFFD" stroke="#E8E0D2" stroke-width="3" />

      <!-- Spiral Binding (Loops on Left) -->
      ${Array.from({ length: 8 }).map((_, i) => {
        const y = -40 + i * 11.5;
        return `<path d="M -90 ${y} C -80 ${y-4} -80 ${y+4} -90 ${y+2}" fill="none" stroke="#63544B" stroke-width="3.5" stroke-linecap="round" />`;
      }).join('\n      ')}

      <!-- Text on Notebook -->
      <text x="-5" y="-12" text-anchor="middle" font-family="'Comic Sans MS', 'Chalkboard SE', 'Segoe UI', cursive, sans-serif" font-size="13" font-weight="700" fill="#4A3C34">Have a</text>
      <text x="-5" y="8" text-anchor="middle" font-family="'Comic Sans MS', 'Chalkboard SE', 'Segoe UI', cursive, sans-serif" font-size="14.5" font-weight="800" fill="#4A3C34">Nice Day</text>
      <!-- Heart -->
      <path d="M -5 20 C -5 20 -11 14 -11 9 C -11 5.5 -8.5 3 -5 6 C -1.5 3 1 5.5 1 9 C 1 14 -5 20 -5 20 Z" fill="#7D443B" />
    </g>

    <!-- 3. Center: Whiteboard Held by Hedgehog -->
    <g id="handover-board" filter="url(#softShadow)">
      <!-- Board Wooden Frame -->
      <rect x="320" y="555" width="384" height="236" rx="26" ry="26" fill="url(#boardFrameGrad)" stroke="#9E7348" stroke-width="4" />

      <!-- Board Inner White Surface -->
      <rect x="342" y="577" width="340" height="192" rx="16" ry="16" fill="url(#boardFaceGrad)" stroke="#DFD5C4" stroke-width="2" />

      <!-- Top Clip with Heart -->
      <g id="top-clip" transform="translate(512, 555)">
        <rect x="-30" y="-24" width="60" height="42" rx="9" ry="9" fill="#FFFBF2" stroke="#B88A58" stroke-width="3" filter="url(#tinyShadow)" />
        <!-- Heart on Clip -->
        <path d="M 0 -4 C 0 -4 -8 -13 -8 -18 C -8 -22.5 -4.5 -25.5 0 -22 C 4.5 -25.5 8 -22.5 8 -18 C 8 -13 0 -4 0 -4 Z" fill="#6B4132" />
      </g>

      <!-- Center Text: 交班 -->
      <!-- Rendered with styled typography -->
      <text x="502" y="705" text-anchor="middle" font-family="'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'DFKai-SB', sans-serif" font-size="96" font-weight="900" fill="#241812" letter-spacing="18">交班</text>

      <!-- Smiley Face Next to 班 (Bottom Right) -->
      <g id="smiley" transform="translate(632, 715)">
        <!-- Curved smiling mouth -->
        <path d="M -16 -4 Q 0 16 16 -4" fill="none" stroke="#241812" stroke-width="5.5" stroke-linecap="round" />
        <!-- Left eye -->
        <path d="M -18 -15 Q -14 -20 -10 -15" fill="none" stroke="#241812" stroke-width="4.5" stroke-linecap="round" />
        <!-- Right eye -->
        <path d="M 10 -15 Q 14 -20 18 -15" fill="none" stroke="#241812" stroke-width="4.5" stroke-linecap="round" />
      </g>
    </g>

    <!-- Hedgehog Fluffy Hands / Paws Grasping the Board -->
    <!-- Left Paw -->
    <g id="left-paw" transform="translate(325, 660) rotate(14)">
      <ellipse cx="0" cy="0" rx="34" ry="25" fill="#FFF8EE" stroke="#D8C7B0" stroke-width="3" filter="url(#tinyShadow)" />
      <!-- Subtle finger creases -->
      <path d="M -8 10 Q -4 18 0 24" fill="none" stroke="#C8B39B" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 8 10 Q 12 18 15 23" fill="none" stroke="#C8B39B" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Right Paw -->
    <g id="right-paw" transform="translate(699, 660) rotate(-14)">
      <ellipse cx="0" cy="0" rx="34" ry="25" fill="#FFF8EE" stroke="#D8C7B0" stroke-width="3" filter="url(#tinyShadow)" />
      <!-- Subtle finger creases -->
      <path d="M -8 10 Q -12 18 -15 23" fill="none" stroke="#C8B39B" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 8 10 Q 4 18 0 24" fill="none" stroke="#C8B39B" stroke-width="2.5" stroke-linecap="round" />
    </g>

  </g>

  <!-- Squircle Border Highlight & Inner Rim -->
  <rect x="24" y="24" width="976" height="976" rx="220" ry="220" fill="none" stroke="#FFFFFF" stroke-width="12" opacity="0.9" />
  <rect x="24" y="24" width="976" height="976" rx="220" ry="220" fill="none" stroke="#DFD5C2" stroke-width="4" opacity="0.6" />
</svg>`;

  return svg;
}

const svgContent = generateSVG();
fs.writeFileSync('public/hedgehog-handover.svg', svgContent);
console.log('Successfully wrote public/hedgehog-handover.svg');
