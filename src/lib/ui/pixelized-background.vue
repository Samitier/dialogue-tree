<template>
  <div class="background">
    <img
      ref="image"
      class="image"
      :src="currentImageSrc"
      @load="onLoadImage"
    />
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Pixelit } from '../pixelit/pixelit'
import { Store } from '../store'
import { palette } from '../pixelit/palette'

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const image = ref<HTMLImageElement>()
    const store = useStore<Store>()

    const currentImageSrc = computed(() => {
      const currentCharacter =
        store.getters.currentCharacterLines?.character
      if (currentCharacter === 'JULES') return '/example.jpeg'
      else return '/example2.jpeg'
    })

    function onLoadImage() {
      const pixelit = new Pixelit({
        to: canvas.value,
        from: image.value,
        palette,
        scale: 35
      })
      pixelit.draw()
      pixelit.pixelate()
      pixelit.convertPalette()
    }

    return { canvas, image, onLoadImage, currentImageSrc }
  }
})
</script>

<style>
.background {
  height: 100%;
  overflow: hidden;
}
.image {
  display: none;
}
.canvas {
  width: auto;
  height: 100%;
}
</style>
