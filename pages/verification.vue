<template>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h4 class="card-title mb-3">Verifiction</h4>
          </div>
        </div>
        <div>
          <div v-if="!loading">
            <label for="acceptCountLimit" class="form-label">Verification Email</label>
            <input
              v-model="kratosFlowRequest.email"
              type="email"
              class="form-control"
            />
          </div>
          <button class="btn btn-primary mt-2" @click="updateVerification()">Submit</button>
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
        title: 'Verifiction',
      }
    },
    async beforeMount() {
      this.loading = true
      this.newFlow = await this.$ory.createBrowserVerificationFlow()
      this.kratosFlowRequest = this.newFlow.data.ui.nodes.reduce((obj, node) => {
        if (node.attributes.value !== undefined) {
          obj[node.attributes.name] = node.attributes.value
        } else {
          obj[node.attributes.name] = ''
        }
  
        return obj
      }, {})
      console.log('verify51',this.kratosFlowRequest)
      this.loading = false
    },
    mounted() {
      this.setTitle(this.$metaInfo.title)
      this.setItems([
        {
          text: 'Verifiction',
          active: true,
        },
      ])
    },
    methods: {
      ...breadcrumbMethods,
      async updateVerification() {
        try{
          await this.$ory.updateVerificationFlow({flow:this.newFlow.data.id,updateVerificationFlowBody:this.kratosFlowRequest})
          this.$notify.success('Verification code has been send')
        }
        catch(err){
          this.$notify.error('Something wrong')
        }
      },
    },
  }
  </script>
  