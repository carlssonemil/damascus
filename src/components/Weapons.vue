<template>
  <div>
    <transition-group name="fade" tag="div" class="container">
      <div class="category" v-for="(category, title, index) in weapons" :key="title" :data-index="index">
        <h2>{{ title }}s</h2>
        <transition-group name="fade" tag="div" class="weapons">
          <div class="weapon" v-for="weapon in category" :key="weapon.alias">
            <div class="name" 
                :class="{ 
                  completed: completed(weapon, mode), 
                  required: weapon.required && mode === 'Camouflages',
                  challenge: mode === 'Challenges'
                  }" 
                @dblclick="toggleWeaponComplete(weapon, completed(weapon, mode), mode)"
                v-tippy="{ content: `Double-click to ${ completed(weapon, mode) ? 'reset' : 'complete' } weapon` }">{{ weapon.name }}</div>
            
            <!-- Camouflages Progress -->
            <div class="progress" v-if="mode === 'Camouflages'">
              <div class="camo" 
                  v-for="(completed, camo) in weapon.progress" 
                  :key="camo" 
                  @click="toggleComplete(weapon, camo, completed)" 
                  :content="camoTooltip(title, camo, weapon)" 
                  v-tippy="{ placement: 'bottom' }">
                <div class="inner" :class="{ completed }">
                  <eva-icon class="completed" name="checkmark" fill="#10ac84"></eva-icon>
                  <eva-icon v-if="completed" class="remove" name="close" fill="#ee5253"></eva-icon>
                  <img :src="require(`../assets/camouflages/${ convertToKebabCase(camo) }.png`)" :alt="camo">
                </div>
              </div>
            </div>

            <!-- Mastery Camouflages Progress -->
            <div class="mastery" v-if="completed(weapon, mode) && mode === 'Camouflages'">
              <div class="camo" 
                  v-for="(completed, camo) in weapon.mastery" 
                  :key="camo" 
                  @click="toggleComplete(weapon, camo, completed)" 
                  :content="camoTooltip(title, camo, weapon)" 
                  v-tippy="{ placement: 'bottom' }">
                <div class="inner" :class="{ completed }">
                  <eva-icon class="completed" name="checkmark" fill="#10ac84"></eva-icon>
                  <eva-icon v-if="completed" class="remove" name="close" fill="#ee5253"></eva-icon>
                  <p>{{ camo }}</p>
                </div>
              </div>
            </div>

            <!-- Challenges Progress -->
            <div class="challenges" v-if="mode === 'Challenges'">
              <div class="challenge"
                  v-for="challenge in weapon.challenges"
                  :key="`${challenge.category}-${challenge.level}`"
                  @click="toggleChallengeComplete(weapon, challenge)"
                  :content="challengeTooltip(title, challenge, weapon)"
                  v-tippy="{ placement: 'bottom' }">
                <div class="inner" :class="{ completed: challenge.completed }">
                  <eva-icon class="completed" name="checkmark" fill="#10ac84"></eva-icon>
                  <eva-icon v-if="challenge.completed" class="remove" name="close" fill="#ee5253"></eva-icon>
                  <img :src="require(`../assets/challenges/${ convertToKebabCase(challenge.category) }-${ convertToKebabCase(challenge.level) }.png`)" :alt="challenge.challenge">
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </transition-group>

    <div v-if="Object.keys(weapons).length === 0" class="finished-placeholder">
      <p v-if="mode === 'Camouflages'">You've completed all camouflage challenges 👏</p>
      <p v-if="mode === 'Challenges'">You've completed all mastery challenges 👏</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weapons',

  props: ['title', 'weapons', 'mode'],

  methods: {
    completed(weapon, mode) {
      if (mode === 'Camouflages') {
        return Object.values(weapon.progress).every(Boolean);
      } else if (mode === 'Challenges') {
        return Object.keys(weapon.challenges).map(challenge => weapon.challenges[challenge].completed).every(Boolean);
      }
    },

    toggleComplete(weapon, camo, current) {
      this.$store.dispatch('toggleCompleted', { weapon, camo, current });
    },

    toggleWeaponComplete(weapon, current, mode) {
      this.$store.dispatch('toggleWeaponCompleted', { weapon, current, mode });
    },

    toggleChallengeComplete(weapon, challenge) {
      this.$store.dispatch('toggleChallengeCompleted', { weapon, challenge });
    },

    camoTooltip(category, camo, weapon) {
      if (typeof this.$store.state.camos.find(c => c.name === camo).requirements[category] !== 'string') {
        return this.$store.state.camos.find(c => c.name === camo).requirements[category][weapon.name];
      } else {
        return this.$store.state.camos.find(c => c.name === camo).requirements[category];
      }
    },

    challengeTooltip(category, challenge, weapon) {
      if (typeof this.$store.state.challenges.find(c => c.category === challenge.category).levels[challenge.level][category] !== 'string') {
        return this.$store.state.challenges.find(c => c.category === challenge.category).levels[challenge.level][category][weapon.name];
      } else {
        return `${challenge.category} - ${challenge.level}: ${this.$store.state.challenges.find(c => c.category === challenge.category).levels[challenge.level][category]}`;
      }
    },

    convertToKebabCase(string) {
      return string.replace(/\s+/g, '-').toLowerCase();
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

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

    .weapons {
      display: grid;
      gap: 30px;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;

      @media (max-width: $tablet) {
        grid-template-columns: 1fr;
      }

      .weapon {
        position: relative;

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
            background: $yellow;
            color: black;

            &.challenge {
              background: $green;
              color: white;
            }
          }

          &.required {
            border-left: 5px solid $purple;
            padding: 25px 25px 25px 20px; // to maintain text center alignment with the extra thick border

            @media (max-width: $tablet) {
              padding: 15% 15% 15% calc(15% - 5px) // to maintain text center alignment with the extra thick border
            }
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
              transition: $transition;
              width: 100%;

              &:hover {
                @media (min-width: $tablet) {
                  img, p {
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

                img, p {
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

              p {
                font-size: 14px;
              }
            }
          }
        }

        .mastery {
          @extend .progress;
          grid-template-columns: 1fr;

          .camo {
            .inner {
              padding: 5px;

              i {
                left: 5px;
                transform: translate(0, -50%);
                top: 50%;
              }
            }
          }
        }

        .challenges {
          @extend .progress;
          grid-template-columns: repeat(4, 1fr);

          .challenge {
            @extend .camo;

            .inner {
              img {
                transform: scale(1.4);
              }
            }
          }
        }
      }
    }
  }
}

.finished-placeholder {
  color: darken(white, 50%);
  margin-top: 10vh;
  text-align: center;
  width: 100%;

  p {
    font-size: 22px;
    line-height: 1.7;

    @media (max-width: $tablet) {
      font-size: 24px;
    }
  }
}
</style>