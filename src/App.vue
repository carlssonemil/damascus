<template>
  <div id="app" :style="{ overflowY: mobileNav ? 'hidden' : null }">
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
        <router-link to="/challenges">Master Challenges</router-link>
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
          <router-link to="/challenges">Master Challenges</router-link>
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
@import '@/scss/main';

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
