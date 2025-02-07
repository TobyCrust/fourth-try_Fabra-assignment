import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface CameraMovementProps {
  position: [number, number, number];
}

const CameraMovement: React.FC<CameraMovementProps> = ({ position }) => {
  const cameraRef = useRef<any>(null);
  
  useFrame(() => {
    if (cameraRef.current) {
      // Interpolate the camera position towards the target position
      cameraRef.current.position.lerp(new THREE.Vector3(...position), 0.05);
      cameraRef.current.lookAt(0, 0, 25);
      cameraRef.current.rotation.set(0, 0, 0);
      
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 25]} />;
};

export default CameraMovement; 