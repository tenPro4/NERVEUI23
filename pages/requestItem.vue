<template>
    <div>

        <div class="row">
      <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Delete Module</h4>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="nameInput" class="form-label">Requestor ID</label>
                </div>
                <div class="col-lg-9">
                <input
                    type="text"
                    class="form-control"
                    id="nameInput"
                    placeholder="Enter your requestor ID"
                />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Requestor Name</label
                >
                </div>
                <div class="col-lg-9">
                <input
                    type="text"
                    class="form-control"
                    id="websiteUrl"
                    placeholder="Enter requestor name"
                />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Module</label
                >
                </div>
                <div class="col-lg-9">
                    <select
                    class="form-select mb-3"
                    aria-label="Default select example"
                  >
                    <option selected>Select your module</option>
                    <option value="1">Declined Payment</option>
                    <option value="2">Delivery Error</option>
                    <option value="3">Wrong Amount</option>
                  </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="text-end">
                    <button class="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        </div>
      </div>
        
    </div>
    
    <div class="row">
      <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Add Item</h4>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="nameInput" class="form-label">Item Type</label>
                </div>
                <div class="col-lg-9">
                    <select
                    class="form-select mb-3"
                    aria-label="Default select example"
                  >
                  <option selected>Select your item type</option>
                    <option value="1">Declined Payment</option>
                    <option value="2">Delivery Error</option>
                    <option value="3">Wrong Amount</option>
                  </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Item</label
                >
                </div>
                <div class="col-lg-9">
                    <select
                    class="form-select mb-3"
                    aria-label="Default select example"
                  >
                  <option selected>Select your item</option>
                    <option value="1">Declined Payment</option>
                    <option value="2">Delivery Error</option>
                    <option value="3">Wrong Amount</option>
                  </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Quantity</label
                >
                </div>
                <div class="col-lg-9">
                    <input
                    type="number"
                    class="form-control"
                    placeholder="Enter your quantity"
                />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Reason</label
                >
                </div>
                <div class="col-lg-9">
                    <textarea class="form-control" placeholder="Enter Reason" id="gen-info-description-input" rows="2"></textarea>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                <label for="websiteUrl" class="form-label"
                    >Date</label
                >
                </div>
                <div class="col-lg-9">
                    <input class="form-control" type="datetime-local" />
                </div>
            </div>
            <div class="row mb-3">
                <div class="text-center">
                    <button class="btn btn-primary btn-sm">Add To Basket</button>
                </div>
            </div>
        </div>
      </div>
        
    </div>
    </div>
  </template>
  
  <script>
  import { breadcrumbMethods } from '~/store/helpers'
  
  export default {
    data() {
      return {
        loading: false,
      }
    },
    // async fetch() {
    //   this.loading = true;
  
    //   // this.options = await this.$axios.$get('/machine/NotMapping');
  
    //   this.loading = false;
    // },
    head() {
      return {
        title: 'Request Item',
      }
    },
    mounted() {
      this.setTitle(this.$metaInfo.title)
      this.setItems([
        {
          text: 'Request Item',
          active: true,
        },
      ])
    },
    methods: {
      ...breadcrumbMethods,
      },
  }
  </script>