<template>
  <b-container>
    <!-- <h3>
      {{ title }}:
      <slot></slot>
    </h3> -->
    <b-col v-for="r in familyRecipes" :key="r.id">
      <RecipePreview class="familyRecipePreview" :recipe="r" type="My Recipes" />
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "FamilyRecipePreviewList",
  components: {
    RecipePreview,
  },
  //   props: {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  data() {
    return {
      familyRecipes: [],
    };
  },
  mounted() {
    this.showRecipes();
  },
  methods: {
    async showRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/profile/familyRecipes"
        );

        // console.log(response);
        let familyRecipes_ = response.data;
        familyRecipes_.forEach((element) => {
          element.image =
            "https://res.cloudinary.com/dc9fdssoo/image/upload/" +
            element.image;
        });

        // const familyRecipes_ = response.data;

        console.log(response);
        this.familyRecipes.push;
        this.familyRecipes = [];

        this.familyRecipes.push(...familyRecipes_);
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
