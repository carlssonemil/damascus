<template>
  <transition name="fade">
    <div class="challenges container" v-show="show">
      <Filters :type="'challenges'" />
      <Weapons :weapons="weapons" :mode="'Challenges'" />
      <TotalProgress :view="'Challenges'" />
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

      let { hideCompleted, category } = this.$store.state.filters.challenges;

      if (hideCompleted) weapons = weapons.filter(w => !Object.keys(w.challenges).map(challenge => w.challenges[challenge].completed).every(Boolean));
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
.challenges {
  @media (min-width: $tablet) {
    padding-bottom: 250px;
  }
}
</style>