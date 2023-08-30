import { MODULE_ID, chatUUID } from './module'

export async function takethCondition({ targetId, uuid, value }) {
    const target = game.actors.get(targetId)
    if (!target) return

    const item = await fromUuid(uuid)
    if (!item) return

    target.increaseCondition(item.slug, { min: value })
}

export async function takethEffect({ targetId, uuid }) {
    const target = game.actors.get(targetId)
    if (!target) return

    const item = await fromUuid(uuid)
    if (!item) return

    const source = item.clone({ 'system.tokenIcon.show': true, 'system.unidentified': false }).toObject()
    target.createEmbeddedDocuments('Item', [source])
}

export async function takethPhysical({ itemId, ownerId, qty, stack, targetId }) {
    const owner = game.actors.get(ownerId)
    const target = game.actors.get(targetId)
    if (!owner || !target) return

    const item = owner.items.get(itemId)
    if (!item) return

    qty = Math.min(qty, item.quantity)
    const newQty = item.quantity - qty

    const source = item.toObject()
    source.system.quantity = qty
    source.system.equipped.carryType = 'worn'
    if (item.isOfType('physical') && 'invested' in source.system.equipped) {
        source.system.equipped.invested = item.traits.has('invested') ? false : null
    }

    const newItem = await target.addToInventory(source, undefined, stack)
    if (!newItem) return

    if (newQty < 1) item.delete()
    else item.update({ 'system.quantity': newQty })

    if (!game.settings.get(MODULE_ID, 'message')) return

    let content = chatUUID(newItem.uuid, newItem.name, !newItem.isIdentified)
    if (qty > 1) content += ` x${qty}`

    ChatMessage.create({
        flavor: `<h4 class="action">${game.i18n.format(`${MODULE_ID}.giveth`, { target: target.name })}</h4>`,
        content,
        speaker: ChatMessage.getSpeaker({ actor: owner }),
    })
}
