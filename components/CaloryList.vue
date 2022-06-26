<template>
  <div>
    <div class="calory-list-head">
      <h2>摂取カロリー</h2>
      <el-select v-model="filterDate" placeholder="Select">
        <el-option
          v-for="date in dates"
          :key="date.value"
          :label="date.key"
          :value="date.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="listParams"
    >
      <el-table-column
        label="日付"
        prop="date"
      >
      </el-table-column>
      <el-table-column
        label="名前"
        prop="title"
      >
      </el-table-column>
      <el-table-column label="種別">
        <template slot-scope="scope">
          <tag :kind="scope.row.kind"></tag>
        </template>
      </el-table-column>
      <el-table-column
        label="カロリー(kcal)"
        prop="calory"
      >
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onEdit(scope.row)">編集</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onDelete(scope.row)">削除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import { CaloryParams } from "types/calories";
import { caloriesStore } from "~/store";
import Tag from "~/components/Tag.vue";

import { addDays, format } from 'date-fns'

@Component({
  components: {
    Tag,
  },
})
export default class CaloryList extends Vue {
  @Prop({ type: Array, default: null }) listParams!: CaloryParams[] | null

  filterDate: string = format(new Date(), 'yyyy-MM-dd')

  get dates() {
    return [...Array(5)].map((_, i) => ({
      value: format(addDays(new Date(), -i), 'yyyy-MM-dd'),
      key: format(addDays(new Date(), -i), 'yyyy-MM-dd')
    }));
  }

  onEdit(calory: CaloryParams) {
    this.$router.push(`/calories/${calory.id}`);
  }

  onDelete(calory: CaloryParams) {
    this.$emit('delete', { ...calory }, this.filterDate)
  }

  @Watch('filterDate')
  onChange () {
    try {
      caloriesStore.fetchCalories(this.filterDate);
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }
}
</script>

<style scoped>
.calory-list-head {
  display: flex;
  justify-content: space-between;
}

.el-select {
  display: flex;
  align-items: center;
}
</style>
