function parseTime(time, format = 'y-m-d h:i:s') {
  if (!time && time !== 0) {
    return '0000-00-00 00:00:00'
  }

  const date = time instanceof Date ? time : new Date(parseInt(time, 10))

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  return format.replace(/(y|m|d|h|i|s|a)+/gi, (match, p1) => {
    p1 = p1.toLowerCase()
    let value = formatObj[p1]

    if (match.length > 0 && value < 10) {
      value = `0${value}`
    }

    return value || (p1 === 'y' ? '0000' : '00')
  })
}

export function formatTime(time, format = 'y-m-d', force = false) {
  const then =
    time instanceof Date
      ? Math.floor(time.getTime() / 1000)
      : parseInt(time, 10)
  const now = Date.now() / 1000
  const diff = now - then

  if (force) {
    return parseTime(then * 1000, format)
  }

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}分钟前`
  } else if (diff < 3600 * 24) {
    return `${Math.floor(diff / 3600)}小时前`
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else {
    return parseTime(then * 1000, format)
  }
}
