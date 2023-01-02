function $b1861437201343a3$export$e086df5a71e51694(hook, fn) {
    const id = Hooks.on(hook, fn);
    const index = Hooks.events[hook].findIndex((x)=>x.id === id);
    if (index !== 0) {
        const [hooked] = Hooks.events[hook].splice(index, 1);
        Hooks.events[hook].unshift(hooked);
    }
}


var $1623e5e7c705b7c7$export$2e2bcd8739ae039 = "pf2e-giveth";



function $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc(...path) {
    return `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.settings.${path.join(".")}`;
}
function $ee65ef5b7d5dd2ef$export$79b67f6e2f31449(...path) {
    return `flags.${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$bdd507c72609c24e(...path) {
    path = path.filter((x)=>typeof x === "string");
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/templates/${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$6d1a79e7c04100c2(...path) {
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/images/${path.join("/")}`;
}


function $b29eb7e0eb12ddbc$export$8206e8d612b3e63(key) {
    return game.settings.get((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), key);
}
function $b29eb7e0eb12ddbc$export$61fd6f1ddd0c20e2(key, value) {
    return game.settings.set((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), key, value);
}
function $b29eb7e0eb12ddbc$export$3bfe3819d89751f0(options) {
    const name = options.name;
    options.scope = options.scope ?? "world";
    options.config = options.config ?? false;
    if (options.config) {
        options.name = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)(name, "name");
        options.hint = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)(name, "hint");
    }
    if (Array.isArray(options.choices)) options.choices = options.choices.reduce((choices, choice)=>{
        choices[choice] = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)(name, "choices", choice);
        return choices;
    }, {});
    game.settings.register((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), name, options);
}
function $b29eb7e0eb12ddbc$export$cd2f7161e4d70860(options) {
    const name = options.name;
    options.name = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "name");
    options.label = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "label");
    options.hint = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "hint");
    options.restricted = options.restricted ?? true;
    options.icon = options.icon ?? "fas fa-cogs";
    game.settings.registerMenu((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), name, options);
}
function $b29eb7e0eb12ddbc$export$8cb4a6769fa1780e() {
    return game.settings.get("core", "combatTrackerConfig");
}


function $d3c956a52a17449c$export$7d75da6d34f1a955() {
    const data = game.data;
    const user = data.users.find((x)=>x._id === data.userId);
    return !!user && user.role >= CONST.USER_ROLES.GAMEMASTER;
}
function $d3c956a52a17449c$export$148de59b68ce26ae(doc, connected = false) {
    if (connected) return game.users.filter((x)=>x.active && doc.testUserPermission(x, "OWNER"));
    return game.users.filter((x)=>doc.testUserPermission(x, "OWNER"));
}
function $d3c956a52a17449c$export$5f4ed0d56c2c0edf(doc, connected = false) {
    if (connected) return game.users.find((x)=>x.active && doc.testUserPermission(x, "OWNER"));
    return game.users.find((x)=>doc.testUserPermission(x, "OWNER"));
}
function $d3c956a52a17449c$export$31d9ed870e9f0a1d(connected = false) {
    if (connected) return game.users.find((x)=>x.active && x.isGM);
    return game.users.find((x)=>x.isGM);
}



function $7d0b581a56a65cc7$export$38fd5ae0f7102bdb(callback) {
    game.socket.on(`module.${(0, $1623e5e7c705b7c7$export$2e2bcd8739ae039)}`, callback);
}
function $7d0b581a56a65cc7$export$a2c1d094f400f44a(packet) {
    game.socket.emit(`module.${(0, $1623e5e7c705b7c7$export$2e2bcd8739ae039)}`, packet);
}



function $889355b5c39241f1$export$b3bd0bc58e36cd63(key, data) {
    key = `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.${key}`;
    if (data) return game.i18n.format(key, data);
    return game.i18n.localize(key);
}
function $889355b5c39241f1$export$a2435eff6fb7f6c1(subKey) {
    const fn = (key, data)=>$889355b5c39241f1$export$b3bd0bc58e36cd63(`${subKey}.${key}`, data);
    Object.defineProperty(fn, "key", {
        get () {
            return subKey;
        },
        enumerable: false,
        configurable: false
    });
    return fn;
}



function $d20bc07084c62caf$export$5e14cdade93d6f7b(str, arg1, arg2, arg3) {
    const type = typeof arg1 === "string" ? arg1 : "info";
    const data = typeof arg1 === "object" ? arg1 : typeof arg2 === "object" ? arg2 : undefined;
    const permanent = typeof arg1 === "boolean" ? arg1 : typeof arg2 === "boolean" ? arg2 : arg3 ?? false;
    ui.notifications.notify((0, $889355b5c39241f1$export$b3bd0bc58e36cd63)(str, data), type, {
        permanent: permanent
    });
}
function $d20bc07084c62caf$export$c106dd0671a0fc2d(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "warning", arg1, arg2);
}
function $d20bc07084c62caf$export$a80b3bd66acc52ff(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "info", arg1, arg2);
}
function $d20bc07084c62caf$export$a3bc9b8ed74fc(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "error", arg1, arg2);
}



