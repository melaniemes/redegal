<template>
  <div id="app">
    <Dashboard />
    <Historial />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dashboard from "./components/Dashboard.vue";
import Historial from "./components/Historial.vue";

@Component({
  components: {
    Dashboard,
    Historial
  },
})
export default class App extends Vue {}
</script>