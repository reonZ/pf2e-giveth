import { giveth } from './giveth'
import { getDetailsFromData, isValidActor } from './utils'

export function onDropCanvasData(canvas: Canvas, data: DropCanvasData) {
    const details = getDetailsFromData(data)
    if (!details) return true

    const target = canvas.tokens.placeables
        .slice()
        .filter(token => {
            if (!token.document.actorLink) return false

            const target = token.actor as ActorPF2e
            if (!isValidActor(target, data.actorId) || target.isOwner) return false

            const maximumX = token.x + (token.hitArea?.right ?? 0)
            const maximumY = token.y + (token.hitArea?.bottom ?? 0)
            return data.x >= token.x && data.y >= token.y && data.x <= maximumX && data.y <= maximumY
        })
        .sort((a, b) => b.document.sort - a.document.sort)
        .at(0)?.actor

    if (!target) return true

    giveth(details.actor, target as ActorPF2e, details.item)
    return false
}
