(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e17bd"],{"7b40":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"clearfix",staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("span",[t._v("健康信息上报")])]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),a("el-table-column",{attrs:{prop:"classes",label:"班级"}}),a("el-table-column",{attrs:{prop:"address",label:"生源地"}})],1)],1),a("el-divider"),0==t.show?a("el-card",[a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("span",[t._v("今日检测情况")])]),a("el-alert",{attrs:{title:"今日申请表提交成功",type:"success",center:"","show-icon":""}}),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData1,border:""}},[a("el-table-column",{attrs:{prop:"temperature",label:"当前体温"}}),a("el-table-column",{attrs:{prop:"hot",label:"是否发热、咳嗽"}}),a("el-table-column",{attrs:{prop:"fever",label:"是否有去就诊"}}),a("el-table-column",{attrs:{prop:"to_highrisk",label:"是否去过高风险地区"}}),a("el-table-column",{attrs:{prop:"from_highrisk",label:"是否为高风险地区人员"}}),a("el-table-column",{attrs:{prop:"contact_risk",label:"是否接触过高风险地区人员"}}),a("el-table-column",{attrs:{prop:"leaveout",label:"是否离开过学校"}}),a("el-table-column",{attrs:{prop:"hesuan",label:"是否做过核酸检测"}}),a("el-table-column",{attrs:{prop:"mask_rest",label:"口罩剩余数量"}}),a("el-table-column",{attrs:{prop:"kills",label:"杀毒用品是否充足"}})],1)],1):1==t.show?a("el-card",[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"180px"}},[a("el-form-item",{attrs:{label:"当前体温"}},[a("el-input",{staticStyle:{width:"130px"},model:{value:t.form.temp,callback:function(e){t.$set(t.form,"temp",e)},expression:"form.temp"}})],1),a("el-form-item",{attrs:{label:"是否发热、咳嗽"}},[a("el-radio-group",{model:{value:t.form.radio1,callback:function(e){t.$set(t.form,"radio1",e)},expression:"form.radio1"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否有去就诊"}},[a("el-radio-group",{model:{value:t.form.radio2,callback:function(e){t.$set(t.form,"radio2",e)},expression:"form.radio2"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否去过高风险地区"}},[a("el-radio-group",{model:{value:t.form.radio3,callback:function(e){t.$set(t.form,"radio3",e)},expression:"form.radio3"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否为高风险地区人员"}},[a("el-radio-group",{model:{value:t.form.radio9,callback:function(e){t.$set(t.form,"radio9",e)},expression:"form.radio9"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否接触过高风险地区人员"}},[a("el-radio-group",{model:{value:t.form.radio7,callback:function(e){t.$set(t.form,"radio7",e)},expression:"form.radio7"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否离开过学校"}},[a("el-radio-group",{model:{value:t.form.radio5,callback:function(e){t.$set(t.form,"radio5",e)},expression:"form.radio5"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"是否做过核酸检测"}},[a("el-radio-group",{model:{value:t.form.radio6,callback:function(e){t.$set(t.form,"radio6",e)},expression:"form.radio6"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",{attrs:{label:"口罩剩余数量"}},[a("el-input",{staticStyle:{width:"130px"},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1),a("el-form-item",{attrs:{label:"杀毒用品是否充足"}},[a("el-radio-group",{model:{value:t.form.radio8,callback:function(e){t.$set(t.form,"radio8",e)},expression:"form.radio8"}},[a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"是"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.open}},[t._v("提交")])],1)],1)],1):t._e()],1)],1)],1)},o=[],l={data:function(){return{show:!0,tableData:[],tableData1:[],form:{temp:"",number:"",radio1:"",radio2:"",radio3:"",radio4:"",radio5:"",radio6:"",radio7:"",radio8:"",radio9:""}}},created:function(){var t=this;this.$axiosjwt({url:"/users/getUserDataByToken",method:"get",data:{},success:function(e){t.tableData.push(e)}}),this.getnowdatah()},methods:{getnowdatah:function(){var t=this;this.$axiosjwt({url:"/students/getHealthNowDayByid",method:"get",data:{},success:function(e){0==e.length?t.show=!0:(t.show=!1,t.tableData1.push(e[0]))}})},onSubmit:function(){var t=this;if(this.form.temp&&this.form.radio1&&this.form.radio3&&this.form.radio9&&this.form.radio5&&this.form.radio6&&this.form.radio7&&this.form.number&&this.form.radio8&&this.form.radio2){var e=/^\d+(\.\d+)?$/,a=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,r=a.test(this.form.temp),o=e.test(this.form.number);r?o?this.$axiosjwt({url:"/students/sethealth",method:"post",data:{temperature:this.form.temp,hot:this.form.radio1,to_highrisk:this.form.radio3,from_highrisk:this.form.radio9,leaveout:this.form.radio5,hesuan:this.form.radio6,contact_risk:this.form.radio7,mask_rest:this.form.number,kills:this.form.radio8,fever:this.form.radio2},success:function(e){t.$message({type:"success",message:"提交成功"}),0!=e.length&&t.getnowdatah()}}):this.open3("口罩数量请用数字方式输入"):this.open3("体温请输入数字")}else this.open3("填报表不可留空")},open:function(){var t=this;this.$confirm("提交健康报表, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.onSubmit()})).catch((function(){t.$message({type:"info",message:"已取消提交"})}))},open3:function(t){this.$message({message:t,type:"warning"})}}},s=l,i=a("2877"),m=Object(i["a"])(s,r,o,!1,null,"3a00b870",null);e["default"]=m.exports}}]);