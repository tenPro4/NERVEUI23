<template>
  <common-table-slot
    :items="items"
    :fields="[
      {
        key: 'user.fullName',
        label: 'User',
      },
      {
        key: 'actionTime',
        label: 'Action Time',
        defaultSort: 'desc',
      },
      {
        key: 'actionType',
        label: 'Action Type',
      },
      {
        key: 'remark',
        label: 'Remark',
      },
    ]"
  >
    <template #body="{ rows }">
      <tr v-for="(row, index) in rows" :key="index">
        <td>
          {{ row.user && row.user.fullName + ` (${row.user.username})` }}
        </td>
        <td>
          {{
            row.actionTime &&
            $dayjs(row.actionTime).format('L LT')
          }}
        </td>
        <td>{{ row.actionType }}</td>
        <td>{{ row.remark }}</td>
      </tr>
    </template>
  </common-table-slot>
</template>
<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>
