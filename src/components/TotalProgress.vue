<template>
  <div class="total-progress">
    <transition name="fade">
      <div class="completed" 
           :class="{ damascus: damascusCompleted && !allCompleted, allCompleted, mastery: masteryCompleted, challenges: challengesCompleted }" 
           v-show="damascusCompleted || allCompleted || masteryCompleted || challengesCompleted">
        <h2 v-if="allCompleted">You completed everything, you absolute madman! 🥳</h2>
        <h2 v-if="damascusCompleted && !allCompleted">Damascus unlocked! 🥳</h2>
        <h2 v-if="masteryCompleted && !allCompleted">All mastery camouflages completed, you absolute madman. 😎</h2>
        <h2 v-if="challengesCompleted && !allCompleted">All Master Challenges completed!<br/>That's what's called a pro gamer move! 🤩</h2>
      </div>
    </transition>

    <transition name="slideup">
      <div class="bars" v-show="totalProgress > 0 && show">
        <div class="progress total" v-if="totalProgress < 100">
          <div class="bar" :style="{ width: totalProgress + '%' }"></div>
          <label>Total progress: <span>{{ totalProgress }}%</span></label>
        </div>

        <div class="progress mastery" 
             v-if="masteryProgress > 0 && totalProgress < 100"
             :style="{ height: totalProgress === 100 ? '50px' : null }">
          <div class="bar" :style="{ width: masteryProgress + '%' }"></div>
          <label :style="{ fontSize: totalProgress === 100 ? '14px' : null }">Mastery progress: <span>{{ masteryProgress }}%</span></label>
        </div>

        <div class="progress damascus" v-if="view === 'Camouflages' && totalProgress < 100">
          <div class="bar" :style="{ width: damascusProgress + '%' }"></div>
          <label>Damascus progress: <span>{{ damascusProgress }}%</span></label>
        </div>

        <div class="progress challenges" v-if="view === 'Challenges' && totalProgress < 100">
          <div class="bar" :style="{ width: challengesProgress + '%' }"></div>
          <label>Master Challenges progress: <span>{{ challengesProgress }}%</span></label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Confetti from '@/confetti';

export default {
  name: 'TotalProgress',

  props: ['view'],

  data() {
    return {
      show: false,
      damascusCompleted: false,
      allCompleted: false,
      masteryCompleted: false,
      challengesCompleted: false
    }
  },

  computed: {
    totalProgress() {
      return this.calculateTotalProgress([...this.$store.state.weapons]);
    },

    damascusProgress() {
      let { completed, total } = this.calculateProgress([...this.$store.state.weapons], 'progress', 10, true);
      return this.roundToTwoDecimals((completed / total) * 100);
    },

    masteryProgress() {
      let { completed, total } = this.calculateProgress([...this.$store.state.weapons], 'mastery', 1);
      return this.roundToTwoDecimals((completed / total) * 100);
    },

    challengesProgress() {
      let { completed, total } = this.calculateProgress([...this.$store.state.weapons], 'challenges', 8);
      return this.roundToTwoDecimals((completed / total) * 100);
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
    },

    challengesProgress(newValue) {
      if (newValue === 100) {
        this.handleCompleted('challenges');
      }
    }
  },

  methods: {
    calculateTotalProgress(weapons) {
      let damascus = this.calculateProgress(weapons, 'progress', 10);
      let mastery = this.calculateProgress(weapons, 'mastery', 1);
      let challenges = this.calculateProgress(weapons, 'challenges', 8);

      let completed = damascus.completed + mastery.completed + challenges.completed;
      let total = damascus.total + mastery.total + challenges.total;

      return this.roundToTwoDecimals((completed / total) * 100);
    },

    calculateProgress(weapons, type, multiplier, filterRequired) {
      if (filterRequired) {
        weapons = weapons.filter(weapon => weapon.required);
      }

      let total = weapons.length * multiplier;
      let completed = 0;

      weapons.forEach(weapon => {
        Object.values(weapon[type]).forEach(progress => {
          if (type === 'challenges') {
            if (progress.completed) completed++;
          } else {
            if (progress) completed++;
          }
        });
      });

      return { completed, total };
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
      if (stage === 'challenges') this.challengesCompleted = true;
      setTimeout(() => {
        if (stage === 'all') this.allCompleted = false;
        if (stage === 'damascus') this.damascusCompleted = false;
        if (stage === 'mastery') this.masteryCompleted = false;
        if (stage === 'challenges') this.challengesCompleted = false;
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
    }, 500);
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

  &.challenges {
    background: $red;
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
    line-height: 2;
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

    &.challenges {
      @extend .damascus;

      .bar {
        background: $red;
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
</style>