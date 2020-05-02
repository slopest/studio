import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader'
import { Object3D, Euler } from 'three'
import { VglObject3d } from 'vue-gl'

export default {
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
      loader.load(this.src, (obj) => {
        try {
          Object.assign(object, obj)
        } catch (_) {
          // Do nothing - everything ok!
          // The error comes from a "position" property that is read only.
          // ...but we didn't touch it in this assign?
          // I guess javascript is weird c:
        }
        object.children[0].position.set(this.position.x, this.position.y, this.position.z)
        object.children[0].setRotationFromEuler(
          new Euler(
            Math.PI * this.rotation.x / 180,
            Math.PI * this.rotation.y / 180,
            Math.PI * this.rotation.z / 180,
            'XYZ'
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
            Math.PI * value.x / 180,
            Math.PI * value.y / 180,
            Math.PI * value.z / 180,
            'XYZ'
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
