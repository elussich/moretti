<template>
  <div
    v-bind:draggable="draggable"
    v-on:dragstart="onDragStart"
    class="card border-gray-400 border rounded-lg p-3 bg-gray-100 shadow-lg"
  >
    <span class="pr-2">{{ card.symbol }}</span>
    <span>{{ card.number }}</span>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
    draggable: Boolean
  },
  methods: {
    onDragStart(event) {
      event.dataTransfer.setData("cardId", this.card.id);
      event.dataTransfer.setData("cardNumber", this.card.number);
      event.dataTransfer.setData("cardFigure", this.card.figure);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
    }
  }
};
</script>
