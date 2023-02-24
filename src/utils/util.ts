/**
 * 常用工具方法
 */

/**
 * 是否大于0
 * @param i
 * @returns
 */
function cal(i: number) {
  if (i < 0) {
    return true
  }
  return false
}

/**
 * 根据身份证解析生日
 * @param cardId
 * @returns
 */
function getBirth(cardId: string) {
  var birth =
    cardId.substring(6, 10) +
    '-' +
    cardId.substring(10, 12) +
    '-' +
    cardId.substring(12, 14)
  return birth
}

/**
 * 根据身份证解析性别
 * @param cardId
 * @returns
 */
function getSex(cardId: string) {
  if (parseInt(cardId.substr(16, 1)) % 2 == 1) {
    return '1' // 男
  } else {
    return '2'
  }
}

/**
 * 隐藏身份证号
 * @param idCard
 * @returns
 */
function hiddenIdcard(idCard: String) {
  try {
    if (idCard && idCard.length == 18) {
      idCard = idCard.replace(/(.{6}).*(.{4})/, '$1********$2')
    }
  } catch (error) {}
  return idCard || ''
}

/**
 * 隐藏手机号
 * @param idCard
 * @returns
 */
function hiddenTel(tel: any) {
  if (!tel) return ''
  let reg = /^(\d{3})\d{4}(\d{4})$/
  return tel.replace(reg, '$1****$2') || ''
}

/**
 * 格式化富文本编辑器的数据
 * @param str
 * @returns
 */
function formatHTML(str: string) {
  if (!str) {
    return ''
  }
  str = str.replace(/<[^>]+>/g, '')
  str = str.replace(/&/g, '')
  str = str.replace(/</g, '')
  str = str.replace(/>/g, '')
  str = str.replace(/\s/g, '')
  str = str.replace(/\'/g, '')
  str = str.replace(/\'/g, '')
  str = str.replace(/\"/g, '')
  str = str.replace(/(^\s*)|(\s*$)/g, '')
  str = str.replace(/(^\s*)/g, '')
  str = str.replace(/(\s*$)/g, '')
  str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n') //去除多余空行
  str = str.replace(/ /gi, '') //去掉
  str = str.replace('专业擅长', '擅长：')
  return str
}

/**
 * 转换日期
 * @param idCard
 * @returns
 */
function parseTime(time?: any, pattern?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  } as any
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export default {
  parseTime,
  hiddenIdcard,
  hiddenTel,
  formatHTML,
  getBirth,
  getSex,
  cal,
}
