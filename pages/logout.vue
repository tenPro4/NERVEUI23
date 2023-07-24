<script>
export default {
   async mounted(){
    try{
      await this.$ory.createBrowserLogoutFlow().then(async ({ data }) => {
          console.log('logout data_197',data)
          await this.$ory.updateLogoutFlow({
            token: data.logout_token,
          })
        })
    }
    catch(err){}

    window.location.href="/login"
  }
}
</script>
