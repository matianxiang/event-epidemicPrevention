(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6977"],{"1e8e":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("填写假条")])]),a("el-select",{attrs:{placeholder:"请选择请假类型"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("div",{staticStyle:{height:"20px"}}),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}}),a("div",{staticStyle:{height:"20px"}}),a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",maxlength:"100","show-word-limit":""},model:{value:e.textarea,callback:function(t){e.textarea=t},expression:"textarea"}}),a("div",{staticStyle:{height:"20px"}}),a("div",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.onapplication}},[e._v("提交")]),a("div",{staticStyle:{height:"20px"}})],1)],1),a("el-divider",[a("i",{staticClass:"el-icon-loading"})]),a("el-card",{staticStyle:{"margin-top":"20px","margin-bottom":"5rem"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","default-sort":{prop:"createtime",order:"descending"}}},[a("el-table-column",{attrs:{label:"申请时间",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("date")(t.row.createtime)))]}}])}),a("el-table-column",{attrs:{prop:"leavetype",label:"类型"}}),a("el-table-column",{attrs:{prop:"reason",label:"详细信息"}}),a("el-table-column",{attrs:{label:"审核结果"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("state")(t.row.state)))]}}])})],1),a("div",{staticClass:"block",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20,25],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.UserSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1)],1)},n=[],l={data:function(){return{UserSize:0,currentPage:0,tableData:[],pageSize:5,pageNo:1,currentPage1:1,text:"",textarea:"",options:[{value:"请假",label:"请假"},{value:"外出",label:"外出"}],value:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},value1:"",value2:""}},created:function(){this.getapplication(this.pageNo,this.pageSize)},filters:{date:function(e){var t=new Date(e),a=t.getFullYear(),i=t.getMonth()+1,n=t.getDate(),l=t.getHours(),s=t.getMinutes(),r=t.getSeconds();return a+"-"+i+"-"+n+"  "+l+":"+s+":"+r},state:function(e){return 0==e?"未审批":1==e?"审批不通过":2==e?"审批通过":void 0}},methods:{getapplication:function(e,t){var a=this;this.$axiosjwt({url:"/admin/getuserLeave",method:"get",data:{currPage:e-1,pageNum:t},success:function(e){a.tableData=e.data,a.UserSize=e.total}})},onapplication:function(){var e=this;if(this.textarea&&this.value&&this.value2){var t=new Date(this.value2[0]),a=new Date(this.value2[1]),i="",n="";i=t.getMonth()+1<10?t.getFullYear()+"-0"+(t.getMonth()+1)+"-"+t.getDate():t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate(),n=a.getMonth()+1<10?a.getFullYear()+"-0"+(a.getMonth()+1)+"-"+a.getDate():a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate(),this.$axiosjwt({url:"/students/setLeave",method:"post",data:{reason:this.textarea,leavetype:this.value,starttime:i,endtime:n},success:function(t){e.getapplication(e.pageNo,e.pageSize),e.open2(t),e.textarea="",e.value="",e.value2=""}})}else this.open3("请假信息不可以留空")},open1:function(e){this.$message(e)},open2:function(e){this.$message({message:e,type:"success"})},open3:function(e){this.$message({message:e,type:"warning"})},open4:function(e){this.$message.error(e)},handleSizeChange:function(e){this.pageSize=e,this.getapplication(this.pageNo,this.pageSize)},handleCurrentChange:function(e){this.pageNo=e,this.getapplication(this.pageNo,this.pageSize)}}},s=l,r=a("2877"),o=Object(r["a"])(s,i,n,!1,null,null,null);t["default"]=o.exports}}]);