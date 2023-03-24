let apiUrl: string =
  process.env.NODE_ENV === 'development'
    ? 'https://crmtest.jxyl.com/api-form/'
    : 'https://crmtest.jxyl.com/api-form/'

export default {
  url: apiUrl,
}
