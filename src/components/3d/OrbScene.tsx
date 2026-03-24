'use client'
import { useEffect, useRef } from 'react'

export default function OrbScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let THREE: typeof import('three')
    let animId: number

    import('three').then(T => {
      THREE = T

      const W = mount.clientWidth || 500
      const H = mount.clientHeight || 480

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // Central sphere with wireframe
      const sphereGeo = new THREE.SphereGeometry(1.2, 32, 32)
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        opacity: 0.15,
        transparent: true,
      })
      const sphere = new THREE.Mesh(sphereGeo, sphereMat)
      scene.add(sphere)

      // Inner solid sphere
      const innerGeo = new THREE.SphereGeometry(0.8, 32, 32)
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        wireframe: true,
        opacity: 0.08,
        transparent: true,
      })
      const innerSphere = new THREE.Mesh(innerGeo, innerMat)
      scene.add(innerSphere)

      // Rings
      const ringColors = [0x00f5ff, 0x0066ff, 0x7c3aed]
      const rings: THREE.Mesh[] = []
      ringColors.forEach((color, i) => {
        const geo = new THREE.TorusGeometry(1.8 + i * 0.5, 0.005, 16, 100)
        const mat = new THREE.MeshBasicMaterial({ color, opacity: 0.4 - i * 0.1, transparent: true })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = Math.PI / (2 + i)
        ring.rotation.y = (i * Math.PI) / 3
        rings.push(ring)
        scene.add(ring)
      })

      // Floating particles
      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)
      const particleColors = new Float32Array(particleCount * 3)
      const COLS = [
        new THREE.Color(0x00f5ff),
        new THREE.Color(0x0066ff),
        new THREE.Color(0x7c3aed),
        new THREE.Color(0xff0080),
        new THREE.Color(0x00ff88),
      ]

      for (let i = 0; i < particleCount; i++) {
        const r = 2.5 + Math.random() * 1.5
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
        const col = COLS[Math.floor(Math.random() * COLS.length)]
        particleColors[i * 3] = col.r
        particleColors[i * 3 + 1] = col.g
        particleColors[i * 3 + 2] = col.b
      }

      const particleGeo = new THREE.BufferGeometry()
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
      const particleMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8 })
      const particles = new THREE.Points(particleGeo, particleMat)
      scene.add(particles)

      // Mouse interaction
      let mx = 0, my = 0
      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect()
        mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        my = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      let t = 0
      function animate() {
        t += 0.005
        animId = requestAnimationFrame(animate)

        sphere.rotation.y = t * 0.3
        sphere.rotation.x = t * 0.1
        innerSphere.rotation.y = -t * 0.5
        innerSphere.rotation.z = t * 0.2

        rings[0].rotation.z = t * 0.2
        rings[1].rotation.x = Math.PI / 3 + t * 0.15
        rings[2].rotation.y = t * 0.1

        particles.rotation.y = t * 0.05
        particles.rotation.x = t * 0.02

        // Smooth camera tilt toward mouse
        camera.position.x += (mx * 0.5 - camera.position.x) * 0.05
        camera.position.y += (my * 0.5 - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        mount.removeChild(renderer.domElement)
        renderer.dispose()
      }
    })

    return () => { if (animId) cancelAnimationFrame(animId) }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '480px' }} />
}
