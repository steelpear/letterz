<template>
  <v-container
    class="letter_wrap rounded-xl py-12 my-12 elevation-12 text-h6 font-weight-light text--primary"
    :class="$vuetify.breakpoint.smAndDown ? 'px-5' : 'px-16'"
    style="line-height: 1.8rem;"
  >
    <div class="text-h4 text-center mb-5">
      Об этом сайте
    </div>
    <p>
      <span class="first-letter">К</span>азалось бы — какие ещё письма в наше время? Для деловой переписки есть электронная почта,
      для стремительного общения — социальные сети, для пространных мыслей, захватывающих путешествий и вдумчивой аналитики — блоги.
    </p>
    <p>
      Мне показалось, что в этом калейдоскопе белозубых улыбок, огромных объективов, экзотических фруктов, модных "луков", пранков и видеоклипов не худо было бы выбрать местечко, где можно просто написать письмо.
    </p>
    <p>
      Где стеснительный юноша может признаться в любви, коллектив поздравить своего коллегу с юбилеем,
      где можно поблагодарить врача, делавшего тебе операцию, где можно попросить о помощи, найти друга
      и, в конце-концов, просто поделиться своими мыслями со всеми.
    </p>
    <p>
      Пишите письма - это ничего не стоит и это бесценно.
    </p>
    <div class="text-right sign">
      С уважением, автор идеи — steelpear
      <v-avatar>
        <img
          src="steelpear.jpg"
          alt="steelpear"
        >
      </v-avatar>
    </div>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'Об этом сайте',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Казалось бы — какие ещё письма в наше время? Для деловой переписки есть электронная почта, для стремительного общения — социальные сети, для пространных мыслей, захватывающих путешествий и вдумчивой аналитики — блоги. Мне показалось, что в этом калейдоскопе белозубых улыбок, огромных объективов, экзотических фруктов, модных "луков", пранков и видеоклипов не худо было бы выбрать местечко, где можно просто написать письмо.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .sign {
    font-family: 'Neucha';
    font-size: 26px;
  }
</style>
