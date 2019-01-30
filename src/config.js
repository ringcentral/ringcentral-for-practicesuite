import _ from 'lodash'
import { searchContacts, matchContacts, checkLogin } from './api'

/**
 * content config file
 * with proper config,
 * insert `call with ringcentral` button
 * or hover some elemet show call button tooltip
 * or convert phone number text to click-to-call link
 *
 */

// config insert click to call button
export const insertClickToCallButton = [
  {
    // before insert check pre condition like page url or something else
    shouldAct: href => {
      return href.includes('Schedule')
    },

    // define in the page how to get phone number,
    // if can not get phone number, will not insert the call button
    // support async
    getContactPhoneNumbers: async () => {
      let nodes = document.querySelectorAll('input[name="homePhone"]')
      const phones = []
      nodes.forEach((node) => {
        phones.push({
          id: node.value,
          title: 'Call with RingCentral',
          number: node.value
        })
      })
      return phones
    },

    // parent dom to insert call button
    // can be multiple condition
    // the first one matches, rest the array will be ignored
    parentsToInsertButton: [
      {
        getElem: () => {
          const phonenumber = document.querySelector('input[name="homePhone"]')
          if (phonenumber && phonenumber.parentElement) {
            return phonenumber.parentElement
          }
        },
        insertMethod: 'appendChild',
        shouldInsert: () => {
          return true
        }
      }
    ]
  }
]

// modify phone number text to click-to-call link
export const phoneNumberSelectors = [
  {
    // before insert check pre condition like page url or something else
    shouldAct: (href) => {
      return href.includes('patientmain')
    },
    selector: 'input[id^="phonenumber"]',
    getPhoneNumber: (node) => {
      return node.value
    }
  },
  {
    // before insert check pre condition like page url or something else
    shouldAct: (href) => {
      return href.includes('patientmain')
    },
    selector: '.x-grid-cell-inner',
    getPhoneNumber: (node) => {
      return node.textContent
    }
  }
]

/**
 * thirdPartyService config
 * @param {*} serviceName
 */
export function thirdPartyServiceConfig(serviceName) {
  const services = {
    name: serviceName,
    // // show contacts in ringcentral widgets
    // contactsPath: '/contacts',
    contactSearchPath: '/contacts/search',
    contactMatchPath: '/contacts/match',

    // // show auth/auauth button in ringcentral widgets
    authorizationPath: '/authorize',
    authorizedTitle: 'Connected',
    unauthorizedTitle: 'Disconnected',
    authorized: checkLogin()
  }

  // handle ringcentral event
  // check https://github.com/zxdong262/pipedrive-embeddable-ringcentral-phone-spa/blob/master/src/config.js
  // as example
  // read our document about third party features https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/third-party-service-in-widget.md
  const handleRCEvents = async e => {
    const { data } = e
    if (!data) {
      return
    }
    if (data.type !== 'rc-post-message-request') {
      return
    }
    
    const { rc } = window
    
    //   else if (path === '/contacts') {
    //     let contacts = await getContacts()
    //     rc.postMessage({
    //       type: 'rc-post-message-response',
    //       responseId: data.requestId,
    //       response: {
    //         data: contacts,
    //         nextPage: null
    //       }
    //     })
    //   }
    if (data.path === '/authorize') {
      rc.postMessage({
        type: 'rc-post-message-response',
        responseId: data.requestId,
        response: { data: 'ok' }
      })
    } else if (data.path === '/contacts/search') {
      const keyword = _.get(data, 'body.searchString')
      const result = await searchContacts(keyword)
      rc.postMessage({
        type: 'rc-post-message-response',
        responseId: data.requestId,
        response: {
          data: result
        }
      })
    }
    else if (data.path === '/contacts/match') {
      const phoneNumbers = _.get(data, 'body.phoneNumbers') || []
      const contacts = await matchContacts(phoneNumbers.slice(0, 4))
      rc.postMessage({
        type: 'rc-post-message-response',
        responseId: data.requestId,
        response: {
          data: contacts
        }
      })
    }
  }
  return {
    services,
    handleRCEvents
  }
}

/**
 * init third party
 * could init dom insert etc here
 */
export async function initThirdParty() {

}
