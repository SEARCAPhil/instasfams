import jsQR from 'jsqr'

export default class {
  constructor (opt) {
    this.__opt = opt
    this.video = document.createElement('video')
    this.canvasElement = document.querySelector('#canvas')
    this.canvas = this.canvasElement.getContext('2d')
  }

  tick () {
    this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height)
    this.imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.code = jsQR(this.imageData.data, this.imageData.width, this.imageData.height, {
      inversionAttempts: 'dontInvert'
    })
    if (this.code) {
      this.__opt.callback(this.code)
    } else {

    }
    let e = Object.create(this)
    window.requestAnimationFrame(this.tick.bind(Object.create(e)))
  }

  start () {
    // Use facingMode: environment to attemt to get the front camera on phones
    window.navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      this.video.srcObject = stream
      this.video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      this.video.play()
      let e = Object.create(this)
      window.requestAnimationFrame(this.tick.bind(e))
    })
  }
}
