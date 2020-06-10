<template>
  <transition name="fade">
    <div class="home container" v-show="show">
      <Filters />
      <Weapons :weapons="weapons" />
      <TotalProgress />

      <Debug v-if="!production" />
    </div>
  </transition>
</template>

<script>
import Debug from '@/components/Debug.vue'
import Filters from '@/components/Filters.vue'
import TotalProgress from '@/components/TotalProgress.vue'
import Weapons from '@/components/Weapons.vue'

export default {
  name: 'Home',

  components: {
    Debug,
    Filters,
    TotalProgress,
    Weapons
  },

  data() {
    return {
      show: false,
      production: process.env.NODE_ENV === 'production'
    }
  },

  computed: {
    weapons() {
      let weapons = this.$store.state.weapons;

      let { hideNonRequired, hideCompleted, category } = this.$store.state.filters;

      if (hideNonRequired) weapons = weapons.filter(w => w.required);
      if (hideCompleted) weapons = weapons.filter(w => !Object.values(w.progress).every(Boolean));
      if (category && category !== 'null') weapons = weapons.filter(w => w.category === category);

      return this.groupBy(weapons, weapon => weapon.category);
    },
  },

  methods: {
    groupBy(list, keyGetter) {
      const map = {};
      list.forEach(item => {
        const key = keyGetter(item);

        if (!map[key]) {
          map[key] = [item];
        } else {
          map[key].push(item);
        }
      });
      return map;
    }
  },

  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.home {
  @media (min-width: $tablet) {
    padding-bottom: 250px;
  }
}
</style>