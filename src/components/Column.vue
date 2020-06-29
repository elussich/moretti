<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" v-bind:class="columnClass">
    <Card
      v-for="card in cardGroup.cards"
      :key="card.id"
      :card="card"
      v-bind:dragStart="onDragStart"
      :draggable="isDraggable(card)"
    >
    </Card>
  </div>
</template>

<script>
import Column from "../models/Column.js";
import CardClass from "../models/Card.js";
import cardGroup from "../mixins/cardGroup.js";
import Card from "./Card.vue";

export default {
  name: "Column",
  components: {
    Card
  },
  mixins: [cardGroup],
  props: {
    cardGroup: Column,
    currentCard: CardClass,
    onDragStartFrom: Function,
    onDroppedCard: Function
  },
  computed: {
    columnClass() {
      return this.cardGroup.cards.length === 0
        ? [
            "border-gray-100",
            "bg-gray-100",
            "border",
            "rounded-lg",
            "shadow-inner",
            "column--empty"
          ]
        : [];
    }
  }
};
</script>
