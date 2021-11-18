/**
 * 防抖
 */
export function debounce(func, delay = 1000) {
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
    }, delay)
  }
}