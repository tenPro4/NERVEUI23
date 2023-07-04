<template>
  <div>
    <br />
    <div class="mb-3">
      <div class="d-flex">
        <div class="d-grid gap-3 d-flex align-items-center flex-grow-1">
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
        <div class="d-grid gap-2 d-flex align-items-center">
          Show
          <div>
            <select id="show" v-model="pageSize" class="form-control">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option value="">All</option>
            </select>
          </div>
          entries
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <VTable
        :filters="filters"
        :data="items"
        :page-size="parseInt(pageSize)"
        :current-page.sync="currentPage"
        class="table table-bordered table-striped table-hover"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr>
            <template v-for="(item, index) in fields">
              <v-th
                v-if="item.key"
                :key="index"
                :sort-key="item.key"
                :default-sort="item.defaultSort"
                :custom-sort="customSort(item.key)"
                >{{ item.label }}</v-th
              >
              <th v-else :key="'custom-'+index" :hidden="item.hide">{{ item.label }}</th>
            </template>
          </tr>
        </template>
        <template #body="context">
          <slot name="body" v-bind="context" v-if="items.length" />
          <slot name="body" v-else>
            <tr>
              <td :colspan="fields.length" style="text-align: center">
                No data available
              </td>
            </tr>
          </slot>
        </template>
      </VTable>

      <VTPagination
        :current-page.sync="currentPage"
        :max-page-links="5"
        :boundary-links="true"
        :total-pages="totalPages"
        :hide-single-page="false"
      >
        <template #firstPage>
          <i class="bx bx-chevrons-left" />
        </template>

        <template #lastPage>
          <i class="bx bx-chevrons-right" />
        </template>

        <template #next>
          <i class="bx bx-chevron-right" />
        </template>

        <template #previous>
          <i class="bx bx-chevron-left" />
        </template>
      </VTPagination>

      <div class="mb-3">
        Showing {{ items.length ? (currentPage - 1) * pageSize + 1 : 0 }} to
        {{
          currentPage * (pageSize || Number.MAX_VALUE) > items.length
            ? items.length
            : currentPage * (pageSize || Number.MAX_VALUE)
        }}
        of {{ items.length }} entries.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filters: {
        default: {
          value: '',
          custom: this.customFilter,
        },
      },
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    }
  },
  methods: {
    customSort(key) {
      return (a, b, sortOrder) => {
        const result = () => {
          const l = this._.get(a, key) || ''
          const r = this._.get(b, key) || ''
          if (l < r) return -1
          if (l > r) return 1
          return 0
        }
        return result() * sortOrder
      }
    },
    customFilter(search, row) {
      if (!search) return true
      const keys = this.fields.map((a) => a.key)
      for (const key of keys) {
        if (key) {
          const value = this._.get(row, key) || ''
          if (
            value
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
          )
            return true
        }
      }
      return false
    },
  },
}
</script>
