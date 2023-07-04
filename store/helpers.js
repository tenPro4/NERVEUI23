import { mapState, mapActions } from 'vuex'

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    sidebarSize: (state) => state.sidebarSize,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    mode: (state) => state.mode,
    position: (state) => state.position,
    sidebarView: (state) => state.sidebarView,
    sidebarColor: (state) => state.sidebarColor,
  }),
}

export const layoutMethods = mapActions('layout', [
  'changeLayoutType',
  'changeLayoutWidth',
  'changeSidebarSize',
  'changeTopbar',
  'changeMode',
  'changePosition',
  'changeSidebarView',
  'changeSidebarColor',
  'toggleMode',
])

export const notificationMethods = mapActions('notification', [
  'success',
  'error',
  'clear',
])

export const breadcrumbMethods = mapActions('breadcrumb', [
  'setTitle',
  'setItems',
])

export const intervalMethods = mapActions('interval', {
  addInterval: 'add',
  clearInterval: 'clear',
})
