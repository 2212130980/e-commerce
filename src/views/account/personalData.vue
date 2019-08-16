<template>
  <div class="account-content">
    <div class="account-order">
      <div class="gray-box">
        <div class="title columns-title pre-title">
          <h2>个人资料</h2> <br><br>
<!--          <div style="margin: 20px;"></div>-->
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                   label-width="80px">
            <span  class="dialog-footer">
<!--              <el-button>取消</el-button>-->
              <el-button type="primary" @click="dataFormSubmit()">修改</el-button>
            </span>
            <el-form-item label="密码" prop="name">
              <el-input v-model="dataForm.password" type="password" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <template>
                <el-radio v-model="dataForm.gender" label="1">男</el-radio>
                <el-radio v-model="dataForm.gender" label="2">女</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-input v-model="dataForm.birthday" placeholder="生日"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="dataForm.address" placeholder="家庭地址"></el-input>
            </el-form-item>
          </el-form>
          <br><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personalData",
    data() {
      return {
        visible: false,
        dataForm: {
          id: sessionStorage.getItem("id"),
          password:'',
          gender: 1,
          birthday: '',
          address: ''
        },
        dataRule: {
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '性别不能为空', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '生日不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init() {
        this.$nextTick(() => {
          this.$axios
            .get(`/hammeruser/selById?id=` + this.dataForm.id)
            .then(({data}) => {
              console.log(data);
              if (data && data.code === 0) {
                this.dataForm.password = data.hammerUser.userPassword;
                this.dataForm.gender = data.hammerUser.gender;
                this.dataForm.birthday = this.timestampToTime( data.hammerUser.birthday);
                this.dataForm.address = data.hammerUser.address;
              }
            })
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          var form = new FormData();
          form.append('id', this.dataForm.id);
          form.append('userPassword', this.dataForm.password);
          form.append('gender', this.dataForm.gender);
          form.append('birthday', this.dataForm.birthday);
          form.append('address', this.dataForm.address);
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }; //添加请求头
          if (valid) {
            this.$axios
              .post(`/hammeruser/update`, form, config)
              .then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500
                  })
                } else {
                  this.$message.error(data.msg)
                }
              })
          }
        })
      },
      timestampToTime (cjsj) {
        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
        // console.log(timestampToTime (1533293827000))
      },
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

  .account-order .gray-box {
    margin-bottom: 20px;
  }

  .gray-box .columns-title h2 {
    float: left;
  }

  .gray-btn-menu {
    display: inline-block;
    height: 36px;
    background: #F2F2F2;
    background: linear-gradient(#FFF, #F5F5F5);
    border: 1px solid #DBDDE2;
    border-radius: 4px;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    user-select: none;
  }

  .account-order .sort-status-menu {
    width: 112px;
  }

  .gray-box .title .gray-btn-menu, .gray-box .title span.gray-normal-btn {
    margin: 10px 0 0 10px;
  }

  .gray-box .title .gray-btn-menu {
    overflow: visible;
    float: right;
  }

  .gray-btn-menu .label {
    position: relative;
    z-index: 1;
    display: block;
    padding: 0 13px 0 16px;
    text-align: left;
    color: #666;
  }

  .gray-box .title .gray-btn-menu .label {
    overflow: visible;
    float: none;
    margin-top: 0;
  }

  .gray-btn-menu .label .arrow {
    float: right;
    width: 10px;
    height: 7px;
    margin: 16px 0 0 6px;
    background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;
  }

  .gray-btn-menu .menu-list {
    display: none;
    position: absolute;
    right: -1px;
    top: -1px;
    width: 100%;
    padding: 38px 0 6px;
    background: #FFF;
    border: 1px solid #dbdde2;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #EEE;
  }

  .gray-btn-menu-on .menu-list, .white-btn-menu-on .menu-list {
    display: block;
  }

  .gray-btn-menu .menu-list li {
    height: 24px;
    line-height: 24px;
    padding: 0 3px 3px;
    text-align: left;
    font-size: 12px;
  }

  .gray-btn-menu .menu-list li a {
    display: block;
    padding: 0 15px;
    border-radius: 3px;
    color: #999;
  }

  .gray-btn-menu .menu-list li a:hover {
    background: #C7C7CA;
    color: #FFF;
  }

  .gray-btn-menu .menu-list li.selected a {
    background: #8F9096;
    color: #FFF;
    cursor: default;
  }

  .account-order .sort-time-menu {
    width: 118px;
  }

  .gray-btn-menu-on .label .arrow, .white-btn-menu-on .label .arrow {
    margin-top: 15px;
    background-position: -15px -521px;
  }

  .gray-btn-menu-on, .white-btn-menu-on {
    position: relative;
    z-index: 10;
    height: auto;
    background: #FFF;
  }

  .gray-btn-menu-on {
    border: 1px solid #DBDDE2;
  }

  .gray-box, .gray-btn-menu-on:hover {
    background: #FFF;
  }

  .gray-box .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
  }

  .account-order .gray-box .box-inner:first-child .gray-sub-title {
    border-top: none;
  }

  .order-list-cart .cart-title span {
    float: right;
    text-align: center;
  }

  .order-list-cart .cart-title .operation, .order-list-cart .cart-title .order-detail, .order-list-cart .cart-title .sub-total {
    float: right;
  }

  .order-list-cart .cart-title .date, .order-list-cart .cart-title .order-id {
    float: left;
    text-align: left;
  }

  .order-list-cart .cart-title .date {
    width: 108px;
    padding-left: 6px;
  }

  .order-list-cart .cart-title .order-detail {
    width: 82px;
    padding-left: 24px;
    text-align: center;
  }

  .order-list-cart .cart-title .sub-total {
    width: 102px;
    padding-right: 18px;
    border-left: 1px solid #DBDBDB;
    text-align: right;
  }

  .order-list-cart .cart-title .operation {
    width: 95px;
    height: 38px;
    padding-right: 23px;
  }

  .order-list-cart .cart-title .num {
    width: 70px;
  }

  .order-list-cart .cart-title .price {
    width: 85px;
    padding-right: 27px;
    text-align: right;
  }

  .gray-box .gray-sub-title a {
    color: #6989E0;
  }

  .order-list-cart .cart {
    float: left;
    width: 737px;
    padding: 0;
    border-right: 1px solid #EBEBEB;
  }

  .order-cart .cart-items {
    position: relative;
    padding: 18px 0 28px;
    border-top: 1px solid #EFEFEF;
  }

  .order-list-cart .cart-items {
    height: 110px;
    padding: 0;
  }

  .order-cart .cart-items:first-child {
    border-top: none;
  }

  .order-cart .prod-info {
    position: relative;
    margin-left: 138px;
  }

  .order-list-cart .prod-info {
    padding: 15px 0 15px 111px;
    margin-left: 0;
    position: relative;
  }

  .order-list-cart .items-thumb {
    position: absolute;
    left: 30px;
    top: 15px;
    width: 78px;
    height: 78px;
    border: 1px solid #EBEBEB;
    border-radius: 3px;
  }

  .order-list-cart .items-thumb img {
    width: 78px;
    height: 78px;
  }

  .order-list-cart .items-params {
    float: left;
    height: 50px;
    padding: 15px 0;
    margin-left: 29px;
    border-bottom: none;
    line-height: 25px;
  }

  .order-cart .items-params .name {
    overflow: hidden;
    float: left;
    color: #666;
    width: 435px;
    height: 44px;
    text-align: left;
  }

  .order-list-cart .prod-info .name {
    float: none;
    width: 220px;
    height: 25px;
    line-height: 25px;
  }

  .order-list-cart .prod-info .vh-center {
    height: auto;
    line-height: 50px;
  }

  .hide-row, .order-cart .items-params .name, .support-cart .items-detail .detail {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .order-list-cart .prod-info .num, .order-list-cart .prod-info .operation, .order-list-cart .prod-info .price, .order-list-cart .prod-info .subtotal {
    float: right;
    line-height: 80px;
    text-align: center;
  }

  .order-list-cart .prod-info .operation {
    display: table;
    width: 95px;
    height: 80px;
    padding-right: 23px;
    line-height: 25px;
  }

  .order-list-cart .prod-info .num {
    width: 70px;
  }

  .order-list-cart .prod-info .price {
    width: 85px;
    padding-right: 27px;
    text-align: right;
  }

  .order-list-cart .prod-operation {
    float: right;
    display: table;
    height: 110px;
  }

  .order-list-cart .prod-operation .total {
    display: table-cell;
    padding-right: 18px;
    line-height: 14px;
    text-align: right;
    vertical-align: middle;
  }

  .order-list-cart .prod-operation .status {
    display: table-cell;
    width: 80px;
    padding: 0 24px;
    text-align: center;
    vertical-align: middle;
  }

  .blue-small-btn, .orange-small-btn, .white-gray-small-btn {
    display: inline-block;
    height: 30px;
    padding: 0 13px;
    border-radius: 4px;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
  }

  .blue-small-btn {
    background: #6383C6;
    background: linear-gradient(#7EA3F5, #5A82F0);
    box-shadow: 0 1px 2px rgba(255, 255, 255, .1) inset, 0 0 0 1px rgba(0, 0, 0, .2) inset, 0 1px 3px rgba(0, 0, 0, .1);
    color: #FFF;
  }

  .blue-small-btn:hover {
    box-shadow: 0 1px 1px #7696DE inset, 0 0 2px #627DCA inset, 0 -2px 3px #5A77C7 inset, 0 0 100px rgba(48, 77, 147, .4) inset, 0 0 0 1px rgba(0, 0, 0, .3) inset, 0 1px 3px rgba(0, 0, 0, .1);
    color: #FFF;
  }
</style>
