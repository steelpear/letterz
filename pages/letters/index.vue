<template>
  <container>
    <h1 class="text-center white--text">
      index
    </h1>
  </container>
</template>

<script>
export default {
  middleware ({ redirect }) {
    return redirect('/')
  }
}
</script>
