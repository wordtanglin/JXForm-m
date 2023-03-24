let apiUrl: string = '' //测试
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'https://crmtest.jxyl.com/api-form/'
} else {
  apiUrl = 'https://crmtest.jxyl.com/api-form/' // 正式/测试环境
}

export default {
  url: apiUrl
}
