<template>
  <div>
    <template v-if="isLoading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
    <slot v-else />
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: () => true,
    },
  },
}
</script>
