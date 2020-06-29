<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" class="relative">
    <Card
      class="card--in-well"
      v-for="card in well.cards"
      :key="card.id"
      :card="card"
      v-bind:dragStart="onDragStart"
    >
    </Card>
  </div>
</template>

<script>
import Well from "../models/Well.js";
import CardClass from "../models/Card.js";
import Card from "./Card.vue";

export default {
  name: "Well",
  components: {
    Card
  },
  props: {
    well: Well,
    currentCard: CardClass,
    onDroppedCard: Function
  },
  methods: {
    // @todo See if we can abstract out these methods into a base component
    onDragStart(card) {
      this.onDragStartFrom(card, this.well);
    },
    onDragOver(event) {
      if (this.currentCard && this.well.willAddCard(this.currentCard)) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      this.onDroppedCard(this.currentCard, this.well);
    }
  }
};
</script>
