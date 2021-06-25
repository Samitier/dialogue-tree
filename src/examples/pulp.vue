<template>
  <rpgfy-it
    script-file="/assets/pulp/script.txt"
    :character-parameters="[
      {
        character: 'VINCENT',
        portraits: ['/assets/pulp/vincent.jpeg'],
        frequency: 400,
        type: 'sine'
      },
      {
        character: 'JULES',
        portraits: ['/assets/pulp/jules.jpeg'],
        frequency: 300,
        type: 'triangle'
      }
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RpgfyIt from '../lib/ui/rpgfy-it.vue'

export default defineComponent({
  components: { RpgfyIt }
})
</script>
