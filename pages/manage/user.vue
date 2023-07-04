<template>
  <div class="form-group">
    <div class="card">
      <div class="card-header align-items-center d-flex justify-content-between">
        <div class="flex-grow-1">
          {{ $metaInfo.title }}
        </div>
        <div>
          <button class="btn btn-primary" @click="addOrEdit(1)">
              Add New User
          </button>
        </div>
      </div>
      <div class="card-body">
        <common-table-slot :items="items" :fields="[
          {
            label: 'Id',
            hide: true
          },
          {
            key: 'username',
            label: 'User Name',
          },
          {
            key: 'email',
            label: 'Email',
          },
          {
            label: 'Action'
          },
        ]">
          <template #body="{ rows }">
            <tr v-for="(row, index) in rows" :key="index" :row="row">
              <td hidden>{{ row.id }}</td>
              <td>{{ row.username }}</td>
              <td>{{ row.email }}</td>
              <td>
                <button class="btn btn-secondary mx-3" @click="addOrEdit(2, row)">Edit</button>
                <button @click="removeUser(row)" class="btn btn-danger mx-3">Delete</button>
              </td>
            </tr>
          </template>

        </common-table-slot>

      </div>
    </div>
    
    <div id="userModal" ref="userModal" class="modal fade" tabindex="-1" aria-labelledby="addUserLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="addUserLabel" class="modal-title">{{ userData.id !== null ? "Edit" : "Add" }} User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-grid gap-3">
            <div>
              <label for="username" class="form-label">User Name</label>
              <input class="form-control" type="text" v-model="userData.username" :disabled="userData.id"/>
              <span v-if="submitted && $v.userData.username.$invalid" class="text-danger font-italic font-weight-light">User name is required</span>
            </div>
            <div>
              <label for="email" class="form-label">Email</label>
              <input class="form-control" type="email" v-model="userData.email"/>
              <span v-if="submitted && $v.userData.email.$invalid" class="text-danger font-italic font-weight-light">Please provide the valid email address</span>
            </div>
            <div>
              <label for="role" class="form-label">Password</label>
              <input class="form-control" type="password" v-model="userData.password" />
              <span v-if="submitted && $v.userData.password.$invalid" class="text-danger font-italic font-weight-light">Password length require at least 6</span>
            </div>
            <div>
              <label for="role" class="form-label">Confirm Password</label>
              <input class="form-control" type="password" v-model="userData.confirmPassword" />
              <span v-if="submitted && $v.userData.confirmPassword.$invalid" class="text-danger font-italic font-weight-light">Confirm password wasn't match</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button @click="submitForm" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Modal } from "bootstrap"
import { required,minLength,sameAs,email } from 'vuelidate/lib/validators'
import { breadcrumbMethods } from '~/store/helpers'

const userValue = () =>({
  id:null,
  username:"",
  email:"",
  password:"",
  confirmPassword:""
})

export default {
  data() {
    return {
      items: [
        {
          id:1,
          username:"u1",
          email:"e1.@gm.com",
        },
        {
          id:2,
          username:"u2",
          email:"e2.@gm.com",
        },
        {
          id:3,
          username:"u3",
          email:"e3.@gm.com",
        },
        {
          id:4,
          username:"u4",
          email:"e4.@gm.com",
        },
        {
          id:5,
          username:"u5",
          email:"e5.@gm.com",
        },
      ],
      currentModal: null,
      roleOptions:[],
      userData:userValue(),
      selectItem: null,
      submitted:false
    }
  },
  validations() {
    return {
      userData: {
        username:{required},
        email:{required,email},
        password:{required,minLength: minLength(6)},
        confirmPassword: { required, sameAsPassword: sameAs('password') }
      }
    }
  },
  // async fetch() {
  //   console.log('refresh')
  //   this.items =  await this.$axios.$get('/user')
  // },
  head() {
    return {
      title: "Manage User",
    }
  },
  mounted() {
    this.setTitle(this.$metaInfo.title)
    this.setItems([
      {
        text: 'Management',
        href: '/',
      },
      {
        text: 'Manage User',
        active: true,
      },
    ])
    if (this.currentModal === null) {
      this.currentModal = new Modal(this.$refs.userModal)
    }
  },
  methods: {
    ...breadcrumbMethods,
    submitForm(){

      this.submitted = true;
      this.$v.$touch()

      if (this.$v.$invalid) {
          return;
      }

      // const cv = {
      //   ...this.userData,
      // };

      if(this.userData.id){
        // await this.$axios.put("/user",cv)
        // .then(() =>{
        //   this.$noty.success('User update success')
        // })
        // .catch((err) => console.log(err))
      }
      else{
        // await this.$axios.post("/user",cv)
        // .then(() =>{
        //   this.$noty.success('User has been added')
        // })
        // .catch((err) => console.log(err))
      }

      Object.assign(this.userData,userValue())
      this.currentModal.hide();
      this.submitted = false;
      this.$fetch();
    },
    addOrEdit(action, item) {
      
      this.submitted = false;
            if (action === 1) {
                Object.assign(this.userData,userValue())
            }
            else {
              this.userData.username = item.username;
              this.userData.email = item.email;
              this.userData.id = item.id;
            }

            this.action = action;
            this.currentModal.show();
      },
      removeUser(item){
        // await this.$axios.delete(`/user/${item.id}`)
        // .then(() =>{
        //   this.$noty.success('User has been deleted')
        // })
        // .catch(err => console.log(err));
        
        // this.$fetch();
      }
  },
}
</script>