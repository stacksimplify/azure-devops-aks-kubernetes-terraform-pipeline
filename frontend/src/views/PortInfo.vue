<template>
  <div class="viewport">
    <el-row>
      <el-col :span="6">
        <h1>{{port.name}}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="info-container">
        <el-row>
          <el-col :span="20">
            <span class="label-docked">Docked ships:</span>
            <router-link v-for="dockedShip in port.dockedShips" :key="dockedShip" :to="{name: 'shipInfo', params: { id: dockedShip } }">
              <el-tag type="success">{{ ships.find(ship => ship.id === dockedShip).name }}</el-tag>
            </router-link>
          </el-col>
          <el-col :span="20">
            <label for="created-at">
              <span>Creation date:</span>
              <el-input :value="new Date(port.createdAt) | dateFormat('DD/MM/YYYY HH:mm')" name="created-at" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="created-by">
              <span>Created by:</span>
              <el-input :value="port.createdBy" name="created-by" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="updated-at">
              <span>Last update:</span>
              <el-input :value="new Date(port.updatedAt) | dateFormat('DD/MM/YYYY HH:mm')" name="updated-at" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="updated-by">
              <span>Updated by:</span>
              <el-input :value="port.updatedBy" name="updated-by" disabled></el-input>
            </label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">Go back</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="event-container">
        <event-timeline :events="events"></event-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventTimeline from '../components/EventTimeline.vue'
export default {
  data () {
    return {
      ships: [],
      port: null,
      events: []
    }
  },
  components: {
    'event-timeline': EventTimeline
  },
  methods: {
    loadData (portId) {
      this.$services.port.getOne(portId).then(({ data }) => (this.port = data))
      this.$services.port.getEvents(portId).then(({ data }) => (this.events = data))
    }
  },
  created () {
    const portId = this.$route.params.id
    this.loadData(portId)
    this.$services.ship.getAll().then(({ data }) => (this.ships = data))
  }
}
</script>

<style lang="scss" scoped>
.viewport {
  margin: {
    top: 10px;
    left: 20px;
  }
}
.title {
  display: inline;
}
span.label-docked {
  display: block;
}
.el-tag {
  margin-right: 10px;
}
label {
  span {
    margin: {
      top: 30px;
      bottom: 30px;
    }
  }
}
.el-col-20 {
  margin-bottom: 15px;
}
.el-select {
  margin-left: 20px;
}
</style>
