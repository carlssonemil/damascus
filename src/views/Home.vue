<template>
  <transition name="fade">
    <div class="home container" v-show="show">
      <Filters :type="'weapons'" :showSymbols="['damascus']" />
      <Weapons :weapons="weapons" />
      <TotalProgress />
    </div>
  </transition>
</template>

<script>
import Filters from '@/components/Filters.vue'
import TotalProgress from '@/components/TotalProgress.vue'
import Weapons from '@/components/Weapons.vue'

export default {
  name: 'Home',

  components: {
    Filters,
    TotalProgress,
    Weapons
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    weapons() {
      let weapons = this.$store.state.weapons;

      let { hideNonRequired, hideCompleted, category } = this.$store.state.filters.weapons;

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
.home {
  @media (min-width: $tablet) {
    padding-bottom: 250px;
  }
}
</style>