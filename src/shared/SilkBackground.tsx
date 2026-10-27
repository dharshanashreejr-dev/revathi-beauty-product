import Silk from './Silk'

/* Premium lavender silk painted once, fixed behind the whole page.
   Kept mild: pale fabric, slow flow, soft sheen — content always stays readable. */
export default function SilkBackground() {
  return (
    <div className="silk-bg" aria-hidden="true">
      <Silk
        color="#C98A9B"
        sheenColor="#F2C6C2"
        speed={3}
        scale={1.1}
        rotation={0.35}
        sheen={0.7}
        depth={0.6}
        glow={0.25}
        noiseIntensity={1.2}
        ripple={0.8}
        wave={0.8}
        mouseInteraction={false}
        clickRipple={false}
        intro
        dpr={1}
      />
    </div>
  )
}
