<template>
  <div class="total-progress">
    <transition name="fade">
      <div class="completed" 
           :class="{ damascus: damascusCompleted && !allCompleted, allCompleted, mastery: masteryCompleted }" 
           v-show="damascusCompleted || allCompleted || masteryCompleted">
        <h2 v-if="allCompleted">All camouflages completed! 🥳</h2>
        <h2 v-if="damascusCompleted && !allCompleted">Damascus unlocked! 🥳</h2>
        <h2 v-if="masteryCompleted">All mastery camouflages completed, you absolute madman. 😎</h2>
      </div>
    </transition>

    <transition name="slide">
      <div class="bars" v-show="totalProgress > 0 && show">
        <div class="progress total" v-if="totalProgress < 100">
          <div class="bar" :style="{ width: totalProgress + '%' }"></div>
          <label>Total progress (excluding mastery): <span>{{ totalProgress }}%</span></label>
        </div>

        <div class="progress mastery" 
             v-if="masteryProgress > 0 || totalProgress === 100"
             :style="{ height: totalProgress === 100 ? '50px' : null }">
          <div class="bar" :style="{ width: masteryProgress + '%' }"></div>
          <label :style="{ fontSize: totalProgress === 100 ? '14px' : null }">Mastery progress: <span>{{ masteryProgress }}%</span></label>
        </div>

        <div class="progress damascus" v-if="totalProgress < 100">
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
      allCompleted: false,
      masteryCompleted: false
    }
  },

  computed: {
    damascusProgress() {
      return this.calculateProgress([...this.$store.state.weapons].filter(weapon => weapon.required));
    },

    totalProgress() {
      return this.calculateProgress([...this.$store.state.weapons]);
    },

    masteryProgress() {
      return this.calculateMasteryProgress([...this.$store.state.weapons]);
    }
  },

  watch: {
    damascusProgress(newValue) {
      if (newValue === 100) {
        this.handleCompleted('damascus');
      }
    },

    totalProgress(newValue) {
      if (newValue === 100) {
        this.handleCompleted('all');
      }
    },

    masteryProgress(newValue) {
      if (newValue === 100) {
        this.handleCompleted('mastery');
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

    calculateMasteryProgress(weapons) {
      let camos = weapons.length;
      let completed = 0;

      weapons.forEach(weapon => {
        Object.values(weapon.mastery).forEach(mastery => {
          if (mastery) completed++;
        });
      });

      return this.roundToTwoDecimals((completed / camos) * 100);
    },

    handleCompleted(stage) {
      const DURATION = 10000,
              LENGTH   = 120;

      new Confetti({
        width    : document.body.clientWidth,
        height   : window.innerHeight,
        length   : LENGTH,
        duration : DURATION
      });

      document.body.style.overflowY = 'hidden';
      if (stage === 'all') this.allCompleted = true;
      if (stage === 'damascus') this.damascusCompleted = true;
      if (stage === 'mastery') this.masteryCompleted = true;
      setTimeout(() => {
        if (stage === 'all') this.allCompleted = false;
        if (stage === 'damascus') this.damascusCompleted = false;
        if (stage === 'mastery') this.masteryCompleted = false;
        document.body.style.overflowY = 'visible';
        let canvas = document.querySelector('canvas');
        canvas.parentNode.removeChild(canvas);
      }, DURATION);
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

  &.mastery {
    background: $yellow;

    h2 {
      color: black;
    }
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
      background: $elevation-4-color;
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

    &.mastery {
      background: $elevation-3-color;
      height: 25px;

      .bar {
        background: $yellow;
      }

      label {
        font-size: 12px;
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
      white-space: nowrap;

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