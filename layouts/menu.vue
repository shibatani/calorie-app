<template>
  <div>
    <div>
      <el-menu
        :default-active="index"
        class="el-menu"
        mode="horizontal"
        @select="moveToPath"
      >
        <el-menu-item index="/calories">一覧画面</el-menu-item>
        <el-menu-item index="/calories/new">新規登録画面</el-menu-item>
      </el-menu>
    </div>
    <nuxt></nuxt>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Menu extends Vue {
  get index (): string | undefined {
    return this.$route.path
  }

  moveToPath (path: string) {
    this.$router.push(path);
  }
}
</script>

<style scoped>
.el-menu {
  padding-left: 50px;
}
</style>