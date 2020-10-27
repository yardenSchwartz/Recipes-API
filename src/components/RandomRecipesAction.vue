<template>
  <div>
    <a v-on:click="$emit('random-click-event')" class="horizontal"><span class="text">More</span></a>

  </div>
</template>

<script>
export default {
  name: "RandomRecipesAction",
}
</script>

<style>

:root {
  --base-color: rgba(255, 255, 255, 1);
  --hover-color: rgba(220, 120, 150, 1);
}

.horizontal {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
          justify-content: center;
  -webkit-box-align: center;
          align-items: center;
  position: relative;
  width: 200px;
  height: 60px;
  margin-left:40%;
  margin-bottom: 3%;

  border: 10px solid var(--base-color);
  font-size: 2rem;
  cursor: pointer;
}
.horizontal > .text {
  position: relative;
  color: transparent;
  background-image: -webkit-gradient(linear, left top, right top, from(var(--hover-color)), color-stop(50%, var(--hover-color)), color-stop(50%, var(--base-color)), to(var(--base-color)));
  background-image: linear-gradient(90deg, var(--hover-color) 0%, var(--hover-color) 50%, var(--base-color) 50%, var(--base-color) 100%);
  background-repeat: repeat;
  background-size: 200%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-transition: background-position 300ms;
  transition: background-position 300ms;
}
.horizontal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--base-color);
  -webkit-transform-origin: 100% 0;
          transform-origin: 100% 0;
  -webkit-transform: scale3d(0, 1, 1);
          transform: scale3d(0, 1, 1);
  -webkit-transition: -webkit-transform 300ms;
  transition: -webkit-transform 300ms;
  transition: transform 300ms;
  transition: transform 300ms, -webkit-transform 300ms;
}
.horizontal:hover .text {
  background-position: 0 0;
}
.horizontal:hover::before {
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transform: scale3d(1, 1, 1);
          transform: scale3d(1, 1, 1);
}



</style>