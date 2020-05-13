<template>
  <div class="card border-gray-700 border rounded-sm p-3 bg-blue-200">
    {{ card.name }} / {{ index }}
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
