<template>
  <div>
    <table id="prev_table"
      class="center"
      style="border: 2px solid black ;border-radius: 50px 20px; width:300px;height:300px;"
    >
      <tr>
        <td colspan="5" style="height:80px">
          {{ this.recipe.title }}
        </td>
      </tr>
      <tr>
        <td
          v-if="type != 'Family Recipes' && type != 'My Recipes'"
          colspan="5"
          v-bind:style="{
            'background-image': 'url(' + recipe.image + ')',
          }"
          style="width:300px;height:200px;background-size: 300px 200px;"
        ></td>
        <td
          v-else
          colspan="5"
          v-bind:style="{
            'background-image':
              'url(https://res.cloudinary.com/dc9fdssoo/image/upload/' +
              recipe.image +
              ')',
          }"
          style="width:300px;height:200px;background-size: 300px 200px;"
        ></td>
      </tr>
      <tr style="height:100px">
        <th>
          <b-icon-alarm></b-icon-alarm><br />{{ recipe.readyInMinutes }}
          Min
        </th>
        <th>
          <div v-if="type != 'Family Recipes' && type != 'My Recipes'">
            <b-icon-hand-thumbs-up variant="primary"></b-icon-hand-thumbs-up
            >{{ recipe.aggregateLikes }}
          </div>
        </th>
        <th>
          <img
            v-if="recipe.glutenFree"
            src="https://img.icons8.com/office/40/000000/no-gluten.png"
          />
          <img
            v-else
            src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
            style="width:60px"
          />
        </th>
        <th>
          <a v-if="recipe.vegan"
            ><img
              src="https://i.ibb.co/PgHSV4t/leaf.png"
              alt="leaf"
              border="0"
              style="width:30px;height:30px; margin:0 0 0 0; padding: 0 0 0 0 ; "
          /></a>
          <br />
          <a v-if="recipe.vegetarian" href="https://imgbb.com/"
            ><img
              src="https://i.ibb.co/PgHSV4t/leaf.png"
              alt="leaf"
              border="0"
              style="width:30px;height:30px;"
          /></a>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
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

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");
#prev_table {
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  color: black;
  background-color: #faf7d7;
/* border: 10px solid black; */
}

#prev_table th,
#prev_table td {
  padding: 1em;
  background: #ddd;
  border-bottom: 2px solid white;
  background-color: #faf7d7b2;

}

.css-mine {
  margin-top: 2em;
  clear: both;
  
}

/* body {
  margin: 1.5em;
} */
#prev_table:hover {
  color: #000000;
  border: 10px solid #ffffff;
  text-shadow: 0px 0px 20px #ffffff;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  font-size: 17px;

}
</style>