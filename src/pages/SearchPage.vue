<template>
  <div class="search">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <br />
    <br />
    <h1 class="searchTitle">{{ header }}:</h1>

    <FormSearch v-on:search-click-event="Search" v-on:reset-click-event="Reset">
    </FormSearch>
    <br />
    <br />
    <br />
    <div></div>
    <br />

    <div class="sort" v-if="this.aftersearch == 'true'">
      Sort By:
      <b-button-group>
        <b-button
          class="btn-sort"
          style=" margin: 10px;"
          v-on:click="orderByLikes()"
          >Likes</b-button
        >
        <b-button
          class="btn-sort"
          style=" margin: 10px;"
          v-on:click="orderByTime()"
          >Duration</b-button
        >
      </b-button-group>
    </div>
    <!-- <div v-if="recipes.length == 0">No Search Results.</div> -->
    <div class="noresults" :style="'display: `${resAns}`'">
      <b-button
        v-if="this.resAns == 'block'"
        class="btn-sort"
        style="font-size: 30px; width:40%;font-weight:bold;"
        disabled
      >
        {{ this.results }}
      </b-button>
    </div>
    <br />
    <div>
      <b-row v-for="line in numOfLines" :key="line">
        <RecipePreviewList
          title=" "
          :recipes="recipes.slice((line - 1) * 3, line * 3)"
        />
      </b-row>
    </div>
  </div>
</template>

<script>
// import countries from "../assets/countries";
import RecipePreviewList from "../components/RecipePreviewList";
import FormSearch from "../components/FormSearch";

