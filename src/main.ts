import { setModuleID } from '@utils/module'
import { socketOn } from '@utils/socket'
import { registerUpstreamHook } from '@utils/foundry/hook'
import { registerSetting } from '@utils/foundry/settings'
import { onDropCanvasData } from './canvas'
import { onDropActorSheetData } from './sheet'
import { takethCondition, takethEffect, takethPhysical } from './taketh'
import { isFirstGM } from '@utils/foundry/user'

export const MODULE_ID = 'pf2e-giveth'
setModuleID(MODULE_ID)

Hooks.once('init', () => {
    registerSetting({
        name: 'message',
        type: Boolean,
        default: true,
        config: true,
    })
})

Hooks.once('ready', () => {
    if (game.user.isGM) {
        socketOn<Packet>(onPacketReceived)
    } else {
        registerUpstreamHook('dropCanvasData', onDropCanvasData)
        registerUpstreamHook('dropActorSheetData', onDropActorSheetData)
    }
})

function onPacketReceived(packet: Packet) {
    if (!isFirstGM()) return
    if (packet.type === 'giveth-condition') takethCondition(packet)
    else if (packet.type === 'giveth-effect') takethEffect(packet)
    else takethPhysical(packet)
}
