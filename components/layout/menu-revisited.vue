<script>
import { Collapse } from 'bootstrap'
import { layoutComputed } from '~/store/helpers'

import { menuItems } from '~/data/menu'
export default {
  components: {},
  async fetch() {
    // const accessList = await this.$axios.$get('/ManagePage/AccessList')
    // this.accessList = accessList
  },
  data() {
    // let filteredMenuItems = menuItems.filter((a) => !a.allow)
    const filteredMenuItems = menuItems
    const originalMenuItems = filteredMenuItems.map((value, index) => ({
      ...value,
      id: index,
    }))
    return {
      menuItems: [],
      settings: {
        minScrollbarLength: 60,
      },
      originalMenuItems,
      accessList: [],
      timer: ''
    }
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {}
      },
    },
  },
  watch: {
    '$route.path'(val){
      const filteredMenuItems = this.originalMenuItems
      const currentMenuItems = filteredMenuItems.filter(
        (a) => !a.access || (a.access && this.checkPageExist(a.access, this.accessList))
      )
      this.menuItems = currentMenuItems
    }
  },
  async mounted() {
    // const accessList = await this.$axios.$get('/ManagePage/AccessList')
    const filteredMenuItems = this.originalMenuItems
    this.menuItems = filteredMenuItems
    // const currentMenuItems = filteredMenuItems.filter(
    //   (a) => !a.access || (a.access && this.checkPageExist(a.access, accessList))
    // )
    // this.menuItems = currentMenuItems

    const els = document.querySelectorAll('.menu-link.active')
    for (const el of els) {
      const collapseElement = el.parentElement.querySelector('.collapse')
      if (!collapseElement) continue
      const collapseInstance = new Collapse(collapseElement)
      collapseInstance.show()
    }
  },
  methods: {
    checkPageExist(a, list){
      let count = 0
      list.forEach((value) => {
        if(a[0] === value){
          count = count + 1
        }
      })
      if(count !== 0){
        return true
      }else{
        return false
      }
    },
  },
}
</script>

<template>
  <div class="container-fluid">
    <div id="two-column-menu"></div>

    <ul id="navbar-nav" class="navbar-nav h-100">
      <li
        v-for="item in menuItems"
        :key="item.id"
        :class="{
          'menu-title': item.isTitle,
          'nav-item': !item.isTitle,
        }"
      >
        <template v-if="item.isTitle">
          <span>{{ item.label }}</span>
        </template>
        <template v-else>
          <template v-if="item.subItems">
            <nuxt-link
              class="nav-link menu-link"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              :aria-controls="`subitem-${item.id}`"
              :to="item.link"
              :href="`#subitem-${item.id}`"
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </nuxt-link>
            <div :id="`subitem-${item.id}`" class="collapse menu-dropdown">
              <ul class="nav nav-sm flex-column">
                <li
                  v-for="(subItem, indexSub) in item.subItems"
                  :key="indexSub"
                  class="nav-item"
                >
                  <nuxt-link :to="subItem.link" class="nav-link custom-abc">
                    {{ subItem.label }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link menu-link" :to="item.link">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </nuxt-link>
            </li>
          </template>
        </template>
      </li>
    </ul>
  </div>
  <!-- Sidebar -->
</template>
