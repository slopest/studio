<template>
  <v-btn
    icon
    @click="toggle(0, 'sloper')">
    <v-icon>mdi-circle-medium</v-icon>
  </v-btn>
</template>

<script>
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
    },
    holds: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    toggle(z, type) {
      const hold = {
        x: this.x,
        y: this.y,
        z,
        type
      }
      const index = this.holds.findIndex(hold => hold.x === this.x && hold.y === this.y)
      if (index === -1) {
        this.holds.push(hold)
      } else {
        this.holds.splice(index, 1)
      }
      this.$emit('input', this.holds)
    }
  }
}
</script>
