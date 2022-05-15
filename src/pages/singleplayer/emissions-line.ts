import { Event } from '@shared/events'
import { Card } from 'core/card'
import { EmissionsLine } from 'core/emissionsline'
import { Position } from 'core/position'
import { handleEvent } from 'event/event-handler'

function card_played_from_deck(el: EmissionsLine, event: Event): EmissionsLine {
  return el.addCard(event.payload.card, event.payload.position, event.timestamp)
}

function handleELEvent(el: EmissionsLine, event: Event): EmissionsLine {
  return handleEvent<EmissionsLine>(el, event, { card_played_from_deck })
}

export function getEmissionsLine(events: Event[], mousePosition: Position, selectedCard: Card | undefined): EmissionsLine {
  return events
    .reduce(handleELEvent, new EmissionsLine([]))
    .update(Date.now(), mousePosition.x, mousePosition.y, selectedCard)
    .update(Date.now(), mousePosition.x, mousePosition.y, selectedCard)
    .showHideSpaceCards(selectedCard)
}
