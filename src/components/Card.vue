<template>
  <div class="card border-gray-400 border rounded-sm p-3 bg-gray-100">
    <span class="pr-2">{{ card.symbol }}</span>
    <span>{{ card.number }}</span>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
    index: Number
  }
};
</script>
