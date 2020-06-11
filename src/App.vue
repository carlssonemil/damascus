<template>
  <div id="app">
    <nav class="container">
      <router-link to="/" class="logo">
        <div class="icon-container">
          <img src="./assets/damascus.png">
        </div>
        <p><span>Damascus</span></p>
      </router-link>
      <div>
        <router-link to="/about">About</router-link>
        <router-link to="/settings">Settings</router-link>
      </div>
    </nav>

    <main>
      <router-view/>
    </main>

    <footer class="container">
      <div>Made by <a href="https://emilcarlsson.se/">Emil Carlsson</a></div>
      <a href="https://github.com/carlssonemil/damascus">GitHub</a>
    </footer>

    <notifications position="top center">
      <template slot="body" slot-scope="props">
        <div class="notification" :class="props.item.type" @click="props.close">
          <p class="title">{{ props.item.title }}</p>
          <eva-icon class="remove" name="close" fill="white" width="18" height="18"></eva-icon>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
export default {
  async beforeCreate() {
    await this.$store.dispatch('getStoredData');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import '@/scss/reset';
@import '@/scss/variables';

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:focus {
    outline: none;
  }
}

body {
  background: $background-color;
  color: $text-color;
  font-family: $font-family;
  height: 100vh;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 50px 0 75px;

  @media (max-width: $tablet) {
    padding: 30px 0;
  }

  .logo {
    align-items: center;
    display: flex;
    font-size: 26px;
    font-weight: 600;

    @media (max-width: $tablet) {
      font-size: 18px;
    }

    &:hover {
      text-decoration: none;
    }

    .icon-container {
      height: 35px;
      width: 35px;

      @media (max-width: $tablet) {
        height: 25px;
        width: 25px;
      }

      img {
        height: 100%;
        width: 100%;
      }
    }

    p {
      margin-left: 15px;

      @media (max-width: $mobile) {
        margin-left: 10px;

        span:first-child {
          display: none;
        }
      }
    }
  }

  a {
    opacity: .85;
    text-decoration: none;
    transition: $transition;

    @media (max-width: $tablet) {
      font-size: 14px;
    }

    &:hover {
      @media (min-width: $tablet) {
        opacity: 1;
        text-decoration: underline;
      }
    }
  }

  > div a + a {
    margin-left: 50px;

    @media (max-width: $tablet) {
      margin-left: 35px;
    }
  }
}

main {
  flex-grow: 1;
  padding-bottom: 50px;
}

footer {
  cursor: default;
  display: flex;
  justify-content: space-between;
  opacity: .35;
  padding: 50px 0;
  text-align: center;
  transition: $transition;

  @media (max-width: $tablet) {
    font-size: 14px;
    padding: 30px 0;
  }

  &:hover {
    opacity: .85;
  }

  a {
    text-decoration: none;
    transition: $transition;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
}

.container {
  margin: 0 auto;
  max-width: $container-width;
  width: 90%;
}

a {
  color: white;
  transition: $transition;

  &:hover {
    opacity: .85;
  }
}

p {
  line-height: 1.4;
}

button, .button {
  background: white;
  border-radius: $border-radius;
  border: none;
  color: black;
  cursor: pointer;
  font-family: $font-family;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  padding: 8px 16px;
  transition: $transition;

  &:hover {
    opacity: .85;
  }

  @media (max-width: $mobile) {
    display: block;
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
  }

  &.warning {
    background: $red;
    color: white;
  }

  &.disabled {
    color: rgba(black, 0.5);
    pointer-events: none;

    &:hover {
      opacity: 1;
    }
  }
}

// Vue Notifications
.vue-notification-group {
  left: 50% !important;
  top: 38px !important;
  transform: translateX(-50%);
  width: auto !important;

  @media (max-width: $tablet) {
    top: 15px !important;
    width: 90% !important;
  }

  .vue-notification-wrapper {
    box-shadow: 0px 5px 10px 0px rgba(black, .5);
    border-radius: $border-radius;

    + .vue-notification-wrapper {
      margin-top: 10px;
    }

    .notification {
      align-items: center;
      background: $elevation-5-color;
      border: 1px solid $elevation-7-color;
      border-radius: $border-radius;
      cursor: pointer;
      display: flex;
      font-size: 14px;
      margin: 0;
      padding: 15px;
      position: relative;
      user-select: none;

      &:hover {
        i {
          opacity: 1;
        }
      }
      
      &.success {
        background: $green;
        border-color: $green;
      }

      &.warning {
        background: $yellow;
        border-color: $yellow;
        color: black;

        i {
          svg {
            fill: black;
          }
        }
      }

      &.error {
        background: $red;
        border-color: $red;
      }

      .title {
        font-weight: 500;
        padding-right: 35px;
      }

      i {
        cursor: pointer;
        opacity: .65;
        padding: 15px;
        position: absolute;
        right: 0;
        transition: $transition;
        top: 0;
      }
    }
  }
}


// Transitions

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fadeInUp-enter-active, .fadeInUp-leave-active {
  transition: all .5s ease;
}
.fadeInUp-enter, .fadeInUp-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>
