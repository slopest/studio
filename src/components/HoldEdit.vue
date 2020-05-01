<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
        @click="tryAdd">
        <v-icon
          v-if="hold === undefined"
          color="gray">
          mdi-circle-small
        </v-icon>
        <v-icon
          v-else
          :color="typeData.color">
          {{ typeData.icon }}
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      block
      @click="removeHold({ x, y })">
      Remove hold
    </v-btn>
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
  methods: {
    ...mapActions(['addHold', 'updateHold', 'removeHold']),
    tryAdd() {
      if (this.hold === undefined) {
        this.addHold({
          x: this.x,
          y: this.y,
          z: this.form.z,
          type: this.form.type
        })
      }
    }
  },
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
