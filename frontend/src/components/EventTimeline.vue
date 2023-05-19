<template>
  <el-steps direction="vertical">
    <el-step v-for="event of events" status="finish" :key="event.id" :title="`${event.name} @ ${new Date(event.timestamp).toLocaleString('pt-BR')}`" :description="JSON.stringify(event.data)">
    </el-step>
  </el-steps>
</template>

<script>
export default {
  props: ['events']
}
</script>
