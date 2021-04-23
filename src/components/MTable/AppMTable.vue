<template>
  <div class="mtable__wrapper">
    <table class="mtable__wrapper__table">
      <thead>
        <tr>
          <th
            v-for="field of fields"
            :key="field.id"
            :style="{ width: field.width ? field.width : '' }"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item of data"
          :key="item[rowKey]"
          :class="{ selected: selectedRowKey === item[rowKey], ...rowClass(item) }"
        >
          <td
            v-for="field of fields"
            :key="field.id"
            :style="{ 'white-space': field.nowrap ? 'pre' : '' }"
            @click="handleRowClick(item, field, $event)"
            @dblclick="handleRowDblClick(item, field, $event)"
          >
            {{ item[field.name] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mtable__wrapper__placeholder" v-if="data.length === 0">
      {{ placeholder }}
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'AppMTable',
  model: {
    prop: 'data',
    event: 'change',
  },
  props: {
    data: { type: Array, required: true },
    fields: { type: Array, required: true },
    rowKey: { type: String, required: true },
    rowClassName: { type: Function, required: false },
    placeholder: { type: String, default: 'Нет данных' },
  },
  emits: ['rowClick', 'rowDblClick'],
  setup(props, { emit }) {
    const selectedRowKey = ref(null)

    const handleRowClick = (row, field, event) => {
      selectedRowKey.value = row[props.rowKey]
      emit('row-click', row, field, event)
    }

    const handleRowDblClick = (row, field, event) => {
      emit('row-dbl-click', row, field, event)
    }

    const rowClass = (row) => {
      if (!props.rowClassName) {
        return {}
      }
      const rowClass = props.rowClassName(row)
      if (rowClass) {
        return { [rowClass]: true }
      } else {
        return {}
      }
    }
    return { selectedRowKey, handleRowClick, handleRowDblClick, rowClass }
  },
}
</script>

<style lang="scss">
$font-size: 12pt;
$border-color: #dee2e6;
$table-background: #ffffff;
$table-color: #000000;
$header-background: #ececec;
$header-color: #000000;
$selected-background: #caccff;
$selected-color: #000000;

.mtable__wrapper {
  height: 100%;
  display: flex;
  overflow-y: auto;
  min-height: 100px;
  overflow-x: hidden;
  font-size: $font-size;
  flex-direction: column;
  border-top: 1px solid $border-color;
  &__table {
    table-layout: fixed;
    width: 100%;
    position: relative;
    border-collapse: collapse;
    color: $table-color;
    background-color: $table-background;
    & tr:hover td:after {
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      width: 105%;
      border-top: 1px dotted #000000;
      border-bottom: 1px dotted #000000;
    }
    & tbody tr:nth-child(even) {
      background-color: #00000014;
    }
    & th {
      position: sticky;
      top: 0;
      z-index: 1;
      padding-top: 5px;
      padding-bottom: 5px;
      color: $header-color;
      background-color: $header-background;
      border-right: 1px solid $border-color;
    }
    & td {
      border: 1px solid $border-color;
      cursor: pointer;
      padding: 3px;
      overflow: hidden;
      //word-break: break-all;
      position: relative;
    }
    & .selected {
      background-color: $selected-background !important;
      color: $selected-color;
    }
  }
  &__placeholder {
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
}
</style>
