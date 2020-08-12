<template>
  <v-app>
    <v-app-bar
      elevation="0"
      color="white"
      dense
      app>
      <v-toolbar-title>Slopest</v-toolbar-title>
      <v-spacer/>
      <v-btn
        class="gradient"
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
      title: `Slopest`,
      meta: [
        {
          property: 'og:title',
          content: `Slopest`
        },
        {
          property: 'og:description',
          content: 'Model routes like a pro'
        },
        {
          property: 'og:url',
          content: `https://slopest.netlify.app`
        }
      ]
    }
  }
}
</script>
