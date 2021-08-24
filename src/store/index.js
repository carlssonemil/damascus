import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// The LocalStorage token
const token = process.env.NODE_ENV === 'production' ? 'damascus' : 'damascus-dev';

// The default progress object
const defaultProgress = {
  'Spray Paint': false,
  'Woodland': false,
  'Digital': false,
  'Dragon': false,
  'Splinter': false,
  'Topo': false,
  'Tiger': false,
  'Stripes': false,
  'Reptile': false,
  'Skulls': false
}

// The default mastery object
const defaultMastery = {
  'Obsidian': false
}

// The default challenges progress
const defaultChallenges = (category, weapon) => {
  switch (category) {
    case 'Assault Rifle':
    case 'Submachine Gun':
    case 'Shotgun':
    case 'Light Machine Gun':
    case 'Marksman Rifle':
    case 'Sniper Rifle':
    case 'Handgun':
      return [
        {
          category: 'Kill',
          level: 'Gold',
          completed: false
        },
        {
          category: 'Kill',
          level: 'Damascus',
          completed: false
        },
        {
          category: 'Headshot',
          level: 'Platinum',
          completed: false
        },
        {
          category: 'Headshot',
          level: 'Obsidian',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Gold',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Platinum',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Damascus',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Obsidian',
          completed: false
        }
      ];

    case 'Melee':
      if (weapon === 'Combat Knife' || weapon === 'Kali Sticks' || weapon === 'Dual Kodachis') {
        return [
          {
            category: 'Kill',
            level: 'Gold',
            completed: false
          },
          {
            category: 'Kill',
            level: 'Damascus',
            completed: false
          },
          {
            category: 'Double Kill',
            level: 'Platinum',
            completed: false
          },
          {
            category: 'Double Kill',
            level: 'Obsidian',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Gold',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Platinum',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Damascus',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Obsidian',
            completed: false
          }
        ];
      } else if (weapon === 'Riot Shield') {
        return [
          {
            category: 'Kill',
            level: 'Gold',
            completed: false
          },
          {
            category: 'Kill',
            level: 'Damascus',
            completed: false
          },
          {
            category: 'Survival',
            level: 'Platinum',
            completed: false
          },
          {
            category: 'Survival',
            level: 'Obsidian',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Gold',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Platinum',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Damascus',
            completed: false
          },
          {
            category: 'Skill',
            level: 'Obsidian',
            completed: false
          }
        ];
      } else {
        console.error(`Parameter 'weapon' with value '${weapon}' was not found.`);
        break;
      }

    case 'Launcher':
      return [
        {
          category: 'Vehicle Destruction',
          level: 'Gold',
          completed: false
        },
        {
          category: 'Vehicle Destruction',
          level: 'Damascus',
          completed: false
        },
        {
          category: 'Double Kill',
          level: 'Platinum',
          completed: false
        },
        {
          category: 'Double Kill',
          level: 'Obsidian',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Gold',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Platinum',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Damascus',
          completed: false
        },
        {
          category: 'Skill',
          level: 'Obsidian',
          completed: false
        }
      ];

    default:
      console.error(`Parameter 'category' with value '${category}' was not found.`);
      break;
  }
}

// The default filters object
const defaultFilters = {
  weapons: {
    category: null,
    hideNonRequired: false,
    hideCompleted: false
  },
  reticles: {
    category: null,
    hideCompleted: false
  },
  challenges: {
    category: null,
    hideCompleted: false
  }
}

function challengeReq(strings, count, attachCount) {
  let attachPrefix = attachCount !== undefined ? `Using ${attachCount} Attachments, ` : '';
  return `${attachPrefix}${strings[0]} ${count} ${strings[1]}`;
}

const challengeTypes = {
  adsNoStock: ['Get', 'Aiming Down Sight Kills with the No Stock attachment option selected'],
  adsFoldedStock: ['Get', 'Aiming Down Sight Kills with the Folded Stock selected'],
  adsLaser: ['Get', 'Kills while Aiming Down Sights and using a Laser attachment'],
  scoutLongshot: ['Get', 'Longshot Kills while using the Scout Combat Optic'],
  behindEnemy: ['Get', 'Kills while behind the enemy'],
  akimboReflex: ['Get', 'Kills using the Akimbo weapon perk and a Reflex Optic'],
  aerialVehicle: ['Destroy', 'Aerial Vehicles'],
  sliding: ['Get', 'Kills while sliding'],
  quickscope: ['Get', 'Quickscope Kills'],
  buzzkill: ['Get', 'Buzzkills (End Enemy Streaks)'],
  crouching: ['Get', 'Kills while crouching'],
  inSmoke: ['Get', 'Kills while in smoke'],
  scoutOptic: ['Get', 'Kills while using a Scout Combat Optic'],
  sniperScope: ['Get', 'Kills while using a sniper scope'], // not capitalised in-game
  hipfire: ['Get', 'Hipfire Kills'],
  longshot: ['Get', 'Longshot Kills'],
  pointBlankHeadshot: ['Get', 'Point Blank Headshot Kills'],
  slidingHeadshot: ['Get', 'Headshot Kills while sliding'],
  inSmokeHeadshot: ['Get', 'Headshot Kills while in smoke'],
  crouchingHeadshot: ['Get', 'Headshot Kills while crouching'],
  mountedLongshot: ['Get', 'Mounted Longshot Kills'],
  threeStreakTracker: ['Get', 'Kills without dying and while using the Tracker Perk 10 times'],
  doubleKillTracker: ['Get', 'Double Kills while using the Tracker Perk'],
}

