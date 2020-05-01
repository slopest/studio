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
    <v-card>
      <v-card-text>
        <span class="subtitle-1 black--text">{{ x }}; {{ y }}</span>
        <v-text-field
          v-model="form.z"
          label="Z tilt"
          type="number"/>
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
      },
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
    tryAdd() {
      if (this.hold === undefined) {
        this.addHold({
          x: this.x,
          y: this.y,
          z: this.form.z,
          type: this.form.type
        })
      }
    },
    remove() {
      this.removeHold({
        x: this.hold.x,
        y: this.hold.y
      })
      this.form.type = 'sloper'
      this.form.z = 0
    }
  },
  watch: {
    form: {
      handler(value) {
        if (this.hold !== undefined) {
          this.updateHold({
            x: this.x,
            y: this.y,
            z: parseFloat(value.z),
            type: value.type
          })
        }
      },
      deep: true
    }
  }
}
</script>
