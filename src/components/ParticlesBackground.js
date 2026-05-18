'use client'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        detectRetina: false,
        particles: {
          number: { value: 28, density: { enable: true, area: 900 } },
          color: { value: '#ffffff' },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.4 },
          links: { enable: false },
        },
      }}
    />
  )
}
