<template>
  <div class="home">
    <div class="video" ref="video">
      <img class="img" ref="img" :src="imgSrc" @load="loadImage" alt="">
      <!--<div class="wrapper" :style="{'marginTop': marginTop}"></div>-->
    </div>
  </div>
</template>

<script>
import {PrefixInteger, throttle} from '@tools/utils'
export default {
  name: 'index',
  data () {
    return {
      imgSrc: `./static/video/video_0000.jpg`, // 首屏图片
      url: './static/video', // 图片路径
      marginTop: '500px', // 滚动条总距离
      photoTotal: 190, // 图片总数
      photoNum: 1, // 图片数缓存
      infoList: [], // 渲染队列
      flag: true// 是否需要渲染
    }
  },
  methods: {
    handleScroll (e) {
      this.addList()
      if (this.flag) { this.loadImage() }
    },
    // 队列缓存
    addList () {
      let scrollTop = document.documentElement.scrollTop
      // 图片数
      let num = Math.floor(scrollTop / (parseInt(this.marginTop.split('px')[0]) / this.photoTotal))
      // 防止重复
      if (num !== this.photoNum) {
        this.photoNum = num
        this.infoList.push(num)
        this.flag = true
      }
    },
    // 图片渲染
    loadImage (e) {
      if (this.infoList.length) {
        this.imgSrc = this.calcUrl(this.infoList[0])
        this.infoList.shift()
      } else {
        this.flag = false
      }
    },

    // 地址填充
    calcUrl (num) {
      return `${this.url}/video_${PrefixInteger(num, 0, 4)}.jpg`
    },

    // 预加载
    handlePrestrain () {
      let images = new Array(this.photoTotal).fill()
      let count = 0 // 计数器
      images.forEach((item, index) => {
        item = new Image()
        item.src = this.calcUrl(index)
        item.onerror = () => {
          // 加载失败
        }
        item.onload = () => {
          count++
          // 加载成功
          if (count === this.photoTotal) this.loadSuccess()
        }
      })
    },
    // 预加载完成绑定事件
    loadSuccess () {
      window.addEventListener('scroll', throttle(() => {
        this.handleScroll()
      }, 20), true)
    }

  },
  mounted () {
    this.handlePrestrain()
    // this.marginTop = this.$refs['video'].clientHeight * 3 + 'px'
    document.documentElement.scrollTop = 0
    // this.handleScroll()
  },
  updated () {
    // console.log(123)
  }

}
</script>

<style lang="less" scoped>
  .video{
    height: 100%;
    margin-bottom: 500px;
    /*overflow: hidden;*/
    >img{
      display: block;
     width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      z-index: 0;
      top: 0px;
    }
  }
  .wrapper{
    height: 1px;
    background: #d2b8b800;
    z-index: 900;
    position: relative;
    padding-top: 0;
  }
</style>
