class BarcodeScannerEvent {
  constructor() {
    this.timeoutHandler = null;
    this.inputString = '';
    this.buffer = '';
    this.initial = true;
    this.keypress = this.keypress.bind(this);
    this.checkInputLength = this.checkInputLength.bind(this);
  }

  keypress(event) {
    if (this.timeoutHandler || this.buffer !== '') {
      clearTimeout(this.timeoutHandler);
      this.inputString += this.buffer + event.key;
      this.buffer = '';
      this.initial = false;
    } else if (this.initial) {
      this.buffer = event.key;
    }

    this.timeoutHandler = setTimeout(() => this.checkInputLength(event), 50);
  }

  checkInputLength(event) {
    const thisString = this.inputString;
    if (this.inputString.length <= 10) {
      console.log('killed this: ',this.inputString, event);
      this.inputString = '';
      this.initial = true;
      return;
    }
    document.dispatchEvent(new CustomEvent('scan',{detail: thisString}));
    this.inputString = '';
  }
}

window.onload = () => {
  let primed = false;
  let scannerInput = false;
  let buffer = '';
  let robert = new BarcodeScannerEvent;
  document.addEventListener('on')
  document.addEventListener('keypress',robert.keypress);
  document.addEventListener('scan', (event) => {
    console.log(event);
    //   console.log(event)
    //   const {keyCode} = event;
    //   if (scannerInput) {
    //     event.preventDefault();
    //     if (event.key.length === 1){
    //       buffer += event.key;
    //     }
    //     if (event.key === "Enter") {
    //       scannerInput = false;
    //       processBuffer(buffer);
    //       buffer = '';
    //     }
    //   } else if (primed) {
    //     if (event.key === '?') {
    //       console.log('scanner input started');
    //       scannerInput = true;
    //     }
    //     console.log('no longer primed');
    //     primed = false;
    //   } else if (event.key === '@'){
    //     console.log('primed');
    //     primed = true;
    //   } 
    // })

  })

  function processBuffer(buffer) {
    try {
      const badge = JSON.parse(buffer);
      console.log(badge);
    } catch (e) {
      console.error('error parsing JSON', e, 'contents', buffer);
    }
  }
}