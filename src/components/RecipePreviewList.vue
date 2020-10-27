<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>

    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreviewWrapper class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewWrapper from "./RecipePreviewWrapper.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreviewWrapper,
  },
  props: {
    recipes: Array,
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    // this.updateRecipes();
  },
  methods: {
    // async updateRecipes() {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.BASE_URL + "/recipes/random"
    //     );
    //     const recipes_ = response.data;
    //     console.log(response);
    //     console.log(recipes_);
    //     this.recipes.push;
    //     this.recipes = [];
    //     this.recipes.push(...recipes_);
    //     console.log(this.recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
  width: 100%;
}
</style>
