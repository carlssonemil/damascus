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
  }
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
          'Submachine Gun': '500 Kills',
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
          'Submachine Gun': '100 Headshot Kills',
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
          'Submachine Gun': '110 Crouching Kills',
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
          'Submachine Gun': '100 Hipfire Kills',
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
          'Submachine Gun': '50 Longshot Kills',
          'Shotgun': '50 Headshot Kills',
          'Light Machine Gun': '45 Longshot Kills',
          'Marksman Rifle': '150 Kills while using all attachments',
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
          'Submachine Gun': '50 Mounted Kills',
          'Shotgun': '225 Kills while using all attachments',
          'Light Machine Gun': '45 Mounted Kills',
          'Marksman Rifle': {
            'EBR-14': '50 Longshot Kills',
            'MK2 Carbine': '50 Longshot Kills',
            'Kar98k': '50 Longshot Kills',
            'Crossbow': '50 Longshot Kills',
            'SKS': '25 Double Kills'
          },
          'Sniper Rifle': '50 Longshot Kills',
          'Melee': {
            'Riot Shield': '25 2-streaks',
            'Combat Knife': '25 Double Kills'
          },
          'Handgun': '25 Double Kills',
          'Launcher': '50 Equipment, killstreaks, or vehicles destroyed'
        }
      },
      {
        name: 'Tiger',
        requirements: {
          'Assault Rifle': '180 Kills while using all attachments',
          'Submachine Gun': '250 Kills while using all attachments',
          'Shotgun': '25 Double Kills',
          'Light Machine Gun': '180 Kills while using all attachments',
          'Marksman Rifle': '50 Mounted Kills',
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
          'Submachine Gun': '40 Kills shortly after reload',
          'Shotgun': '30 Kills shortly after reload',
          'Light Machine Gun': '30 Double Kills',
          'Marksman Rifle': '25 Double Kills',
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
            'Combat Knife': '10 3-streaks'
          },
          'Handgun': '25 3-streaks',
          'Launcher': '50 vehicles destroyed'
        }
      },
      {
        name: 'Obsidian',
        requirements: {
          'Assault Rifle': 'Kill 15 enemies in a match 200 times',
          'Submachine Gun': 'Kill 15 enemies in a match 150 times',
          'Shotgun': 'Kill 15 enemies in a match 150 times',
          'Light Machine Gun': 'Kill 15 enemies in a match 150 times',
          'Marksman Rifle': 'Kill 15 enemies in a match 150 times',
          'Sniper Rifle': 'Kill 15 enemies in a match 125 times',
          'Melee': {
            'Riot Shield': 'Kill 750 Enemies',
            'Combat Knife': 'Kill 10 enemies in a match 125 times'
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
          requirement: 'Get 3 kills without dying using the Variable Zoom Scope',
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
        });
      }
    },

    SET_RETICLES(state, reticles) {
      state.reticles = state.defaults.reticles;

      if (reticles) {
        reticles.forEach(reticle => {
          state.reticles.find(r => r.name === reticle.name).completed = reticle.completed;
        });
      }
    },

    SET_FILTERS(state, { type, filters }) {
      if (type === null) {
        // Handle updates to default filter object
        if (!('weapons' in filters)) {
          filters = null;
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

    TOGGLE_WEAPON_COMPLETED(state, { weapon, current }) {
      let selectedWeapon = state.weapons.find(w => w.name === weapon.name);
      Object.keys(selectedWeapon.progress).forEach(camo => selectedWeapon.progress[camo] = !current);
    },

    TOGGLE_RETICLE_COMPLETED(state, { reticle }) {
      state.reticles.find(r => r.category === reticle.category && r.name === reticle.name).completed = !reticle.completed;
    },

    RESET_PROGRESS(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.progress).forEach(camo => weapon.progress[camo] = false));
    },

    RESET_MASTERY(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.mastery).forEach(camo => weapon.mastery[camo] = false));
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

    toggleWeaponCompleted(context, { weapon, current }) {
      context.commit('TOGGLE_WEAPON_COMPLETED', { weapon, current });
      context.dispatch('storeData');
    },

    toggleReticleCompleted(context, { reticle, current }) {
      context.commit('TOGGLE_RETICLE_COMPLETED', { reticle, current });
      context.dispatch('storeData');
    },

    resetProgress(context) {
      context.commit('RESET_PROGRESS');
      context.commit('RESET_MASTERY');
      context.commit('RESET_RETICLES');
      context.dispatch('storeData');
      Vue.notify({
        type: 'success',
        title: 'Progress successfully reset!'
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
    async completeMastery(context) {
      context.commit('COMPLETE_MASTERY');
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
    resetReticles(context) {
      context.commit('RESET_RETICLES');
      context.dispatch('storeData');
    },
  },
  modules: {
  }
})
