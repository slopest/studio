<template>
  <div style="display: flex">
    <vgl-renderer
      ref="renderer"
      camera="camera"
      scene="scene"
      name="renderer"
      antialias>
      <vgl-scene
        ref="scene"
        name="scene">
        <vgl-mesh-standard-material
          name="wall-material"
          color="#EB984E"/>
        <vgl-plane-geometry
          name="wall"
          :width="width * 200"
          :height="height * 200"/>
        <vgl-mesh
          :position="`${100 + (width * 200 / 2)} ${100 + (height * 200 / 2)} 0`"
          name="wall-mesh"
          geometry="wall"
          material="wall-material"/>

        <hold-geometry
          v-for="hold in wallHolds"
          :key="`hold-${hold.position.x}-${hold.position.y}--geometry`"
          :hold="hold"/>
        <vgl-ambient-light intensity="0.5"/>
        <vgl-directional-light
          position="1 1 1"
          intensity="0.5"/>
      </vgl-scene>
      <vgl-perspective-camera
        ref="camera"
        name="camera"
        orbit-position="300 1.2 0"/>
    </vgl-renderer>
  </div>
</template>

<script>
import {
  VglRenderer, VglScene,
  VglPerspectiveCamera, VglAmbientLight, VglDirectionalLight ,
  VglPlaneGeometry, VglMesh, VglMeshStandardMaterial
} from 'vue-gl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import HoldGeometry from './HoldGeometry.vue'

export default {
  name: 'Preview',
  components: {
    VglRenderer, VglScene,
    VglPerspectiveCamera, VglAmbientLight, VglDirectionalLight,
    VglMesh, VglMeshStandardMaterial, VglPlaneGeometry,
    HoldGeometry
  },
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
      controls: undefined
    }
  },
  mounted() {
    this.controls = new OrbitControls(this.$refs.camera.inst, this.$refs.renderer.inst.domElement)
    this.controls.enableDamping = true
    this.animate()
  },
  methods: {
    removeHold(name) {
      let selected = this.$refs.scene.inst.getObjectByName(name)
      this.$refs.scene.inst.remove(selected)

      this.animate()
    },
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

<style>
  canvas {
    max-height: 80vh
  }
</style>
