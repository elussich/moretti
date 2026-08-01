import Card from './Card.jsx'
import { useCardGroup } from '../hooks/useCardGroup.js'

export default function Well({
  cardGroup,
  currentCard,
  onDragStartFrom,
  onDroppedCard,
  onUpdate,
  className,
}) {
  const { isDraggable, onDragStart, onDragOver, onDragLeave, onDrop } =
    useCardGroup({
      cardGroup,
      currentCard,
      onDragStartFrom,
      onDroppedCard,
      onUpdate,
    })

  const wellClass = [
    'relative',
    cardGroup.willReceive && 'bg-green-100',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={wellClass}
    >
      {cardGroup.cards.map((card) => (
        <Card
          key={card.id}
          className="card--in-well"
          card={card}
          onDragStart={onDragStart}
          draggable={isDraggable(card)}
        />
      ))}
    </div>
  )
}
