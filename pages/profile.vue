<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="card-title mb-3">Update Profile</h4>
                    </div>
                </div>
                <form @submit.prevent="updateProfile" class="d-grid gap-3">
                    <div>
                        <label for="acceptCountLimit" class="form-label">Full Name</label>
                        <input
                          v-model="data.fullName"
                          type="text"
                          class="form-control"
                        />
                    </div>
                    <div>
                        <label for="acceptCountLimit" class="form-label">User Name</label>
                        <input
                          v-model="data.username"
                          disabled
                          type="text"
                          class="form-control"
                        />
                    </div>
                    <div>
                        <label for="acceptCountLimit" class="form-label">Email</label>
                        <input
                          v-model="data.email"
                          type="email"
                          class="form-control"
                        />
                    </div>
                    <div>
                        <label for="acceptCountLimit" class="form-label">Old Password</label>
                        <input
                          v-model="data.oldPassword"
                          type="password"
                          class="form-control"
                          placeholder="Leave blank to keep same password"
                        />
                    </div>
                    <div>
                        <label for="acceptCountLimit" class="form-label">New Password</label>
                        <input
                          v-model="data.password"
                          type="password"
                          class="form-control"
                          placeholder="Leave blank to keep same password"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>

                </form>

            </div>

        </div>

    </div>
</template>
<script> 
import { breadcrumbMethods } from '~/store/helpers'
 
export default {
 
  data() {
    return {
      data: {},
     
    }
  },
  async fetch() {
    const data = await this.$axios.$get('/user/me')
   
    this.data = data
    data.password = ''
    data.oldPassword = ''
    this.cancel()
  },
  head() {
    return {
      title: 'My Profile',
    }
  },

  mounted() {
    this.setTitle(this.$metaInfo.title)
    this.setItems([
      {
        text: 'My Profile',
        active: true,
      },
    ])
  },
  methods: {
    ...breadcrumbMethods,
    async updateProfile() {
      try {
        const result = await this.$axios.$put(`/user/me`, {
          id: this.$auth.user.id,
          fullName: this.data.fullName,
          password: this.data.password,
          oldPassword: this.data.oldPassword,
          email:this.data.email,
        })
        if (!result.error) {
          this.$noty.success('Profile has been updated')
          await this.$fetch()
        }
      } catch {}
    },
   
  },
}
</script>