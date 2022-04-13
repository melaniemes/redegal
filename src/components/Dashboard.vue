<template>
  <div class="card cardSize">
    <div class="card-content">
      <div class="content">
        <b-field label="Euro"> 1 </b-field>
        <b-field label="Dolar">
          {{ change }}
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Frankfurter from "@/services/Frankfurter";
import "bulma/css/bulma.css";

@Component
export default class Dashboard extends Vue {
  change = 0;

  created(): void {
    Frankfurter.getChange().then((data) => {
      this.change = data.rates.USD;
    });
  }
}
</script>

<style>
.cardSize {
  width: 50%;
  text-align: center;
  margin: 10%;
}

</style>
