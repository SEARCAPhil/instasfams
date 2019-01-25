/* eslint-disable new-cap */

const loadScannerBtns = () => {
  const ScannerBtns = import('./components/button-groups')
  ScannerBtns.then(btn => {
    let btnComp = new btn.default()
    let targ = document.querySelector('#btn-main')
    let t = targ === null ? document.body.append(btnComp) : targ.replaceWith(btnComp)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadScannerBtns()
})