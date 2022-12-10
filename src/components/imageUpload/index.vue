<template>
  <div>
    <!-- 照片墙 -->
    <!-- action 提交地址，必填
         list-type  文件列表的类型
         :on-preview 点击文件列表中已上传的文件时的钩子
         :on-remove   文件列表移除文件时的钩子
        :on-change="" 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        before-upload 上传文件之前的钩子
        http-request	覆盖默认的上传行为，可以自定义上传的实现
          -->
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="1"
      :file-list="filelist"
      :on-change="changeFile"
      :class="{ disabled: fileComputed }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 进度条 -->
    <el-progress
      v-show="showProgress"
      :percentage="percent"
      style="width: 180px"
    ></el-progress>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 引入腾讯云cos包
import COS from "cos-js-sdk-v5";
// 实例化COS
const cos = new COS({
  SecretId: "AKID63oMhoiPr42oMfjaD1bw4yd4GGB2gAQS", // 身份识别Id
  SecretKey: "sX1JNDrGQOGxSkojRvGPLBoDOL8k8B5m", //身份密匙
});
/* 
SecretId: AKID63oMhoiPr42oMfjaD1bw4yd4GGB2gAQS
SecretKey: sX1JNDrGQOGxSkojRvGPLBoDOL8k8B5m
*/
export default {
  name: "imageUpload",
  data() {
    return {
      // 当前图片uid
      currentFileUid: "",
      // 显示的图片地址
      dialogImageUrl: "",
      dialogVisible: false,
      // 进度条的百分比
      percent: 0,
      // 显示进度条
      showProgress: false,
      // 上传的文件列表
      filelist: [],
    };
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.filelist.length === 1;
    },
  },
  methods: {
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // file 需要删除的文件
      // fileList 删除之后的文件
      // console.log(file, fileList);
      // 排除删除的图片
      this.filelist = this.filelist.filter((item) => item.uid !== file.uid);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

      // console.log(file);
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    // file 当前的文件  fileList 是最新的数组 this.filelist
    changeFile(file, fileList) {
      // 上传图片时会触发两次
      // console.log(file);
      this.filelist = fileList.map((item) => item);
    },

    // 上传之前的钩子，上传之前判断类型
    beforeUpload(file) {
      console.log(file);
      // 判断类型
      const types = [
        "image/jpeg",
        "image/jpg",
        "image/bmp",
        "image/png",
        "image/gif",
      ];
      // 不存在
      if (!types.some((item) => item == file.type)) {
        this.$message.error("上传图片只能是jpeg,jpg,bmp,png,gif格式");
        // 终止上传
        return false;
      }
      // 判断大小
      const maxSize = 5 * 1024 * 1024; //5M
      if (file.size > maxSize) {
        // 图片超过大小限制
        this.$message.error("图片不能超过5M");
        return false;
      }

      // 通过检查
      this.showProgress = true;
      this.currentFileUid = file.uid;
      return true;
    },

    // 上传文件
    upload(params) {
      // params 中有需要上传的文件信息 params.file
      // console.log(params);
      if (params.file) {
        // 上传到腾讯云
        cos.putObject(
          {
            Bucket: "liuxiaolong-1315726743" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file
              .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            Body: params.file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
            // 进度的回调函数，进度回调响应对象（progressData）
            onProgress: (progressData) => {
              // 进度条数据
              this.percent = progressData.percent * 100;
            },
          },
          // 回调函数
          (err, data) => {
            /* 
            err 请求发生错误时返回的对象，包括网络错误和业务错误。如果请求成功则为空
            data  请求成功时返回的对象，如果请求发生错误，则为空
            */
            // console.log(err || data);
            // 当data中的data.statusCode==200 时说明上传成功
            if (!err && data.statusCode == 200) {
              console.log(data);
              console.log(this.filelist);
              // 获取成功的返回地址，再将filelist中的数据url地址变成现在上传成功的地址
              this.filelist = this.filelist.map((item) => {
                if (item.uid == this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  return { url: "http://" + data.Location, upload: true };
                  // upload 表示这张图片已经上传完毕，为后期应用的时候做标记
                }
                return item;
              });
              // 将上传成功的地址，回写到fileList
              setTimeout(() => {
                this.showProgress = false;
                this.percent = 0;
              }, 1000);
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
.el-dialog__header {
  padding: 20px 20px 20px;
}
</style>