webpackJsonp([0],{FP3a:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"index",data:function(){return{imgSrc:"/static/video/video_0001.jpg",url:"/static/video",marginTop:"500px",photoNum:1,infoList:[],flag:!0}},methods:{loadImage:function(t){this.infoList.length?(this.imgSrc=this.infoList[0],this.infoList.shift(),this.flag=!0):this.flag=!1},addList:function(){var t,i=document.documentElement.scrollTop;(t=Math.floor(i/(parseInt(this.marginTop.split("px")[0])/190)))!==this.photoNum&&(this.photoNum=t,this.infoList.push(this.calcUrl(t)))},calcUrl:function(t){return t<10?this.url+"/video_000"+t+".jpg":t<100?this.url+"/video_00"+t+".jpg":this.url+"/video_0"+t+".jpg"},handleScroll:function(t){this.addList(),!1===this.flag&&this.loadImage()}},mounted:function(){window.addEventListener("scroll",this.handleScroll,!0),this.marginTop=3*this.$refs.video.clientHeight+"px";for(var t=new Array,i=0;i<191;i++)t[i]=new Image,t[i].src=this.calcUrl(i)}},a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"home",attrs:{id:"main"}},[i("div",{ref:"video",staticClass:"video"},[i("img",{ref:"img",staticClass:"img",attrs:{src:this.imgSrc,alt:""},on:{load:this.loadImage}}),this._v(" "),i("div",{staticClass:"wrapper",style:{marginTop:this.marginTop}})])])},staticRenderFns:[]};var n=s("C7Lr")(e,a,!1,function(t){s("PbT3")},"data-v-a32884be",null);i.default=n.exports},PbT3:function(t,i){}});
//# sourceMappingURL=0.74b18822828bb4c688a1.js.map