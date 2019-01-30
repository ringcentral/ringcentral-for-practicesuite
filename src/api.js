// https://ps7.practicesuite.com/PracticeSuite/patientSearchAction.do?myAction=search&_dc=1548321054095&lastName=t&firstName=&mrn=&pcRef=&insuranceIdNumber=&homePhoneNumber=&dateOfBirth=&ssn=&includeInactiveVal=N&includeInactive=N&page=1&start=0&limit=50

import fetch from 'ringcentral-embeddable-extension-common/src/common/fetch'
import { AsYouType } from 'libphonenumber-js'

export function checkLogin() {
  if (document.querySelectorAll('a.user-menu').length > 0) {
    return true
  }
  if (document.getElementById('psWizardMainPanel')) {
    return true
  }
  return false
}

function formatPatients(patients) {
  return patients.map((p) => {
    const phoneNumbers = [];
    if (p.phone) {
      phoneNumbers.push({
        phoneNumber: p.phone.replace(/[^\d+]/g, ''),
        phoneType: 'Direct'
      })
    }
    return {
      id: p.patientPKey,
      name: `${p.patientFirstName} ${p.patientLastName}`,
      phoneNumber: p.phone,
      type: 'PracticeSuite',
      phoneNumbers,
      emails: []
    }
  })
}

export async function searchPhoneNumber(phoneNumber) {
  let searchString = phoneNumber
  if (phoneNumber.length > 2) {
    if (searchString.indexOf('+1') === 0) {
      searchString = searchString.replace('+1', '')
    }
    searchString = (new AsYouType('US').input(searchString)).replace(/\s/g, '')
  }
  // PracticeSuite only support (233)999-9999 format
  const response = await fetch.get(`/PracticeSuite/patientSearchAction.do?myAction=search&lastName=&firstName=&mrn=&pcRef=&insuranceIdNumber=&homePhoneNumber=${searchString}&dateOfBirth=&ssn=&includeInactiveVal=N&includeInactive=N&page=1&start=0&limit=5`)
  return { response, phoneNumber, searchString }
}

export async function searchContacts(keyword) {
  const digital = keyword.replace(/[^\d+]/g, '')
  if (digital === keyword) {
    const result = await searchPhoneNumber(digital)
    return formatPatients(result.response.patients)
  }
  const lastNameResponse = fetch.get(`/PracticeSuite/patientSearchAction.do?myAction=search&lastName=${keyword}&firstName=&mrn=&pcRef=&insuranceIdNumber=&homePhoneNumber=&dateOfBirth=&ssn=&includeInactiveVal=N&includeInactive=N&page=1&start=0&limit=50`)
  const firstNameResponse = fetch.get(`/PracticeSuite/patientSearchAction.do?myAction=search&lastName=&firstName=${keyword}&mrn=&pcRef=&insuranceIdNumber=&homePhoneNumber=&dateOfBirth=&ssn=&includeInactiveVal=N&includeInactive=N&page=1&start=0&limit=50`)
  let patients = []
  const responses = await Promise.all([lastNameResponse, firstNameResponse])
  responses.forEach((r) => {
    patients = patients.concat(r.patients)
  })
  return formatPatients(patients)
}

export async function matchContacts(phoneNumbers) {
  const promises = []
  phoneNumbers.forEach((phoneNumber) => {
    const promise = searchPhoneNumber(phoneNumber)
    promises.push(promise)
  })
  const results = await Promise.all(promises)
  const matchResult = {}
  results.forEach((result) => {
    const { phoneNumber, response, searchString } = result
    if (response.patients && response.patients) {
      const matchedPatients = response.patients.filter(p => p.phone === searchString)
      matchResult[phoneNumber] = formatPatients(matchedPatients)
    }
  })
  return matchResult
}
