import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh } from 'three'
import { useGetMaterial } from '../Hooks/Materials/useGetMaterial'

interface FolioModelProps {
  path: string
}

const FolioModel = ({ path }: FolioModelProps) => {
  const gltf = useGLTF(path)
  const getMaterial = useGetMaterial()

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (!(child instanceof Mesh)) return
      

      child.material = getMaterial(child.name)
    })
  }, [])
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  )
}

export default FolioModel
