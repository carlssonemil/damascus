<template>
  <div class="filters">
    <div class="select">
      <label for="category">Category</label>
      <select id="category" v-model="filters.category" @change="filterChange()">
        <option value="null">All</option>
        <option v-for="(category, index) in Array.from(new Set($store.state.weapons.map(w => w.category)))" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
      <eva-icon name="chevron-down" fill="white"></eva-icon>
    </div>

    <div class="checkbox">
      <input id="hideCompleted" type="checkbox" v-model="filters.hideCompleted" @change="filterChange()">
      <label for="hideCompleted">Hide completed</label>
    </div>

    <div class="checkbox">
      <input id="hideNonRequired" type="checkbox" v-model="filters.hideNonRequired" @change="filterChange()">
      <label for="hideNonRequired">Hide non required</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filters',

  computed: {
    filters() {
      return this.$store.state.filters;
    }
  },

  methods: {
    filterChange() {
      this.$store.dispatch('storeData');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.filters {
  align-items: center;
  display: flex;
  margin-bottom: 50px;

  @media (max-width: $tablet) {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 75px;
  }

  > *:not(:first-child) {
    margin-left: 50px;

    @media (max-width: $tablet) {
      margin-left: 0;
      margin-top: 25px;
    }
  }

  .select {
    position: relative;

    @media (max-width: $tablet) {
      width: 100%;
    }

    select {
      appearance: none;
      background: $elevation-4-color;
      border: none;
      border-radius: $border-radius;
      color: white;
      cursor: pointer;
      font-family: $font-family;
      font-weight: 500;
      padding: 8px 28px 8px 8px;
      transition: $transition;

      @media (max-width: $tablet) {
        font-size: 18px;
        padding: 15px;
        width: 100%;
      }

      &:hover {
        background: $elevation-5-color;
      }
    }

    label {
      font-size: 14px;
      left: 0;
      position: absolute;
      top: 0;
      transform: translateY(calc(-100% - 6px));

      @media (max-width: $tablet) {
        font-size: 16px;
      }
    }

    i {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .checkbox {
    cursor: pointer;

    label, input {
      cursor: pointer;
    }

    label {
      margin-left: 5px;

      @media (max-width: $tablet) {
        font-size: 18px;
      }
    }
  }

  button {
    align-self: flex-end;
  }
}
</style>