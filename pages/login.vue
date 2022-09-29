<template>
  <v-container>
    <div class="logo_small abs text-center">
      Письма
    </div>
    <v-card class="pa-6 mx-auto" width="400">
      <form>
        <v-text-field
          v-model="login"
          :error-messages="loginErrors"
          prepend-icon="mdi-account"
          label="Логин"
          required
          clearable
          @blur="$v.login.$touch()"
        />
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          prepend-icon="mdi-lock"
          label="Пароль"
          required
          clearable
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
          @blur="$v.password.$touch()"
          @keyup.enter="submit"
        />
        <v-card-actions>
          <v-btn text color="indigo" @click="clear">
            Сбросить
          </v-btn>
          <v-spacer />
          <v-btn text color="indigo" @click="submit">
            Войти
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-snackbar
      v-model="errorAlert"
      timeout="2500"
      top
      dark
      color="red"
    >
      <v-row align="center" justify="space-around">
        <v-spacer />
        <div class="subtitle-1">
          Логин или пароль неверны!
        </div>
        <v-spacer />
        <v-btn
          dark
          icon
          @click="numberAlert = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-snackbar>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'empty',
  middleware: 'check',

  validations: {
    login: { required },
    password: { required }
  },

  data: () => ({
    login: '',
    password: '',
    errorAlert: false,
    showPass: false
  }),
  head () {
    return {
      title: 'Введите логин и пароль'
    }
  },
  computed: {
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }
      !this.$v.login.required && errors.push('Обязательное поле!')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Обязательное поле!')
      return errors
    }
  },
  created () {
    this.$axios.get(process.env.VUE_APP_SERVER + '/api/login')
      .then((response) => {
        if (response.data.length === 0) {
          this.$axios.post(process.env.VUE_APP_SERVER + '/api/login/new', {
            login: 'root',
            password: 'root',
            role: 'root'
          })
        }
      })
  },
  methods: {
    async submit () {
      const response = await this.$axios.post(process.env.VUE_APP_SERVER + '/api/login', {
        login: this.login,
        password: this.password
      })
      if (!response.data.state) {
        this.errorAlert = true
        this.clear()
      } else {
        this.$v.$touch()
        this.$store.dispatch('login')
        this.$store.dispatch('set_role', response.data.role)
        setTimeout(() => {
          this.$router.push('/admin')
        }, 1000)
      }
    },
    clear () {
      this.$v.$reset()
      this.login = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
  .abs {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
  }
</style>
