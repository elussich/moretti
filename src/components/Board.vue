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
      <div class="grid grid-cols-2 gap-3">
        <Well
          class="bg-gray-100 shadow-inner column--empty"
          v-for="(well, index) in wells.wells"
          :key="index"
          :cardGroup="well"
          v-bind:onDroppedCard="onDroppedCardInWell"
        />
    </div>
    </div>
  </div>
</template>

<script>
import CardGroup from "./CardGroup.vue";
import Well from "./Well.vue";
import Cards from "../models/Cards.js";
import Pack from "../models/Pack.js";
import Wells from "../models/Wells.js";

const pack = new Pack(Cards);
const wells = new Wells();

export default {
  name: "Board",
  order: 1,
  components: {
    CardGroup,
    Well
  },
  data() {
    return {
      pack,
      wells
    };
  },
  methods: {
    onDroppedCard(cardId, columnIndex) {
      const card = this.pack.removeCardById(cardId);
      this.pack.addCardToColumn(card, columnIndex);
    },
    onDroppedCardInWell(cardId, wellIndex) {
      const card = this.pack.removeCardById(cardId);
      this.wells.addCardToWell(card, wellIndex);
    }
  }
};
</script>
