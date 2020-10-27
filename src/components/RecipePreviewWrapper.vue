<template>
  <div>
    <div v-if="type != 'My Recipes' && type != 'Family Recipes'">
      <RecipePreviewExtension :recipe="cur_recipe"></RecipePreviewExtension>
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: this.cur_recipe.recipe_id },
        }"
        class="recipe-preview"
      >
        <RecipePreview :recipe="cur_recipe" :type="type"></RecipePreview>
      </router-link>
    </div>
    <div v-else>
      <router-link
        v-if="type == 'My Recipes'"
        :to="{
          name: 'PersonalViewPage',
          params: { type: 'my', recipeId: cur_recipe.recipe_id },
        }"
        class="recipe-preview"
      >
        <RecipePreview :recipe="cur_recipe" :type="type"></RecipePreview>
      </router-link>

      <router-link
        v-else
        :to="{
          name: 'PersonalViewPage',
          params: { type: 'family', recipeId: cur_recipe.recipe_id },
        }"
        class="recipe-preview"
      >
        <RecipePreview :recipe="cur_recipe" :type="type"></RecipePreview>
      </router-link>
    </div>
  </div>
</template>

<script>
var selected = "js-is-selected";
import RecipePreview from "./RecipePreview.vue";
import RecipePreviewExtension from "./RecipePreviewExtension.vue";
export default {
  components: {
    RecipePreview,
    RecipePreviewExtension,
  },
  watch: {
    recipe: async function(newVal, lastVal) {
      if (newVal) {
        this.cur_recipe = newVal;
      }
    },
  },
  name: "RecipePreviewWrapper",
  async mounted() {
    console.log("enter to RecipePreviewWrapper mounted func:", this.cur_recipe);
    this.cur_recipe = this.recipe;
    console.log(
      "exit from RecipePreviewWrapper mounted func:",
      this.cur_recipe
    );
  },
  data() {
    return {
      image_load: false,
      cur_recipe: this.recipe,
    };
  },
  props: {
    type: {
      type: String,
      required: false,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped></style>