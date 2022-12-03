import { registerUpstreamHook } from './@utils/foundry/hook'
import { isGM } from './@utils/foundry/user'
import { socketOn } from './@utils/socket'
import { onDropCanvasData } from './canvas'
import { onDropActorSheetData } from './sheet'
import { onPacketReceived } from './socket'

Hooks.once('init', () => {
    if (isGM()) return
    registerUpstreamHook('dropCanvasData', onDropCanvasData)
    registerUpstreamHook('dropActorSheetData', onDropActorSheetData)
})

Hooks.once('ready', () => {
    if (!game.user.isGM) return
    socketOn(onPacketReceived)
})
