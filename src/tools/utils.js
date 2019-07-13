/**
 * 字数补位
 * @param num value
 * @param identifier  补全字符
 * @param n 总位数
 */
export function PrefixInteger (num, identifier = 0, n) {
  return (new Array(n).join(identifier) + num).slice(-n)
}
/**
 **  节流
 **/
export function throttle (func, wait) {
  let lastTime = null
  let timeout
  return () => {
    let context = this
    let now = new Date()
    // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
    if (now - lastTime - wait > 0) {
      // 如果之前有了定时任务则清除
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, arguments)
      lastTime = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        // 改变执行上下文环境
        func.apply(context, arguments)
      }, wait)
    }
  }
}
