<template>
  <div id="editor--ui">
    <v-app-bar
      id="editor--bar"
      elevation="0"
      color="white"
      extended
      app
      dense>
      <v-btn
        icon
        @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Slope Studio</v-toolbar-title>
      <v-spacer/>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            icon
            color="primary"
            v-on="on">
            <v-icon>mdi-download-outline</v-icon>
          </v-btn>
        </template>
        <span>Import route definition</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            icon
            color="primary"
            v-on="on">
            <v-icon>mdi-upload-outline</v-icon>
          </v-btn>
        </template>
        <span>Download route definition</span>
      </v-tooltip>
      <v-spacer/>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            color="primary"
            icon
            v-on="on">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>Route details</span>
      </v-tooltip>

      <template #extension>
        <v-row>
          <v-spacer/>
          <v-btn-toggle
            v-model="view"
            class="mb-1"
            borderless>
            <v-tooltip
              v-for="item in views"
              :key="item.name"
              bottom>
              <template #activator="{ on }">
                <v-btn
                  icon
                  v-on="on">
                  <v-icon
                    v-for="icon in item.icons"
                    :key="item.name + icon">
                    {{ icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-row>
      </template>
    </v-app-bar>
    <v-content>
      <v-container>
        <div class="editor--container">
          <div
            v-if="views[view].parts.editor"
            class="editor--container__item">
            <h2>Editor</h2>
            <v-row>
              <v-col cols="12">
                <v-slider
                  v-model="width"
                  prepend-icon="mdi-arrow-left-right"
                  label="Width"
                  min="1"
                  max="25"
                  thumb-label/>
                <v-slider
                  v-model="height"
                  prepend-icon="mdi-arrow-up-down"
                  label="Height"
                  min="2"
                  max="55"
                  thumb-label/>
              </v-col>
              <v-col
                cols="12"
                class="editor--grid">
                <v-row
                  v-for="y in height"
                  :key="y"
                  justify="center">
                  <hold-edit
                    v-for="x in width"
                    :key="`hold-${x}-${y}--editor`"
                    :x="x"
                    :y="y"
                    @remove="$refs.preview.removeHold($event)"/>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="views[view].parts.preview"
            :style="views[view].parts.editor ? 'max-width: 50%' : ''"
            class="editor--container__item">
            <h2>Preview</h2>
            <preview
              ref="preview"
              :wall-holds="holds"
              :height="height"
              :width="width"/>
          </div>
        </div>
      </v-container>
    </v-content>
    <v-footer app>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
      <v-spacer/>
      <div>&copy; {{ new Date().getFullYear() }}, Slope</div>
    </v-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Preview from '@/components/Preview'
import HoldEdit from '@/components/HoldEdit'

export default {
  name: 'Editor',
  components: { Preview, HoldEdit },
  data () {
    return {
      views: [
        {
          name: 'Graphical editor',
          icons: [ 'mdi-grid' ],
          parts: {
            editor: true,
            preview: false,
            code: false
          }
        },
        {
          name: 'Editor and preview',
          icons: [ 'mdi-grid', 'mdi-image-outline' ],
          parts: {
            editor: true,
            preview: true,
            code: false
          }
        },
        {
          name: 'Route preview',
          icons: [ 'mdi-image-outline' ],
          parts: {
            editor: false,
            preview: true,
            code: false
          }
        },
        {
          name: 'Generated code',
          icons: [ 'mdi-code-json' ],
          parts: {
            editor: false,
            preview: false,
            code: true
          }
        }
      ],
      view: 1,

      height: 11,
      width: 5
    }
  },
  computed: mapState(['holds']),
  metaInfo () {
    return {
      title: `Slope Studio`,
      meta: [
        {
          property: 'og:title',
          content: `Slope Studio`
        },
        {
          property: 'og:description',
          content: 'The graphical editor for the Slope route modeling'
        },
        {
          property: 'og:url',
          content: `https://slope.netlify.app/studio`
        }
      ]
    }
  }
}
</script>
