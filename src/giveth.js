import { socketEmit, warn } from './module'

export function giveth(origin, target, item, value) {
    const ownerId = origin.id
    const targetId = target.id
    const isIndex = !(item instanceof Item)

    if (!isIndex && item.isOfType('physical')) {
        const qty = item.quantity
        if (qty < 1) return warn('notification.zero')

        if (qty === 1) return sendPhysicalRequest(ownerId, targetId, item.id, 1, false)

        new MoveLootPopup(origin, { maxQuantity: qty, lockStack: false, isPurchase: false }, (qty, stack) => {
            sendPhysicalRequest(ownerId, targetId, item.id, qty, stack)
        }).render(true)
    } else {
        const uuid = isIndex ? `Compendium.${item.pack}.${item._id}` : item.uuid
        if (item.type === 'condition') {
            socketEmit({
                type: 'giveth-condition',
                targetId,
                value: value ?? 1,
                uuid,
            })
        } else {
            socketEmit({
                type: 'giveth-effect',
                targetId,
                uuid,
            })
        }
    }
}

function sendPhysicalRequest(ownerId, targetId, itemId, qty, stack) {
    socketEmit({
        type: 'giveth-physical',
        ownerId,
        targetId,
        itemId,
        qty,
        stack,
    })
}