function $3b07b3ae0f2d41b7$export$54f992c69bf0c22c(result) {
    if (result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) return `${result.documentCollection}.${result.documentId}`;
    if (result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) return `Compendium.${result.documentCollection}.${result.documentId}`;
    return undefined;
}
function $3b07b3ae0f2d41b7$export$20ab79f56cb5e678(uuid, name) {
    if (name) return `@UUID[${uuid}]{${name}}`;
    return `@UUID[${uuid}]`;
}
function $3b07b3ae0f2d41b7$export$673773a20336d834(name) {
    return `<span style="background: #DDD;
    padding: 1px 4px;
    border: 1px solid var(--color-border-dark-tertiary);
    border-radius: 2px;
    white-space: nowrap;
    word-break: break-all;">${name}</span>`;
}


/** Check if an element is present in the provided set. Especially useful for checking against literal sets */ function $39b388830effa69c$export$7fd671bc170c6856(set, value) {
    return set.has(value);
}


const $1411bf92270cf048$export$c6f5f26a78b4295b = new Set([
    "armor",
    "backpack",
    "book",
    "consumable",
    "equipment",
    "treasure",
    "weapon"
]);
const $1411bf92270cf048$export$12237db074fd27c0 = new Map([
    [
        -1,
        13
    ],
    [
        0,
        14
    ],
    [
        1,
        15
    ],
    [
        2,
        16
    ],
    [
        3,
        18
    ],
    [
        4,
        19
    ],
    [
        5,
        20
    ],
    [
        6,
        22
    ],
    [
        7,
        23
    ],
    [
        8,
        24
    ],
    [
        9,
        26
    ],
    [
        10,
        27
    ],
    [
        11,
        28
    ],
    [
        12,
        30
    ],
    [
        13,
        31
    ],
    [
        14,
        32
    ],
    [
        15,
        34
    ],
    [
        16,
        35
    ],
    [
        17,
        36
    ],
    [
        18,
        38
    ],
    [
        19,
        39
    ],
    [
        20,
        40
    ],
    [
        21,
        42
    ],
    [
        22,
        44
    ],
    [
        23,
        46
    ],
    [
        24,
        48
    ],
    [
        25,
        50
    ]
]);
const $1411bf92270cf048$export$3db6e09beb50ed02 = new Map([
    [
        "incredibly easy",
        -10
    ],
    [
        "very easy",
        -5
    ],
    [
        "easy",
        -2
    ],
    [
        "normal",
        0
    ],
    [
        "hard",
        2
    ],
    [
        "very hard",
        5
    ],
    [
        "incredibly hard",
        10
    ]
]);
const $1411bf92270cf048$export$e1912d3e02f0714c = new Set([
    "arcane",
    "divine",
    "occult",
    "primal"
]);
function $1411bf92270cf048$export$3b19b78776a9c55c(dc, adjustment = "normal") {
    return dc + ($1411bf92270cf048$export$3db6e09beb50ed02.get(adjustment) ?? 0);
}
function $1411bf92270cf048$export$49278407fc99568c(rarity = "common") {
    if (rarity === "uncommon") return "hard";
    else if (rarity === "rare") return "very hard";
    else if (rarity === "unique") return "incredibly hard";
    else return "normal";
}
function $1411bf92270cf048$export$285e1d124f214ce6(dc, rarity = "common") {
    return $1411bf92270cf048$export$3b19b78776a9c55c(dc, $1411bf92270cf048$export$49278407fc99568c(rarity));
}
function $1411bf92270cf048$export$bcb07a78a2f89083(level, { proficiencyWithoutLevel: proficiencyWithoutLevel = false , rarity: rarity = "common"  } = {}) {
    // assume level 0 if garbage comes in. We cast level to number because the backing data may actually have it
    // stored as a string, which we can't catch at compile time
    const dc = $1411bf92270cf048$export$12237db074fd27c0.get(level) ?? 14;
    if (proficiencyWithoutLevel) // -1 shouldn't be subtracted since it's just
    // a creature level and not related to PC levels
    return $1411bf92270cf048$export$285e1d124f214ce6(dc - Math.max(level, 0), rarity);
    else return $1411bf92270cf048$export$285e1d124f214ce6(dc, rarity);
}
/** Extract all traits from an item, that match a magic tradition */ function $1411bf92270cf048$var$getMagicTraditions(item) {
    const traits = item.system.traits.value;
    return new Set(traits.filter((t)=>(0, $39b388830effa69c$export$7fd671bc170c6856)($1411bf92270cf048$export$e1912d3e02f0714c, t)));
}
function $1411bf92270cf048$export$88dab0cc25983d19(item, baseDc, notMatchingTraditionModifier) {
    const result = {
        occult: baseDc,
        primal: baseDc,
        divine: baseDc,
        arcane: baseDc
    };
    const traditions = $1411bf92270cf048$var$getMagicTraditions(item);
    for (const key of $1411bf92270cf048$export$e1912d3e02f0714c)// once an item has a magic tradition, all skills
    // that don't match the tradition are hard
    if (traditions.size > 0 && !traditions.has(key)) result[key] = baseDc + notMatchingTraditionModifier;
    return {
        arc: result.arcane,
        nat: result.primal,
        rel: result.divine,
        occ: result.occult
    };
}
function $1411bf92270cf048$export$eac0396674c51d5e(item) {
    return item.traits.has("cursed") ? "unique" : item.rarity;
}
function $1411bf92270cf048$export$550a429caca7a4dc(item, { proficiencyWithoutLevel: proficiencyWithoutLevel = false , notMatchingTraditionModifier: notMatchingTraditionModifier  }, noDC = false) {
    const baseDC = $1411bf92270cf048$export$bcb07a78a2f89083(item.level, {
        proficiencyWithoutLevel: proficiencyWithoutLevel
    });
    const rarity = $1411bf92270cf048$export$eac0396674c51d5e(item);
    const dc = $1411bf92270cf048$export$285e1d124f214ce6(baseDC, rarity);
    if (item.isMagical) return $1411bf92270cf048$export$88dab0cc25983d19(item, dc, notMatchingTraditionModifier);
    if (!noDC) return {
        cra: dc
    };
    if (item.isAlchemical) return {
        cra: dc
    };
    return {
        dc: dc
    };
}
function $1411bf92270cf048$export$d2ea10be675672b(source) {
    return $1411bf92270cf048$export$9e72cd1a981905c2(source) && "invested" in source.system.equipped;
}
function $1411bf92270cf048$export$9e72cd1a981905c2(source) {
    return (0, $39b388830effa69c$export$7fd671bc170c6856)($1411bf92270cf048$export$c6f5f26a78b4295b, source.type);
}



