<template>
  <v-menu
    :close-on-content-click="false"
    :value="hold !== undefined"
    offset-y>
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
    <v-card v-if="hold !== undefined">
      <v-card-text>
        <span class="subtitle-1 black--text">{{ x }}; {{ y }}</span>
        <v-select
          v-model="form.type"
          :items="Object.values(holdTypes).map(h => { return { value: h.id, data: h }})"
          label="Type">
          <template #selection="{ item }">
            <v-icon
              :color="item.data.color"
              left>
              {{ item.data.icon }}
            </v-icon>
            {{ item.data.name }}
          </template>
          <template #item="{ item }">
            <v-icon
              :color="item.data.color"
              left>
              {{ item.data.icon }}
            </v-icon>
            {{ item.data.name }}
          </template>
        </v-select>
        <v-subheader>Position</v-subheader>
        <v-text-field
          v-model="form.z"
          label="Z tilt"
          type="number"/>
        <v-subheader>Rotation</v-subheader>
        <v-slider
          v-model="form.xRotation"
          label="X"
          max="360"/>
        <v-slider
          v-model="form.yRotation"
          label="Y"
          max="360"/>
        <v-slider
          v-model="form.zRotation"
          label="Z"
          max="360"/>
        <v-subheader>Scale</v-subheader>
        <v-switch
          v-model="threeAxisScale"
          inset
          label="Three axis scale"
          prepend-icon="mdi-axis-arrow"/>
        <template v-if="threeAxisScale">
          <v-slider
            v-model="form.xScale"
            label="X"
            min="0"
            max="6"
            step="0.05"/>
          <v-slider
            v-model="form.yScale"
            label="Y"
            min="0"
            max="6"
            step="0.05"/>
          <v-slider
            v-model="form.zScale"
            label="Z"
            min="0"
            max="6"
            step="0.05"/>
        </template>
        <v-slider
          v-else
          v-model="form.xScale"
          min="0"
          max="6"
          step="0.05"/>
        <v-btn
          block
          @click="remove">
          Remove hold
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import holdTypes from '../utils/holds'
import { defaultHoldForm } from '../utils/data'

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
      threeAxisScale: false,
      form: Object.assign({}, defaultHoldForm),
      holdTypes
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
    resetForm() {
      this.form = Object.assign({}, defaultHoldForm)
    },
    tryAdd() {
      if (this.hold === undefined) {
        this.addHold({
          x: this.x,
          y: this.y,
          type: this.form.type
        })
      }
    },
    remove() {
      this.removeGeometry()
      this.removeHold({
        x: this.hold.x,
        y: this.hold.y
      })
      this.resetForm()
    },
    removeGeometry() {
      this.$emit('remove', `hold-${this.hold.x}-${this.hold.y}`)
    }
  },
  watch: {
    'form.type'() {
      this.removeGeometry()
    },
    form: {
      handler(value) {
        if (this.hold !== undefined) {
          if (!this.threeAxisScale) {
            value.yScale = value.xScale
            value.zScale = value.xScale
          }
          this.updateHold({
            x: this.x,
            y: this.y,
            z: value.z,
            type: value.type,
            rotation: {
              x: value.xRotation,
              y: value.yRotation,
              z: value.zRotation,
            },
            scale: {
              x: value.xScale,
              y: value.yScale,
              z: value.zScale
            }
          })
        }
      },
      deep: true
    }
  }
}
</script>
