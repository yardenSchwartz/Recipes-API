<template>
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
    <div v-if="recipe">
      <div class="recipe-body">
        <div id="recipe__presentation" :style="bg">
          <div class="description">
            <h1>{{ recipe.title }}</h1>
          </div>
          <br />
          <div class="circle__recipe">
            <!-- <b-icon-alarm></b-icon-alarm> {{ recipe.readyInMinutes }} Min -->
            <i class="fa fa-clock-o"
              ><h2>{{ recipe.readyInMinutes }} min</h2></i
            >
          </div>
          <div
            v-if="recipe.vegan || recipe.vegetarian"
            class="circle__recipe"
            style="float:right;  background-color: rgba(0, 0, 0, 0.99); "
          >
            <!-- <b-icon-alarm></b-icon-alarm> {{ recipe.readyInMinutes }} Min -->
            <a v-if="recipe.vegan" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:32px;height:32px;"
            /></a>

            <a v-if="recipe.vegetarian" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:32px;height:32px;"
            /></a>
          </div>

          <div class="circle__recipe">
            <i class="fa fa-users"
              ><h2>{{ recipe.servings }} Serves</h2></i
            >
            <!-- <p>Serves</p> -->
          </div>

          <div
            class="circle__recipe"
            style="float:right;   background-color: rgba(0, 0, 0, 0.99); "
          >
            <img
              class="icons"
              v-if="recipe.glutenFree"
              src="https://img.icons8.com/office/40/000000/no-gluten.png"
            />
            <img
              class="icons"
              v-else
              src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
              style="height: 70px; width:66px"
            />
          </div>

          <div class="circle__recipe">
            <!-- <h2> {{ recipe.aggregateLikes }}</h2> -->
            <i class="fa fa-thumbs-up">
              <h2>{{ recipe.aggregateLikes }}</h2></i
            >
          </div>

          <!-- <div>
                <div v-if="$root.store.username">
                  <div v-if="$root.store.username">
                    Favorite: {{ recipe.favorite }}
                  </div>
                  <div class="favBtn" v-if="recipe.favorite == false">
                    <button
                      type="button"
                      variant="primary"
                      style="width:80px;display:block;font-size: 10px;"
                      @click="AddToFavoriteAction(recipe)"
                      ref="btnFavorite"
                    >
                      Add To Favorite
                    </button>
                  </div>
                  <div v-else>
                    <button
                      disabled
                      class="fa fa-star"
                      variant="primary"
                      style="width:80px;display:block;font-size: 10px;"
                      ref="btnFavorite"
                    >
                      Already In Favorite
                    </button>
                  </div>
                </div>
              </div> -->
          <div style="margin-left:-28px; text-align: center;">
            <div v-if="$root.store.username">
              <br />
              <div class="btnFav" v-if="recipe.favorite == false">
                <button
                  class="favBtn"
                  type="button"
                  variant="primary"
                  style="width:50px; height:50px; border-style:none; margin-top: 5px; font-size: 28px; background-color: transparent;"
                  @click="AddToFavoriteAction(recipe)"
                  ref="btnFavorite"
                >
                  <b-icon-heart-fill style="color:white;"></b-icon-heart-fill>
                </button>
              </div>
              <div class="btnInFav" v-else>
                <button
                  disabled
                  class="favBtn"
                  variant="danger"
                  style="width:50px; border-style:none; height:50px; margin-top: 5px; font-size: 28px; background-color: transparent;"
                  ref="btnFavorite"
                >
                  <b-icon-heart-fill style="color:red;"></b-icon-heart-fill>
                </button>
              </div>
            </div>
            <div v-else>
              <br />
              <br />
              <br />
            </div>
          </div>

          <!-- <div style="margin-left:1px;">
            <div class="btnFav" v-if="$root.store.username">
              <div class="favBtn" v-if="recipe.favorite == false">
                <button
                  class="fa fa-star-o"
                  type="button"
                  variant="primary"
                  style="width:40px;height:40px;border-style:none;margin-top: 10px; border-radius: 50%; margin-left: -26px;display:block;font-size: 20px; background-color: #e2c904;"
                  @click="AddToFavoriteAction(recipe)"
                  ref="btnFavorite"
                ></button>
              </div>
              <div v-else>
                <button
                  disabled
                  class="fa fa-star"
                  variant="primary"
                  style="width:40px; border-style:none;height:40px; margin-top: 10px;border-radius: 50%; margin-left: -26px;display:block;font-size: 20px; background-color: #e2c904;"
                  ref="btnFavorite"
                ></button>
              </div>
              <br />
            </div>
            <div v-else>
              <br />
              <br />
              <br />
            </div>
          </div> -->

          <!-- <h5>
            <div>
              <a v-if="recipe.vegan" href="https://imgbb.com/"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style="width:18px;height:18px;"
              /></a>
              <br />
              <a v-if="recipe.vegetarian" href="https://imgbb.com/"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style="width:18px;height:18px;"
              /></a>
            </div>
            <div>
            <img
              class="icons"
              v-if="recipe.glutenFree"
              src="https://img.icons8.com/office/40/000000/no-gluten.png"
            />
            <img
              class="icons"
              v-else
              src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
              style=" margin: 1px; width:55px;height:44px;"
            />
            </div>
          </h5> -->

          <!-- <h5>
            <table
              class="middle" style="border-radius: 50px 20px; width:200px;height:50px; background-color: transparent;"
            >
              <tr style="background-color: transparent;">
                <th style="background-color: transparent;">
                  <a v-if="recipe.vegan" href="https://imgbb.com/"
                    ><img
                      src="https://i.ibb.co/PgHSV4t/leaf.png"
                      alt="leaf"
                      border="0"
                      style=" width:22px;height:22px;"
                  /></a>
                  <br/>
                  <a v-if="recipe.vegetarian" href="https://imgbb.com/"
                    ><img
                      src="https://i.ibb.co/PgHSV4t/leaf.png"
                      alt="leaf"
                      border="0"
                      style=" width:22px;height:22px;"
                  /></a>
                </th>
                <th style="background-color: transparent;">
                  <img
                    class="icons"
                    v-if="recipe.glutenFree"
                    src="https://img.icons8.com/office/40/000000/no-gluten.png"
                  />
                  <img
                    class="icons"
                    v-else
                    src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
                    style="height: 50px; width:56px"
                  />
                </th>
              </tr>
            </table>
          </h5> -->
        </div>
        <div class="content">
          <b-tabs class="content" content-class="mt-4" align="center">
            <b-tab
              v-if="recipe.ingredients.length > 0"
              title="Ingredients"
              active
            >
              <div>
                <!-- <div class="mb-3"></div> -->
                <h3 style="margin-left: -60px;">Ingredients:</h3>
                <hr />
                <ul class="checkmark" style="margin-left: -100px;">
                  <li
                    v-for="r in recipe.ingredients"
                    :key="'_' + r.amount + r.name"
                  >
                    {{ r.amount + " " + r.name }}
                  </li>
                </ul>
                <br />
              </div>
            </b-tab>
            <b-tab v-if="recipe.ingredients.length > 0" title="Instructions">
              <div>
                <h3 style="margin-left: -60px;">Instructions:</h3>
                <hr />
                <ol style="margin-left: -100px;">
                  <li v-for="s in recipe._instructions" :key="s.number">
                    {{ s.step }}
                  </li>
                </ol>
                <br />
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AddToFavoriteVue from '../components/AddToFavorite.vue';
// import AddRecipeToFavorite from "../component/AddRecipeToFavorite.vue";
export default {
  // components: {
  //   AddRecipeToFavorite,
  // },
  watch: {
    $route(to, from) {
      this.id = to.params.id;
    },
  },
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null,
    };
  },
  computed: {
    bg() {
      // console.log(this.recipe.image);
      return {
        background: `url("${this.recipe.image}") no-repeat`,
        "background-size": `cover`,
        "-webkit-background-size": `cover`,
        "-moz-background-size": `cover`,
        "-o-background-size": `cover`,
      };
    },
  },
  async created() {
    try {
      let response;

      try {
        // console.log("recipe id: " + this.$route.params.recipeId);
        response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/recipes/displayRecipePage/recipeId/" +
            this.$route.params.recipeId
        );
        // console.log("recipe id: " + this.$route.params.recipeId);

        // console.log("success addd!!!!!!!!!!!");
        // console.log("after");
        // console.log("response.status", response.status);
        if (response.status !== 200) {
          this.$router.replace("/NotFound");
        }
      } catch (error) {
        // console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      // console.log(response);
      let a = {
        // analyzedInstructions,
        id: response.data.recipe_id,
        image: response.data.image,
        title: response.data.title,
        readyInMinutes: response.data.readyInMinutes,
        aggregateLikes: response.data.aggregateLikes,
        vegetarian: response.data.vegetarian,
        vegan: response.data.vegan,
        glutenFree: response.data.glutenFree,
        ingredients: response.data.ingredients,
        instructions: response.data.instructions,
        servings: response.data.servings,
      };
      console.log(a);
      console.log(a.instructions);
      let _instructions = a.instructions;
      //do login
      if (this.$root.store.username) {
        await this.checkIfLogin(_instructions, response);
      } else {
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
        };
        this.recipe = _recipe;
        console.log("recipe", recipe);
      }
    } catch (error) {
      console.log(error);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    async checkIfLogin(_instructions, response) {
      try {
        let responewatchedorfav;

        //favorite / watched
        try {
          // console.log(this.$route.params.recipeId);
          console.log("enter to watch/fav");
          responewatchedorfav = await this.axios.get(
            this.$root.store.BASE_URL +
              "/profile/recipeInfo/" +
              "[" +
              this.$route.params.recipeId +
              "]"
          );
          console.log("after");
          console.log(responewatchedorfav);
          // console.log("response.status", response.status);
          if (responewatchedorfav.status !== 200)
            this.$router.replace("/NotFound");
        } catch (error) {
          console.log(
            "error.respone_watchedOrFav.status",
            error.responewatchedorfav.status
          );
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

        this.$root.store.watchedList = [];
        console.log("watcheList", this.$root.store.watchedList);
        // localStorage.removeItem("watchedList");
        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    },
    async AddToFavoriteAction(recipe) {
      console.log("enter to add to favorite action");
      console.log(recipe);
      let responseAfterAddFavorite;

      //favorite / watched
      try {
        // console.log(this.$route.params.recipeId);
        responseAfterAddFavorite = await this.axios.put(
          "http://localhost:4000/profile/favorite/add/" +
            this.$route.params.recipeId
        );
        console.log("after");
        console.log(responseAfterAddFavorite);
        // console.log(recipe);
        // console.log(recipe.data);
        console.log("response.status", responseAfterAddFavorite.status);
        if (responseAfterAddFavorite.status !== 200)
          this.$router.replace("/NotFound");
      } catch (error) {
        console.log(error.responseAfterAddFavorite.status);
        this.$router.replace("/NotFound");
        return;
      }
      let _recipe = {
        instructions: recipe.instructions,
        _instructions: recipe._instructions,
        // analyzedInstructions,
        ingredients: recipe.ingredients,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        aggregateLikes: recipe.aggregateLikes,
        readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        title: recipe.title,
        servings: recipe.servings,
        favorite: responseAfterAddFavorite.data.favorite,
      };
      this.recipe = _recipe;

      if (this.$root.store.favoriteList.length > 0) {
        this.$root.store.favoriteList = [];
      }
      // this.$refs.btnFavorite.innerText = "In Favorite";
      // this.$refs.btnFavorite.className = "fa fa-star";
    },
  },
};
</script>

<style scoped>
.recipe-body {
  /* background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg"); */
  /* background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg"); */
  background-size: cover;
  background-repeat: no-repeat;

  height: 200%;
  /* width: 400%; */
}

.wrapper {
  display: flex;
  /* grid-gap: 10px;
  grid-auto-flow: column;
  grid-template-columns: 186px 186px 186px 186px; */
}
/* .wrapped { */
/* width: 40%; */
/* border: 1px solid red; */
/* } */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}

