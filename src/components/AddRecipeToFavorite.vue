<template>
  <div>
    <button v-on:click="$emit('random-click-event')"> random </button>
  </div>
</template>

<script>
export default {
  name: "AddRecipeToFavorite",
}
</script>

<style>

</style>