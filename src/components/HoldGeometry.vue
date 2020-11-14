<template>
  <div class="hold">
    <model-loader
      v-model="hold"
      v-bind="holdType.model.props"
      :name="name"
      :type="hold.type"/>
  </div>
</template>

<script>
import ModelLoader from '@/components/ModelLoader'
import { findType } from '@/utils/holds'

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
        x: this.hold.position.x * 200,
        y: this.hold.position.y * 200,
        z: this.hold.position.z * 200
      }
    }
  }
}
</script>
