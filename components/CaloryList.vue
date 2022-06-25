<template>
  <div>
    <div class="flex">
      <h2>本日の摂取カロリー</h2>
      <h2></h2>
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
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { CaloryParams } from "types/calories";
import Tag from "~/components/Tag.vue";

@Component({
  components: {
    Tag,
  },
})
export default class CaloryList extends Vue {
  @Prop({ type: Object, default: null }) listParams!: CaloryParams | null

  async onEdit(calory: CaloryParams) {
    this.$router.push(`/calories/${calory.id}`);
  }

  onDelete(calory: CaloryParams) {
    this.$emit('delete', { ...calory })
  }
}
</script>
