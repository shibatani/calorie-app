<template>
  <el-form
    ref="form"
    :model="form"
    :inline-message="true"
    label-width="140px"
    label-position="left"
  >
    <div class="wrapper">
      <h2>新規登録</h2>
      <el-form-item prop="date" label="日付">
        <el-date-picker v-model="form.date" type="date"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="kind" label="種別">
        <el-select v-model="form.kind" placeholder="Select">
          <el-option
            v-for="kind in kinds"
            :key="kind.value"
            :label="kind.key"
            :value="kind.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="title" label="タイトル">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item prop="calory" label="カロリー(kcal)">
        <el-input v-model="form.calory"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSave"> 保存 </el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { ElForm } from 'element-ui/types/form'
import { caloriesStore } from "~/store";
import { format } from 'date-fns'

@Component
export default class CaloriesNewPage extends Vue {
  form = {
    date: "",
    kind: "breakfast",
    title: "",
    calory: 0,
  };

  get kinds() {
    return [
      {
        value: "breakfast",
        key: "朝食",
      },
      {
        value: "lunch",
        key: "昼食",
      },
      {
        value: "dinner",
        key: "夕食",
      },
      {
        value: "other",
        key: "その他",
      },
    ];
  }

  get formRef () {
    return this.$refs.form as ElForm
  }

  async onSave() {
    try {
      this.form.date = format(new Date(this.form.date), 'yyyy-MM-dd')
      await caloriesStore.createCalory(this.form);
      this.formRef.resetFields()
      this.$message.success({ message: "登録しました", showClose: true })

    } catch {
      this.$message.error({ message: "エラーが発生しました", showClose: true })
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
