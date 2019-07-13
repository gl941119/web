<template>
  <div class="home" id="main">
    <div class="video" ref="video">
      <img class="img" ref="img" :src="imgSrc" @load="loadImage" alt="">
      <div class="wrapper" :style="{'marginTop': marginTop}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      imgSrc: `./static/video/video_0001.jpg`,
      url: './static/video',
      marginTop: '500px', // 滚动条总距离
      photoNum: 1, // 图片数缓存
      infoList: [], // 渲染队列
      flag: true// 开关
    }
  },
  methods: {
    // 图片渲染
    loadImage (e) {
      if (this.infoList.length) {
        // let video = this.$refs['img']
        this.imgSrc = this.infoList[0]
        this.infoList.shift()
        this.flag = true
      } else {
        this.flag = false
      }
    },
    // 队列添加
    addList () {
      let scrollTop = document.documentElement.scrollTop
      let num
      // 图片数
      num = Math.floor(scrollTop / (parseInt(this.marginTop.split('px')[0]) / 190))
      if (num !== this.photoNum) {
        this.photoNum = num
        this.infoList.push(this.calcUrl(num))
      }
    },
    // 地址填充
    calcUrl (num) {
      if (num < 10) {
        return `${this.url}/video_000${num}.jpg`
      } else if (num < 100) {
        return `${this.url}/video_00${num}.jpg`
      } else {
        return `${this.url}/video_0${num}.jpg`
      }
    },
    handleScroll (e) {
      this.addList()
      this.flag === false ? this.loadImage() : ''
    }
    // 节流
    // throttle (fun, delay, time) {
    //   var timeout,
    //     startTime = new Date()
    //
    //   return  ()=> {
    //     var context = this,
    //       args = arguments,
    //       curTime = new Date()
    //
    //     clearTimeout(timeout)
    //     // 如果达到了规定的触发时间间隔，触发 handler
    //     if (curTime - startTime >= time) {
    //       fun.apply(context, args)
    //       startTime = curTime
    //       // 没达到触发间隔，重新设定定时器
    //     } else {
    //       timeout = setTimeout(fun, delay)
    //     }
    //   }
    // }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.marginTop = this.$refs['video'].clientHeight * 3 + 'px'
    let images = new Array()
    for (let i = 0, len = 191; i < len; i++) {
      images[i] = new Image()
      images[i].src = this.calcUrl(i)
    }
  }

}
</script>

<style lang="less" scoped>
  .video{
    height: 100%;
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
