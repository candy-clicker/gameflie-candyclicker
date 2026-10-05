import{n as e,t}from"./phaser-llfgcdFQ.js";import{a as n,n as r,o as i,r as a,s as o,t as s}from"./enemyRegistry-D4evo8Be.js";import"./enemyLabReadyCars-BlQ_IcMo.js";import{n as c,o as l,t as u}from"./webp-CgFRtLXU.js";import{i as d,n as f,t as p}from"./balanceLoader-CIy0PMBK.js";import{t as m}from"./catalog-Tlt6QyiG.js";import{n as h,s as g,t as _}from"./levelContentStore-vInW7ivN.js";import{a as v,t as y}from"./destructibleFxProfiles-CuYbEG8E.js";var b=e(t(),1);function x(e,t,n){if(t===`number`){if(!e.trim().length&&n)return{valid:!0,value:void 0};let t=parseFloat(e);return Number.isNaN(t)?{valid:!1}:{valid:!0,value:t}}if(t===`csv`)return{valid:!0,value:e.split(`,`).map(e=>e.trim()).filter(e=>e.length>0)};if(t===`json`){if(!e.trim())return{valid:!0,value:void 0};try{return{valid:!0,value:JSON.parse(e)}}catch{return{valid:!1}}}return{valid:!0,value:e.trim()}}function S(e,t,n){let r=e;for(let e=0;e<t.length-1;e++){let n=t[e];if(r[n]===void 0)return;r=r[n]}let i=t[t.length-1];if(n===void 0){delete r[i];return}typeof r[i]==`boolean`?r[i]=n!==0:r[i]=n}function C(e){let t=e=>{let t=e.target;return t instanceof HTMLInputElement&&t.dataset.seedFromPlaceholder===`1`&&t.placeholder?t:null};e.addEventListener(`focusin`,e=>{let n=t(e);!n||n.value!==``||(n.value=n.placeholder,n.dataset.seeded=`1`)}),e.addEventListener(`focusout`,e=>{let n=t(e);n&&(n.dataset.seeded===`1`&&n.value===n.placeholder&&(n.value=``),delete n.dataset.seeded)})}var w=`BalanceEditor`,T=()=>`./`,E={gold:1,silver:2,bronze:3},D={enableNitro:`Ворог використовує нітро-прискорення під час гонки. 0 = вимкнено, 1 = увімкнено`,enableFlip:`Ворог намагається самостійно виправитись після перекидання. 0 = вимкнено, 1 = увімкнено`,maxSpeed:`Максимальна швидкість NPC у пікселях/с. 0 = взяти базове значення з машини ворога`,nitroPower:`Сила нітро-імпульсу для NPC. 0 = взяти базове значення з машини ворога`,enginePower:`Сила двигуна NPC (прискорення). 0 = взяти базове значення з машини ворога. Типово ~15–25`,mass:`Маса корпусу NPC у кг. Впливає на зіткнення та відкидання. 0 = з машини ворога. Типово 8–20`,stuckSpeed:`Поріг швидкості нижче якого NPC вважається 'застряглим' (пікс/с). 0 = за замовчуванням (30)`,stuckMs:`Час (мс) щоб визнати NPC 'застряглим'. 0 = за замовчуванням (1200)`,unstuckReverseMs:`Час (мс) заднього ходу при розклиненні. 0 = за замовчуванням (900)`,nitroRegenRate:`Скільки одиниць нітро відновлюється за секунду. 0 = без відновлення. Типово 20`,nitroBurstMs:`Тривалість нітро-імпульсу NPC у мс (бак 100, витрата 60/с). Типово 1100`,nitroCooldownMs:`Мінімальний інтервал між стартами імпульсів, мс. Типово 1200`,nitroFireRatio:`Частка бака (0..1) потрібна для старту імпульсу. 1 = тільки з повного. Типово 0.5`,catchupNitroBand:`Поріг rubber-band (відставання), від якого бот палить нітро на ходу. Типово 1.4 (~800px позаду)`},O=[`enableNitro`,`enableFlip`,`maxSpeed`,`nitroPower`,`enginePower`,`mass`,`stuckSpeed`,`stuckMs`,`unstuckReverseMs`,`nitroRegenRate`,`nitroBurstMs`,`nitroCooldownMs`,`nitroFireRatio`,`catchupNitroBand`],k={enemySpeedMul:`Множить максимальну швидкість і двигун усіх ворогів. 1.0 = норма, 2.0 = вдвічі швидші`,enemyHpMul:`Множить запас здоров'я (HP) усіх ворогів. 2.0 = вдвічі міцніші`,coinRewardMul:`Множить нагороду монетами за фініш рівня. 0.5 = половина монет`,upgradesCostMul:`Множить вартість кожного апгрейду в гаражі. 2.0 = удвічі дорожче`,carPricesMul:`Множить ціну купівлі нових машин. 2.0 = удвічі дорожче`},A={frequency:`Жорсткість пружини підвіски. Вища = жорсткіша підвіска`,damping:`Амортизація підвіски. Вища = менше розгойдування після удару`,travelUp:`Хід підвіски вгору від нейтрального положення (пікселі)`,travelDown:`Хід підвіски вниз від нейтрального положення (пікселі)`,anchorOffsetY:`Вертикальний зсув точки кріплення підвіски до кузова (пікселі)`,constraintDamper:`Додаткова жорсткість демпфера підвіски`},j={enginePower:`Сила двигуна — пряма тяга на колесо. Більше = швидший старт і прискорення`,maxSpeed:`Максимальна швидкість руху (пікселі/с)`,nitroPower:`Сила нітро-прискорення при активації`,tiltPower:`Максимальна сила нахилу кузова у повітрі`,tiltGroundMultiplier:`Коефіцієнт сили нахилу коли колеса торкаються землі`,tiltAirMultiplier:`Коефіцієнт сили нахилу під час польоту`,tiltGroundAngVelLimit:`Ліміт кутової швидкості нахилу на землі`,antiWheelie:`Протидія вілі — утримує передні колеса на землі`,downforce:`Прижимна сила — поліпшує зчеплення на великих швидкостях`,acceleration:`Плавність набору обертів двигуна (0–1). 1.0 = миттєво, 0.3 = поступово`,maxWheelAngVel:`Максимальна кутова швидкість колеса (рад/с)`,engineRampSpeed:`Швидкість розкрутки двигуна до повної потужності`,engineRampMin:`Мінімальний початковий множник потужності двигуна`,engineBrake:`Сила гальмування двигуном при відпусканні газу`,nitroNoseLift:`Торк при нітро — піднімає ніс (CCW для правого напрямку). 0 = вимкнено, ~50000-150000 = помірний підйом (ті ж одиниці що й passiveAirTorque)`,nitroNoseLiftMaxAngle:`Максимальний кут підйому носа при нітро (градуси). Дефолт = 30. При досягненні — обертання зупиняється.`,nitroImpulseMul:`Множник сили нітро (накачка обертів коліс). Дефолт = 40. Більше = сильніший поштовх вперед`},M={price:`Ціна купівлі машини в гаражі (монет)`,unlockRequiresLevel:`Мінімальний пройдений рівень для розблокування машини. 0 = доступна одразу`,bodyMass:`Маса кузова машини. Більша = важча, менш рухлива, але з більшим імпульсом`},N={scale:`Загальний масштаб машини в гонці. Міняє і спрайти, і фізику.`,bodyWidth:`Ширина collider кузова. Більше значення = ширший фізичний корпус.`,bodyHeight:`Висота collider кузова. Більше значення = вищий фізичний корпус.`,bodyOffsetX:`Положення кузова по X. Це також точка, навколо якої обертається машина.`,bodyOffsetY:`Положення кузова по Y. Це також точка, навколо якої обертається машина.`,wheelRadius:`Радіус collider коліс. Більший радіус піднімає машину вище над землею.`,wheelMass:`Маса одного колеса. Більше значення робить колесо важчим.`,slotOffsetX:`Позиція центра колеса відносно центра кузова по X.`,slotOffsetY:`Позиція центра колеса відносно центра кузова по Y.`,pivotAX:`Верхня точка кріплення підвіски до кузова.`,pivotAY:`Верхня точка кріплення підвіски до кузова.`,pivotBX:`Нижня точка кріплення підвіски біля колеса.`,pivotBY:`Нижня точка кріплення підвіски біля колеса.`},P=`Мінімальний результат для отримання цієї медалі (залежить від типу рівня)`,F={material:[`ground`,`metal`,`wood`,`glass`,`rubber`],bodyType:[`static`,`dynamic`,`kinematic`],collider:[`none`,`box`,`circle`,`poly`],drop:[`none`],layer:[`mid`,`front`,`back`],tileMode:[`repeat`]},I={name:`Видима назва префаба в редакторі. Не змінює asset key.`,width:`Спільна ширина об'єкта в пікселях для всіх інстансів цього asset key.`,height:`Спільна висота об'єкта в пікселях для всіх інстансів цього asset key.`,subtype:`Геймплейна роль об'єкта: наприклад destructible, coin, nitro, trampoline.`,amount:`Кількість ресурсу або сила ефекту, яку дає pickup.`,hp:`Запас міцності об'єкта перед руйнуванням.`,material:`Фізичний матеріал для тертя, ковзання й відскоку в рантаймі.`,bodyType:`Тип фізичного тіла: static не рухається, dynamic реагує на фізику, kinematic рухається скриптом.`,isCollider:`Чи створює об'єкт фізичний колайдер у сцені.`,isSensor:`Сенсорний колайдер: ловить перетин, але не блокує рух.`,collider:`Форма колайдера, яку матиме цей prefab у грі.`,mass:`Маса динамічного об'єкта. Більше значення = важче зрушити.`,drop:`Що випадає з об'єкта після взаємодії або руйнування.`,dropAmount:`Скільки одиниць drop видається за одну подію.`,layer:`Цільовий шар відмальовки або логічний шар розміщення.`,tileMode:`Режим тайлінгу спрайта, якщо текстура повинна повторюватися.`},L=class extends b.default.Scene{currentTab=`cars`;currentPrefabSection=`destructible`;currentCarIdx=0;currentContentLevelKey=g[0]?.key??`level_1`;currentAiEnemyKey=r[0]??``;workingData;levelContentData;domContainer;enemyPreviewByKey=new Map;enemyPreviewLoads=new Set;contentLevelLoads=new Set;prefabsLoadPromise=null;designerReloadAllInFlight=!1;embeddedCarEditorMessageHandler=e=>{this.handleEmbeddedCarEditorMessage(e)};maxContentObjectsPerSection=60;constructor(){super(w)}static KEY=w;create(){this.currentContentLevelKey=this.getInitialContentLevelKey(),this.levelContentData=h(JSON.parse(JSON.stringify(_.getRaw())),g);let e=f.getRaw();e?(this.workingData=this.normalizeWorkingData(JSON.parse(JSON.stringify(e))),this.seedDestructibleItemsFromPrefabs(),this.buildDomUi()):f.load().finally(()=>{let e=f.getRaw();this.workingData=this.normalizeWorkingData(e?JSON.parse(JSON.stringify(e)):this.buildDefaultData()),this.seedDestructibleItemsFromPrefabs(),this.buildDomUi()})}shutdown(){this.destroyDomUi()}buildDefaultData(){return{_version:1,cars:Object.fromEntries(Object.entries(m).map(([e,t])=>[e,{name:t.name,price:t.price,unlockRequiresLevel:t.unlockRequiresLevel,bodyMass:t.bodyMass,suspension:{...t.suspension},baseTuning:{...t.baseTuning,nitroNoseLift:t.baseTuning.nitroNoseLift??0,nitroNoseLiftMaxAngle:t.baseTuning.nitroNoseLiftMaxAngle??30,nitroImpulseMul:t.baseTuning.nitroImpulseMul??40},upgrades:{body:t.upgrades.body.map(e=>({price:e.price,hp:e.stats.hp??0})),engine:t.upgrades.engine.map(e=>({price:e.price,enginePower:e.stats.enginePower??0,maxSpeed:e.stats.maxSpeed??0,acceleration:e.stats.acceleration??0})),nitro:t.upgrades.nitro.map(e=>({price:e.price,nitroAmount:e.stats.nitroAmount??0,nitroPower:e.stats.nitroPower??0})),wheel:t.upgrades.wheel.map(e=>({price:e.price,wheelHp:e.stats.wheelHp??0,dynamicFriction:e.stats.dynamicFriction??0,staticFriction:e.stats.staticFriction??0}))}}])),levels:{},npcAi:{...f.getNpcAi()},enemies:Object.fromEntries(r.map(e=>[e,{displayName:e,ai:{}}])),difficulty:{enemySpeedMul:1,enemyHpMul:1,coinRewardMul:1,upgradesCostMul:1,carPricesMul:1},damage:JSON.parse(JSON.stringify(p)),achievements:JSON.parse(JSON.stringify(d)),npcFlips:{...f.getNpcFlips()},rewards:{coinPerPickup:5,coinPerDestructible:1,nitroFlipPercent:20,coinPerFlip:5,minFlipAngleDeg:300,minFlipLandingAngleDeg:180,destructibleCoins:{default:10,byAsset:{}},destructibleNames:{},destructibleItems:[]},boosters:{double_health:{price:100},coin_magnet:{price:200},double_nitro:{price:500}}}}normalizeAiBoolean(e,t){if(typeof e==`boolean`)return e;if(typeof e==`number`)return e!==0;if(typeof e==`string`){let t=e.trim().toLowerCase();if(t===`true`)return!0;if(t===`false`)return!1;let n=Number(t);if(Number.isFinite(n))return n!==0}return t}normalizeAiNumber(e,t){let n=Number(e);return Number.isFinite(n)?n:t}normalizeNpcAiBalance(e){let t=e&&typeof e==`object`?e:{};return{...t,enableNitro:this.normalizeAiBoolean(t.enableNitro,!1),enableFlip:this.normalizeAiBoolean(t.enableFlip,!0),maxSpeed:this.normalizeAiNumber(t.maxSpeed,0),nitroPower:this.normalizeAiNumber(t.nitroPower,0),enginePower:this.normalizeAiNumber(t.enginePower,0),mass:this.normalizeAiNumber(t.mass,0),stuckSpeed:this.normalizeAiNumber(t.stuckSpeed,0),stuckMs:this.normalizeAiNumber(t.stuckMs,0),unstuckReverseMs:this.normalizeAiNumber(t.unstuckReverseMs,0),nitroRegenRate:this.normalizeAiNumber(t.nitroRegenRate,20),nitroBurstMs:this.normalizeAiNumber(t.nitroBurstMs,1100),nitroCooldownMs:this.normalizeAiNumber(t.nitroCooldownMs,1200),nitroFireRatio:this.normalizeAiNumber(t.nitroFireRatio,.5),catchupNitroBand:this.normalizeAiNumber(t.catchupNitroBand,1.4)}}normalizeEnemyAiBalance(e){let t=e&&typeof e==`object`?e:{},n={};return t.enableNitro!==void 0&&(n.enableNitro=this.normalizeAiBoolean(t.enableNitro,!1)),t.enableFlip!==void 0&&(n.enableFlip=this.normalizeAiBoolean(t.enableFlip,!0)),t.maxSpeed!==void 0&&(n.maxSpeed=this.normalizeAiNumber(t.maxSpeed,0)),t.nitroPower!==void 0&&(n.nitroPower=this.normalizeAiNumber(t.nitroPower,0)),t.enginePower!==void 0&&(n.enginePower=this.normalizeAiNumber(t.enginePower,0)),t.mass!==void 0&&(n.mass=this.normalizeAiNumber(t.mass,0)),t.stuckSpeed!==void 0&&(n.stuckSpeed=this.normalizeAiNumber(t.stuckSpeed,0)),t.stuckMs!==void 0&&(n.stuckMs=this.normalizeAiNumber(t.stuckMs,0)),t.unstuckReverseMs!==void 0&&(n.unstuckReverseMs=this.normalizeAiNumber(t.unstuckReverseMs,0)),t.nitroRegenRate!==void 0&&(n.nitroRegenRate=this.normalizeAiNumber(t.nitroRegenRate,20)),t.nitroBurstMs!==void 0&&(n.nitroBurstMs=this.normalizeAiNumber(t.nitroBurstMs,1100)),t.nitroCooldownMs!==void 0&&(n.nitroCooldownMs=this.normalizeAiNumber(t.nitroCooldownMs,1200)),t.nitroFireRatio!==void 0&&(n.nitroFireRatio=this.normalizeAiNumber(t.nitroFireRatio,.5)),t.catchupNitroBand!==void 0&&(n.catchupNitroBand=this.normalizeAiNumber(t.catchupNitroBand,1.4)),t.flipHeightFactorMin!==void 0&&this.normalizeAiNumber(t.flipHeightFactorMin,0)>0&&(n.flipHeightFactorMin=this.normalizeAiNumber(t.flipHeightFactorMin,1.5)),t.flipTiltPower!==void 0&&this.normalizeAiNumber(t.flipTiltPower,0)>0&&(n.flipTiltPower=this.normalizeAiNumber(t.flipTiltPower,3)),t.flipFullRotationDeg!==void 0&&this.normalizeAiNumber(t.flipFullRotationDeg,0)>0&&(n.flipFullRotationDeg=this.normalizeAiNumber(t.flipFullRotationDeg,331)),n}normalizeWorkingData(e){e.cars??={},e.playerCars??={},e.npcAi=this.normalizeNpcAiBalance(e.npcAi);for(let[t,n]of Object.entries(m)){let r=e.cars[t]??={name:n.name,price:n.price,upgrades:{body:n.upgrades.body.map(e=>({price:e.price,hp:e.stats.hp??0})),engine:n.upgrades.engine.map(e=>({price:e.price,enginePower:e.stats.enginePower??0,maxSpeed:e.stats.maxSpeed??0,acceleration:e.stats.acceleration??0})),nitro:n.upgrades.nitro.map(e=>({price:e.price,nitroAmount:e.stats.nitroAmount??0,nitroPower:e.stats.nitroPower??0})),wheel:n.upgrades.wheel.map(e=>({price:e.price,wheelHp:e.stats.wheelHp??0,dynamicFriction:e.stats.dynamicFriction??0,staticFriction:e.stats.staticFriction??0}))}};r.name??=n.name,r.price??=n.price,r.unlockRequiresLevel??=n.unlockRequiresLevel,r.bodyMass??=n.bodyMass,r.suspension={...n.suspension,...r.suspension??{}},r.baseTuning={...n.baseTuning,...r.baseTuning??{}};let i=e.playerCars[t]??={};i.scale??=n.scale,i.body??={},i.body.size??=[...n.bodyShape.size],i.body.offset??=[...n.bodyOffset??[0,0]],i.body.material={...n.bodyMaterial,...i.body.material??{}},i.wheels??={},i.wheels.radius??=n.upgrades.wheel[0]?.stats.radius??80,i.wheels.mass??=n.upgrades.wheel[0]?.stats.mass??2.5,i.wheelSlots=n.wheelSlots.map((e,t)=>{let n=i.wheelSlots?.[t];return{offset:[...n?.offset??e.offset],pivotA:[...n?.pivotA??e.pivotA??e.offset],pivotB:[...n?.pivotB??e.pivotB??e.offset]}})}e.levels??={};for(let t of g){let n=t.mission,r=e.levels[t.key]??={type:n?.type??`race`};r.sourceLevelKey??=t.key,r.type??=n?.type??`race`,Array.isArray(r.enemyKeys)&&(r.enemyKeys=r.enemyKeys.map(e=>String(e).trim()).filter(e=>e.length>0)),r.enemyKeys==null&&t.enemyKeys?.length&&(r.enemyKeys=[...t.enemyKeys]);let i=r.enemyKeys?.length??0,a=Array.isArray(r.enemyAiOverrides)?r.enemyAiOverrides:[];for(;a.length<i;)a.push({});r.enemyAiOverrides=a.slice(0,i),r.timeLimit==null&&n?.timeLimit!=null&&(r.timeLimit=n.timeLimit),r.gold==null&&n?.gold!=null&&(r.gold=n.gold),r.silver==null&&n?.silver!=null&&(r.silver=n.silver),r.bronze==null&&n?.bronze!=null&&(r.bronze=n.bronze),(r.type===`race`||r.type===`place`)&&(r.gold??=E.gold,r.silver??=E.silver,r.bronze??=E.bronze),r.coins1??=0,r.coins2??=0,r.coins3??=0}e.enemies??={};for(let t of r){let n=e.enemies[t]??={displayName:t,ai:{}};n.displayName=String(n.displayName??t).trim()||t,n.ai=this.normalizeEnemyAiBalance(n.ai);let r=Number(n.suspension?.travelDown);Number.isFinite(r)&&r>0?n.suspension={travelDown:r}:delete n.suspension}e.physics??={},e.physics.wheelDroopRatio??=.12,e.physics.crushMaxUpSpeed??=150,e.physics.crushSpeedPenalty??=.08,e.physics.crushMaxSpin??=2.5,e.physics.maxLaunchGainPerFrame??=0,s.has(this.currentAiEnemyKey)||(this.currentAiEnemyKey=r[0]??``),e.rewards??={},e.rewards.coinPerPickup??=5,e.rewards.coinPerDestructible??=1,e.rewards.nitroFlipPercent??=20,e.rewards.coinPerFlip??=5,e.rewards.minFlipAngleDeg??=300,e.rewards.minFlipLandingAngleDeg??=180,e.rewards.destructibleCoins??={},e.rewards.destructibleCoins.default??=e.rewards.coinPerDestructible,e.rewards.destructibleCoins.byAsset??={},e.rewards.destructibleNames??={},e.rewards.destructibleItems??=[],e.rewards.destructibleItems.length?e.rewards.destructibleItems=e.rewards.destructibleItems.map(t=>this.normalizeDestructibleItem(t,e.rewards)).filter(e=>!!e):e.rewards.destructibleItems=this.createDefaultDestructibleItems(e.rewards),e.rewards.destructibleNames=Object.fromEntries(e.rewards.destructibleItems.map(e=>[e.assetKey,e.displayName??e.assetKey])),e.rewards.destructibleCoins.byAsset=Object.fromEntries(e.rewards.destructibleItems.filter(e=>e.price!=null).map(e=>[e.assetKey,Number(e.price)])),e.rewards.coinPerDestructible=e.rewards.destructibleCoins.default,e.achievements??=JSON.parse(JSON.stringify(d));for(let t of o){let n=d[t],r=e.achievements[t]??={};r.thresholds=[Number.isFinite(Number(r.thresholds?.[0]))?Math.max(0,Number(r.thresholds[0])):n.thresholds[0],Number.isFinite(Number(r.thresholds?.[1]))?Math.max(0,Number(r.thresholds[1])):n.thresholds[1],Number.isFinite(Number(r.thresholds?.[2]))?Math.max(0,Number(r.thresholds[2])):n.thresholds[2]],r.rewards=[Number.isFinite(Number(r.rewards?.[0]))?Math.max(0,Number(r.rewards[0])):n.rewards[0],Number.isFinite(Number(r.rewards?.[1]))?Math.max(0,Number(r.rewards[1])):n.rewards[1],Number.isFinite(Number(r.rewards?.[2]))?Math.max(0,Number(r.rewards[2])):n.rewards[2]]}e.npcFlips??={flipProbability:.6,flipCooldownMs:2e3,flipHeightFactorMin:1.2,flipHeightFactorMax:1.5,flipTiltPower:3,flipFullRotationDeg:331};let t=e.npcFlips;t.flipProbability=Math.max(0,Math.min(1,Number.isFinite(Number(t.flipProbability))?Number(t.flipProbability):.6)),t.flipCooldownMs=Math.max(100,Number.isFinite(Number(t.flipCooldownMs))?Number(t.flipCooldownMs):2e3),t.flipHeightFactorMin=Math.max(.1,Number.isFinite(Number(t.flipHeightFactorMin))?Number(t.flipHeightFactorMin):1.2),t.flipHeightFactorMax=Math.max(.5,Number.isFinite(Number(t.flipHeightFactorMax))?Number(t.flipHeightFactorMax):1.5),t.flipTiltPower=Math.max(1,Number.isFinite(Number(t.flipTiltPower))?Number(t.flipTiltPower):3),t.flipFullRotationDeg=Math.max(90,Math.min(360,Number.isFinite(Number(t.flipFullRotationDeg))?Number(t.flipFullRotationDeg):331)),e.boosters??={},e.boosters.double_health??={price:100},e.boosters.coin_magnet??={price:200},e.boosters.double_nitro??={price:500},e.boosters.double_health.price??=100,e.boosters.coin_magnet.price??=200,e.boosters.double_nitro.price??=500,e.damage??=JSON.parse(JSON.stringify(p));let n=e.damage?.player??{},i=e.damage?.npc??{};return e.damage.player=Object.fromEntries(Object.keys(p.player).map(e=>[e,n[e]??p.player[e]])),e.damage.npc=Object.fromEntries(Object.keys(p.npc).map(e=>[e,i[e]??p.npc[e]])),e}buildDomUi(){let e=document.createElement(`div`);e.id=`balance-editor`,e.style.cssText=`
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(10,10,20,0.97); color: #ecf0f1; font-family: monospace;
      font-size: 13px; z-index: 999999; overflow: hidden;
      display: flex; flex-direction: column;
    `,e.innerHTML=this.buildHtml(),document.body.appendChild(e),this.domContainer=e,this.attachEvents(e),window.addEventListener(`message`,this.embeddedCarEditorMessageHandler),this.renderTabContent()}destroyDomUi(){this.domContainer&&=(this.domContainer.remove(),void 0),window.removeEventListener(`message`,this.embeddedCarEditorMessageHandler)}buildHtml(){let e=[`cars`,`playerCars`,`levels`,`content`,`prefabs`,`ai`,`difficulty`,`damage`,`rewards`,`achievements`,`boosters`].map(e=>`<button class="be-tab" data-tab="${e}" style="
        padding: 8px 20px; border: none; cursor: pointer; font-family: monospace;
        font-size: 13px; border-radius: 4px 4px 0 0;
        background: ${e===this.currentTab?`#e94560`:`#0f3460`};
        color: #ecf0f1; margin-right: 4px;
      ">${e===`playerCars`?`PLAYER CARS`:e.toUpperCase()}</button>`).join(``);return`
      <div style="background:#0f3460; padding:10px 16px; display:flex; align-items:center; gap:12px; flex-shrink:0;">
        <span style="color:#e94560; font-size:16px; font-weight:bold;">⚙ BALANCE EDITOR</span>
        <span style="color:#95a5a6; font-size:11px;">Edit balance values and click Apply to apply in-game</span>
        <div style="margin-left:auto; display:flex; gap:8px;">
          <button id="be-designer-reload" style="${this.btnStyle(`#5b2c83`)}">⟳ RELOAD ALL LEVELS</button>
          <button id="be-apply"  style="${this.btnStyle(`#2e7d32`)}">▶ APPLY</button>
          <button id="be-export" style="${this.btnStyle(`#0f3460`)}">⬇ EXPORT JSON</button>
          <button id="be-import-btn" style="${this.btnStyle(`#0f3460`)}">⬆ IMPORT JSON</button>
          <input id="be-import" type="file" accept=".json" style="display:none">
          <input id="be-content-import" type="file" accept=".json" style="display:none">
          <button id="be-reset"  style="${this.btnStyle(`#5a3e00`)}">↺ RESET</button>
          <button id="be-close"  style="${this.btnStyle(`#8b1a1a`)}">✕ CLOSE</button>
        </div>
      </div>
      <div style="padding:0 16px; background:#16213e; flex-shrink:0; padding-top:8px;">
        ${e}
      </div>
      <div id="be-content" style="flex:1; overflow-y:auto; padding:16px;"></div>
    `}btnStyle(e){return`padding:6px 12px; border:none; cursor:pointer; font-family:monospace;
      font-size:12px; border-radius:4px; background:${e}; color:#ecf0f1;`}attachEvents(e){e.addEventListener(`click`,t=>{let n=t.target,r=n.closest(`[data-action]`);if(r?.dataset.action===`content-add-enemy`&&r.dataset.levelKey){this.syncInputsFromDom(e),this.addContentEnemyRow(r.dataset.levelKey);return}if(r?.dataset.action===`content-remove-enemy`&&r.dataset.levelKey&&r.dataset.enemyIndex!==void 0){this.syncInputsFromDom(e),this.removeContentEnemyRow(r.dataset.levelKey,parseInt(r.dataset.enemyIndex,10));return}if(r?.dataset.action===`add-destructible`){this.syncInputsFromDom(e),this.addDestructibleItem();return}if(r?.dataset.action===`remove-destructible`&&r.dataset.index!==void 0){this.syncInputsFromDom(e),this.removeDestructibleItem(parseInt(r.dataset.index,10));return}if(r?.dataset.action===`add-destructible-frame`&&r.dataset.index!==void 0&&r.dataset.list){this.syncInputsFromDom(e),this.addDestructibleFrame(parseInt(r.dataset.index,10),r.dataset.list);return}if(r?.dataset.action===`remove-destructible-frame`&&r.dataset.index!==void 0&&r.dataset.list&&r.dataset.frameIndex!==void 0){this.syncInputsFromDom(e),this.removeDestructibleFrame(parseInt(r.dataset.index,10),r.dataset.list,parseInt(r.dataset.frameIndex,10));return}if(r?.dataset.action===`add-destructible-debris`&&r.dataset.index!==void 0){this.syncInputsFromDom(e),this.addDestructibleDebris(parseInt(r.dataset.index,10));return}if(r?.dataset.action===`remove-destructible-debris`&&r.dataset.index!==void 0&&r.dataset.debrisIndex!==void 0){this.syncInputsFromDom(e),this.removeDestructibleDebris(parseInt(r.dataset.index,10),parseInt(r.dataset.debrisIndex,10));return}if(r?.dataset.action===`reset-prefab-physics`&&r.dataset.prefabAsset&&r.dataset.prefabKind){this.syncInputsFromDom(e);let t=r.dataset.prefabKind,n=r.dataset.prefabAsset;this.setLevelContentPrefabValue(t,n,`mass`,void 0),this.setLevelContentPrefabValue(t,n,`hp`,void 0);let i=parseInt(r.dataset.destructibleIndex??`-1`,10),a=this.workingData.rewards?.destructibleItems?.[i];a&&(delete a.mass,delete a.hp),this.renderTabContent();return}if(r?.dataset.action===`export-content`){this.syncInputsFromDom(e),this.exportLevelContentJson(e);return}if(r?.dataset.action===`import-content`){e.querySelector(`#be-content-import`)?.click();return}if(r?.dataset.action===`reset-content`){this.resetLevelContent(e);return}if(r?.dataset.action===`select-content-level`&&r.dataset.levelKey){this.syncInputsFromDom(e),this.currentContentLevelKey=r.dataset.levelKey,this.renderTabContent();return}if(r?.dataset.action===`select-prefab-section`&&r.dataset.prefabSection){this.syncInputsFromDom(e);let t=r.dataset.prefabSection;(t===`destructible`||t===`collectible`||t===`static`)&&(this.currentPrefabSection=t,this.renderTabContent());return}if(r?.dataset.action===`swap-level`&&r.dataset.levelKey&&r.dataset.direction){this.syncInputsFromDom(e),this.swapLevelWithNeighbor(r.dataset.levelKey,r.dataset.direction===`up`?-1:1);return}if(r?.dataset.action===`select-ai-enemy`&&r.dataset.enemyKey){this.syncInputsFromDom(e),this.currentAiEnemyKey=r.dataset.enemyKey,this.renderTabContent();return}if(n.dataset.tab){this.syncInputsFromDom(e),this.currentTab=n.dataset.tab,this.rebuildTabButtons(e),this.currentTab===`content`?this.ensureContentLevelLoaded(this.currentContentLevelKey):(this.currentTab===`prefabs`||this.currentTab===`rewards`)&&this.ensureAllContentLevelsLoaded(),this.renderTabContent();return}n.classList.contains(`be-car-tab`)&&n.dataset.car!==void 0&&(this.syncInputsFromDom(e),this.currentCarIdx=parseInt(n.dataset.car),this.renderTabContent())}),C(e),e.querySelector(`#be-designer-reload`)?.addEventListener(`click`,()=>{this.runDesignerReloadAll(e)}),e.querySelector(`#be-apply`)?.addEventListener(`click`,()=>this.applyChanges(e)),e.querySelector(`#be-export`)?.addEventListener(`click`,()=>{this.syncInputsFromDom(e),this.workingData=this.normalizeWorkingData(this.workingData),this.exportJson()}),e.querySelector(`#be-reset`)?.addEventListener(`click`,()=>this.resetToLoaded(e)),e.querySelector(`#be-close`)?.addEventListener(`click`,()=>{this.destroyDomUi(),this.scene.stop()});let t=e.querySelector(`#be-import-btn`),n=e.querySelector(`#be-import`),r=e.querySelector(`#be-content-import`);t?.addEventListener(`click`,()=>n?.click()),n?.addEventListener(`change`,()=>{let t=n.files?.[0];if(n.value=``,!t)return;let r=new FileReader;r.onload=t=>{try{this.workingData=this.normalizeWorkingData(JSON.parse(t.target?.result)),this.seedDestructibleItemsFromPrefabs(),f.apply(this.workingData),this.syncEnemyKeysToContentData(),this.renderTabContent(),this.showFlash(e,`Imported ✓`,`#2e7d32`)}catch{this.showFlash(e,`Invalid JSON!`,`#8b1a1a`)}},r.readAsText(t)}),r?.addEventListener(`change`,()=>{let t=r.files?.[0];if(r.value=``,!t)return;let n=new FileReader;n.onload=t=>{try{this.levelContentData=h(JSON.parse(t.target?.result),g),this.renderTabContent(),this.showFlash(e,`Level content imported ✓`,`#2e7d32`)}catch{this.showFlash(e,`Invalid level content JSON!`,`#8b1a1a`)}},n.readAsText(t)})}rebuildTabButtons(e){e.querySelectorAll(`.be-tab`).forEach(e=>{let t=e;t.style.background=t.dataset.tab===this.currentTab?`#e94560`:`#0f3460`})}renderTabContent(){let e=this.domContainer?.querySelector(`#be-content`);if(!e)return;let t=this.buildLoadWarning(),n=``;switch(this.currentTab){case`cars`:n=this.buildCarsTab();break;case`playerCars`:n=this.buildPlayerCarsTab();break;case`levels`:n=this.buildLevelsTab();break;case`content`:n=this.buildContentTab();break;case`prefabs`:n=this.buildPrefabsTab();break;case`ai`:n=this.buildAiTab();break;case`difficulty`:n=this.buildDifficultyTab();break;case`damage`:n=this.buildDamageTab();break;case`rewards`:n=this.buildRewardsTab();break;case`npcFlips`:n=this.buildNpcFlipsTab();break;case`achievements`:n=this.buildAchievementsTab();break;case`boosters`:n=this.buildBoostersTab();break}e.innerHTML=`${t}${n}`}buildLoadWarning(){let e=f.getLoadError();return e?`
      <div style="background:#4a1f1f; border:1px solid #b34b4b; color:#ffd6d6; border-radius:6px; padding:12px; margin-bottom:14px; line-height:1.45;">
        <div style="font-weight:bold; margin-bottom:6px;">Balance JSON failed to load.</div>
        <div style="font-size:12px; margin-bottom:4px;">Requested: ${this.escapeHtml(f.getResolvedUrl())}</div>
        <div style="font-size:12px; color:#ffb3b3;">${this.escapeHtml(e)}</div>
        <div style="font-size:12px; margin-top:8px; color:#f1c6c6;">Current editor values may be incomplete until the hosted path issue is fixed or a JSON file is imported manually.</div>
      </div>
    `:``}buildCarsTab(){let e=Object.keys(this.workingData.cars);if(!e.length)return`<p>No car data loaded.</p>`;let t=e.map((e,t)=>{let n=this.workingData.cars[e];return`<button class="be-car-tab" data-car="${t}" style="
        padding:6px 10px; border:none; cursor:pointer; font-family:monospace;
        font-size:12px; border-radius:4px; margin-right:4px; margin-bottom:8px;
        background:${t===this.currentCarIdx?`#e94560`:`#0f3460`}; color:#ecf0f1;
        display:inline-flex; align-items:center; gap:8px;
      ">${this.getPlayerCarPreviewHtml(e,42)}<span>${this.escapeHtml(n.name??e)}</span></button>`}).join(``),n=e[this.currentCarIdx],r=this.workingData.cars[n],i=this.textRow(`cars.${n}.name`,`Car display name`,r.name??n),a=this.numRow(`cars.${n}.price`,`Car purchase price`,r.price,M.price),o=this.numRow(`cars.${n}.unlockRequiresLevel`,`Unlock at level`,r.unlockRequiresLevel??0,M.unlockRequiresLevel),s=this.numRow(`cars.${n}.bodyMass`,`Body mass`,r.bodyMass??0,M.bodyMass),c=r.suspension??{},l=Object.entries(c).map(([e,t])=>this.numRow(`cars.${n}.suspension.${e}`,e,t,A[e])).join(``),u=r.baseTuning??{},d=Object.entries(u).map(([e,t])=>this.numRow(`cars.${n}.baseTuning.${e}`,e,t,j[e])).join(``),f=(e,t)=>{let i=r.upgrades[e];return i?`<div style="margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; margin-bottom:6px; font-weight:bold;">▸ ${t}</div>
        ${i.map((t,r)=>{let i=Object.entries(t).filter(([e])=>e!==`price`).map(([t,i])=>this.numRow(`cars.${n}.upgrades.${e}.${r}.${t}`,t,i)).join(``);return`<div style="background:#0d1b2a; border-radius:4px; padding:8px; margin-bottom:6px;">
          <div style="color:#e94560; margin-bottom:4px; font-weight:bold;">Level ${r}</div>
          ${this.numRow(`cars.${n}.upgrades.${e}.${r}.price`,`price`,t.price)}
          ${i}
        </div>`}).join(``)}
      </div>`:``};return`
      <div id="be-car-tabs" style="margin-bottom:12px;">${t}</div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px; display:flex; gap:14px; align-items:center;">
        ${this.getPlayerCarPreviewHtml(n,96)}
        <div style="min-width:0; flex:1;">
          <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:10px;">${this.escapeHtml(r.name??n)}</div>
          ${i}
          ${a}
          ${o}
          ${s}
        </div>
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; margin-bottom:6px; font-weight:bold;">▸ Suspension</div>
        ${l}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; margin-bottom:6px; font-weight:bold;">▸ Base tuning</div>
        ${d}
      </div>
      ${f(`body`,`Body (HP)`)}
      ${f(`engine`,`Engine`)}
      ${f(`nitro`,`Nitro`)}
      ${f(`wheel`,`Wheels`)}
    `}buildPlayerCarsTab(){let e=Object.keys(this.workingData.cars);if(!e.length)return`<p>No player car data loaded.</p>`;let t=e.map((e,t)=>{let n=this.workingData.cars[e];return`<button class="be-car-tab" data-car="${t}" style="
        padding:6px 10px; border:none; cursor:pointer; font-family:monospace;
        font-size:12px; border-radius:4px; margin-right:4px; margin-bottom:8px;
        background:${t===this.currentCarIdx?`#e94560`:`#0f3460`}; color:#ecf0f1;
        display:inline-flex; align-items:center; gap:8px;
      ">${this.getPlayerCarPreviewHtml(e,42)}<span>${this.escapeHtml(n.name??e)}</span></button>`}).join(``),n=e[this.currentCarIdx],r=this.workingData.cars[n],i=m[n],a=this.workingData.playerCars?.[n];if(!a||!i)return`<p>No player car data loaded.</p>`;let o=a.body??{},s=o.size??[...i.bodyShape.size],c=o.offset??[...i.bodyOffset??[0,0]],l=a.wheels??{},u=a.wheelSlots??[],d=this.resolveUrl(`/car-editor.html?embed=1&mode=physics&car=${encodeURIComponent(n)}`),f=this.resolveUrl(`/car-editor.html?car=${encodeURIComponent(n)}`);return`
      <div id="be-car-tabs" style="margin-bottom:12px;">${t}</div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px; display:flex; gap:14px; align-items:center;">
        ${this.getPlayerCarPreviewHtml(n,96)}
        <div style="min-width:0; flex:1;">
          <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">${this.escapeHtml(r.name??n)}</div>
          <div style="color:#95a5a6; font-size:12px; line-height:1.45;">
            Тут редагуються лише значущі параметри геометрії машини для гонки: розмір кузова, точка обертання, радіус коліс і точки підвіски. Економіка, suspension tuning і апгрейди лишаються у вкладці <b>CARS</b>.
          </div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:minmax(320px, 420px) minmax(320px, 420px) minmax(0, 1fr); gap:12px; align-items:start;">
        <div style="background:#16213e; border-radius:6px; padding:12px;">
          <div style="color:#2980b9; font-size:14px; margin-bottom:6px; font-weight:bold;">▸ Кузов</div>
          ${this.numRow(`playerCars.${n}.scale`,`Масштаб машини`,a.scale??i.scale,N.scale)}
          ${this.numRow(`playerCars.${n}.body.size.0`,`Ширина collider кузова`,s[0],N.bodyWidth)}
          ${this.numRow(`playerCars.${n}.body.size.1`,`Висота collider кузова`,s[1],N.bodyHeight)}
          ${this.numRow(`playerCars.${n}.body.offset.0`,`Точка обертання X`,c[0],N.bodyOffsetX)}
          ${this.numRow(`playerCars.${n}.body.offset.1`,`Точка обертання Y`,c[1],N.bodyOffsetY)}
        </div>
        <div style="background:#16213e; border-radius:6px; padding:12px;">
          <div style="color:#2980b9; font-size:14px; margin-bottom:6px; font-weight:bold;">▸ Колеса і підвіска</div>
          ${this.numRow(`playerCars.${n}.wheels.radius`,`Радіус коліс`,l.radius??i.upgrades.wheel[0]?.stats.radius??80,N.wheelRadius)}
          ${this.numRow(`playerCars.${n}.wheels.mass`,`Маса колеса`,l.mass??i.upgrades.wheel[0]?.stats.mass??2.5,N.wheelMass)}
          <div style="margin-top:10px;">
            ${u.map((e,t)=>this.buildPlayerCarWheelSlotCard(n,t,e,i)).join(``)}
          </div>
        </div>
        <div style="background:#16213e; border-radius:6px; padding:12px; min-width:0;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
            <div style="color:#2980b9; font-size:14px; font-weight:bold;">▸ Вбудований редактор</div>
            <a href="${this.escapeHtml(f)}" target="_blank" rel="noreferrer" style="color:#5dade2; font-size:12px;">відкрити окремо</a>
          </div>
          <div style="color:#95a5a6; font-size:11px; margin-bottom:10px; line-height:1.45;">
            Вбудований <code>car-editor</code> відкривається одразу в режимі <b>Фізика</b>: там зручніше тягнути кузов, колеса, радіус і піводи прямо на полотні. Якщо треба підганяти спрайти - перемкнись у режим <b>Візуал</b>.
          </div>
          <iframe src="${this.escapeHtml(d)}" title="car editor ${this.escapeHtml(n)}" style="width:100%; min-height:760px; border:1px solid #294f7a; border-radius:8px; background:#0b1525;"></iframe>
        </div>
      </div>
    `}buildPlayerCarWheelSlotCard(e,t,n,r){let i=r.wheelSlots[t],a=t===0?`Переднє колесо`:t===1?`Заднє колесо`:`Колесо ${t+1}`,o=n.offset??[...i.offset],s=n.pivotA??[...i.pivotA??i.offset],c=n.pivotB??[...i.pivotB??i.offset];return`<div style="background:#0d1b2a; border-radius:6px; padding:10px; margin-bottom:10px;">
      <div style="color:#e94560; margin-bottom:6px; font-weight:bold;">${this.escapeHtml(a)}</div>
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.offset.0`,`Центр колеса X`,o[0],N.slotOffsetX)}
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.offset.1`,`Центр колеса Y`,o[1],N.slotOffsetY)}
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.pivotA.0`,`Верхній півод X`,s[0],N.pivotAX)}
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.pivotA.1`,`Верхній півод Y`,s[1],N.pivotAY)}
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.pivotB.0`,`Нижній півод X`,c[0],N.pivotBX)}
      ${this.numRow(`playerCars.${e}.wheelSlots.${t}.pivotB.1`,`Нижній півод Y`,c[1],N.pivotBY)}
    </div>`}buildLevelsTab(){let e=g.map(e=>e.key).filter(e=>!!this.workingData.levels[e]);if(!e.length)return`<p>No level data loaded.</p>`;let t=[`race`,`place`,`time`,`jump`,`flips`,`crush`,`tow`];return e.map((n,r)=>{let i=this.workingData.levels[n],a=i.sourceLevelKey??n,o=g.find(e=>e.key===a)?.label??a,s=String(r+1),c=this.getLevelThresholdLabels(i.type),l=r>0,u=r<e.length-1;return`
        <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
            <div style="color:#e94560; font-size:14px; font-weight:bold;">
              ${this.escapeHtml(n)} — ${this.escapeHtml(i.type??`?`)}
              <span style="color:#95a5a6; font-size:11px; font-weight:normal;">(map #${this.escapeHtml(s)}: ${this.escapeHtml(o)})</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button
                type="button"
                data-action="swap-level"
                data-level-key="${this.escapeHtml(n)}"
                data-direction="up"
                ${l?``:`disabled`}
                style="${this.btnStyle(l?`#0f3460`:`#2c3e50`)}; padding:4px 8px; font-size:11px; ${l?``:`opacity:0.6; cursor:not-allowed;`}"
              >↑ MOVE</button>
              <button
                type="button"
                data-action="swap-level"
                data-level-key="${this.escapeHtml(n)}"
                data-direction="down"
                ${u?``:`disabled`}
                style="${this.btnStyle(u?`#0f3460`:`#2c3e50`)}; padding:4px 8px; font-size:11px; ${u?``:`opacity:0.6; cursor:not-allowed;`}"
              >↓ MOVE</button>
            </div>
          </div>
          ${this.selectRow(`levels.${n}.type`,`Mission type`,String(i.type??`race`),t)}
          ${this.numRow(`levels.${n}.gold`,c.gold,i.gold??0,P)}
          ${this.numRow(`levels.${n}.silver`,c.silver,i.silver??0,P)}
          ${this.numRow(`levels.${n}.bronze`,c.bronze,i.bronze??0,P)}
          ${i.timeLimit!=null||i.type===`time`||i.type===`tow`||i.type===`flips`||i.type===`crush`?this.numRow(`levels.${n}.timeLimit`,`Time limit (s)`,i.timeLimit??0,`Ліміт часу рівня в секундах. 0 = без ліміту`):``}
          ${this.numRow(`levels.${n}.coins1`,`Coins for ★☆☆`,i.coins1??0,`Монети за фініш рівня з 1 зіркою`)}
          ${this.numRow(`levels.${n}.coins2`,`Coins for ★★☆`,i.coins2??0,`Монети за фініш рівня з 2 зірками`)}
          ${this.numRow(`levels.${n}.coins3`,`Coins for ★★★`,i.coins3??0,`Монети за фініш рівня з 3 зірками`)}
          ${this.numRow(`levels.${n}.damageMul`,`Damage multiplier`,i.damageMul??1,`Множник УСЬОГО дамагу, який отримує гравець на цьому рівні. 1 = без змін, 1.5 = у півтора раза більше. Діє на зіткнення, падіння на дах і наїзд на об'єкти`)}
          <div style="margin-top:10px; padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">Enemy roster and marker positions now live in the Level Content tab.</div>
        </div>
      `}).join(``)}buildAiTab(){let e=this.normalizeNpcAiBalance(this.workingData.npcAi),t={enableNitro:`Enable nitro (1=yes)`,enableFlip:`Enable flip (1=yes)`,maxSpeed:`Max speed`,nitroPower:`Nitro power`,enginePower:`Engine power (0=inherit)`,mass:`Body mass kg (0=inherit)`,stuckSpeed:`Stuck speed px/s (0=default)`,stuckMs:`Stuck time ms (0=default)`,unstuckReverseMs:`Reverse time ms (0=default)`,nitroRegenRate:`Nitro regen/s (0=off, default 20)`,nitroBurstMs:`Nitro burst ms (default 1100)`,nitroCooldownMs:`Burst cooldown ms (default 1200)`,nitroFireRatio:`Tank ratio to fire (0..1, default 0.5)`,catchupNitroBand:`Catch-up nitro band (default 1.4)`,flipHeightFactorMin:`Min flip height (×chassis, 0=inherit)`,flipTiltPower:`Швидкість фліпу (×момент, 0=глобал)`,flipFullRotationDeg:`Кут зарахування фліпу (°, 0=глобал)`},n=s.has(this.currentAiEnemyKey)?this.currentAiEnemyKey:r[0]??``,i=this.workingData.enemies?.[n]??{displayName:n,ai:{}},a=i.ai??{},o=r.map(e=>{let t=e===n,r=this.getEnemyDisplayName(e);return`
        <button
          type="button"
          data-action="select-ai-enemy"
          data-enemy-key="${this.escapeHtml(e)}"
          style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; padding:10px; margin-bottom:8px; border:1px solid ${t?`#5dade2`:`#294f7a`}; border-radius:8px; background:${t?`#17395c`:`#0d1b2a`}; color:#ecf0f1; cursor:pointer;"
        >
          ${this.getEnemyPreviewHtml(e,54)}
          <span style="display:block; min-width:0; flex:1;">
            <span style="display:block; font-size:12px; font-weight:bold; color:${t?`#5dade2`:`#ecf0f1`}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${this.escapeHtml(r)}</span>
            <span style="display:block; font-size:11px; color:#95a5a6; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${this.escapeHtml(e)}</span>
          </span>
        </button>
      `}).join(``),c=n?this.getEnemyPreviewHtml(n,92):this.iconHtml(null,`N/A`,92);return`
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:10px;">Global NPC AI Parameters</div>
        ${O.map(n=>this.numRow(`npcAi.${n}`,t[n],this.toNumericInputValue(e[n]),D[n])).join(``)}
        ${this.numRow(`physics.wheelDroopRatio`,`Провисання коліс (× радіус)`,this.workingData.physics?.wheelDroopRatio??.12,`Макс. провисання колеса в повітрі як частка його радіуса (0.12 = 12%). Діє на ВСІ машини — гравця і ворогів; точне значення конкретному ворогу — нижче в Per-enemy.`)}
        ${this.numRow(`npcFlips.flipTiltPower`,`Швидкість фліпу (глобальна)`,this.workingData.npcFlips?.flipTiltPower??3,`Глобальна швидкість обертання фліпу для всіх ботів (цільова кутова швидкість, rad/s): більше = швидший фліп. Те саме значення, що в NPC FLIPS. Per-enemy перекриває його нижче.`)}
        ${this.numRow(`npcFlips.flipFullRotationDeg`,`Кут зарахування фліпу (глобальний, °)`,this.workingData.npcFlips?.flipFullRotationDeg??331,`Глобальний накопичений оберт (°), після якого фліп вважається виконаним. Кламп 90–360. Те саме значення, що в NPC FLIPS. Per-enemy перекриває його нижче.`)}
      </div>
      <div style="display:grid; grid-template-columns:minmax(280px, 340px) minmax(0, 1fr); gap:12px;">
        <div style="background:#16213e; border-radius:6px; padding:12px; max-height:calc(100vh - 240px); overflow:auto;">
          <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">Enemy AI Profiles</div>
          <div style="color:#95a5a6; font-size:11px; margin-bottom:10px;">All registered enemies are listed here. Select one to edit its visible name and personal AI settings.</div>
          ${o}
        </div>
        <div style="background:#16213e; border-radius:6px; padding:12px;">
          <div style="display:flex; gap:14px; align-items:center; margin-bottom:12px;">
            ${c}
            <div style="min-width:0; flex:1;">
              <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">${this.escapeHtml(n||`No enemy selected`)}</div>
              ${this.textRow(`enemies.${n}.displayName`,`Visible name`,i.displayName??n)}
            </div>
          </div>
          <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">Per-enemy AI</div>
          <div style="color:#95a5a6; font-size:11px; margin-bottom:12px;">These values override the global AI block for the selected enemy. Empty = inherit from Global.</div>
          ${O.map(r=>{let i=a[r],o=i===void 0?void 0:this.toNumericInputValue(i),s=this.toNumericInputValue(e[r]);return this.numRowOptional(`enemies.${n}.ai.${r}`,t[r],o,s,D[r])}).join(``)}
          ${(()=>{let e=this.workingData.npcFlips?.flipHeightFactorMin??1.5,r=a.flipHeightFactorMin,i=r===void 0?void 0:this.toNumericInputValue(r);return this.numRowOptional(`enemies.${n}.ai.flipHeightFactorMin`,t.flipHeightFactorMin,i,this.toNumericInputValue(e),`Мінімальна висота над дорогою (×висота кузова), на якій ворог починає флип. 0/порожньо = успадкувати глобальне з NPC Flips.`)})()}
          ${(()=>{let e=this.workingData.npcFlips?.flipTiltPower??3,r=a.flipTiltPower,i=r===void 0?void 0:this.toNumericInputValue(r);return this.numRowOptional(`enemies.${n}.ai.flipTiltPower`,t.flipTiltPower,i,this.toNumericInputValue(e),`Сила обертання під час фліпу (множник крутного моменту): більше = швидший фліп. 0/порожньо = успадкувати глобальне з NPC Flips.`)})()}
          ${(()=>{let e=this.workingData.npcFlips?.flipFullRotationDeg??331,r=a.flipFullRotationDeg,i=r===void 0?void 0:this.toNumericInputValue(r);return this.numRowOptional(`enemies.${n}.ai.flipFullRotationDeg`,t.flipFullRotationDeg,i,this.toNumericInputValue(e),`Накопичений оберт (°), після якого фліп ворога вважається виконаним і обертання припиняється. Кламп 90–360. 0/порожньо = успадкувати глобальне з NPC Flips.`)})()}
          ${(()=>{let e=i.suspension?.travelDown,t=e===void 0?void 0:this.toNumericInputValue(e);return this.numRowOptional(`enemies.${n}.suspension.travelDown`,`Хід колеса вниз (px, 0=авто)`,t,0,`Наскільки колесо може провиснути нижче спрайту в повітрі. Порожньо/0 = авто: радіус колеса × «Провисання коліс» з Global зверху.`)})()}
        </div>
      </div>
    `}buildContentTab(){let e=g.map(e=>{let t=e.key===this.currentContentLevelKey;return`<button
        type="button"
        data-action="select-content-level"
        data-level-key="${this.escapeHtml(e.key)}"
        style="padding:6px 10px; border:none; cursor:pointer; font-family:monospace; font-size:12px; border-radius:4px; margin-right:4px; margin-bottom:8px; background:${t?`#e94560`:`#0f3460`}; color:#ecf0f1;"
      >${this.escapeHtml(e.label)}</button>`}).join(``),t=g.map(e=>e.key).filter(e=>!!this.workingData.levels[e]).indexOf(this.currentContentLevelKey),n=t>=0?String(t+1):`?`,r=this.workingData.levels[this.currentContentLevelKey]??{},i=r.sourceLevelKey??this.currentContentLevelKey,a=g.find(e=>e.key===i)?.label??i,o=String(r.type??`?`),s=this.levelContentData.levels[this.currentContentLevelKey];if(!s)return this.ensureContentLevelLoaded(this.currentContentLevelKey),`
        <div style="background:#16213e; border-radius:6px; padding:12px;">
          <div style="margin-bottom:10px;">${e}</div>
          <div style="color:#95a5a6;">Loading level content from source map...</div>
        </div>
      `;let c=[`start`,`finish`,`jump-start`],l=this.validateLevelContentData(this.levelContentData,this.currentContentLevelKey),u=this.buildContentValidationPanel(l.errors,l.warnings),d=c.map(e=>{let t=s.markers[e];if(!t)return`<div style="background:#0d1b2a; border-radius:6px; padding:10px; color:#95a5a6;">${this.escapeHtml(e)}: not found in source map.</div>`;let n=`levels.${this.currentContentLevelKey}.markers.${e}`;return`
        <div style="background:#0d1b2a; border-radius:6px; padding:10px;">
          <div style="color:#e94560; font-size:13px; font-weight:bold; margin-bottom:8px;">${this.escapeHtml(e)}</div>
          ${this.contentNumRow(`${n}.x`,`X`,t.x)}
          ${this.contentNumRow(`${n}.y`,`Y`,t.y)}
          ${this.contentNumRow(`${n}.width`,`Width`,t.width)}
          ${this.contentNumRow(`${n}.height`,`Height`,t.height)}
        </div>
      `}).join(``),f=s.enemyKeys.map((e,t)=>this.contentEnemyKeyRow(this.currentContentLevelKey,e,t,this.resolveContentEnemySpawnX(s,t),this.resolveContentEnemySpawnY(s,t),this.resolveContentEnemySpawnPoint(s,t))).join(``),p=s.pickups.slice(0,this.maxContentObjectsPerSection).map((e,t)=>this.contentObjectRow(this.currentContentLevelKey,`pickups`,e,t)).join(``),m=s.props.slice(0,this.maxContentObjectsPerSection).map((e,t)=>this.contentObjectRow(this.currentContentLevelKey,`props`,e,t)).join(``);return`
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        ${u}
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
          <div>
            <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:4px;">${this.escapeHtml(n)}. ${this.escapeHtml(a)} — ${this.escapeHtml(o)}</div>
            <div style="color:#95a5a6; font-size:11px;">Constrained editor for markers, enemy roster, per-instance object placement, and launch metadata. Shared object tuning now lives in the Prefabs tab.</div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" data-action="export-content" style="${this.btnStyle(`#0f3460`)}">⬇ EXPORT LEVEL JSON</button>
            <button type="button" data-action="import-content" style="${this.btnStyle(`#0f3460`)}">⬆ IMPORT LEVEL JSON</button>
            <button type="button" data-action="reset-content" style="${this.btnStyle(`#5a3e00`)}">↺ RESET LEVELS</button>
          </div>
        </div>
        <div style="margin-bottom:10px;">${e}</div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-bottom:12px;">${d}</div>
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Enemy roster</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">
          Spawn logic: set only <b>X</b> for each enemy. <b>Y</b> is auto-calculated at race start using ground raycast,
          so cars do not spawn inside or under the road.
        </div>
        <div style="display:flex; justify-content:flex-end; margin-bottom:8px;">
          <button type="button" data-action="content-add-enemy" data-level-key="${this.escapeHtml(this.currentContentLevelKey)}" style="${this.btnStyle(`#0f3460`)}; padding:5px 10px; font-size:11px;">＋ ADD ENEMY</button>
        </div>
        ${f?`<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:8px;">${f}</div>`:`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">No enemy cars configured for this level yet.</div>`}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Pickups (${s.pickups.length})</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Showing first ${this.maxContentObjectsPerSection}. These rows are for per-instance placement and one-off overrides.</div>
        ${p||`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">No pickups found on this level.</div>`}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Props/Destructibles (${s.props.length})</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Showing first ${this.maxContentObjectsPerSection}. These are per-instance overrides for position, size, asset swaps, and one-off gameplay tweaks.</div>
        ${m||`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">No props found on this level.</div>`}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px;">
        <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Launch metadata</div>
        ${this.contentNumRow(`levels.${this.currentContentLevelKey}.cameraMinYOffset`,`Camera min Y offset`,s.cameraMinYOffset??0)}
        ${this.contentNumRow(`levels.${this.currentContentLevelKey}.cameraOffsetY`,`Camera offset Y`,s.cameraOffsetY??0)}
        ${this.contentNumRow(`levels.${this.currentContentLevelKey}.backgroundBaseYOffset`,`Background base Y offset`,s.backgroundBaseYOffset??0)}
        ${this.contentBoolRow(`levels.${this.currentContentLevelKey}.cameraLockOffsetY`,`Lock camera offset`,s.cameraLockOffsetY??!0)}
      </div>
    `}buildPrefabsTab(){if(!g.every(e=>!!this.levelContentData.levels[e.key]))return this.ensureAllContentLevelsLoaded(),`
        <div style="background:#16213e; border-radius:6px; padding:12px;">
          <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">Префаби</div>
          <div style="color:#95a5a6; font-size:11px;">Завантаження карт для формування каталогу...</div>
        </div>
      `;let e=[{key:`destructible`,label:`Руйнівні`},{key:`collectible`,label:`Збираємі`},{key:`static`,label:`Статичні`}].map(e=>`<button
      type="button"
      data-action="select-prefab-section"
      data-prefab-section="${e.key}"
      style="padding:6px 10px; border:none; cursor:pointer; font-family:monospace; font-size:12px; border-radius:4px; margin-right:4px; margin-bottom:8px; background:${e.key===this.currentPrefabSection?`#e94560`:`#0f3460`}; color:#ecf0f1;"
    >${e.label}</button>`).join(``),t=this.getAllPrefabSourceObjects(`pickup`),n=this.getAllPrefabSourceObjects(`prop`),r=n.filter(e=>e.subtype===`destructible`),i=n.filter(e=>e.subtype!==`destructible`),a=``;switch(this.currentPrefabSection){case`destructible`:a=`
          ${this.buildDestructiblesTab()}
          <div style="background:#16213e; border-radius:6px; padding:12px; margin-top:12px;">
            <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Руйнівні prefabs з карт</div>
            <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Зміни маси та HP тут застосовуються одразу до ВСІХ однакових об'єктів на всіх картах. Щоб зрушити ящик — збільш масу. Щоб він легше ламався — зменш HP.</div>
            ${this.buildContentPrefabRows(r)||`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">Руйнівні prefabs не знайдено на завантажених картах.</div>`}
          </div>
        `;break;case`collectible`:a=`
          <div style="background:#16213e; border-radius:6px; padding:12px;">
            <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Збираємі prefabs (монети, нітро...)</div>
            <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Налаштовуйте кількість, сабтайп та фізику збираємих об'єктів. Зміни застосовуються глобально за ключем асету.</div>
            ${this.buildContentPrefabRows(t)||`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">Збираємих prefabs не знайдено на завантажених картах.</div>`}
          </div>
        `;break;case`static`:a=`
          <div style="background:#16213e; border-radius:6px; padding:12px;">
            <div style="color:#2980b9; font-size:14px; font-weight:bold; margin-bottom:8px;">▸ Статичні / геймплейні props</div>
            <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Вагони, пандуси, трампліни та інші нерухомі об'єкти. Зміни застосовуються глобально за ключем асету.</div>
            ${this.buildContentPrefabRows(i)||`<div style="padding:10px 12px; border:1px dashed #294f7a; border-radius:6px; color:#95a5a6; font-size:12px;">Статичних prefabs не знайдено на завантажених картах.</div>`}
          </div>
        `;break}return`
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
          <div>
            <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:4px;">Префаби</div>
            <div style="color:#95a5a6; font-size:11px;">Глобальне налаштування за ключем асету. Зміни тут миттєво застосовуються до всіх однакових об'єктів на всіх картах. Для налаштування конкретного екземпляра — використай вкладку «Content».</div>
          </div>
        </div>
        <div>${e}</div>
      </div>
      ${a}
    `}getAllPrefabSourceObjects(e){let t=[];for(let n of Object.values(this.levelContentData.levels))t.push(...e===`pickup`?n.pickups:n.props);return t}buildDifficultyTab(){let e=this.workingData.difficulty,t={enemySpeedMul:`Enemy speed × ⚠️ not wired`,enemyHpMul:`Enemy HP × ⚠️ not wired`,coinRewardMul:`Coin reward ×`,upgradesCostMul:`Upgrade costs ×`,carPricesMul:`Car prices ×`};return`<div style="background:#16213e; border-radius:6px; padding:12px;">
      <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:10px;">Global Multipliers</div>
      <p style="color:#95a5a6; font-size:11px; margin-bottom:12px;">
        These multiply on top of all individual values. 1.0 = no change. 2.0 = double all.
      </p>
      ${Object.entries(e).filter(([e])=>!e.startsWith(`_`)).map(([e,n])=>this.numRow(`difficulty.${e}`,t[e]??e,n,k[e])).join(``)}
    </div>`}buildDamageTab(){let e=this.workingData.damage??JSON.parse(JSON.stringify(p)),t={...p.player,...e.player},n={impulseThreshold:`Мінімальна сума імпульсів кузова за фрейм (Nape units). Менше = чутливіше до ударів. Зіткнення з NPC не рахуються`,impulseScale:`Множник: damage = max(1, round(impulse × scale)). Менше = менший дамаг за той самий удар`,cooldownMs:`Мінімальний час між двома ударами (мс). Захищає від спаму при тривалому контакті`,roofLandingDamageHp:`Плоский дамаг (HP) при приземленні кришею на землю. 0 = вимкнено`,roofLandingVyThreshold:`Мінімальна вертикальна швидкість падіння (px/s) щоб спрацював roof damage`,roofLandingCooldownMs:`Кулдаун між roof landing ударами (мс)`,levelDamagePctPerLevel:`На скільки % дамаг більший на КОЖНОМУ наступному рівні. Складається степенем: 5% → на 24-му рівні ×3.07. Діє на всі джерела дамагу. 0 = вимкнено`},r={impulseThreshold:`Поріг імпульсу (Nape units)`,impulseScale:`Масштаб дамагу (множник)`,cooldownMs:`Кулдаун (мс)`,roofLandingDamageHp:`Дамаг від даху (HP flat)`,roofLandingVyThreshold:`Мін. швидкість падіння (px/s)`,roofLandingCooldownMs:`Кулдаун даху (мс)`,levelDamagePctPerLevel:`Приріст дамагу за рівень (%)`};return`
      <div style="margin-bottom:10px; color:#95a5a6; font-size:11px; line-height:1.5;">
        Дамаг нараховується від зіткнень кузова з terrain/перешкодами.<br>
        NPC-машини виключені (як в оригінальній Flash грі). Колеса не рахуються.<br>
        Формула: <code>damage = max(1, round(totalImpulse × scale))</code> якщо <code>totalImpulse ≥ threshold</code>.
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:10px;">Колізійний дамаг</div>
        ${[`impulseThreshold`,`impulseScale`,`cooldownMs`].map(e=>this.numRow(`damage.player.${e}`,r[e]??e,t[e],n[e])).join(``)}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:10px;">Прогресія по рівнях</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">
          Множник = <code>(1 + %/100) ^ (індекс рівня)</code>, тобто кожен рівень на стільки % небезпечніший за попередній.<br>
          Діє на <b>всі</b> джерела дамагу. Це навмисно: об'єктів, які б'ють гравця, у грі лише 56 і всі на рівнях 1-13 —
          на 17-24 їх нема, тож множник тільки на них не дав би нічого.
        </div>
        ${this.numRow(`damage.player.levelDamagePctPerLevel`,r.levelDamagePctPerLevel,t.levelDamagePctPerLevel??0,n.levelDamagePctPerLevel)}
        <div style="color:#7f8c8d; font-size:11px; margin-top:8px;">
          При 5%: рівень 1 — ×1.00 · рівень 8 — ×1.41 · рівень 16 — ×2.08 · рівень 24 — ×3.07
        </div>
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:10px;">Приземлення кришею</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Спрацьовує коли гравець перевернутий (кут &gt;90°) і падає з достатньою швидкістю.</div>
        ${[`roofLandingDamageHp`,`roofLandingVyThreshold`,`roofLandingCooldownMs`].map(e=>this.numRow(`damage.player.${e}`,r[e]??e,t[e]??0,n[e])).join(``)}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:10px;">Наїзд на машинки</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">
          Припарковані машинки — статичні коробки, тому солвер підкидає гравця вгору незалежно від його ваги.
          Ці три значення замінюють ту реакцію на керовану: удар коштує швидкості, а не висоти.
        </div>
        ${this.numRow(`physics.crushMaxUpSpeed`,`Стеля підкидання (px/s)`,this.workingData.physics?.crushMaxUpSpeed??150,`Максимальна швидкість УГОРУ одразу після роздавленої машинки. Це стеля, а не обнулення: якщо гравець уже летів з трампліна, стрибок лишається. Менше = менше підстрибує. 0 = взагалі не підкидає.`)}
        ${this.numRow(`physics.crushSpeedPenalty`,`Втрата швидкості за машинку (0-1)`,this.workingData.physics?.crushSpeedPenalty??.08,`Скільки горизонтальної швидкості коштує одна роздавлена машинка (0.08 = 8%). Складається: за 3 машинки в одному кадрі знімається тричі. Це заміна гальмуванню, яке раніше давав удар.`)}
        ${this.numRow(`physics.crushMaxSpin`,`Стеля обертання (rad/s)`,this.workingData.physics?.crushMaxSpin??2.5,`Максимальна кутова швидкість кузова після наїзду. Той самий удар не тільки підкидає, а й задирає ніс — це його обмежує. Менше = машина стабільніша.`)}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:10px;">Підкидання на уступах (загальне)</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">
          Те саме, що вище, але <b>не лише від роздавлених машинок</b> — від будь-чого.<br>
          Прокачка не змінює ні масу, ні радіус коліс, ні підвіску; вона додає швидкості
          (<code>maxSpeed</code> 1800→2600), а підкидання на уступі лінійне по швидкості. Звідси
          «прокачані машини стрибучі».<br>
          Обмежується <b>приріст за один кадр</b>, а не загальна висота: трамплін розганяє поступово
          й нічого не помітить, уступ віддає все за один кадр.
        </div>
        ${this.numRow(`physics.maxLaunchGainPerFrame`,`Стеля приросту вгору за кадр (px/s)`,this.workingData.physics?.maxLaunchGainPerFrame??0,`0 = вимкнено (за замовчуванням). Пробуй 700-900: звичайний стрибок з трампліна набирає швидкість за багато кадрів і не зачепиться, а колесо, що чіпляє уступ, віддає все одразу. Менше = менше підкидає скрізь, включно з дрібними нерівностями.`)}
      </div>
    `}buildNpcFlipsTab(){let e=this.workingData.npcFlips??{flipProbability:.6,flipCooldownMs:2e3,flipHeightFactorMin:1.2,flipHeightFactorMax:1.5,flipTiltPower:3,flipFullRotationDeg:331},t={flipProbability:`Ймовірність флипу при кожній спробі (0.0–1.0). 0.6 = 60% шанс флипу.`,flipCooldownMs:`Мінімальний час між флипами в мілісекундах. 2000 мс = 2 секунди між спробами.`,flipHeightFactorMin:`Мінімальна висота НАД ДОРОГОЮ, на якій NPC має бути, щоб почати флип (множник висоти кузова). Нижче — флип не дозволяється. 1.0 = одна висота кузова над дорогою.`,flipHeightFactorMax:`(не використовується) Колишня верхня межа висоти для флипу.`,flipTiltPower:`Сила обертання під час флипу (множник крутного моменту). Більше = швидший флип. 1 = як гравець без підсилення, 3 = типове значення.`,flipFullRotationDeg:`Накопичений оберт у градусах, після якого флип вважається виконаним і NPC перестає крутити. Кламп 90–360. 331 = майже повний оберт (історичний дефолт).`};return`<div style="background:#16213e; border-radius:6px; padding:12px;">
      <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">NPC Flips Tuning</div>
      <div style="color:#95a5a6; font-size:11px; margin-bottom:14px; line-height:1.4;">
        Керування частотою і стилем флипів NPC. Вероятностная модель з кулдауном робить поведінку природнішою.
      </div>
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="color:#ecf0f1; font-size:13px; font-weight:bold; margin-bottom:6px;">Flip Probability</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">${t.flipProbability}</div>
        ${this.numRow(`npcFlips.flipProbability`,`Ймовірність`,e.flipProbability,`0.0 - 1.0`)}
      </div>
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="color:#ecf0f1; font-size:13px; font-weight:bold; margin-bottom:6px;">Flip Cooldown</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">${t.flipCooldownMs}</div>
        ${this.numRow(`npcFlips.flipCooldownMs`,`Кулдаун (мс)`,e.flipCooldownMs,`мілісекунди`)}
      </div>
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="color:#ecf0f1; font-size:13px; font-weight:bold; margin-bottom:6px;">Height Range for Flips</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Діапазон висот, в якому дозволені флипи (як множник розміру машини).</div>
        ${this.numRow(`npcFlips.flipHeightFactorMin`,`Мінімальна висота`,e.flipHeightFactorMin,`множник розміру`)}
        ${this.numRow(`npcFlips.flipHeightFactorMax`,`Максимальна висота`,e.flipHeightFactorMax,`множник розміру`)}
      </div>
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="color:#ecf0f1; font-size:13px; font-weight:bold; margin-bottom:6px;">Flip Speed</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">${t.flipTiltPower}</div>
        ${this.numRow(`npcFlips.flipTiltPower`,`Сила обертання`,e.flipTiltPower??3,`множник моменту`)}
      </div>
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="color:#ecf0f1; font-size:13px; font-weight:bold; margin-bottom:6px;">Flip Completion Angle</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">${t.flipFullRotationDeg}</div>
        ${this.numRow(`npcFlips.flipFullRotationDeg`,`Кут зарахування (°)`,e.flipFullRotationDeg??331,`градуси, 90–360`)}
      </div>
    </div>`}buildAchievementsTab(){let e=this.workingData.achievements??d;return`<div style="background:#16213e; border-radius:6px; padding:12px;">
      <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">Achievement tuning</div>
      <div style="color:#95a5a6; font-size:11px; margin-bottom:12px;">
        Налаштування порогів та нагород за кожен tier. Ці значення використовуються рантаймом і входять у export/import balance.json.
      </div>
      ${o.map(t=>{let r=i[t]===`decreasing`?`decreasing (lower is better)`:`increasing (higher is better)`,o=e[t]??d[t],s=Array.isArray(o.thresholds)?o.thresholds:d[t].thresholds,c=Array.isArray(o.rewards)?o.rewards:d[t].rewards;return`
        <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px;">
            <div style="flex:1;">
              <div style="color:#ecf0f1; font-size:13px; font-weight:bold;">${this.escapeHtml(n[t])}</div>
              <div style="color:#95a5a6; font-size:11px; margin-top:4px; line-height:1.4;">${this.escapeHtml(a[t])}</div>
              <div style="color:#4a7499; font-size:11px; margin-top:6px;">key: ${this.escapeHtml(t)} • mode: ${this.escapeHtml(r)}</div>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap:10px;">
            <div style="background:#101f33; border:1px solid #294f7a; border-radius:6px; padding:8px;">
              <div style="color:#95a5a6; font-size:11px; margin-bottom:6px;">Thresholds (tier 1 → tier 3)</div>
              ${this.numRow(`achievements.${t}.thresholds.0`,`Tier 1`,s[0])}
              ${this.numRow(`achievements.${t}.thresholds.1`,`Tier 2`,s[1])}
              ${this.numRow(`achievements.${t}.thresholds.2`,`Tier 3`,s[2])}
            </div>
            <div style="background:#101f33; border:1px solid #294f7a; border-radius:6px; padding:8px;">
              <div style="color:#95a5a6; font-size:11px; margin-bottom:6px;">Rewards (coins)</div>
              ${this.numRow(`achievements.${t}.rewards.0`,`Tier 1`,c[0])}
              ${this.numRow(`achievements.${t}.rewards.1`,`Tier 2`,c[1])}
              ${this.numRow(`achievements.${t}.rewards.2`,`Tier 3`,c[2])}
            </div>
          </div>
        </div>
      `}).join(``)}
    </div>`}buildBoostersTab(){let e=this.workingData.boosters??{};return`<div style="background:#16213e; border-radius:6px; padding:12px;">
      <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:6px;">Бустери (Pre-Race Shop)</div>
      <p style="color:#95a5a6; font-size:11px; margin-bottom:14px;">
        Куплені перед заїздом, діють увесь заїзд. Монети знімаються при покупці; повертаються при натисканні «Назад».
      </p>
      ${[{id:`double_health`,label:`Double Health`,desc:`Вдвічі збільшує максимальне HP гравця на весь заїзд`},{id:`double_nitro`,label:`Double Nitro`,desc:`Вдвічі збільшує максимальний запас нітро на весь заїзд`},{id:`coin_magnet`,label:`Coin Magnet`,desc:`Авто-збирання монет протягом усього заїзду (без під'їзду)`}].map(({id:t,label:n,desc:r})=>{let i=Number(e[t]?.price??0);return`
        <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div>
              <div style="color:#ecf0f1; font-size:13px; font-weight:bold;">${this.escapeHtml(n)}</div>
              <div style="color:#4a7499; font-size:11px; margin-top:3px;">${this.escapeHtml(r)}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              <label style="color:#95a5a6; font-size:12px;">Ціна (монети):</label>
              <input
                data-path="boosters.${t}.price"
                data-value-type="number"
                type="number"
                step="1"
                min="0"
                value="${i}"
                style="width:80px; padding:3px 6px; background:#16213e; color:#ecf0f1;
                       border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:13px;"
              >
            </div>
          </div>
        </div>
      `}).join(``)}
    </div>`}buildRewardsTab(){let e=this.workingData.rewards??{},t=g.every(e=>!!this.levelContentData.levels[e.key]);t||this.ensureAllContentLevelsLoaded();let n=this.getAllPrefabSourceObjects(`prop`).filter(e=>e.subtype===`destructible`),r=new Map;for(let e of n)!e.asset||r.has(e.asset)||r.set(e.asset,{mass:e.mass??0,hp:e.hp??10});let i=new Set(r.keys()),a=e.destructibleItems??[],o=t?a.filter(e=>{let t=String(e?.assetKey??``).trim();return t&&i.has(t)}):a,s=o.map(e=>{let t=a.indexOf(e),n=String(e?.assetKey??``).trim(),i=String(e?.displayName??n??`Item ${t+1}`),o=`rewards.destructibleItems.${t}.price`,s=o.replace(/\./g,`__`),c=Number.isFinite(Number(e?.price))?Number(e.price):1,l=this.resolveDestructiblePreviewUrl(n||`missing`),u=r.get(n),d=e.mass===void 0?u?.mass??0:e.mass,f=e.hp===void 0?u?.hp??10:e.hp,p=e.mass!==void 0,m=e.hp!==void 0;return`
          <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:8px; padding:10px; margin-bottom:8px; display:flex; gap:10px; align-items:flex-start;">
            <img src="${this.escapeHtml(l)}" alt="${this.escapeHtml(n||`destructible-${t}`)}" style="width:48px; height:48px; object-fit:contain; border-radius:6px; background:#08111d; border:1px solid #294f7a; padding:3px; flex:0 0 48px; margin-top:2px;">
            <div style="min-width:0; flex:1;">
              <div style="color:#ecf0f1; font-size:12px; font-weight:bold; margin-bottom:2px;">${this.escapeHtml(i)}</div>
              <div style="color:#4a7499; font-size:10px; margin-bottom:8px;">${this.escapeHtml(n||`(empty assetKey)`)}</div>
              <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:5px;">
                  <label style="color:#95a5a6; font-size:11px;" title="Монет за знищення об'єкта">💰 Монет:</label>
                  <input
                    id="be-${s}"
                    data-path="${o}"
                    data-value-type="number"
                    type="number"
                    step="1"
                    min="0"
                    value="${c}"
                    style="width:64px; padding:3px 5px; background:#0d1b2a; color:#ecf0f1; border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
                  >
                </div>
                <div style="display:flex; align-items:center; gap:5px;">
                  <label style="color:#95a5a6; font-size:11px;" title="Маса об'єкта. Порожньо = з карти. Більше — важче зрушити машину. Застосовується глобально.">⚖️ Маса${p?` ✎`:``}:</label>
                  <input
                    data-path="rewards.destructibleItems.${t}.mass"
                    data-allow-empty="true"
                    data-value-type="number"
                    type="number"
                    step="0.1"
                    min="0"
                    value="${p?d:``}"
                    placeholder="${u?.mass??0}"
                    style="width:64px; padding:3px 5px; background:#0d1b2a; color:${p?`#f0c040`:`#ecf0f1`}; border:1px solid ${p?`#f0c040`:`#2980b9`}; border-radius:3px; font-family:monospace; font-size:12px;"
                  >
                </div>
                <div style="display:flex; align-items:center; gap:5px;">
                  <label style="color:#95a5a6; font-size:11px;" title="Міцність до руйнування. Порожньо = з карти. Менше — ламається легше. Застосовується глобально.">❤️ HP${m?` ✎`:``}:</label>
                  <input
                    data-path="rewards.destructibleItems.${t}.hp"
                    data-allow-empty="true"
                    data-value-type="number"
                    type="number"
                    step="1"
                    min="0"
                    value="${m?f:``}"
                    placeholder="${u?.hp??10}"
                    style="width:64px; padding:3px 5px; background:#0d1b2a; color:${m?`#f0c040`:`#ecf0f1`}; border:1px solid ${m?`#f0c040`:`#2980b9`}; border-radius:3px; font-family:monospace; font-size:12px;"
                  >
                </div>
                ${p||m?`
                <button
                  type="button"
                  data-action="reset-prefab-physics"
                  data-prefab-kind="prop"
                  data-prefab-asset="${this.escapeHtml(n)}"
                  data-destructible-index="${t}"
                  style="${this.btnStyle(`#5a3a1a`)}; padding:3px 8px; font-size:11px;"
                  title="Скинути Масу та HP до значень з карти"
                >↺ Скинути</button>`:``}
              </div>
            </div>
          </div>
        `}).join(``),c=t?`<div style="color:#4a7499; font-size:11px; margin-bottom:10px;">Показані об'єкти з поточних карт: ${o.length}. Значення з карти — білим, змінені — <span style="color:#f0c040;">жовтим ✎</span>. Щоб скинути — натисніть ↺.</div>`:`<div style="color:#4a7499; font-size:11px; margin-bottom:10px;">Завантаження карт... Показані всі ${a.length} об'єктів.</div>`;return`
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:8px;">Нагороди</div>
        <div style="color:#95a5a6; font-size:11px; margin-bottom:12px;">Монети та фізика для кожного типу об'єкта. Зміни маси та HP застосовуються глобально до всіх однакових об'єктів на всіх картах.</div>
        ${this.numRow(`rewards.coinPerPickup`,`Монет за монетку (pickup)`,e.coinPerPickup??5)}
        ${this.numRow(`rewards.nitroFlipPercent`,`Нітро з фліпу (% від макс)`,e.nitroFlipPercent??20)}
        ${this.numRow(`rewards.coinPerFlip`,`Монет за фліп`,e.coinPerFlip??5)}
        ${this.numRow(`rewards.minFlipAngleDeg`,`Мінімальний кут фліпу гравця (°)`,e.minFlipAngleDeg??300,`90–360; 360 = повний оберт, 300 = зараховувати недокручений фліп`)}
        ${this.numRow(`rewards.minFlipLandingAngleDeg`,`Кут фліпу при приземленні на колеса (°)`,e.minFlipLandingAngleDeg??180,`45–360; недокручений фліп зараховується, якщо сів на колеса (не корпусом) з таким обертом`)}
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px;">
        <div style="color:#e94560; font-size:14px; font-weight:bold; margin-bottom:6px;">Руйнівні об'єкти</div>
        <div style="color:#7f8c8d; font-size:11px; margin-bottom:8px;">Маса 0 (порожньо) = движок призначає сам (~0.1–2 залежно від розміру). Щоб ящики гальмували машину — поставте mass 3–5. Щоб легше ламалися — зменшіть HP.</div>
        ${c}
        ${s||`<div style="color:#95a5a6; font-size:12px;">Об'єктів не знайдено на картах.</div>`}
      </div>
    `}buildDestructiblesTab(){let e=(this.workingData.rewards??{}).destructibleItems??[];return`
      <div style="background:#16213e; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px;">
          <div>
            <div style="color:#e94560; font-size:15px; font-weight:bold; margin-bottom:4px;">Редактор FX руйнування</div>
            <div style="color:#95a5a6; font-size:11px;">Вибухи, уламки, анімації розпаду. Маса і HP — у вкладці Rewards або у «Руйнівні prefabs» нижче.</div>
          </div>
          ${`<button type="button" data-action="add-destructible" style="${this.btnStyle(`#0f3460`)} ; padding:6px 10px; font-size:11px;">＋ ADD ITEM</button>`}
        </div>
        <div style="color:#95a5a6; font-size:11px;">Монети за знищення — у вкладці «Rewards».</div>
      </div>
      <div style="background:#16213e; border-radius:6px; padding:12px;">
        ${e.map((e,t)=>this.buildDestructibleItemCard(e,t)).join(``)||`<div style="color:#95a5a6; font-size:12px;">No destructible items configured yet.</div>`}
      </div>
    `}buildDestructibleItemCard(e,t){let n=String(e?.assetKey??``).trim(),r=this.resolveDestructiblePreviewUrl(n||`missing`),i=n||`destructible-${t}`,a=this.escapeHtml(n||`Item ${t+1}`),o=String(e?.displayName??n??``),s=String(e?.wreckTexture??``),c=String(e?.debrisSpawnMode??`burst`),l=Array.isArray(e?.explosionFrames)?e.explosionFrames:[],u=Array.isArray(e?.secondaryExplosionFrames)?e.secondaryExplosionFrames:[],d=Array.isArray(e?.debrisList)?e.debrisList:[],f=e?.dissolveBurst&&typeof e.dissolveBurst==`object`?e.dissolveBurst:{},p=e?.particles&&typeof e.particles==`object`?e.particles:{},m=typeof e?.damageHp==`number`?e.damageHp:15;return`
      <div style="background:#0d1b2a; border:1px solid #294f7a; border-radius:10px; padding:12px; margin-bottom:12px;">
        <div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:10px;">
          <img src="${this.escapeHtml(r)}" alt="${this.escapeHtml(i)}" style="width:72px; height:72px; object-fit:contain; flex:0 0 72px; background:#08111d; border:1px solid #294f7a; border-radius:8px; padding:4px;">
          <div style="min-width:0; flex:1;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px;">
              <div style="color:#e94560; font-size:13px; font-weight:bold; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${a}</div>
              <button type="button" data-action="remove-destructible" data-index="${t}" style="${this.btnStyle(`#8b1a1a`)}; padding:4px 8px; font-size:11px;">REMOVE</button>
            </div>
            <div style="color:#95a5a6; font-size:11px; margin-bottom:8px;">Asset key: ${this.escapeHtml(n||`(empty)`)}</div>
            ${this.textRow(`rewards.destructibleItems.${t}.assetKey`,`assetKey`,n)}
            ${this.textRow(`rewards.destructibleItems.${t}.displayName`,`displayName`,o)}
            ${this.textRow(`rewards.destructibleItems.${t}.wreckTexture`,`wreckTexture`,s)}
            ${this.numRow(`rewards.destructibleItems.${t}.damageHp`,`damageHp (flat HP dealt on hit)`,m)}
            ${this.selectRow(`rewards.destructibleItems.${t}.debrisSpawnMode`,`debrisSpawnMode`,c,[`burst`,`lineFromLeft`])}
            ${this.buildDestructibleFrameListEditor(t,`explosionFrames`,`explosionFrames`,l)}
            ${this.buildDestructibleFrameListEditor(t,`secondaryExplosionFrames`,`secondaryExplosionFrames`,u)}
            ${this.buildDestructibleDebrisListEditor(t,d)}
            ${this.buildDestructibleDissolveBurstEditor(t,f)}
            ${this.buildDestructibleParticlesEditor(t,p)}
          </div>
        </div>
      </div>
    `}buildDestructibleFrameListEditor(e,t,n,r){let i=r.length?r.map((n,r)=>`
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:6px;">
            <input
              data-path="rewards.destructibleItems.${e}.${t}.${r}"
              data-value-type="string"
              type="text"
              value="${this.escapeHtml(n)}"
              style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1; border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
            >
            <button type="button" data-action="remove-destructible-frame" data-index="${e}" data-list="${t}" data-frame-index="${r}" style="${this.btnStyle(`#8b1a1a`)}; padding:4px 8px; font-size:11px;">REMOVE</button>
          </div>
        `).join(``):`<div style="color:#95a5a6; font-size:11px; margin-bottom:6px;">No frames yet.</div>`;return`
      <div style="background:#101f33; border:1px solid #294f7a; border-radius:8px; padding:10px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;">
          <div style="color:#95a5a6; font-size:12px;">${this.escapeHtml(n)}</div>
          <button type="button" data-action="add-destructible-frame" data-index="${e}" data-list="${t}" style="${this.btnStyle(`#0f3460`)}; padding:4px 8px; font-size:11px;">＋ ADD FRAME</button>
        </div>
        ${i}
      </div>
    `}buildDestructibleDebrisListEditor(e,t){let n=t.length?t.map((t,n)=>this.buildDestructibleDebrisItemCard(e,n,t)).join(``):`<div style="color:#95a5a6; font-size:11px; margin-bottom:6px;">No debris pieces yet.</div>`;return`
      <div style="background:#101f33; border:1px solid #294f7a; border-radius:8px; padding:10px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;">
          <div style="color:#95a5a6; font-size:12px;">debrisList</div>
          <button type="button" data-action="add-destructible-debris" data-index="${e}" style="${this.btnStyle(`#0f3460`)}; padding:4px 8px; font-size:11px;">＋ ADD DEBRIS</button>
        </div>
        ${n}
      </div>
    `}buildDestructibleDebrisItemCard(e,t,n){let r=`rewards.destructibleItems.${e}.debrisList.${t}`;return`
      <div style="background:#0d1b2a; border-radius:6px; padding:10px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px;">
          <div style="color:#e94560; font-size:12px; font-weight:bold;">Debris #${t+1}</div>
          <button type="button" data-action="remove-destructible-debris" data-index="${e}" data-debris-index="${t}" style="${this.btnStyle(`#8b1a1a`)}; padding:4px 8px; font-size:11px;">REMOVE</button>
        </div>
        ${this.textRow(`${r}.key`,`key`,String(n.key??``))}
        ${this.numRow(`${r}.count`,`count`,Number(n.count??1))}
        ${this.numRow(`${r}.scaleMin`,`scaleMin`,Number(n.scaleMin??0))}
        ${this.numRow(`${r}.scaleMax`,`scaleMax`,Number(n.scaleMax??0))}
        ${this.numRow(`${r}.spawnOffsetX`,`spawnOffsetX`,Number(n.spawnOffsetX??0))}
        ${this.numRow(`${r}.spawnOffsetY`,`spawnOffsetY`,Number(n.spawnOffsetY??0))}
        ${this.boolSelectRow(`${r}.disableImpulse`,`disableImpulse`,!!n.disableImpulse)}
      </div>
    `}buildDestructibleDissolveBurstEditor(e,t){let n=`rewards.destructibleItems.${e}.dissolveBurst`;return`
      <div style="background:#101f33; border:1px solid #294f7a; border-radius:8px; padding:10px; margin-bottom:8px;">
        <div style="color:#95a5a6; font-size:12px; margin-bottom:8px;">dissolveBurst</div>
        ${this.textRow(`${n}.key`,`key`,String(t.key??``))}
        ${this.numRow(`${n}.count`,`count`,Number(t.count??0))}
        ${this.numRow(`${n}.speedMin`,`speedMin`,Number(t.speedMin??0))}
        ${this.numRow(`${n}.speedMax`,`speedMax`,Number(t.speedMax??0))}
        ${this.numRow(`${n}.scaleMin`,`scaleMin`,Number(t.scaleMin??0))}
        ${this.numRow(`${n}.scaleMax`,`scaleMax`,Number(t.scaleMax??0))}
        ${this.numRow(`${n}.durationMin`,`durationMin`,Number(t.durationMin??0))}
        ${this.numRow(`${n}.durationMax`,`durationMax`,Number(t.durationMax??0))}
      </div>
    `}buildDestructibleParticlesEditor(e,t){let n=`rewards.destructibleItems.${e}.particles`;return`
      <div style="background:#101f33; border:1px solid #294f7a; border-radius:8px; padding:10px; margin-bottom:8px;">
        <div style="color:#95a5a6; font-size:12px; margin-bottom:8px;">particles</div>
        ${this.textRow(`${n}.key`,`key`,String(t.key??``))}
        ${this.numRow(`${n}.count`,`count`,Number(t.count??0))}
        ${this.numRow(`${n}.scaleMin`,`scaleMin`,Number(t.scaleMin??0))}
        ${this.numRow(`${n}.scaleMax`,`scaleMax`,Number(t.scaleMax??0))}
      </div>
    `}buildContentValidationPanel(e,t){if(!e.length&&!t.length)return`<div style="background:#1a3a22; border:1px solid #2f8a4a; border-radius:6px; padding:10px; margin-bottom:12px; color:#b8f5c9; font-size:12px;">Validation: no blocking issues.</div>`;let n=e.map(e=>`<div>• ${this.escapeHtml(e)}</div>`).join(``),r=t.map(e=>`<div>• ${this.escapeHtml(e)}</div>`).join(``);return`
      <div style="background:#3f1f1f; border:1px solid #a34a4a; border-radius:6px; padding:10px; margin-bottom:12px; color:#ffd9d9; font-size:12px;">
        <div style="font-weight:bold; margin-bottom:6px;">Validation gate</div>
        ${e.length?`<div style="margin-bottom:8px;"><div style="font-weight:bold; color:#ffb5b5; margin-bottom:4px;">Errors (block apply/export):</div>${n}</div>`:``}
        ${t.length?`<div><div style="font-weight:bold; color:#ffe7b3; margin-bottom:4px;">Warnings:</div>${r}</div>`:``}
      </div>
    `}numRow(e,t,n,r){let i=e.replace(/\./g,`__`),a=typeof n==`number`&&!Number.isInteger(n)?`0.01`:`1`;return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${r?`<div style="flex:0 0 220px;">
           <span style="color:#95a5a6; font-size:12px;">${t}</span>
           <span style="display:block; font-size:10px; color:#4a7499; margin-top:1px; line-height:1.35;">${r}</span>
         </div>`:`<label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${t}</label>`}
      <input
        id="be-${i}"
        data-path="${e}"
        data-value-type="number"
        type="number"
        step="${a}"
        value="${n??0}"
        style="width:100px; padding:3px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >
    </div>`}numRowOptional(e,t,n,r,i){let a=e.replace(/\./g,`__`),o=typeof r==`number`&&!Number.isInteger(r)?`0.01`:`1`;return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${i?`<div style="flex:0 0 220px;">
           <span style="color:#95a5a6; font-size:12px;">${t}</span>
           <span style="display:block; font-size:10px; color:#4a7499; margin-top:1px; line-height:1.35;">${i}</span>
         </div>`:`<label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${t}</label>`}
      <input
        id="be-${a}"
        data-path="${e}"
        data-value-type="number"
        data-allow-empty="true"
        type="number"
        step="${o}"
        value="${n===void 0?``:n}"
        placeholder="${r}"
        style="width:100px; padding:3px 6px; background:#0d1b2a; color:${n===void 0?`#95a5a6`:`#ecf0f1`};
               border:1px solid ${n===void 0?`#294f7a`:`#2980b9`}; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >
    </div>`}contentNumRow(e,t,n){return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${t}</label>
      <input
        id="be-${`content-${e.replace(/\./g,`__`)}`}"
        data-scope="levelContent"
        data-path="${e}"
        data-value-type="number"
        type="number"
        step="${typeof n==`number`&&!Number.isInteger(n)?`0.01`:`1`}"
        value="${n??0}"
        style="width:100px; padding:3px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
    </div>`}contentBoolRow(e,t,n){return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${t}</label>
      <input
        id="be-${`content-${e.replace(/\./g,`__`)}`}"
        data-scope="levelContent"
        data-path="${e}"
        data-value-type="number"
        type="number"
        step="1"
        value="${n?1:0}"
        style="width:100px; padding:3px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
    </div>`}contentEnemySelectRow(e,t,n){let r=`content-${e.replace(/\./g,`__`)}`;return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 90px; color:#95a5a6; font-size:12px;">${this.escapeHtml(t)}</label>
      <select
        id="be-${r}"
        data-scope="levelContent"
        data-path="${e}"
        data-value-type="string"
        data-input-kind="enemy-key"
        style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >${this.buildEnemyKeyOptions(n)}</select>
    </div>`}contentEnemySpawnCoordRow(e,t,n){let r=`content-${e.replace(/\./g,`__`)}`,i=typeof n==`number`&&!Number.isInteger(n)?`0.01`:`1`;return`<div style="display:flex; align-items:center; gap:4px; margin-bottom:2px; min-width:0; flex:1;">
      <label style="flex:0 0 14px; color:#95a5a6; font-size:12px; font-weight:bold;">${this.escapeHtml(t)}</label>
      <input
        id="be-${r}"
        data-scope="levelContent"
        data-path="${e}"
        data-value-type="number"
        type="number"
        step="${i}"
        value="${n??0}"
        style="flex:1 1 0; min-width:0; width:100%; padding:3px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
    </div>`}buildEnemyKeyOptions(e){return r.map(t=>{let n=this.getEnemyDisplayName(t),r=n===t?t:`${n} (${t})`,i=t===e?` selected`:``;return`<option value="${this.escapeHtml(t)}"${i}>${this.escapeHtml(r)}</option>`}).join(``)}contentEnemyKeyRow(e,t,n,r,i,a){let o=this.getEnemyDisplayName(t),s=`levels.${e}.enemySpawnPoints.${n}`,c=[``,`npc1`,`npc2`,`npc3`,`npc4`,`npc5`,`npc6`].map(e=>`<option value="${e}"${e===a?` selected`:``}>${e===``?`— X вручну —`:e}</option>`).join(``),l=!!a,u=this.workingData.levels[e]?.enemyAiOverrides?.[n]??{},d=`levels.${e}.enemyAiOverrides.${n}`,f=this.buildEnemyAiOverrideSection(d,u,t);return`<div style="background:#0d1b2a; border-radius:6px; padding:10px; display:flex; gap:10px; align-items:center;">
      ${this.getEnemyPreviewHtml(t,72)}
      <div style="flex:1; min-width:0;">
        <div style="color:#e94560; font-size:12px; font-weight:bold; margin-bottom:6px;">${this.escapeHtml(o)}</div>
        ${this.contentEnemySelectRow(`levels.${e}.enemyKeys.${n}`,`Enemy ${n+1}`,t)}
        <div style="display:flex; align-items:center; margin-bottom:4px; gap:8px;">
          <label style="flex:0 0 90px; color:#95a5a6; font-size:12px;">Spawn point</label>
          <select
            data-scope="levelContent"
            data-path="${s}"
            data-value-type="string"
            style="flex:1; padding:3px 6px; background:#0d1b2a; color:#ecf0f1; border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
          >${c}</select>
        </div>
        <div style="color:#7f8c8d; font-size:10px; margin-bottom:5px;">
          Spawn point — об'єкт з Tiled (player, npc1, npc2…). Якщо вибрано — X і Y нижче ігноруються, а машина ставиться відносно цієї точки за своїми колесами без raycast.
        </div>
        <div style="${l?`opacity:0.35; pointer-events:none;`:``}display:flex; gap:6px;">
          ${this.contentEnemySpawnCoordRow(`levels.${e}.enemySpawnXs.${n}`,`X`,r)}
          ${this.contentEnemySpawnCoordRow(`levels.${e}.enemySpawnYs.${n}`,`Y`,i)}
        </div>
        <div style="color:#7f8c8d; font-size:10px; margin-top:2px; margin-bottom:4px;">
          X — world pixels (якщо spawn point не задано). Y — offset від спавну гравця в поінтах (1 pt = 50 px); <b>0 = авто/raycast</b>.
        </div>
        ${f}
        <div style="display:flex; justify-content:flex-end; margin-top:6px;">
          <button
            type="button"
            data-action="content-remove-enemy"
            data-level-key="${this.escapeHtml(e)}"
            data-enemy-index="${n}"
            style="${this.btnStyle(`#8b1a1a`)}; padding:4px 8px; font-size:11px;"
          >REMOVE</button>
        </div>
      </div>
    </div>`}buildEnemyAiOverrideSection(e,t,n){let r=this.normalizeNpcAiBalance(this.workingData.npcAi),i=this.workingData.enemies?.[n]?.ai??{},a={...r,...i},o=[{key:`maxSpeed`,label:`Max speed`},{key:`enginePower`,label:`Engine power`},{key:`mass`,label:`Mass`},{key:`enableNitro`,label:`Enable nitro`},{key:`enableFlip`,label:`Enable flip`},{key:`nitroPower`,label:`Nitro power`}],s=!1,c=o.map(({key:n,label:r})=>{let i=t[n],o=typeof a[n]==`boolean`,c=i===void 0?0:typeof i==`boolean`?i?1:0:i,l=c!==0;l&&(s=!0);let u=l?String(c):``,d=o?a[n]?1:0:a[n];return`<div style="display:flex; align-items:center; margin-bottom:4px; gap:6px;">
        <label style="flex:0 0 90px; color:#95a5a6; font-size:11px;">${r}</label>
        <input
          id="be-${`${e}.${n}`.replace(/\./g,`__`)}"
          data-path="${e}.${n}"
          data-value-type="number"
          data-seed-from-placeholder="1"
          type="number"
          step="1"
          min="0"
          value="${u}"
          placeholder="${d}"
          style="width:72px; padding:2px 5px; background:#0a1520; color:#ecf0f1; border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:11px;"
        >
      </div>`}).join(``);return`<details style="margin-top:6px; margin-bottom:2px;">
      <summary style="cursor:pointer; color:#7f8c8d; font-size:11px; user-select:none;">▸ AI Override${s?` <span style="color:#f39c12; font-size:10px;">●</span>`:``}</summary>
      <div style="margin-top:6px; padding:6px 8px; background:#061018; border-radius:4px; border-left:2px solid #1a4060;">
        <div style="color:#4a7499; font-size:10px; margin-bottom:6px;">Per-level AI для цього слоту. Порожнє = дефолт з AI меню. 0 = inherit.</div>
        ${c}
      </div>
    </details>`}contentObjectRow(e,t,n,r){let i=`levels.${e}.${t}.${r}`,a=`${n.kind.toUpperCase()} #${n.id}`,o=[this.contentTextRow(`${i}.subtype`,`subtype`,n.subtype),this.contentTextRow(`${i}.material`,`material`,n.material??``),this.contentTextRow(`${i}.bodyType`,`bodyType`,n.bodyType??``),this.contentTextRow(`${i}.collider`,`collider`,n.collider??``),this.contentNumRow(`${i}.mass`,`mass`,n.mass??0),this.contentTextRow(`${i}.drop`,`drop`,n.drop??``),this.contentNumRow(`${i}.dropAmount`,`dropAmount`,n.dropAmount??0),this.contentTextRow(`${i}.layer`,`layer`,n.layer??``),this.contentTextRow(`${i}.tileMode`,`tileMode`,n.tileMode??``),this.contentBoolRow(`${i}.isCollider`,`isCollider`,n.isCollider??!1),this.contentBoolRow(`${i}.isSensor`,`isSensor`,n.isSensor??!1)].join(``),s=n.kind===`pickup`?`${this.contentNumRow(`${i}.amount`,`amount`,n.amount??0)}${o}`:[this.contentNumRow(`${i}.hp`,`hp`,n.hp??0),o].join(``);return`
      <div style="background:#0d1b2a; border-radius:6px; padding:10px; margin-bottom:8px;">
        <div style="color:#e94560; font-size:13px; font-weight:bold; margin-bottom:6px;">${this.escapeHtml(a)} — ${this.escapeHtml(n.name)}</div>
        <div style="color:#7f8c8d; font-size:10px; margin-bottom:8px;">Asset group: <b>${this.escapeHtml(n.asset||`(empty asset)`)}</b>. Shared prefab edits happen in the Prefabs tab; fields changed here become local overrides for this placement only.</div>
        ${this.contentTextRow(`${i}.name`,`name`,n.name)}
        ${this.contentTextRow(`${i}.asset`,`asset`,n.asset)}
        ${this.contentTextRow(`${i}.type`,`type`,n.type)}
        ${this.contentNumRow(`${i}.x`,`x`,n.x)}
        ${this.contentNumRow(`${i}.y`,`y`,n.y)}
        ${this.contentNumRow(`${i}.width`,`width`,n.width)}
        ${this.contentNumRow(`${i}.height`,`height`,n.height)}
        ${s}
      </div>
    `}buildContentPrefabRows(e){let t=new Map;for(let n of e){let e=String(n.asset??``).trim();if(!e)continue;let r=t.get(e);r?r.placements+=1:t.set(e,{asset:e,kind:n.kind,subtype:n.subtype,sample:n,placements:1})}return[...t.entries()].sort(([e],[t])=>e.localeCompare(t)).map(([,e])=>this.contentPrefabCard(e)).join(``)}contentPrefabCard(e){let{kind:t,asset:n,sample:r,placements:i}=e,a=this.getLevelContentPrefab(t,n),o=e=>a?.[e]??r[e],s=this.resolveDestructiblePreviewUrl(n),c=Number(o(`width`)??r.width??1),l=Number(o(`height`)??r.height??1),u=this.getKnownPrefabStringOptions(t,`subtype`,String(o(`subtype`)??r.subtype)),d=this.getKnownPrefabStringOptions(t,`material`,String(o(`material`)??``)),f=this.getKnownPrefabStringOptions(t,`bodyType`,String(o(`bodyType`)??``)),p=this.getKnownPrefabStringOptions(t,`collider`,String(o(`collider`)??``)),m=this.getKnownPrefabStringOptions(t,`drop`,String(o(`drop`)??``)),h=this.getKnownPrefabStringOptions(t,`layer`,String(o(`layer`)??``)),g=this.getKnownPrefabStringOptions(t,`tileMode`,String(o(`tileMode`)??``)),_=[this.contentPrefabNumRow(t,n,`width`,`width`,c,I.width),this.contentPrefabNumRow(t,n,`height`,`height`,l,I.height),this.contentPrefabSelectRow(t,n,`subtype`,`subtype`,String(o(`subtype`)??r.subtype),u,I.subtype),this.contentPrefabSelectRow(t,n,`material`,`material`,String(o(`material`)??``),d,I.material),this.contentPrefabSelectRow(t,n,`bodyType`,`bodyType`,String(o(`bodyType`)??``),f,I.bodyType),this.contentPrefabSelectRow(t,n,`collider`,`collider`,String(o(`collider`)??``),p,I.collider),this.contentPrefabNumRow(t,n,`mass`,`mass`,Number(o(`mass`)??0),I.mass),this.contentPrefabSelectRow(t,n,`drop`,`drop`,String(o(`drop`)??``),m,I.drop),this.contentPrefabNumRow(t,n,`dropAmount`,`dropAmount`,Number(o(`dropAmount`)??0),I.dropAmount),this.contentPrefabSelectRow(t,n,`layer`,`layer`,String(o(`layer`)??``),h,I.layer),this.contentPrefabSelectRow(t,n,`tileMode`,`tileMode`,String(o(`tileMode`)??``),g,I.tileMode),this.contentPrefabBoolRow(t,n,`isCollider`,`isCollider`,!!o(`isCollider`),I.isCollider),this.contentPrefabBoolRow(t,n,`isSensor`,`isSensor`,!!o(`isSensor`),I.isSensor)].join(``),v=t===`pickup`?`${this.contentPrefabNumRow(t,n,`amount`,`amount`,Number(o(`amount`)??0),I.amount)}${_}`:[this.contentPrefabNumRow(t,n,`hp`,`hp`,Number(o(`hp`)??0),I.hp),_].join(``);return`
      <div style="background:#0d1b2a; border-radius:6px; padding:10px; margin-bottom:8px;">
        <div style="display:flex; gap:12px; align-items:flex-start;">
          ${this.prefabPreviewHtml(s,n,92,c,l)}
          <div style="min-width:0; flex:1;">
            <div style="color:#e94560; font-size:13px; font-weight:bold; margin-bottom:4px;">${this.escapeHtml(t.toUpperCase())} prefab — ${this.escapeHtml(n)}</div>
            <div style="color:#7f8c8d; font-size:10px; margin-bottom:8px;">Used ${i} time(s) across loaded levels. Shared size: ${Math.round(c)} x ${Math.round(l)}. Asset-scope edits here propagate to all matching objects across the whole game.</div>
            ${this.contentPrefabTextRow(t,n,`name`,`name`,String(o(`name`)??r.name),I.name)}
            ${v}
          </div>
        </div>
      </div>
    `}prefabLabelCell(e,t){return t?`<div style="flex:0 0 220px;">
           <span style="color:#95a5a6; font-size:12px;">${this.escapeHtml(e)}</span>
           <span style="display:block; font-size:10px; color:#4a7499; margin-top:1px; line-height:1.35;">${this.escapeHtml(t)}</span>
         </div>`:`<label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${this.escapeHtml(e)}</label>`}contentPrefabTextRow(e,t,n,r,i,a){let o=`prefab-${e}-${encodeURIComponent(t)}-${String(n)}`;return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${this.prefabLabelCell(r,a)}
      <input
        id="be-${o}"
        data-scope="levelContentPrefab"
        data-prefab-kind="${this.escapeHtml(e)}"
        data-prefab-asset="${this.escapeHtml(t)}"
        data-prefab-field="${this.escapeHtml(String(n))}"
        data-value-type="string"
        type="text"
        value="${this.escapeHtml(i)}"
        style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >
    </div>`}contentPrefabSelectRow(e,t,n,r,i,a,o){let s=`prefab-${e}-${encodeURIComponent(t)}-${String(n)}`,c=i.trim(),l=a.map(e=>{let t=e===c?` selected`:``,n=e.length?e:`(empty)`;return`<option value="${this.escapeHtml(e)}"${t}>${this.escapeHtml(n)}</option>`}).join(``);return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${this.prefabLabelCell(r,o)}
      <select
        id="be-${s}"
        data-scope="levelContentPrefab"
        data-prefab-kind="${this.escapeHtml(e)}"
        data-prefab-asset="${this.escapeHtml(t)}"
        data-prefab-field="${this.escapeHtml(String(n))}"
        data-value-type="string"
        style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >${l}</select>
    </div>`}contentPrefabNumRow(e,t,n,r,i,a){let o=`prefab-${e}-${encodeURIComponent(t)}-${String(n)}`,s=typeof i==`number`&&!Number.isInteger(i)?`0.01`:`1`;return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${this.prefabLabelCell(r,a)}
      <input
        id="be-${o}"
        data-scope="levelContentPrefab"
        data-prefab-kind="${this.escapeHtml(e)}"
        data-prefab-asset="${this.escapeHtml(t)}"
        data-prefab-field="${this.escapeHtml(String(n))}"
        data-value-type="number"
        type="number"
        step="${s}"
        value="${Number.isFinite(i)?i:0}"
        style="width:100px; padding:3px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >
    </div>`}contentPrefabBoolRow(e,t,n,r,i,a){let o=`prefab-${e}-${encodeURIComponent(t)}-${String(n)}`;return`<div style="display:flex; align-items:flex-start; margin-bottom:6px; gap:8px;">
      ${this.prefabLabelCell(r,a)}
      <select
        id="be-${o}"
        data-scope="levelContentPrefab"
        data-prefab-kind="${this.escapeHtml(e)}"
        data-prefab-asset="${this.escapeHtml(t)}"
        data-prefab-field="${this.escapeHtml(String(n))}"
        data-value-type="number"
        style="width:220px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px; margin-top:1px;"
      >
        <option value="0"${i?``:` selected`}>No</option>
        <option value="1"${i?` selected`:``}>Yes</option>
      </select>
    </div>`}getKnownPrefabStringOptions(e,t,n){let r=[],i=new Set,a=e=>{let t=String(e??``).trim();i.has(t)||(i.add(t),r.push(t))};a(``);for(let e of F[t]??[])a(e);for(let n of this.getAllPrefabSourceObjects(e))a(n[t]);for(let n of this.levelContentData.prefabs)n.kind===e&&a(n[t]);return a(n),r}getLevelContentPrefab(e,t){return this.levelContentData.prefabs.find(n=>n.kind===e&&n.asset===t)}seedDestructibleItemsFromPrefabs(){let e=this.workingData.rewards?.destructibleItems;if(e)for(let t of e){if(!t.assetKey)continue;let e=this.levelContentData.prefabs.find(e=>e.kind===`prop`&&e.asset===t.assetKey);e&&(e.mass!==void 0&&t.mass===void 0&&(t.mass=e.mass),e.hp!==void 0&&t.hp===void 0&&(t.hp=e.hp))}}syncDestructibleItemsIntoPrefabs(){let e=this.workingData.rewards?.destructibleItems;if(e)for(let t of e)t.assetKey&&(this.setLevelContentPrefabValue(`prop`,t.assetKey,`mass`,t.mass),this.setLevelContentPrefabValue(`prop`,t.assetKey,`hp`,t.hp))}setLevelContentPrefabValue(e,t,n,r){let i=String(t??``).trim();if(!i)return;let a=this.levelContentData.prefabs,o=a.find(t=>t.kind===e&&t.asset===i);if(o||(o={asset:i,kind:e},a.push(o)),r===void 0)delete o[n];else switch(n){case`name`:case`subtype`:case`material`:case`bodyType`:case`collider`:case`drop`:case`layer`:case`tileMode`:{let e=String(r).trim();e.length?o[n]=e:delete o[n];break}case`width`:case`height`:case`amount`:case`dropAmount`:o[n]=Number(r)||0;break;case`hp`:case`mass`:{let e=Number(r);!e||!Number.isFinite(e)?delete o[n]:o[n]=e;break}case`isCollider`:case`isSensor`:o[n]=!!r;break;default:break}this.isLevelContentPrefabEmpty(o)&&(this.levelContentData.prefabs=a.filter(e=>e!==o))}isLevelContentPrefabEmpty(e){return e.name===void 0&&e.width===void 0&&e.height===void 0&&e.subtype===void 0&&e.amount===void 0&&e.hp===void 0&&e.material===void 0&&e.bodyType===void 0&&e.isCollider===void 0&&e.isSensor===void 0&&e.collider===void 0&&e.mass===void 0&&e.drop===void 0&&e.dropAmount===void 0&&e.layer===void 0&&e.tileMode===void 0}contentTextRow(e,t,n){let r=`content-${e.replace(/\./g,`__`)}`;return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${this.escapeHtml(t)}</label>
      <input
        id="be-${r}"
        data-scope="levelContent"
        data-path="${e}"
        data-value-type="string"
        type="text"
        value="${this.escapeHtml(n)}"
        style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
    </div>`}getLevelThresholdLabels(e){switch(e){case`race`:case`place`:return{gold:`Gold place (<=)`,silver:`Silver place (<=)`,bronze:`Bronze place (<=)`};case`time`:return{gold:`Gold time (s, <=)`,silver:`Silver time (s, <=)`,bronze:`Bronze time (s, <=)`};case`jump`:return{gold:`Gold jump target`,silver:`Silver jump target`,bronze:`Bronze jump target`};case`flips`:return{gold:`Gold flips target`,silver:`Silver flips target`,bronze:`Bronze flips target`};case`tow`:return{gold:`Gold tow target`,silver:`Silver tow target`,bronze:`Bronze tow target`};case`crush`:return{gold:`Gold crush target`,silver:`Silver crush target`,bronze:`Bronze crush target`};default:return{gold:`Gold target`,silver:`Silver target`,bronze:`Bronze target`}}}getPlayerCarPreviewHtml(e,t){let n=m[e];if(!n)return this.iconHtml(null,e,t);let r=this.resolveUrl(n.upgrades.body[0]?.sprite??`/assets/sprites/cars/${e}/body_0.${c(e,`body`,0)}`),i=this.resolveUrl(n.upgrades.wheel[0]?.sprite??`/assets/sprites/cars/${e}/wheel_0.${c(e,`wheel`,0)}`),a=this.resolveUrl(`/assets/sprites/cars/${e}/basis.${u()}`),o=t*.82,s=Math.max(t*.24,o*(n.bodyShape.size[1]/Math.max(1,n.bodyShape.size[0]))),l=t*.32,d=n.wheelSlots.map(e=>e.offset[0]),f=Math.min(...d),p=Math.max(...d),h=Math.max(1,p-f),g=t*.22,_=t*.56,v=t*.73,y=[{url:a,x:(t-o*1.02)*.5,y:t*.22,width:o*1.02,height:s*1.18,depth:5},{url:r,x:(t-o)*.5,y:t*.16,width:o,height:s,depth:20},...n.wheelSlots.map((e,n)=>({url:i,x:g+(e.offset[0]-f)/h*_-l*.5,y:v-l*.5+(n===0?0:t*.01),width:l,height:l,depth:10}))];return this.compositeHtml(y,t,e)}getEnemyPreviewHtml(e,t){let n=this.enemyPreviewByKey.get(e);return n?this.compositeHtml(n,t,e):(n===null||this.ensureEnemyPreview(e),this.iconHtml(null,e,t))}getEnemyDisplayName(e){let t=this.workingData?.enemies?.[e]?.displayName,n=typeof t==`string`?t.trim():``;if(!n||n===e){let t=r.indexOf(e);if(t>=0)return`Ворог ${t+1}`}return n||e}ensureEnemyPreview(e){if(this.enemyPreviewByKey.has(e)||this.enemyPreviewLoads.has(e))return;let t=s.get(e)?.compositeFile??`/enemies/${e}.json`;this.enemyPreviewLoads.add(e),fetch(this.resolveUrl(t)).then(e=>e.ok?e.json():null).then(n=>{this.enemyPreviewByKey.set(e,this.parseEnemyPreview(n,t))}).catch(()=>{this.enemyPreviewByKey.set(e,null)}).finally(()=>{this.enemyPreviewLoads.delete(e),(this.currentTab===`content`||this.currentTab===`ai`)&&this.domContainer&&this.renderTabContent()})}parseEnemyPreview(e,t){let n=Array.isArray(e?.tilesets)?e.tilesets:[],r=Array.isArray(e?.layers)?e.layers:[],i=new Map;for(let e of n){let n=typeof e?.firstgid==`number`?e.firstgid:1;for(let r of e?.tiles??[])typeof r?.id!=`number`||!r?.image||i.set(n+r.id,{url:this.resolveCompositeAssetUrl(t,r.image),width:Number(r.imagewidth)||1,height:Number(r.imageheight)||1})}let a=r.flatMap(e=>Array.isArray(e?.objects)?e.objects:[]).map(e=>{let t=typeof e?.gid==`number`?e.gid:null,n=t==null?null:i.get(t);if(!n)return null;let r=String(this.getTiledProperty(e?.properties,`role`)??``);if(r!==`body`&&!r.startsWith(`wheel`)&&r!==`front_wheel`&&r!==`rear_wheel`)return null;let a=Number(e?.height)||n.height;return{url:n.url,x:Number(e?.x)||0,y:(Number(e?.y)||0)-a,width:Number(e?.width)||n.width,height:a,depth:Number(this.getTiledProperty(e?.properties,`depth`))||0}}).filter(e=>!!e).sort((e,t)=>e.depth-t.depth);return a.length?a:null}getTiledProperty(e,t){return Array.isArray(e)?e.find(e=>e?.name===t)?.value??null:null}resolveCompositeAssetUrl(e,t){let n=e.replace(/[^/]+$/,``),r=t.replace(/^\.?\//,``);return this.resolveUrl(`${n}${r}`)}compositeHtml(e,t,n){let r=Math.min(...e.map(e=>e.x)),i=Math.min(...e.map(e=>e.y)),a=Math.max(...e.map(e=>e.x+e.width)),o=Math.max(...e.map(e=>e.y+e.height)),s=Math.max(1,a-r),c=Math.max(1,o-i),l=Math.min((t-8)/s,(t-8)/c),u=(t-s*l)*.5,d=(t-c*l)*.5;return`<div style="width:${t}px; height:${t}px; border-radius:8px; background:#0b1525; border:1px solid #294f7a; padding:0; flex:0 0 ${t}px; position:relative; overflow:hidden;">${e.map(e=>`<img src="${this.escapeHtml(e.url)}" alt="${this.escapeHtml(n)}" style="position:absolute; left:${u+(e.x-r)*l}px; top:${d+(e.y-i)*l}px; width:${e.width*l}px; height:${e.height*l}px; object-fit:contain;">`).join(``)}</div>`}prefabPreviewHtml(e,t,n,r,i){if(!e)return this.iconHtml(null,t,n);let a=Math.max(1,r||1),o=Math.max(1,i||1),s=n-16,c=Math.min(s/a,s/o),l=Math.max(6,a*c),u=Math.max(6,o*c),d=(n-l)*.5,f=(n-u)*.5;return`<div style="width:${n}px; height:${n}px; border-radius:8px; background:#0b1525; border:1px solid #294f7a; flex:0 0 ${n}px; position:relative; overflow:hidden;">
      <div style="position:absolute; left:50%; top:50%; width:${s}px; height:${s}px; transform:translate(-50%, -50%); border:1px dashed rgba(120,160,220,0.25); border-radius:4px;"></div>
      <img src="${this.escapeHtml(e)}" alt="${this.escapeHtml(t)}" style="position:absolute; left:${d}px; top:${f}px; width:${l}px; height:${u}px; object-fit:fill; image-rendering:auto;">
    </div>`}iconHtml(e,t,n){return e?`<img src="${this.escapeHtml(e)}" alt="${this.escapeHtml(t)}" style="width:${n}px; height:${n}px; object-fit:contain; border-radius:8px; background:#0b1525; border:1px solid #294f7a; padding:4px; flex:0 0 ${n}px;">`:`<div style="width:${n}px; height:${n}px; border-radius:8px; background:#1f2f4f; border:1px solid #294f7a; display:flex; align-items:center; justify-content:center; color:#95a5a6; font-size:11px; flex:0 0 ${n}px;">N/A</div>`}resolveUrl(e){let t=T(),n=e.startsWith(`/`)?e.slice(1):e;return t.endsWith(`/`)?`${t}${n}`:`${t}/${n}`}resolveDestructiblePreviewUrl(e){return this.resolveUrl(`/output-tiled/assets/assets/${e}.${l(this,e)}`)}createDefaultDestructibleItems(e){return y.map(t=>this.normalizeDestructibleItem({assetKey:t},e)).filter(e=>!!e)}normalizeDestructibleItem(e,t){let n=String(e?.assetKey??``).trim();if(!n)return null;let r=v([n]),i=String(e?.displayName??t.destructibleNames?.[n]??n).trim()||n,a=e?.price,o=Number.isFinite(Number(a))?Number(a):t.destructibleCoins?.byAsset?.[n]??t.destructibleCoins?.default??1,s=e?.mass,c=e?.hp;return{assetKey:n,displayName:i,price:o,...Number.isFinite(Number(s))?{mass:Number(s)}:{},...Number.isFinite(Number(c))?{hp:Number(c)}:{},wreckTexture:this.normalizeString(e?.wreckTexture??r?.wreckTexture),explosionFrames:this.normalizeStringList(e?.explosionFrames??r?.explosionFrames)??[],secondaryExplosionFrames:this.normalizeStringList(e?.secondaryExplosionFrames??r?.secondaryExplosionFrames)??[],debrisSpawnMode:e?.debrisSpawnMode??r?.debrisSpawnMode,debrisList:this.parseJsonArray(e?.debrisList??r?.debrisList)??[],dissolveBurst:this.parseJsonObject(e?.dissolveBurst??r?.dissolveBurst)??{key:``},particles:this.parseJsonObject(e?.particles??r?.particles)??{key:``}}}normalizeString(e){let t=String(e??``).trim();return t.length?t:void 0}normalizeStringList(e){if(Array.isArray(e)){let t=e.map(e=>String(e).trim()).filter(e=>e.length>0);return t.length?t:void 0}let t=String(e??``).trim();if(!t)return;let n=t.split(`,`).map(e=>e.trim()).filter(e=>e.length>0);return n.length?n:void 0}parseJsonArray(e){if(Array.isArray(e))return e;let t=String(e??``).trim();if(t)try{let e=JSON.parse(t);return Array.isArray(e)?e:void 0}catch{return}}parseJsonObject(e){if(e&&typeof e==`object`&&!Array.isArray(e))return e;let t=String(e??``).trim();if(t)try{let e=JSON.parse(t);return e&&typeof e==`object`&&!Array.isArray(e)?e:void 0}catch{return}}toNumericInputValue(e){if(typeof e==`boolean`)return e?1:0;let t=Number(e);return Number.isFinite(t)?t:0}textRow(e,t,n){let r=e.replace(/\./g,`__`);return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${this.escapeHtml(t)}</label>
      <input
        id="be-${r}"
        data-path="${e}"
        data-value-type="string"
        type="text"
        value="${this.escapeHtml(n)}"
        style="flex:1; min-width:120px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
    </div>`}selectRow(e,t,n,r){let i=e.replace(/\./g,`__`),a=r.map(e=>`<option value="${this.escapeHtml(e)}"${e===n?` selected`:``}>${this.escapeHtml(e)}</option>`).join(``);return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${this.escapeHtml(t)}</label>
      <select
        id="be-${i}"
        data-path="${e}"
        data-value-type="string"
        style="width:220px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >${a}</select>
    </div>`}boolSelectRow(e,t,n){let r=e.replace(/\./g,`__`);return`<div style="display:flex; align-items:center; margin-bottom:5px; gap:8px;">
      <label style="flex:0 0 220px; color:#95a5a6; font-size:12px;">${this.escapeHtml(t)}</label>
      <select
        id="be-${r}"
        data-path="${e}"
        data-value-type="number"
        style="width:220px; padding:4px 6px; background:#0d1b2a; color:#ecf0f1;
               border:1px solid #2980b9; border-radius:3px; font-family:monospace; font-size:12px;"
      >
        <option value="0"${n?``:` selected`}>No</option>
        <option value="1"${n?` selected`:``}>Yes</option>
      </select>
    </div>`}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}addContentEnemyRow(e){let t=this.levelContentData.levels[e];if(!t)return;let n=Array.isArray(t.enemyKeys)?t.enemyKeys:[],i=Array.isArray(t.enemySpawnXs)?t.enemySpawnXs:[],a=Array.isArray(t.enemySpawnYs)?t.enemySpawnYs:[],o=r.find(e=>!n.includes(e))??n[n.length-1]??r[0]??``;t.enemyKeys=[...n,o];let s=t.enemyKeys.length-1;t.enemySpawnXs=[...i,this.resolveContentEnemySpawnX(t,s)],t.enemySpawnYs=[...a,0];let c=this.workingData.levels[e];c&&(Array.isArray(c.enemyKeys)||(c.enemyKeys=[]),c.enemyKeys=[...c.enemyKeys,o],Array.isArray(c.enemyAiOverrides)||(c.enemyAiOverrides=[]),c.enemyAiOverrides=[...c.enemyAiOverrides,{}]),this.renderTabContent()}removeContentEnemyRow(e,t){let n=this.levelContentData.levels[e];if(!n||!Array.isArray(n.enemyKeys))return;n.enemyKeys=n.enemyKeys.filter((e,n)=>n!==t),Array.isArray(n.enemySpawnXs)&&(n.enemySpawnXs=n.enemySpawnXs.filter((e,n)=>n!==t)),Array.isArray(n.enemySpawnYs)&&(n.enemySpawnYs=n.enemySpawnYs.filter((e,n)=>n!==t));let r=this.workingData.levels[e];r&&(Array.isArray(r.enemyKeys)&&(r.enemyKeys=r.enemyKeys.filter((e,n)=>n!==t)),Array.isArray(r.enemyAiOverrides)&&(r.enemyAiOverrides=r.enemyAiOverrides.filter((e,n)=>n!==t))),this.renderTabContent()}resolveContentEnemySpawnX(e,t){let n=Number(e.enemySpawnXs?.[t]);if(Number.isFinite(n))return n;let r=e.markers?.start;return(r?Number(r.x||0)+Number(r.width||0)/2:0)+320+t*220}resolveContentEnemySpawnY(e,t){let n=Number(e.enemySpawnYs?.[t]);return Number.isFinite(n)?n:0}resolveContentEnemySpawnPoint(e,t){let n=e?.enemySpawnPoints,r=Array.isArray(n)?n[t]:void 0;return typeof r==`string`?r:``}async swapLevelWithNeighbor(e,t){let n=g.map(e=>e.key).filter(e=>!!this.workingData.levels[e]),r=n.indexOf(e);if(r<0)return;let i=r+t;if(i<0||i>=n.length)return;let a=n[r],o=n[i],s=this.workingData.levels[a],c=this.workingData.levels[o];if(!s||!c)return;await Promise.all([this.ensureContentLevelLoaded(a),this.ensureContentLevelLoaded(o)]),this.workingData.levels[a]=c,this.workingData.levels[o]=s;let l=this.levelContentData.levels[a],u=this.levelContentData.levels[o];u===void 0?delete this.levelContentData.levels[a]:this.levelContentData.levels[a]=u,l===void 0?delete this.levelContentData.levels[o]:this.levelContentData.levels[o]=l,this.renderTabContent()}syncInputsFromDom(e){e.querySelectorAll(`input[data-path], select[data-path], textarea[data-path], input[data-prefab-field], select[data-prefab-field], textarea[data-prefab-field]`).forEach(e=>{let t=e,n=t.dataset.prefabField!==void 0||t.dataset.allowEmpty===`true`,r=this.parseEditorFieldValue(t,n);if(!r.valid)return;let i=t.dataset.prefabField;if(i){let e=t.dataset.prefabKind,n=t.dataset.prefabAsset;if(e!==`pickup`&&e!==`prop`||!n)return;this.setLevelContentPrefabValue(e,n,i,r.value);return}let a=t.dataset.path;if(!a)return;let o=t.dataset.scope??`balance`,s=r.value;this.setNestedValue(o===`levelContent`?this.levelContentData:this.workingData,a.split(`.`),s),o===`levelContent`&&/^levels\.[^.]+\.enemyKeys\.\d+$/.test(a)&&this.setNestedValue(this.workingData,a.split(`.`),s)})}syncEnemyKeysToContentData(){for(let[e,t]of Object.entries(this.workingData.levels)){let n=this.levelContentData.levels[e];if(!n||!Array.isArray(t.enemyKeys))continue;n.enemyKeys=[...t.enemyKeys];let r=n.enemyKeys.length,i=Array.isArray(n.enemySpawnXs)?[...n.enemySpawnXs]:[],a=Array.isArray(n.enemySpawnYs)?[...n.enemySpawnYs]:[];for(;i.length<r;)i.push(this.resolveContentEnemySpawnX(n,i.length));for(;a.length<r;)a.push(0);n.enemySpawnXs=i.slice(0,r),n.enemySpawnYs=a.slice(0,r)}}handleEmbeddedCarEditorMessage(e){if(e.origin!==window.location.origin)return;let t=e.data;if(!t||t.source!==`mw-car-editor`||t.type!==`player-car-sync`)return;let n=typeof t.carId==`string`?t.carId:``;!n||!t.playerCar||(this.workingData.playerCars??={},this.workingData.playerCars[n]=JSON.parse(JSON.stringify(t.playerCar)),this.syncEmbeddedPlayerCarInputs(n))}syncEmbeddedPlayerCarInputs(e){let t=this.domContainer,n=this.workingData.playerCars?.[e];!t||!n||(this.setPlayerCarInputValue(t,`playerCars.${e}.scale`,n.scale),this.setPlayerCarInputValue(t,`playerCars.${e}.body.size.0`,n.body?.size?.[0]),this.setPlayerCarInputValue(t,`playerCars.${e}.body.size.1`,n.body?.size?.[1]),this.setPlayerCarInputValue(t,`playerCars.${e}.body.offset.0`,n.body?.offset?.[0]),this.setPlayerCarInputValue(t,`playerCars.${e}.body.offset.1`,n.body?.offset?.[1]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheels.radius`,n.wheels?.radius),this.setPlayerCarInputValue(t,`playerCars.${e}.wheels.mass`,n.wheels?.mass),n.wheelSlots?.forEach((n,r)=>{this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.offset.0`,n.offset?.[0]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.offset.1`,n.offset?.[1]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.pivotA.0`,n.pivotA?.[0]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.pivotA.1`,n.pivotA?.[1]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.pivotB.0`,n.pivotB?.[0]),this.setPlayerCarInputValue(t,`playerCars.${e}.wheelSlots.${r}.pivotB.1`,n.pivotB?.[1])}))}setPlayerCarInputValue(e,t,n){if(!Number.isFinite(n))return;let r=e.querySelector(`[data-path="${t}"]`);r&&(r.value=String(n))}parseEditorFieldValue(e,t=!1){return x(e.value,e.dataset.valueType??`number`,t)}applyChanges(e){this.syncInputsFromDom(e),this.workingData=this.normalizeWorkingData(this.workingData);let t=this.validateAchievementsTuning(this.workingData);if(t.length){this.showFlash(e,`Blocked: ${t[0]}`,`#8b1a1a`),this.currentTab!==`achievements`&&(this.currentTab=`achievements`,this.rebuildTabButtons(e),this.renderTabContent());return}this.levelContentData=h(this.levelContentData,g);let n=this.validateLevelContentData(this.levelContentData,this.currentContentLevelKey);if(n.errors.length){this.renderTabContent(),this.showFlash(e,`Blocked: ${n.errors.length} validation error(s)`,`#8b1a1a`);return}this.syncDestructibleItemsIntoPrefabs(),f.apply(this.workingData),_.apply(this.levelContentData),this.renderTabContent(),this.showFlash(e,this.reloadAffectedScene(),`#2e7d32`),this.saveToDevServer(e)}saveToDevServer(e){fetch(`/__designer/balance-save`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({balance:this.workingData,levelContent:this.levelContentData})}).then(t=>{t.ok?this.showFlash(e,`Збережено на диск ✓`,`#1b5e20`):this.showFlash(e,`Застосовано в пам'яті. На диск НЕ збережено (нема dev-сервера) — скористайся Export JSON`,`#8a6d00`)}).catch(()=>{this.showFlash(e,`Застосовано в пам'яті. На диск НЕ збережено (нема dev-сервера) — скористайся Export JSON`,`#8a6d00`)})}exportJson(){let e=this.validateAchievementsTuning(this.workingData);if(e.length){this.showFlash(this.domContainer,`Export blocked: ${e[0]}`,`#8b1a1a`);return}let t=new Blob([JSON.stringify(this.workingData,null,2)],{type:`application/json`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`balance.json`,n.click(),URL.revokeObjectURL(n.href)}validateAchievementsTuning(e){let t=[],n=e.achievements??d;for(let e of o){let r=n[e],a=r?.thresholds,o=r?.rewards;if(!Array.isArray(a)||a.length!==3){t.push(`${e}: thresholds must contain exactly 3 values`);continue}if(!Array.isArray(o)||o.length!==3){t.push(`${e}: rewards must contain exactly 3 values`);continue}i[e]===`increasing`?a[0]<=a[1]&&a[1]<=a[2]||t.push(`${e}: thresholds must be ascending for increasing mode`):a[0]>=a[1]&&a[1]>=a[2]||t.push(`${e}: thresholds must be descending for decreasing mode`),a.some(e=>!Number.isFinite(e)||e<0)&&t.push(`${e}: thresholds must be non-negative numbers`),o.some(e=>!Number.isFinite(e)||e<0)&&t.push(`${e}: rewards must be non-negative numbers`)}return t}resetToLoaded(e){let t=f.getOriginalRaw();t&&(this.workingData=this.normalizeWorkingData(JSON.parse(JSON.stringify(t))),f.clearOverride(),this.syncEnemyKeysToContentData(),this.renderTabContent(),this.showFlash(e,`Reset to loaded values ✓`,`#5a3e00`))}exportLevelContentJson(e){let t=this.validateLevelContentData(this.levelContentData,this.currentContentLevelKey);if(t.errors.length){this.showFlash(e??this.domContainer,`Export blocked: ${t.errors.length} validation error(s)`,`#8b1a1a`);return}let n=new Blob([JSON.stringify(this.levelContentData,null,2)],{type:`application/json`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`level-content.json`,r.click(),URL.revokeObjectURL(r.href)}resetLevelContent(e){_.resetAll(),this.levelContentData=h(JSON.parse(JSON.stringify(_.getRaw())),g),this.renderTabContent(),this.showFlash(e,`Level content reset ✓`,`#5a3e00`)}async runDesignerReloadAll(e){if(this.designerReloadAllInFlight)return;this.designerReloadAllInFlight=!0;let t=e.querySelector(`#be-designer-reload`);t&&(t.disabled=!0,t.textContent=`SYNCING...`,t.style.opacity=`0.7`,t.style.cursor=`progress`);try{let t=this.scene.isActive(`Game`)?this.scene.get(`Game`):null;if(t?.runDesignerTiledReloadAll){let n=await t.runDesignerTiledReloadAll();this.showFlash(e,n.message,n.ok?`#5b2c83`:`#8b1a1a`);return}let n=await fetch(`/__designer/tiled-sync-all`,{method:`POST`}),r=await n.json().catch(()=>null);if(!n.ok||r?.ok===!1){let t=String(r?.error||r?.message||`Designer reload failed (HTTP ${n.status})`);this.showFlash(e,t,`#8b1a1a`);return}this.showFlash(e,String(r?.message||`All Tiled exports synced`),`#5b2c83`)}catch(t){this.showFlash(e,t instanceof Error?t.message:`Unknown designer reload error`,`#8b1a1a`)}finally{this.designerReloadAllInFlight=!1,t&&(t.disabled=!1,t.textContent=`⟳ RELOAD ALL LEVELS`,t.style.opacity=`1`,t.style.cursor=`pointer`)}}async ensureContentLevelLoaded(e){if(!e||this.levelContentData.levels[e]||this.contentLevelLoads.has(e))return;let t=g.find(t=>t.key===e);if(t){this.contentLevelLoads.add(e);try{await _.ensureLevel(t),this.levelContentData=h(JSON.parse(JSON.stringify(_.getRaw())),g)}finally{this.contentLevelLoads.delete(e),this.currentTab===`content`&&this.renderTabContent()}}}ensureAllContentLevelsLoaded(){return g.every(e=>!!this.levelContentData.levels[e.key])?Promise.resolve():(this.prefabsLoadPromise||=Promise.all(g.map(async e=>{await _.ensureLevel(e)})).then(()=>{this.levelContentData=h(JSON.parse(JSON.stringify(_.getRaw())),g)}).finally(()=>{this.prefabsLoadPromise=null,(this.currentTab===`prefabs`||this.currentTab===`rewards`)&&this.renderTabContent()}),this.prefabsLoadPromise)}getInitialContentLevelKey(){let e=this.scene.get(`Game`);return(typeof e?.currentLevelKey==`string`?e.currentLevelKey:null)||(g[0]?.key??`level_1`)}reloadAffectedScene(){let e=this.scene.get(`Game`);if(e?.scene?.isActive()&&typeof e.reloadFromBalanceEditor==`function`)return e.reloadFromBalanceEditor(),`Applied ✓ — current race reloaded`;let t=this.scene.get(`Garage`);if(t?.scene?.isActive())return t.scene.restart(),`Applied ✓ — Garage refreshed`;let n=this.scene.get(`Gallery`);return n?.scene?.isActive()?(n.scene.restart(),`Applied ✓ — Gallery refreshed`):`Applied ✓ — changes stored in memory`}validateLevelContentData(e,t){let n=[],r=[],i=new Map(g.map(e=>[e.key,e]));for(let t of e.prefabs)t.asset||r.push(`prefab: empty asset key`),t.kind===`pickup`&&t.amount!=null&&t.amount<0&&n.push(`prefab ${t.asset}: pickup amount must be non-negative`),t.kind===`prop`&&t.hp!=null&&t.hp<0&&n.push(`prefab ${t.asset}: prop hp must be non-negative`);for(let[a,o]of Object.entries(e.levels)){if(t&&a!==t)continue;let e=i.get(a);if(!e){r.push(`${a}: unknown level key in overrides`);continue}let c=o.markers.start,l=o.markers.finish;c||n.push(`${a}: missing start marker`),l||n.push(`${a}: missing finish marker`),e.mission?.type===`jump`&&!o.markers[`jump-start`]&&n.push(`${a}: jump mission requires jump-start marker`);for(let[e,t]of Object.entries(o.markers))t&&(t.width<=0||t.height<=0)&&n.push(`${a}: marker ${e} must have positive width and height`);for(let e of o.enemyKeys)s.has(e)||n.push(`${a}: unknown enemy key ${e}`);let u=new Set;for(let e of o.pickups)u.has(e.id)&&r.push(`${a}: duplicate pickup id ${e.id}`),u.add(e.id),e.type!==`pickup`&&n.push(`${a}: pickup #${e.id} has invalid type ${e.type}`),(e.amount??0)<0&&n.push(`${a}: pickup #${e.id} has negative amount`),e.asset||r.push(`${a}: pickup #${e.id} has empty asset`);let d=new Set;for(let e of o.props)d.has(e.id)&&r.push(`${a}: duplicate prop id ${e.id}`),d.add(e.id),e.type!==`prop`&&n.push(`${a}: prop #${e.id} has invalid type ${e.type}`),(e.hp??0)<0&&n.push(`${a}: prop #${e.id} has negative hp`),e.asset||r.push(`${a}: prop #${e.id} has empty asset`)}return{errors:n,warnings:r}}setNestedValue(e,t,n){S(e,t,n)}showFlash(e,t,n){let r=e.querySelector(`#be-flash`);r||(r=document.createElement(`div`),r.id=`be-flash`,r.style.cssText=`position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
        padding:10px 24px; border-radius:6px; font-family:monospace; font-size:13px;
        color:#fff; z-index:10000000; transition: opacity 0.5s;`,e.appendChild(r)),r.style.background=n,r.style.opacity=`1`,r.textContent=t,setTimeout(()=>{r&&(r.style.opacity=`0`)},2500)}addDestructibleItem(){let e=this.workingData.rewards??(this.workingData.rewards={}),t=e.destructibleItems??=[],n=`new_destructible_${t.length+1}`;t.push(this.normalizeDestructibleItem({assetKey:n},e)??{assetKey:n,displayName:n,price:1}),this.renderTabContent()}addDestructibleFrame(e,t){let n=this.workingData.rewards?.destructibleItems?.[e];if(!n)return;let r=Array.isArray(n[t])?[...n[t]]:[];r.push(``),n[t]=r,this.renderTabContent()}removeDestructibleFrame(e,t,n){let r=this.workingData.rewards?.destructibleItems?.[e];!r||!Array.isArray(r[t])||(r[t]=r[t].filter((e,t)=>t!==n),this.renderTabContent())}addDestructibleDebris(e){let t=this.workingData.rewards?.destructibleItems?.[e];if(!t)return;let n=Array.isArray(t.debrisList)?[...t.debrisList]:[];n.push({key:``,count:1}),t.debrisList=n,this.renderTabContent()}removeDestructibleDebris(e,t){let n=this.workingData.rewards?.destructibleItems?.[e];!n||!Array.isArray(n.debrisList)||(n.debrisList=n.debrisList.filter((e,n)=>n!==t),this.renderTabContent())}removeDestructibleItem(e){let t=this.workingData.rewards?.destructibleItems;!t||e<0||e>=t.length||(t.splice(e,1),this.renderTabContent())}};export{L as BalanceEditorScene};