<template>
  <div class="hold">
    <component
      :is="holdType.component"
      :name="`hold-${hold.x}-${hold.y}`"
      v-bind="holdType.props"/>
    <vgl-mesh
      :geometry="`hold-${hold.x}-${hold.y}`"
      :position="`${hold.x * 20} ${hold.y * 20} ${hold.z * 20}`"
      :material="`${holdType.name}-material`"/>
  </div>
</template>

<script>
import { VglMesh } from 'vue-gl'
import holds from '../utils/holds'

export default {
  name: 'HoldGeometry',
  components: { VglMesh },
  props: {
    hold: {
      type: Object,
      required: true
    }
  },
  computed: {
    holdType() {
      return holds[this.hold.type]
    }
  }
}
</script>
