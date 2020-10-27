<template>
  <div class="container" style="width:2500px;">
    <br />
    <!-- <h1 class="title">{{ header }}</h1> -->
    <b-card class="searchform">
      <b-form
        @submit.prevent="onSearch"
        @reset.prevent="onReset"
        style="font-size:18px;font-weight:bold; "
      >
        <!-- <b-form @reset.prevent="onReset"> -->
        <b-form-group
          id="input-group-query"
          label-cols-sm="4"
          label-cols-lg="3"
          label="Query for search:"
          label-for="query"
          style="width:80%;"
        >
          <b-form-input
            id="query"
            v-model="$v.form.query.$model"
            type="text"
            :state="validateState('query')"
          ></b-form-input>

          <b-form-invalid-feedback
            style="font-weight:normal;"
            v-if="!$v.form.query.required"
          >
            Search query is required
          </b-form-invalid-feedback>

          <b-form-invalid-feedback
            style="font-weight:normal;"
            v-if="!$v.form.query.isMoreThanOne"
          >
            Enter at least 2 characters
          </b-form-invalid-feedback>

          <b-form-invalid-feedback
            style="font-weight:normal;"
            v-if="!$v.form.query.qvalid"
          >
            Enter just engilsh letters
          </b-form-invalid-feedback>
          <!-- <b-form-invalid-feedback v-if="!$v.form.query.alpha">
            query search must contain only letters.
          </b-form-invalid-feedback> -->
        </b-form-group>

        <b-form-group
          label="Amount of result back:"
          label-for="amount"
          label-cols-lg="4"
        >
          <b-form-radio-group
            id="amount"
            v-model="amount"
            name="radio-sub-component"
            style="padding-top: 7px;"
          >
            <b-form-radio value="5">5</b-form-radio>
            <b-form-radio value="10">10</b-form-radio>
            <b-form-radio value="15">15</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <table class="middle" style="width:90%;">
          <tr>
            <th style="width:28%;font-weight:bold;">
              <b-form-group
                id="input-group-cuisine"
                label-cols-xl="4"
                label="Cuisine"
                label-for="cuisine"
                label-align-lg="center"
              >
                <b-form-select
                  id="cuisine"
                  v-model="$v.form.cuisine.$model"
                  :options="cuisines"
                >
                </b-form-select>
              </b-form-group>
            </th>

            <th style="width:28%;font-weight:bold;">
              <b-form-group
                id="input-group-diet"
                label-cols-xl="4"
                label="Diet"
                label-for="diet"
                label-align-lg="center"
              >
                <b-form-select
                  id="diet"
                  v-model="$v.form.diet.$model"
                  :options="diets"
                >
                </b-form-select>
              </b-form-group>
            </th>

            <th style="width:30%;font-weight:bold;">
              <b-form-group
                id="input-group-intolerance"
                label-cols-xl="5"
                label="Intolerance"
                label-for="intolerance"
                label-align-lg="center"
              >
                <b-form-select
                  id="intolerance"
                  v-model="$v.form.intolerance.$model"
                  :options="intolerances"
                  label-align-lg="left"
                >
                </b-form-select>
              </b-form-group>
            </th>
          </tr>
        </table>

        <!-- <b-form-group
          id="input-group-cuisine"
          label-cols-lg="3"
          label="Cuisine:"
          label-for="cuisine"
        >
          <b-form-select
            id="cuisine"
            v-model="$v.form.cuisine.$model"
            :options="cuisines"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-diet"
          label-cols-lg="3"
          label="Diet:"
          label-for="diet"
        >
          <b-form-select
            id="diet"
            v-model="$v.form.diet.$model"
            :options="diets"
          >
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-intolerance"
          label-cols-lg="3"
          label="Intolerance:"
          label-for="intolerance"
        >
          <b-form-select
            id="intolerance"
            v-model="$v.form.intolerance.$model"
            :options="intolerances"
          >
          </b-form-select>
        </b-form-group> -->

        <br />
        <div class="btngroup">
          <b-button
            type="reset"
            class="submitbtn"
            variant="danger"
            style=" margin: 13px;"
            >Reset</b-button
          >
          &nbsp;&nbsp;
          <b-button
            class="submitbtn"
            type="submit"
            style=" margin: 13px;"
            variant="primary"
            >Search <b-icon-search></b-icon-search
          ></b-button>
        </div>
      </b-form>
      <!-- </b-form-group> -->
    </b-card>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      search failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { isMoreThanOneChar, queryparams } from "../assets/validators";
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";

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
  name: "Form",
  data() {
    return {
      header: "Search Page",
      amount: "5",
      form: {
        query: "",
        amount: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        submitError: undefined,
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
      recipes: [],
    };
  },
  validations: {
    form: {
      query: {
        required,
        isMoreThanOne: isMoreThanOneChar,
        qvalid: queryparams,
        // alpha,
      },
      amount: {
        // required,
        numeric,
      },
      cuisine: {},
      diet: {},
      intolerance: {},
    },
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    // this.showLastForm();
    // $root.store.username
    // console.log($root.store.username);
    // console.log($v);
  },
  computed: {
    queryState() {
      return this.form.query.length > 1 ? true : false;
    },
    queryparams() {
      if (!/^[a-zA-Z\s]*$/.test(this.form.query)) {
        return false;
      } else return true;
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onSearch() {
      console.log("search method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("search method go");

      console.log(this.amount);

      this.$emit(
        "search-click-event",
        this.form.query,
        Number(this.amount),
        this.form.cuisine,
        this.form.diet,
        this.form.intolerance
      );
      //   this.Search();
    },
    onReset() {
      this.$emit("reset-click-event");
      this.form = {
        query: "",
        amount: "5",
        cuisine: null,
        diet: null,
        intolerance: null,
      };

      // document.getElementById("query").value = "";
      // document.getElementById("amount").value = "";

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // max-width: 1000px;
}

.btngroup {
  text-align: center;
}

.middle {
  margin-left: auto;
  margin-right: auto;
  border-spacing: 8px;
  // border-spacing: 0px;
  // border-collapse: separate;
  // border-spacing: 0;
  // border-collapse: collapse;
}

.submitbtn {
  min-width: 140px;
  min-height: 50px;
  // font-family: "Nunito", sans-serif;
  font-size: 20px;
  // text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  color: #313133;
  background: #4fd1c5;
  background: linear-gradient(
    90deg,
    rgba(129, 230, 217, 1) 0%,
    rgba(79, 209, 197, 1) 100%
  );
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
}

.submitbtn::before {
  content: "";
  border-radius: 1000px;
  min-width: calc(140px + 12px);
  min-height: calc(45px + 12px);
  border: 6px solid #00ffcb;
  box-shadow: 0 0 60px rgba(0, 255, 203, 0.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}

.submitbtn:hover,
.submitbtn:focus {
  color: #313133;
  transform: translateY(-1px);
}

.submitbtn:hover::before,
.submitbtn:focus::before {
  opacity: 1;
}

.submitbtn::after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 6px solid #00ffcb;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

.submitbtn:hover::after,
.submitbtn:focus::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.searchform {
  // opacity: 0.3;
  background-size: contain;
  z-index: 1;
  box-shadow: 14px 14px 23px white;
  // background-repeat: no-repeat;
}

.searchform::before {
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  z-index: -1;
  position: absolute;
  background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594743557/background/qust_eeetba.jpg");
  background-size: contain;
}
</style>
