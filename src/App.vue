<template>
  <v-app>
    <v-app-bar
      elevation="0"
      color="white"
      dense
      app>
      <v-toolbar-title>Slope</v-toolbar-title>
      <v-spacer/>
      <v-btn
        color="primary"
        to="/studio"
        depressed
        rounded>
        Studio
      </v-btn>
    </v-app-bar>

    <router-view :key="$route.fullPath"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  metaInfo () {
    return {
      title: `Slope`,
      meta: [
        {
          property: 'og:title',
          content: `Slope`
        },
        {
          property: 'og:description',
          content: 'Model routes like a pro'
        },
        {
          property: 'og:url',
          content: `https://slope.netlify.app`
        }
      ]
    }
  }
}
</script>
