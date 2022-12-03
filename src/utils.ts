export function getDetailsFromData(data: DropData) {
    if (data.tokenId || data.type !== 'Item' || !data.uuid) return

    const actorId = data.actorId
    const actor = actorId ? game.actors.get<ActorPF2e>(actorId) : undefined
    if (!isValidActor(actor) || !actor.isOwner) return

    const itemId = data.uuid.split('.').at(-1)!
    const item = actor.items.get(itemId) as ItemPF2e | undefined

    if (item && item.isOfType('physical')) return { actor, item }
}

export function isValidActor(actor: ActorPF2e | undefined, id?: string): actor is CharacterPF2e | NPCPF2e | VehiclePF2e {
    if (!actor || (id && actor.id === id)) return false
    return actor.hasPlayerOwner && !actor.isToken && actor.isOfType('character', 'npc', 'vehicle')
}
