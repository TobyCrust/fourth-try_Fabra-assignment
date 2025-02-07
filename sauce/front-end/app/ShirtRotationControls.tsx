import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface ShirtRotationControlsProps {
  meshRef: React.RefObject<THREE.Group>;
}

const ShirtRotationControls = ({ meshRef }: ShirtRotationControlsProps) => {
  const { gl } = useThree();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationSpeed = 0.006;
  const scaleSpeed = 0.01;

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging.current || !meshRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.current.x,
        y: event.clientY - previousMousePosition.current.y,
      };

      meshRef.current.rotation.y += deltaMove.x * rotationSpeed;
      meshRef.current.rotation.x += deltaMove.y * rotationSpeed;

      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!meshRef.current) return;
      
      const scaleDelta = -event.deltaY * scaleSpeed;
      meshRef.current.scale.addScalar(scaleDelta);
      
      const minScale = 15;
      const maxScale = 40;
      meshRef.current.scale.clampScalar(minScale, maxScale);
    };

    gl.domElement.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    gl.domElement.addEventListener('wheel', handleWheel);

    return () => {
      gl.domElement.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      gl.domElement.removeEventListener('wheel', handleWheel);
    };
  }, [gl, meshRef]);

  // Auto-rotation when not dragging
  useFrame(() => {
    if (!isDragging.current && meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Adjust speed as needed
    }
  });

  return null;
};

export default ShirtRotationControls; 