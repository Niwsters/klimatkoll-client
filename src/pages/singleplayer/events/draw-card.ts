export function drawCard(cards: Card[], socketID: number): EventToAdd {
  const cardID = Math.floor(Math.random() * cards.length)

  return {
    event_type: "draw_card",
    payload: { card: cards[cardID], socketID },
    timestamp: Date.now()
  }
}
