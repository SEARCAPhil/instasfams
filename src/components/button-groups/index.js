/* eslint-disable new-cap */
import style from './style'
import Toastr from 'toastr'

export default class {
  constructor () {
    this.isQR = 'qr-select'
    this.treshold = 11
    this.scannedBarcode = {}
    this.timeout = {}
    return this.render()
  }

  loadQrScannerCallback (code) {
    console.log(code)
  }
  loadQrScanner () {
    const Scanner = import('../../mixins/scanner')
    const targ = this.__template.querySelector('#scan')
    const __proto__ = Object.create(this)
    // scanner
    const scanBtn = document.createElement('a')
    scanBtn.id = 'scan'
    scanBtn.innerHTML = 'SCAN'

    Scanner.then(scanObj => {
      let opt = {
        callback: this.loadQrScannerCallback.bind(__proto__)
      }
      let scan = new scanObj.default(opt)
      scanBtn.addEventListener('click', () => {
        scan.start()
      })
      // replace node to avoid multiple bidings
      targ.replaceWith(scanBtn)
    })
  }

  open (code) {
    // TOaster
    Toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'preventDuplicates': false,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '35000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }

    Toastr.options.onclick = () => {
      // if url is detected otherwise code only
      if (code.indexOf('http') !==-1) return window.open(code)
      window.open(`https://sfams.searcaapps.org/v2/index.php/user/login?url=fixed-assets-list?search=${code}`)
    }

    Toastr.info('Click to open', `Property: ${code}`)
  }

  loadBarcodeScannerCallback (result) { 
    this.open(result.data)
  }

  loadBarcodeScanner () {
    const Scanner = import('../../mixins/barcode-sdk')
    const targ = this.__template.querySelector('#scan')
    const __proto__ = Object.create(this)
    // scanner
    const scanBtn = document.createElement('a')
    scanBtn.id = 'scan'
    scanBtn.innerHTML = 'SCAN<i class="fa fa-barcode"></i>'

    let opt = {
      targetSelector: '#canvas2',
      callback: this.loadBarcodeScannerCallback.bind(__proto__)
    }

    Scanner.then(scanObj => {
      let scan = new scanObj.default(opt)
      scanBtn.addEventListener('click', () => {
        scan.start()
      })
      // replace node to avoid multiple bidings
      targ.replaceWith(scanBtn)
      // autoclick
      scan.start()
    })
  }

  bindScannerOptions () {
    this.__template.querySelectorAll('.scanner-selector').forEach((el, index) => {
      el.addEventListener('click', (e) => {
        return e.target.id === this.isQR ? this.loadQrScanner() : this.loadBarcodeScanner()
      })
    })

    setTimeout(() => this.loadBarcodeScanner(), 800)
  }
  __bindListeners () {
    this.bindScannerOptions()
  }

  render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('full-width', 'main-btns-section')
    this.__template.id = 'btn-main'
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <div class="main-btns" style="padding: 10px;text-align: left;">
        <a href="#" style="padding: 0;">
          <small>This App is created solely for scanning SEARCA equipment.</small>
        </a>
      </div>
      <div class="main-btns"><a href="#" id="scan">SCAN</a></div>
      <div class="main-btns chev-up device-dropdown" data-device-dropdown="dropdown-chev">
        <a href="#" style="text-decoration: none;">
          <i class="fa fa-mobile-alt" style="font-size: 1.5em;"></i>
          <small>v1.0</small>
        </a>
        </div>
      </div>`
    this.__bindListeners()
    return this.__template
  }
}
