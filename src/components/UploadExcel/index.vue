<template>
  <!-- 导入excel组件 -->
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="handleUpload"
      >
        点击上传
      </el-button>
    </div>
    <!-- 隐藏起来 -->
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <i class="el-icon-lightning"></i>
      将文件拖拽到此处
    </div>
  </div>
</template>

<script>
// 版本不一致，语法向上兼容
import * as XLSX from "xlsx";
export default {
  name: "UploadExcel",
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  methods: {
    // 存储数据
    generateData({ header, results }) {
      // herder   标题
      // results  内容
      this.excelData.header = header;
      this.excelData.results = results;
      //   props传递的参数，可以通过调用onSuccess函数获取到文件的内容
      this.onSuccess && this.onSuccess(this.excelData);
    },

    // 拖拽文件
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    // 点击上传按钮的回调
    handleUpload() {
      // 获取input实例，模拟它的点击事件，弹出文件选择框
      this.$refs["excel-upload-input"].click();
    },

    // input的change事件的回调
    handleClick(e) {
      // 获取当前上传的文件
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      //   文件存在
      this.upload(rawFile);
    },

    upload(rawFile) {
      // 把input的value置为null
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      //   如果没有传入beforeUpload函数
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },

    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        // js中的 FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件
        const reader = new FileReader();
        // 处理 load 事件。该事件在读取操作完成时触发。
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          //   文件的标题["","",""]
          const header = this.getHeaderRow(worksheet);
          //   获取到键值对形式的数据[{},{},{}]
          const results = XLSX.utils.sheet_to_json(worksheet);
          // 去存储数据
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        // 开始读取指定的 Blob 中的内容。 一旦完成，FileReader.result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象。
        reader.readAsArrayBuffer(rawFile);
      });
    },

    // 获取文件的全部标题
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },

    // 判断是否是excel格式文件
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
  },
};
</script>

<style lang="less" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    // 隐藏起来
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    width: 350px;
    height: 160px;
    line-height: 160px;
    border: 1px dashed #bbb;
    text-align: center;
    border-radius: 5px;
  }
  .drop {
    color: #bbb;
    line-height: 80px;
    border-left: 0;
    i {
      display: block;
      margin-top: 30px;
      font-size: 60px;
    }
  }
}
</style>