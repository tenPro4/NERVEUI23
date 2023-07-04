<script>
import { layoutMethods } from '~/store/helpers'

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      languages: [
        {
          flag: require('~/assets/images/flags/us.svg'),
          language: 'en',
          title: 'English',
        },
        {
          flag: require('~/assets/images/flags/french.svg'),
          language: 'fr',
          title: 'French',
        },
        {
          flag: require('~/assets/images/flags/spain.svg'),
          language: 'sp',
          title: 'Spanish',
        },
        {
          flag: require('~/assets/images/flags/china.svg'),
          language: 'ch',
          title: 'Chinese',
        },
        {
          flag: require('~/assets/images/flags/germany.svg'),
          language: 'gr',
          title: 'Deutsche',
        },
        {
          flag: require('~/assets/images/flags/russia.svg'),
          language: 'ru',
          title: 'русский',
        },
      ],
      lan: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,
    }
  },
  computed: {},
  mounted() {
    if (document.getElementById('topnav-hamburger-icon'))
      document
        .getElementById('topnav-hamburger-icon')
        .addEventListener('click', this.toggleHamburgerMenu)
  },
  methods: {
    ...layoutMethods,
    toggleHamburgerMenu() {
      const windowSize = document.documentElement.clientWidth

      if (windowSize > 767)
        document.querySelector('.hamburger-icon').classList.toggle('open')

      // For collapse horizontal menu
      if (
        document.documentElement.getAttribute('data-layout') === 'horizontal'
      ) {
        document.body.classList.contains('menu')
          ? document.body.classList.remove('menu')
          : document.body.classList.add('menu')
      }

      // For collapse vertical menu
      if (document.documentElement.getAttribute('data-layout') === 'vertical') {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove('vertical-sidebar-enable')
          document.documentElement.getAttribute('data-sidebar-size') === 'sm'
            ? document.documentElement.setAttribute('data-sidebar-size', '')
            : document.documentElement.setAttribute('data-sidebar-size', 'sm')
        } else if (windowSize > 1025) {
          document.body.classList.remove('vertical-sidebar-enable')
          document.documentElement.getAttribute('data-sidebar-size') === 'lg'
            ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
            : document.documentElement.setAttribute('data-sidebar-size', 'lg')
        } else if (windowSize <= 767) {
          document.body.classList.add('vertical-sidebar-enable')
          document.documentElement.setAttribute('data-sidebar-size', 'lg')
        }
      }

      // Two column menu
      if (
        document.documentElement.getAttribute('data-layout') === 'twocolumn'
      ) {
        document.body.classList.contains('twocolumn-panel')
          ? document.body.classList.remove('twocolumn-panel')
          : document.body.classList.add('twocolumn-panel')
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
    initFullScreen() {
      document.body.classList.toggle('fullscreen-enable')
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          )
        }
      } else if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale
      this.text = country
      this.flag = flag
      document.getElementById('header-lang-img').setAttribute('src', flag)
      this.$i18n.global.locale = locale
    },
    toggleDarkMode() {
      this.toggleMode()
    },
  },
}
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
            <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/SophicLight.svg" alt="" height="56" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/SophicLight.svg" alt="" height="56" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/SophicDark.svg" alt="" height="56" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/SophicDark.svg" alt="" height="56" />
              </span>
            </router-link>
          </div>
          <button
            id="topnav-hamburger-icon"
            type="button"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <div class="d-flex align-items-center">
          <div
            class="dropdown d-md-none topbar-head-dropdown header-item"
          ></div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-toggle="fullscreen"
              @click="initFullScreen"
            >
              <i class="bx bx-fullscreen fs-22"></i>
            </button>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
              @click="toggleDarkMode"
            >
              <i class="bx bx-moon fs-22"></i>
            </button>
          </div>

       
          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button
              id="page-header-user-dropdown"
              type="button"
              class="btn"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  src="@/assets/images/users/user-dummy-img.jpg"
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span
                    class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >admin</span
                  >
                  <!-- <span
                    class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
                    >{{ $auth.user.userType }}</span
                  > -->
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <!-- item-->
              <h6 class="dropdown-header">
                Welcome admin!
              </h6>
              <router-link class="dropdown-item" to="/profile"
                ><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
                ></i>
                <span class="align-middle">Profile</span></router-link
              >
              <div class="dropdown-divider"></div>
              <nuxt-link class="dropdown-item" to="/logout"
                ><i
                  class="mdi mdi-logout text-muted fs-16 align-middle me-1"
                ></i>
                <span class="align-middle" data-key="t-logout">Logout</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
