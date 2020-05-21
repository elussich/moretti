<template>
  <draggable
    :sort="sort || false"
    :list="cardGroup.cards"
    :group="group"
    @change="change"
    :move="move"
  >
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
import CardGroup from "../models/CardGroup.js";
import Card from "./Card.vue";

export default {
  name: "CardGroup",
  components: {
    draggable,
    Card
  },
  props: {
    cardGroup: CardGroup,
    group: String,
    change: Function,
    move: {
      type: Function,
      required: false
    },
    sort: Boolean
  },
  data() {
    return {
      cards: this.cardGroup.cards
    };
  }
};
</script>
