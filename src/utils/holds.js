import { VglSphereGeometry } from 'vue-gl'

const holds = {
  sloper: {
    name: 'sloper',
    component: VglSphereGeometry,
    props: {
      radius: 3,
      'width-segments': 64,
      'height-segments': 32
    },
    color: '#B71C1C'
  }
}

export default holds
