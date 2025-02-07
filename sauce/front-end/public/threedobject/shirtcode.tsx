import React, { useMemo, useState, forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


interface Nodes { // definin all the different model parts of the shirt, origonal code from https://gltf.pmnd.rs/ did not do this, had to convert from js to tsx
  back: { geometry: any }; 
  front: { geometry: any };
  neckline: { geometry: any };
  whole: { geometry: any };
  left_sleeve: { geometry: any };
  right_sleeve: { geometry: any };
}

interface Patterns { // changed materials to variables
  rp: string; 
  ht: string; 
  dn: string; // made materials to be strings in blender for easier use
}

// Define a type alias for all valid part names.
export type ShirtPart = 'back' | 'front' | 'neckline' | 'leftSleeve' | 'rightSleeve';

interface ShirtProps extends React.ComponentProps<'group'> {
  materials?: {
    back?: string;
    front?: string;
    neckline?: string;
    leftSleeve?: string;
    rightSleeve?: string;
  };
  onPartHover?: (part: ShirtPart) => void;
  setCameraPosition?: (position: [number, number, number]) => void;
}

export const Shirt = forwardRef<THREE.Group, ShirtProps>(({ materials: materialProps, onPartHover, setCameraPosition, ...props }, ref): JSX.Element => {
  // Track which part is currently hovered.
  const [hoveredPart, setHoveredPart] = useState<ShirtPart | null>(null);
  
  const { nodes, materials } = useGLTF('/threedobject/Shirt.glb') as unknown as { nodes: Nodes; materials: any };
  
  // Default patterns 
  const patterns: Patterns = {
    rp: 'red-plaid',
    ht: 'Houndstooth fabric',
    dn: 'Denim fabric',
  };

  // Create a dedicated hover material (this example uses a hot‑pink highlight).
  const hoverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 'blue',
        emissive: 'lightblue',
        metalness: 0.5,
        roughness: 0.5,
      }),
    []
  );

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.back.geometry}
        material={
          hoveredPart === 'back'
            ? hoverMaterial
            : materials[materialProps?.back || patterns.rp]
        }
        position={[0, -1.152, 0.065]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPosition?.([0, 0, 25]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPart('back');
          onPartHover?.('back');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredPart(null);
        }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.front.geometry}
        material={
          hoveredPart === 'front'
            ? hoverMaterial
            : materials[materialProps?.front || patterns.rp]
        }
        position={[0, -1.152, 0.065]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPosition?.([0, 0, 25]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPart('front');
          onPartHover?.('front');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredPart(null);
        }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neckline.geometry}
        material={
          hoveredPart === 'neckline'
            ? hoverMaterial
            : materials[materialProps?.neckline || patterns.dn]
        }
        position={[0, -1.152, 0.065]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPosition?.([0, 5, 10]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPart('neckline');
          onPartHover?.('neckline');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredPart(null);
        }}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.whole.geometry}
        material={materials['Houndstooth fabric']}
        position={[0, -1.152, 0.065]}
      /> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.left_sleeve.geometry}
        material={
          hoveredPart === 'leftSleeve'
            ? hoverMaterial
            : materials[materialProps?.leftSleeve || patterns.ht]
        }
        position={[0, -1.152, 0.065]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPosition?.([5, 0, 15]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPart('leftSleeve');
          onPartHover?.('leftSleeve');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredPart(null);
        }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.right_sleeve.geometry}
        material={
          hoveredPart === 'rightSleeve'
            ? hoverMaterial
            : materials[materialProps?.rightSleeve || patterns.ht]
        }
        position={[0, -1.152, 0.065]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraPosition?.([-5, 0, 15]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPart('rightSleeve');
          onPartHover?.('rightSleeve');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredPart(null);
        }}
      />
    </group>
  )
});

useGLTF.preload('/Shirt.glb')







{/* <mesh
castShadow
receiveShadow
geometry={(nodes as Nodes).front.geometry}
material={materials[patterns.rp]}
position={[0, -1.152, 0.065]}
/> */}