type Packet = GivethData & {
    type: 'giveth'
}

type GivethData = {
    ownerId: string
    targetId: string
    itemId: string
    qty: number
    stack: boolean
}

declare interface MoveLootOptions extends FormApplicationOptions {
    maxQuantity: number
    newStack: boolean
    lockStack: boolean
    isPurchase: boolean
}

interface MoveLootFormData extends FormData {
    quantity: number
    newStack: boolean
}

declare type MoveLootCallback = (quantity: number, newStack: boolean) => void
