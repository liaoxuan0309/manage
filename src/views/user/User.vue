<template lang="">
  <div id="user">
    <el-dialog
      :title="operatetype==='add'?'新增用户':'修改信息'"
      :visible.sync="isshow"
      :before-close="cancel"
    >
      <submitform :formlabel="operateformlabel" :form="operateform" :inline="true" ref="subform">
      </submitform>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="comfirm">确定</el-button>
        </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="adduser">+ 新增</el-button>
      <submitform
        :formlabel="formlabel"
        :form="searchform"
        :inline="true"
        ref="searchform"
        class="search-button"
      >
        <el-button type="primary" @click="getlist(searchform.keyword)">搜索</el-button>
      </submitform>
    </div>
    <div>
      <commontable
        :tabledata="tabledata"
        :tablelabel="tablelabel"
        :config="config"
        @edituser="edituser"
        @deluser="deluser"
        @change="getlist()"
      >
      </commontable>
    </div>
  </div>
</template>
<script>
  import Submitform from 'components/common/Submitform'
  import Commontable from 'components/common/Commontable'
  import {getuserlist} from 'network/user'
export default {
  name:'User',
  components:{
    Submitform,
    Commontable
  },
  data(){
    return {
      operatetype:'add',
      isshow:false,
      operateformlabel:[{
        model:'name',
        label:'姓名',
        type:'input'
      },{
        model:'age',
        label:'年龄',
        type:'input'
      },{
        model:'sex',
        label:'性别',
        type:'select',
        opts:[
          {
            label:'男',
            value:1
          }, {
            label:'女',
            value:0
          }
        ]
      },{
        model:'birth',
        label:'生日',
        type:'date'
      },{
        model:'addr',
        label:'地址',
        type:'input'
      }],
      operateform:{
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:'',
      },
      formlabel:[{
        model:'keyword',
        label:'',
        type:'input'
      }],
      searchform:{
        keyword:''
      },
      tabledata:[],
      tablelabel:[
        {
          prop:"name",
          label:"姓名"
        }, {
          prop:"age",
          label:"年龄"
        }, {
          prop:"sex",
          label:"性别"
        }, {
          prop:"birth",
          label:"出生日期",
          width:200
        },{
          prop:"addr",
          label:"地址",
          width:320
        }
      ],
      config:{
        page:1,
        total:30
      }
    }
  },
  methods:{
    //点击弹窗中的确定按钮
    comfirm(){
      //编辑
      if(this.operatetype=='edit'){
        this.$http.post('http://localhost:8080/user/edit',this.operateform).then(res=>{
          this.isshow=false
          this.getlist()
        })
      }
      //新增
      else{
        this.$http.post("http://localhost:8080/user/add",this.operateform).then(res=>{
          this.getlist()
          this.isshow=false
        })
      }
      
    },
    //点击取消
    cancel(){
      this.isshow=false
      this.getlist()
    },
    //点击新增按钮
    adduser(){
      this.isshow=true
      this.operateform={
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:'',
      }
      this.operatetype='add'
    },
    //获取第一页的数据和page变化后的获取数据
    getlist(name=''){
      this.config.loading =true
      name?(this.config.page=1):''
      getuserlist({
        page:this.config.page,
        name
      }).then(res=>{
        this.tabledata=res.list.map(item=>{
          item.sex =item.sex ===0 ?"女" :"男"
          return item
        })
        this.config.total=res.count
        this.config.loading =false
      })
    },
    //编辑用户
    edituser(row){
      this.operatetype="edit"
      this.isshow=true
      this.operateform=row
    },
    //删除用户
    deluser(row){
      this.$confirm("是否删除此条数据？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning",
      }).then(()=>{
        const id = row.id
        this.$http.post("http://localhost:8080/user/del",{id:{id}}).then((res)=>{
          if(res.body.code==-999){
            this.$message.error('删除失败');
          }else{
            this.$message({
            type:'success',
            message:res.body.message
            })
          }
          this.getlist()
        })
      }).catch(()=>{})
      
    }
  },
  created(){
    this.getlist()
  }
}
</script>
<style lang="less" scoped>
  #user{
    margin-left:20px;
  }
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-button{
    margin-top: 1%;
  }
</style>