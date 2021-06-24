<template>
  <rpgfy-it
    script-file="dialogue2.txt"
    :audio-options="[
      { character: 'VINCENT', frequency: 450, type: 'sine' },
      { character: 'JULES', frequency: 300, type: 'triangle' }
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RpgfyIt from './lib/ui/rpgfy-it.vue'

export default defineComponent({
  components: { RpgfyIt }
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
