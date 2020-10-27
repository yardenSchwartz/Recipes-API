import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  // {
  //   path: "/profile/:recipeId",
  //   name: "recipe",
  //   component: () => import("./pages/RecipeViewPage"),
  // },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/PersonalRecipe/:type/:recipeId",
    name: "PersonalViewPage",
    component: () => import("./pages/PersonalViewPage"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/recipes/favorites",
    name: "recipesPage",
    component: () => import("./pages/RecipesPage"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipes/myRecipes",
    name: "myRecipesPage",
    component: () => import("./pages/RecipesPage"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/recipes/family",
    name: "familyRecipes",
    component: () => import("./pages/RecipesPage"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
