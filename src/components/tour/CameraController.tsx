import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  enabled: boolean;
  guidedMode?: boolean;
  targetPosition?: [number, number, number];
}

export const CameraController = ({
  enabled,
  guidedMode = false,
  targetPosition,
}: CameraControllerProps) => {
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const rotationRef = useRef({ x: 0, y: 0 });
  const isPointerLocked = useRef(false);
  const guidedProgress = useRef(0);

  useEffect(() => {
    if (!enabled || guidedMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          moveState.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          moveState.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          moveState.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          moveState.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          moveState.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          moveState.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          moveState.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          moveState.current.right = false;
          break;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked.current) return;
      rotationRef.current.x -= e.movementX * 0.002;
      rotationRef.current.y -= e.movementY * 0.002;
      rotationRef.current.y = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, rotationRef.current.y)
      );
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === gl.domElement;
    };

    const handleClick = () => {
      if (!isPointerLocked.current) {
        gl.domElement.requestPointerLock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    gl.domElement.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      gl.domElement.removeEventListener("click", handleClick);
      if (isPointerLocked.current) {
        document.exitPointerLock();
      }
    };
  }, [enabled, guidedMode, gl]);

  useFrame((state, delta) => {
    // Guided mode - smooth camera movement to target
    if (guidedMode && targetPosition) {
      const targetVec = new THREE.Vector3(...targetPosition);
      camera.position.lerp(targetVec, delta * 1.5);

      // Look at the artifact
      const artifactPos = new THREE.Vector3(
        targetPosition[0],
        targetPosition[1] - 1.5,
        targetPosition[2] - 3
      );
      const targetRotation = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(
            camera.position,
            artifactPos,
            new THREE.Vector3(0, 1, 0)
          )
        )
      );

      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        targetRotation.x,
        delta * 2
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        targetRotation.y,
        delta * 2
      );

      return;
    }

    // Manual mode
    if (!enabled || guidedMode) return;

    // Apply rotation
    camera.rotation.order = "YXZ";
    camera.rotation.y = rotationRef.current.x;
    camera.rotation.x = rotationRef.current.y;

    // Calculate movement direction
    const direction = new THREE.Vector3();
    const speed = 0.08;

    if (moveState.current.forward) direction.z -= 1;
    if (moveState.current.backward) direction.z += 1;
    if (moveState.current.left) direction.x -= 1;
    if (moveState.current.right) direction.x += 1;

    direction.normalize();
    direction.applyQuaternion(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, rotationRef.current.x, 0)
      )
    );

    // Update position with boundary checks
    const newX = camera.position.x + direction.x * speed;
    const newZ = camera.position.z + direction.z * speed;

    if (newX > -9 && newX < 9) camera.position.x = newX;
    if (newZ > -9 && newZ < 9) camera.position.z = newZ;
    camera.position.y = 1.7; // Eye height
  });

  return null;
};
