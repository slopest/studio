import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader'
import { Object3D } from 'three'
import { VglObject3d } from 'vue-gl'
import { string, float } from 'vue-gl'

export default {
  mixins: [ VglObject3d ],
  props: {
    src: string,
    x: float,
    y: float,
    z: float,
  },
  computed: {
    inst() {
      let object = new Object3D()
      const loader = new ThreeMFLoader()
      loader.load(this.src, (obj) => {
        Object.assign(object, obj)
        this.vglObject3d.emit()
      });
      return object
    },
  },
}
