<template>
  <v-container>
    <client-only>
      <v-data-table
        v-model="selected"
        item-key="letterId"
        dense
        show-select
        :headers="headers"
        :items="letters"
        :search="search"
        no-data-text="Писем пока нет"
        :footer-props="{
          itemsPerPageOptions: [25,50,100,-1],
          itemsPerPageText: 'Строк на страницу',
          itemsPerPageAllText: 'Все'
        }"
        @click:row="rowClick"
      >
        <template #top>
          <v-row
            align="center"
            class="px-5"
          >
            <v-switch
              v-model="publicSelect"
              :label="publicSelect ? 'Опубликованные' : 'Не опубликованные'"
              class="pa-3"
              @change="getLetters"
            />
            <v-spacer />
            <v-btn
              icon
              large
              :disabled="selected == '' || currentRole == 'Гость'"
              :color="selected ? 'red' : ''"
              @click="deleteMany"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
              hide-details
            />
          </v-row>
        </template>
        <template
          #item.letterDate="{ item }"
        >
          {{ new Date(item.letterDate).toLocaleString("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }) }}
        </template>
      </v-data-table>
    </client-only>
    <v-dialog
      v-model="letterDialog"
      max-width="750"
    >
      <v-card>
        <v-card-title>
          {{ letter.letterId }}
          <v-spacer />
          <v-chip
            class="ma-2"
            color="primary"
          >
            {{ letter.letterCategory }}
          </v-chip>
          <v-spacer />
          <v-avatar v-if="letter.letterAvatar" left class="mr-4">
            <v-img :src="letter.letterAvatar" />
          </v-avatar>
          {{ letter.letterName }}
        </v-card-title>
        <v-card-text>
          <div v-if="letter.letterEmail" class="text-right text--primary">
            <v-row align="center" justify="end">
              <v-switch
                v-model="notice"
                label="Уведомить"
                class="mr-3"
              />
              {{ letter.letterEmail }}
            </v-row>
          </div>
          <div v-else class="text-right text--primary">
            Почта не указана
          </div>
          <div class="text-center text-h5 font-weight-medium mb-3">
            {{ letter.letterTitle }}
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text--primary body-1 letter-text" v-html="letter.letterText" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="letterDialog = false"
          >
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn
            color="grey"
            text
            :disabled="currentRole == 'Гость'"
            @click="deleteLetterConfirm"
          >
            Удалить
          </v-btn>
          <v-btn
            v-if="!letter.letterPublic"
            color="indigo darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="publicLetter(true)"
          >
            Опубликовать
          </v-btn>
          <v-btn
            v-else
            color="red darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="publicLetter(false)"
          >
            Снять с публикации
          </v-btn>
          <v-btn
            color="teal darken-1"
            text
            :disabled="currentRole == 'Гость'"
            @click="editLetter"
          >
            Редактировать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          <div class="text-center" style="width: 100%">
            Уверены?
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="deleteDialog = false"
          >
            Нет
          </v-btn>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="deleteLetter"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      max-width="900"
    >
      <v-card>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="editDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Редактирование письма № {{ letter.letterId }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="saveEditedLetter"
            >
              Сохранить
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <form class="mt-5">
            <v-row align="start">
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="letter.letterName"
                  label="От кого письмо"
                  outlined
                  hide-details
                >
                  <template #append-outer>
                    <div v-if="!letter.letterAvatar">
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
                        <v-img :src="letter.letterAvatar" />
                      </v-avatar>
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="letter.letterEmail"
                  label="E-mail"
                  outlined
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="letter.letterTitle"
                  label="Заголовок"
                  outlined
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-select
                  v-model="letter.letterCategory"
                  :items="categories"
                  label="Выберите рубрику"
                  outlined
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <client-only>
                  <VueEditor
                    v-model="letter.letterText"
                    placeholder="Напишите что-нибудь..."
                    :editor-toolbar="customToolbar"
                  />
                </client-only>
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="avatarDialog"
      transition="dialog-top-transition"
      max-width="490"
    >
      <v-card class="pa-4">
        <v-text-field
          v-model="letter.letterAvatar"
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
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'check',
  data () {
    return {
      search: '',
      notice: true,
      publicSelect: false,
      letterDialog: false,
      editDialog: false,
      deleteDialog: false,
      avatarDialog: false,
      selected: [],
      letters: [],
      letter: {},
      currentRole: '',
      routeProps: {
        limit: 30,
        skip: 0
      },
      headers: [
        {
          text: '№ письма',
          align: 'start',
          sortable: false,
          value: 'letterId'
        },
        { text: 'От кого', value: 'letterName' },
        { text: 'Заголовок', value: 'letterTitle' },
        { text: 'Категория', value: 'letterCategory' },
        { text: 'Дата', value: 'letterDate' }
      ],
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
  fetch () {
    this.getLetters()
    this.currentRole = this.$store.getters.get_role
  },
  head () {
    return {
      title: 'Панель администратора'
    }
  },
  computed: {
    categories () { return this.$store.getters.get_categories }
  },
  methods: {
    async getLetters () {
      const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip + '/' + this.publicSelect)
      this.letters = response.data
    },
    clearAvatar () {
      this.avatarDialog = false
      this.avatar = ''
    },
    rowClick (item, row) {
      this.letter = item
      row.select(true)
      this.letterDialog = true
    },
    editLetter () {
      this.letterDialog = false
      this.editDialog = true
    },
    async saveEditedLetter () {
      const id = this.letter._id
      const data = {
        letterName: this.letter.letterName,
        letterEmail: this.letter.letterEmail,
        letterTitle: this.letter.letterTitle,
        letterCategory: this.letter.letterCategory,
        letterText: this.letter.letterText,
        letterAvatar: this.letter.letterAvatar
      }
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/update', { id, data })
      this.editDialog = false
      this.letterDialog = true
    },
    async publicLetter (val) {
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/public/' + this.letter._id + '/' + val)
      this.letterDialog = false
      this.selected = []
      this.getLetters()
      if (this.letter.letterEmail !== '' && this.notice) { this.mailer(val) }
      this.notice = true
    },
    deleteLetterConfirm () {
      this.letterDialog = false
      this.deleteDialog = true
    },
    async deleteLetter () {
      await this.$axios.delete(process.env.VUE_APP_SERVER + '/api/records/delete/' + this.letter._id)
      this.deleteDialog = false
      this.selected = []
      this.getLetters()
    },
    async deleteMany () {
      const sel = this.selected
      const ids = []
      sel.forEach(function (item, i, sel) { ids.push(item._id) })
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/delmany', { ids })
      this.selected = []
      this.getLetters()
    },
    async mailer (val) {
      const text = val ? 'Ваше письмо №' + this.letter.letterId + ' опубликовано' : 'Ваше письмо №' + this.letter.letterId + ' снято с публикации'
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/records/mailer', {
        email: this.letter.letterEmail,
        text
      })
    }
  }
}
</script>

<style>
  .v-data-table__wrapper table tbody tr {cursor: pointer}
</style>
