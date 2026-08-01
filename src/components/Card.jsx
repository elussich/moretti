export default function Card({ card, draggable, onDragStart, className }) {
  function handleDragStart(event) {
    onDragStart(card)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
  }

  const classes = [
    'card',
    'border-gray-400',
    'border',
    'rounded-lg',
    'p-3',
    'bg-gray-100',
    'shadow-lg',
    card.willReceive && 'bg-green-100',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      className={classes}
    >
      <span className="pr-2">{card.symbol}</span>
      <span>{card.number}</span>
    </div>
  )
}
