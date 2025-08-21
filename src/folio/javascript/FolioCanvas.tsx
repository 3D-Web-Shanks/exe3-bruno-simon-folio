import { Canvas } from '@react-three/fiber'
import Folio from './Folio'
import { LinearEncoding, NoToneMapping } from 'three'
export default function FolioCanvas() {
  return (
    <Canvas
      gl={{
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        physicallyCorrectLights: true,
        autoClear: false,
        outputEncoding: LinearEncoding,
        toneMapping: NoToneMapping
      }}
    >
      <color attach="background" args={[0x000000]} />
      <Folio />
    </Canvas>
  )
}
