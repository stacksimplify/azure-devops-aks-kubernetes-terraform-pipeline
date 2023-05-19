<template>
  <div class="viewport">
    <h1>Ship selection:</h1>
    <el-table :data="ships" stripe border max-height="350" style="width: 100%" class="ship-table">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="currentPort" label="Docked at">
        <template slot-scope="scope">
          <router-link class="port-link" v-if="scope.row.currentPort" :to="{ name: 'portInfo', params: { id: scope.row.currentPort } }">
            {{getPort(scope.row)}}
          </router-link>
          <span v-if="!scope.row.currentPort">On route to next port</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Creation Date" :formatter="formatDate"></el-table-column>
      <el-table-column prop="updatedAt" label="Last Update" :formatter="formatDate"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row.id)">View</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ships: [],
      ports: []
    }
  },
  created () {
    this.populateData()
  },
  methods: {
    populateData () {
      this.$services.ship.getAll().then(({ data }) => (this.ships = data))
      this.$services.port.getAll().then(({ data }) => (this.ports = data))
    },
    formatDate (row, column) {
      return new Date(row[column.property]).toLocaleString('pt-BR')
    },
    getPort (row) {
      const foundPort = this.ports.find((port) => port.id === row.currentPort)
      return foundPort ? foundPort.name : 'On route'
    },
    handleEdit (index, rowElementId) {
      this.$router.push({ name: 'shipInfo', params: { id: rowElementId } })
    },
    handleDelete (index, rowElementId) {
      this.$confirm('This ship will be permanently deleted. Continue?', 'Delete Ship', { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' })
        .then(async () => {
          try {
            await this.$services.ship.delete(rowElementId)
            this.$notify({
              title: 'Success',
              message: 'Ship was deleted',
              type: 'success'
            })
            this.populateData()
          } catch (err) {
            this.$notify({
              title: 'Error',
              message: 'Error deleting ship',
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.viewport {
  h1 {
    margin-top: 10px;
    margin-left: 20px;
  }
}
.ship-table {
  margin-top: 25px;
}
.port-link {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
    color: rgb(172, 143, 16);
  }
}
</style>
