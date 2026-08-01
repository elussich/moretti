/**
 * Shared drag/drop behavior for Column and Well (ported from Vue cardGroup mixin).
 */
export function useCardGroup({
  cardGroup,
  currentCard,
  onDragStartFrom,
  onDroppedCard,
  onUpdate,
}) {
  function isDraggable(card) {
    return cardGroup.isLast(card) || cardGroup.isLadderHead(card)
  }

  function toggleReceiver(willReceive) {
    const receiverCard = cardGroup.getLastCard()
    const groupChanged = cardGroup.willReceive !== willReceive
    const cardChanged = receiverCard && receiverCard.willReceive !== willReceive

    if (!groupChanged && !cardChanged) return

    cardGroup.willReceive = willReceive
    if (receiverCard) {
      receiverCard.willReceive = willReceive
    }
    onUpdate?.()
  }

  function onDragStart(card) {
    onDragStartFrom(card, cardGroup)
  }

  function onDragOver(event) {
    if (currentCard && cardGroup.willAddCard(currentCard)) {
      event.preventDefault()
      toggleReceiver(true)
    }
  }

  function onDragLeave() {
    toggleReceiver(false)
  }

  function onDrop(event) {
    event.preventDefault()
    toggleReceiver(false)
    onDroppedCard(currentCard, cardGroup)
  }

  return {
    isDraggable,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  }
}
