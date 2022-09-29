<template>
  <div>
    <v-row align="center" justify="center" class="px-16">
      <v-col>
        <img src="message.png" width="220">
      </v-col>
      <v-col>
        <div class="logo_text px-3">
          Письма
        </div>
      </v-col>
      <v-col>
        <img src="message.png" width="220" style="transform: scale(-1, 1);">
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
  .logo_text {
    cursor: default;
    font-family: "Scriptorama", sans-serif;
    font-weight: 400;
    font-size: 190px;
    height: 300px;
    line-height: 100px;
    background: url('/logo-bkg.jpg') repeat-y;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: aitf 8s linear forwards;
    transform: translate3d(0,0,0);
    backface-visibility: hidden;
  }
@keyframes aitf {
  0% { background-position: 30% 50%; }
  100% { background-position: 100% 50%; }
}
</style>
