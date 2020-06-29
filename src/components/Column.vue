<template>
  <div v-on:dragover="onDragOver" v-on:drop="onDrop" v-bind:class="columnClass">
    <Card
      v-for="card in column.cards"
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
import Card from "./Card.vue";

export default {
  name: "Column",
  components: {
    Card
  },
  props: {
    column: Column,
    currentCard: CardClass,
    onDragStartFrom: Function,
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
    onDragStart(card) {
      this.onDragStartFrom(card, this.column);
    },
    onDragOver(event) {
      if (this.currentCard && this.column.willAddCard(this.currentCard)) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      this.onDroppedCard(this.currentCard, this.column);
    }
  }
};
</script>
