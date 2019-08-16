<template>
  <div id="main">
    <header-nav></header-nav>
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" :class="active=='0'?'active':''" @click="sort('0')">综合排序</a></li>
          <li><a href="javascript:;" :class="active=='3'?'active':''" @click="recommend">热卖推荐</a></li>
          <li><a href="javascript:;" :class="active=='1'?'active':''" @click="sort('1')">价格低到高</a></li>
          <li><a href="javascript:;" :class="active=='2'?'active':''" @click="sort('2')">价格高到低</a></li>
          <li>
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{all}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
                <div @click="type3Click()">
                  <el-dropdown-item icon="el-icon-info">{{all3}}</el-dropdown-item>
                </div>
                <div v-for="item,index in type" @click="type1Click(item)">
                  <el-dropdown-item icon="el-icon-info">{{item.name}}</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li v-show="all!='全部分类'">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{all1}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
                <div @click="type4Click()">
                  <el-dropdown-item icon="el-icon-info">{{all4}}</el-dropdown-item>
                </div>
                <div v-for="item,index in type2" @click="type2Click(item)">
                  <el-dropdown-item icon="el-icon-info">{{item.name}}</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li style="float:  right;">
            <el-input v-model="productName" placeholder="请输入内容" @change="productNameChange"></el-input>
          </li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <div v-if="recommendShow">
            <shop-item v-for="item,index in recommendList.records" :key="index" :item="item"></shop-item>
          </div>
          <div v-else>
            <shop-item v-for="item,index in productList.records" :key="index" :item="item"></shop-item>
          </div>
        </div>
        <br><br><br>
        <div class="block" style="text-align: center" v-show="!recommendShow">
          <el-pagination background
                         @current-change="handleCurrentChange"
                         :page-size="productList.size"
                         layout="prev, pager, next, jumper"
                         :total="productList.total">
          </el-pagination>
        </div>
        <br><br>
      </div>
    </div>
    <prompt v-if="maxCount"></prompt>
  </div>
</template>


<script>
  import goodData from '@/lib/newGoodsData'
  import shopItem from '@/components/shop-item'
  import prompt from '@/components/prompt'
  import headerNav from '@/components/header-nav'

  export default {
    data() {
      return {
        goodsList: goodData,
        goodsShow: [],
        productList: [],
        type: [],
        type2: [],
        all: '全部分类',
        all1: '全部',
        parentId: '',
        parentId2: '',
        all3: '全部分类',
        all4: '全部',
        active: 0,
        productName: '',
        priceOrder: '',
        recommendList: [],
        recommendShow: ''
      }
    },
    watch: {
      // "$route": 'reseat'
    },
    mounted() {
      // this.reseat()
      this.initProduct();
      this.initType1();
    },
    components: {
      shopItem,
      prompt,
      headerNav
    },
    computed: {
      maxCount() {
        return this.$store.state.maxOff
      }
    },
    methods: {
      initProduct() {
        // alert(this.productList.current==null+this.productList.current)
        var form = new FormData();
        form.append('categoryLevel1', this.parentId);
        form.append('productName', this.productName);
        form.append('page', this.productList.current == null || this.productList.current == '' ? 1 : this.productList.current);
        form.append('categoryLevel2', this.parentId2);
        form.append('price', this.priceOrder == null || this.priceOrder == '' ? 0 : this.priceOrder);
        this.$axios
          .post(`/hammerproduct/list`, form)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.productList = data.page;
              console.log(data);
            }
          })
      },
      type1Click(item) {
        this.all = item.name;
        this.parentId = item.id;
        this.all1 = '全部';
        this.parentId2 = '';
        this.productList.current = 1;
        this.initType1();
        this.initType2();
        this.initProduct();
      },
      type2Click(item) {
        this.all1 = item.name;
        this.parentId2 = item.id;
        this.productList.current = 1;
        this.initProduct();
      },
      initType1() {
        var form = new FormData();
        form.append('type', '1');
        this.$axios
          .post(`/hammerproductcategory/list`, form)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.type = data.page.records;
            }
          })
      },
      initType2() {
        var form = new FormData();
        form.append('type', 2);
        form.append('parentId', this.parentId);
        this.$axios
          .post(`/hammerproductcategory/list`, form)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.type2 = data.page.records;
            }
          })
      },
      type3Click() {
        this.all = this.all3;
        this.parentId = '';
        this.parentId2 = '';
        this.all1 = '全部';
        this.initProduct();
      },
      type4Click() {
        this.all1 = this.all4;
        this.parentId2 = '';
        this.initProduct();
      },
      sort(val) {
        this.priceOrder = val;
        this.active = val
        this.recommendShow = false;
        this.initProduct();
      },

      // 分页
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.productList.current = val;
        this.initProduct();
      },
      productNameChange() {
        this.initProduct()
      },
      recommend() {
        this.active = 3;
        this.recommendShow = true;
        var form = new FormData();
        form.append('productRepertory', '1');
        form.append('limit', '10');
        this.$axios
          .post(`/hammerproduct/list`, form)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.recommendList = data.page;
              console.log(data);
            }
          })
      }
    }
  }
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .sku-box {
    position: relative;
  }

  .sort-option {
    border-top: 1px solid #D8D8D8;
    color: #999;
  }

  .sort-option ul {
    height: 60px;
    line-height: 60px;
  }

  .sort-option li {
    position: relative;
    float: left;
    padding-left: 42px;
  }

  .sort-option li:first-child {
    padding-left: 9px;
  }

  .sort-option li:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
  }

  .sort-option li:first-child:before {
    display: none;
  }

  .sort-option a {
    display: block;
    font-size: 12px;
    color: #999;
  }

  .sort-option a.active, .sort-option a:hover {
    color: #5683EA;
  }

  .gray-box {
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, .14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
  }

  .sku-box .item-box {
    clear: both;
    overflow: hidden;
    margin: 0 -1px -1px -1px;
  }

</style>
