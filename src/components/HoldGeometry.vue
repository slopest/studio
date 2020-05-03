<template>
  <div class="hold">
    <loader
      v-bind="holdType.props"
      :name="`hold-${hold.x}-${hold.y}`"
      :src="`/holds/${holdType.model}`"
      :position="position"
      :rotation="hold.rotation"
      :scale="hold.scale"/>
  </div>
</template>

<script>
import Loader from '../loader'
import holds from '../utils/holds'

export default {
  name: 'HoldGeometry',
  components: { Loader },
  props: {
    hold: {
      type: Object,
      required: true
    }
  },
  computed: {
    holdType() {
      return holds[this.hold.type]
    },
    position() {
      return {
        x: this.hold.x * 20,
        y: this.hold.y * 20,
        z: this.hold.z * 20
      }
    }
  }
}
</script>
