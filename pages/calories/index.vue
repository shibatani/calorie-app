<template>
  <div class="wrapper">
    <div class="flex">
      <h2>本日の摂取カロリー</h2>
      <h2></h2>
    </div>
    <el-table
      :data="todayCalories"
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
      <el-table-column
        label="種類"
        prop="kind"
      >
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
    <h2>本日以外の摂取カロリー</h2>
      <el-table
        :data="otherCalories"
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
        <el-table-column
          label="種類"
          prop="kind"
        >
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { caloriesStore } from "~/store";
import { format } from "date-fns";
import { CaloryParams } from "types/calories";

@Component
export default class CaloryList extends Vue {
  get calories() {
    return caloriesStore.calories;
  }

  get todayCalories() {
    return this.calories.filter(
      (calory) => calory.date === format(new Date(), "yyyy-MM-dd")
    );
  }

  get otherCalories() {
    return this.calories.filter(
      (calory) => calory.date !== format(new Date(), "yyyy-MM-dd")
    );
  }

  async onEdit(calory: CaloryParams) {
    this.$router.push(`/calories/${calory.id}`)
  }

  async onDelete(calory: CaloryParams) {
    try {
      await caloriesStore.deleteCalory(calory.id);
      await caloriesStore.fatchCalories();
      this.$message.success({ message: "削除しました", showClose: true });
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }

  async created() {
    try {
      await caloriesStore.fatchCalories();
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 70%;
  padding-top: 50px;
}

.flex {
  display: flex;
}
</style>
