'use client'
import { useEffect, useRef } from 'react'

interface Props {
  color: string
  visual: string
}

function hexToColor(hex: string) {
  return parseInt(hex.replace('#', '0x'))
}

export default function ServiceScene({ color, visual }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let animId: number

    import('three').then(THREE => {
      const W = mount.clientWidth || 500
      const H = mount.clientHeight || 420

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
      camera.position.z = 6

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const col = hexToColor(color)
      const objects: import('three').Object3D[] = []

      if (visual === 'claw') {
        // Mechanical claw - interlocked torus shapes
        for (let i = 0; i < 3; i++) {
          const geo = new THREE.TorusGeometry(1 + i * 0.4, 0.05, 16, 64)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.6 - i * 0.1, transparent: true, wireframe: i === 2 })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.rotation.x = i * Math.PI / 3
          objects.push(mesh)
          scene.add(mesh)
        }
        // Claw arms
        for (let i = 0; i < 4; i++) {
          const geo = new THREE.CylinderGeometry(0.02, 0.08, 2, 8)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.8, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.rotation.z = (i * Math.PI) / 2
          mesh.position.set(Math.cos(i * Math.PI / 2) * 1.2, Math.sin(i * Math.PI / 2) * 1.2, 0)
          objects.push(mesh)
          scene.add(mesh)
        }
      } else if (visual === 'cloud') {
        // Floating cloud platforms
        for (let i = 0; i < 5; i++) {
          const geo = new THREE.BoxGeometry(2 - i * 0.2, 0.08, 1 - i * 0.1)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.3 + i * 0.1, transparent: true, wireframe: i % 2 === 0 })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.y = i * 0.6 - 1.2
          mesh.position.x = (Math.random() - 0.5) * 1.5
          objects.push(mesh)
          scene.add(mesh)
        }
      } else if (visual === 'grid') {
        // Server grid
        for (let x = -2; x <= 2; x++) {
          for (let y = -2; y <= 2; y++) {
            const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
            const mat = new THREE.MeshBasicMaterial({
              color: col, opacity: 0.2 + Math.random() * 0.5, transparent: true,
              wireframe: Math.random() > 0.5
            })
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(x * 0.8, y * 0.8, (Math.random() - 0.5) * 2)
            objects.push(mesh)
            scene.add(mesh)
          }
        }
      } else if (visual === 'flow') {
        // Flow tubes
        for (let i = 0; i < 6; i++) {
          const points = []
          for (let j = 0; j < 10; j++) {
            points.push(new THREE.Vector3(
              (j / 9) * 4 - 2,
              Math.sin((j / 9) * Math.PI * 2 + i) * 0.8,
              Math.cos((j / 9) * Math.PI * 2 + i * 0.5) * 0.4
            ))
          }
          const curve = new THREE.CatmullRomCurve3(points)
          const geo = new THREE.TubeGeometry(curve, 20, 0.03, 8, false)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.6, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          objects.push(mesh)
          scene.add(mesh)
        }
      } else if (visual === 'code') {
        // Code blocks morphing
        for (let i = 0; i < 8; i++) {
          const geo = new THREE.BoxGeometry(1.5, 0.08, 0.08)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.4 + Math.random() * 0.4, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set((Math.random() - 0.5) * 1, i * 0.35 - 1.4, (Math.random() - 0.5) * 0.5)
          objects.push(mesh)
          scene.add(mesh)
        }
      } else if (visual === 'agent') {
        // Digital humanoid - particle form
        const particleCount = 300
        const positions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
          const t = i / particleCount
          const angle = t * Math.PI * 20
          const r = Math.sin(t * Math.PI) * 1.5
          positions[i * 3] = r * Math.cos(angle) + (Math.random() - 0.5) * 0.5
          positions[i * 3 + 1] = t * 4 - 2 + (Math.random() - 0.5) * 0.3
          positions[i * 3 + 2] = r * Math.sin(angle) + (Math.random() - 0.5) * 0.5
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const mat = new THREE.PointsMaterial({ color: col, size: 0.05, transparent: true, opacity: 0.8 })
        const pts = new THREE.Points(geo, mat)
        scene.add(pts)
        objects.push(pts)
      } else if (visual === 'capsule') {
        // Agent capsules
        for (let i = 0; i < 5; i++) {
          const geo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 32)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.3 + i * 0.1, transparent: true, wireframe: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set((i - 2) * 1.2, Math.sin(i) * 0.5, 0)
          objects.push(mesh)
          scene.add(mesh)
          // Cap spheres
          const capGeo = new THREE.SphereGeometry(0.3, 16, 16)
          const cap1 = new THREE.Mesh(capGeo, mat.clone())
          cap1.position.set((i - 2) * 1.2, Math.sin(i) * 0.5 + 0.4, 0)
          const cap2 = new THREE.Mesh(capGeo, mat.clone())
          cap2.position.set((i - 2) * 1.2, Math.sin(i) * 0.5 - 0.4, 0)
          scene.add(cap1); scene.add(cap2)
          objects.push(cap1, cap2)
        }
      } else if (visual === 'upgrade') {
        // Old box upgraded with glowing overlay
        const oldGeo = new THREE.BoxGeometry(2, 2.5, 1)
        const oldMat = new THREE.MeshBasicMaterial({ color: 0x334455, wireframe: true, opacity: 0.3, transparent: true })
        scene.add(new THREE.Mesh(oldGeo, oldMat))
        for (let i = 0; i < 4; i++) {
          const geo = new THREE.BoxGeometry(2.1, 0.08, 1.1)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.6, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.y = i * 0.7 - 1.05
          objects.push(mesh)
          scene.add(mesh)
        }
      } else if (visual === 'network') {
        // Human network nodes
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const geo = new THREE.SphereGeometry(0.2, 16, 16)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.7, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0)
          objects.push(mesh)
          scene.add(mesh)
        }
        // Center node
        const centerGeo = new THREE.SphereGeometry(0.35, 32, 32)
        const centerMat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.9, transparent: true })
        scene.add(new THREE.Mesh(centerGeo, centerMat))
      } else if (visual === 'vault') {
        // Secure vault
        const vaultGeo = new THREE.BoxGeometry(2.5, 3, 0.5)
        const vaultMat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, opacity: 0.4, transparent: true })
        scene.add(new THREE.Mesh(vaultGeo, vaultMat))
        // Shield
        const shieldGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 6)
        const shieldMat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.2, transparent: true })
        const shield = new THREE.Mesh(shieldGeo, shieldMat)
        shield.position.z = 1
        scene.add(shield)
        objects.push(shield)
      } else if (visual === 'growth') {
        // Growth bars
        for (let i = 0; i < 7; i++) {
          const h = 0.5 + i * 0.4
          const geo = new THREE.BoxGeometry(0.4, h, 0.4)
          const mat = new THREE.MeshBasicMaterial({ color: col, opacity: 0.5 + i * 0.07, transparent: true })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(i * 0.7 - 2.1, h / 2 - 1.5, 0)
          objects.push(mesh)
          scene.add(mesh)
        }
      }

      // Floating particles for all scenes
      const pts2Count = 60
      const pts2Pos = new Float32Array(pts2Count * 3)
      for (let i = 0; i < pts2Count; i++) {
        pts2Pos[i * 3] = (Math.random() - 0.5) * 8
        pts2Pos[i * 3 + 1] = (Math.random() - 0.5) * 6
        pts2Pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      }
      const pts2Geo = new THREE.BufferGeometry()
      pts2Geo.setAttribute('position', new THREE.BufferAttribute(pts2Pos, 3))
      const pts2Mat = new THREE.PointsMaterial({ color: col, size: 0.03, transparent: true, opacity: 0.5 })
      scene.add(new THREE.Points(pts2Geo, pts2Mat))

      // Ambient light effect via fog
      scene.fog = new THREE.FogExp2(0x000000, 0.05)

      let t = 0
      let mx = 0, my = 0
      const onMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect()
        mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        my = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener('mousemove', onMove)

      function animate() {
        t += 0.008
        animId = requestAnimationFrame(animate)

        objects.forEach((obj, i) => {
          obj.rotation.y += 0.003 + i * 0.001
          obj.rotation.x += 0.001
          if (visual === 'flow') obj.rotation.y = t * (0.3 + i * 0.05)
          if (visual === 'code') { obj.position.x = (obj.position.x + (Math.random() - 0.5) * 0.002) }
        })

        camera.position.x += (mx * 0.8 - camera.position.x) * 0.03
        camera.position.y += (my * 0.5 - camera.position.y) * 0.03
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMove)
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
        renderer.dispose()
      }
    })

    return () => { if (animId) cancelAnimationFrame(animId) }
  }, [color, visual])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 420 }} />
}
