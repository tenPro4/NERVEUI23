<script>
import Vertical from './vertical.vue'
import Horizontal from './horizontal'
import TwoColumns from './twocolumn'
import PageHeader from '~/components/layout/page-header'
import { layoutComputed } from '~/store/helpers'
import 'vue-select/dist/vue-select.css';
import 'bootstrap'

export default {
  components: {
    Vertical,
    Horizontal,
    TwoColumns,
    PageHeader,
  },
  data() {
    return {}
  },
  computed: {
    ...layoutComputed,
  },
}
</script>

<template>
  <div>
    <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <PageHeader
        :title="$store.state.breadcrumb.title"
        :items="$store.state.breadcrumb.items"
      />
      <Nuxt />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <PageHeader
        :title="$store.state.breadcrumb.title"
        :items="$store.state.breadcrumb.items"
      />
      <Nuxt />
    </Horizontal>

    <TwoColumns v-if="layoutType === 'twocolumn'" :layout="layoutType">
      <PageHeader
        :title="$store.state.breadcrumb.title"
        :items="$store.state.breadcrumb.items"
      />
      <Nuxt />
    </TwoColumns>
  </div>
</template>
