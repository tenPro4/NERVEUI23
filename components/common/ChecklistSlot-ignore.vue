<template>
  <div>
    <div class="card">
      <div class="card-header d-flex align-items-center">
        <div class="flex-grow-1">Checklist</div>
        <button
          v-if="$auth.user.isManager"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#manageChecklistModel"
        >
          Manage / Add
        </button>
      </div>
      <div class="card-body">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <td>Details</td>
              <td>Status</td>
              <td>Done</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in checklist" :key="index">
              <td>
                {{
                  item.others || (item.checklist && item.checklist.checklist1)
                }}
              </td>
              <td>
                {{ item.endTime ? 'Closed' : 'Open' }}
                {{
                  item.endTime &&
                  item.picUser &&
                  '(by ' +
                    item.picUser.fullName +
                    ' (' +
                    item.picUser.username +
                    ') at ' +
                    $dayjs(item.endTime).format('L LT') +
                    ')'
                }}
              </td>
              <td>
                <div class="fs-4">
                  <input
                    @change.prevent="
                      updateChecklist(item.id, $event.target.checked)
                    "
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    :id="`checklist-check-${index}`"
                    :checked="item.endTime"
                    :disabled="isDisabled"
                  />
                  <label
                    class="form-check-label"
                    :for="`checklist-check-${index}`"
                  >
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal fade" id="manageChecklistModel">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Manage Checklist</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <td>Details</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in checklist" :key="index">
                  <td>
                    {{
                      item.others ||
                      (item.checklist && item.checklist.checklist1)
                    }}
                  </td>
                  <td>
                    <el-popconfirm
                      icon="el-icon-info"
                      icon-color="red"
                      title="Are you sure to delete this?"
                      @confirm="checklistRemove(item.id)"
                    >
                      <button slot="reference" class="btn btn-sm btn-danger">
                        Delete
                      </button>
                    </el-popconfirm>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <label class="form-label">Add Checklist</label>
              <input class="form-control" v-model="checklist_add_input" />
            </div>
            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-primary" @click="checklistAdd">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
