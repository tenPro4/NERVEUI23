<script>
import { required } from 'vuelidate/lib/validators'

export default {
  auth: false,
  layout: 'none',
  data() {
    return {
    //   username: 'admin',
    //   password: 'admin',
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      fullname:null,
      email:null,
      username:null,
      password:null,
    }
  },
  validations() {
    return {
      fullname: {
        required,
      },
      email: {
        required,
      },
      username: {
        required,
      },
      password: {
        required,
      },
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null
    },
  },
  methods: {
    async tryToRegister() {
      this.submitted = true
      // // stop here if form is invalid

      this.$v.$touch()

      // // eslint-disable-next-line no-empty
      this.tryingToLogIn = false
      try {
        const result = await this.$axios.$post('/User', {
          Contact:"aa",
          Position:"aa",
          ReportingTo:"aa",
          fullName: this.fullname,
          username: this.username,
          password: this.password,
          email:this.email,
        })
        if (!result.error) {
          this.$noty.success('New User has been created!')
          // this.fullname = null
          // this.username = null
          // this.password = null
          // this.email = null
          await this.$fetch()
        }
      } catch {}
      await this.$router.push('/login')
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
              <p class="mt-3 fs-24 fw-medium">Sophic InternX</p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <p class="">New User Registration</p>
                </div>
                <div class="p-2 mt-4">
                  <div
                    v-if="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                  >
                    {{ authError }}
                  </div>

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <form @submit.prevent="tryToRegister">
                    <div class="mb-3">
                      <label for="fullname" class="form-label">Full Name</label>
                      <input
                        id="fullname"
                        v-model="fullname"
                        class="form-control"
                        placeholder="Enter full name"
                        :class="{
                          'is-invalid': submitted && $v.fullname.$invalid,
                        }"
                      />
                      <div
                        v-if="submitted && $v.fullname.$invalid"
                        class="invalid-feedback"
                      >
                        <span>Full name is required</span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input
                        id="email"
                        v-model="email"
                        class="form-control"
                        placeholder="Enter email"
                        :class="{
                          'is-invalid': submitted && $v.email.$invalid,
                        }"
                      />
                      <div
                        v-if="submitted && $v.email.$invalid"
                        class="invalid-feedback"
                      >
                        <span>Email is required</span>
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <label for="username" class="form-label">Username</label>
                      <input
                        id="username"
                        v-model="username"
                        class="form-control"
                        placeholder="Enter username"
                        :class="{
                          'is-invalid': submitted && $v.username.$invalid,
                        }"
                      />
                      <div
                        v-if="submitted && $v.username.$invalid"
                        class="invalid-feedback"
                      >
                        <span>Username is required</span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="password-input"
                        >Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          id="password-input"
                          v-model="password"
                          type="password"
                          class="form-control pe-5"
                          :class="{
                            'is-invalid': submitted && $v.password.$error,
                          }"
                          placeholder="Enter password"
                        />
                        <div
                          v-if="submitted && $v.password.$invalid"
                          class="invalid-feedback"
                        >
                          <span>Password is required</span>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button
                        class="btn btn-primary w-100"
                        type="submit"
                        :disabled="tryingToLogIn"
                      >
                        <span
                          v-if="tryingToLogIn"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Register
                      </button>
                      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                      <div style="padding-top:20px;text-align:center">
                      <NuxtLink to="/login" class="text-muted">--> Back to login </NuxtLink>
                      </div>
                    </div>
                  </form>
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
