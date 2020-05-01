import {VglSphereGeometry, VglTorusGeometry } from 'vue-gl'

const holds = {
  screw: {
    name: 'screw',
    component: VglSphereGeometry,
    props: {
      radius: 1,
      'width-segments': 64,
      'height-segments': 32
    },
    color: '#8a8a8a'
  },
  sloper: {
    name: 'sloper',
    component: VglSphereGeometry,
    props: {
      radius: 3,
      'width-segments': 64,
      'height-segments': 32
    },
    color: '#B71C1C'
  },
  pocket: {
    name: 'pocket',
    component: VglTorusGeometry,
    props: {
      radius: 2,
      'tube-radius': 5,
      'radial-segments': 30,
      'tubular-segments': 200
    },
    color: '#F700B3'
  }
}

export default holds
