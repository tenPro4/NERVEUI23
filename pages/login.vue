<script>
import { required } from 'vuelidate/lib/validators'

export default {
  auth: false,
  layout: 'none',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    }
  },
  validations() {
    return {
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
    currentUrl(){
      return this.$config.API_BASE_URL
    }
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true
      // stop here if form is invalid

      this.$v.$touch()

      // eslint-disable-next-line no-empty
      if (this.$v.$invalid) {
      } else {
        const { username, password } = this
        // if (username && password) {
        //   this.tryingToLogIn = true
        //   try {
        //     await this.$auth.loginWith('local', {
        //       data: {
        //         username: this.username,
        //         password: this.password,
        //       },
        //     })
        //     .then(() => {
        //       this.$router.push('/')
        //     })
        //     .catch(() => this.$noty.error('Username or password was invalid!'))
            
        //   } catch {}
        //   this.tryingToLogIn = false
        // }
        this.$router.push('/')
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

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="">Sign in to continue to eCRE Tracking</p>
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

                  <form @submit.prevent="tryToLogIn">
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
                      <!-- <div class="float-end">
                        <router-link to="/forgotpassword" class="text-muted"
                          >Forgot password?</router-link
                        >
                      </div>  -->
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
                        Sign In
                      </button>
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