import {
  required,
  minLength,
  maxLength,
  alpha,
  numeric,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "SearchPage",
  components: {
    FormSearch,
    RecipePreviewList,
  },
  data() {
    return {
      header: "Search Page",
      recipes: [],
      recipePerRow: 3,
      results: "",
      resAns: "",
      aftersearch: "",
    };
  },
  async mounted() {
    console.log("beforeCreated");
    this.ShowLastSearch();
  },
  computed: {
    numOfLines: function() {
      console.log(Math.ceil(this.recipes.length / 3));
      return Math.ceil(this.recipes.length / 3);
    },
  },
  methods: {
    ShowLastSearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.search) {
            this.recipes = JSON.parse(localStorage.search);
            // this.recipes = localStorage.recipes;
          }
        } else {
          if (localStorage.search) {
            localStorage.removeItem("search");
          }
        }
      } catch (error) {
        this.$router.replace("/NotFound");
      }
    },
    async checkIfLogin(_instructions, response) {
      try {
        let responewatchedorfav;

        //favorite / watched
        try {
          // console.log(this.$route.params.recipeId);
          // console.log("enter to watch/fav");
          responewatchedorfav = await this.axios.get(
            this.$root.store.BASE_URL +
              "/profile/recipeInfo/" +
              "[" +
              this.$route.params.recipeId +
              "]"
          );
          // console.log("after");
          // console.log(responewatchedorfav);
          // console.log("response.status", response.status);
          if (responewatchedorfav.status !== 200) {
            this.$router.replace("/NotFound");
          }
        } catch (error) {
          // console.log(
          //   "error.respone_watchedOrFav.status",
          //   error.responewatchedorfav.status
          // );
          this.$router.replace("/NotFound");
          return;
        }

        let _recipe = {
          instructions: response.data.instructions,
          _instructions,
          // analyzedInstructions,
          ingredients: response.data.ingredients,
          vegetarian: response.data.vegetarian,
          vegan: response.data.vegan,
          glutenFree: response.data.glutenFree,
          aggregateLikes: response.data.aggregateLikes,
          readyInMinutes: response.data.readyInMinutes,
          image: response.data.image,
          title: response.data.title,
          servings: response.data.servings,
          favorite:
            responewatchedorfav.data[this.$route.params.recipeId].favorite,
          watched:
            responewatchedorfav.data[this.$route.params.recipeId].watched,
        };

        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    },
    async Search(query, amount, cuisine, diet, intolerance) {
      try {
        this.resAns = "none";
        // this.ShowLastSearch();
        let response;
        this.results = "";
        // console.log("enter to search func");
        let validAmount = amount;
        if (validAmount == "") {
          validAmount = 5;
        }
        response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/recipes/search/query/" +
            query +
            "/amount/" +
            validAmount,
          {
            params: { cuisine: cuisine, diet: diet, intolerance: intolerance },
          }
        );

        if (response.status === 404) {
          this.$router.replace("/NotFound");
        } else {
          // console.log("after endpoint search");
          let recipesArray = response.data;
          let recipes_;
          // console.log(response);
          if (this.$root.store.username) {
            let recipesIds = [];
            let size = recipesArray.length;
            for (let i = 0; i < size; i++) {
              recipesIds[i] = recipesArray[i].recipe_id;
            }

            let responewatchedorfav = await this.axios.get(
              this.$root.store.BASE_URL +
                "/profile/recipeInfo/" +
                "[" +
                recipesIds +
                "]"
            );
            // console.log(responewatchedorfav);

            for (let j = 0; j < size; j++) {
              // console.log(response.data[j]);
              // console.log(recipesArray[j].favorite);
              let id = recipesArray[j].recipe_id;
              // console.log(recipesArray[j].recipe_id);
              // console.log(responewatchedorfav.data[id].favorite);
              recipesArray[j].favorite =
                responewatchedorfav.data[recipesArray[j].recipe_id].favorite;
              recipesArray[j].watched =
                responewatchedorfav.data[recipesArray[j].recipe_id].watched;
            }
            // console.log(recipesArray);
            recipes_ = recipesArray;
            //  favorite:
            //             responewatchedorfav.data[this.$route.params.recipeId].favorite,
            //           watched:
            //             responewatchedorfav.data[this.$route.params.recipeId].watched,
          } else {
            recipes_ = response.data;
          }

          // console.log(recipes_);

          this.recipes.push;
          this.recipes = [];
          this.recipes.push(...recipes_);

          if (this.$root.store.username) {
            localStorage.setItem("search", JSON.stringify(this.recipes));
          }
          /**show sort option**/
          this.aftersearch = "true";

          if (response.status !== 200) this.$router.replace("/NotFound");
        }
      } catch (err) {
        console.log(err.response);
        if (err.response.statusText == "Not Found") {
          // this.$("noresults").show();
          this.recipes = [];
          this.resAns = "block";
          this.aftersearch = "false";
          this.results = "No recipes found for search results";
        }
      }
    },
    orderByTime() {
      let sortrecipes = this.recipes;
      sortrecipes.sort(function(a, b) {
        return a.readyInMinutes - b.readyInMinutes;
      });

      this.recipes.push;
      this.recipes = [];
      this.recipes.push(...sortrecipes);
    },
    orderByLikes() {
      let sortrecipes = this.recipes;
      sortrecipes.sort(function(a, b) {
        return a.aggregateLikes - b.aggregateLikes;
      });

      this.recipes.push;
      this.recipes = [];
      this.recipes.push(...sortrecipes);
    },
    async Reset() {
      console.log("in Reset");
      this.resAns = "none";
      this.results = "";
      this.recipes.push;
      this.recipes = [];
      this.aftersearch = "false";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  // max-width: 500px;
  width: 100%;
  height: auto;
  font-family: "Raleway", cursive;
  // background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561158/background/36811008-raw-pasta-with-ingredients-on-wooden-background_fsytts.jpg");
  background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594563633/background/various-fresh-vegetables-organic-food-healthy-rustic-background_44537-627_bup06t.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  // position: fixed;
  // background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg")
  //   no-repeat;
  // background-repeat: no-repeat;
  // background-position: center;
  // -webkit-background-size: contain;
  // -moz-background-size: contain;
  // -o-background-size: contain;
  // background-size: cover;
}

.searchTitle {
  // margin-left: 100px;
  text-align: center;
  font-family: "Cookie", cursive;
  font-size: 80px;
  font-weight: bolder;
  color: white;
}

.sort {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
// .container::before {
//   content: '';
//   display: block;
//   position: absolute;
//   min-height: 100%;
//   min-width: 1024px;
//   // position: fixed;
//   background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg");
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-attachment: fixed;
//   z-index: -1;
//   // color: #2c3e50;
//   width: 100%;
//   height: auto;
//   top: 0;
//   left: -100;
// }

// sort buttons style //

.btn-sort {
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
}

.btn-sort:hover {
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}

.noresults {
  color: white;
  text-align: center;
  font-size: 30px;
}
</style>
