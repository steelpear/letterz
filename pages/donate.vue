<template>
  <v-container
    class="letter_wrap rounded-xl py-12 my-12 elevation-12 text-h6 font-weight-light text--primary"
    :class="$vuetify.breakpoint.smAndDown ? 'px-5' : 'px-16'"
    style="line-height: 1.8rem;"
  >
    <div class="text-h4 text-center mb-5">
      Помощь сайту
    </div>
    <v-row align="start" justify="space-around">
      <v-col cols="12" xs="12" md="8">
        <p>
          <span class="first-letter">У</span>важаемые друзья!
          Мы затевали этот проект не для того, чтобы заработать на нём деньги.
          Монетизация человеческой искренности, чувств и эмоций - не наша специализация.
        </p>
        <p>
          Однако за аренду сервера и доменного имени нужно платить и мы были бы признательны вам за посильную помощь.
        </p>
        <p>
          Можете помочь деньгами? Отлично! Решили разместить письмо? Замечательно! Рассказали друзьям об этом сайте? Великолепно! Мы благодарны вам за любую помощь. Спасибо.
        </p>
      </v-col>
      <v-col cols="12" xs="12" md="4">
        <iframe
          src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&targets-hint=&default-sum=100&button-text=12&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410011206433601"
          width="100%"
          height="222"
          frameborder="0"
          allowtransparency="true"
          scrolling="no"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'Помощь сайту',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Уважаемые друзья! Мы затевали этот проект не для того, чтобы заработать на нём деньги. Монетизация человеческой искренности, чувств и эмоций - не наша специализация. Однако за аренду сервера и доменного имени нужно платить и мы были бы признательны вам за посильную помощь.'
        }
      ]
    }
  }
}
</script>
