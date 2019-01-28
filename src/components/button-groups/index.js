import style from './style'
import Toastr from 'toastr'

export default class {
  constructor () {
    this.isQR = 'qr-select'
    this.treshold = 12
    this.timeout = {}
    return this.render()
  }
  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
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
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "35000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

    Toastr.options.onclick = () => {
      window.open(`https://sfams.searcaapps.org/v2/index.php/user/login?url=fixed-assets-list?search=${code}`)
      //window.open(`https://sfams.searcaapps.org/v2/index.php/user/login?url=/v2/fixed-assets-list?search=${code}`)
    }
   
    Toastr.info('Click to open', `Property: ${code}`)

  }

  loadBarcodeScannerCallback (result) {
    
    let codeCount = 0
    let codeSum = 0
    
    result.codeResult.decodedCodes.forEach(res => {
      if(res.error === undefined) return
      codeCount++
      codeSum+= parseFloat(res.error)
    })

    if(codeCount/codeSum > this.treshold) {
      console.log(`parsed successfully . . . RESULT: ${result.codeResult.code} : ${codeCount/codeSum}`)
      // prevent opening multiple tabs all at once
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if(result.codeResult.code.length > 1) this.open(result.codeResult.code)
      }, 1000)
      
    }
    
    
  }

  loadBarcodeScanner () {
    const Scanner = import('../../mixins/barcode')
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

  bindScannerOptions() {
    this.__template.querySelectorAll('.scanner-selector').forEach((el, index) => {
      el.addEventListener('click', (e) => {
        return e.target.id === this.isQR ? this.loadQrScanner() : this.loadBarcodeScanner()
      })
    })

    setTimeout(() => this.loadBarcodeScanner() , 800)
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