<template>
  <div style="display: flex">
    <vgl-renderer
      ref="renderer"
      antialias>
      <vgl-scene ref="scene">
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

        <template v-for="hold in holds">
          <vgl-sphere-geometry
            :key="`${hold.x}-${hold.y}-model`"
            :name="`hold-${hold.x}-${hold.y}`"
            radius="2"
            width-segments="64"
            height-segments="32"/>
          <vgl-mesh
            :key="`${hold.x}-${hold.y}-mesh`"
            :geometry="`hold-${hold.x}-${hold.y}`"
            :position="`${hold.x * 20} ${hold.y * 20} ${hold.z * 20}`"
            material="screw-material"/>
        </template>
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
import { VglRenderer, VglScene, VglPlaneGeometry, VglMeshStandardMaterial, VglPerspectiveCamera, VglMesh, VglSphereGeometry, VglAmbientLight, VglDirectionalLight } from 'vue-gl'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  name: 'Preview',
  props: {
    holds: {
      type: Object,
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
  components: { VglSphereGeometry, VglPlaneGeometry, VglRenderer, VglScene, VglMeshStandardMaterial, VglPerspectiveCamera, VglMesh, VglAmbientLight, VglDirectionalLight },
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
