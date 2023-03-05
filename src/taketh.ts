import { hasInvestedProperty } from '@utils/pf2e/item'
import { getSetting } from '@utils/foundry/settings'
import { localize } from '@utils/foundry/localize'
import { chatUUID, fakeChatUUID } from '@utils/foundry/uuid'

export async function takethCondition({ targetId, uuid, value }: ConditionPacket) {
    const target = game.actors.get(targetId)
    if (!target) return

    const item = await fromUuid<ConditionPF2e>(uuid)
    if (!item) return

    target.increaseCondition(item.slug as ConditionSlug, { min: value })
}

export async function takethEffect({ targetId, uuid }: EffectPacket) {
    const target = game.actors.get(targetId)
    if (!target) return

    const item = await fromUuid<EffectPF2e>(uuid)
    if (!item) return

    const source = item.clone({ 'system.tokenIcon.show': true, 'system.unidentified': false }).toObject()
    target.createEmbeddedDocuments('Item', [source])
}

export async function takethPhysical({ itemId, ownerId, qty, stack, targetId }: PhysicalPacket) {
    const owner = game.actors.get<ActorPF2e>(ownerId)
    const target = game.actors.get<ActorPF2e>(targetId)
    if (!owner || !target) return

    const item = owner.items.get(itemId) as PhysicalItemPF2e | undefined
    if (!item) return

    qty = Math.min(qty, item.quantity)
    const newQty = item.quantity - qty

    const obj = item.toObject()
    obj.system.quantity = qty
    obj.system.equipped.carryType = 'worn'
    if (hasInvestedProperty(obj)) {
        obj.system.equipped.invested = item.traits.has('invested') ? false : null
    }

    const newItem = await target.addToInventory(obj, undefined, stack)
    if (!newItem) return

    if (newQty < 1) item.delete()
    else item.update({ 'system.quantity': newQty })

    if (!getSetting('message')) return

    let content = newItem.isIdentified ? chatUUID(newItem.uuid) : fakeChatUUID(newItem.name)
    if (qty > 1) content += ` x${qty}`

    ChatMessage.create({
        flavor: `<h4 class="action">${localize('giveth', { target: target.name })}</h4>`,
        content,
        speaker: ChatMessage.getSpeaker({ actor: owner }),
    })
}
