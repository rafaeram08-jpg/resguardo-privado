import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function GlassShape() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scrollY = window.scrollY;
      const vh = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = vh > 0 ? scrollY / vh : 0;
      
      // Gentle floating rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 0.5;
      
      // Move shape downwards as user scrolls
      meshRef.current.position.y = -scrollProgress * 5; 
      meshRef.current.position.x = 2.5 - (scrollProgress * 2);
    }
  });

  return (
    <group ref={meshRef} position={[2.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Glass Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[2.2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            color="#ffffff"
          />
        </mesh>
        
        {/* Inner Solid Dark Green Core */}
        <Sphere args={[1.2, 32, 32]}>
          <meshStandardMaterial color="#064E3B" roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#059669" />
      <GlassShape />
    </Canvas>
  );
}
