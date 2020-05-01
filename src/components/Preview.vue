<template>
  <div style="display: flex">
    <vgl-renderer
      ref="renderer"
      antialias>
      <vgl-scene ref="scene">
        <vgl-mesh-standard-material
          v-for="hold in holds"
          :key="`${hold.name}-material`"
          :name="`${hold.name}-material`"
          :color="hold.color"/>
        <vgl-mesh-standard-material
          name="screw-material"
          color="#B2BABB"/>
        <vgl-mesh-standard-material
          name="wall-material"
          color="#EB984E"/>
        <!--<vgl-obj-loader
          position="60 60 -10"
          name="hold"
          src="/holds/sloper.obj"/>
        <vgl-mesh
          geometry="hold"
          material="mat"/>-->

        <vgl-plane-geometry
          name="wall"
          :width="width * 20"
          :height="height * 20"/>
        <vgl-mesh
          :position="`${10 + (width * 20 / 2)} ${10 + (height * 20 / 2)} 0`"
          geometry="wall"
          material="wall-material"/>

        <hold-geometry
          v-for="hold in wallHolds"
          :key="`${hold.x}-${hold.y}-model`"
          :hold="hold"/>
        <vgl-ambient-light intensity="0.5"/>
        <vgl-directional-light
          position="1 1 1"
          intensity="0.5"/>
      </vgl-scene>
      <vgl-perspective-camera
        ref="camera"
        name="camera"
        orbit-position="200 1.5 0"/>
    </vgl-renderer>
  </div>
</template>

<script>
import { VglRenderer, VglScene, VglPlaneGeometry, VglMesh, VglMeshStandardMaterial, VglPerspectiveCamera, VglAmbientLight, VglDirectionalLight } from 'vue-gl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import HoldGeometry from './HoldGeometry.vue'
import holds from '../utils/holds'

export default {
  name: 'Preview',
  props: {
    wallHolds: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      holds
    }
  },
  components: { HoldGeometry, VglMesh, VglPlaneGeometry, VglRenderer, VglScene, VglMeshStandardMaterial, VglPerspectiveCamera, VglAmbientLight, VglDirectionalLight },
  mounted() {
    this.controls = new OrbitControls(this.$refs.camera.inst, this.$refs.renderer.inst.domElement)
    this.controls.enableDamping = true
    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.render()
    },
    render() {
      this.$refs.renderer.inst.render(this.$refs.scene.inst, this.$refs.camera.inst)
    }
  }
}
</script>
