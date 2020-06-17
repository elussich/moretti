<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" v-bind:class="columnClass">
    <Card
      v-for="card in column.cards"
      :key="card.id"
      :card="card"
      :draggable="isDraggable(card)"
    >
    </Card>
  </div>
</template>

<script>
import Column from "../models/Column.js";
import CardClass from "../models/Card.js";
import Card from "./Card.vue";

export default {
  name: "Column",
  components: {
    Card
  },
  props: {
    column: Column,
    onDroppedCard: Function
  },
  computed: {
    columnClass() {
      return this.column.cards.length === 0
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
      return this.column.isLast(card) || this.column.isLadderHead(card);
    },
    onDragOver(event) {
      const draggedCardNumber = +event.dataTransfer.getData("cardNumber");
      const draggedCardFigure = event.dataTransfer.getData("cardFigure");
      const tempCard = new CardClass({
        figure: draggedCardFigure,
        number: draggedCardNumber
      });
      if (this.column.willAddCard(tempCard)) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      const cardId = event.dataTransfer.getData("cardId");
      this.onDroppedCard(cardId, this.column.index);
    }
  }
};
</script>
