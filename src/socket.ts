import { transferItem } from './giveth'

export function onPacketReceived(packet: Packet) {
    switch (packet.type) {
        case 'giveth':
            transferItem(packet)
            break
    }
}
