(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b8a240b0"],{a926:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-select",{staticStyle:{width:"15%"},attrs:{placeholder:"请选择查询字段"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-option",{attrs:{label:"工号",value:"id"}}),a("el-option",{attrs:{label:"姓名",value:"username"}}),a("el-option",{attrs:{label:"籍贯",value:"address"}}),a("el-option",{attrs:{label:"班级",value:"classes"}})],1),a("el-input",{staticStyle:{width:"20%"},attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:t.select}},[t._v("搜索")]),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:t.clearvalue}},[t._v("重置")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticStyle:{float:"right"},attrs:{type:"primary",size:"small",color:"#F56C6C"},on:{click:function(e){t.show=!t.show}}},[a("i",{staticClass:"el-icon-upload el-icon--left"}),t._v("上传")])],1),a("transition",{attrs:{name:"el-zoom-in-top"}},[a("el-card",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"box-card",staticStyle:{"margin-top":"10px"}},[a("div",{staticClass:"clearfix",staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("span",[t._v("上传excel表格（.xlsx）")])]),a("div",{staticClass:"transition-box",staticStyle:{display:"flex","margin-top":"40px"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",staticStyle:{margin:"auto"},attrs:{drag:"",action:t.imgpath,multiple:""}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),a("em",[t._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",staticStyle:{"text-align":"center"},attrs:{slot:"tip"},slot:"tip"},[t._v(" 文件上传速度跟当前环境有关，请耐心等待 "),a("el-row",{staticStyle:{"margin-top":"10px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-button",{staticStyle:{width:"100%"},attrs:{size:"small"},on:{click:function(e){t.show=!t.show}}},[t._v("关闭")])],1),a("el-col",{attrs:{span:12}},[a("el-button",{staticStyle:{width:"100%"},attrs:{size:"small",type:"primary"},on:{click:t.importxlsx}},[t._v("导入")])],1)],1)],1)])],1)])],1),0==t.show1?a("el-card",{staticStyle:{"margin-top":"20px","margin-bottom":"5rem"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",sortable:"",label:"工号"}}),a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),a("el-table-column",{attrs:{prop:"sex",label:"性别"}}),a("el-table-column",{attrs:{prop:"address",label:"籍贯"}}),a("el-table-column",{attrs:{prop:"classes",label:"班级"}}),a("el-table-column",{attrs:{label:"类型"}},[t._v(" 教师 ")]),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:function(a){return t.open(e.$index,e.row)}}},[t._v("删除")]),a("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:function(a){return t.cshow(e.$index,e.row)}}},[t._v("编辑")])]}}],null,!1,2284215587)})],1),a("div",{staticClass:"block",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.UserSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1):1==t.show1?a("el-card",{staticStyle:{"margin-top":"20px"}},[a("el-page-header",{attrs:{content:"详情页面"},on:{back:t.goBack}}),a("br"),a("el-form",{ref:"form",staticStyle:{width:"50%"},attrs:{"label-width":"80px"},model:{value:t.form,callback:function(e){t.form=e},expression:"form"}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{staticStyle:{width:"40%"},attrs:{placeholder:t.user.username},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"性别"}},[a("el-radio-group",{model:{value:t.form.sex,callback:function(e){t.$set(t.form,"sex",e)},expression:"form.sex"}},[a("el-radio",{attrs:{label:"男"}}),a("el-radio",{attrs:{label:"女"}})],1)],1),a("el-form-item",{attrs:{label:"籍贯"}},[a("el-input",{staticStyle:{width:"40%"},attrs:{placeholder:t.user.address},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),a("el-form-item",{attrs:{label:"类型"}},[a("el-radio-group",{model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[a("el-radio",{attrs:{label:"教师"}}),a("el-radio",{attrs:{label:"学生"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.updata}},[t._v("提交修改")])],1)],1)],1):t._e()],1)],1)],1)},i=[],l=(a("b0c0"),{data:function(){return{imgpath:this.basePath+"/upload/upload",form:{name:"",sex:"",address:"",type:""},value:"姓名",show1:!1,show:!1,input:"",type1:"",UserSize:0,currentPage:1,tableData:[],pageSize:10,pageNo:1,user:""}},created:function(){this.get(this.pageSize,this.pageNo)},methods:{cshow:function(t,e){this.show1=!0,this.user=e,this.form.sex=e.sex,this.from.name="",this.form.address="",2==e.type&&(this.form.type="学生"),3==e.type&&(this.form.type="教师")},goBack:function(){this.show1=!1},clearvalue:function(){this.get(this.pageSize,this.pageNo),this.input="",this.value=""},open2:function(t){this.$message({message:t,type:"success"})},open3:function(t){this.$message({message:t,type:"warning"})},updata:function(){var t=this;this.form.name&&this.form.sex&&this.form.address&&this.form.type?("学生"==this.form.type&&(this.type1=2),"教师"==this.form.type&&(this.type1=3),this.$axiosjwt({url:"/users/upUserdata",method:"post",data:{u_id:this.user.id,username:this.form.name,sex:this.form.sex,address:this.form.address,type:this.type1},success:function(e){t.open2(e),t.show1=!1,t.get(t.pageSize,t.pageNo)}})):this.open3("不可为空")},select:function(){var t=this;this.input?this.$axiosjwt({url:"/admin/getUsersByTypeAndChar",method:"get",data:{type:2,inputText:this.input,CharType:this.value,pageNum:this.pageSize,currPage:this.pageNo-1},success:function(e){t.tableData=e.data,t.UserSize=e.total}}):this.open3("请输入要搜索的关键字!!!!!!")},get:function(t,e){var a=this;this.$axiosjwt({url:"/users/getUsersByTypePage",method:"get",data:{type:3,pageNum:t,currPage:e-1},success:function(t){a.tableData=t.data,a.UserSize=t.total}})},del:function(t,e){var a=this;this.$axiosjwt({url:"/users/delUserdata",method:"get",data:{u_id:e.id},success:function(t){console.log(a.pageNum),console.log(a.currPage),a.get(a.pageSize,a.pageNo)}})},importxlsx:function(){var t=this;0==this.$refs.upload.uploadFiles.length?this.open3("请选择要导入的文件"):(this.$confirm("将文件导入,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$axiosjwt({url:"/users/setXlsxData",method:"post",success:function(e){t.$message({type:"success",message:e})}})})).catch((function(){t.$message({type:"info",message:"文件导入已经取消"})})),this.get(this.pageSize,this.pageNo))},open:function(t,e){var a=this;this.$confirm("此操作将继续, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.del(t,e),a.$message({type:"success",message:"删除成功!"})})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},handleSizeChange:function(t){this.pageSize=t,this.input&&this.value?this.select():this.get(this.pageSize,this.pageNo)},handleCurrentChange:function(t){this.pageNo=t,this.input&&this.value?this.select():this.get(this.pageSize,this.pageNo)}}}),o=l,r=a("2877"),n=Object(r["a"])(o,s,i,!1,null,"646d179b",null);e["default"]=n.exports},b0c0:function(t,e,a){var s=a("83ab"),i=a("9bf2").f,l=Function.prototype,o=l.toString,r=/^\s*function ([^ (]*)/,n="name";s&&!(n in l)&&i(l,n,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(t){return""}}})}}]);