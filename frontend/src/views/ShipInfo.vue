<template>
  <div class="viewport">
    <el-row>
      <el-col :span="6">
        <h1>{{ship.name}}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="info-container">
        <el-row>
          <el-col :span="20">
            <label for="port-name">
              <span>Current Port:</span>
              <el-select v-model="ship.currentPort" filterable clearable placeholder="Select current port" :disabled="isDocked">
                <el-option v-for="port in ports" :key="port.id" :label="port.name" :value="port.id"></el-option>
              </el-select>
              <el-button v-if="isDocked" @click="undock" type="danger">Undock</el-button>
              <el-button v-if="!isDocked" @click="dock" type="primary">Dock</el-button>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="created-at">
              <span>Creation date:</span>
              <el-input :value="new Date(ship.createdAt) | dateFormat('DD/MM/YYYY HH:mm')" name="created-at" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="created-by">
              <span>Created by:</span>
              <el-input :value="ship.createdBy" name="created-by" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="updated-at">
              <span>Last update:</span>
              <el-input :value="new Date(ship.updatedAt) | dateFormat('DD/MM/YYYY HH:mm')" name="updated-at" disabled></el-input>
            </label>
          </el-col>
          <el-col :span="20">
            <label for="updated-by">
              <span>Updated by:</span>
              <el-input :value="ship.updatedBy" name="updated-by" disabled></el-input>
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
      ship: null,
      isDocked: false,
      ports: [],
      events: []
    }
  },
  components: {
    'event-timeline': EventTimeline
  },
  methods: {
    undock () {
      this.$services.ship.depart(this.ship.id).then(() => this.loadData(this.ship.id))
      this.isDocked = true
    },
    dock () {
      this.$services.ship.dock(this.ship.id, this.ship.currentPort).then(() => this.loadData(this.ship.id))
      this.isDocked = false
    },
    loadData (shipId) {
      this.$services.ship.getOne(shipId).then(({ data }) => {
        this.ship = data
        this.isDocked = !!data.currentPort
      })
      this.$services.ship.getEvents(shipId).then(({ data }) => (this.events = data))
    }
  },
  created () {
    const shipId = this.$route.params.id
    this.loadData(shipId)
    this.$services.port.getAll()
      .then(({ data }) => (this.ports = data))
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
label {
  margin-top: 30px;
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
