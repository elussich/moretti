export default {
  methods: {
    isDraggable(card) {
      return this.cardGroup.isLast(card) || this.cardGroup.isLadderHead(card);
    },
    onDragStart(card) {
      this.onDragStartFrom(card, this.cardGroup);
    },
    onDragOver(event) {
      if (this.currentCard && this.cardGroup.willAddCard(this.currentCard)) {
        event.preventDefault();
      }
    },
    onDrop(event) {
      event.preventDefault();
      this.onDroppedCard(this.currentCard, this.cardGroup);
    }
  }
};
