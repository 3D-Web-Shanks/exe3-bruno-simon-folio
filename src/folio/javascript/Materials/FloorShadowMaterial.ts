import * as THREE from 'three'

import shaderFragment from '../../shaders/floorShadow/fragment.glsl'
import shaderVertex from '../../shaders/floorShadow/vertex.glsl'

export class FloorShadowMaterial extends THREE.ShaderMaterial {
  constructor(floorShadowTexture: THREE.Texture, color: string, alpha: number) {
    const uniforms = {
      tShadow: { value: floorShadowTexture },
      uShadowColor: { value: new THREE.Color(color).convertLinearToSRGB() },
      uAlpha: { value: alpha }
    }

    super({
      wireframe: false,
      transparent: true,
      uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment
    })
  }
}
