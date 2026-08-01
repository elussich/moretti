import Card from './Card.jsx'
import { useCardGroup } from '../hooks/useCardGroup.js'

export default function Column({
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

  const columnClass =
    cardGroup.cards.length === 0
      ? [
          'border-gray-100',
          'bg-gray-100',
          'border',
          'rounded-lg',
          'shadow-inner',
          'column--empty',
          cardGroup.willReceive && 'bg-green-100',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      : [className].filter(Boolean).join(' ')

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={columnClass}
    >
      {cardGroup.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={onDragStart}
          draggable={isDraggable(card)}
        />
      ))}
    </div>
  )
}
