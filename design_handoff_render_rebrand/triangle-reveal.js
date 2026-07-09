// <triangle-reveal> — small opaque triangles assemble into a placeholder "photo",
// picking up the destination image's own colors as they place (mosaic-style),
// finished with a soft diagonal gloss sweep. Vanilla web component, no deps.
//
// Usage:
//   <triangle-reveal tone="a" label="product visual"></triangle-reveal>
// Attributes:
//   tone   "a" | "b"   — palette flavor for the placeholder art + gloss tint
//   label  string      — small caption baked into the placeholder art
//   rows/cols  int      — mesh density (default 8 x 12)
// Methods: el.replay()

(function () {
  const VB_W = 400, VB_H = 260;

  const TONES = {
    a: {
      bg0: '#1c2321', bg1: '#2b3a37', bg2: '#4a6b63',
      glow: 'rgba(154, 214, 200, 0.35)',
      gloss: 'rgba(255,255,255,0.55)',
      label: '#cfe8df'
    },
    b: {
      bg0: '#2a2320', bg1: '#4a3a2f', bg2: '#7a8f7a',
      glow: 'rgba(233, 201, 158, 0.30)',
      gloss: 'rgba(255,244,230,0.55)',
      label: '#f2e3ce'
    }
  };

  function paintPlaceholder(ctx, tone, label) {
    const t = TONES[tone] || TONES.a;
    ctx.clearRect(0, 0, VB_W, VB_H);

    const grad = ctx.createLinearGradient(0, 0, VB_W, VB_H);
    grad.addColorStop(0, t.bg0);
    grad.addColorStop(0.55, t.bg1);
    grad.addColorStop(1, t.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, VB_W, VB_H);

    const rg = ctx.createRadialGradient(VB_W * 0.68, VB_H * 0.34, 10, VB_W * 0.68, VB_H * 0.34, VB_W * 0.6);
    rg.addColorStop(0, t.glow);
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, VB_W, VB_H);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= VB_W; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, VB_H); ctx.stroke();
    }
    for (let y = 0; y <= VB_H; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(VB_W, y); ctx.stroke();
    }

    if (label) {
      ctx.font = '10px "SF Mono", "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';
      ctx.fillText('· ' + label + ' ·', VB_W / 2, VB_H - 14);
    }
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';

  class TriangleReveal extends HTMLElement {
    static get observedAttributes() { return ['tone', 'label']; }

    connectedCallback() {
      if (this._built) return;
      this._built = true;
      const root = this.attachShadow({ mode: 'open' });
      const tone = this.getAttribute('tone') || 'a';
      const label = this.getAttribute('label') || 'product visual';
      const rows = parseInt(this.getAttribute('rows') || '8', 10);
      const cols = parseInt(this.getAttribute('cols') || '12', 10);

      root.innerHTML = `
        <style>
          :host { display: block; width: 100%; height: 100%; }
          .stage {
            position: relative; width: 100%; height: 100%;
            border-radius: 18px; overflow: hidden; cursor: pointer;
            background: #1c2321;
          }
          svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
          .gloss {
            position: absolute; top: -20%; left: -60%;
            width: 60%; height: 140%;
            background: linear-gradient(100deg, transparent, var(--gloss-color, rgba(255,255,255,.55)), transparent);
            mix-blend-mode: overlay;
            transform: translateX(0) rotate(8deg);
            opacity: 0;
            pointer-events: none;
          }
          .hint {
            position: absolute; right: 12px; bottom: 12px;
            font: 500 10px/1 ui-monospace, "SF Mono", monospace;
            letter-spacing: .06em; text-transform: uppercase;
            color: rgba(255,255,255,0.55);
            background: rgba(0,0,0,0.25);
            padding: 5px 8px; border-radius: 100px;
            opacity: 0; transition: opacity .3s ease;
          }
          .stage:hover .hint { opacity: 1; }
        </style>
        <div class="stage" part="stage">
          <svg viewBox="0 0 ${VB_W} ${VB_H}" preserveAspectRatio="none"></svg>
          <div class="gloss"></div>
          <div class="hint">click to replay</div>
        </div>
      `;

      this._svg = root.querySelector('svg');
      this._gloss = root.querySelector('.gloss');
      this._stage = root.querySelector('.stage');
      this._tone = tone;
      this._label = label;
      this._rows = rows;
      this._cols = cols;

      this._buildMesh();
      this._stage.addEventListener('click', () => this.replay());

      this._io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { this.replay(); this._io.disconnect(); } });
      }, { threshold: 0.35 });
      this._io.observe(this);
    }

    disconnectedCallback() {
      if (this._io) this._io.disconnect();
    }

    _buildMesh() {
      const canvas = document.createElement('canvas');
      canvas.width = VB_W; canvas.height = VB_H;
      const ctx = canvas.getContext('2d');
      paintPlaceholder(ctx, this._tone, this._label);
      const data = ctx.getImageData(0, 0, VB_W, VB_H).data;

      const sample = (x, y) => {
        x = Math.max(0, Math.min(VB_W - 1, Math.round(x)));
        y = Math.max(0, Math.min(VB_H - 1, Math.round(y)));
        const i = (y * VB_W + x) * 4;
        return `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`;
      };

      const cw = VB_W / this._cols, ch = VB_H / this._rows;
      const tris = [];
      for (let r = 0; r < this._rows; r++) {
        for (let c = 0; c < this._cols; c++) {
          const x0 = c * cw, y0 = r * ch, x1 = x0 + cw, y1 = y0 + ch;
          const TL = [x0, y0], TR = [x1, y0], BL = [x0, y1], BR = [x1, y1];
          tris.push([TL, TR, BL]);
          tris.push([TR, BR, BL]);
        }
      }

      while (this._svg.firstChild) this._svg.removeChild(this._svg.firstChild);
      this._triangles = tris.map(([p0, p1, p2]) => {
        const cx = (p0[0] + p1[0] + p2[0]) / 3;
        const cy = (p0[1] + p1[1] + p2[1]) / 3;
        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', `${p0.join(',')} ${p1.join(',')} ${p2.join(',')}`);
        poly.setAttribute('fill', sample(cx, cy));
        poly.style.transformBox = 'fill-box';
        poly.style.transformOrigin = 'center';
        this._svg.appendChild(poly);
        return { el: poly, nx: cx / VB_W, ny: cy / VB_H };
      });
    }

    replay() {
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t = TONES[this._tone] || TONES.a;
      this._stage.style.setProperty('--gloss-color', t.gloss);

      if (!this._triangles) return;
      const maxD = 2;
      let maxDelay = 0;

      this._triangles.forEach(({ el, nx, ny }) => {
        el.getAnimations().forEach(a => a.cancel());
        if (reduced) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          return;
        }
        const d = (nx + ny) / maxD;
        const delay = d * 900 + Math.random() * 90;
        maxDelay = Math.max(maxDelay, delay);
        el.style.opacity = '0';
        el.animate(
          [
            { opacity: 0, transform: 'translateY(5px) scale(0.82)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' }
          ],
          { duration: 480, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }
        );
      });

      this._gloss.getAnimations().forEach(a => a.cancel());
      if (reduced) { this._gloss.style.opacity = '0'; return; }
      this._gloss.style.opacity = '0';
      this._gloss.animate(
        [
          { transform: 'translateX(-40%) rotate(8deg)', opacity: 0 },
          { transform: 'translateX(10%) rotate(8deg)', opacity: 0.9, offset: 0.5 },
          { transform: 'translateX(70%) rotate(8deg)', opacity: 0 }
        ],
        { duration: 900, delay: maxDelay + 120, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
      );
    }
  }

  if (!customElements.get('triangle-reveal')) {
    customElements.define('triangle-reveal', TriangleReveal);
  }
})();
