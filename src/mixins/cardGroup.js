export default {
  methods: {
    isDraggable(card) {
      return this.cardGroup.isLast(card) || this.cardGroup.isLadderHead(card);
    },
    toggleReceiver(willReceive) {
      // mark/unmark card group as receiver
      this.cardGroup.willReceive = willReceive;
      // mark/unmark receiver card also, if any
      const receiverCard = this.cardGroup.getLastCard();
      if (receiverCard) {
        receiverCard.willReceive = willReceive;
      }
    },
    onDragStart(card) {
      this.onDragStartFrom(card, this.cardGroup);
    },
    onDragOver(event) {
      if (this.cardGroup.willAddCard(this.currentCard)) {
        event.preventDefault();
        this.toggleReceiver(true);
      }
    },
    onDragLeave() {
      this.toggleReceiver(false);
    },
    onDrop(event) {
      event.preventDefault();
      this.toggleReceiver(false);
      this.onDroppedCard(this.currentCard, this.cardGroup);
    }
  }
};
