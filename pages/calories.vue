<template>
  <nuxt-child></nuxt-child>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'menu',
})
export default class CaloriesPage extends Vue {
}
</script>
