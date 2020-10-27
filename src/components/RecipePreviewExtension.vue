<template>
  <div>
    <p class="h1 mb-2">
      <b-icon-eye-fill
        v-if="recipe.watched == true"
        style=" position: absolute; top: 270px; left: 20;"
      ></b-icon-eye-fill>
    </p>
    <!-- <button
      class="circle"
      v-if="$root.store.username && recipe.favorite == false"
      type="button"
      style=" position: absolute; top: 50px; left: -10px;  font-size:40px;  "
      @click="addTofavorite()"
    >
      <b-icon-heart-fill
        style="color:white; position: absolute; top: 12px; left: 8;"
      ></b-icon-heart-fill>
    </button> -->
    <div
      @click="addTofavorite()"
      v-if="$root.store.username && cur_recipe.favorite == false"
      class="circle"
      style=" position: absolute; top: 50px; left: -10px;  "
    >
      <p class="h1 mb-2">
        <b-icon-heart-fill
          style="color:white; position: absolute; top: 12px; left: 8;"
        ></b-icon-heart-fill>
      </p>
    </div>
    <p class="h1 mb-2">
      <b-icon-heart-fill
        class="favorite"
        variant="danger"
        v-if="$root.store.username && cur_recipe.favorite == true"
        style=" position: absolute; top: 60px; left: 0px;  "
      ></b-icon-heart-fill>
    </p>
  </div>
</template>

<script>
export default {
  name: "RecipePreviewExtension",
  data() {
    return {
      cur_recipe: this.recipe,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async addTofavorite() {
      console.log("enter");
      let responseAfterAddFavorite;
      this.cur_recipe.favorite = true;
      let id = this.cur_recipe.recipe_id;
      //favorite / watched
      try {
        console.log("1");
        responseAfterAddFavorite = await this.axios.put(
          "http://localhost:4000/profile/favorite/add/" +
            this.cur_recipe.recipe_id
        );
        console.log("2");
        if (responseAfterAddFavorite.status !== 200)
          this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }

      // this.$root.store.favoriteList.push(cur_recipe);
      // console.log(this.$root.store.favoriteList);

      //  this.$root.store.favoriteList = [];
      // if (localStorage.favoriteList) {
      //   localStorage.removeItem("favoriteList");
      // }
      if(this.$root.store.favoriteList.length > 0){
        this.$root.store.favoriteList = [];
      }
      console.log("3");
      let _recipe = {
        instructions: this.cur_recipe.instructions,
        _instructions: this.cur_recipe._instructions,
        // analyzedInstructions,
        ingredients: this.cur_recipe.ingredients,
        vegetarian: this.cur_recipe.vegetarian,
        vegan: this.cur_recipe.vegan,
        glutenFree: this.cur_recipe.glutenFree,
        aggregateLikes: this.cur_recipe.aggregateLikes,
        readyInMinutes: this.cur_recipe.readyInMinutes,
        image: this.cur_recipe.image,
        title: this.cur_recipe.title,
        servings: this.cur_recipe.servings,
        favorite: true,
      };
      console.log("4");
      this.cur_recipe = _recipe;
      console.log("5");

      //update recipes array in local storage
      if (localStorage.search) {
        let recipesFromLocalStorage = JSON.parse(localStorage.search);
        let find = "false";
        for (
          let k = 0;
          k < recipesFromLocalStorage.length && find == "false";
          k++
        ) {
          if (recipesFromLocalStorage[k].recipe_id == id) {
            recipesFromLocalStorage[k].favorite = true;
            find = "true";
          }
        }

        if (find == "true") {
          console.log("b");
          localStorage.removeItem("search");
          localStorage.setItem(
            "search",
            JSON.stringify(recipesFromLocalStorage)
          );
          console.log("c");
        }
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");

.circle:hover {
  background-color: rgb(0, 0, 0, 0.7);
  border: 1px solid rgb(0, 0, 0, 0.7);
}
.circle {
  background-color: rgb(120, 120, 120, 0.7);
  border: 1px solid rgb(120, 120, 120, 0.7);
  height: 60px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 60px;
}
</style>
