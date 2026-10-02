addLayer("ach", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "★", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true
        }
    },
    color: "#fbff00",
    tooltip() { return "Achievements" },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    infoboxes: {
        lore: {
            title: "Layer ?: Bonus | Achievements",
            body() { return `Unfortunately, Azure Mines doesn't have enough achievements to really fit all of these achievement names, sorry...` },
        },
    },
    achievements: {
        11: {
            name: "It's Alive!",
            tooltip: "Reset for Coal",
            done() { return player.c.points.gte(new Decimal(1)) }
        },
        12: {
            name: "Choose one...",
            tooltip: "Choose between Coal Upgrade I and Coal Upgrade C",
            done() { return hasUpgrade('c', 21) || hasUpgrade('c', 22) }
        },
        13: {
            name: "Iron man",
            tooltip: "Reset for Iron",
            done() { return player.i.points.gte(new Decimal(1)) }
        },
        14: {
            name: "Lightning rod",
            tooltip: "Reset for Copper",
            done() { return player.cu.points.gte(new Decimal(1)) }
        },
        15: {
            name: "First bit of Automation",
            tooltip: "Buy Iron Upgrade 3 or Copper Upgrade 3",
            done() { return hasUpgrade('i', 13) || hasUpgrade('cu', 13) }
        },
        21: {
            name: "Gilded",
            tooltip: "Reset for Gold",
            done() { return player.g.points.gte(new Decimal(1)) }
        },
        22: {
            name: "Red glow",
            tooltip: "Reset for Ruby",
            done() { return player.r.points.gte(new Decimal(1)) }
        },
        23: {
            name: "Deep dreams",
            tooltip: "Reset for Sapphire",
            done() { return player.s.points.gte(new Decimal(1)) }
        },
        24: {
            name: "Something smells...",
            tooltip: "Buy Sapphire Upgrade Su",
            done() { return hasUpgrade('s', 12) }
        },
        25: {
            name: "Compound",
            tooltip: "Buy a level of the Sulfur Buyable",
            done() { return (getBuyableAmount('su', 11) > 0) }
        },
        31: {
            name: "Shining bright",
            tooltip: "Buy Sapphire Upgrade Si",
            done() { return hasUpgrade('s', 13) }
        },
        32: {
            name: "Greenness",
            tooltip: "Reset for Emerald",
            done() { return player.e.points.gte(new Decimal(1)) }
        },
        33: {
            name: "Layer 0?",
            tooltip: "Buy Ruby Upgrade A",
            done() { return hasUpgrade('r', 15) }
        },
        34: {
            name: "Ricochet love",
            tooltip: "Reach Amethyst Milestone 1",
            done() { return hasMilestone('a', 0) }
        },
        35: {
            name: "Opalyxe",
            tooltip: "Reset for Opal",
            done() { return player.o.points.gte(new Decimal(1)) }
        },
        41: {
            name: "To the moon",
            tooltip: "Reset for Moonstone",
            done() { return player.m.points.gte(new Decimal(1)) }
        },
        42: {
            name: "Endgame",
            tooltip: "Reset for Diamond",
            done() { return player.d.points.gte(new Decimal(1)) }
        },
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true }
})
addLayer("rec", {
    name: "savebank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true
        }
    },
    color: "#ffffff",
    tooltip() { return "Savebank" },
    clickables: {
        11: {
            display() { return "Sapphire" },
            canClick() { return true },
            onClick() {
                player.s.points = new Decimal(1),
                player.s.unlocked = true
                player.rec.unlocked = false
                player.tab = "none"
            }
        },
        12: {
            display() { return "Emerald" },
            canClick() { return true },
            onClick() {
                player.e.points = new Decimal(1),
                player.e.unlocked = true
                player.rec.unlocked = false
                player.tab = "none"
            }
        },
        13: {
            display() { return "Diamond" },
            canClick() { return true },
            onClick() {
                player.d.points = new Decimal(1),
                player.d.unlocked = true
                player.rec.unlocked = false
                player.tab = "none"
            }
        }
    },
    shouldNotify: false,
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    infoboxes: {
        lore: {
            title: "Layer ?: Bonus | Savebank",
            body() { return `kill the layershown function i hate it i hate it this is you're faults<br>Can only be used once in a save.` },
        },
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return player.rec.unlocked  }
})
addLayer("c", {
    name: "coal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#545454",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "coal", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.49, // trol
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(2)
        if (hasUpgrade('i', 12)) mult = mult.times(1.5)
        if (hasUpgrade('cu', 12)) mult = mult.times(3)
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('cu', 14)) mult = mult.times(upgradeEffect('cu', 14))
        if (hasUpgrade('c', 32)) mult = mult.times(upgradeEffect('c', 32))
        if (hasUpgrade('g', 15)) mult = mult.times(upgradeEffect('g', 15))
        if (hasUpgrade('su', 11)) mult = mult.times(2)
        if (getBuyableAmount('su', 11) > 0) mult = mult.times(buyableEffect('su', 11))
        if (hasUpgrade('si', 12)) mult = mult.times(upgradeEffect('si', 12))
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        if (hasMilestone('a', 0)) mult = mult.pow(1.4)
        if (hasUpgrade('a', 11)) mult = mult.pow(1.04)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('i', 13)) total += 0.05
        if (hasUpgrade('cu', 13)) total += 0.05
        if (hasUpgrade('g', 11)) total += 0.9
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Coal",
            body() { return `A common, yet extremely useful ore. It’s quite the fuel source, allowing you to either use it for heat, cook, or maybe you’re a blacksmith and use it to help forge tools or alloys. Though given it’s usage, and how common it is, trying to find a buyer who doesn’t mine their own coal is difficult.` },
        },
    },
    upgrades: {
        11: {
            title: "Coal Upgrade 1",
            description: "Double your stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Coal Upgrade 2",
            description: "Double your stone gain again.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('c', 11) }
        },
        13: {
            title: "Coal Upgrade 3",
            description: "Double your coal gain.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('c', 12) }
        },
        14: {
            title: "Coal Upgrade 4",
            description: "Double your stone gain yet again.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('c', 13) }
        },
        15: {
            title: "Coal Upgrade 5",
            description: "Double your stone gain... again.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('c', 14) }
        },
        21: {
            title: "Coal Upgrade I",
            description: "Unlock Iron, Increases the cost of Coal Upgrade C by 10x.",
            tooltip: "Iron focuses on increased Stone gain.",
            cost() {
                if (hasUpgrade('c', 22))
                    return new Decimal(300)
                else
                    return new Decimal(30)
            },
            unlocked() { return hasUpgrade('c', 15) }
        },
        22: {
            title: "Coal Upgrade C",
            description: "Unlock Copper, Increases the cost of Coal Upgrade I by 10x.",
            tooltip: "Copper focuses on increased Coal gain.",
            cost() {
                if (hasUpgrade('c', 21))
                    return new Decimal(300)
                else
                    return new Decimal(30)
            },
            unlocked() { return hasUpgrade('c', 15) }
        },
        23: {
            title: "Coal Upgrade 6",
            description: "Double your stone gain... again... again.",
            cost: new Decimal(750),
            unlocked() { return hasUpgrade('c', 21) && hasUpgrade('c', 22) }
        },
        24: {
            title: "Coal Upgrade 7",
            description: "10x stone gain.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade('c', 23) }
        },
        25: {
            title: "Coal Upgrade G",
            description: "Unlock Gold.",
            cost: new Decimal(3000),
            unlocked() { return hasUpgrade('c', 24) }
        },
        31: {
            title: "Coal Upgrade 8",
            description: "Increase Iron & Copper generation to 10%",
            cost: new Decimal(5000000),
            unlocked() { return hasUpgrade('c', 25) && hasUpgrade('r', 13) }
        },
        32: {
            title: "Coal Upgrade 9",
            description: "Coal boosts itself at a low rate.",
            cost: new Decimal(10000000),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            tooltip: "Formula: Coal+1^0.075",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('c', 31) }
        },
        33: {
            title: "Coal Upgrade Su",
            description: "Generate 10000% of Sulfur every second.",
            cost: new Decimal(125),
            tooltip: "Yes, You heard that right.",
            unlocked() { return hasUpgrade('su', 12) }
        },
        34: {
            title: "Coal Upgrade Ag",
            description: "Generate 100% of Silver every second.",
            cost: new Decimal(125),
            unlocked() { return hasUpgrade('si', 13) }
        },
        35: {
            title: "Coal Upgrade 10",
            description: "^1.3 stone gain.",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade('e', 12) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "C: Reset for coal", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true }
})
addLayer("cu", {
    name: "copper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cu", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#e39f5c",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "copper", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 14)) mult = mult.times(2)
        if (hasUpgrade('i', 15)) mult = mult.times(3)
        if (hasUpgrade('su', 12)) mult = mult.times(2)
        if (hasUpgrade('si', 12)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('r', 12)) total += 0.01
        if (hasUpgrade('c', 31)) total += 0.09
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Copper",
            body() { return `A common ore used for all sorts of electrical circuits, as it is a great conductor. Even other civilizations utilize its excellent electrical benefits. Even the army for the D.U.C wields blades made of pure copper, letting it surge with electricity, making it both very efficient and shocking. Though this property isn’t useful in pickaxes given its weakness.` },
        },
    },
    upgrades: {
        11: {
            title: "Copper Upgrade 1",
            description: "1.5x Stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Copper Upgrade 2",
            description: "Triple your coal gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('cu', 11) }
        },
        13: {
            title: "Copper Upgrade 3",
            description: "Generate +5% of Coal every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('cu', 12) }
        },
        14: {
            title: "Copper Upgrade 4",
            description: "Copper boosts Gold and Coal.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Copper+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('cu', 13) && hasUpgrade('g', 12) }
        },
        15: {
            title: "Copper Upgrade 5",
            description: "3x Iron & 1.5x Ruby",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('cu', 14) && hasUpgrade('r', 13) }
        },
        21: {
            title: "Copper Upgrade 6",
            description: "Emerald boosts itself at a high rate.",
            cost: new Decimal(4000),
            effect() {
                return player.e.points.add(1).pow(0.5)
            },
            tooltip: "Formula: Emerald+1^0.5",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('e', 12) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "C",
            description: "Shift+C: Reset for copper",
            onPress() { if (canReset(this.layer)) doReset(this.layer) },
            unlocked() { return hasUpgrade('c', 22) }
        },
    ],
    layerShown() { return player.cu.unlocked || hasUpgrade('c', 22) }
})
addLayer("i", {
    name: "iron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Fe", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#bcb399",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "iron", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 14)) mult = mult.times(2)
        if (hasUpgrade('cu', 15)) mult = mult.times(3)
        if (hasUpgrade('su', 12)) mult = mult.times(2)
        if (hasUpgrade('si', 11)) mult = mult.times(4)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('r', 12)) total += 0.01
        if (hasUpgrade('c', 31)) total += 0.09
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Iron",
            body() { return `Iron on its own isn’t the best, however given how plentiful it and carbon sources like Coal are, it’s not too much of a hassle to make large quantities of steel. The Haven is said to refer to iron as an artifact of some sort. The amount of praise Iron gets is probably due to the lack of native ore in the haven. The Azure Mines is at least free from this “iron curse” given it actually has native ore.` },
        },
    },
    upgrades: {
        11: {
            title: "Iron Upgrade 1",
            description: "5x stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Iron Upgrade 2",
            description: "1.5x Coal gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('i', 11) }
        },
        13: {
            title: "Iron Upgrade 3",
            description: "Generate +5% of Coal every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('i', 12) }
        },
        14: {
            title: "Iron Upgrade 4",
            description: "Iron boosts Gold and Coal.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Iron+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('i', 13) && hasUpgrade('g', 12) }
        },
        15: {
            title: "Iron Upgrade 5",
            description: "3x Copper & 1.5x Ruby",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('i', 14) && hasUpgrade('r', 13) }
        },
        21: {
            title: "Iron Upgrade 6",
            description: "Sapphire boosts itself at a low rate.",
            cost: new Decimal(4000),
            effect() {
                return player.s.points.add(1).pow(0.3)
            },
            tooltip: "Formula: Sapphire+1^0.3",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('e', 12) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "i", description: "I: Reset for iron", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('c', 21) } },
    ],
    layerShown() { return player.i.unlocked || hasUpgrade('c', 21) }
})
addLayer("g", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Au", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#d8c21c",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('cu', 14)) mult = mult.times(upgradeEffect('cu', 14))
        if (hasUpgrade('su', 13)) mult = mult.times(2)
        if (hasUpgrade('si', 14)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        if (hasUpgrade('g', 21)) mult = mult.times(upgradeEffect('g', 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Gold",
            body() { return `Now this is the real deal. This isn’t any of that fake Pyrite people confuse it with, this is 100% real gold! Maybe there’s a few other things mixed in there but it’s mostly gold. While it’s extremely valuable, it’s not very good for tools due to how soft this metal is. Though it does grant you some “swag” points when you mine with a gold pickaxe, but in reality this does absolutely nothing beneficial to you.` },
        },
    },
    upgrades: {
        11: {
            title: "Gold Upgrade 1",
            description: "Generate +90% of Coal every second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Gold Upgrade 2",
            description: "Unlock more Iron & Copper upgrades.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('g', 11) }
        },
        13: {
            title: "Gold Upgrade R",
            description: "Unlock Ruby.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('g', 12) }
        },
        14: {
            title: "Gold Upgrade 3",
            description: "2x Copper & Iron.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('r', 13) && hasUpgrade('g', 13) }
        },
        15: {
            title: "Gold Upgrade 4",
            description: "Gold boosts Coal.",
            cost: new Decimal(2000),
            effect() {
                return player[this.layer].points.add(1).pow(0.02)
            },
            tooltip: "Formula: Gold+1^0.02",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('g', 14) }
        },
        21: {
            title: "Gold Upgrade 5",
            description: "Gold boosts itself at a low rate.",
            cost: new Decimal(3000),
            effect() {
                return player.g.points.add(1).pow(0.33)
            },
            tooltip: "Formula: Gold+1^0.33",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('e', 12) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "g", description: "G: Reset for gold",
            onPress() { if (canReset(this.layer)) doReset(this.layer) },
            unlocked() { return hasUpgrade('c', 25) }
        },
    ],
    layerShown() { return player.g.unlocked || hasUpgrade('c', 25) }
})
addLayer("r", {
    name: "ruby", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.g.points = new Decimal(0) },
    color: "#d84064",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ruby", // Name of prestige currency
    baseResource: "gold", // Name of resource prestige is based on
    baseAmount() { return player.g.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 15)) mult = mult.times(1.5)
        if (hasUpgrade('cu', 15)) mult = mult.times(1.5)
        if (hasUpgrade('su', 14)) mult = mult.times(2)
        if (hasUpgrade('si', 13)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Ruby",
            body() { return `A deep-red gemstone which is only really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. When a wizard is heavily influenced by the emotions inflicted by Vulcan’s rage, it is capable of soothing their anger and channeling their peace into equally powerful strength that anger would’ve provided.` },
        },
    },
    upgrades: {
        11: {
            title: "Ruby Upgrade 1",
            description: "Here comes the upgrade you've been waiting for: Coal boosts Stone.",
            effect() {
                return player.c.points.add(1).pow(0.475)
            },
            tooltip: "Formula: Coal+1^0.475",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Ruby Upgrade 2",
            description: "Quality of life, Generate 1% of Iron & Copper every second.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('r', 11) }
        },
        13: {
            title: "Ruby Upgrade 3",
            description: "Unlock more upgrades in the previous ores.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('r', 12) }
        },
        14: {
            title: "Ruby Upgrade S",
            description: "Unlock Sapphire.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade('r', 13) }
        },
        15: {
            title: "Ruby Upgrade A",
            description: "Unlock Amethyst.",
            cost: new Decimal(1e16),
            unlocked() { return hasUpgrade('e', 12) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "r",
            description: "R: Reset for ruby",
            onPress() { if (canReset(this.layer)) doReset(this.layer) },
            unlocked() { return hasUpgrade('g', 13) }
        },
    ],
    layerShown() { return player.r.unlocked || hasUpgrade('g', 13) }
})
addLayer("s", {
    name: "sapphire", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sp", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#1d97d8",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "sapphire", // Name of prestige currency
    baseResource: "ruby", // Name of resource prestige is based on
    baseAmount() { return player.r.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        if (hasUpgrade('i', 21)) mult = mult.times(upgradeEffect('i', 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('m', 11)) total += 1
        return total
    },
    infoboxes: {
        lore: {
            title: "Layer 2: Dreams | Sapphire",
            body() { return `A deep-blue gemstone which only is really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. When a wizard is heavily influenced by the emotions inflicted by [REDACTED]'s sorrow, it is capable of clearing the mind and soothing the thoughts of those influenced by its power.` },
        },
    },
    upgrades: {
        11: {
            title: "Sapphire Upgrade 1",
            description: "Automate most Layer 1 upgrades, 4x stone gain.",
            tooltip: "we just started",
            cost: new Decimal(1),
        },
        12: {
            title: "Sapphire Upgrade Su",
            description: "Unlock Sulfur",
            cost: new Decimal(1),
        },
        13: {
            title: "Sapphire Upgrade Si",
            description: "Unlock Silver",
            cost: new Decimal(1),
        },
        14: {
            title: "Sapphire Upgrade 2",
            description: "Generate +100% of most Layer 1 currencies every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('s', 11) && hasUpgrade('s', 12) && hasUpgrade('s', 13) }
        },
        15: {
            title: "Sapphire Upgrade E",
            description: "Unlock Emerald",
            tooltip: "NOTE: EMERALD REQUIRES 50 SAPPHIRE",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "s",
            description: "S: Reset for sapphire",
            onPress() { if (canReset(this.layer)) doReset(this.layer) },
            unlocked() { return hasUpgrade('r', 14) }
        },
    ],
    layerShown() { return player.s.unlocked || hasUpgrade('r', 14) }
})
addLayer("su", {
    name: "sulfur", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Su", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    resetsNothing: true,
    color: "#cacf6c",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "sulfur", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        if (hasUpgrade('m', 12)) mult = mult.pow(1.7)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('c', 33)) total += 100
        if (hasUpgrade('e', 13)) total += 100
        return total
    },
    autoUpgrade() { return hasUpgrade('e', 13) },
    automate() {
        let layer = 'su'
        if (canBuyBuyable(layer, 11) && hasUpgrade('e', 13)) {
            player[layer].points = player[layer].points.sub(tmp[layer].buyables[11].cost)
            setBuyableAmount(layer, 11, getBuyableAmount(layer, 11).add(1))
        }
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Sulfur",
            body() { return `This common ore has barely any usage to it. It’s often used for matches, fireworks, or gunpowder. With that knowledge, maybe this can be used to create helpful equipment to clear our large areas underground.<br><h3>This layer will not reset anything!</h3>` },
        },
    },
    buyables: {
        11: {
            title: "Sulfur Buyable",
            cost(x) { return new Decimal(1000000).times(buyableEffect(this.layer, this.id).pow(buyableEffect(this.layer, this.id))) }, // i suck at this whole formula thing
            display() { return `1.5x Coal compounding per level.<br>Cost: ${format(this.cost())} Sulfur<br>Effect: x${format(buyableEffect(this.layer, this.id))}` },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() { return true },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return hasUpgrade('su', 14) },
            effect(x) {
                return Decimal.pow(1.5, x);
            }
        },
    },
    upgrades: {
        11: {
            title: "Sulfur Upgrade 1",
            description: "2x Coal",
            cost: new Decimal(2000),
        },
        12: {
            title: "Sulfur Upgrade 2",
            description: "2x Iron & Copper, Unlock a Coal upgrade",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        13: {
            title: "Sulfur Upgrade 3",
            description: "2x Gold",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        14: {
            title: "Sulfur Upgrade 4",
            description: "2x Ruby, Unlock a Sulfur buyable.",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        15: {
            title: "Sulfur Upgrade 5",
            description: "2x Sapphire, Sulfur & Silver",
            cost: new Decimal(100000000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "u", description: "U: Collect sulfur", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('s', 12) } },
    ],
    layerShown() { return player.su.unlocked || hasUpgrade('s', 12) }
})
addLayer("si", {
    name: "silver", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ag", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.i.points = new Decimal(0) },
    color: "#dfdfdf",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "silver", // Name of prestige currency
    baseResource: "iron", // Name of resource prestige is based on
    baseAmount() { return player.i.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        if (hasUpgrade('e', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('c', 34)) total += 1
        if (hasUpgrade('e', 13)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('e', 13) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Silver",
            body() { return `While used for basic things like jewelry or silverware, it has magical properties that cause more damage to the undead than regular materials. It is unknown as to why this happens, however hunters find silver bullets to be the best use of silver, as plentiful amounts of them can be made and deal as much, or maybe more, damage as a sword made of silver.<br><h3>This layer will reset Iron!</h3>` },
        },
    },
    upgrades: {
        11: {
            title: "Silver Upgrade 1",
            description: "4x Iron.",
            cost: new Decimal(3),
        },
        12: {
            title: "Silver Upgrade 2",
            description: "2x Copper, Silver boosts Coal.",
            cost: new Decimal(10),
            effect() {
                return player.si.points.add(1).pow(0.5)
            },
            tooltip: "Formula: Silver+1^0.5",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        13: {
            title: "Silver Upgrade 3",
            description: "2x Ruby, Unlocks a Coal upgrade.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        14: {
            title: "Silver Upgrade 4",
            description: "3x Gold.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        15: {
            title: "Silver Upgrade 5",
            description: "2x Sapphire, Sulfur & Silver",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "v", description: "V: Reset for silver", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('s', 13) } },
    ],
    layerShown() { return player.si.unlocked || hasUpgrade('s', 13) }
})
addLayer("e", {
    name: "emerald", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#0ed8a6",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "emerald", // Name of prestige currency
    baseResource: "sapphire", // Name of resource prestige is based on
    baseAmount() { return player.s.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('cu', 21)) mult = mult.times(upgradeEffect('cu', 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 3: Cavern | Emerald",
            body() { return `A deep-green gemstone which only is really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. Oftentimes, Wizards are lost in thought and impacted both by rage or sorrow. However Emeralds are capable of stimulating both the mind and heart, and leaves the user to emotionally heal, letting Daegel’s joy assist them on their journey.` },
        },
    },
    upgrades: {
        11: {
            title: "Emerald Upgrade 1",
            description: "10x Layer 1-2 currencies.",
            cost: new Decimal(1),
        },
        12: {
            title: "Emerald Upgrade 2",
            description: "Unlocks more Layer 1-2 upgrades.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        13: {
            title: "Emerald Upgrade 3",
            description: "Automates Sulfur and Silver, 25x stone gain.",
            cost: new Decimal(5000000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "e", description: "E: Reset for emerald", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('s', 15) } },
    ],
    layerShown() { return player.e.unlocked || hasUpgrade('s', 15) }
})
addLayer("a", {
    name: "amethyst", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#af0eff",
    requires: new Decimal(1e35), // Can be a function that takes requirement increases into account
    resource: "amethyst", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.5, // Prestige currency exponent
    resetsNothing() { return hasUpgrade('o', 11) },
    autoPrestige() { return hasUpgrade('o', 11) },
    canBuyMax() { return hasUpgrade('o', 12) },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 0: Surface | Amethyst",
            body() { return `Besides Azure, this is one of the greatest magical minerals within the Azure Mines. Though Azure has various mystical properties, Amethyst happens to only be good for Dark Magic or Necromancy. These magical usages have been told to have created an evil-based Amethyst. If it is real, it has not yet been located within the mines, but theories have supported its existence.` },
        },
    },
    milestones: {
        0: {
            requirementDescription: "3 amethyst",
            effectDescription: "^1.4 Coal.",
            done() { return player.a.points.gte(3) }
        },
        1: {
            requirementDescription: "10 amethyst",
            effectDescription: "75x stone gain.",
            done() { return player.a.points.gte(10) }
        },
        2: {
            requirementDescription: "12 amethyst",
            effectDescription: "Unlock Opal.",
            done() { return player.a.points.gte(12) }
        }
    },
    upgrades: {
        11: {
            title: "Amethyst Upgrade 1",
            description: "^1.04 Coal.",
            cost: new Decimal(13),
            unlocked() { return hasUpgrade('o', 12) }
        },
        12: {
            title: "Amethyst Upgrade M",
            description: "Unlocks Moonstone, gain 100% of Opal per second.",
            onPurchase() { player.m.unlocked = true },
            cost: new Decimal(15),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        { key: "a", description: "A: Reset for amethyst", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('r', 15) } },
    ],
    layerShown() { return player.a.unlocked || hasUpgrade('r', 15) }
})
addLayer("o", {
    name: "opal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#fa6585",
    requires: new Decimal(12), // Can be a function that takes requirement increases into account
    resource: "opal", // Name of prestige currency
    baseResource: "amethyst", // Name of resource prestige is based on
    baseAmount() { return player.a.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('a', 12)) total += 1
        return total
    },
    onPrestige() { player.a.points = new Decimal(0) },
    infoboxes: {
        lore: {
            title: "Layer 0: Surface | Opal",
            body() { return `While this is a precious gemstone, it is only a common form of Opal. More precious forms of Opal have yet to be discovered in the Azure Mines, and mineral experts suspect such Opals do not exist here, or have not yet formed. Maybe we haven’t been looking in the right places, perhaps.` },
        },
    },
    upgrades: {
        11: {
            title: "Opal Upgrade 1",
            description: "Automatically reset for Amethyst, Amethyst resets nothing.",
            cost: new Decimal(1),
        },
        12: {
            title: "Opal Upgrade 2",
            description: "Unlocks Amethyst upgrades, you can buy max Amethyst.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        { key: "o", description: "O: Reset for opal", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('s', 21) } },
    ],
    layerShown() { return player.o.unlocked || hasMilestone('a', 2) }
})
addLayer("m", {
    name: "moonstone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#c9f2f4",
    requires: new Decimal(200000000), // Can be a function that takes requirement increases into account
    resource: "moonstone", // Name of prestige currency
    baseResource: "emerald", // Name of resource prestige is based on
    baseAmount() { return player.e.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        return total
    },
    onPrestige() { player.e.points = new Decimal(0) },
    infoboxes: {
        lore: {
            title: "Layer 0: Surface | Moonstone",
            body() { return `The moon defends our world from a lot of asteroids, taking the impact most of the time. When this happens, small fragments of the moon make its way to the surface of the world. This only is found on the surface, making it quite a rare and valuable ore to treasure, make jewelry, or even make tools out of.` },
        },
    },
    upgrades: {
        11: {
            title: "Moonstone Upgrade 1",
            description: "Generate 100% of Sapphire every second, Unlock Diamond.",
            cost: new Decimal(1),
        },
        12: {
            title: "Moonstone Upgrade 2",
            description: "^1.7 Sulfur gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        { key: "m", description: "M: Reset for moonstone", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('a', 12) } },
    ],
    layerShown() { return player.m.unlocked || hasUpgrade('a', 12) }
})
addLayer("d", {
    name: "diamond", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            total: new Decimal(0)
        }
    },
    color: "#15f0e9",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "diamond", // Name of prestige currency
    baseResource: "emerald", // Name of resource prestige is based on
    baseAmount() { return player.e.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    onPrestige() { player.d.points = new Decimal(0) },
    infoboxes: {
        lore: {
            title: "Layer 3: Cavern | Diamond",
            body() { return `Prior to the Yellowstone eruption, Diamonds have always been something most people considered to be the most prized gemstone to ever exist. Though they were wrong, as mining has been made a tradition in our generations, making Diamonds easily accessible not only to businesses, but to the common folk as well.` },
        },
    },
    upgrades: {
        11: {
            title: "Diamond Upgrade 1",
            description: "Total diamond boosts stone gain, plus 100",
            effect() {
                return player[this.layer].total.add(1).pow(0.4).add(100)
            },
            tooltip: "Formula: Diamond+1^0.4+100",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(1),
        }
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    displayRow: 3,
    hotkeys: [
        { key: "d", description: "D: Reset for diamond", onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return hasUpgrade('m', 11) } },
    ],
    layerShown() { return player.d.unlocked | hasUpgrade('m', 11) }
})
