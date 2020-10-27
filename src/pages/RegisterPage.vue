<template>
  <div class="container">
    <h1 class="title" style="text-align:center;">Register</h1>
    <br/>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First name:"
        label-for="firstname"
        style="font-size:20px;"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"

        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstname.required">
          First name is required
        </b-form-invalid-feedback>

        <b-form-invalid-feedback v-if="!$v.form.firstname.fn_isMoreThanOne">
          First Name must contains at least 2 characters
        </b-form-invalid-feedback>

        <b-form-invalid-feedback v-if="!$v.form.firstname.fn_valid">
          First Name must contains just engilsh characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last name:"
        label-for="lastname"
        style="font-size:20px;"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastname.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstname.ln_isMoreThanOne">
          Last Name must contains at least 2 characters
        </b-form-invalid-feedback>

        <b-form-invalid-feedback v-if="!$v.form.firstname.ln_valid">
          Last Name must contains just engilsh characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
        style="font-size:20px;"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
        style="font-size:20px;"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
        style="font-size:20px;"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          must be a valid email
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
     
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
           <b-form-invalid-feedback
          v-if="!$v.form.password.onlyDigit" >
          Password should have at least one digit.
        </b-form-invalid-feedback>
          <b-form-invalid-feedback
          v-if="!$v.form.password.oneSpecialChar" >
          Password should have at least one special character.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
        style="font-size:20px;"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-image"
        label-cols-sm="3"
        label="Image(URL):"
        label-for="image"
        style="font-size:20px;"
      >
        <b-form-input
          id="image"
          v-model="$v.form.image.$model"
          type="text"
          :state="validateState('image')"
        ></b-form-input>
      </b-form-group>
<br/>
<br/>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { isMoreThanOneChar, queryparams } from "../assets/validators";
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  profileurl,
  helpers,
} from "vuelidate/lib/validators";
const onlyDigit = helpers.regex('dig', /[0-9]/)
const oneSpecialChar = helpers.regex('dig', /[!@#$%^&*(),.?":{}|<>]/)
export default {
  name: "Register",
  data() {
    return {
      form: {
        image: "",
        email: "",
        lastname: "",
        firstname: "",
        username: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      firstname: {
        required,
        fn_isMoreThanOne: isMoreThanOneChar,
        fn_valid: queryparams,
        // alpha,
      },
      lastname: {
        required,
        ln_isMoreThanOne: isMoreThanOneChar,
        ln_valid: queryparams,
        // alpha,
      },
      image: {},
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        onlyDigit,
        oneSpecialChar
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/register",
          {
            username: this.form.username,
            password: this.form.password,
            first_name: this.form.firstname,
            last_name: this.form.lastname,
            country: this.form.country,
            profile_pic: this.form.image,
            email: this.form.email,
          }
        );
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pangolin:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");

.container {
  max-width: 630px;
  color: wheat;
  background-color: rgba(1, 1, 1, 0.6);
  border-radius: 20px;
  height: 100%;
  padding-top: 20px;
  font-family: Pangolin;
  margin-top: 7%;
 
}
</style>
