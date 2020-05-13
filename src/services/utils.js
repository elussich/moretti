function shuffle(cards) {
  const srcCards = [...cards];
  let destCards = [];
  while (srcCards.length > 0) {
    let randomIndex = Math.floor( Math.random() * srcCards.length );
    let randomItem = srcCards.splice(randomIndex, 1)[0];
    destCards.push(randomItem);
  }
  return destCards;
}

export {
  shuffle
}
