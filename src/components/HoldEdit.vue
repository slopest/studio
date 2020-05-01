<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on">
        <v-icon :color="hold === undefined ? 'gray' : typeData.color">
          mdi-circle-medium
        </v-icon>
      </v-btn>
    </template>
    <template v-if="hold === undefined">
      <v-btn
        block
        @click="addHold({
          x,
          y,
          z: form.z,
          type: form.type
        })">
        Add hold
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        block
        @click="removeHold({ x, y })">
        Remove hold
      </v-btn>
    </template>
  </v-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import holdTypes from '../utils/holds'

export default {
  name: 'HoldEdit',
  model: { prop: 'holds' },
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
        type: 'pocket',
        z: 0
      }
    }
  },
  computed: {
    ...mapState(['holds']),
    ...mapGetters(['getHoldByPosition']),
    hold() {
      return this.getHoldByPosition({
        x: this.x,
        y: this.y
      })
    },
    typeData() {
      if (this.hold === undefined) return undefined
      else return holdTypes[this.hold.type]
    }
  },
  methods: mapActions(['addHold', 'updateHold', 'removeHold']),
  watch: {
    form: {
      handler(value) {
        if (this.hold !== undefined) {
          this.updateHold({
            x: this.x,
            y: this.y,
            z: value.z,
            type: value.type
          })
        }
      },
      deep: true
    }
  }
}
</script>
