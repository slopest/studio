<template>
  <v-menu
    :close-on-content-click="false"
    :value="hold !== undefined"
    offset-y
    @update:return-value="abortUpdate">
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
          :color="holdType.editor.color">
          {{ holdType.editor.icon }}
        </v-icon>
      </v-btn>
    </template>
    <v-card v-if="hold !== undefined">
      <v-card-text>
        <v-row class="mx-0">
          <span class="subtitle-1 black--text">{{ x }}; {{ y }}</span>
          <v-spacer/>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                color="green"
                icon
                v-on="on"
                @click="update">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
            <span>Update</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                color="red"
                icon
                v-on="on"
                @click="abortUpdate">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </template>
            <span>Discard changes</span>
          </v-tooltip>
        </v-row>
        <v-select
          v-model="form.type"
          :items="holdTypes.map(h => { return { value: h.id, data: h }})"
          label="Type">
          <template #selection="{ item }">
            <v-icon
              :color="item.data.editor.color"
              left>
              {{ item.data.editor.icon }}
            </v-icon>
            {{ item.data.name }}
          </template>
          <template #item="{ item }">
            <v-icon
              :color="item.data.editor.color"
              left>
              {{ item.data.editor.icon }}
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
          color="error"
          text
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
import { holdTypes, findType } from '../utils/holds'
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
      oldForm: Object.assign({}, defaultHoldForm),
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
    holdType() {
      if (this.hold === undefined) return undefined
      else return findType(this.hold.type)
    }
  },
  methods: {
    ...mapActions(['addHold', 'updateHold', 'removeHold']),
    tryAdd() {
      if (this.hold === undefined) {
        this.addHold({
          x: this.x,
          y: this.y
        })
      }
    },
    update() {
      if (!this.threeAxisScale) {
        this.form.yScale = this.form.xScale
        this.form.zScale = this.form.xScale
      }
      if (this.oldForm.type !== this.form.type)
        this.removeGeometry()

      this.updateHold({
        type: this.form.type,
        position: {
          x: this.x,
          y: this.y,
          z: parseFloat(this.form.z),
        },
        rotation: {
          x: this.form.xRotation,
          y: this.form.yRotation,
          z: this.form.zRotation,
        },
        scale: {
          x: this.form.xScale,
          y: this.form.yScale,
          z: this.form.zScale
        }
      })
      Object.assign(this.oldForm, this.form)
    },
    abortUpdate() {
      Object.assign(this.form, this.oldForm)
    },
    remove() {
      this.removeGeometry()
      this.removeHold({
        x: this.x,
        y: this.y
      })
      Object.assign(this.form, defaultHoldForm)
    },
    removeGeometry() {
      this.$emit('remove', `hold-${this.x}-${this.y}`)
    }
  }
}
</script>
