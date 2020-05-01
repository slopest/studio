import {VglSphereGeometry, VglTorusGeometry } from 'vue-gl'

const holds = {
  screw: {
    name: 'Screw',
    id: 'screw',
    component: VglSphereGeometry,
    props: {
      radius: 1,
      'width-segments': 64,
      'height-segments': 32
    },
    color: '#8a8a8a',
    icon: 'mdi-circle-small'
  },
  sloper: {
    name: 'Sloper',
    id: 'sloper',
    component: VglSphereGeometry,
    props: {
      radius: 3,
      'width-segments': 64,
      'height-segments': 32
    },
    color: '#B71C1C',
    icon: 'mdi-circle'
  },
  pocket: {
    name: 'Pocket',
    id: 'pocket',
    component: VglTorusGeometry,
    props: {
      radius: 2,
      tube: 2,
      'radial-segments': 30,
      'tubular-segments': 200
    },
    color: '#F700B3',
    icon: 'mdi-circle-double'
  }
}

export default holds
