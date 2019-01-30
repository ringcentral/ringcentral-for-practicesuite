import initBackground from 'ringcentral-embeddable-extension-common/src/spa/background'

/**
 * for background.js, check current tab is extension target tab or not
 * @param {object} tab
 */
function checkTab(tab) {
  return tab.url.include('practicesuite.com')
}

initBackground(checkTab)
