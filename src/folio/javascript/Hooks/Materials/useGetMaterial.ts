import { useTexture } from '@react-three/drei'
import { FolioMatcapMaterial } from '../../Materials/FolioMatcapMaterial'
import { MeshBasicMaterial, MeshNormalMaterial, Texture, Material } from 'three'
import { FloorShadowMaterial } from '../../Materials/FloorShadowMaterial'
import { useControls } from 'leva'

// ---------------- 配置表 ---------------- //
const matcapColors = [
  'beige',
  'black',
  'blue',
  'brown',
  'emeraldGreen',
  'gold',
  'gray',
  'green',
  'metal',
  'orange',
  'purple',
  'red',
  'yellow',
  'white'
] as const
type MatcapColor = (typeof matcapColors)[number]

const basicColors = {
  red: 0xff0000,
  white: 0xffffff,
  yellow: 0xffe889
} as const
type BasicColor = keyof typeof basicColors

// ---------------- 贴图路径映射 ---------------- //
const useTextureArgument = Object.fromEntries(
  matcapColors.map((color) => [color, `./models/matcaps/${color}.png`])
)

// ---------------- 工厂 Hook ---------------- //
export function useGetMaterial() {
  const matcapTextures = useTexture(useTextureArgument)
  const materialCache = new Map<string, Material>()

  const { floorShadowColor, floorShadowAlpha } = useControls(
    'Floor Shadow',
    {
      floorShadowColor: {
        value: '#d04500',
        label: 'Floor Shadow Color'
        // options: matcapColors
      },
      floorShadowAlpha: {
        value: 1,
        label: 'Floor Shadow Alpha',
        min: 0,
        max: 1,
        // step: 0.01
      }
    },
    { collapsed: true, color: '#eeeeee' }
  )

  const getMaterial = (meshName: string, floorShadowTexture: Texture) => {
    // 如果已有缓存，直接返回
    if (materialCache.has(meshName)) {
      return materialCache.get(meshName)!
    }

    let material: Material

    // 1. Matcap 材质
    const matcapColor = getColor<MatcapColor>(meshName, 'shade')
    if (matcapColor && matcapTextures[matcapColor]) {
      material = new FolioMatcapMaterial(matcapTextures[matcapColor])
    }
    // 2. Floor 材质
    else if (isFloor(meshName)) {
      material = new FloorShadowMaterial(
        floorShadowTexture,
        floorShadowColor,
        floorShadowAlpha
      )
    }
    // 3. 纯色材质
    else {
      const pureColor = getColor<BasicColor>(meshName, 'pure')
      material = pureColor
        ? new MeshBasicMaterial({ color: basicColors[pureColor] })
        : new MeshNormalMaterial()
    }

    // 存入缓存
    materialCache.set(meshName, material)
    return material
  }

  return getMaterial
}

// ---------------- 辅助函数 ---------------- //
export function isFloor(meshName: string) {
  return /^floor_?[0-9]{0,3}?/i.test(meshName)
}

function getColor<T extends string>(
  meshName: string,
  prefix: 'shade' | 'pure'
) {
  const match = meshName.match(
    new RegExp(`^${prefix}([a-z]+)_?[0-9]{0,3}?`, 'i')
  )
  return toCamelCase(match?.[1]) as T | undefined
}

function toCamelCase(value?: string) {
  return value
    ? `${value.substring(0, 1).toLowerCase()}${value.substring(1)}`
    : undefined
}
