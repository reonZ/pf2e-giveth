(()=>{"use strict";let t="",e="module";function n(e){game.socket.emit(`module.${t}`,e)}function o(t,e){const n=Hooks.on(t,e),o=Hooks.events[t].findIndex((t=>t.id===n));if(0!==o){const[e]=Hooks.events[t].splice(o,1);Hooks.events[t].unshift(e)}}function i(...e){return`${t}.settings.${e.join(".")}`}function s(...e){let[n,o]=e;return n=`${t}.${n}`,o?game.i18n.format(n,o):game.i18n.localize(n)}class MoveLootPopup extends FormApplication{onSubmitCallback;constructor(t,e,n){super(t,e),this.onSubmitCallback=n}async getData(){const[t,e]=this.options.isPurchase?["PF2E.loot.PurchaseLootMessage","PF2E.loot.PurchaseLoot"]:["PF2E.loot.MoveLootMessage","PF2E.loot.MoveLoot"];return{...await super.getData(),maxQuantity:this.options.maxQuantity,newStack:this.options.newStack,lockStack:this.options.lockStack,prompt:t,buttonLabel:e}}static get defaultOptions(){return{...super.defaultOptions,id:"MoveLootPopup",classes:[],title:game.i18n.localize("PF2E.loot.MoveLootPopupTitle"),template:"systems/pf2e/templates/popups/loot/move-loot-popup.hbs",width:"auto",maxQuantity:1,newStack:!1,lockStack:!1,isPurchase:!1}}async _updateObject(t,e){this.onSubmitCallback(e.quantity,e.newStack)}}function a(t,e,o,i){const a=t.id,c=e.id,u=!(o instanceof Item);if(!u&&o.isOfType("physical")){const e=o.quantity;if(e<1)return function(...t){const[e,n,o]=t;!function(t,e,n,o){const i="string"==typeof e?e:"info",a="object"==typeof e?e:"object"==typeof n?n:void 0,r="boolean"==typeof e?e:"boolean"==typeof n?n:o??!1;ui.notifications.notify(s(t,a),i,{permanent:r})}(e,"warning",n,o)}("notification.zero");if(1===e)return r(a,c,o.id,1,!1);new MoveLootPopup(t,{maxQuantity:e,lockStack:!1,isPurchase:!1},((t,e)=>{r(a,c,o.id,t,e)})).render(!0)}else{const t=u?`Compendium.${o.pack}.${o._id}`:o.uuid;"condition"===o.type?n({type:"giveth-condition",targetId:c,value:i??1,uuid:t}):n({type:"giveth-effect",targetId:c,uuid:t})}}function r(t,e,o,i,s){n({type:"giveth-physical",ownerId:t,targetId:e,itemId:o,qty:i,stack:s})}function c(t){if(t.tokenId||"Item"!==t.type||!t.uuid)return;const e=fromUuidSync(t.uuid);if(!e)return;let n=e.actor;if(!n){const e=t.context?.origin.actor;n=e?fromUuidSync(e):null}if(!u(n)||!n.isOwner)return;const o=!(e instanceof Item);return o&&e.pack&&["effect","condition"].includes(e.type)||!o&&e.isOfType("physical","effect")?{actor:n,item:e,value:t.value}:void 0}function u(t,e){return!(!t||e&&t.id===e)&&t.hasPlayerOwner&&!t.isToken&&t.isOfType("character","npc","vehicle")}function p(){return game.users.some((t=>t.active&&t.isGM))}function d(t,e){if(!p())return!0;const n=c(e);if(!n)return!0;const o=t.tokens.placeables.slice().filter((t=>{if(!t.document.actorLink)return!1;const n=t.actor;if(!u(n,e.actorId)||n.isOwner)return!1;const o=t.x+(t.hitArea?.right??0),i=t.y+(t.hitArea?.bottom??0);return e.x>=t.x&&e.y>=t.y&&e.x<=o&&e.y<=i})).sort(((t,e)=>e.document.sort-t.document.sort)).at(0)?.actor;return!o||(a(n.actor,o,n.item,n.value),!1)}function l(t,e,n){if(!p()||t.isOwner||!u(t,n.actorId))return!0;const o=c(n);return!o||(a(o.actor,t,o.item,o.value),!1)}const m=new Map;m.set(-1,13),m.set(0,14),m.set(1,15),m.set(2,16),m.set(3,18),m.set(4,19),m.set(5,20),m.set(6,22),m.set(7,23),m.set(8,24),m.set(9,26),m.set(10,27),m.set(11,28),m.set(12,30),m.set(13,31),m.set(14,32),m.set(15,34),m.set(16,35),m.set(17,36),m.set(18,38),m.set(19,39),m.set(20,40),m.set(21,42),m.set(22,44),m.set(23,46),m.set(24,48),m.set(25,50);const f=new Map;f.set("incredibly easy",-10),f.set("very easy",-5),f.set("easy",-2),f.set("normal",0),f.set("hard",2),f.set("very hard",5),f.set("incredibly hard",10),new Set(["arcane","divine","occult","primal"]);const g=String.raw`[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`,y=String.raw`[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`,h=(new RegExp(y,"gu"),String.raw`(?:${g})(?=${y})|(?:${y})(?=${g})`),k=String.raw`(?:${g})(?=${g})`,v=String.raw`\p{Lowercase_Letter}`,w=String.raw`\p{Uppercase_Letter}`;new RegExp(`(${v})(${w}${k})`,"gu"),new RegExp(`${w}|(?:${h})${v}`,"gu");const b=new Set(["armor","backpack","book","consumable","equipment","treasure","weapon"]);async function $({itemId:e,ownerId:n,qty:o,stack:i,targetId:a}){const r=game.actors.get(n),c=game.actors.get(a);if(!r||!c)return;const u=r.items.get(e);if(!u)return;o=Math.min(o,u.quantity);const p=u.quantity-o,d=u.toObject();var l;d.system.quantity=o,d.system.equipped.carryType="worn",function(t){return e=b,n=t.type,e.has(n);var e,n}(l=d)&&"invested"in l.system.equipped&&(d.system.equipped.invested=!u.traits.has("invested")&&null);const m=await c.addToInventory(d,void 0,i);if(!m)return;if(p<1?u.delete():u.update({"system.quantity":p}),"message",!game.settings.get(t,"message"))return;let f=m.isIdentified?`@UUID[${m.uuid}]`:function(t){return`<span style="background: #DDD;\n    padding: 1px 4px;\n    border: 1px solid var(--color-border-dark-tertiary);\n    border-radius: 2px;\n    white-space: nowrap;\n    word-break: break-all;">${t}</span>`}(m.name);o>1&&(f+=` x${o}`),ChatMessage.create({flavor:`<h4 class="action">${s("giveth",{target:c.name})}</h4>`,content:f,speaker:ChatMessage.getSpeaker({actor:r})})}function S(t){(function(){if(!game.user.isGM)return!1;const t=game.users.find((t=>t.active&&t.isGM));return game.user===t})()&&("giveth-condition"===t.type?async function({targetId:t,uuid:e,value:n}){const o=game.actors.get(t);if(!o)return;const i=await fromUuid(e);i&&o.increaseCondition(i.slug,{min:n})}(t):"giveth-effect"===t.type?async function({targetId:t,uuid:e}){const n=game.actors.get(t);if(!n)return;const o=await fromUuid(e);if(!o)return;const i=o.clone({"system.tokenIcon.show":!0,"system.unidentified":!1}).toObject();n.createEmbeddedDocuments("Item",[i])}(t):$(t))}!function(n,o=!1){t||(t="pf2e-giveth"),e=o?"system":"module"}(),Hooks.once("init",(()=>{!function(e){const n=e.name;e.scope=e.scope??"world",e.config=e.config??!1,e.config&&(e.name=i(n,"name"),e.hint=i(n,"hint")),Array.isArray(e.choices)&&(e.choices=e.choices.reduce(((t,e)=>(t[e]=i(n,"choices",e),t)),{})),game.settings.register(t,n,e)}({name:"message",type:Boolean,default:!0,config:!0})})),Hooks.once("ready",(()=>{var e;game.user.isGM?(e=S,game.socket.on(`module.${t}`,e)):(o("dropCanvasData",d),o("dropActorSheetData",l))}))})();
//# sourceMappingURL=main.js.map