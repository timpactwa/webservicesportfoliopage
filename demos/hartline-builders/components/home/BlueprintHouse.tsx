'use client'
import { motion } from 'framer-motion'

const draw = (delay: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.1, ease: 'easeInOut' },
      opacity: { delay, duration: 0.15 },
    },
  },
})

/**
 * Animated front-elevation drawing of a house, blueprint style.
 * Strokes draw themselves in sequence on load.
 */
export default function BlueprintHouse() {
  const line = 'stroke-paper/90'
  const thin = 'stroke-paper/50'

  return (
    <motion.svg
      viewBox="0 0 520 400"
      fill="none"
      initial="hidden"
      animate="show"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Architectural line drawing of a house elevation"
    >
      {/* ground line */}
      <motion.line x1="20" y1="330" x2="500" y2="330" strokeWidth="2" className={line} variants={draw(0.2)} />

      {/* main house body */}
      <motion.path d="M110 330 V190 H370 V330" strokeWidth="2" className={line} variants={draw(0.5)} />
      {/* roof */}
      <motion.path d="M92 196 L240 96 L388 196" strokeWidth="2.5" className={line} variants={draw(0.9)} />
      {/* chimney */}
      <motion.path d="M300 138 V102 H326 V156" strokeWidth="2" className={line} variants={draw(1.3)} />

      {/* door */}
      <motion.path d="M222 330 V246 H262 V330" strokeWidth="2" className={line} variants={draw(1.5)} />
      <motion.circle cx="254" cy="290" r="2.5" className="fill-paper/80" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2 } }} />

      {/* windows */}
      <motion.rect x="140" y="228" width="52" height="56" strokeWidth="2" className={line} variants={draw(1.6)} />
      <motion.path d="M166 228 V284 M140 256 H192" strokeWidth="1" className={thin} variants={draw(1.9)} />
      <motion.rect x="296" y="228" width="52" height="56" strokeWidth="2" className={line} variants={draw(1.7)} />
      <motion.path d="M322 228 V284 M296 256 H348" strokeWidth="1" className={thin} variants={draw(2)} />

      {/* gable window */}
      <motion.circle cx="240" cy="160" r="16" strokeWidth="2" className={line} variants={draw(1.8)} />

      {/* dimension line below */}
      <motion.path d="M110 356 H370" strokeWidth="1" className={thin} variants={draw(2.1)} />
      <motion.path d="M110 348 V364 M370 348 V364" strokeWidth="1" className={thin} variants={draw(2.2)} />
      <motion.text
        x="240"
        y="378"
        textAnchor="middle"
        className="fill-hivisBright font-mono"
        fontSize="11"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 0.4 } }}
      >
        38&apos;-0&quot;
      </motion.text>

      {/* height dimension */}
      <motion.path d="M414 96 V330" strokeWidth="1" className={thin} variants={draw(2.3)} />
      <motion.path d="M406 96 H422 M406 330 H422" strokeWidth="1" className={thin} variants={draw(2.4)} />
      <motion.text
        x="432"
        y="216"
        className="fill-hivisBright font-mono"
        fontSize="11"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.6, duration: 0.4 } }}
      >
        26&apos;
      </motion.text>
    </motion.svg>
  )
}
