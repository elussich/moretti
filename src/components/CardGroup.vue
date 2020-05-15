<template>
  <draggable :sort="sort || false" :list="cards" :group="group" @change="change">
    <Card
      v-for="(card, index) in cards"
      :key="card.id"
      :card="card"
      :index="index"
    >
    </Card>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card.vue";

export default {
  name: "CardGroup",
  components: {
    draggable,
    Card
  },
  props: {
    cards: Array,
    group: String,
    change: Function,
    sort: Boolean
  }
};
</script>
