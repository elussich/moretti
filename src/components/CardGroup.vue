<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop">
    <Card
      v-for="card in cardGroup.cards"
      :key="card.id"
      :card="card"
      :draggable="isDraggable(card)"
    >
    </Card>
  </div>
</template>

<script>
import CardGroup from "../models/CardGroup.js";
import Card from "./Card.vue";

export default {
  name: "CardGroup",
  components: {
    Card
  },
  props: {
    cardGroup: CardGroup,
    onDroppedCard: Function
  },
  methods: {
    isDraggable(card) {
      return this.cardGroup.isLast(card);
    },
    onDragOver() {
      // @todo abstract out this logic
      const lastCard = this.cardGroup.cards[this.cardGroup.cards.length - 1];
      const draggedCardNumber = +event.dataTransfer.getData("cardNumber");
      const draggedCardFigure = event.dataTransfer.getData("cardFigure");
      if (
        draggedCardFigure !== lastCard.figure &&
        draggedCardNumber + 1 === lastCard.number
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
