import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader'
import { Object3D, Euler } from 'three'
import { VglObject3d } from 'vue-gl'
import { degreesToRadians } from '@/utils/conversions'

export default {
  name: 'ModelLoader',
  mixins: [ VglObject3d ],
  props: {
    src: {
      type: String,
      required: true
    },
    position: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          z: 0
        }
      }
    },
    rotation: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          z: 0
        }
      }
    },
    scale: {
      type: Object,
      default: () => {
        return {
          x: 1,
          y: 1,
          z: 1
        }
      }
    }
  },
  computed: {
    inst() {
      let object = new Object3D()
      const loader = new ThreeMFLoader()
      loader.load(this.src, (loadedObject) => {
        try {
          Object.assign(object, loadedObject)
        } catch (_) {
          // Do nothing - everything ok!
          // The error comes from a "position" property that is read only.
          // ...but we didn't touch it in this assign?
          // I guess javascript is weird c:
        }
        object.name = `hold-${this.position.x / 20}-${this.position.y / 20}`

        object.children[0].position.set(this.position.x, this.position.y, this.position.z)
        object.children[0].setRotationFromEuler(
          new Euler(
            degreesToRadians(this.rotation.x),
            degreesToRadians(this.rotation.y),
            degreesToRadians(this.rotation.z)
          )
        )
        object.children[0].scale.set(this.scale.x, this.scale.y, this.scale.z)
        this.vglObject3d.emit()
      });
      return object
    },
  },
  watch: {
    position: {
      handler(value) {
        this.inst.children[0].position.set(value.x, value.y, value.z)
      },
      deep: true
    },
    rotation: {
      handler(value) {
        this.inst.children[0].setRotationFromEuler(
          new Euler(
            degreesToRadians(value.x),
            degreesToRadians(value.y),
            degreesToRadians(value.z)
          )
        )
      },
      deep: true
    },
    scale: {
      handler(value) {
        this.inst.children[0].scale.set(value.x, value.y, value.z)
      },
      deep: true
    }
  }
}
