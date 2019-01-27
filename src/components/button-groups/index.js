import style from './style'


export default class {
  constructor () {
    this.isQR = 'qr-select'
    return this.render()
  }
  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
  }

  loadQrScanner () {
    const Scanner = import('../../mixins/scanner')
    const targ = this.__template.querySelector('#scan')

    // scanner
    const scanBtn = document.createElement('a')
    scanBtn.id = 'scan'
    scanBtn.innerHTML = 'SCAN'

    
    Scanner.then(scanObj => {
      let scan = new scanObj.default()
      scanBtn.addEventListener('click', () => {
        scan.start()
      })
      // replace node to avoid multiple bidings
      targ.replaceWith(scanBtn)
    })

  }

  loadBarcodeScannerCallback (result) {
    alert(JSON.stringify(result))
  }

  loadBarcodeScanner () {
    const Scanner = import('../../mixins/barcode')
    const targ = this.__template.querySelector('#scan')

    // scanner
    const scanBtn = document.createElement('a')
    scanBtn.id = 'scan'
    scanBtn.innerHTML = 'BAR <i class="fa fa-barcode"></i>'

    let opt = {
      targetSelector: '#canvas2',
      callback: this.loadBarcodeScannerCallback
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

  bindScannerOptions() {
    this.__template.querySelectorAll('.scanner-selector').forEach((el, index) => {
      el.addEventListener('click', (e) => {
        return e.target.id === this.isQR ? this.loadQrScanner() : this.loadBarcodeScanner()
      })
    })

    setTimeout(() => this.loadQrScanner() , 800)
  }
  __bindListeners () {
    this.loadDropdown()
    this.bindScannerOptions()
  }

  render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('full-width', 'main-btns-section')
    this.__template.id = 'btn-main'
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <div class="main-btns"><a href="#">SAVE</a></div>
      <div class="main-btns"><a href="#" id="scan">SCAN</a></div>
      <div class="main-btns chev-up device-dropdown" data-device-dropdown="dropdown-chev">
        <a href="#"><i class="fa fa-chevron-up"></i></a>
        <div class="dropdown-section float-right" id="dropdown-chev">
          <ul class="list-group list-group-flush unstyled">
            <li class="list-group-item scanner-selector" >
              <a href="#" class="update-btn-modal text-center">
                <i class="fa fa-qrcode" style="font-size: 2em;" id="qr-select"></i>
              </a>
            </li>
            <li class="list-group-item scanner-selector" id="barcode-select">
              <a href="#" class="text-danger remove-btn-modal">
                <i class="fa fa-barcode" style="font-size: 2em;"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>`
    this.__bindListeners()
    return this.__template
  }
  
}