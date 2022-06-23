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
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { ElForm } from 'element-ui/types/form'
import { format } from 'date-fns'
import { CaloryParams } from "types/calories";

@Component
export default class CaloryForm extends Vue {
  @Prop({ type: Object, default: null }) formParams!: CaloryParams | null

  form = this.createFormModel()

  createFormModel (): CaloryParams {
    return this.mergeDefaultFormParams({
      id: "",
      date: format(new Date(), 'yyyy-MM-dd').toString(),
      kind: "breakfast",
      title: "",
      calory: 0,
    })
  }

  mergeDefaultFormParams (form: CaloryParams) {
    if (this.formParams) {
      return { ...form, ...this.formParams }
    } else {
      return form
    }
  }

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

  onSave() {
    try {
      this.form.date = format(new Date(this.form.date), 'yyyy-MM-dd')
      this.$emit('save', { ...this.form })
    } catch {
      this.$message.error({ message: "エラー発生しました", showClose: true });
    }
  }

  @Watch('formParams', { deep: true, immediate: true })
  onFormParamsChange () {
    this.form = this.createFormModel()
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 50%;
}
</style>