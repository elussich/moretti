<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" class="relative">
    <Card
      class="card--in-well"
      v-for="card in cardGroup.cards"
      :key="card.id"
      :card="card"
    >
    </Card>
  </div>
</template>

<script>
import CardGroup from "../models/CardGroup.js";
import Card from "./Card.vue";

export default {
  name: "Well",
  components: {
    Card
  },
  props: {
    cardGroup: CardGroup,
    onDroppedCard: Function
  },
  methods: {
    onDragOver(event) {
      // @todo abstract out this logic
      const lastCard = this.cardGroup.cards[this.cardGroup.cards.length - 1];
      const draggedCardNumber = +event.dataTransfer.getData("cardNumber");
      const draggedCardFigure = event.dataTransfer.getData("cardFigure");

      // if well is empty and dragged card is an ace
      if (this.cardGroup.cards.length === 0 && draggedCardNumber === 1) {
        event.preventDefault();
      }

      // if well has cards and dragged card is next
      if (
        lastCard &&
        draggedCardNumber === lastCard.number + 1 &&
        draggedCardFigure === lastCard.figure
      ) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      const cardId = event.dataTransfer.getData("cardId");
      this.onDroppedCard(cardId, this.cardGroup.index);
    }
  }
};
</script>
