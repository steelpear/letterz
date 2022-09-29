<template>
  <v-container>
    <v-card class="elevation-0">
      <v-card-title>
        <v-spacer />
        <v-btn
          icon
          large
          :disabled="currentRole !== 'Администратор' && currentRole !== 'root'"
          @click.stop="addDialog = true"
        >
          <v-icon large>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <client-only>
          <v-expansion-panels v-model="openedPanel" focusable tile>
            <v-expansion-panel
              v-for="(account, i) in accounts"
              :key="i"
            >
              <v-expansion-panel-header ripple>
                <v-row>
                  <v-col cols="12" md="1">
                    {{ i + 1 }}
                  </v-col>
                  <v-col>{{ account.login }}</v-col>
                  <v-col>{{ account.role }}</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  align="center"
                  justify="space-between"
                  class="py-3"
                >
                  <v-col>
                    <v-text-field
                      v-model="newpassword"
                      label="Новый пароль"
                      hide-details
                      outlined
                      dense
                      :disabled="currentRole !== 'Администратор'"
                    />
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="newrole"
                      :items="roles"
                      menu-props="auto"
                      label="Новые права"
                      hide-details
                      outlined
                      single-line
                      dense
                      :disabled="currentRole !== 'Администратор' || account.role == 'Администратор'"
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      color="indigo"
                      tile
                      outlined
                      :disabled="!newpassword && !newrole"
                      @click="updateAccount(account._id)"
                    >
                      Сохранить изменения
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="red"
                      tile
                      outlined
                      :disabled="currentRole !== 'Администратор' || account.role == 'Администратор'"
                      @click="deleteAccount(account._id)"
                    >
                      Удалить аккаунт
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </client-only>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="addDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>
          <div class="text-center" style="width: 100%">
            Добавить аккаунт
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="login"
            label="Логин"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
          />
          <v-select
            v-model="role"
            :items="roles"
            menu-props="auto"
            label="Права"
            hide-details
            prepend-icon="mdi-text-box-plus-outline"
            single-line
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="addDialog = false"
          >
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn
            color="indigo darken-1"
            text
            @click="addAccount"
          >
            Добавить
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
      addDialog: false,
      login: '',
      password: '',
      newpassword: '',
      role: 'Гость',
      newrole: '',
      roles: ['Администратор', 'Модератор', 'Гость'],
      accounts: [],
      showPass: false,
      openedPanel: null,
      currentRole: ''
    }
  },
  fetch () {
    this.getAccounts()
    this.currentRole = this.$store.getters.get_role
  },
  head () {
    return {
      title: 'Аккаунты пользователей'
    }
  },
  methods: {
    async getAccounts () {
      const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/login')
      this.accounts = response.data
    },
    async addAccount () {
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/login/new', {
        login: this.login,
        password: this.password,
        role: this.role
      })
      this.addDialog = false
      this.getAccounts()
    },
    async deleteAccount (id) {
      await this.$axios.delete(process.env.VUE_APP_SERVER + '/api/login/delete/' + id)
      this.getAccounts()
    },
    async updateAccount (id) {
      let data = null
      if (this.newpassword && this.newrole) {
        data = { password: this.newpassword, role: this.newrole }
      } else if (this.newpassword && !this.newrole) {
        data = { password: this.newpassword }
      } else if (!this.newpassword && this.newrole) {
        data = { role: this.newrole }
      } else { return false }
      await this.$axios.post(process.env.VUE_APP_SERVER + '/api/login/update', { id, data })
      this.newpassword = ''
      this.newrole = ''
      this.openedPanel = null
      this.getAccounts()
    }
  }
}
</script>
