/**
 * 微信小程序日志
 */

var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null

function debug() {
  if (!log) return
  log.debug.apply(log, arguments)
}
function info() {
  if (!log) return
  log.info.apply(log, arguments)
}
function warn() {
  if (!log) return
  log.warn.apply(log, arguments)
}
function error() {
  if (!log) return
  log.error.apply(log, arguments)
}
function setFilterMsg(msg: string) {
  if (!log || !log.setFilterMsg) return
  if (typeof msg !== 'string') return
  log.setFilterMsg(msg)
}
function addFilterMsg(msg: string) {
  if (!log || !log.addFilterMsg) return
  if (typeof msg !== 'string') return
  log.addFilterMsg(msg)
}

export default {
  debug,
  info,
  warn,
  error,
  setFilterMsg,
  addFilterMsg,
}
