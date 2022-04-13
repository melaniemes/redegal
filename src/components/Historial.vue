<template>
  <div>
    <b-field label="Historial" class="style-select">
      <b-select
        placeholder="Selecciona un rango de fechas"
        @change.native="getHistorical()"
        v-model="select"
      >
        <option value="1">Último mes</option>
        <option value="2">Último trimestre</option>
        <option value="3">Último año</option>
      </b-select>
    </b-field>
    <section>
      <b-table :data="historicalData">
        <b-table-column
          :field="columns['date'].field"
          :label="columns['date'].title"
          :visible="true"
          :width="columns['date'].width"
          v-slot="props"
        >
          <span v-html="props.row.date" />
        </b-table-column>
        <b-table-column
          :field="columns['change'].field"
          :label="columns['change'].title"
          :visible="true"
          :width="columns['change'].width"
          v-slot="props"
        >
          <span v-html="props.row.change" />
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>

<script lang="ts">
interface RateChange {
  date: string;
  change: number;
}
import { Component, Vue } from "vue-property-decorator";
import Frankfurter from "@/services/Frankfurter";
import "bulma/css/bulma.css";

@Component
export default class Historial extends Vue {
  historicalData: RateChange[] = [];

  select = "0";

  columns = {
    date: {
      field: "date",
      title: "Fecha",
      width: "50%",
    },
    change: {
      field: "change",
      title: "Cambio",
      width: "50%",
    },
  };

  getHistorical(): void {
    this.historicalData = [];
    let date = new Date();
    let endDate = "";
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let startDate =
      date.getUTCFullYear() +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);

    switch (this.select) {
      case "1": {
        date.setMonth(date.getMonth() - 1);
        day = date.getUTCDate();
        month = date.getUTCMonth() + 1;
        endDate =
          date.getUTCFullYear() +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day);
        break;
      }
      case "2": {
        date.setMonth(date.getMonth() - 3);
        day = date.getUTCDate();
        month = date.getUTCMonth() + 1;
        endDate =
          date.getUTCFullYear() +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day);
        break;
      }
      case "3": {
        date.setMonth(date.getMonth() - 12);
        day = date.getUTCDate();
        month = date.getUTCMonth() + 1;
        endDate =
          date.getUTCFullYear() +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day);
        break;
      }
    }

    Frankfurter.getHistoricalChange(endDate + ".." + startDate).then((data) => {
      Object.entries(data.rates).forEach((rate) => {
        this.historicalData.push({ date: rate[0], change: rate[1].USD });
      });
    });
  }
}
</script>

<style scoped>
.style-select {
  margin: 10%;
}
</style>
