import * as THREE from 'three'
import shaderFragment from '../../shaders/matcap/fragment.glsl'
import shaderVertex from '../../shaders/matcap/vertex.glsl'
import { ShaderMaterial, Color, Texture } from 'three'

export class FolioMatcapMaterial extends ShaderMaterial {
  constructor(matcap: Texture) {
    const uniforms = {
      // 引入 three.js 内置的一些 uniform 库（颜色、法线、位移、雾效等）
      ...THREE.UniformsLib.common,
      ...THREE.UniformsLib.bumpmap,
      ...THREE.UniformsLib.normalmap,
      ...THREE.UniformsLib.displacementmap,
      ...THREE.UniformsLib.fog,

      // MatCap 贴图
      matcap: { value: matcap },

      // 一些自定义参数（用于动画和间接光模拟）
      uRevealProgress: { value: 1 },             // 控制显示进度（可能用于渐显效果）
      uIndirectDistanceAmplitude: { value: 1.75 },
      uIndirectDistanceStrength: { value: 0.5 },
      uIndirectDistancePower: { value: 2.0 },
      uIndirectAngleStrength: { value: 1.5 },
      uIndirectAngleOffset: { value: 0.6 },
      uIndirectAnglePower: { value: 1.0 },
      uIndirectColor: { value: new Color('#d04500').convertLinearToSRGB() }
    }

    super({
      uniforms,
      lights: false, // MatCap 自带光照，不需要 three.js 灯光
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment
    })
  }
}

