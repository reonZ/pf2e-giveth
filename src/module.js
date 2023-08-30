export const MODULE_ID = 'pf2e-giveth'

export function isGMOnline() {
    return game.users.some(user => user.active && user.isGM)
}

export function notify(str, arg1, arg2, arg3) {
    const type = typeof arg1 === 'string' ? arg1 : 'info'
    const data = typeof arg1 === 'object' ? arg1 : typeof arg2 === 'object' ? arg2 : undefined
    const permanent = typeof arg1 === 'boolean' ? arg1 : typeof arg2 === 'boolean' ? arg2 : arg3 ?? false

    ui.notifications.notify(localize(str, data), type, { permanent })
}

export function warn(str, arg1, arg2) {
    notify(str, 'warning', arg1, arg2)
}

export function socketOn(callback) {
    game.socket.on(`module.${MODULE_ID}`, callback)
}

export function socketEmit(packet) {
    game.socket.emit(`module.${MODULE_ID}`, packet)
}

export function isActiveGM() {
    return game.user === game.users.activeGM
}

export function chatUUID(uuid, label, fake = false) {
    if (fake) {
        return `<span style="background: #DDD; padding: 1px 4px; border: 1px solid var(--color-border-dark-tertiary);
border-radius: 2px; white-space: nowrap; word-break: break-all;">${label}</span>`
    } else {
        return `@UUID[${uuid}]{${label}}`
    }
}
