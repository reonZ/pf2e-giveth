import { warn } from '@utils/foundry/notification'
import { MoveLootPopup } from '@apps/popup'
import { socketEmit } from '@utils/socket'

export function giveth(origin: ActorPF2e, target: ActorPF2e, item: GivethItem, value: number | undefined) {
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
        const uuid: ItemUUID = isIndex ? `Compendium.${item.pack}.${item._id}` : item.uuid
        if (item.type === 'condition') {
            socketEmit<ConditionPacket>({
                type: 'giveth-condition',
                targetId,
                value: value ?? 1,
                uuid,
            })
        } else {
            socketEmit<EffectPacket>({
                type: 'giveth-effect',
                targetId,
                uuid,
            })
        }
    }
}

function sendPhysicalRequest(ownerId: string, targetId: string, itemId: string, qty: number, stack: boolean) {
    socketEmit<PhysicalPacket>({
        type: 'giveth-physical',
        ownerId,
        targetId,
        itemId,
        qty,
        stack,
    })
}
