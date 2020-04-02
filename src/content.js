
/**
 * content.js for chrome extension
 */

import createApp from 'ringcentral-embeddable-extension-common/src/spa/init'
import { ringCentralConfigs, thirdPartyConfigs, appVersion } from 'ringcentral-embeddable-extension-common/src/common/app-config'
import 'ringcentral-embeddable-extension-common/src/spa/style.styl'
import { isIframe, sendMsgToRCIframe } from 'ringcentral-embeddable-extension-common/src/common/helpers'

import { checkLogin } from './api'
import * as config from './config'
import './custom.styl'

let {
  clientID,
  appServer,
  clientSecret
} = ringCentralConfigs
let { serviceName } = thirdPartyConfigs
let appConfigQuery = ''
if (clientID || appServer) {
  appConfigQuery = `?prefix=${serviceName}-rc&newAdapterUI=1&disconnectInactiveWebphone=1&userAgent=${serviceName}_extension%2F${appVersion}&disableActiveCallControl=false&appKey=${clientID}&appSecret=${clientSecret}&appServer=${encodeURIComponent(appServer)}`
}

let authorized = checkLogin()

function injectWidget () {
  // Don't inject in iframe
  if (isIframe) {
    return
  }
  if (
    window.location.href.includes('logoutAction.do') || window.location.href.includes('login.do')) {
    return
  }
  /* eslint-disable-next-line */
  ;(function() {
    console.log('import RingCentral Embeddable Voice to web page')
    var rcs = document.createElement('script')
    rcs.src = 'https://apps.ringcentral.com/integration/ringcentral-embeddable-preview/adapter.js' + appConfigQuery
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
