<template>
  <div class="container">
    <link
      rel="stylesheet"
      type="text/css"
      href="//fonts.googleapis.com/css?family=Dancing+Script"
    />
    <br />
    <h1 class="aboutTitle">About Us!</h1>
    <table
      style="  border-collapse: collapse;
  width: 80%;"
    >
      <tr>
        <td>
          <div class="abountInfo" style="font-weight:bold; font-size:18px;">
            <!-- <p>Eden Mizrahi & Yarden Schwartz</p> -->
            <br />
            <br />
            <br />
            <br />
            <br />
            <p
              style="padding-left: 16px; padding-right: 16px; padding-top: 15px; line-height:34px;"
            >
              <b style="font-size: 30px;">Hello!</b> <br />
              <br />
              Our names are Eden Mizrahi & Yarden Schwartz.<br />
              We are both third year students in Information Systems and
              Software Engineering at Ben Gurion University. <br />We are good
              friends 👯‍♂️ and work great together 💻. <br />We hope you enjoyed
              our recipes website at least as much we enjoyed doing it 😊
            </p>
            <br />

            <p style="text-align:center; font-weight:bold;">
              You can take a look at our others projects:<br />
            </p>

            <p
              style="text-align:center; line-height:30px; padding-bottom: 15px; "
            >
              <a
                href="https://github.com/SISE-Web-Development-Environments/assignment-3-2-311322077-206015141"
              >
                Backend side
              </a>
              <br />

              <img
                style="width:22px; height:22px;"
                id="pacman6"
                src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594811554/icons/pacman_icon_withoutBG_ih7prw.png"
              />

              <a
                href="https://sise-web-development-environments.github.io/assignment2-yarden-eden/"
              >
                Pacman Game</a
              >
              <br />
              <a
                href="https://sise-web-development-environments.github.io/206015141/"
              >
                Yarden's site</a
              >
              <br />
              <a
                href="https://sise-web-development-environments.github.io/311322077/"
              >
                Eden's site</a
              >
            </p>
          </div>
        </td>

        <div>
          <b-carousel class="carousel" :interval="3000">
            <b-carousel-slide
              img-src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1595782751/edenyarden1.jpg"
              style="padding-top:60px;"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1595782853/edenandyarden.jpg"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1595782751/WhatsApp_Image_2020-07-25_at_09.23.51_cmxij4.jpg"
              style="padding-top:60px;"
            ></b-carousel-slide>
          </b-carousel>
        </div>
      </tr>
    </table>

    <br />
    <br />
    <footer class="footer-distributed">
      <div class="footer-right" style="padding-top: 0px; float: left;">
        <div class="footer-icons" style="margin-top: 0px;">
          <p
            style="margin-top: 0px; font-family: Dancing Script; margin-bottom: 5px;"
          >
            <b style="font-size:20px;">Yarden Schwartz:</b>
          </p>
          <a href="https://www.facebook.com/yarden.schwartz.7"
            ><i class="fa fa-facebook"></i
          ></a>

          <a href="https://www.linkedin.com/in/yarden-schwartz-60a5b0177/"
            ><i class="fa fa-linkedin"></i
          ></a>
          <a href="https://github.com/yardenSchwartz?tab=repositories"
            ><i class="fa fa-github"></i
          ></a>

          <a href="mailto:schyarde@post.bgu.ac.il"
            ><i class="fa fa-envelope"></i
          ></a>

          <br />
          <p
            style="font-family: Dancing Script; font-size:20px; margin-bottom: 5px;"
          >
            Eden Mizrahi:
          </p>

          <a href="https://www.facebook.com/eden.mizrahi.18"
            ><i class="fa fa-facebook"></i
          ></a>

          <a href="https://www.linkedin.com/in/eden-mizrahi-1264841a3/"
            ><i class="fa fa-linkedin"></i
          ></a>
          <a href="https://github.com/edenmizrahi?tab=repositories"
            ><i class="fa fa-github"></i
          ></a>
          <a href="mailto:edenmizr@post.bgu.ac.il"
            ><i class="fa fa-envelope"></i
          ></a>
        </div>

        <div class="footer-bgu">
          <i class="fa fa-map-marker"></i>
          <p><span>Ben Gurion University</span> Beer Sheva, Israel</p>
        </div>
        <p
          class="footer-company-name"
          style="margin-top: 15px; font-weight:bold;"
        >
          Yarden Schwartz & Eden Mizrahi ֲ© 2020
        </p>
        <!-- <img src="images/monsrersbg.png" alt="Smiley face" height="50" width="250"> -->
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
};
</script>

