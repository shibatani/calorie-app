<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class IndexPage extends Vue {
  mounted() {
    this.$router.push(`/calories`);
  }
}
</script>
