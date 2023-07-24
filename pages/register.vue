<script>
import {CREATE_TENANT_MUTATION} from '../schemas/mutations'
import {getDummyData} from '../schemas/queries'

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
  },
  async mounted(){
    this.loading = true

    this.newFlow = await this.$ory.createBrowserRegistrationFlow();
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
    async tryToRegister() {
      const res = await this.$apollo.query({
          query: getDummyData,
        })

      console.log('cdata114',res.data)
      console.log('body r',this.kratosFlowRequest)
      try{
        await this.$ory.updateRegistrationFlow({flow:this.newFlow.data.id,updateRegistrationFlowBody:this.kratosFlowRequest})
        const input = {
        name: this.kratosFlowRequest['traits.tenant'],
        icon: '',
        description: 'd1',
        pool: 1
      };
      await this.$apollo.mutate({
          mutation: CREATE_TENANT_MUTATION,
          variables: {
            input
          },
        });
      // console.log(response.data.createNewTenant.tenant.name);
      this.$router.push('/login')
      }
      catch(err)
      {
        console.log('err58',err)
        this.$notify.error('Something wrong.')
      }
    },
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
                <router-link to="/" class="logo logo-dark">
                  <img
                    src="~/assets/SophicLight.svg"
                    alt=""
                    height="120"
                  />
                </router-link>

                <router-link to="/" class="logo logo-light">
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
                  <p class="">New User Registration</p>
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
                      v-model="kratosFlowRequest['traits.email']"
                      class="form-control"
                      placeholder="Enter email"/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label" for="password-input">Password</label>
                    <div class="position-relative auth-pass-inputgroup mb-3">
                      <input class="form-control" type="password" v-model="kratosFlowRequest.password"/>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="tenant" class="form-label">User Name</label>
                    <input
                      v-model="kratosFlowRequest['traits.tenant']"
                      class="form-control"
                      placeholder="Enter username"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="tenant" class="form-label">Role</label>
                    <input
                      v-model="kratosFlowRequest['traits.role']"
                      class="form-control"
                      placeholder="Enter role"
                    />
                  </div>

                  <div class="mt-4">
                    <button
                      class="btn btn-primary w-100"
                      type="button" @click="tryToRegister()">Register</button>
                    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                    <div style="padding-top:20px;text-align:center">
                    <NuxtLink to="/login" class="text-muted"> Back to login </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} Sophic Automation.
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
