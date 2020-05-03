<template>
  <div class="hold">
    <model-loader
      v-bind="holdType.props"
      :name="name"
      :src="`/holds/${holdType.model}`"
      :position="position"
      :rotation="hold.rotation"
      :scale="hold.scale"/>
  </div>
</template>

<script>
import ModelLoader from '@/components/ModelLoader'
import { findType } from '../utils/holds'

export default {
  name: 'HoldGeometry',
  components: { ModelLoader },
  props: {
    hold: {
      type: Object,
      required: true
    }
  },
  computed: {
    holdType() {
      return findType(this.hold.type)
    },
    name() {
      return `hold-${this.hold.position.x}-${this.hold.position.y}`
    },
    position() {
      return {
        x: this.hold.position.x * 20,
        y: this.hold.position.y * 20,
        z: this.hold.position.z * 20
      }
    }
  }
}
</script>
