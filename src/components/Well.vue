<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" class="relative">
    <Card
      class="card--in-well"
      v-for="card in well.cards"
      :key="card.id"
      :card="card"
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
    onDroppedCard: Function
  },
  methods: {
    onDragOver(event) {
      const draggedCardNumber = +event.dataTransfer.getData("cardNumber");
      const draggedCardFigure = event.dataTransfer.getData("cardFigure");
      const tempCard = new CardClass({
        figure: draggedCardFigure,
        number: draggedCardNumber
      });
      if (this.well.willAddCard(tempCard)) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      const cardId = event.dataTransfer.getData("cardId");
      this.onDroppedCard(cardId);
    }
  }
};
</script>
