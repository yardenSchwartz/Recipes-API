<template>
  <div class="recipes-page-cont">
    <p class="title_">
      {{ this.title_ }}
    </p>
    <ul :style="gridStyle" class="card-list">
      <li v-for="(card, index) in recipes" class="card-item" :key="index">
        <RecipePreviewWrapper
          :recipe="card"
          :type="title_"
        ></RecipePreviewWrapper>
      </li>
    </ul>
  </div>
</template>

<script>
import RecipePreviewWrapper from "../components/RecipePreviewWrapper.vue";

export default {
  name: "RecipesPage",
  components: {
    RecipePreviewWrapper,
    // RecipePreviewList,
  },
  watch: {
    $route(to, from) {
      this.numberOfColumns = to.params.numberOfColumns;
      this.title = to.params.title;
      this.inStart();
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns_}, minmax(100px, 1fr))`,
      };
    },
  },
  props: {
    numberOfColumns: {
      type: Number,
      require: false,
    },
    title: { type: String, require: false },
  },
  data() {
    return {
      recipes: [],
      title_: "",
      numberOfColumns_: 3,
    };
  },
  async mounted() {
    await this.inStart();
  },
  methods: {
    async inStart() {
      try {
        console.log(1234567890000, this.title);
        console.log(1234567890000, this.numberOfColumns);
        let isExistInGlobal = "false";
        this.recipes = [];
        console.log("recipes", this.recipes);

        let response = [];
        let FullResponse = [];
        let recipes_ = [];
        console.log("title", this.title);
        console.log("title_", this.title_);

        if (this.title) {
          this.$root.store.recipePage = this.title;
        }
        //   if(!!this.title){
        //     this.title_=this.title;
        //   }
        //  console.log("title_",this.title_);

        //   if(!!this.numberOfColumns){
        //     this.numberOfColumns_=this.numberOfColumns;
        //   }
        this.title_ = this.$root.store.recipePage;
        console.log("title_", this.title_);
        if (this.title_ == "Favorite Recipes") {
          console.log("title is Favorite");
          // console.log(localStorage.favoriteList);

          if (
            this.$root.store.favoriteList.length == 0 &&
            isExistInGlobal == "false"
          ) {
            console.log("search in API");
            response = await this.axios.get(
              this.$root.store.BASE_URL + "/profile/favorite"
            );
            // localStorage.setItem("favoriteList", JSON.stringify(response.data));
            this.$root.store.favoriteList = response.data;
            console.log(
              "favorite - after store",
              this.$root.store.favoriteList
            );

            isExistInGlobal = "true";

            // recipes_ = JSON.parse(localStorage.favoriteList);
          } else {
            //  && isExistInGlobal == "false"
            recipes_ = this.$root.store.favoriteList;
          }
        }
        if (this.title_ == "Family Recipes") {
          console.log("title is family");
          console.log(this.$root.store.familyList);
          if (
            this.$root.store.familyList.length == 0 &&
            isExistInGlobal == "false"
          ) {
            console.log("search in API");
            response = await this.axios.get(
              this.$root.store.BASE_URL + "/profile/familyRecipes"
            );
            console.log("response", response);
            console.log("family - after server");
            let idsArray = [];

            for (let j = 0; j < 3; j++) {
              idsArray[j] = response.data[j].recipe_id;
            }

            console.log("search in API");
            FullResponse = await this.axios.get(
              this.$root.store.BASE_URL +
                "/profile/familyRecipes/" +
                "[" +
                idsArray +
                "]"
            );

            this.$root.store.familyList = FullResponse.data;
            console.log("family - after store", this.$root.store.familyList);

            isExistInGlobal = "true";

            //  localStorage.setItem("familyList", JSON.stringify(this.familyRecipe));
          } else {
            recipes_ = this.$root.store.familyList;
            // isExistInGlobal = "true";
          }
        }
        if (this.title_ == "My Recipes") {
          console.log("title is My");
          console.log(this.$root.store.myRecipesList);
          if (
            this.$root.store.myRecipesList.length == 0 &&
            isExistInGlobal == "false"
          ) {
            console.log("search in API");
            response = await this.axios.get(
              this.$root.store.BASE_URL + "/profile/myRecipes"
            );
            console.log("response", response);
            console.log("My - after server");
            let idsArray = [];

            for (let j = 0; j < 3; j++) {
              idsArray[j] = response.data[j].recipe_id;
            }

            console.log("search in API");
            FullResponse = await this.axios.get(
              this.$root.store.BASE_URL +
                "/profile/myRecipes/" +
                "[" +
                idsArray +
                "]"
            );

            this.$root.store.myRecipesList = FullResponse.data;
            console.log(
              "myRecipesList - after store",
              this.$root.store.myRecipesList
            );

            isExistInGlobal = "true";
          } else {
            recipes_ = this.$root.store.myRecipesList;
            // isExistInGlobal = "true";
          }
        }
        // if (this.title_ == "My Recipes") {
        //   response = await this.axios.get(
        //     this.$root.store.BASE_URL + "/profile/myRecipes"
        //   );

        //   console.log(123123123, response);
        // }

        if (isExistInGlobal == "true") {
          if (this.title_ == "My Recipes" || this.title_ == "Family Recipes") {
            recipes_ = FullResponse.data;
            console.log(123123123, FullResponse);
          } else {
            recipes_ = response.data;
          }

          console.log(1111, recipes_);
        }

        console.log(1111, recipes_);
        this.recipes.push;
        this.recipes = [];
        // this.$forceUpdate();
        this.recipes.push(...recipes_);
        console.log(1111, this.recipes);

        // else {
        //   console.log(1111, recipes_);
        //   this.recipes.push;
        //   this.recipes = [];
        //   this.recipes.push(...recipes_);
        //   console.log(1111, this.recipes);
        // }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.card-list {
  display: grid;
  grid-gap: 1em;
}

.card-item {
  /* background-color: dodgerblue; */
  padding: 2em;
}

/* body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
} */

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

ul {
  list-style-type: none;
}

@import url("https://fonts.googleapis.com/css2?family=Cookie&display=swap");
.title_ {
  text-align: left;
  font-family: "Cookie", cursive;
  font-size: 80px;
  font-weight: bolder;
  color: black;
  text-align: center;
}
.recipes-page-cont {
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
