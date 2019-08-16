<template>
  <div class="cotn_principal">
    <div class="cont_centrar">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opcitiy">
              <h2>登录</h2>
              <p>已有账号，直接登录！</p>
              <button class="btn_login" @click="cambiar_login()">登录</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opcitiy">
              <h2>注册</h2>
              <p>还没有账号？免费注册！</p>
              <button class="btn_sign_up" @click="cambiar_sign_up()">注册</button>
            </div>
          </div>
        </div>
        <div class="cont_back_info">
          <div class="cont_img_back_grey"><img src="../assets/img/po.jpg" alt=""/></div>
        </div>
        <div class="cont_forms">
          <div class="cont_img_back_"><img src="../assets/img/po.jpg" alt=""/></div>
          <div class="cont_form_login"><a href="#" @click="ocultar_login_sign_up()">X</a>
            <h2>登录</h2><br>
            <!--            <form  :model="loginForm" :rules="rules"  ref="loginForm" @keyup.enter.native="loginFormSubmit()">-->
            <!--              <span v-html="error1"></span><br><br>-->
            <!--              <input type="text" placeholder="username" v-model="loginForm.name" @blur="validateLoginName(loginForm.name)"/>-->
            <!--              <br><br><input type="password" placeholder="Password" v-model="loginForm.password" @blur="validateLoginPwd(loginForm.password)"/>-->
            <!--&lt;!&ndash;              <br><br>&ndash;&gt;-->
            <!--&lt;!&ndash;              <input type="password" placeholder="Password" v-model="loginForm.password" @blur="validateLoginPwd(loginForm.password)"/>&ndash;&gt;-->
            <!--&lt;!&ndash;              <img src="../assets/img/1.jpeg" style="width: 20px;height: 20px" alt="">&ndash;&gt;-->
            <!--              <br><br> <span v-html="error2"></span><br><br>-->
            <!--              <button class="btn_sign_up" @click="loginFormSubmit('ruleForm')">注册</button>-->
            <!--            </form>-->
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <br>
              <br>
              <el-form-item>
                <!--                <el-button type="primary" @click="loginFormSubmit('ruleForm',loginForm)" >新增提交</el-button>-->
                <button class="btn_sign_up" @click="loginFormSubmit()">登陆</button>
              </el-form-item>
            </el-form>
          </div>
          <div class="cont_form_sign_up"><a href="#" @click="ocultar_login_sign_up()">X</a>
            <h2>注册</h2><br>
            <form :model="registerForm" ref="registerForm" @keyup.enter.native="registerFormSubmit()">
              <span v-html="error1"></span><br><br>
              <input type="text" placeholder="username" v-model="registerForm.name"
                     @blur="validateName(registerForm.name)"/>
              <br><br><input type="password" placeholder="Password" v-model="registerForm.password"
                             @blur="validatePwd(registerForm.password)"/>
              <br><br><input placeholder="验证码" v-model="registerForm.code"/><br><br>
              <img :src="img" alt="" @click="changeCode" ref="image">
              <br><br> <span v-html="error2"></span><br><br>
              <button class="btn_sign_up" @click="registerFormSubmit()">注册</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {ocultar_login_sign_up, cambiar_sign_up, cambiar_login} from '../assets/js/dmaku.js'

  export default {
    name: "login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        labelPosition: 'right',
        formLabelAlign: {
          region: '',
          name: '',
          type: ''
        },
        loginForm: {
          name: '',
          password: ''
        },
        registerForm: {
          name: '',
          password: '',
          code: ''
        },
        error1: '',
        error2: '',
        rules: {
          name: [
            {validator: validatePass, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        token: '',
        img: 'http://172.20.10.2:8888/hammeruser/kaptcha'
      };
    },
    methods: {
      ocultar_login_sign_up: function () {
        ocultar_login_sign_up();
      },
      cambiar_sign_up: function () {
        cambiar_sign_up()
      },
      cambiar_login: function () {
        cambiar_login()
      },
      validateName(glhm) {//校验关联用户名
        if (glhm == '') {
          this.error1 = '用户名不能为空';
          this.token = false;
          return
        }
        let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,14})$/;
        if (!reg.test(glhm)) {
          this.error1 = '输入的用户名必须长度为6-14位的字母和数字哦';
          this.token = false;
          return
        }
        this.token = true;
        this.error1 = '';
      },
      validatePwd(glhm) {//校验关联用户名
        if (glhm == '') {
          this.error2 = '密码不能为空';
          this.token = false;
          return
        }
        let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,18})$/;
        if (!reg.test(glhm)) {
          this.error2 = '输入的密码必须长度为6-18位的字母和数字哦';
          this.token = false;
          return
        }
        this.token = true;
        this.error2 = '';
      },
      loginFormSubmit() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$axios
              .post(`/hammeruser/info`, {userName: this.loginForm.name, userPassword: this.loginForm.password})
              .then(({data}) => {
                console.log(data);
                if (data && data.code === 0) {
                  this.$message({
                    message: '登陆成功',
                    type: 'success',
                    duration: 1500
                  })

                  sessionStorage.setItem("token", data.dto.token)
                  sessionStorage.setItem("id", data.hammerUser.id)
                  sessionStorage.setItem("isLogin", data.dto.isLogin)
                  sessionStorage.setItem("userName", data.hammerUser.userName)
                  this.$router.push({path: "/shop"});
                } else {
                  this.$message.error(data.msg)
                }
              })
          }
        })
      },
      registerFormSubmit() {
        if (this.token) {
          let form = new FormData();
          form.append('userName', this.registerForm.name);
          form.append('userPassword', this.registerForm.password);
          form.append('code', this.registerForm.code);
          /*let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }; *///添加请求头
          this.$axios
            .post(`/hammeruser/save`, form)
            .then(({data}) => {
              console.log(data);
              if (data && data.code === 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 1500
                })
                this.cambiar_login();
              } else {
                this.$message.error(data.msg)
              }
            })
        }
      },
      changeCode() {
        this.$refs.image.setAttribute("src", "http://172.20.10.2:8888/hammeruser/kaptcha")
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/dmaku.css';
</style>
