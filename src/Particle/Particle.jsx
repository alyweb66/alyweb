/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import circleImg from '/circle.png';
import { Suspense, useCallback, useMemo, useRef, useEffect } from 'react';

// Étendre OrbitControls pour l'utiliser dans @react-three/fiber
extend({ OrbitControls });


function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update();
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.01}
      rotateSpeed={-0.1}
      autoRotate
      autoRotateSpeed={0.1}
      enabled={false}
    />
  );
}

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();

  let t = 0;
  const f = 0.002;
  const a = 3;

  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 100;
  const sep = 3;

  const positions = useMemo(() => {
    const pos = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = graph(x, z);
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, [count, sep, graph]);

   // Couleurs des particules
   const colors = useMemo(() => {
    const col = [];
    for (let i = 0; i < count * count; i++) {
      col.push(Math.random(), Math.random(), Math.random()); // Couleur RGB aléatoire
    }
    return new Float32Array(col);
  }, [count]);

  useFrame(() => {
    t += 5;
  
    if (t % 2 !== 0) return; // Limiter les mises à jour à une fois toutes les 2 frames
  
    const pos = bufferRef.current.array;
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        pos[i + 1] = graph(x, z);
        i += 3;
      }
    }
    bufferRef.current.needsUpdate = true;
  });

  // Préchargement de la texture pour éviter le blocage initial

useEffect(() => {
  imgTex.generateMipmaps = false;
  imgTex.minFilter = THREE.LinearFilter;
}, [imgTex]);

  const materialRef = useRef();
const duration = 4000; // Durée de l'animation en ms
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = 0; // Départ transparent

      const start = performance.now(); // Heure de départ

      const fadeIn = () => {
        const elapsed = performance.now() - start; // Temps écoulé
        const progress = Math.min(elapsed / duration, 1); // Normaliser entre 0 et 1

        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
        const easedProgress = easeInOutQuad(progress);
        materialRef.current.opacity = easedProgress;

        if (progress < 1) {
          requestAnimationFrame(fadeIn); // Continuer jusqu'à 1
        }
      };

      requestAnimationFrame(fadeIn); // Démarrer l'animation
    }
  }, [duration]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
          <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
      ref={materialRef}
        map={imgTex}
       /*  color={0x000000} */
        vertexColors 
        size={0.2}
        sizeAttenuation
        transparent
        alphaTest={0.01}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas
      camera={{ position: [100, 10, 0], fov: 75 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      <CameraControls />
    </Canvas>
  );
}

export default AnimationCanvas;