<template>
  <div class="wrapper">
    <calory-form
      ref="caloryForm"
      title="編集画面"
      @save="onSave"
      :form-params="formParams"
    >
    </calory-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { caloriesStore } from "~/store";
import CaloryForm from "~/components/CaloryForm.vue";
import { CaloryParams } from "types/calories";

@Component({
  components: {
    CaloryForm,
  },
})
export default class CaloriesDetailPage extends Vue {
  get caloryFormRef() {
    return this.$refs.caloryForm as CaloryForm;
  }

  get formParams() {
    return caloriesStore.calory;
  }

  async fetch({ params }: Context) {
    try {
      caloriesStore.setCalory(null);
      await caloriesStore.fetchCalory(params.id);
    } catch (e) {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }

  async onSave(form: CaloryParams) {
    try {
      await caloriesStore.updateCalory(form);
      this.$router.push(`/calories`);
      this.$message.success({ message: "更新しました", showClose: true });
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding-top: 20px;
}
</style>
