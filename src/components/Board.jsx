import { useCallback, useState } from 'react'
import Column from './Column.jsx'
import Well from './Well.jsx'
import Pack from '../models/Pack.js'
import Wells from '../models/Wells.js'
import Cards from '../data/cards.js'

export default function Board() {
  const [pack] = useState(() => new Pack(Cards))
  const [wells] = useState(() => new Wells())
  const [currentCard, setCurrentCard] = useState(null)
  const [origin, setOrigin] = useState(null)
  const [, setVersion] = useState(0)

  const onUpdate = useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  const onDragStartFrom = useCallback((card, from) => {
    setCurrentCard(card)
    setOrigin(from)
  }, [])

  const onDroppedCard = useCallback(
    (card, column) => {
      if (origin.isLadderHead(card)) {
        const cards = origin.getLadder()
        origin.removeLadder()
        pack.addLadderToColumn(cards, column.index)
      } else {
        origin.remove(card)
        column.add(card)
      }
      setCurrentCard(null)
      setOrigin(null)
      onUpdate()
    },
    [origin, pack, onUpdate]
  )

  const onDroppedCardInWell = useCallback(
    (card, well) => {
      origin.remove(card)
      well.add(card)
      setCurrentCard(null)
      setOrigin(null)
      onUpdate()
    },
    [origin, onUpdate]
  )

  return (
    <div className="flex">
      <div className="grid grid-cols-8 w-10/12">
        {pack.columns.map((column, index) => (
          <Column
            key={index}
            className="block mr-4"
            cardGroup={column}
            currentCard={currentCard}
            onDragStartFrom={onDragStartFrom}
            onDroppedCard={onDroppedCard}
            onUpdate={onUpdate}
          />
        ))}
      </div>
      <div className="w-2/12 pl-4 border-l border-gray-400">
        <h3 className="mb-4">Pozos</h3>
        <div className="grid grid-cols-2 gap-3">
          {wells.wells.map((well, index) => (
            <Well
              key={index}
              className="bg-gray-100 shadow-inner column--empty"
              cardGroup={well}
              currentCard={currentCard}
              onDragStartFrom={onDragStartFrom}
              onDroppedCard={onDroppedCardInWell}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
