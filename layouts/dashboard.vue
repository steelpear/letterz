<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      dark
    >
      <nuxt-link to="/" target="_blank">
        <div class="logo_small text-center mb-6" style="cursor: pointer;">
          Письма
        </div>
      </nuxt-link>
      <v-list>
        <v-list-item
          nuxt
          to="/admin"
        >
          <v-list-item-icon>
            <v-icon large>
              mdi-email-multiple-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Письма</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          nuxt
          to="/accounts"
        >
          <v-list-item-icon>
            <v-icon large>
              mdi-account-multiple
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Аккаунты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="go-home">
        <v-divider />
        <v-btn
          plain
          large
          nuxt
          to="/"
          target="_blank"
          class="mt-3"
        >
          <v-icon large class="mr-3">
            mdi-home
          </v-icon>
          Перейти на сайт
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    logOut () {
      this.$store.dispatch('logout')
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.nuxt-link-active {
  text-decoration: none;
}
.go-home {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
</style>
