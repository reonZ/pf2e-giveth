declare const game: GamePF2e
declare const canvas: CanvasPF2e
declare const ui: UiPF2e
declare const CONFIG: ConfigPF2e

type GivethItem = Required<CompendiumIndexData> | PhysicalItemPF2e | EffectPF2e

interface MoveLootOptions extends FormApplicationOptions {
    maxQuantity: number
    newStack: boolean
    lockStack: boolean
    isPurchase: boolean
}

interface MoveLootFormData extends FormData {
    quantity: number
    newStack: boolean
}

type MoveLootCallback = (quantity: number, newStack: boolean) => void

type BasePacket<T extends 'giveth-physical' | 'giveth-effect' | 'giveth-condition'> = SocketPacket<T> & {
    targetId: string
}

type PhysicalPacket = BasePacket<'giveth-physical'> & {
    itemId: string
    ownerId: string
    qty: number
    stack: boolean
}

type EffectPacket = BasePacket<'giveth-effect'> & {
    uuid: ItemUUID
}

type ConditionPacket = BasePacket<'giveth-condition'> & {
    uuid: ItemUUID
    value: number
}

type Packet = PhysicalPacket | EffectPacket | ConditionPacket
