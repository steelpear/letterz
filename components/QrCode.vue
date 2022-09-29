<template>
  <div>
    <vue-qrcode
      :value="value"
      :options="{
        width: 300
      }"
    />
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  components: { VueQrcode },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: String
  }
}
</script>
