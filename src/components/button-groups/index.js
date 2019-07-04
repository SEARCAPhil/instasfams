/* eslint-disable new-cap */
import style from './style'
import Toastr from 'toastr'
import { scanditConfig } from '../../config/scandit'

export default class {
  constructor () {
    this.isQR = 'qr-select'
    this.treshold = 11
    this.scannedBarcode = {}
    this.timeout = {}

    return this.render()
  }

  success(session) {
      /* console.log(session.newlyRecognizedCodes[0].data)
     alert("Scanned " + session.newlyRecognizedCodes[0].symbology
              + " code: " + session.newlyRecognizedCodes[0].data);*/
      const code = session.newlyRecognizedCodes[0].data
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
      // If you are using continuous scanning you might want to stop here. Please note that
    // you will have to use session.stopScanning()/session.pauseScanning() instead of the
    // corresponding method on the picker. This will avoid a race condition and immediately stop
    // the scanning process after the success callback has finished executing.
    session.stopScanning();
  }

  failure(error) {
    // DO NOTHING
      //alert("Failed: " + error);
  }

  loadQrScannerCallback (code) {
    console.log(code)
  }

  scanPhonegap () {

    Scandit.License.setAppKey(scanditConfig.license)
    var settings = new Scandit.ScanSettings();
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPCA, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPCE, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.CODE39, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.ITF, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.DATA_MATRIX, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.CODE128, true);

     // Scandit BarcodeScanner SDK only scans barcodes in a certain length range. If your
    // application requires scanning of one of these symbologies, and the length is falling
    // outside the default range, you may need to adjust the "active symbol counts" for this
    // symbology. This is shown in the following few lines of code.
    /*var symSettings = settings.getSymbologySettings(Scandit.Barcode.Symbology.CODE39);
    symSettings.activeSymbolCounts = [
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ];*/
    // For details on defaults and how to calculate the symbol counts for each symbology, take
    // a look at http://docs.scandit.com/stable/c_api/symbologies.html.

    var picker = new Scandit.BarcodePicker(settings);
    picker.show(this.success.bind(__proto__), null, this.failure.bind(__proto__));
    picker.startScanning();
  }

  loadQrScanner () {
    const Scanner = import('../../mixins/scanner')
    const targ = this.__template.querySelector('#scan')
    const __proto__ = Object.create(this)
    // scanner
    const scanBtn = document.createElement('a')
    scanBtn.id = 'scan'
    scanBtn.innerHTML = 'SCAN'
    scanBtn.addEventListener('click', () => {
      this.scanPhonegap()
    })
    // replace node to avoid multiple bidings
    targ.replaceWith(scanBtn)
    /*Scanner.then(scanObj => {
      let opt = {
        callback: this.loadQrScannerCallback.bind(__proto__)
      }
      let scan = new scanObj.default(opt)
      scanBtn.addEventListener('click', () => {
        scan.start()
      })

    })*/
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

    scanBtn.addEventListener('click', () => {
      this.scanPhonegap()
    })

    targ.replaceWith(scanBtn)
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
