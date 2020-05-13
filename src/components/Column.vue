<template>
  <div class="mr-4">
    <draggable
      class="list-group"
      :list="cards"
      :group="group"
      @change="change"
    >
      <Card
        class="list-group-item mb-2"
        v-for="(card, index) in cards"
        :key="card.id"
        :card="card"
        :index="index"
      >
      </Card>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card.vue";

export default {
  name: "Column",
  components: {
    draggable,
    Card
  },
  props: {
    cards: Array,
    group: String,
    change: Function
  }
};
</script>