<style scoped>
.carousel {
  top: -10px;
  width: 640px;
  height: 360px;
  text-align: center;
}
.container {
  /* height: auto; */
  /* width: 100%;
  height: 100%; */
  /* background: turquoise; */
  /* background-size: 100% 100%; */
  /* background-repeat: no-repeat; */
  /* z-index: 1; */
  max-width: 2500px;
  margin-left: 0;
  /* margin-right: 100%; */
  padding-right: 0px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-image: -webkit-radial-gradient(
    center top,
    circle farthest-corner,
    #fff 0%,
    #d8dfe9 100%
  );
  background-image: radial-gradient(
    circle farthest-corner at center top,
    #fff 0%,
    #d8dfe9 100%
  );
  overflow: hidden;
}

.aboutTitle {
  /* margin-left: 20px; */
  text-align: center;
  font-family: "Cookie", cursive;
  font-size: 94px;
  font-weight: bolder;
  color: black;
}

.images {
  /* float: right; */
  margin: 2%;
}

.abountInfo {
  /* width: 90%; */
  box-shadow: 0 0px 14px 14px rgba(0, 0, 0, 0.22);
  color: black;
  /* font-family: 'Coiny', cursive; */
  font-family: "Roboto", sans-serif;
  /* -webkit-background-clip: text; */
  /* -webkit-text-fill-color: transparent;	 */
  background-image: url("https://res.cloudinary.com/dc9fdssoo/image/upload/o_54/v1595019125/background/foodAbout_laqdwz.jpg");
  /* background-image: url("https://res.cloudinary.com/dc9fdssoo/image/upload/o_51/v1594814682/icons/emoji_de0tto.jpg"); */
  background-size: contain;
  /* background-attachment: unset; */
  /* background-position: 0%; */
  /* width: 40%; */
  /* text-align: ; */
  /* float: left; */
  /* height: 60%; */
  margin: 2%;
  /* opacity: 0.3; */
  /* font-size: 100px; */
  float: right;
  animation: clouds-moving infinite 50s;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-timing-function: linear;
  /* text-align: center; */
}
@keyframes clouds-moving {
  0% {
    background-position: 0%;
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}

@font-face {
  font-family: icon;
  src: url("https://bennettfeely.com/fonts/icons.woff");
}

.footer-distributed {
  width: 100%;
  /* height: 100%; */
  text-align: left;
  font: bold 16px sans-serif;
  /* padding: 55px 1px; */
}

.footer-distributed .footer-right {
  display: inline-block;
  vertical-align: top;
}

.footer-distributed .footer-bgu i {
  background-color: #33383b;
  color: #ffffff;
  font-size: 25px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  /* margin: 15px 5px; */
  vertical-align: middle;
}

.footer-distributed .footer-bgu p {
  display: inline-block;
  color: black;
  font-weight: 400;
  vertical-align: middle;
  margin: 15px;
}

.footer-distributed .footer-bgu p span {
  display: block;
  font-weight: normal;
  font-size: 14px;
  line-height: 2;
}

.footer-distributed .footer-right i.fa-envelope {
  font-size: 17px;
  line-height: 38px;
}

/* Footer Right */

.footer-distributed .footer-right {
  text-align: left;
  width: 35%;
}

.footer-distributed .footer-icons {
  margin-top: 25px;
}

.footer-distributed .footer-icons a {
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: #33383b;
  border-radius: 2px;

  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 35px;

  margin-right: 3px;
  margin-bottom: 5px;
}

/* If you don't want the footer to be responsive, remove these media queries */

/* @media (max-width: 880px) {
  .footer-distributed {
    font: bold 14px sans-serif;
  }

  .footer-distributed .footer-right {
    display: block;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }
} */

.fa-linkedin:hover {
  color: #0e76a8;
  /* border:  white solid 1px;  */
}

.fa-facebook:hover {
  color: #3b5998;
}

.fa-github:hover {
  color: #6cc644;
  /* background-color: #6cc644; */
}

.fa-envelope:hover {
  color: #747577;
}
</style>
