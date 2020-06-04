<template>
  <div
    v-on:dragover="onDragOver"
    v-on:drop="onDrop"
    v-bind:class="cardGroupClass"
  >
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
  computed: {
    cardGroupClass() {
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
  },
  methods: {
    isDraggable(card) {
      return this.cardGroup.isLast(card) || this.cardGroup.isLadderHead(card);
    },
    onDragOver() {
      // @todo abstract out this logic, should it be actually moved to the models?
      const lastCard = this.cardGroup.cards[this.cardGroup.cards.length - 1];
      const draggedCardNumber = +event.dataTransfer.getData("cardNumber");
      const draggedCardFigure = event.dataTransfer.getData("cardFigure");

      // if column is not empty, and dragged card is of different figure, and next in number
      if (
        lastCard &&
        draggedCardFigure !== lastCard.figure &&
        draggedCardNumber + 1 === lastCard.number
      ) {
        event.preventDefault();
      }

      // if column is empty, and dragged card is a ten
      if (draggedCardNumber === 10 && !this.cardGroup.cards.length) {
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
