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
import { pixelizeImage } from '../pixelize-image/pixelize-image'
import { Store } from '../store'

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const image = ref<HTMLImageElement>()
    const store: Store = useStore()

    const currentImageSrc = computed(() => {
      const images = store.getters.currentCharacterParameters?.portraits
      if (images && images.length) return images[0]
    })

    function onLoadImage() {
      pixelizeImage({
        to: canvas.value,
        from: image.value,
        pixels: 35
      })
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
