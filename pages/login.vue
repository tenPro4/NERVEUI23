<script>
export default {
  auth: false,
  layout: 'none',
  data() {
    return {
      loading:true,
      newFlow:null,
      kratosFlowRequest:null,
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null
    },
    currentUrl(){
      return this.$config.API_BASE_URL
    }
  },
  async mounted(){
    this.loading = true

    this.newFlow = await this.$ory.createBrowserLoginFlow();
    this.kratosFlowRequest = this.newFlow.data.ui.nodes.reduce((obj, node) => {
      if (node.attributes.value !== undefined) {
        obj[node.attributes.name] = node.attributes.value;
      }
      else{
        obj[node.attributes.name] = "";
      }
      
      return obj;
    }, {});

    this.loading = false
  },
  methods: {
    async tryLogin(){
      try
      {
        await this.$ory.updateLoginFlow({flow:this.newFlow.data.id,updateLoginFlowBody:this.kratosFlowRequest})
        this.$router.push('/')
      }
      catch{
        this.$notify.error('Invalid email or password,please try again.')
      }
    }
  },
}
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4">
              <div class="auth-logo">
                <router-link to="/" class="logo">
                  <img
                    src="~/assets/sophic.svg"
                    alt=""
                    height="120"
                  />
                </router-link>
              </div>
              <p class="mt-3 fs-24 fw-medium">Nerve System</p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center" v-if="!loading">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="">Sign in to continue to Nerve System</p>
                </div>
                <div class="p-2 mt-4">
                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>
                  <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input
                        v-model="kratosFlowRequest.identifier"
                        class="form-control"
                        placeholder="Enter email"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="password-input">Password</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input class="form-control" name="password" type="password" v-model="kratosFlowRequest.password"/>
                      </div>
                    </div>
                    <!-- <input name="identifier" type="email" value="po@gm.com"/> -->
                    <button class="btn btn-primary w-100" type="button" @click="tryLogin()">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} Copyright of Sophic Automation Sdn Bhd
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
