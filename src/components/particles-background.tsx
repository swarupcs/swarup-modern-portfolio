// "use client"

// import { useCallback, useEffect, useState } from "react"
// import Particles from "react-tsparticles"
// import { loadFull } from "tsparticles"
// import type { Container, Engine } from "tsparticles-engine"
// import { useTheme } from "next-themes"

export default function ParticlesBackground() {
  // const { resolvedTheme } = useTheme()
  // const [mounted, setMounted] = useState(false)

  // // Make sure we're mounted to avoid hydration issues
  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // // Initialize particles
  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadFull(engine)
  // }, [])

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //   // Optional: Do something when particles are loaded
  // }, [])

  // // Skip rendering on server
  // if (!mounted) return null

  // // Configure particles based on theme
  // const isDark = resolvedTheme === "dark"

  return (
    //   <Particles
    //     id="tsparticles"
    //     init={particlesInit}
    //     loaded={particlesLoaded}
    //     options={{
    //       fullScreen: {
    //         enable: false,
    //         zIndex: -1,
    //       },
    //       background: {
    //         color: {
    //           value: "transparent",
    //         },
    //       },
    //       fpsLimit: 120,
    //       interactivity: {
    //         events: {
    //           onClick: {
    //             enable: true,
    //             mode: "push",
    //           },
    //           onHover: {
    //             enable: true,
    //             mode: "repulse",
    //           },
    //           resize: true,
    //         },
    //         modes: {
    //           push: {
    //             quantity: 4,
    //           },
    //           repulse: {
    //             distance: 100,
    //             duration: 0.4,
    //           },
    //         },
    //       },
    //       particles: {
    //         color: {
    //           value: isDark ? "#4f6bff" : "#1a56db",
    //         },
    //         links: {
    //           color: isDark ? "#8c61ff" : "#7c3aed",
    //           distance: 150,
    //           enable: true,
    //           opacity: 0.5,
    //           width: 1,
    //         },
    //         move: {
    //           direction: "none",
    //           enable: true,
    //           outModes: {
    //             default: "bounce",
    //           },
    //           random: false,
    //           speed: 2,
    //           straight: false,
    //         },
    //         number: {
    //           density: {
    //             enable: true,
    //             area: 800,
    //           },
    //           value: 80,
    //         },
    //         opacity: {
    //           value: 0.5,
    //         },
    //         shape: {
    //           type: "circle",
    //         },
    //         size: {
    //           value: { min: 1, max: 5 },
    //         },
    //       },
    //       detectRetina: true,
    //     }}
    //     className="absolute inset-0 -z-10 h-full w-full"
    // />
    <div>
      <p>Particles background is not available in this version.</p>
    </div>
  );
}
