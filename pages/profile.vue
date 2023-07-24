<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <h4 class="card-title mb-3">Update Settings</h4>
        </div>
      </div>
      <div>
        <div v-if="!loading">
          <label for="acceptCountLimit" class="form-label">New Password</label>
          <input
            v-model="kratosFlowRequest.password"
            type="password"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary mt-2" @click="updatePassword()">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
import { breadcrumbMethods } from '~/store/helpers'

export default {
  data() {
    return {
      loading: true,
      newFlow: null,
      kratosFlowRequest: null,
    }
  },
  head() {
    return {
      title: 'My Profile',
    }
  },
  async beforeMount() {
    this.loading = true
    this.newFlow = await this.$ory.createBrowserSettingsFlow()
    this.kratosFlowRequest = this.newFlow.data.ui.nodes.reduce((obj, node) => {
      if (node.attributes.value !== undefined) {
        obj[node.attributes.name] = node.attributes.value
      } else {
        obj[node.attributes.name] = ''
      }

      return obj
    }, {})
    this.loading = false
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
    async updatePassword() {
      try{
        await this.$ory.updateSettingsFlow({flow:this.newFlow.data.id,updateSettingsFlowBody:this.kratosFlowRequest})
        this.$notify.success('Password update successfully')
      }
      catch(err){
        this.$notify.error('Something wrong')
      }
    },
  },
}
</script>
