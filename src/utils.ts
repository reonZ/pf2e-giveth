export function getDetailsFromData(
    data: DropCanvasItemDataPF2e
): { actor: ActorPF2e; item: GivethItem; value?: number } | undefined {
    if (data.tokenId || data.type !== 'Item' || !data.uuid) return

    const item = fromUuidSync(data.uuid) as GivethItem
    if (!item) return

    let actor: ActorPF2e | null = item.actor
    if (!actor) {
        const actorUUID = data.context?.origin.actor
        actor = actorUUID ? fromUuidSync<ActorPF2e>(actorUUID) : null
    }
    if (!isValidActor(actor) || !actor.isOwner) return

    const isIndex = !(item instanceof Item)
    if (isIndex && item.pack && ['effect', 'condition'].includes(item.type)) return { actor, item, value: data.value }
    if (!isIndex && item.isOfType('physical', 'effect')) return { actor, item, value: data.value }
}

export function isValidActor(actor: ActorPF2e | null | undefined, id?: string): actor is CharacterPF2e | NPCPF2e | VehiclePF2e {
    if (!actor || (id && actor.id === id)) return false
    return actor.hasPlayerOwner && !actor.isToken && actor.isOfType('character', 'npc', 'vehicle')
}

export function isGMOnline() {
    return game.users.some(user => user.active && user.isGM)
}
