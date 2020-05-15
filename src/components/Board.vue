<template>
  <div class="flex">
    <div class="grid grid-cols-8 w-10/12">
      <CardGroup
        class="block mr-4"
        v-for="(column, index) in columns"
        :key="index"
        :cards="column"
        :group="'cards'"
        v-bind:change="log"
      />
    </div>
    <div class="w-2/12 pl-2 border-l border-gray-400">
      <h3 class="mb-4">Pozos</h3>
      <CardGroup
        class="block w-full h-12 bg-gray-100 mb-2"
        :cards="wells[0]"
        :group="'cards'"
        v-bind:change="log"
      />
      <CardGroup
        class="block w-full h-12 bg-gray-100 mb-2"
        :cards="wells[1]"
        :group="'cards'"
        v-bind:change="log"
      />
      <CardGroup
        class="block w-full h-12 bg-gray-100 mb-2"
        :cards="wells[2]"
        :group="'cards'"
        v-bind:change="log"
      />
      <CardGroup
        class="block w-full h-12 bg-gray-100 mb-2"
        :cards="wells[3]"
        :group="'cards'"
        v-bind:change="log"
      />
    </div>
  </div>
</template>

<script>
import CardGroup from "./CardGroup.vue";
import Cards from "../models/Cards.js";
import Pack from "../models/Pack.js";

const pack = new Pack(Cards);
console.log(pack.serialize());

export default {
  name: "Board",
  order: 1,
  components: {
    CardGroup
  },
  data() {
    return {
      columns: pack.serialize(),
      wells: [[], [], [], []]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
