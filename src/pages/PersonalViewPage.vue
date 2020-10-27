<template>
  <div class="container">
    <div v-if="familyRecipe">
      <!-- <div class="recipe-header mt-3 mb-4">
        <h1>{{ familyRecipe.title }}</h1>
        <img :src="familyRecipe.image" class="center" />
      </div> -->
      <div class="recipe-body">
        <br />
        <br />
        <div id="recipe__presentation" :style="bg">
          <div class="description">
            <h1 class="FamilyTitle">{{ familyRecipe.title }}</h1>
          </div>
          <br />
          <div class="circle__recipe">
            <i class="fa fa-clock-o"
              ><h2>{{ familyRecipe.readyInMinutes }} min</h2></i
            >
          </div>
          <div
            v-if="familyRecipe.vegan || familyRecipe.vegetarian"
            class="circle__recipe"
            style="float:right;  background-color: rgba(0, 0, 0, 0.99); "
          >
            <!-- <b-icon-alarm></b-icon-alarm> {{ recipe.readyInMinutes }} Min -->
            <a v-if="familyRecipe.vegan" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:32px;height:32px;"
            /></a>

            <a v-if="familyRecipe.vegetarian" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:32px;height:32px;"
            /></a>
          </div>
          <div v-if="familyRecipe.where" class="circle__recipe">
            <h2>Where: {{ familyRecipe.where }}</h2>
          </div>
          <div v-else><br /><br /><br /><br /></div>
          <div
            class="circle__recipe"
            style="float:right;   background-color: rgba(0, 0, 0, 0.99); "
          >
            <img
              class="icons"
              v-if="familyRecipe.glutenFree"
              src="https://img.icons8.com/office/40/000000/no-gluten.png"
            />
            <img
              class="icons"
              v-else
              src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
              style="height: 70px; width:66px"
            />
          </div>
          <div v-if="familyRecipe.where" class="circle__recipe">
            <h2>Made by: {{ familyRecipe.owner }}</h2>
          </div>
          <div v-else><br /><br /><br /><br /></div>
          <br />
          <br />
          <!-- <br /> -->
          <!-- <h5>
            <b>Vegan:</b> {{ familyRecipe.vegan }} |
            <b>Vegetarian:</b>
            {{ familyRecipe.vegetarian }} |
            <b>Gluten Free:</b>
            {{ familyRecipe.glutenFree }}
          </h5> -->
          <!-- <h5>
            <a v-if="familyRecipe.vegan" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:33px;height:33px;margin: 6px;"
            /></a>
            <a v-if="familyRecipe.vegetarian" href="https://imgbb.com/"
              ><img
                src="https://i.ibb.co/PgHSV4t/leaf.png"
                alt="leaf"
                border="0"
                style=" width:33px;height:33px;margin: 6px;"
            /></a>
            &nbsp;&nbsp;
            <img
              class="icons"
              v-if="familyRecipe.glutenFree"
              src="https://img.icons8.com/office/40/000000/no-gluten.png"
            />
            <img
              class="icons"
              v-else
              src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
              style=" margin: 1px; width:55px;height:44px;"
            />
          </h5> -->

          <div class="content" style="padding-top:4%;">
            <b-tabs class="content" content-class="mt-4" align="center">
              <b-tab
                v-if="familyRecipe.ingredients.length > 0"
                title="Ingredients"
                active
              >
                <div>
                  <h3 style="margin-left: 30px;">Ingredients:</h3>
                  <hr />
                  <ul class="checkmark">
                    <li
                      v-for="r in familyRecipe.ingredients"
                      :key="'_' + r.amount + r.name"
                    >
                      {{ r.amount + " " + r.name }}
                    </li>
                  </ul>
                  <br />
                </div>
              </b-tab>
              <b-tab
                v-if="familyRecipe.ingredients.length > 0"
                title="Instructions"
              >
                <div>
                  <h3 style="margin-left: 30px;">Instructions:</h3>
                  <hr />
                  <ol>
                    <li v-for="s in familyRecipe.instructions" :key="s.number">
                      {{ s.content }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      familyRecipe: null,
    };
  },
  computed: {
    bg() {
      console.log(this.familyRecipe.image);
      return {
        background: `url("${this.familyRecipe.image}") no-repeat`,
        "background-size": `cover`,
        "-webkit-background-size": `cover`,
        "-moz-background-size": `cover`,
        "-o-background-size": `cover`,
      };
    },
  },
  async created() {

    console.log("created", 1111111);
    try {
      let response;
      try {
        console.log(this.$route.params.recipeId);
        if (this.$route.params.type == "family") {
          // if (this.$root.store.familyList.length == 0) {
          let familyArray = this.$root.store.familyList;
          console.log("familyArray", familyArray);
          for (let i = 0; i < 3; i++) {
            if (familyArray[i].recipe_id == this.$route.params.recipeId) {
              this.familyRecipe = familyArray[i];
            }
          }
          console.log("familyRecipe", this.familyRecipe);
          // }

          // if (this.$root.store.familyList.length == 0) {
          //   response = await this.axios.get(
          //     this.$root.store.BASE_URL +
          //       "/profile/familyRecipes/" +
          //       "[" +
          //       this.$route.params.recipeId +
          //       "]"
          //   );
          // }
        } else {
          if (this.$route.params.type == "my") {
            let myArray = this.$root.store.myRecipesList;
            console.log("myArray", myArray);
            for (let i = 0; i < 3; i++) {
              if (myArray[i].recipe_id == this.$route.params.recipeId) {
                this.familyRecipe = myArray[i];
              }
            }
            console.log("familyRecipe", this.familyRecipe);
            // if (this.$root.store.myList.length == 0) {
            //   response = await this.axios.get(
            //     this.$root.store.BASE_URL +
            //       "/profile/myRecipes/" +
            //       "[" +
            //       this.$route.params.recipeId +
            //       "]"
            //   );
            // }
          }
        }
        console.log("after");
        // console.log(response);
        // if (this.$root.store.familyList.length > 0) {
        //   let familyArray = JSON.parse(localStorage.familyList);
        //   for (let i = 0; i < 3; i++) {
        //     if (familyArray[i].title == response.data[0].title) {
        //       this.familyRecipe = familyArray[i];
        //     }
        //   }
        // } else {
        let _familyRecipe = {
          instructions: this.familyRecipe.instructions,
          ingredients: this.familyRecipe.ingredients,
          vegetarian: this.familyRecipe.vegetarian,
          vegan: this.familyRecipe.vegan,
          glutenFree: this.familyRecipe.glutenFree,
          readyInMinutes: this.familyRecipe.readyInMinutes,
          image:
            "https://res.cloudinary.com/dc9fdssoo/image/upload/" +
            this.familyRecipe.image,
          title: this.familyRecipe.title,
          owner: this.familyRecipe.owner,
          where: this.familyRecipe.where,
        };

        this.familyRecipe = _familyRecipe;
        console.log("familyRecipe", this.familyRecipe);
        // localStorage.setItem("familyList", JSON.stringify(this.familyRecipe));
        // }

        // if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        // console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.containr {
  height: auto;
}

.wrapper {
  display: flex;
}
.wrapped {
  width: 40%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.content {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: fff;

  /* width: 550px; */
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
  opacity: 0.8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 410px;
  /* display:unset; */
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
  font-family: "Raleway", cursive;
}

.circle__recipe {
  background-color: #e2c904;
  border-style: none;
  border-width: 10px;
  width: 80px;
  height: 80px;
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
  background-color: rgba(30, 28, 28, 0.5);
  height: 55px;
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
  margin-left: 4%;
  width: 200px;
  height: 2px;
  border-width: 0;
  background-color: dimgrey;
}

h5 {
  background-color: rgba(0, 0, 0, 0.59);
  /* font-family: "Roboto", sans-serif; */
  font-family: "Raleway", cursive;
  /* font-weight: 900; */
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  color: white;
  text-align: center;
}
</style>
