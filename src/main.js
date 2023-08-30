import { onDropCanvasData } from './canvas.js'
import { MODULE_ID, isActiveGM, socketOn } from './module.js'
import { takethCondition, takethEffect, takethPhysical } from './taketh.js'

Hooks.once('init', () => {
    game.settings.register(MODULE_ID, 'message', {
        name: `${MODULE_ID}.settings.message.name`,
        hint: `${MODULE_ID}.settings.message.hint`,
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
    })
})

Hooks.once('ready', () => {
    if (game.user.isGM) {
        socketOn(onSocket)
    } else {
        registerUpstreamHook('dropCanvasData', onDropCanvasData)
    }
})

function onSocket(packet) {
    if (!isActiveGM()) return
    if (packet.type === 'giveth-condition') takethCondition(packet)
    else if (packet.type === 'giveth-effect') takethEffect(packet)
    else takethPhysical(packet)
}

export function registerUpstreamHook(hook, fn) {
    const id = Hooks.on(hook, fn)
    const index = Hooks.events[hook].findIndex(x => x.id === id)

    if (index !== 0) {
        const [hooked] = Hooks.events[hook].splice(index, 1)
        Hooks.events[hook].unshift(hooked)
    }
}
