<template>
  <transition name="fade">
    <div class="container" v-show="show">
      <div class="settings">
        <div class="setting" v-for="setting in settings" :key="setting.name">
          <div>
            <h3>{{ setting.name }}</h3>
            <p v-html="setting.description"></p>
            <span class="warning" v-if="setting.warning">
              <eva-icon name="alert-triangle-outline" fill="#ee5253" width="20" height="20"></eva-icon>
              {{ setting.warning }}
            </span>
          </div>

          <button v-if="setting.action !== 'importProgress'"
                  :class="{ warning: setting.warning }" 
                  @click="handleAction(setting)"
                  >{{ setting.name }}</button>

          <label v-else for="import" class="button" :class="{ disabled: uploading, uploading }">
            <span>{{ setting.name }}</span>
            <Loader :size="18" :thickness="2" :color="'black'" v-if="uploading" />
          </label>
        </div>
      </div>

      <input type="file" id="import" @change="importProgress($event)">
    </div>
  </transition>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: 'settings',

  components: {
    Loader
  },
  
  data() {
    return {
      show: false,
      uploading: false,
      settings: [
        {
          name: 'Export progress',
          description: 'Export your current progress as a file.',
          action: 'exportProgress',
        },
        {
          name: 'Import progress',
          description: 'Import progress from exported file.',
          action: 'importProgress'
        },
        {
          name: 'Reset progress',
          description: 'Reset your current camouflage progress.',
          warning: 'This action is irreversible.',
          action: 'resetProgress'
        }
      ]
    }
  },

  methods: {
    async handleAction(setting) {
      await this.$store.dispatch(setting.action);
    },

    async importProgress(event) {
      this.$notify({ clean: true });
      this.uploading = true;
      const file = event.target.files[0];
      const regex = /.json$/i;

      if (regex.test(file.name)) {
        if (typeof (FileReader) !== 'undefined') {
          const reader = new FileReader();
          reader.onload = (e) => {
            setTimeout(async () => {
              await this.$store.dispatch('importProgress', JSON.parse(e.target.result))
                .then(() => {
                  this.uploading = false;
                  event.target.value = null;
                  this.$notify({
                    type: 'success',
                    title: `Successfully imported progress!`,
                  });
                });
            }, 500);
          };
          reader.readAsText(file);
        } else {
          this.handleImportError(`Your browser does not support the required APIs to handle uploads.`, event);
        }
      } else {
        this.handleImportError(`The file type of the uploaded file is incorrect, it needs to be ".json".`, event);
      }
    },

    handleImportError(errorMessage, event) {
      this.uploading = false;
      event.target.value = null;

      this.$notify({
        type: 'error',
        title: errorMessage,
        duration: 20000
      });
    }
  },
  
  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.settings {
  $border-color: $elevation-4-color;
  background-color: $elevation-2-color;
  border: 1px solid $border-color;
  border-radius: $border-radius;

  .setting {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    transition: $transition;

    @media (max-width: $mobile) {
      align-items: flex-start;
      flex-direction: column;
    }

    &:hover {
      background-color: $elevation-3-color;
    }

    + .setting {
      border-top: 1px solid $border-color;
    }

    h3 {
      font-weight: 600;
      margin-bottom: 15px;
    }

    span.warning {
      align-items: center;
      color: $red;
      display: flex;
      font-size: 14px;
      font-weight: 600;
      margin-top: 15px;

      i {
        margin-right: 10px;
        position: relative;
        top: 1px;
      }
    }

    button, .button {
      @media (max-width: $mobile) {
        margin-top: 15px;
      }
    }
  }
}

.button {
  align-items: center;
  display: flex;
  justify-content: center;
  transition: $transition;

  .loader {
    margin-left: 10px;
  }
}

#import {
  display: none;
}
</style>