export default new Vuex.Store({
  state: {
    // Weapons
    weapons: [],

    // Reticles
    reticles: [],

    // Camouflages
    camos: [
      {
        name: 'Spray Paint',
        requirements: {
          'Assault Rifle': '800 Kills',
          'Submachine Gun': {
            'AUG': '500 Kills',
            'P90': '500 Kills',
            'MP5': '500 Kills',
            'Uzi': '500 Kills',
            'PP19 Bizon': '500 Kills',
            'MP7': '500 Kills',
            'Striker 45': '500 Kills',
            'Fennec': '250 Kills',
            'ISO': '250 Kills'
          },
          'Shotgun': '400 Kills',
          'Light Machine Gun': '525 Kills',
          'Marksman Rifle': '450 Kills',
          'Sniper Rifle': '450 Kills',
          'Melee': '200 Kills',
          'Handgun': '250 Kills',
          'Launcher': '125 Kills'
        }
      },
      {
        name: 'Woodland',
        requirements: {
          'Assault Rifle': '125 Headshot Kills',
          'Submachine Gun': {
            'AUG': '100 Headshot Kills',
            'P90': '100 Headshot Kills',
            'MP5': '100 Headshot Kills',
            'Uzi': '100 Headshot Kills',
            'PP19 Bizon': '100 Headshot Kills',
            'MP7': '100 Headshot Kills',
            'Striker 45': '100 Headshot Kills',
            'Fennec': '50 Headshot Kills',
            'ISO': '50 Headshot Kills'
          },
          'Shotgun': '75 Crouching Kills',
          'Light Machine Gun': '75 Headshot Kills',
          'Marksman Rifle': '60 Headshot Kills',
          'Sniper Rifle': '60 Headshot Kills',
          'Melee': '50 Kills while injured',
          'Handgun': '50 Headshot Kills',
          'Launcher': '40 Attacker Kills'
        }
      },
      {
        name: 'Digital',
        requirements: {
          'Assault Rifle': '160 Crouching Kills',
          'Submachine Gun': {
            'AUG': '110 Crouching Kills',
            'P90': '110 Crouching Kills',
            'MP5': '110 Crouching Kills',
            'Uzi': '110 Crouching Kills',
            'PP19 Bizon': '110 Crouching Kills',
            'MP7': '110 Crouching Kills',
            'Striker 45': '110 Crouching Kills',
            'Fennec': '40 Crouching Kills',
            'ISO': '40 Crouching Kills'
          },
          'Shotgun': '75 Hipfire Kills',
          'Light Machine Gun': '65 Crouching Kills',
          'Marksman Rifle': '50 Crouching Kills',
          'Sniper Rifle': '50 Crouching Kills',
          'Melee': '50 Kills from behind',
          'Handgun': '40 Crouching Kills',
          'Launcher': '40 Defender Kills'
        }
      },
      {
        name: 'Dragon',
        requirements: {
          'Assault Rifle': '75 Hipfire Kills',
          'Submachine Gun': {
            'AUG': '100 Hipfire Kills',
            'P90': '100 Hipfire Kills',
            'MP5': '100 Hipfire Kills',
            'Uzi': '100 Hipfire Kills',
            'PP19 Bizon': '100 Hipfire Kills',
            'MP7': '100 Hipfire Kills',
            'Striker 45': '100 Hipfire Kills',
            'Fennec': '30 Hipfire Kills',
            'ISO': '30 Hipfire Kills'
          },
          'Shotgun': '50 Point Blank Kills',
          'Light Machine Gun': '45 Hipfire Kills',
          'Marksman Rifle': '50 One Shot Kills',
          'Sniper Rifle': '50 One Shot Kills',
          'Melee': '30 Kills while using Dead Silence',
          'Handgun': '30 Hipfire Kills',
          'Launcher': '75 Aerial Killstreaks Destroyed'
        }
      },
      {
        name: 'Splinter',
        requirements: {
          'Assault Rifle': '100 Longshot Kills',
          'Submachine Gun': {
            'AUG': '50 Longshot Kills',
            'P90': '50 Longshot Kills',
            'MP5': '50 Longshot Kills',
            'Uzi': '50 Longshot Kills',
            'PP19 Bizon': '50 Longshot Kills',
            'MP7': '50 Longshot Kills',
            'Striker 45': '50 Longshot Kills',
            'Fennec': '30 Longshot Kills',
            'ISO': '30 Longshot Kills'
          },
          'Shotgun': {
            'Model 680': '50 Headshot Kills',
            'R9-0': '50 Headshot Kills',
            '725': '50 Longshot Kills',
            'Origin 12': '50 Headshot Kills',
            'VLK Rogue': '50 Headshot Kills',
            'JAK-12': '50 Headshot Kills'
          },
          'Light Machine Gun': '45 Longshot Kills',
          'Marksman Rifle': {
            'EBR-14': '150 Kills while using all attachments',
            'MK2 Carbine': '150 Kills while using all attachments',
            'Kar98k': '150 Kills while using all attachments',
            'Crossbow': '150 Kills while using all attachments',
            'SKS': '150 Kills while using all attachments',
            'SP-R 208': '50 Longshot Kills'
          },
          'Sniper Rifle': '150 Kills while using all attachments',
          'Melee': '50 Crouching Kills',
          'Handgun': '30 Longshot Kills',
          'Launcher': '75 Ground vehicles destroyed'
        }
      },
      {
        name: 'Topo',
        requirements: {
          'Assault Rifle': '100 Mounted Kills',
          'Submachine Gun': {
            'AUG': '50 Mounted Kills',
            'P90': '50 Mounted Kills',
            'MP5': '50 Mounted Kills',
            'Uzi': '50 Mounted Kills',
            'PP19 Bizon': '50 Mounted Kills',
            'MP7': '50 Mounted Kills',
            'Striker 45': '50 Mounted Kills',
            'Fennec': '25 Double Kills',
            'ISO': '25 Double Kills'
          },
          'Shotgun': '225 Kills while using all attachments',
          'Light Machine Gun': '45 Mounted Kills',
          'Marksman Rifle': {
            'EBR-14': '50 Longshot Kills',
            'MK2 Carbine': '50 Longshot Kills',
            'Kar98k': '50 Longshot Kills',
            'Crossbow': '50 Longshot Kills',
            'SKS': '25 Double Kills',
            'SP-R 208': '25 Double Kills'
          },
          'Sniper Rifle': '50 Longshot Kills',
          'Melee': {
            'Riot Shield': '25 2-streaks',
            'Combat Knife': '25 Double Kills',
            'Kali Sticks': '25 Double Kills',
            'Dual Kodachis': '25 Double Kills'
          },
          'Handgun': '25 Double Kills',
          'Launcher': '50 Equipment, killstreaks, or vehicles destroyed'
        }
      },
      {
        name: 'Tiger',
        requirements: {
          'Assault Rifle': '180 Kills while using all attachments',
          'Submachine Gun': {
            'AUG': '250 Kills while using all attachments',
            'P90': '250 Kills while using all attachments',
            'MP5': '250 Kills while using all attachments',
            'Uzi': '250 Kills while using all attachments',
            'PP19 Bizon': '250 Kills while using all attachments',
            'MP7': '250 Kills while using all attachments',
            'Striker 45': '250 Kills while using all attachments',
            'Fennec': '110 Kills while using all attachments',
            'ISO': '110 Kills while using all attachments'
          },
          'Shotgun': '25 Double Kills',
          'Light Machine Gun': '180 Kills while using all attachments',
          'Marksman Rifle': {
            'EBR-14': '50 Mounted Kills',
            'MK2 Carbine': '50 Mounted Kills',
            'Kar98k': '50 Mounted Kills',
            'Crossbow': '50 Mounted Kills',
            'SKS': '50 Mounted Kills',
            'SP-R 208': '150 Kills while using all attachments'
          },
          'Sniper Rifle': '50 Mounted Kills',
          'Melee': '50 Kills near smoke',
          'Handgun': '110 Kills while using all attachments',
          'Launcher': '50 Supportstreaks destroyed'
        }
      },
      {
        name: 'Stripes',
        requirements: {
          'Assault Rifle': '50 Kills shortly after reload',
          'Submachine Gun': {
            'AUG': '40 Kills shortly after reload',
            'P90': '40 Kills shortly after reload',
            'MP5': '40 Kills shortly after reload',
            'Uzi': '40 Kills shortly after reload',
            'PP19 Bizon': '40 Kills shortly after reload',
            'MP7': '40 Kills shortly after reload',
            'Striker 45': '40 Kills shortly after reload',
            'Fennec': '25 Kills shortly after reload',
            'ISO': '25 Kills shortly after reload'
          },
          'Shotgun': '30 Kills shortly after reload',
          'Light Machine Gun': '30 Double Kills',
          'Marksman Rifle': {
            'EBR-14': '25 Double Kills',
            'MK2 Carbine': '25 Double Kills',
            'Kar98k': '25 Double Kills',
            'Crossbow': '25 Double Kills',
            'SKS': '25 Double Kills',
            'SP-R 208': '50 Mounted Kills'
          },
          'Sniper Rifle': '25 Double Kills',
          'Melee': '10 Buzzkills',
          'Handgun': '25 Kills shortly after reload',
          'Launcher': '50 Killstreaks destroyed'
        }
      },
      {
        name: 'Reptile',
        requirements: {
          'Assault Rifle': '110 Kills while using no attachments',
          'Submachine Gun': '75 Kills while using no attachments',
          'Shotgun': '110 Kills while using no attachments',
          'Light Machine Gun': '75 Kills while using no attachments',
          'Marksman Rifle': '75 Kills while using no attachments',
          'Sniper Rifle': '75 Kills while using no attachments',
          'Melee': '25 Finisher Kills',
          'Handgun': '75 Kills while using no attachments',
          'Launcher': '50 kills with Amped perk'
        }
      },
      {
        name: 'Skulls',
        requirements: {
          'Assault Rifle': '35 3-streaks',
          'Submachine Gun': '25 3-streaks',
          'Shotgun': '30 3-streaks',
          'Light Machine Gun': '25 3-streaks',
          'Marksman Rifle': '25 3-streaks',
          'Sniper Rifle': '25 3-streaks',
          'Melee': {
            'Riot Shield': '25 3-streaks',
            'Combat Knife': '10 3-streaks',
            'Kali Sticks': '10 3-streaks',
            'Dual Kodachis': '10 3-streaks'
          },
          'Handgun': '25 3-streaks',
          'Launcher': '50 vehicles destroyed'
        }
      },
      {
        name: 'Obsidian',
        requirements: {
          'Assault Rifle': {
            'Kilo 141': 'Kill 15 enemies in a match 200 times',
            'FAL': 'Kill 15 enemies in a match 200 times',
            'M4A1': 'Kill 15 enemies in a match 200 times',
            'FR 5.56': 'Kill 15 enemies in a match 200 times',
            'Oden': 'Kill 15 enemies in a match 200 times',
            'M13': 'Kill 15 enemies in a match 200 times',
            'FN Scar 17': 'Kill 15 enemies in a match 200 times',
            'AK-47': 'Kill 15 enemies in a match 200 times',
            'RAM-7': 'Kill 15 enemies in a match 150 times',
            'Grau 5.56': 'Kill 15 enemies in a match 200 times',
            'CR-56 AMAX': 'Kill 15 enemies in a match 200 times',
            'AN-94': 'Kill 15 enemies in a match 200 times',
            'AS VAL': 'Kill 15 enemies in a match 200 times'
          },
          'Submachine Gun': 'Kill 15 enemies in a match 150 times',
          'Shotgun': 'Kill 15 enemies in a match 150 times',
          'Light Machine Gun': 'Kill 15 enemies in a match 150 times',
          'Marksman Rifle': 'Kill 15 enemies in a match 150 times',
          'Sniper Rifle': 'Kill 15 enemies in a match 125 times',
          'Melee': {
            'Riot Shield': 'Kill 750 Enemies',
            'Combat Knife': 'Kill 10 enemies in a match 125 times',
            'Kali Sticks': 'Kill 10 enemies in a match 125 times',
            'Dual Kodachis': 'Kill 10 enemies in a match 125 times'
          },
          'Handgun': 'Kill 15 enemies in a match 100 times',
          'Launcher': {
            'RPG-7': 'Kill 5 enemies in a match 150 times',
            'PILA': 'Destroy a vehicle or Killstreak 100 times',
            'Strela-P': 'Destroy a vehicle or Killstreak 100 times',
            'JOKR': 'Destroy a vehicle or Killstreak 100 times'
          }
        }
      }
    ],

    // Challenges
    challenges: [
      // Kill
      {
        category: 'Kill',
        levels: {
          'Gold': {
            'Assault Rifle': 'Get 500 Kills',
            'Submachine Gun': 'Get 500 Kills',
            'Shotgun': 'Get 500 Kills',
            'Light Machine Gun': 'Get 500 Kills',
            'Marksman Rifle': 'Get 500 Kills',
            'Sniper Rifle': 'Get 500 Kills',
            'Melee': 'Get 500 Kills',
            'Handgun': 'Get 500 Kills'
          },
          'Damascus': {
            'Assault Rifle': 'Get 2000 Kills',
            'Submachine Gun': 'Get 2000 Kills',
            'Shotgun': 'Get 2000 Kills',
            'Light Machine Gun': 'Get 2000 Kills',
            'Marksman Rifle': 'Get 2000 Kills',
            'Sniper Rifle': 'Get 2000 Kills',
            'Melee': {
              'Combat Knife': 'Get 2000 Kills',
              'Riot Shield': 'Get 1250 Kills',
              'Kali Sticks': 'Get 2000 Kills',
              'Dual Kodachis': 'Get 2000 Kills'
            },
            'Handgun': 'Get 2000 Kills'
          }
        }
      },

      // Vehicle Destruction
      {
        category: 'Vehicle Destruction',
        levels: {
          'Gold': {
            'Launcher': 'Destroy 200 Vehicles or Killstreaks'
          },
          'Damascus': {
            'Launcher': 'Destroy 800 Vehicles or Killstreaks'
          }
        }
      },

      // Headshot
      {
        category: 'Headshot',
        levels: {
          'Platinum': {
            'Assault Rifle': 'Get 250 Headshots',
            'Submachine Gun': 'Get 250 Headshots',
            'Shotgun': 'Get 250 Headshots',
            'Light Machine Gun': 'Get 250 Headshots',
            'Marksman Rifle': 'Get 250 Headshots',
            'Sniper Rifle': 'Get 250 Headshots',
            'Handgun': 'Get 250 Headshots'
          },
          'Obsidian': {
            'Assault Rifle': 'Get 750 Headshots',
            'Submachine Gun': 'Get 750 Headshots',
            'Shotgun': 'Get 750 Headshots',
            'Light Machine Gun': 'Get 750 Headshots',
            'Marksman Rifle': 'Get 750 Headshots',
            'Sniper Rifle': 'Get 750 Headshots',
            'Handgun': 'Get 750 Headshots'
          }
        }
      },

      // Survival
      {
        category: 'Survival',
        levels: {
          'Platinum': {
            'Melee': {
              'Riot Shield': 'Get 2 kills without dying 100 times'
            },
          },
          'Obsidian': {
            'Melee': {
              'Riot Shield': 'Get 2 kills without dying 200 times'
            },
          }
        }
      },

      // Double Kill
      {
        category: 'Double Kill',
        levels: {
          'Platinum': {
            'Melee': {
              'Combat Knife': 'Get a Double kill 100 times',
              'Kali Sticks': 'Get a Double kill 100 times',
              'Dual Kodachis': 'Get a Double kill 100 times'
            },
            'Launcher': 'Get a Double kill 75 times'
          },
          'Obsidian': {
            'Melee': {
              'Combat Knife': 'Get a Double kill 300 times',
              'Kali Sticks': 'Get a Double kill 300 times',
              'Dual Kodachis': 'Get a Double kill 300 times'
            },
            'Launcher': 'Get a Double kill 325 times'
          }
        }
      },

      // Skill
      {
        category: 'Skill',
        levels: {
          'Gold': {
            'Assault Rifle': {
              'Kilo 141':challengeReq(challengeTypes.adsNoStock, 75),
              'FAL': challengeReq(challengeTypes.adsNoStock, 75),
              'M4A1': challengeReq(challengeTypes.adsNoStock, 75),
              'FR 5.56': challengeReq(challengeTypes.adsLaser, 75),
              'Oden': challengeReq(challengeTypes.adsLaser, 75),
              'M13': challengeReq(challengeTypes.adsNoStock, 75),
              'FN Scar 17': challengeReq(challengeTypes.adsLaser, 75),
              'AK-47': challengeReq(challengeTypes.adsNoStock, 75),
              'RAM-7': challengeReq(challengeTypes.adsLaser, 75),
              'Grau 5.56': challengeReq(challengeTypes.adsNoStock, 75),
              'CR-56 AMAX': challengeReq(challengeTypes.adsNoStock, 75),
              'AN-94': challengeReq(challengeTypes.adsFoldedStock, 75),
              'AS VAL': challengeReq(challengeTypes.adsNoStock, 75),
            },
            'Submachine Gun': {
              'AUG': challengeReq(challengeTypes.adsLaser, 50),
              'P90': challengeReq(challengeTypes.adsLaser, 50),
              'MP5': challengeReq(challengeTypes.adsLaser, 50),
              'Uzi': challengeReq(challengeTypes.adsNoStock, 50),
              'PP19 Bizon': challengeReq(challengeTypes.adsNoStock, 50),
              'MP7': challengeReq(challengeTypes.adsNoStock, 50),
              'Striker 45': challengeReq(challengeTypes.adsLaser, 50),
              'Fennec': challengeReq(challengeTypes.adsLaser, 50),
              'ISO': challengeReq(challengeTypes.adsLaser, 50),
            },
            'Shotgun': {
              'Model 680': challengeReq(challengeTypes.adsNoStock, 50),
              'R9-0': challengeReq(challengeTypes.adsLaser, 50),
              '725': challengeReq(challengeTypes.adsLaser, 50),
              'Origin 12': challengeReq(challengeTypes.adsNoStock, 50),
              'VLK Rogue': challengeReq(challengeTypes.adsNoStock, 50),
              'JAK-12': challengeReq(challengeTypes.adsNoStock, 50),
            },
            'Light Machine Gun': {
              'PKM': challengeReq(challengeTypes.adsNoStock, 50),
              'SA87': challengeReq(challengeTypes.adsLaser, 50),
              'M91': challengeReq(challengeTypes.adsNoStock, 50),
              'MG34': challengeReq(challengeTypes.adsNoStock, 50),
              'Holger-26': challengeReq(challengeTypes.adsNoStock, 50),
              'Bruen Mk9': challengeReq(challengeTypes.adsNoStock, 50),
              'FiNN': challengeReq(challengeTypes.adsNoStock, 50),
            },
            'Marksman Rifle': challengeReq(challengeTypes.scoutLongshot, 5),
            'Sniper Rifle': challengeReq(challengeTypes.scoutLongshot, 5),
            'Melee':  challengeReq(challengeTypes.behindEnemy, 50),
            'Handgun': challengeReq(challengeTypes.akimboReflex, 50),
            'Launcher': challengeReq(challengeTypes.aerialVehicle, 20),
          },
          'Platinum': {
            'Assault Rifle': challengeReq(challengeTypes.sliding, 50),
            'Submachine Gun': challengeReq(challengeTypes.sliding, 50),
            'Shotgun': challengeReq(challengeTypes.sliding, 75),
            'Light Machine Gun': challengeReq(challengeTypes.sliding, 25),
            'Marksman Rifle': {
              'EBR-14': challengeReq(challengeTypes.quickscope, 75),
              'MK2 Carbine': challengeReq(challengeTypes.quickscope, 75),
              'Kar98k': challengeReq(challengeTypes.quickscope, 75),
              'Crossbow': challengeReq(challengeTypes.quickscope, 25),
              'SKS': challengeReq(challengeTypes.quickscope, 75),
              'SP-R 208': challengeReq(challengeTypes.quickscope, 75)
            },
            'Sniper Rifle': challengeReq(challengeTypes.quickscope, 75),
            'Melee': {
              'Combat Knife': challengeReq(challengeTypes.sliding, 25),
              'Riot Shield': challengeReq(challengeTypes.buzzkill, 25),
              'Kali Sticks': challengeReq(challengeTypes.sliding, 25),
              'Dual Kodachis': challengeReq(challengeTypes.sliding, 25),
            },
            'Handgun': challengeReq(challengeTypes.sliding, 30),
            'Launcher': challengeReq(challengeTypes.buzzkill, 10),
          },
          'Damascus': {
            'Assault Rifle': challengeReq(challengeTypes.crouching, 75),
            'Submachine Gun': challengeReq(challengeTypes.inSmoke, 25),
            'Shotgun': {
              'Model 680': challengeReq(challengeTypes.scoutOptic, 75),
              'R9-0': challengeReq(challengeTypes.scoutOptic, 75),
              '725': challengeReq(challengeTypes.sniperScope, 75),
              'Origin 12': challengeReq(challengeTypes.scoutOptic, 75),
              'VLK Rogue': challengeReq(challengeTypes.scoutOptic, 75),
              'JAK-12': challengeReq(challengeTypes.scoutOptic, 75),
            },
            'Light Machine Gun': challengeReq(challengeTypes.hipfire, 25),
            'Marksman Rifle': {
              'EBR-14': challengeReq(challengeTypes.hipfire, 10),
              'MK2 Carbine': challengeReq(challengeTypes.hipfire, 10),
              'Kar98k': challengeReq(challengeTypes.hipfire, 10),
              'Crossbow': challengeReq(challengeTypes.hipfire, 75),
              'SKS': challengeReq(challengeTypes.hipfire, 75),
              'SP-R 208': challengeReq(challengeTypes.hipfire, 75)
            },
            'Sniper Rifle': challengeReq(challengeTypes.hipfire, 10),
            'Melee': challengeReq(challengeTypes.inSmoke, 75),
            'Handgun': challengeReq(challengeTypes.inSmoke, 75),
            'Launcher': challengeReq(challengeTypes.longshot, 20),
          },
          'Obsidian': {
            'Assault Rifle': challengeReq(challengeTypes.pointBlankHeadshot, 25, 4),
            'Submachine Gun': challengeReq(challengeTypes.slidingHeadshot, 5, 3),
            'Shotgun': challengeReq(challengeTypes.inSmokeHeadshot, 10, 4),
            'Light Machine Gun': challengeReq(challengeTypes.crouchingHeadshot, 25, 3),
            'Marksman Rifle': challengeReq(challengeTypes.mountedLongshot, 25, 2),
            'Sniper Rifle': challengeReq(challengeTypes.mountedLongshot, 25, 2),
            'Melee': {
              'Combat Knife': challengeReq(challengeTypes.doubleKillTracker, 10),
              'Riot Shield': challengeReq(challengeTypes.threeStreakTracker, 10),
              'Kali Sticks': challengeReq(challengeTypes.doubleKillTracker, 10),
              'Dual Kodachis': challengeReq(challengeTypes.doubleKillTracker, 10)
            },
            'Handgun': challengeReq(challengeTypes.pointBlankHeadshot, 75, 3),
            'Launcher': challengeReq(challengeTypes.doubleKillTracker, 10),
          },
        }
      },
    ],

    // Filters
    filters: {
      ...defaultFilters
    },

    // Default values
    defaults: {
      weapons: [
        {
          category: 'Assault Rifle',
          alias: 'Alpha',
          name: 'Kilo 141',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Bravo',
          name: 'FAL',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Charlie',
          name: 'M4A1',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Delta',
          name: 'FR 5.56',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Echo',
          name: 'Oden',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Foxtrot',
          name: 'M13',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Golf',
          name: 'FN Scar 17',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Hotel',
          name: 'AK-47',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'India',
          name: 'RAM-7',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Juliet',
          name: 'Grau 5.56',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Kilo',
          name: 'CR-56 AMAX',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Lima',
          name: 'AN-94',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Mike',
          name: 'AS VAL',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Assault Rifle')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Alpha',
          name: 'AUG',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Bravo',
          name: 'P90',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Charlie',
          name: 'MP5',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Delta',
          name: 'Uzi',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Echo',
          name: 'PP19 Bizon',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Foxtrot',
          name: 'MP7',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Golf',
          name: 'Striker 45',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Hotel',
          name: 'Fennec',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'India',
          name: 'ISO',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Juliet',
          name: 'CX-9',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Submachine Gun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Alpha',
          name: 'Model 680',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Bravo',
          name: 'R9-0',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Charlie',
          name: '725',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Delta',
          name: 'Origin 12',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Echo',
          name: 'VLK Rogue',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Shotgun',
          alias: 'Foxtrot',
          name: 'JAK-12',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Shotgun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Alpha',
          name: 'PKM',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Bravo',
          name: 'SA87',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Charlie',
          name: 'M91',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Delta',
          name: 'MG34',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Echo',
          name: 'Holger-26',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Foxtrot',
          name: 'Bruen Mk9',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Golf',
          name: 'FiNN',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Hotel',
          name: 'RAAL MG',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Light Machine Gun')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Alpha',
          name: 'EBR-14',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Bravo',
          name: 'MK2 Carbine',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Charlie',
          name: 'Kar98k',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Delta',
          name: 'Crossbow',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Echo',
          name: 'SKS',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Foxtrot',
          name: 'SP-R 208',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Marksman Rifle')
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Alpha',
          name: 'Dragunov',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Sniper Rifle')
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Bravo',
          name: 'HDR',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Sniper Rifle')
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Charlie',
          name: 'AX-50',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Sniper Rifle')
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Delta',
          name: 'Rytek AMR',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Sniper Rifle')
          }
        },
        {
          category: 'Melee',
          alias: 'Alpha',
          name: 'Riot Shield',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Melee', 'Riot Shield')
          }
        },
        {
          category: 'Melee',
          alias: 'Bravo',
          name: 'Combat Knife',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Melee', 'Combat Knife')
          }
        },
        {
          category: 'Melee',
          alias: 'Charlie',
          name: 'Kali Sticks',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Melee', 'Kali Sticks')
          }
        },
        {
          category: 'Melee',
          alias: 'Delta',
          name: 'Dual Kodachis',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Melee', 'Dual Kodachis')
          }
        },
        {
          category: 'Handgun',
          alias: 'Alpha',
          name: 'X16',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Bravo',
          name: '1911',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Charlie',
          name: '.357',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Delta',
          name: 'M19',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Echo',
          name: '.50 GS',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Foxtrot',
          name: 'Renetti',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Handgun',
          alias: 'Golf',
          name: 'Sykov',
          required: false,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Handgun')
          }
        },
        {
          category: 'Launcher',
          alias: 'Alpha',
          name: 'PILA',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Launcher')
          }
        },
        {
          category: 'Launcher',
          alias: 'Bravo',
          name: 'Strela-P',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Launcher')
          }
        },
        {
          category: 'Launcher',
          alias: 'Charlie',
          name: 'JOKR',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Launcher')
          }
        },
        {
          category: 'Launcher',
          alias: 'Delta',
          name: 'RPG-7',
          required: true,
          progress: {
            ...defaultProgress
          },
          mastery: {
            ...defaultMastery
          },
          challenges: {
            ...defaultChallenges('Launcher')
          }
        }
      ],
      progress: {
        ...defaultProgress
      },
      filters: {
        ...defaultFilters
      },
      reticles: [
        // ACOG Reticles
        {
          category: 'ACOG Reticle',
          name: 'Cross Dot',
          requirement: 'Get 200 kills using the Scout Combat Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'Angle Eye',
          requirement: 'Get 50 headshots using the Scout Combat Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'T Pose',
          requirement: 'Get 200 kills using the VLK 3.0x Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'Double Cross',
          requirement: 'Get 50 headshots using the VLK 3.0x Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'Green Cross',
          requirement: 'Get 200 kills using the Cronen C480 Pro Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'Redeye',
          requirement: 'Get 50 headshots using the Cronen C480 Pro Optic',
          completed: false,
        },
        {
          category: 'ACOG Reticle',
          name: 'Blue V',
          requirement: 'Get 3 kills in a single life 50 times using any ACOG Optic',
          completed: false,
        },

        // Holo Reticles
        {
          category: 'Holo Reticle',
          name: 'Downward Curve',
          requirement: 'Get 200 kills using the Corp Combat Holo Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Witch',
          requirement: 'Get 50 headshots using the Corp Combat Holo Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Islet',
          requirement: 'Get 200 kills using the APX5 Holographic Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Summoner',
          requirement: 'Get 50 headshots using the APX5 Holographic Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Orbit',
          requirement: 'Get 200 kills using the PBX Holo 7 Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Close Quarters',
          requirement: 'Get 50 headshots using the PBX Holo 7 Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Sunrise',
          requirement: 'Get 200 kills using any Holo Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Evil Eye',
          requirement: 'Get 50 headshots using the any Holo Sight',
          completed: false,
        },
        {
          category: 'Holo Reticle',
          name: 'Blue Dot',
          requirement: 'Get 3 kills without dying 150 times using any Holo Sight',
          completed: false,
        },

        // Hybrid Reticles
        {
          category: 'Hybrid Reticle',
          name: 'Chevron Tactical',
          requirement: 'Get 200 kills using the 4.0x Flip Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Confine',
          requirement: 'Get 50 headshots using the 4.0x Flip Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Heroic',
          requirement: 'Get 200 kills using the Integral Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Apotheosis',
          requirement: 'Get 50 headshots using the Integral Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Central Focus',
          requirement: 'Get 200 kills using the Canted Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Target Line',
          requirement: 'Get 50 headshots using the Canted Hybrid Sight',
          completed: false,
        },
        {
          category: 'Hybrid Reticle',
          name: 'Elegance',
          requirement: 'Get 3 kills without dying 50 times using any Hybrid Sight',
          completed: false,
        },

        // Reflex Reticles
        {
          category: 'Reflex Reticle',
          name: 'Carrot',
          requirement: 'Get 200 kills using the Operator Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Add Point',
          requirement: 'Get 50 headshots using the Operator Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Sunspot',
          requirement: 'Get 200 kills using the Aim-Op Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Golden Bell',
          requirement: 'Get 50 headshots using the Aim-Op Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Standard Fare',
          requirement: 'Get 200 kills using the Viper Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Perfect Balance',
          requirement: 'Get 50 headshots using the Viper Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Division',
          requirement: 'Get 200 kills using the Monocle Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Flare',
          requirement: 'Get 50 headshots using the Monocle Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Green V',
          requirement: 'Get 3 kills in a single life 50 times using any Reflex Sight',
          completed: false,
        },
        {
          category: 'Reflex Reticle',
          name: 'Blue Dot',
          requirement: 'Get 500 kills using any Reflex Sight.',
          completed: false,
        },

        // Sniper Reticles
        {
          category: 'Sniper Reticle',
          name: 'Crossthread',
          requirement: 'Get 200 kills using the Sniper Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Pinpoint',
          requirement: 'Get 50 headshots using the Sniper Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'One Breath',
          requirement: 'Get 3 kills without dying using the Sniper Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Hangman',
          requirement: 'Get 100 longshot kills using the Sniper Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Drop Angle',
          requirement: 'Get 150 mounted kills using the Sniper Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Circle Pit',
          requirement: 'Get 200 kills using the Variable Zoom Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Cover Shot',
          requirement: 'Get 50 headshots using the Variable Zoom Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Top Notch',
          requirement: 'Kill 3 enemies without dying 25 times while using the Variable Zoom Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Marksman',
          requirement: 'Get 100 longshot kills using the Variable Zoom Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Grid Line',
          requirement: 'Get 150 mounted kills using the Variable Zoom Scope',
          completed: false,
        },
        {
          category: 'Sniper Reticle',
          name: 'Critical',
          requirement: 'Get 500 kills using any Sniper Optic',
          completed: false,
        },

        // Thermal Hybrid Reticles
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Dark Horizon',
          requirement: 'Get 200 kills using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Stealth Bomber',
          requirement: 'Get 50 headshots using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Spectre',
          requirement: 'Get 50 double kills using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Tracker',
          requirement: 'Get 150 mounted kills using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Quadrants',
          requirement: 'Get 150 longshot kills using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'All-Seeing',
          requirement: 'Get 3 kills without dying 25 times using the Thermal Hybrid Scope',
          completed: false,
        },
        {
          category: 'Thermal Hybrid Reticle',
          name: 'Pearl',
          requirement: 'Get 500 kills using the Thermal Hybrid Scope',
          completed: false,
        },

        // Thermal Reticles
        {
          category: 'Thermal Reticle',
          name: 'Weave',
          requirement: 'Get 200 kills using the Solozero NVG Enhanced Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Drop Pad',
          requirement: 'Get 50 headshots using the Solozero NVG Enhanced Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Cerberus',
          requirement: 'Get 200 kills using the Merc Thermal Optic Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Zip Pad',
          requirement: 'Get 50 headshots using the Merc Thermal Optic Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Wright Sight',
          requirement: 'Get 200 kills using the Thermal Dual Power Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Optical Illusion',
          requirement: 'Get 50 headshots using the Thermal Dual Power Scope',
          completed: false,
        },
        {
          category: 'Thermal Reticle',
          name: 'Beasts of Prey',
          requirement: 'Get 3 kills without dying 50 times using any Thermal Scope',
          completed: false,
        },
      ]
    }
  },
  mutations: {
    SET_PROGRESS(state, weapons) {
      state.weapons = state.defaults.weapons;

      if (weapons) {
        weapons.forEach(weapon => {
          state.weapons.find(w => w.name === weapon.name).progress = {
            ...defaultProgress,
            ...weapon.progress
          };

          state.weapons.find(w => w.name === weapon.name).mastery = {
            ...defaultMastery,
            ...weapon.mastery
          };

          state.weapons.find(w => w.name === weapon.name).challenges = {
            ...defaultChallenges(weapon.category, weapon.name),
            ...weapon.challenges
          };
        });
      }
    },

    SET_RETICLES(state, reticles) {
      state.reticles = state.defaults.reticles;

      if (reticles) {
        reticles.forEach(reticle => {
          state.reticles.find(r => r.category === reticle.category && r.name === reticle.name).completed = reticle.completed;
        });
      }
    },

    SET_FILTERS(state, { type, filters }) {
      if (type === null) {
        // Handle updates to default filter object
        if (filters) {
          Object.keys(state.defaults.filters).forEach(key => {
            if (!(key in filters)) {
              filters = null;
            }
          });
        }

        state.filters = filters || state.defaults.filters;
      } else {
        state.filters[type] = filters || state.defaults.filters[type];
      }
    },

    TOGGLE_COMPLETED(state, { weapon, camo, current }) {
      const masteryCamo = camo in defaultMastery;

      if (masteryCamo) {
        state.weapons.find(w => w.name === weapon.name).mastery[camo] = !current;
      } else {
        state.weapons.find(w => w.name === weapon.name).progress[camo] = !current;
      }
    },

    TOGGLE_CHALLENGE_COMPLETED(state, { weapon, challenge }) {
      let challenges = state.weapons.find(w => w.name === weapon.name).challenges;

      Object.keys(challenges).forEach(c => {
        if (challenges[c].category === challenge.category && challenges[c].level === challenge.level) {
          challenges[c].completed = !challenge.completed;
        }
      });
    },

    TOGGLE_WEAPON_COMPLETED(state, { weapon, current, mode }) {
      let selectedWeapon = state.weapons.find(w => w.name === weapon.name);

      if (mode === 'Camouflages') {
        Object.keys(selectedWeapon.progress).forEach(camo => selectedWeapon.progress[camo] = !current);
      } else if (mode === 'Challenges') {
        Object.keys(selectedWeapon.challenges).forEach(challenge => selectedWeapon.challenges[challenge].completed = !current);
      }
    },

    TOGGLE_RETICLE_COMPLETED(state, { reticle }) {
      console.log(reticle);
      state.reticles.find(r => r.category === reticle.category && r.name === reticle.name).completed = !reticle.completed;
    },

    RESET_PROGRESS(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.progress).forEach(camo => weapon.progress[camo] = false));
    },

    RESET_MASTERY(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.mastery).forEach(camo => weapon.mastery[camo] = false));
    },

    RESET_CHALLENGES(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.challenges).forEach(challenge => weapon.challenges[challenge].completed = false));
    },

    RESET_RETICLES(state) {
      state.reticles.forEach(reticle => reticle.completed = false);
    },

    // DEBUG
    COMPLETE_DAMASCUS(state) {
      state.weapons.filter(weapon => weapon.required)
                   .forEach(weapon => Object.keys(weapon.progress)
                   .forEach(camo => weapon.progress[camo] = true));
    },
    COMPLETE_ALL(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.progress)
                   .forEach(camo => weapon.progress[camo] = true));
    },
    COMPLETE_MASTERY(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.mastery)
                   .forEach(camo => weapon.mastery[camo] = true));
    },
    COMPLETE_CHALLENGES(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.challenges)
                   .forEach(challenge => weapon.challenges[challenge].completed = true));
    },
    COMPLETE_ALL_BUT_ONE(state) {
      state.weapons.forEach((weapon, weaponIndex) => Object.keys(weapon.progress)
                   .forEach((camo, camoIndex) => {
                     if (!(weaponIndex === 0 && camoIndex === 0)) {
                      weapon.progress[camo] = true;
                     }
                   }));
    }
  },
  actions: {
    async getStoredData({ dispatch }) {
      await dispatch('getProgress');
      await dispatch('getFilters');
      await dispatch('getReticles');

      await dispatch('storeData');
    },

    getProgress(context) {
      const data = JSON.parse(localStorage.getItem(token));
      const weapons = data ? data.weapons : null;
      context.commit('SET_PROGRESS', weapons);
    },

    getFilters(context) {
      const data = JSON.parse(localStorage.getItem(token));
      const filters = data ? data.filters : null;
      context.commit('SET_FILTERS', { type: null, filters });
    },

    getReticles(context) {
      const data = JSON.parse(localStorage.getItem(token));
      const reticles = data ? data.reticles : null;
      context.commit('SET_RETICLES', reticles);
    },

    setFilters(context, filters) {
      context.commit('SET_FILTERS', filters);
      context.dispatch('storeData');
    },

    toggleCompleted(context, { weapon, camo, current }) {
      context.commit('TOGGLE_COMPLETED', { weapon, camo, current });
      context.dispatch('storeData');
    },

    toggleChallengeCompleted(context, { weapon, challenge }) {
      context.commit('TOGGLE_CHALLENGE_COMPLETED', { weapon, challenge });
      context.dispatch('storeData');
    },

    toggleWeaponCompleted(context, { weapon, current, mode }) {
      context.commit('TOGGLE_WEAPON_COMPLETED', { weapon, current, mode });
      context.dispatch('storeData');
    },

    toggleReticleCompleted(context, { reticle, current }) {
      context.commit('TOGGLE_RETICLE_COMPLETED', { reticle, current });
      context.dispatch('storeData');
    },

    resetAll(context) {
      context.commit('RESET_PROGRESS');
      context.commit('RESET_MASTERY');
      context.commit('RESET_RETICLES');
      context.commit('RESET_CHALLENGES');
      Vue.notify({
        type: 'success',
        title: 'All progress successfully reset!'
      });
    },

    resetProgress(context) {
      context.commit('RESET_PROGRESS');
      context.commit('RESET_MASTERY');
      context.dispatch('storeData');
      Vue.notify({
        type: 'success',
        title: 'Camouflage progress successfully reset!'
      });
    },

    resetReticles(context) {
      context.commit('RESET_RETICLES');
      context.dispatch('storeData');
      Vue.notify({
        type: 'success',
        title: 'Reticle progress successfully reset!'
      });
    },

    resetChallenges(context) {
      context.commit('RESET_CHALLENGES');
      context.dispatch('storeData');
      Vue.notify({
        type: 'success',
        title: 'Master Challenges progress successfully reset!'
      });
    },

    clearLocalStorage(context) {
      localStorage.removeItem(token);

      setTimeout(() => {
        context.dispatch('resetProgress');
      }, 500);
    },

    exportProgress() {
      const dataStr = JSON.stringify(this.state.weapons);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const fileName = `damascus_${ new Date().toLocaleDateString('sv-SE').replace(/\//g, '-') }.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', fileName);
      linkElement.click();
    },

    importProgress(context, progress) {
      context.commit('SET_PROGRESS', progress);
      context.dispatch('storeData');
    },

    storeData() {
      localStorage.setItem(token, JSON.stringify({
        weapons: this.state.weapons,
        filters: this.state.filters,
        reticles: this.state.reticles
      }));
    },

    // DEBUG
    completeDamascus(context) {
      context.commit('COMPLETE_DAMASCUS');
      context.dispatch('storeData');
    },
    completeAll(context) {
      context.commit('COMPLETE_ALL');
      context.dispatch('storeData');
    },
    completeMastery(context) {
      context.commit('COMPLETE_MASTERY');
      context.dispatch('storeData');
    },
    completeChallenges(context) {
      context.commit('COMPLETE_CHALLENGES');
      context.dispatch('storeData');
    },
    completeAllButOne(context) {
      context.commit('COMPLETE_ALL_BUT_ONE');
      context.dispatch('storeData');
    },
    resetMastery(context) {
      context.commit('RESET_MASTERY');
      context.dispatch('storeData');
    },
  },
  modules: {
  }
})
