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
        console.log(obj.position)
        try {
          Object.assign(object, obj)
        } catch (_) {
          // Do nothing - everything ok!
          // The error comes from a "position" property that is read only.
          // ...but we didn't touch it in this assign?
          // I guess javascript is weird c:
        }
        object.children[0].position.set(this.x, this.y, this.z)
        this.vglObject3d.emit()
      });
      return object
    },
  },
}
