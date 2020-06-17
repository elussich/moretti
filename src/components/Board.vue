<template>
  <div class="flex">
    <div class="grid grid-cols-8 w-10/12">
      <Column
        class="block mr-4"
        v-for="(column, index) in pack.columns"
        :key="index"
        :column="column"
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
      wells
    };
  },
  methods: {
    onDroppedCard(cardId, destColumnIndex) {
      console.log("card dropped:", this.pack.findCardById(cardId));
      const card = this.pack.findCardById(cardId);
      if (card.cardGroup.isLadderHead(card)) {
        const cards = card.cardGroup.getLadder();
        console.log("card is ladder head, bring in the whole ladder!", cards);
        card.cardGroup.removeLadder();
        this.pack.addLadderToColumn(cards, destColumnIndex);
      } else {
        card.cardGroup.remove(card);
        this.pack.addCardToColumn(card, destColumnIndex);
      }
    },
    onDroppedCardInWell(cardId, wellIndex) {
      const card = this.pack.findCardById(cardId);
      card.cardGroup.remove(card);
      this.wells.addCardToWell(card, wellIndex);
    }
  }
};
</script>
