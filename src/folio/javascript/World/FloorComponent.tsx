import { Plane } from '@react-three/drei'
import { useControls } from 'leva'

const FloorComponent = () => {
  const { topLeftColor, topRightColor, bottomRightColor, bottomLeftColor } =
    useControls(
      'Floor',
      {
        topLeftColor: '#f5883c',
        topRightColor: '#ff9043',
        bottomRightColor: '#fccf92',
        bottomLeftColor: '#f5aa58'
      },
      { collapsed: true, color: '#f5883c' }
    )

  return (
    <Plane args={[2, 2]} frustumCulled={false} matrixAutoUpdate={false}>
      <floorMaterial
        topLeftColor={topLeftColor}
        topRightColor={topRightColor}
        bottomRightColor={bottomRightColor}
        bottomLeftColor={bottomLeftColor}
      />
    </Plane>
  )
}

export default FloorComponent