class $8ec64a84f4ed3df5$export$f44f096daab04904 extends FormApplication {
    constructor(object, options, callback){
        super(object, options);
        this.onSubmitCallback = callback;
    }
    async getData() {
        const [prompt, buttonLabel] = this.options.isPurchase ? [
            "PF2E.loot.PurchaseLootMessage",
            "PF2E.loot.PurchaseLoot"
        ] : [
            "PF2E.loot.MoveLootMessage",
            "PF2E.loot.MoveLoot"
        ];
        return {
            ...await super.getData(),
            maxQuantity: this.options.maxQuantity,
            newStack: this.options.newStack,
            lockStack: this.options.lockStack,
            prompt: prompt,
            buttonLabel: buttonLabel
        };
    }
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "MoveLootPopup",
            classes: [],
            title: game.i18n.localize("PF2E.loot.MoveLootPopupTitle"),
            template: "systems/pf2e/templates/popups/loot/move-loot-popup.hbs",
            width: "auto",
            maxQuantity: 1,
            newStack: false,
            lockStack: false,
            isPurchase: false
        };
    }
    async _updateObject(_event, formData) {
        this.onSubmitCallback(formData.quantity, formData.newStack);
    }
}


async function $7ad560a1e531e2cd$export$80a5fb0617c35094({ ownerId: ownerId , targetId: targetId , itemId: itemId , qty: qty , stack: stack  }) {
    const owner = game.actors.get(ownerId);
    const target = game.actors.get(targetId);
    if (!owner || !target) return;
    const item = owner.items.get(itemId);
    if (!item) return;
    qty = Math.min(qty, item.quantity);
    const newQty = item.quantity - qty;
    const obj = item.toObject();
    obj.system.quantity = qty;
    obj.system.equipped.carryType = "worn";
    if ((0, $1411bf92270cf048$export$d2ea10be675672b)(obj)) obj.system.equipped.invested = item.traits.has("invested") ? false : null;
    const newItem = await target.addToInventory(obj, undefined, stack);
    if (!newItem) return;
    if (newQty < 1) item.delete();
    else item.update({
        "system.quantity": newQty
    });
    if (!(0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("message")) return;
    const msg = qty > 1 ? "notification.withQty" : "notification.withoutQty";
    const link = newItem.isIdentified ? (0, $3b07b3ae0f2d41b7$export$20ab79f56cb5e678)(newItem.uuid) : (0, $3b07b3ae0f2d41b7$export$673773a20336d834)(newItem.name);
    console.log(newItem, newItem.isIdentified);
    ChatMessage.create({
        content: (0, $889355b5c39241f1$export$b3bd0bc58e36cd63)(msg, {
            qty: qty,
            item: link,
            target: target.name
        }),
        speaker: ChatMessage.getSpeaker({
            actor: owner
        })
    });
}
function $7ad560a1e531e2cd$export$f865a57bfddad5bb(owner, target, item) {
    const qty = item.quantity;
    if (qty < 1) return (0, $d20bc07084c62caf$export$c106dd0671a0fc2d)("zero");
    if (qty === 1) return $7ad560a1e531e2cd$var$sendRequest(owner, target, item, 1, false);
    const options = {
        maxQuantity: qty,
        lockStack: false,
        isPurchase: false
    };
    new (0, $8ec64a84f4ed3df5$export$f44f096daab04904)(owner, options, (qty, stack)=>$7ad560a1e531e2cd$var$sendRequest(owner, target, item, qty, stack)).render(true);
}
function $7ad560a1e531e2cd$var$sendRequest(owner, target, item, qty, stack) {
    (0, $7d0b581a56a65cc7$export$a2c1d094f400f44a)({
        type: "giveth",
        ownerId: owner.id,
        targetId: target.id,
        itemId: item.id,
        qty: qty,
        stack: stack
    });
}


function $fab42eb3dee39b5b$export$c23c20c61fc0ea2b(data) {
    if (data.tokenId || data.type !== "Item" || !data.uuid) return;
    const actorId = data.actorId;
    const actor = actorId ? game.actors.get(actorId) : undefined;
    if (!$fab42eb3dee39b5b$export$bb7eac370753f2c0(actor) || !actor.isOwner) return;
    const itemId = data.uuid.split(".").at(-1);
    const item = actor.items.get(itemId);
    if (item && item.isOfType("physical")) return {
        actor: actor,
        item: item
    };
}
function $fab42eb3dee39b5b$export$bb7eac370753f2c0(actor, id) {
    if (!actor || id && actor.id === id) return false;
    return actor.hasPlayerOwner && !actor.isToken && actor.isOfType("character", "npc", "vehicle");
}


function $c5e8e0cfa8a822f8$export$817ceb6b274ad24(canvas, data) {
    const details = (0, $fab42eb3dee39b5b$export$c23c20c61fc0ea2b)(data);
    if (!details) return true;
    const target = canvas.tokens.placeables.slice().filter((token)=>{
        if (!token.document.actorLink) return false;
        const target = token.actor;
        if (!(0, $fab42eb3dee39b5b$export$bb7eac370753f2c0)(target, data.actorId) || target.isOwner) return false;
        const maximumX = token.x + (token.hitArea?.right ?? 0);
        const maximumY = token.y + (token.hitArea?.bottom ?? 0);
        return data.x >= token.x && data.y >= token.y && data.x <= maximumX && data.y <= maximumY;
    }).sort((a, b)=>b.document.sort - a.document.sort).at(0)?.actor;
    if (!target) return true;
    (0, $7ad560a1e531e2cd$export$f865a57bfddad5bb)(details.actor, target, details.item);
    return false;
}




function $026f2657de0e8ef5$export$ac56a867a4859d7c(target, targetSheet, data) {
    if (target.isOwner || !(0, $fab42eb3dee39b5b$export$bb7eac370753f2c0)(target, data.actorId)) return true;
    const details = (0, $fab42eb3dee39b5b$export$c23c20c61fc0ea2b)(data);
    if (!details) return true;
    (0, $7ad560a1e531e2cd$export$f865a57bfddad5bb)(details.actor, target, details.item);
    return false;
}



function $e6fcaa473751f33b$export$77349932e6536f4d(packet) {
    switch(packet.type){
        case "giveth":
            (0, $7ad560a1e531e2cd$export$80a5fb0617c35094)(packet);
            break;
    }
}


Hooks.once("init", ()=>{
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "message",
        type: Boolean,
        default: true,
        config: true
    });
    if ((0, $d3c956a52a17449c$export$7d75da6d34f1a955)()) return;
    (0, $b1861437201343a3$export$e086df5a71e51694)("dropCanvasData", (0, $c5e8e0cfa8a822f8$export$817ceb6b274ad24));
    (0, $b1861437201343a3$export$e086df5a71e51694)("dropActorSheetData", (0, $026f2657de0e8ef5$export$ac56a867a4859d7c));
});
Hooks.once("ready", ()=>{
    if (!game.user.isGM) return;
    (0, $7d0b581a56a65cc7$export$38fd5ae0f7102bdb)((0, $e6fcaa473751f33b$export$77349932e6536f4d));
});


//# sourceMappingURL=main.js.map
