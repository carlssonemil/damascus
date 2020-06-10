<template>
  <transition name="fade">
    <div class="about container" v-show="show">
      <h3>Simple, lightweight &amp; intuitive</h3>
      <p>Keep track of your progress to the sought after Damascus camouflage with this easy-to-use tracker.</p>

      <div class="features">
        <div class="feature" v-for="feature in features" :key="feature.title">
          <eva-icon :name="feature.icon" fill="black" width="75" height="75"></eva-icon>
          <h5>{{ feature.title }}</h5>
          <p>{{ feature.description }}</p>
        </div>
      </div>

      <h4>Open source</h4>
      <p>Built with <a href="https://vuejs.org/">Vue</a>, the code to this site is available on <a href="https://github.com/carlssonemil/damascus">GitHub</a>.</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'about',

  data() {
    return {
      show: false,
      features: [
        {
          title: 'Autosaving',
          description: 'Your progress is automatically saved and stored.',
          icon: 'save-outline'
        },
        {
          title: 'Responsive',
          description: 'Use it on your smartphone while gaming.',
          icon: 'smartphone-outline'
        },
        {
          title: 'Export/Import',
          description: 'Export your progress to another device or browser.',
          icon: 'external-link-outline'
        }
      ]
    }
  },

  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;

  @media (max-width: $tablet) {
    font-size: 22px;
    margin: 20px 0 25px;
  }
}

h4 {
  font-size: 20px;
  font-weight: 600;
  margin: 50px 0 25px;
}

p {
  font-size: 18px;

  @media (max-width: $tablet) {
    font-size: 16px;
  }
}

.features {
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(3, 1fr);
  margin: 30px 0;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
  }

  .feature {
    background: $elevation-2-color;
    border-radius: $border-radius;
    cursor: default;
    overflow: hidden;
    padding: 20px;
    position: relative;
    transition: $transition;

    &:hover {
      background: $elevation-3-color;
    }

    i {
      bottom: 0;
      opacity: .35;
      position: absolute;
      right: 0;
      transform: translate(0%, 40%);
      z-index: 1;
    }

    h5 {
      font-weight: 600;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
    }

    p {
      font-size: 16px;
      line-height: 1.4;
      position: relative;
      z-index: 2;
    }
  }
}
</style>