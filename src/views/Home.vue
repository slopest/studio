<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2>Editor</h2>
        <v-row>
          <v-col cols="12">
            <v-slider
              v-model="width"
              min="1"
              max="25"
              label="Width"
              prepend-icon="mdi-arrow-left-right"
              thumb-label/>
            <v-slider
              v-model="height"
              min="2"
              max="55"
              label="Height"
              prepend-icon="mdi-arrow-up-down"
              thumb-label/>
          </v-col>
          <v-col
            cols="12"
            style="display: flex; flex-direction: column-reverse">
            <v-row
              v-for="y in height"
              :key="y">
              <hold-edit
                v-for="x in width"
                :key="`${x}-${y}-btn`"
                :x="x"
                :y="y"
                @remove="$refs.preview.removeHold($event)"/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <div style="max-width: 50%">
        <h2>Preview</h2>
        <preview
          ref="preview"
          :wall-holds="holds"
          :height="height"
          :width="width"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Preview from '../components/Preview'
import HoldEdit from '../components/HoldEdit'

export default {
  name: 'Home',
  components: { Preview, HoldEdit },
  data () {
    return {
      height: 11,
      width: 5,
      controls: undefined
    }
  },
  computed: mapState(['holds'])
}
</script>

<style>
  canvas {
    max-height: 80vh
  }
</style>
