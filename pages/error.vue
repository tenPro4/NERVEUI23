<template>
    <div></div>
</template>
<script>
export default{
    async mounted(){
        
  const errorId = this.$route.query.id
        const res = await fetch("http://localhost:4433/self-service/errors?error=" + errorId,
    { method: "GET", headers: { Accept: "application/json" } }
  );
  console.log('err',await res.text())
    }
}
</script>