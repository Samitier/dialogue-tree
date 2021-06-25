<template>
  <rpgfy-it
    script-file="/assets/star/script.txt"
    :character-parameters="[
      {
        character: 'VADER',
        portraits: [
          '/assets/star/d1.jpg',
          '/assets/star/d2.jpg',
          '/assets/star/d3.jpg',
          '/assets/star/d4.jpg'
        ],
        frequency: 150,
        type: 'triangle'
      },
      {
        character: 'LUKE',
        portraits: [
          '/assets/star/l1.jpg',
          '/assets/star/l2.jpg',
          '/assets/star/l3.jpg',
          '/assets/star/l4.jpg'
        ],
        frequency: 350,
        type: 'sine'
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
