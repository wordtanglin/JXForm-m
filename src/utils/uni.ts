/**
 * show loading
 * @param title 文字
 */
export function showLoading(title: string = '加载中...') {
  uni.showLoading({
    title: '加载中...',
  })
}

/**
 * 隐藏loading
 * @param delay 时间
 */
export function hideLoading(delay: number = 0) {
  setTimeout(() => {
    uni.hideLoading()
  }, delay)
}

/**
 * 弹窗提示
 * @param title  文字
 * @param duration 延迟时间
 */
export function toast(title: string, duration: number = 2000) {
  uni.showToast({
    icon: 'none',
    title: title,
    duration: duration,
  })
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * @param url
 * @param delay
 * @returns
 */
export function switchTab(url: string, delay: number = 0) {
  if (!url || url == '') return
  setTimeout(() => {
    uni.switchTab({
      url: url,
    })
  }, delay)
}

/**
 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
 * @param url 跳转页面
 * @param delay 等待时间
 * @returns
 */
export function navigateTo(url: string, delay: number = 0) {
  if (!url || url == '') return
  setTimeout(() => {
    uni.navigateTo({
      url: url,
    })
  }, delay)
}

/**
 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
 * @param url 跳转页面
 * @param delay 等待时间
 * @returns
 */
export function reLaunch(url: string, delay: number = 0) {
  if (!url || url == '') return
  setTimeout(() => {
    uni.reLaunch({
      url: url,
    })
  }, delay)
}

/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * @param number
 * @param delay
 */
export function navigateBack(number: number = 1, delay: number = 0) {
  setTimeout(() => {
    uni.navigateBack({
      delta: number,
    })
  }, delay)
}

/**
 *  关闭当前页面，跳转到应用内的某个页面。
 * @param url
 * @param delay
 * @returns
 */
export function redirectTo(url: string, delay: number = 0) {
  if (!url || url == '') return
  setTimeout(() => {
    uni.redirectTo({
      url: url,
    })
  }, delay)
}

/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 * @param key  key
 * @param value value
 * @returns
 */
export function setStorageSync(key: string, value: string) {
  return uni.setStorageSync(key, value)
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容。
 * @param key
 * @returns
 */
export function getStorageSync(key: string) {
  return uni.getStorageSync(key)
}

/**
 * 从本地缓存中异步移除指定 key
 * @param key
 * @returns
 */
export function removeStorage(key: string) {
  return uni.removeStorage({
    key: key,
  })
}

/**
 * 同步清理本地数据缓存
 */
export function clearStorage() {
  return uni.clearStorageSync()
}

/**
 * 动态设置当前页面的标题
 * @param title
 */
export function setNavigationTitle(title: string) {
  uni.setNavigationBarTitle({
    title: title,
  })
}

/**
 * 提示
 * @param msg
 */
export function showModal(msg: string) {
  uni.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function (res) {},
  })
}

/**
 * 跳转小程序
 * @param appId
 * @param path
 */
function navigateToMiniProgram(appId: string, path?: string) {
  uni.navigateToMiniProgram({
    appId: appId,
    path: path,
    envVersion: 'release',
    success: (res) => {},
    fail: (err) => {},
  })
}

/**
 * 获取小程序导航栏高度
 * @returns
 */
function getStatusBarHeight() {
  return uni.getSystemInfoSync().statusBarHeight
}


export default {
  showLoading,
  hideLoading,
  toast,
  switchTab,
  navigateTo,
  navigateBack,
  redirectTo,
  setStorageSync,
  getStorageSync,
  removeStorage,
  clearStorage,
  setNavigationTitle,
  reLaunch,
  showModal,
  navigateToMiniProgram,
  getStatusBarHeight,
}
