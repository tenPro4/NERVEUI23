<script>
import RightBar from '~/components/layout/right-bar'
import Footer from '~/components/layout/footer'
import NavBar from '~/components/layout/nav-bar'
import { menuItems } from '~/data/menu'

export default {
  components: {
    NavBar,
    RightBar,
    Footer,
  },
  data() {
    // let filteredMenuItems = menuItems.filter((a) => !a.allow)
    const filteredMenuItems = menuItems
    const originalMenuItems = filteredMenuItems.map((value, index) => ({
      ...value,
      id: index,
    }))
    return {
      originalMenuItems,
    }
  },
  watch: {
    $route: {
      handler: 'onRoutechange',
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path)
    },
    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector('#navbar-nav')) {
          const a = document
            .querySelector('#navbar-nav')
            .querySelector('[href="' + ele + '"]')

          if (a) {
            a.classList.add('active')
            const parentCollapseDiv = a.closest('.collapse.menu-dropdown')
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add('show')
              parentCollapseDiv.parentElement.children[0].classList.add(
                'active'
              )
              parentCollapseDiv.parentElement.children[0].setAttribute(
                'aria-expanded',
                'true'
              )
              if (
                parentCollapseDiv.parentElement.closest(
                  '.collapse.menu-dropdown'
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest('.collapse')
                  .classList.add('show')
                if (
                  parentCollapseDiv.parentElement.closest('.collapse')
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest('.collapse')
                    .previousElementSibling.classList.add('active')
              }
            }
          }
        }
      }, 1000)
    },
  },
}
</script>

<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/SophicLight.svg" alt="" height="56" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/SophicLight.svg" alt="" height="56" />
            </span>
          </router-link>
          <!-- Light Logo-->
          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img
                src="@/assets/SophicDark.svg"
                alt=""
                height="56"
              />
            </span>
            <span class="logo-lg">
              <img
                src="@/assets/SophicDark.svg"
                alt=""
                height="56"
              />
            </span>
          </router-link>
          <button
            id="vertical-hover"
            type="button"
            class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          >
            <i class="ri-record-circle-line"></i>
          </button>
        </div>
        <div id="scrollbar">
          <div class="container-fluid">
            <ul id="navbar-nav" class="navbar-nav h-100">
              <li class="menu-title">
                <span data-key="t-menu"> {{ $t('t-menu') }}</span>
              </li>
              <li class="nav-item"
                v-for="item in originalMenuItems"
                :key="item.id">
                <template v-if="item.subItems">
                  <a
                  class="nav-link menu-link"
                  :href="`#subitem-${item.id}`"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  :aria-controls="`subitem-${item.id}`"
                >
                  <i :class="item.icon"></i>
                  <span>{{ item.label }}</span>
                </a>
                <div :id="`subitem-${item.id}`" class="collapse menu-dropdown">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item"
                    v-for="(subItem, indexSub) in item.subItems"
                    :key="indexSub">
                      <router-link
                        :to="subItem.link"
                        class="nav-link custom-abc"
                      >
                      {{ subItem.label }}
                      </router-link>
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
              </li>
            </ul>
          </div>
          <!-- Sidebar -->
        </div>
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>
      </div>
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div class="container-fluid">
            <slot />
          </div>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>
