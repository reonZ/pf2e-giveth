import { giveth } from './giveth'
import { getDetailsFromData, isGMOnline, isValidActor } from './utils'

export function onDropActorSheetData(target: ActorPF2e, _: ActorSheetPF2e, data: DropCanvasItemDataPF2e) {
    if (!isGMOnline() || target.isOwner || !isValidActor(target, data.actorId)) return true

    const details = getDetailsFromData(data)
    if (!details) return true

    giveth(details.actor, target, details.item, details.value)
    return false
}
