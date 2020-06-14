<template>
  <transition-group name="fade" tag="div">
    <div class="category" v-for="(category, title, index) in reticles" :key="title" :data-index="index">
      <h2>{{ title }}s</h2>
      <transition-group name="fade" tag="div" class="reticles">
        <div class="reticle" 
             v-for="(reticle, index) in category" 
             :key="reticle.name"
             :class="{ completed: reticle.completed, locked: reticleIsLocked(index, reticle.completed, category) }"
              @click="toggleReticleComplete(reticle, reticleIsLocked(index, category))" 
              :content="reticle.requirement" 
              v-tippy="{ placement: 'bottom' }">
          <div class="image">
            <img :src="require(`../assets/reticles/${ convertToKebabCase(reticle.name) }.png`)" :alt="reticle.name">
          </div>
          <div class="name">
            <p>{{ reticle.name }}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'reticles',

  props: ['reticles'],

  methods: {
    reticleIsLocked(index, completed, category) {
      return !completed && index !== 0 && !category[index - 1].completed;
    },

    toggleReticleComplete(reticle, isLocked) {
      if (!isLocked) {
        this.$store.dispatch('toggleReticleCompleted', { reticle });
      }
    },

    convertToKebabCase(string) {
      return string.replace(/\s+/g, '-').toLowerCase();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.category {
  cursor: default;
  
  + .category {
    margin-top: 75px;

    @media (max-width: $tablet) {
      margin-top: 100px;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;

    @media (max-width: $tablet) {
      font-size: 32px;
      margin-bottom: 35px;
    }
  }

  .reticles {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;

    .reticle {
      background: $elevation-1-color;
      border: 2px solid transparent;
      border-radius: $border-radius;
      cursor: pointer;
      overflow: hidden;
      transition: $transition;
      user-select: none;

      &:hover {
        background: $elevation-2-color;

        .name {
          background: $elevation-4-color;
        }
      }

      &.locked {
        cursor: not-allowed;
        opacity: .5;
      }

      &.completed {
        border-color: $green;

        .name {
          background: $green;
        }
      }
      
      .image {
        img {
          height: auto;
          pointer-events: none;
          width: 100%;
        }
      }

      .name {
        background: $elevation-3-color;
        font-size: 14px;
        padding: 10px;
        text-align: center;
        transition: $transition;
      }
    }
  }
}
</style>