<template>
  <el-tag :type="tag.type" effect="dark">{{ tag.label }}</el-tag>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppBadge extends Vue {
  @Prop({
    required: false,
    default: "",
    type: String,
  })
  kind!: string;

  get tag() {
    switch (this.kind) {
      case "breakfast":
        return { type: "", label: "朝食" };
      case "lunch":
        return { type: "success", label: "昼食" };
      case "dinner":
        return { type: "info", label: "夕食" };
      case "other":
        return { type: "warning", label: "その他" };
    }
  }
}
</script>

<style scoped>
.el-tag {
  width: 60px;
  border-radius: 15px;
  text-align: center;
  font-weight: normal;
}
</style>