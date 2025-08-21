import { extend, Node } from '@react-three/fiber'
import { FloorMaterial } from './folio/src/javascript/Materials/FloorMaterial'

extend({ FloorMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    floorMaterial: Node<FloorMaterial, typeof FloorMaterial>
  }
}
