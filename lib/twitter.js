const twitter = ($) => {
  const getTweetId = (url) => {
    const reg = /^https:\/\/twitter\.com\/.+\/status\/([0-9]{1,}).*/
    return url && url.match(reg) ? url.replace(reg, '$1') : null
  }

  $('blockquote.twitter-tweet').each((i, element) => {
    const $twitter = $(element)
    const $a = $twitter.find('a')
    const href = $a.attr('href')
    const tweetId = getTweetId(href)
    if ($a.length === 1 && href && tweetId) {
      const $amp = $('<amp-twitter />')
      const { height, width } = element.attribs

      $amp.attr({
        ...element.attribs,
        layout: 'responsive',
        'data-tweetid': tweetId,
        height: height && height.match(/^[0-9]{1,}$/) ? height : '100',
        width: width && width.match(/^[0-9]{1,}$/) ? width : '100'
      })
      $twitter.replaceWith($amp)
    }
  })

  if ($('amp-twitter').length) {
    $('script[custom-element="amp-twitter"]').remove()
    $('head').prepend('<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>')
  }

  return $
}

module.exports = twitter
