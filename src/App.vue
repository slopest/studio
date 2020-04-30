<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Modest Studio</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {

    }
  }
};
</script>
