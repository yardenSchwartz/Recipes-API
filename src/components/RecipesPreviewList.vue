<template>
  <div class="prev-list-container">
    <div v-if="type == 'random'">
      <b-container>
        <h3 class="title_left">
          Explore Our Recipes:
          <slot></slot>
        </h3>

        <b-row>
          <b-col v-for="r in this.recipes" :key="r.recipe_id">
            <RecipePreviewWrapper class="recipePreview" :recipe="r" />
          </b-col>
        </b-row>
      </b-container>

      <br />
      <br />
      <RandomRecipesAction
        v-on:random-click-event="updateRecipes"
      ></RandomRecipesAction>
    </div>
    <div v-if="type == 'lastWatch'">
      <b-container>
        <h3
          style="text-align:left ; margin-left:50px; font-size:40px ; margin-bottom:20px;"
        >
          Last Watched:
          <slot></slot>
        </h3>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreviewWrapper class="recipePreview" :recipe="r" />
        </b-col>
      </b-container>
    </div>
  </div>
</template>

<script>
import RandomRecipesAction from "./RandomRecipesAction.vue";
import RecipePreviewWrapper from "./RecipePreviewWrapper.vue";

export default {
  name: "RecipesPreviewList",
  components: {
    RecipePreviewWrapper,
    // RecipePreviewList,
    RandomRecipesAction,
  },

  data() {
    return {
      recipes: [],
      promises: [],
      recipes_: [],
    };
  },
  watch: {
    isLogin: async function(newVal, lastVal) {
      if (newVal) {
        this.recipes.push;
        this.recipes = [];

        this.recipes_.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        this.recipes.push(...this.recipes_);
      }
      // console.log(1234567, { newVal, lastVal });
    },
  },
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    console.log("randomRecipePrev", "mounted");
    await this.updateRecipes();
    console.log(12345, this.recipes[0]);
  },
  beforeDestroy() {
    console.log("randomRecipePrev", "distroy");
  },
  methods: {
    async checkIfLogin(rec) {
      if (this.isLogin) {
        try {
          let responewatchedorfav;

          //favorite / watched
          try {
            // console.log(this.$route.params.recipeId);

            // console.log(111111111111, rec.recipe_id);
            responewatchedorfav = await this.axios.get(
              this.$root.store.BASE_URL +
                "/profile/recipeInfo/" +
                "[" +
                rec.recipe_id +
                "]"
            );
            // console.log("responewatchedorfav", responewatchedorfav);
            if (responewatchedorfav.status !== 200)
              this.$router.replace("/NotFound");
          } catch (error) {
            this.$router.replace("/NotFound");
            return;
          }
          rec.favorite = responewatchedorfav.data[rec.recipe_id].favorite;
          if (this.type != "lastWatch") {
            rec.watched = responewatchedorfav.data[rec.recipe_id].watched;
          }
          // console.log("****************************************");
          // console.log(222222222, rec.watched);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async updateRecipes() {
      try {
        let response = [];
        let isExistInGlobal = "false";
        if (this.type == "random") {
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/recipes/random"
          );

          if (response.status !== 200) {
            this.$router.replace("/NotFound");
          }
        } else {
          if (this.type == "lastWatch") {
            console.log("watcheList", this.$root.store.watchedList);
            if (
              this.$root.store.watchedList.length == 0 &&
              isExistInGlobal == "false"
            ) {
              // console.log("take from local storage");
              response = await this.axios.get(
                this.$root.store.BASE_URL + "/profile/watchedList/top"
              );
              console.log("after watcheList api");

              this.$root.store.watchedList = response.data;
              // localStorage.setItem(
              //   "watchedList",
              //   JSON.stringify(response.data)
              // );
            } else {
              // console.log("call API top watched list");

              this.recipes_ = this.$root.store.watchedList;
              isExistInGlobal = "true";
            }
          }
        }

        if (isExistInGlobal == "false") {
          this.recipes_ = response.data;
        }

        // console.log(response);
        // console.log(this.recipes_);
        this.recipes.push;
        this.recipes = [];

        // console.log("start check33333333***********************");

        this.recipes_.map((r) => {
          // this.recipes.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        // this.$forceUpdate();
        this.recipes.push(...this.recipes_);
        // if(!this.$root.store.lastWatch){
        //  console.log(this.$root.store.login);
        // this.$root.store.addWatchedList(this.recipes)
        // }
        // console.log(123123, this.recipes_);
        // console.log(11121212, this.recipes);
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
      }
    },
  },
};
</script>

<style>
#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

ul {
  list-style-type: none;
}

@import url("https://fonts.googleapis.com/css?family=Do+Hyeon");
.prev-list-container {
  font-family: "Do Hyeon", sans-serif;
  text-align: center;
}
.title_left {
  color: rgba(216, 191, 216, 0.993);
}
</style>
