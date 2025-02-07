"use client"

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react"
import { Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from '../public/threedobject/shirtcode';
import CameraMovement from './CameraMovement';
import ShirtRotationControls from './ShirtRotationControls';
import * as THREE from 'three';

export default function Home() {
  const [materials, setMaterials] = useState({
    back: 'red-plaid',
    front: 'red-plaid',
    neckline: 'Denim fabric',
    leftSleeve: 'Houndstooth fabric',
    rightSleeve: 'Houndstooth fabric',
  });

  const availablePatterns = ['red-plaid', 'Houndstooth fabric', 'Denim fabric'];

  const changeMaterial = (part: keyof typeof materials) => {
    setMaterials(prev => {
      const currentIndex = availablePatterns.indexOf(prev[part]);
      const nextIndex = (currentIndex + 1) % availablePatterns.length;
      return {
        ...prev,
        [part]: availablePatterns[nextIndex]
      };
    });
  };

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const shirtRef = useRef<THREE.Group>(null);

  return (
    <main>
      <div style={{ position: 'absolute', zIndex: 1, padding: '20px' }}>
        <button onClick={() => {changeMaterial('back'); setCameraPosition([0, 0, 25])}}>Change Back</button>
        <button onClick={() => {changeMaterial('front'); setCameraPosition([0, 0, 25])}}>Change Front</button>
        <button onClick={() => { changeMaterial('neckline'); setCameraPosition([0, 5, 10])}}>Change Neckline</button>
        <button onClick={() => { changeMaterial('rightSleeve'); setCameraPosition([-5, 0, 15]); }}>Change Right Sleeve</button>
        <button onClick={() => { changeMaterial('leftSleeve'); setCameraPosition([5, 0, 15]) }} >Change Left Sleeve</button>
        
      </div>

      <ThreeDContainer>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 25], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <spotLight intensity={600.6} angle={0.6} penumbra={2} position={[10, 15, 10]} castShadow />
          <spotLight intensity={500000.6} angle={0.6} penumbra={2} position={[-220, -195, -150]} castShadow />
          
          <Suspense fallback={null}>
            <Shirt 
              ref={shirtRef}
              scale={22.6} 
              position={[0, -2, 0]} 
              materials={materials} 
            />
            <Environment preset="studio" environmentIntensity={0.6} environmentRotation={[1000, 100, 0]}/>
            <ShirtRotationControls meshRef={shirtRef} />
          </Suspense>
          <CameraMovement position={cameraPosition} />
        </Canvas>
      </ThreeDContainer>
    </main>
  );
}

const ThreeDContainer = styled.div`
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
`;

