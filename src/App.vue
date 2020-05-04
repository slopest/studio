<template>
  <v-app>
    <v-app-bar
      dense
      app>
      <v-toolbar-title>Slope Studio</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view :key="$route.fullPath"/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
