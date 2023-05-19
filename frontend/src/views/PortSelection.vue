<template>
  <div class="viewport">
    <h1>Port selection:</h1>
    <el-table :data="ports" stripe border max-height="350" style="width: 100%" class="port-table">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="dockedShips" label="Ships docked" :formatter="getDockedShipCount"></el-table-column>
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
      ports: []
    }
  },
  created () {
    this.populateData()
  },
  methods: {
    populateData () {
      this.$services.port.getAll().then(({ data }) => (this.ports = data))
    },
    getDockedShipCount (row) {
      return row.dockedShips.length
    },
    formatDate (row, column) {
      return new Date(row[column.property]).toLocaleString('pt-BR')
    },
    handleEdit (index, rowElementId) {
      this.$router.push({ name: 'portInfo', params: { id: rowElementId } })
    },
    handleDelete (index, rowElementId) {
      this.$confirm('This port will be permanently deleted. Continue?', 'Delete Ship', { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' })
        .then(async () => {
          try {
            await this.$services.port.delete(rowElementId)
            this.$notify({
              title: 'Success',
              message: 'Port was deleted',
              type: 'success'
            })
            this.populateData()
          } catch (err) {
            this.$notify({
              title: 'Error',
              message: 'Error deleting port',
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
.port-table {
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
