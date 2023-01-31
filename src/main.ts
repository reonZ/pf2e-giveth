import { registerUpstreamHook } from './@utils/foundry/hook'
import { registerSetting } from './@utils/foundry/settings'
import { isGM } from './@utils/foundry/user'
import { socketOn } from './@utils/socket'
import { onDropCanvasData } from './canvas'
import { onDropActorSheetData } from './sheet'
import { onPacketReceived } from './socket'

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
        socketOn(onPacketReceived)
    } else {
        registerUpstreamHook('dropCanvasData', onDropCanvasData)
        registerUpstreamHook('dropActorSheetData', onDropActorSheetData)
    }
})
