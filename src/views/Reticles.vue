<template>
  <transition name="fade">
    <div class="container" v-show="show">
      <Filters :type="'reticles'" />
      <Reticles :reticles="reticles" />
    </div>
  </transition>
</template>

<script>
import Filters from '@/components/Filters.vue'
import Reticles from '@/components/Reticles.vue'

export default {
  name: 'about',

  components: {
    Filters,
    Reticles
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    reticles() {
      let reticles = this.$store.state.reticles;

      let { hideCompleted, category } = this.$store.state.filters.reticles;

      if (hideCompleted) reticles = reticles.filter(r => !r.completed);
      if (category && category !== 'null') reticles = reticles.filter(r => r.category === category);

      return this.groupBy(reticles, reticle => reticle.category);
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

.container {
  @media (min-width: $tablet) {
    padding-bottom: 250px;
  }
}
</style>