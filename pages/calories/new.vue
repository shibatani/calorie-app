<template>
  <calory-form ref="caloryForm" @save="onSave"> </calory-form>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { caloriesStore } from "~/store";
import CaloryForm from "~/components/CaloryForm.vue";
import { CaloryParams } from "types/calories";

@Component({
  components: {
    CaloryForm,
  },
})
export default class CaloriesNewPage extends Vue {
  get caloryFormRef() {
    return this.$refs.caloryForm as CaloryForm;
  }

  async onSave(form: CaloryParams) {
    try {
      await caloriesStore.createCalory(form);
      this.caloryFormRef.formRef.resetFields()
      this.$message.success({ message: "登録しました", showClose: true });
    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true });
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 50%;
}
</style>
