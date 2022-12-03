import { giveth } from './giveth'
import { getDetailsFromData, isValidActor } from './utils'

export function onDropActorSheetData(target: ActorPF2e, targetSheet: ActorSheetPF2e, data: DropData) {
    if (target.isOwner || !isValidActor(target, data.actorId)) return true

    const details = getDetailsFromData(data)
    if (!details) return true

    giveth(details.actor, target, details.item)
    return false
}
