import { Object3D, Euler } from 'three'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader'
import { VglObject3d } from 'vue-gl'
import { degreesToRadians } from '@/utils/conversions'

export default {
  name: 'ModelLoader',
  mixins: [ VglObject3d ],
  model: {
    prop: 'hold'
  },
  props: {
    type: {
      type: String,
      required: true
    },
    hold: {
      type: Object,
      required: true
    }
  },
  computed: {
    inst() {
      let object = new Object3D()
      const loader = new ThreeMFLoader()

      loader.load(`/holds/${this.type}.3mf`, (loadedObject) => {
        try {
          Object.assign(object, loadedObject)
        } catch (_) {
          // Do nothing - everything ok!
          // The error comes from a "position" property that is read only.
          // ...but we didn't touch it in this assign?
          // I guess javascript is weird c:
        }

        object.name = `hold-${this.hold.position.x}-${this.hold.position.y}`
        object.children[0].position.set(this.wallPosition.x, this.wallPosition.y, this.wallPosition.z)
        object.children[0].setRotationFromEuler(
          new Euler(
            degreesToRadians(this.hold.rotation.x),
            degreesToRadians(this.hold.rotation.y),
            degreesToRadians(this.hold.rotation.z)
          )
        )
        object.children[0].scale.set(this.hold.scale.x, this.hold.scale.y, this.hold.scale.z)

        this.vglObject3d.emit()
      })
      return object
    },
    wallPosition() {
      return {
        x: this.hold.position.x * 20,
        y: this.hold.position.y * 20,
        z: this.hold.position.z
      }
    }
  },
  watch: {
    'hold.position.z'(value) {
      this.inst.children[0].position.set(this.wallPosition.x, this.wallPosition.y, value)
    },
    'hold.rotation'(value) {
      this.inst.children[0].setRotationFromEuler(
        new Euler(
          degreesToRadians(value.x),
          degreesToRadians(value.y),
          degreesToRadians(value.z)
        )
      )
    },
    'hold.scale'(value) {
      this.inst.children[0].scale.set(value.x, value.y, value.z)
    }
  }
}
