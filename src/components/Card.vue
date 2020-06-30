<template>
  <div
    v-bind:draggable="draggable"
    v-on:dragstart="onDragStart"
    class="card border-gray-400 border rounded-lg p-3 bg-gray-100 shadow-lg"
    v-bind:class="{ 'bg-green-100': card.willReceive }"
  >
    <span class="pr-2">{{ card.symbol }}</span>
    <span>{{ card.number }}</span>
  </div>
</template>

<script>
import Card from "../models/Card.js";

export default {
  name: "Card",
  props: {
    card: Card,
    draggable: Boolean,
    dragStart: Function
  },
  methods: {
    onDragStart(event) {
      this.dragStart(this.card);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
    }
  }
};
</script>
