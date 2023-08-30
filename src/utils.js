export function isValidActor(actor, id) {
    if (!actor || (id && actor.id === id)) return false
    return actor.hasPlayerOwner && !actor.isToken && actor.isOfType('character', 'npc', 'vehicle')
}

export function getDetailsFromData(data) {
    if (data.tokenId || data.type !== 'Item' || !data.uuid) return

    const item = fromUuidSync(data.uuid)
    if (!item) return

    let actor = item.actor
    if (!actor) {
        const actorUUID = data.context?.origin.actor
        actor = actorUUID ? fromUuidSync(actorUUID) : null
    }

    if (!isValidActor(actor) || !actor.isOwner) return

    const isIndex = !(item instanceof Item)
    if (isIndex && item.pack && ['effect', 'condition'].includes(item.type)) return { actor, item, value: data.value }
    if (!isIndex && item.isOfType('physical', 'effect')) return { actor, item, value: data.value }
}
