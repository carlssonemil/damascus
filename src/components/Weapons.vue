<template>
  <transition-group name="fade" tag="div" class="container">
    <div class="category" v-for="(category, title, index) in weapons" :key="title" :data-index="index">
      <h2>{{ title }}s</h2>
      <transition-group name="fade" tag="div" class="weapons">
        <div class="weapon" v-for="weapon in category" :key="weapon.alias">
          <div class="name" 
               :class="{ completed: Object.values(weapon.progress).every(Boolean) }" 
               @dblclick="toggleWeaponComplete(weapon, Object.values(weapon.progress).every(Boolean))"
               v-tippy="{ content: `Double-click to ${ Object.values(weapon.progress).every(Boolean) ? 'reset' : 'complete' } weapon` }">{{ weapon.name }}</div>
          <div class="progress">
            <div class="camo" 
                v-for="(completed, camo) in weapon.progress" 
                :key="camo" 
                @click="toggleComplete(weapon, camo, completed)" 
                :content="camoTooltip(title, camo, weapon)" 
                v-tippy="{ placement: 'bottom' }">
              <div class="inner" :class="{ completed }">
                <eva-icon class="completed" name="checkmark" fill="#10ac84"></eva-icon>
                <eva-icon v-if="completed" class="remove" name="close" fill="#ee5253"></eva-icon>
                <img :src="require(`../assets/${ convertToKebabCase(camo) }.png`)" :alt="camo">
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'weapons',

  props: ['title', 'weapons'],

  methods: {
    toggleComplete(weapon, camo, current) {
      this.$store.dispatch('toggleCompleted', { weapon, camo, current });
    },

    toggleWeaponComplete(weapon, current) {
      this.$store.dispatch('toggleWeaponCompleted', { weapon, current });
    },

    camoTooltip(category, camo, weapon) {
      if (category === 'Melee' && typeof this.$store.state.camos.find(c => c.name === camo).requirements[category] !== 'string') {
        return this.$store.state.camos.find(c => c.name === camo).requirements[category][weapon.name];
      } else {
        return this.$store.state.camos.find(c => c.name === camo).requirements[category];
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

.container {
  width: 100%;

  .category {
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

    .weapons {
      display: grid;
      gap: 30px;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;

      @media (max-width: $tablet) {
        grid-template-columns: 1fr;
      }

      .weapon {

        .name {
          align-items: center;
          background: $elevation-3-color;
          border-radius: $border-radius;
          cursor: pointer;
          display: flex;
          font-weight: 600;
          justify-content: center;
          padding: 25px;
          transition: $transition;
          user-select: none;

          @media (max-width: $tablet) {
            font-size: 24px;
            padding: 15%;
          }

          &.completed {
            background: $green;
          }
        }

        .progress {
          display: grid;
          gap: 5px;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(2, auto);
          margin-top: 5px;

          .camo {
            user-select: none;

            .inner {
              align-items: center;
              background: $elevation-2-color;
              border-radius: $border-radius;
              cursor: pointer;
              display: flex;
              height: 100%;
              justify-content: center;
              overflow: hidden;
              position: relative;
              width: 100%;

              &:hover {
                @media (min-width: $tablet) {
                  img {
                    opacity: .25;
                  }

                  i.completed {
                    opacity: 1;
                  }
                }
              }

              &.completed {
                &:hover {
                  @media (min-width: $tablet) {
                    i.completed { opacity: 0; }
                    i.remove { opacity: 1; }
                  }
                }

                img {
                  opacity: .25;
                }

                i {
                  &.completed {
                    opacity: 1;
                  }

                  &.remove {
                    opacity: 0;
                  }
                }
              }

              i {
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: $transition;
                top: 50%;
                z-index: 2;

                &.completed {
                  opacity: 0;
                }
              }

              img {
                height: auto;
                position: relative;
                width: 100%;
                z-index: 1;
              }
            }
          }
        }
      }
    }
  }
}

</style>