.middle {
  margin-left: auto;
  margin-right: auto;
}

/* .recipe-body{
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} */
tabs .content {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  width: 90%;
  position: relative;
  /* margin-left: 5%; */
  padding: 0 0 0 0;
}
.content {
  background-color: white;
  width: 50%;
  margin-left: 25%;
  padding: 0 0 0 0;
}

.icons {
  /* border: 1px solid #ddd; */
  /* border-radius: 8px 2px; */
  /* padding-top: -1px; */
  width: 46px;
  /* border: 1.5px solid black; */
}
#recipe__presentation {
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: cover;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background-position: relative;
  background-size: 100vw 100vh;
  /* opacity: 0.8; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 450px;
}

ul.checkmark li::before {
  color: #455560;
  content: "\2713\0020";
  font-weight: 600;
  margin-left: -3px;
  margin-right: 10px;
}

.checkmark li {
  list-style-type: none;
}

li {
  margin-bottom: 4px;
}

.circle__recipe {
  background-color: #e2c904;
  border-style: none;
  border-width: 10px;
  width: 75px;
  height: 75px;
  opacity: 0.8;
  border-radius: 80%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
  flex-direction: column;
  color: #000;
}

.circle__recipe h2 {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 14px;
  margin: 0;
}
.description {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  background-color: rgba(28, 28, 28, 0.5);
  height: 80px;
}
h1 {
  /* font-family: "Roboto", sans-serif; */
  font-family: "Raleway", cursive;
  /* font-family:'Pacifico',cursive; */
  font-weight: 900;
  font-size: 30px;
  padding-top: 10px;
  padding-left: 10px;
  color: white;
}

h3 {
  font-family: "Raleway", cursive;
  font-weight: 900;
  margin: 0;
  color: dimgrey;
}

hr {
  color: dimgrey;
  margin-left: -24%;
  width: 200px;
  height: 2px;
  border-width: 0;
  background-color: dimgrey;
}

h5 {
  /* background-color: rgba(35, 30, 28, 0.5); */
  background-color: rgba(0, 0, 0, 0.49);
  /* font-family: "Roboto", sans-serif; */
  font-family: "Raleway", cursive;
  /* font-weight: 900; */
  font-size: 18px;
  /* padding-top: 5px; */
  /* padding-bottom: 10px; */
  padding-left: 30px;
  color: white;
  height: 48px;
  text-align: center;
}

.btnFav:hover,
.btnInFav:hover {
  background-color: rgb(0, 0, 0, 0.7);
  border: 1px solid rgb(0, 0, 0, 0.7);
}
.btnFav,
.btnInFav {
  background-color: rgb(120, 120, 120, 0.7);
  border: 1px solid rgb(120, 120, 120, 0.7);
  height: 60px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 60px;
  left: -100px;
}
</style>
