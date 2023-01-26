import { localize } from './@utils/foundry/i18n'
import { warn } from './@utils/foundry/notifications'
import { getSetting } from './@utils/foundry/settings'
import { chatUUID, fakeChatUUID } from './@utils/foundry/uuid'
import { hasInvestedProperty } from './@utils/pf2e'
import { socketEmit } from './@utils/socket'
import { MoveLootPopup } from './apps/popup'

export async function transferItem({ ownerId, targetId, itemId, qty, stack }: GivethData) {
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

    ChatMessage.create({
        flavor: `<h4 class="action">${localize('giveth', { target: target.name })}</h4>`,
        content: newItem.isIdentified ? chatUUID(newItem.uuid) : fakeChatUUID(newItem.name),
        speaker: ChatMessage.getSpeaker({ actor: owner }),
    })
}

export function giveth(owner: ActorPF2e, target: ActorPF2e, item: PhysicalItemPF2e) {
    const qty = item.quantity
    if (qty < 1) return warn('zero')
    if (qty === 1) return sendRequest(owner, target, item, 1, false)

    const options = { maxQuantity: qty, lockStack: false, isPurchase: false }
    new MoveLootPopup(owner, options, (qty, stack) => sendRequest(owner, target, item, qty, stack)).render(true)
}

function sendRequest(owner: ActorPF2e, target: ActorPF2e, item: PhysicalItemPF2e, qty: number, stack: boolean) {
    socketEmit<Packet>({
        type: 'giveth',
        ownerId: owner.id,
        targetId: target.id,
        itemId: item.id,
        qty,
        stack,
    })
}
