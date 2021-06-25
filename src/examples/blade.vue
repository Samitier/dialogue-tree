<template>
  <rpgfy-it
    script-file="/assets/blade/script.txt"
    :character-parameters="[
      {
        character: 'ROY BATTY',
        portraits: [
          '/assets/blade/1.jpg',
          '/assets/blade/2.jpg',
          '/assets/blade/3.jpeg',
          '/assets/blade/4.jpg',
          '/assets/blade/5.jpg',
          '/assets/blade/6.jpg'
        ],
        frequency: 220,
        type: 'square'
      }
    ]"
    :text-velocity="35"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RpgfyIt from '../lib/ui/rpgfy-it.vue'

export default defineComponent({
  components: { RpgfyIt }
})
</script>
