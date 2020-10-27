<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-col v-for="r in recipes" :key="r.id">
      <RecipePreviewWrapper class="recipePreview" :recipe="r" />
    </b-col>
  </b-container>
</template>

<script>
import RecipePreviewWrapper from "./RecipePreviewWrapper.vue";
export default {
  name: "RecipePreviewListLastWatch",
  components: {
    RecipePreviewWrapper,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/profile/watchedList/top"
        );

        // console.log(response);
        const recipes_ = response.data;
        console.log(response);
        this.recipes.push;
        this.recipes = [];
        console.log("start check***********************");


        this.recipes.push;
        this.recipes = [];

        console.log("start check33333333***********************");

        this.recipes_.map((r) => {
          // this.recipes.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        // this.$forceUpdate();
        this.recipes.push(...this.recipes_);



        this.recipes.push(...recipes_);
        console.log("start check***********************");

        console.log(recipes_);

        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
