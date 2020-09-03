<template>
  <div>
    <van-nav-bar title="修改个人信息" left-arrow @click-left="goBack" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
</style>
