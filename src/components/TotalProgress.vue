<template>
  <div class="total-progress">
    <transition name="fade">
      <div class="completed" :class="{ damascus: damascusCompleted && !allCompleted, allCompleted }" v-show="damascusCompleted || allCompleted">
        <h2 v-if="allCompleted">All camouflages completed! 🥳</h2>
        <h2 v-if="damascusCompleted && !allCompleted">Damascus unlocked! 🥳</h2>
      </div>
    </transition>

    <transition name="slide">
      <div class="bars" v-show="totalProgress > 0 && show">
        <div class="progress total">
          <div class="bar" :style="{ width: totalProgress + '%' }"></div>
          <label>Total progress: <span>{{ totalProgress }}%</span></label>
        </div>

        <div class="progress damascus">
          <div class="bar" :style="{ width: damascusProgress + '%' }"></div>
          <label>Damascus progress: <span>{{ damascusProgress }}%</span></label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Confetti from '@/confetti';

export default {
  name: 'TotalProgress',

  data() {
    return {
      show: false,
      damascusCompleted: false,
      allCompleted: false
    }
  },

  computed: {
    damascusProgress() {
      return this.calculateProgress([...this.$store.state.weapons].filter(weapon => weapon.required));
    },

    totalProgress() {
      return this.calculateProgress([...this.$store.state.weapons]);
    }
  },

  watch: {
    damascusProgress(newValue) {
      if (newValue === 100) {
        const DURATION = 10000,
              LENGTH   = 120;

        new Confetti({
          width    : document.body.clientWidth,
          height   : window.innerHeight,
          length   : LENGTH,
          duration : DURATION
        });

        this.damascusCompleted = true;
        setTimeout(() => {
          this.damascusCompleted = false;

          let canvas = document.querySelector('canvas');
          canvas.parentNode.removeChild(canvas);
        }, DURATION);
      }
    },

    totalProgress(newValue) {
      if (newValue === 100) {
        const DURATION = 10000,
              LENGTH   = 120;

        new Confetti({
          width    : document.body.clientWidth,
          height   : window.innerHeight,
          length   : LENGTH,
          duration : DURATION
        });

        this.allCompleted = true;
        setTimeout(() => {
          this.allCompleted = false;

          let canvas = document.querySelector('canvas');
          canvas.parentNode.removeChild(canvas);
        }, DURATION);
      }
    }
  },

  methods: {
    calculateProgress(weapons) {
      let camos = weapons.length * 10;
      let completed = 0;

      weapons.forEach(weapon => {
        Object.values(weapon.progress).forEach(progress => {
          if (progress) completed++;
        });
      });

      return this.roundToTwoDecimals((completed / camos) * 100);
    },

    roundToTwoDecimals(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100;
    }
  },

  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 1500);
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.completed {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  transition: $transition;
  width: 100%;
  z-index: 100;

  &.damascus {
    background: $purple;
  }

  &.allCompleted {
    background: $green;
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
    text-align: center;

    @media (max-width: $tablet) {
      font-size: 20px;
    }
  }
}

.bars {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  user-select: none;
  width: 100%;
  z-index: 10;

  .progress {
    display: block;
    position: relative;
    width: 100%;

    &.total {
      background: $elevation-3-color;
      height: 25px;

      .bar {
        background: $green;
      }

      label {
        font-size: 12px;
      }
    }

    &.damascus {
      background: $elevation-2-color;
      height: 50px;

      .bar {
        background: $purple;
      }
    }

    .bar {
      display: block;
      height: 100%;
      transition: $transition;
    }

    label {
      font-size: 14px;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;

      span {
        font-weight: 600;
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all .75s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
</style>