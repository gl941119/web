<template>
  <div class="home" id="main">
    <div class="video" ref="video">
      <img class="img" ref="img" src="/static/video/video_0001.jpg" @load="loadImage" alt="">
      <div class="wrapper" :style="{'marginTop': marginTop}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      imgSrc: `/static/video/video_0001.jpg`,
      url: '/static/video',
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
        let video = this.$refs['img']
        video.src = this.infoList[0]
        this.infoList.shift()
        this.flag = true
      } else {
        this.flag = false
      }
    },
    // 队列添加
    calcUrl () {
      let scrollTop = document.documentElement.scrollTop
      let num
      let str
      // 图片数
      num = Math.floor(scrollTop / (parseInt(this.marginTop.split('px')[0]) / 190))
      if (num !== this.photoNum) {
        this.photoNum = num
        if (num < 10) {
          str = `000${num}`
        } else if (num < 100) {
          str = `00${num}`
        } else {
          str = `0${num}`
        }
        this.infoList.push(`${this.url}/video_${str}.jpg`)
      }
    },
    handleScroll (e) {
      this.calcUrl()
      console.log(e)
      this.flag === false ? this.loadImage() : ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.marginTop = this.$refs['video'].clientHeight * 3 + 'px'
  }

}
</script>

<style lang="less" scoped>
  .video{
    height: 100%;
    >img{
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
