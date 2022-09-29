<template>
  <div>
    <v-container>
      <v-card
        elevation="4"
        max-width="800"
        class="mx-auto animate__animated animate__fadeIn"
        :class="$vuetify.breakpoint.xsOnly ? 'py-8' : 'pa-8 mb-8'"
      >
        <v-card-text>
          <v-row align="center" justify="center" class="pa-4">
            <v-avatar v-if="letter.letterAvatar" left class="mr-4">
              <v-img :src="letter.letterAvatar" />
            </v-avatar>
            <v-avatar v-else color="teal" left class="mr-4">
              <span class="white--text text-h5">{{ letter.letterName[0] }}</span>
            </v-avatar>
            <span class="text--primary text-body-1">{{ letter.letterName }}</span>
            <v-spacer />
          </v-row>
          <p class="text-h5 font-weight-medium blue-grey--text text--darken-3 mt-2 mb-4 text-center">
            {{ letter.letterTitle }}
          </p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text--primary text-body-1 letter-text" v-html="letter.letterText" />
        </v-card-text>
        <v-card-actions>
          <share :class="{'mx-auto' : $vuetify.breakpoint.xsOnly}" :url="url + '/letters/' + letter.letterId" :title="letter.letterTitle" />
          <v-btn
            v-clipboard:copy="url + $route.path"
            v-clipboard:success="onCopy"
            icon
            class="d-none d-sm-flex"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            icon
            class="d-none d-sm-flex ml-0"
            @click="openQr = true"
          >
            <v-icon>mdi-qrcode-scan</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="openQr" max-width="310">
      <v-card class="text-center">
        <qr-code :value="url + $route.path" />
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="copied"
      timeout="2500"
      top
      dark
      rounded
      color="orange darken-1"
    >
      <span class="text-body-1">Ссылка скопирована в буфер обмена</span>
      <v-btn
        dark
        icon
        @click="copied = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-spacer>
    </v-snackbar>
  </div>
</template>

<script>
import Share from '~/components/Share.vue'
import QrCode from '~/components/QrCode.vue'
export default {
  components: {
    Share,
    QrCode
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, params, error }) {
    try {
      const letter = await $axios.$get(process.env.VUE_APP_SERVER + '/api/records/findpublic/' + params.id)
      if (letter.length !== 0) { return { letter } } else { return error }
    } catch (e) {
      error({ statusCode: 404, message: 'Letter not found' })
    }
  },
  data () {
    return {
      copied: false,
      openQr: false
    }
  },
  head () {
    return {
      title: this.letter.letterTitle
    }
  },
  computed: {
    url () { return process.env.VUE_APP_URL }
  },
  mounted () {
    this.$vuetify.goTo(0)
  },
  methods: {
    onCopy () {
      this.copied = true
    }
  }
}
</script>
