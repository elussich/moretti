<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" class="relative">
    <Card
      class="card--in-well"
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
import Well from "../models/Well.js";
import CardClass from "../models/Card.js";
import cardGroup from "../mixins/cardGroup.js";
import Card from "./Card.vue";

export default {
  name: "Well",
  components: {
    Card
  },
  mixins: [cardGroup],
  props: {
    cardGroup: Well,
    currentCard: CardClass,
    onDragStartFrom: Function,
    onDroppedCard: Function
  }
};
</script>
