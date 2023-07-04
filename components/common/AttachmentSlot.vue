<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li
        class="el-upload-list__item is-ready"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <div>
          <img
            v-if="
              file.fileContentType && file.fileContentType.startsWith('image/')
            "
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt=""
          />
          <div class="d-flex align-items-center" style="height: 148px" v-else>
            <div class="text-center">
              <i class="el-icon-document fs-3"></i>
              <p class="text-muted fw-light fs-6">{{ file.fileName }}</p>
            </div>
          </div>
          <span class="el-upload-list__item-actions">
            <span
              v-if="
                file.fileContentType &&
                file.fileContentType.startsWith('image/')
              "
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span @click="handleDownload(file)">
              <i class="el-icon-download"></i>
            </span>
            <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              v-if="!disabled"
              title="Are you sure to delete this?"
              @confirm="handleRemove(file)"
            >
              <span slot="reference">
                <i class="el-icon-delete"></i>
              </span>
            </el-popconfirm>
          </span>
        </div>
      </li>
    </ul>

    <el-upload
      drag
      multiple
      action="#"
      :disabled="disabled"
      :http-request="uploadRequest"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    uploadRequest(event) {
      return this.$emit('uploadRequest', event)
    },
    handleRemove(file) {
      return this.$emit('handleRemove', file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      window.open(file.url)
    },
  },
}
</script>
