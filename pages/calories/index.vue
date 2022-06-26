<template>
  <div class="wrapper">
    <calory-list ref="caloryList" @delete="onDelete" :list-params="listParams">
    </calory-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { caloriesStore } from "~/store";
import { CaloryParams } from "types/calories";
import CaloryList from "~/components/CaloryList.vue";

@Component({
  components: {
    CaloryList,
  },
})
export default class CaloriesListPage extends Vue {
  get calories() {
    return caloriesStore.calories;
  }

  get listParams() {
    return this.calories;
  }

  async onDelete(calory: CaloryParams, date: string) {
    try {
      await caloriesStore.deleteCalory(calory.id);
      await caloriesStore.fetchCalories(date);
      this.$message.success({ message: "削除しました", showClose: true });
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }

  async created() {
    try {
      await caloriesStore.fetchCalories();
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
  padding-top: 20px;
}

.flex {
  display: flex;
}
</style>
