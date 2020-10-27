<template>
  <router-link
    :to="{
      name: 'PersonalViewPage',
      params: { type: 'family', recipeId: recipe.recipe_id },
    }"
    class="recipe-preview"
  >
    <!-- <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div> -->
    <div class="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <link
        href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:400,800"
        rel="stylesheet"
      />
      <div class="card">
        <div class="card-header">
          <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
        </div>
        <div class="card-body">
          <img
            :src="recipe.image"
            class="recipe-image"
            style="width:300px;height:200px;"
          />
        </div>
        <div class="card-footer">
          <ul class="recipe-overview">
            <li>{{ recipe.readyInMinutes }} minutes</li>
          </ul>
          <ul class="recipe-overview">
            <li>Vegan: {{ recipe.vegan }}</li>
            <li>Vegetarian: {{ recipe.vegetarian }}</li>
            <li>Gluten Free: {{ recipe.glutenFree }}</li>
          </ul>
          <br />
          <!-- <AddRecipeToFavorite v-on:random-click-event="updateRecipes"></AddRecipeToFavorite> -->
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  name: "FamilyRecipePreview",
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
