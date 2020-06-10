import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const token = process.env.NODE_ENV === 'production' ? 'damascus' : 'damascus-dev';
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
const defaultFilters = {
  category: null,
  hideNonRequired: true,
  hideCompleted: false
}

export default new Vuex.Store({
  state: {
    weapons: [],
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
          'Marksman Rifle': '50 Longshot Kills',
          'Sniper Rifle': '50 Longshot Kills',
          'Melee': {
            'Riot Shield': '25 2-streaks',
            'Combat Knife': '25 Double Kills'
          },
          'Handgun': '25 Double Kills',
          'Launcher': '50 Destroys while using Spotter perk'
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
          'Launcher': '50 Streaks destroyed while using Cold Blooded perk'
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
      }
    ],
    defaults: {
      weapons: [
        {
          category: 'Assault Rifle',
          alias: 'Alpha',
          name: 'Kilo 141',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Bravo',
          name: 'FAL',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Charlie',
          name: 'M4A1',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Delta',
          name: 'FR 5.56',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Echo',
          name: 'Oden',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Foxtrot',
          name: 'M13',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Golf',
          name: 'FN Scar 17',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Hotel',
          name: 'AK-47',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'India',
          name: 'RAM-7',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Assault Rifle',
          alias: 'Juliet',
          name: 'Grau 5.56',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Alpha',
          name: 'AUG',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Bravo',
          name: 'P90',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Charlie',
          name: 'MP5',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Delta',
          name: 'Uzi',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Echo',
          name: 'PP19 Bizon',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Foxtrot',
          name: 'MP7',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Submachine Gun',
          alias: 'Golf',
          name: 'Striker 45',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Shotgun',
          alias: 'Alpha',
          name: 'Model 680',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Shotgun',
          alias: 'Bravo',
          name: 'R9-0',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Shotgun',
          alias: 'Charlie',
          name: '725',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Shotgun',
          alias: 'Delta',
          name: 'Origin 12',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Shotgun',
          alias: 'Echo',
          name: 'VLK Rogue',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Alpha',
          name: 'PKM',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Bravo',
          name: 'SA87',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Charlie',
          name: 'M91',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Delta',
          name: 'MG34',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Echo',
          name: 'Holger-26',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Light Machine Gun',
          alias: 'Foxtrot',
          name: 'Bruen Mk9',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Alpha',
          name: 'EBR-14',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Bravo',
          name: 'MK2 Carbine',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Charlie',
          name: 'Kar98k',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Delta',
          name: 'Crossbow',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Marksman Rifle',
          alias: 'Echo',
          name: 'SKS',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Alpha',
          name: 'Dragunov',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Bravo',
          name: 'HDR',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Sniper Rifle',
          alias: 'Charlie',
          name: 'AX-50',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Melee',
          alias: 'Alpha',
          name: 'Riot Shield',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Melee',
          alias: 'Bravo',
          name: 'Combat Knife',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Alpha',
          name: 'X16',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Bravo',
          name: '1911',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Charlie',
          name: '.357',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Delta',
          name: 'M19',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Echo',
          name: '.50 GS',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Handgun',
          alias: 'Foxtrot',
          name: 'Renetti',
          required: false,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Launcher',
          alias: 'Alpha',
          name: 'PILA',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Launcher',
          alias: 'Bravo',
          name: 'Strela-P',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Launcher',
          alias: 'Charlie',
          name: 'JOKR',
          required: true,
          progress: {
            ...defaultProgress
          }
        },
        {
          category: 'Launcher',
          alias: 'Delta',
          name: 'RPG-7',
          required: true,
          progress: {
            ...defaultProgress
          }
        }
      ],
      progress: {
        ...defaultProgress
      },
      filters: {
        ...defaultFilters
      }
    },
    filters: {
      ...defaultFilters
    },
    settings: {
      storeInLocalStorage: true
    }
  },
  mutations: {
    SET_PROGRESS(state, weapons) {
      state.weapons = state.defaults.weapons;

      if (weapons) {
        weapons.forEach(weapon => {
          state.weapons.find(w => w.name === weapon.name).progress = {
            ...state.weapons.find(w => w.name === weapon.name).progress,
            ...weapon.progress
          };
        });
      }
    },

    SET_FILTERS(state, filters) {
      state.filters = filters || state.defaults.filters;
    },

    TOGGLE_COMPLETED(state, { weapon, camo, current }) {
      state.weapons.find(w => w.name === weapon.name).progress[camo] = !current;
    },

    TOGGLE_WEAPON_COMPLETED(state, { weapon, current }) {
      let selectedWeapon = state.weapons.find(w => w.name === weapon.name);
      Object.keys(selectedWeapon.progress).forEach(camo => selectedWeapon.progress[camo] = !current);
    },

    RESET_PROGRESS(state) {
      state.weapons.forEach(weapon => Object.keys(weapon.progress).forEach(camo => weapon.progress[camo] = false));
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
    },

    getProgress(context) {
      const data = JSON.parse(localStorage.getItem(token));
      const weapons = data ? data.weapons : null;
      context.commit('SET_PROGRESS', weapons);
    },

    getFilters(context) {
      const data = JSON.parse(localStorage.getItem(token));
      const filters = data ? data.filters : null;
      context.commit('SET_FILTERS', filters);
    },

    toggleCompleted(context, { weapon, camo, current }) {
      context.commit('TOGGLE_COMPLETED', { weapon, camo, current });
      context.dispatch('storeData');
    },

    toggleWeaponCompleted(context, { weapon, current }) {
      context.commit('TOGGLE_WEAPON_COMPLETED', { weapon, current });
      context.dispatch('storeData');
    },

    resetProgress(context) {
      context.commit('RESET_PROGRESS');
      context.dispatch('storeData');
      Vue.notify({
        type: 'success',
        title: 'Progress successfully reset!'
      });
    },

    clearLocalStorage(context) {
      localStorage.removeItem(token);
      context.dispatch('resetProgress');
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
        filters: this.state.filters
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
    completeAllButOne(context) {
      context.commit('COMPLETE_ALL_BUT_ONE');
      context.dispatch('storeData');
    }
  },
  modules: {
  }
})
