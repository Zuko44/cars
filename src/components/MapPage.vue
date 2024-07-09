<template>
  <div style="height: 5vh">
    <button @click="mode = 'first'">First</button>
    <button @click="mode = 'second'">Second</button>
  </div>
  <div style="height: 95vh">
    <yandex-map
      ref="map"
      style="width: 100%; height: 100%"
      :zoom="10"
      :coords="[55.751999, 37.617734]"
    >
      <template :key="item.key" v-for="item in items">
        <ymap-marker :markerId="`p_${item.key}`" :coords="item.pos" />
      </template>
    </yandex-map>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mode: 'first',
    };
  },
  computed: {
    items() {
      let ar = [
        {
          pos: [55.7532, 37.6225],
          key: 'first',
        },
        {
          pos: [55.8351, 37.4859],
          key: 'second',
        },
      ];
      return ar.filter((item) => item.key === this.mode);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
