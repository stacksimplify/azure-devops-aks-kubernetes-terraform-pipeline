<template>
  <div class="viewport">
    <h1>New Ship:</h1>
    <el-row type="flex" class="form-row" justify="center">
      <el-col :span="6">
        <el-form ref="form" class="form" :model="form" :rules="formValidators" label-position="right" @submit.native.prevent>
          <el-form-item label="Ship Name" prop="name">
            <el-input class="ship-name-input" clearable placeholder="Example: Black Pearl" v-model="form.name" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="Current port" prop="initialPort">
            <el-select v-model="form.initialPort" filterable clearable placeholder="Select current port">
              <el-option v-for="(port, index) in ports" :key="index" :label="port.name" :value="port.id" @keyup.enter.native="onSubmit"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ports: [],
      form: {
        name: '',
        initialPort: ''
      },
      formValidators: {
        name: [
          { required: true, message: 'Ship name cannot be empty', trigger: 'blur' }
        ],
        initialPort: [
          { required: true, message: 'Please select at least one port', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.$services.port.getAll().then(({ data }) => (this.ports = data))
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((isValid, errors) => {
        if (!isValid) {
          return Object.entries(errors).forEach(entry => {
            setTimeout(() => this.$notify.error({ title: 'Error', message: entry.pop().pop().message }), 50)
          })
        }

        const params = { name: this.form.name, currentPort: this.form.initialPort }
        this.$services.ship.create(params).then(() => this.$notify.success({ title: 'Success', message: 'Ship created successfully!' }))
        this.onCancel()
      })
    },
    onCancel () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
div.viewport {
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
}

.form {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px 15px 0px 15px;
  .ship-name-input {
    width: 70%;
  }
}
</style>
