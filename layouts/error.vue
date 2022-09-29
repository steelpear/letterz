<template>
  <v-row align="center" justify="center" class="white--text">
    <v-col cols="12" md="12" xs="12" class="text-center">
      <v-col cols="12" md="12" xs="12" class="text-center">
        <div class="logo_small text-center">
          Письма
        </div>
      </v-col>
      <v-col cols="12" md="12" xs="12" class="text-center">
        <h1 class="text-xs-center text-h1 font-weight-bold">
          404
        </h1>
      </v-col>
      <v-col cols="12" md="12" xs="12" class="text-center">
        <h1 class="text-xs-center text-h4">
          Страница не найдена
        </h1>
      </v-col>
      <v-col cols="12" md="12" xs="12" class="text-center">
        <p class="text-xs-center text-h5 mt-4">
          Сожалеем, но такой страницы не существует.
        </p>
      </v-col>
      <v-btn
        large
        outlined
        color="white"
        class="mt-4"
        nuxt
        to="/"
      >
        Перейти на главную
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
