<template>
  <div>
    <div class="mb-3">
      <div class="d-grid gap-3 d-flex align-items-center">
        <div>
          <label for="search" class="col-form-label">Search</label>
        </div>
        <div>
          <input
            id="search"
            v-model="filters.default.value"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <VTable
        :filters="filters"
        :data="items"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        class="table table-bordered table-striped table-hover"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr>
            <VTh
              v-for="(item, index) in fields"
              :key="index"
              :sort-key="item.key"
              >{{ item.label }}</VTh
            >
          </tr>
        </template>
        <template #body="{ rows }">
          <tr v-for="row in rows" :key="row.id">
            <td v-for="(item, index) in fields" :key="index">
              {{ row[item.key] }}
            </td>
          </tr>
        </template>
      </VTable>

      <VTPagination :current-page.sync="currentPage" :total-pages="totalPages">
        <template #firstPage>
          <span aria-hidden="true">&laquo;</span>
        </template>

        <template #lastPage>
          <span aria-hidden="true">&raquo;</span>
        </template>

        <template #next>
          <span aria-hidden="true">&raquo;</span>
        </template>

        <template #previous>
          <span aria-hidden="true">&laquo;</span>
        </template>
      </VTPagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filters: {
        default: {
          value: '',
          keys: this.fields.map((a) => a.key),
        },
      },
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    }
  },
}
</script>
