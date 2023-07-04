<script>
import SimpleBar from 'simplebar-vue'
import { layoutComputed } from '~/store/helpers'

import NavBar from '~/components/layout/nav-bar'
import RightBar from '~/components/layout/right-bar'
import Footer from '~/components/layout/footer'
import MenuRevisited from '~/components/layout/menu-revisited'

/**
 * Vertical layout
 */
export default {
  components: { NavBar, RightBar, Footer, SimpleBar, MenuRevisited },
  data() {
    return {
      isMenuCondensed: false,
    }
  },
  computed: {
    ...layoutComputed,
  },
  created: () => {
    document.body.removeAttribute('data-layout', 'horizontal')
    document.body.removeAttribute('data-topbar', 'dark')
    document.body.removeAttribute('data-layout-size', 'boxed')
  },
  mounted() {},
  methods: {
    toggleMenu() {
      document.body.classList.toggle('sidebar-enable')

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable')
          document.body.classList.remove('vertical-collpsed')
        })
        document.body.classList.toggle('vertical-collpsed')
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable')
        })
        document.body.classList.remove('vertical-collpsed')
      }
      this.isMenuCondensed = !this.isMenuCondensed
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled')
    },
    hideRightSidebar() {
      document.body.classList.remove('right-bar-enabled')
    },
    mobileHide(){
      document.body.classList.remove('vertical-sidebar-enable')
      document.body.classList.remove('vertical-overlay')
    }
  },
}
</script>

<template>
  <div id="layout-wrapper">
    <NavBar />
    <div>
      <!-- ========== Left Sidebar Start ========== -->
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <router-link to="/" class="logo">
            <span class="logo-sm">
              <img src="@/assets/infi_logo_left.png" alt="" height="56" width="100%"/>
            </span>
            <span class="logo-lg">
              <img src="@/assets/infi_logo_left.png" alt="" height="56" />
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

        <SimpleBar id="scrollbar" ref="scrollbar" class="h-100">
          <MenuRevisited></MenuRevisited>
        </SimpleBar>
      </div>
      <!-- Left Sidebar End -->
      <!-- Vertical Overlay-->
      <div @click="mobileHide()" class="vertical-overlay"></div>
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
</template>
