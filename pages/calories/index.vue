<template>
  <div class="wrapper">
    <calory-list ref="caloryList" @delete="onDelete" :list-params="listParams">
    </calory-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { caloriesStore } from "~/store";
import { format } from "date-fns";
import { CaloryParams } from "types/calories";
import CaloryList from "~/components/CaloryList.vue";

@Component({
  components: {
    CaloryList,
  },
})
export default class CaloryListPage extends Vue {
  get calories() {
    return caloriesStore.calories;
  }

  get listParams() {
    return this.calories.filter(
      (calory) => calory.date === format(new Date(), "yyyy-MM-dd")
    );
  }

  get otherCalories() {
    return this.calories.filter(
      (calory) => calory.date !== format(new Date(), "yyyy-MM-dd")
    );
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
  padding-top: 20px;
}

.flex {
  display: flex;
}
</style>
