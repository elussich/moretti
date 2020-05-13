<template>
  <div class="grid grid-cols-8 w-full">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :cards="column"
      :group="'cards'"
      v-bind:change="log"
    />
  </div>
</template>

<script>
import Column from "./Column.vue";
import Cards from "../models/Cards.js";
import Pack from "../models/Pack.js";

const pack = new Pack(Cards);
console.log(pack.serialize());

export default {
  name: "Board",
  order: 1,
  components: {
    Column
  },
  data() {
    return {
      columns: pack.serialize()
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
