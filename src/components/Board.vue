<template>
  <div class="flex">
    <div class="grid grid-cols-8 w-10/12">
      <Column
        class="block mr-4"
        v-for="(column, index) in pack.columns"
        :key="index"
        :column="column"
        :currentCard="currentCard"
        v-bind:onDragStartFrom="onDragStartFrom"
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
          :well="well"
          :currentCard="currentCard"
          v-bind:onDroppedCard="onDroppedCardInWell"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Column from "./Column.vue";
import Well from "./Well.vue";
import Pack from "../models/Pack.js";
import Wells from "../models/Wells.js";
import Cards from "../data/cards.js";

const pack = new Pack(Cards);
const wells = new Wells();

export default {
  name: "Board",
  order: 1,
  components: {
    Column,
    Well
  },
  data() {
    return {
      pack,
      wells,
      currentCard: null,
      origin: null
    };
  },
  methods: {
    onDragStartFrom(card, origin) {
      this.currentCard = card;
      this.origin = origin;
    },
    onDroppedCard(card, column) {
      if (this.origin.isLadderHead(card)) {
        const cards = this.origin.getLadder();
        console.log("card is ladder head, bring in the whole ladder!", cards);
        this.origin.removeLadder();
        this.pack.addLadderToColumn(cards, column.index);
      } else {
        this.origin.remove(card);
        column.add(card);
      }
    },
    onDroppedCardInWell(card, well) {
      this.origin.remove(card);
      well.add(card);
    }
  }
};
</script>
