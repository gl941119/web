<template>
  <div class="home">
    <div class="video" ref="video" :style="{marginBottom:scrollLen+'px'}">
      <img class="img" ref="img"  :src="imgSrc" @load="loadImage" alt="">
      <transition name="fade">
      <img v-if="isShowScroll" class="scroll" src="../../assets/image/scroll.png" width="208" height="134" alt="" onclick="return false">
      </transition>
      <transition name="fade">
      <img v-if="isShowName" class="name" src="../../assets/image/logo-name.png"  alt="" onclick="return false">
      </transition>
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
      scrollLen: 1000, // 滚动条距离
      photoTotal: 150, // 图片总数
      photoNum: 1, // 图片数缓存
      infoList: [], // 渲染队列
      flag: true, // 是否需要渲染
      isShowScroll: false, // 下滑图片过度
      isShowName: false // logo过度
    }
  },
  methods: {
    // 滑动事件
    handleScroll (e) {
      let scrollTop = document.documentElement.scrollTop
      this.handleShow(scrollTop)
      this.addList(scrollTop)
      if (this.flag) { this.loadImage() }
    },
    // logo显示
    handleShow (scrollTop) {
      if (scrollTop <= (this.scrollLen / 10)) {
        this.isShowScroll = true
      } else {
        this.isShowScroll = false
      }
      if (scrollTop <= (this.scrollLen / 2)) {
        this.isShowName = false
      } else {
        this.isShowName = true
      }
    },
    // 队列缓存
    addList (scrollTop) {
      // 图片数
      let num = Math.floor(scrollTop / (this.scrollLen / this.photoTotal))
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
      // let count = 0 // 计数器
      let promiseAll = []
      images.forEach((item, index) => {
        item = new Image()
        promiseAll[index] = new Promise((resolve, reject) => {
          item = new Image()
          item.src = this.calcUrl(index)
          // item.setAttribute('crossOrigin', 'Anonymous')
          item.onload = function () {
            resolve(item)
          }
          item.onerror = function () {
            reject(item)
          }
        })
      })
      Promise.all(promiseAll)
        .then(imgs => {
          this.loadSuccess()
        }).catch(item => {

        })
    },
    // 预加载完成
    loadSuccess () {
      this.isShowScroll = true // 显示下滑按钮
      window.addEventListener('scroll', throttle(() => {
        this.handleScroll()
      }, 20), true)
    }

  },
  mounted () {
    this.handlePrestrain()
    this.scrollLen = this.$refs['video'].clientHeight * 4
    document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less" scoped>
  .video{
    height: 100%;
    .img{
      display: block;
     width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      z-index: 0;
      top: 0px;
    }
    .scroll{
      position: fixed;
      bottom: 50px;
      left: 50%;
      margin-left: -104px;
      z-index: 999;
    }
    .name{
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 800;
      margin-left: -428px;
      margin-top: -242px;
    }
  }

</style>
