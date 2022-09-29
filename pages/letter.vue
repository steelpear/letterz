<template>
  <v-container
    class="letter_wrap rounded-xl py-12 my-12 elevation-12 text-body-1 text--primary"
    :class="$vuetify.breakpoint.smAndDown ? 'px-5' : 'px-16'"
  >
    <v-row align="center" justify="center">
      <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-center">
        <img src="letter.png" width="200" class="animate__animated animate__fadeInLeft">
      </v-col>
      <v-col class="text-center animate__animated animate__fadeIn">
        <div class="letter_title">
          Напишите письмо
        </div>
        <div class="text-caption mt-n1 text--secondary">
          <nuxt-link to="/rules">
            * Правила размещения писем
          </nuxt-link>
        </div>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-center">
        <img src="letter.png" width="200" class="animate__animated animate__fadeInRight" style="transform: scale(-1, 1);">
      </v-col>
    </v-row>
    <form>
      <v-row align="start">
        <v-col cols="12" md="6" sm="12" xs="12">
          <div class="text-h6 font-weight-regular mb-1">
            Ваше имя
          </div>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="40"
            required
            label="От кого письмо"
            outlined
            clearable
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          >
            <template #append-outer>
              <div v-if="!avatar">
                <v-tooltip
                  bottom
                >
                  <template #activator="{ on }">
                    <v-icon x-large style="margin-top: -8px;cursor: pointer;" v-on="on" @click="avatarDialog = true">
                      mdi-account-circle
                    </v-icon>
                  </template>
                  Ссылка на аватар
                </v-tooltip>
              </div>
              <div v-else>
                <v-avatar style="margin-top: -14px; cursor: pointer;" @click="avatarDialog = true">
                  <v-img :src="avatar" />
                </v-avatar>
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <div class="text-h6 font-weight-regular mb-1">
            Ваш E-mail <span class="caption">(по желанию)</span>
          </div>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            outlined
            clearable
            @input="$v.email.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="12" xs="12">
          <div class="text-h6 font-weight-regular mb-1">
            Заголовок письма
          </div>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="40"
            label="Заголовок"
            outlined
            clearable
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <div class="text-h6 font-weight-regular mb-1">
            Рубрика
          </div>
          <v-select
            v-model="category"
            :items="categories"
            label="Выберите рубрику"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row align="center" class="ma-1">
            <div class="text-h6 font-weight-regular">
              Текст письма
            </div>
            <v-spacer />
            <v-btn
              icon
              @click="clearText"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <client-only>
            <VueEditor
              v-model="text"
              placeholder="Напишите что-нибудь..."
              :editor-toolbar="customToolbar"
            />
          </client-only>
          <div class="text-caption mt-1 font-weight-regular">
            * Не прикрепляйте слишком большие изображения - письмо с таким изображением автоматически не будет опубликовано. Оптимальный размер изображения - до 70 kb.
          </div>
        </v-col>
      </v-row>
    </form>
    <v-row align="center">
      <v-col>
        <vue-recaptcha
          ref="recaptcha"
          sitekey="6LeM07oUAAAAAE7iDSN3QcTC-knepiStbZ7-GN90"
          :load-recaptcha-script="true"
          :class="{'recap' : $vuetify.breakpoint.smAndDown}"
          @verify="recaptchaOk"
        />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.lgAndUp" class="text-center">
        <img
          :class="sendImgClass"
          src="letter.png"
          width="200"
        >
      </v-col>
      <v-col :class="{'text-right' : $vuetify.breakpoint.smAndUp}">
        <client-only>
          <v-btn
            block
            :dark="!$v.$invalid"
            color="teal darken-3"
            elevation="2"
            x-large
            class="send_letter_btn py-9 px-6"
            :disabled="$v.$invalid"
            @click="sendLetter"
          >
            Отправить письмо
            <v-icon
              right
              large
              class="ml-6 d-none d-sm-flex"
            >
              mdi-email-multiple-outline
            </v-icon>
          </v-btn>
        </client-only>
      </v-col>
    </v-row>

    <v-dialog
      v-model="errorDialog"
      transition="dialog-top-transition"
      max-width="490"
    >
      <v-card class="pt-4">
        <v-img src="robot.jpg" />
        <p class="text-center text-h6 pt-2 mb-0">
          Пройдите проверку на робота, пожалуйста.
        </p>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            plain
            text
            @click="errorDialog = false"
          >
            Хорошо
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="avatarDialog"
      transition="dialog-top-transition"
      max-width="490"
    >
      <v-card class="pa-4">
        <v-text-field
          v-model="avatar"
          label="Ссылка на аватар"
          hint="Например: https://cdn.vuetifyjs.com/images/john.png"
          persistent-hint
          outlined
          clearable
          prepend-inner-icon="mdi-link-variant"
        />
        <v-card-actions>
          <v-btn
            color="red"
            text
            @click="clearAvatar"
          >
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn
            color="indigo"
            text
            @click="avatarDialog = false"
          >
            Применить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="sendedDialog"
      transition="dialog-top-transition"
      max-width="550"
    >
      <v-card class="pa-6" img="background.jpg">
        <div class="text-h3 text-center mb-2 red--text" style="font-family: 'Neucha' !important;">
          Спасибо за письмо!
        </div>
        <div class="text-h6 text-center text--secondary">
          После проверки нашим модератором оно будет опубликовано по адресу:
        </div>
        <div class="text-center my-3">
          <a :href="url + '/letters/' + id" target="_blank">{{ url + '/letters/' + id }}</a>
          <v-btn
            v-clipboard:copy="url + '/letters/' + id"
            v-clipboard:success="onCopy"
            icon
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
        <div class="text-subtitle-2 text--secondary">
          <v-icon class="mr-2">
            mdi-email-multiple-outline
          </v-icon>
          Уведомление о публикации придёт на электронную почту, если Вы её указывали.
        </div>
        <nuxt-link to="/rules">
          <div class="text-caption text-center">
            Правила размещения писем
          </div>
        </nuxt-link>

        <v-card-actions>
          <v-btn
            color="indigo"
            text
            @click="sendedDialog = false"
          >
            Закрыть
          </v-btn>
          <v-spacer />
          <v-btn
            color="indigo"
            text
            @click="newLetter()"
          >
            Новое письмо
          </v-btn>
        </v-card-actions>
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
    </v-snackbar>
    <v-snackbar
      v-model="tooLarge"
      timeout="5000"
      top
      dark
      rounded
      color="red darken-1"
    >
      <span class="text-body-1">Ошибка! Возможно прикреплённое изображение слишком большое.</span>
      <v-btn
        dark
        icon
        @click="tooLarge = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: {
    VueRecaptcha
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(40) },
    text: { required },
    email: { email },
    title: { required, maxLength: maxLength(40) }
  },
  data () {
    return {
      name: '',
      email: '',
      title: '',
      category: 'Для всех',
      text: '',
      avatar: '',
      recaptcha: false,
      errorDialog: false,
      sended: false,
      copied: false,
      avatarDialog: false,
      sendedDialog: false,
      id: '',
      tooLarge: false,
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image']
      ]
    }
  },
  head () {
    return {
      title: 'Напишите письмо',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'На этой странице Вы можете написать своё письмо. Пожалуйста, предварительно ознакомьтесь с правилами размещения писем.'
        }
      ]
    }
  },
  computed: {
    categories () { return this.$store.getters.get_categories },
    url () { return process.env.VUE_APP_URL },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.maxLength && errors.push('Не более 40 символов')
      !this.$v.name.required && errors.push('Обязательное поле')
      return errors
    },
    // textErrors () {
    //   const errors = []
    //   if (!this.$v.text.$dirty) { return errors }
    //   !this.$v.text.required && errors.push('Обязательное поле')
    //   return errors
    // },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Введите правильный email')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) { return errors }
      !this.$v.title.maxLength && errors.push('Не более 40 символов')
      !this.$v.title.required && errors.push('Обязательное поле')
      return errors
    },
    sendImgClass () {
      let cl = ''
      if (!this.$v.$invalid) {
        cl = 'send_img_100'
      } else if (this.sended) {
        cl = 'send_img_100 animate__animated animate__fadeOutTopRight'
      } else {
        cl = 'send_img_50 animate__animated animate__slideInDown'
      }
      return cl
    }
  },
  methods: {
    recaptchaOk () {
      this.recaptcha = true
    },
    clearText () {
      this.text = ''
      this.tooLarge = false
    },
    openLetter (id) {
      this.$router.push('/letters/' + id)
    },
    newLetter () {
      this.sendedDialog = false
      this.$vuetify.goTo(0)
    },
    clearAvatar () {
      this.avatarDialog = false
      this.avatar = ''
    },
    async sendLetter () {
      if (!this.recaptcha) {
        this.errorDialog = true
      } else {
        this.sended = true
        setTimeout(() => { this.sended = false }, 1500)
      }
      const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/count')
      this.id = response.data + 200
      try {
        await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records', {
          letterId: this.id,
          letterName: this.name,
          letterEmail: this.email,
          letterTitle: this.title,
          letterCategory: this.category,
          letterText: this.text,
          letterAvatar: this.avatar,
          letterDate: new Date(),
          letterPublic: false
        })
        this.clearForm()
        this.recaptcha = false
        this.$refs.recaptcha.reset()
        this.mailer()
        setTimeout(() => {
          this.sendedDialog = true
        }, 2500)
      } catch (e) {
        this.tooLarge = true
      }
    },
    clearForm () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.title = ''
      this.category = 'Для всех'
      this.text = ''
      this.avatar = ''
    },
    async mailer () {
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/mailer', {
        email: 'steelpear@gmail.com',
        text: 'Новое письмо №' + this.id
      })
    },
    onCopy () { this.copied = true }
  }
}
</script>

<style lang="scss" scope>
  .letter_wrap {
    background: white;
    .letter_title {
      font-family: 'Neucha';
      font-size: 3rem;
      line-height: 3rem;
    }
    .send_letter_btn {
      font-family: 'Neucha';
      font-size: 22px;
    }
    .send_img_50 { transition: opacity .2s; opacity: .5; }
    .send_img_100 { transition: opacity .2s; opacity: 1; }
    .recap div {
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
