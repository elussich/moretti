<template>
  <div class="flex">
    <div class="grid grid-cols-8 w-10/12">
      <CardGroup
        class="block mr-4"
        v-for="(cardGroup, index) in pack.columns"
        :key="index"
        :cardGroup="cardGroup"
        v-bind:onDroppedCard="onDroppedCard"
      />
    </div>
    <div class="w-2/12 pl-4 border-l border-gray-400">
      <h3 class="mb-4">Pozos</h3>
      <CardGroup
        class="block w-full h-12 bg-gray-100 mb-2 shadow-inner"
        v-for="(well, index) in wells.columns"
        :key="index"
        :cardGroup="well"
      />
    </div>
  </div>
</template>

<script>
import CardGroup from "./CardGroup.vue";
import Cards from "../models/Cards.js";
import Pack from "../models/Pack.js";
import Wells from "../models/Wells.js";

const pack = new Pack(Cards);
const wells = new Wells();

export default {
  name: "Board",
  order: 1,
  components: {
    CardGroup
  },
  data() {
    return {
      pack,
      wells
    };
  },
  methods: {
    onDroppedCard(cardId, cardGroupIndex) {
      const card = this.pack.removeCardById(cardId);
      this.pack.addCardToColumn(card, cardGroupIndex);
    }
  }
};
</script>
