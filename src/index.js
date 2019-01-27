/* eslint-disable new-cap */

const loadScannerBtns = () => {
  const ScannerBtns = import('./components/button-groups')
  ScannerBtns.then(btn => {
    let btnComp = new btn.default()
    let targ = document.querySelector('#btn-main')
    let t = targ === null ? document.body.append(btnComp) : targ.replaceWith(btnComp)
  })
}

const loadServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log(registrationError)
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadScannerBtns()
  loadServiceWorker()
})