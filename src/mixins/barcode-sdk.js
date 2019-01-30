import * as ScanditSDK from "scandit-sdk";
import { scanditConfig } from '../config/scandit'

export default class {
  constructor (opt) {
    this.__opt = opt
  }

  start () {

    ScanditSDK.configure(scanditConfig.license, {
      engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk/build"
    })

    // settings

    let scanSettings = new ScanditSDK.ScanSettings({
      enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf", "qr"],
      codeDuplicateFilter: 1000
    })

    ScanditSDK.BarcodePicker.create(document.querySelector('#canvas2'), {
      playSoundOnScan: true,
      vibrateOnScan: true
    }).then((barcodePicker) => {
      barcodePicker.applyScanSettings(scanSettings);
      // barcodePicker is ready here to be used (rest of the tutorial code should go here)
      barcodePicker.onScan((scanResult) => {
        this.__opt.callback(scanResult.barcodes.reduce(function(string, barcode) {
          return barcode.data
        }))
      })
    })

  }
}
