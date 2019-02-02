
/**
 * content.js for chrome extension
 */

import createApp from 'ringcentral-embeddable-extension-common/src/spa/init'
import { ringCentralConfigs } from 'ringcentral-embeddable-extension-common/src/common/app-config'
import 'ringcentral-embeddable-extension-common/src/spa/style.styl'
import { isIframe, sendMsgToRCIframe } from 'ringcentral-embeddable-extension-common/src/common/helpers'

import { checkLogin } from './api'
import * as config from './config'

import './custom.styl'


console.log('inject rc content.js')

let {
  clientID,
  appServer
} = ringCentralConfigs

let appConfigQuery = ''
if (clientID || appServer) {
  appConfigQuery = `?clientID=${clientID}&appServer=${encodeURIComponent(appServer)}`
}

let authorized = checkLogin()

function injectWidget() {
  // Don't inject in iframe
  if (isIframe) {
    return
  }
  if (window.location.href.indexOf('logoutAction.do') > 0) {
    return
  }
  if (window.location.href.indexOf('login.do') > 0) {
    return
  }
  /* eslint-disable-next-line */
  ;(function() {
    console.log('import RingCentral Embeddable Voice to web page')
    var rcs = document.createElement('script')
    rcs.src = 'https://ringcentral.github.io/ringcentral-embeddable/adapter.js' + appConfigQuery
    var rcs0 = document.getElementsByTagName('script')[0]
    rcs0.parentNode.insertBefore(rcs, rcs0)
  })()
  window.addEventListener('hashchange', () => {
    const isLogined = checkLogin()
    if (authorized !== isLogined) {
      sendMsgToRCIframe({
        type: 'rc-adapter-update-authorization-status',
        authorized: isLogined
      })
    }
    authorized = isLogined
  })
}

injectWidget()
createApp(config)()
