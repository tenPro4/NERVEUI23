<template>
  <div>
    <Nuxt />
    <layout-right-bar />
  </div>
</template>
<script>
import { layoutComputed } from '~/store/helpers'
export default {
  computed: {
    ...layoutComputed,
  },
}
</script>
