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
        <router-link to="/">Camouflages</router-link>
        <router-link to="/reticles">Reticles</router-link>
        <router-link to="/master-challenges" class="coming-soon"><span>Master Challenges</span></router-link>
        <router-link to="/settings" class="icon" content="Settings" v-tippy="{ placement: 'bottom' }">
          <eva-icon name="settings-2-outline" fill="white"></eva-icon>
        </router-link>
      </div>
      <eva-icon class="mobile-nav-toggle" name="menu" fill="white" @click="mobileNav = !mobileNav"></eva-icon>
    </nav>

    <transition name="fade">
      <nav class="mobile" v-if="mobileNav">
        <div class="header">
          <router-link to="/" class="logo">
            <div class="icon-container">
              <img src="./assets/damascus.png">
            </div>
            <p><span>Damascus</span></p>
          </router-link>
          <eva-icon name="close" fill="white" @click="mobileNav = !mobileNav"></eva-icon>
        </div>
        <div>
          <router-link to="/">Camouflages</router-link>
          <router-link to="/reticles">Reticles</router-link>
          <router-link to="/master-challenges" class="coming-soon"><span>Master Challenges</span></router-link>
        </div>
        <div class="footer">
          <router-link to="/settings">Settings</router-link>
          <router-link to="/about">About</router-link>
          <a href="https://github.com/carlssonemil/damascus">GitHub</a>
        </div>
      </nav>
    </transition>

    <main>
      <router-view/>
    </main>

    <footer class="container">
      <div>Made by <a href="https://emilcarlsson.se/">Emil Carlsson</a></div>
      
      <div>
        <router-link to="/about">About</router-link>
        <a href="https://github.com/carlssonemil/damascus">GitHub</a>
      </div>
    </footer>

    <notifications position="top center">
      <template slot="body" slot-scope="props">
        <div class="notification" :class="props.item.type" @click="props.close">
          <p class="title">{{ props.item.title }}</p>
          <eva-icon class="remove" name="close" fill="white" width="18" height="18"></eva-icon>
        </div>
      </template>
    </notifications>

    <Debug v-if="!production" />
  </div>
</template>

<script>
import Debug from '@/components/Debug.vue'

export default {
  components: {
    Debug
  },

  data() {
    return {
      production: process.env.NODE_ENV === 'production',
      mobileNav: false
    }
  },

  watch: {
    $route() {
      this.mobileNav = false;
    }
  },

  async beforeCreate() {
    await this.$store.dispatch('getStoredData');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import '@/scss/reset';

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
    opacity: .85;

    @media (max-width: $tablet) {
      font-size: 18px;
    }

    &.router-link-exact-active {
      opacity: .85;
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
      }
    }
  }

  a {
    opacity: .5;
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

    &.router-link-exact-active {
      opacity: 1;
    }

    &.coming-soon {
      opacity: 1;
      pointer-events: none;
      position: relative;

      span {
        opacity: .5;
      }

      &::after {
        bottom: 0;
        color: $blue;
        content: 'Coming soon!';
        font-size: 10px;
        left: 50%;
        position: absolute;
        text-align: center;
        transform: translate(-50%, calc(100% + 4px));
        width: 100%;
      }
    }
  }

  > div {
    align-items: center;
    display: flex;

    @media (max-width: $tablet) {
      display: none;
    }

    a + a {
    margin-left: 50px;

      @media (max-width: $tablet) {
        margin-left: 35px;
      }
    }
  }

  .mobile-nav-toggle {
    display: none;

    @media (max-width: $tablet) {
      display: block;
    }
  }
}

nav.mobile {
  align-items: flex-start;
  background: $elevation-1-color;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 5%;
  position: fixed;
  width: 100%;
  z-index: 100;

  a + a {
    margin-left: 0;
  }

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    width: 100%;
  }

  > div:not([class]) {
    align-items: flex-start;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;

    a {
      font-size: 20px;
      opacity: 1;
      text-decoration: none;

      + a {
        margin-top: 30px;
      }

      &.coming-soon {
        &::after {
          left: 0;
          text-align: left;
          transform: translate(0%, calc(100% + 4px));
        }
      }
    }
  }

  .footer {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    text-align: left;

    a {
      font-size: 16px;

      + a {
        margin-top: 25px;
      }
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

    + a {
      margin-left: 50px;

      @media (max-width: $tablet) {
        margin-left: 35px;
      }
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

.checkbox {
  align-items: center;
  cursor: pointer;
  display: flex;

  input[type="checkbox"] {
    $size: 16px;

    appearance: none;
    border: 1px solid $elevation-8-color;
    border-radius: $border-radius;
    color: white;
    cursor: pointer;
    height: $size;
    outline: 0;
    position: relative;
    transition: $transition;
    width: $size;

    &::before {
      $check-size: 8px;

      border-style: solid;
      border-color: white;
      border-width: 0 2px 2px 0;
      content: '';
      display: block;
      height: $check-size;
      left: calc(50% - #{ $check-size / 2 });
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: rotate(45deg) translate(-50%, -50%);
      width: $check-size / 2;
    }

    &:checked {
      background: $blue;
      border-color: $blue;
      color: white;

      &::before {
        opacity: 1;
      }
    }
  }

  label, input {
    cursor: pointer;
  }

  label {
    margin-left: 5px;

    @media (max-width: $tablet) {
      font-size: 18px;
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
