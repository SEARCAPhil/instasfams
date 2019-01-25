import style from './style'

export default class {
  constructor () {
    return this.render()
  }
  __bindListeners () {
    const Scanner = import('../../mixins/scanner')
    Scanner.then(scanObj => {
      let scan = new scanObj.default()
      this.__template.querySelector('#scan').addEventListener('click', () => {
        scan.start()
      })
    })

  }

  render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('full-width', 'main-btns-section')
    this.__template.id = 'btn-main'
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <ul class="unstyled">
        <li class="main-btns"><a href="#">SAVE</a></li>
        <li class="main-btns"><a href="#" id="scan">SCAN</a></li>
      </ul>`
    this.__bindListeners()
    return this.__template
  }
  
}