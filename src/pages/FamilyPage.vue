<template>
  <div class="container">
    <h1 class="title">{{ header }}</h1>
       <div class="logoarea pt-5 pb-5">
          <FamilyRecipePreviewList title="All my family Recipes"
          class= "AllMyFamilyRecipesCenter"/>
        </div>
  </div>
</template>

<script>
import FamilyRecipePreviewList from "../components/FamilyRecipePreviewList";

export default {
   components: {
    FamilyRecipePreviewList,
  },
  data() {
    return {
      header: "Family Page",
    };
  },
};
</script>

<style></style>
