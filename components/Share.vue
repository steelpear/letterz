<template>
  <div>
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="url"
      :title="title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitter-user="sharing.twitterUser"
      class="mx-1"
    >
      <v-icon>{{ network.icon }}</v-icon>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    url: String,
    // eslint-disable-next-line vue/require-default-prop
    title: String
  },
  data () {
    return {
      sharing: {
        description: 'Сайт "Ваши письма" — это место, где можно признаться в любви, поздравить своего коллегу с юбилеем, поблагодарить врача, делавшего тебе операцию, попросить о помощи, найти друга и просто поделиться своими мыслями со всеми.',
        quote: 'Пишите письма - это ничего не стоит и это бесценно.',
        hashtags: 'письмо, поздравление, благодарность',
        twitterUser: ''
      },
      networks: [
        { network: 'twitter', icon: 'fab fah fa-lg fa-twitter' },
        { network: 'telegram', icon: 'fab fah fa-lg fa-telegram-plane' },
        { network: 'facebook', icon: 'fab fa-facebook-f' },
        { network: 'vk', icon: 'fab fah fa-lg fa-vk' },
        { network: 'odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki' },
        { network: 'whatsapp', icon: 'fab fah fa-lg fa-whatsapp' },
        { network: 'pinterest', icon: 'fab fah fa-lg fa-pinterest' }
      ]
    }
  }
}
</script>
