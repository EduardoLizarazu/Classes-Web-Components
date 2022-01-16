'use strict';

class OneDialog extends HTMLElement {
    
    constructor() {
        super();
        this.close = this.close.bind(this);
        this._watchEscape = this._watchEscape.bind(this);
    }
    
    static get observedAttributes() {
      return ['open'];
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue !== newValue) {
        this[attrName] = this.hasAttribute(attrName);
      }
    }
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = /*html */`
            <div class="wrapper">
            <div class="overlay"></div>
              <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
                <button class="close" aria-label="Close">✖️</button>
                <h1 id="title">Hello world</h1>
                <div id="content" class="content">
                  <p>This is content in the body of our modal</p>
                </div>
              </div>
            </div>
            ${this.getStyle()}
        `;
        return template;
    }
    getStyle() {
        return `
        <style>
        .wrapper {
          opacity: 0;
          transition: visibility 0s, opacity 0.25s ease-in;
        }
        .wrapper:not(.open) {
          visibility: hidden;
        }
        .wrapper.open {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 100vh;
          position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          opacity: 1;
          visibility: visible;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.8);
          height: 100%;
          position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          width: 100%;
        }
        .dialog {
          background: #ffffff;
          max-width: 600px;
          padding: 1rem;
          position: fixed;
        }
        button {
          all: unset;
          cursor: pointer;
          font-size: 1.25rem;
          position: absolute;
            top: 1rem;
            right: 1rem;
        }
        button:focus {
          border: 2px solid blue;
        }
          </style>
        `;
    }
    connectedCallback() {
        this.appendChild(this.getTemplate().content.cloneNode(true));
        
        this.querySelector('button').addEventListener('click', this.close);
        this.querySelector('.overlay').addEventListener('click', this.close);
        this.open = this.open;
    }

    disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', this.close);
        this.querySelector('.overlay').removeEventListener('click', this.close);
    }


    get open() {
      return this.hasAttribute('open');
    }
  
  
    set open(isOpen) {
        this.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
          this._wasFocused = document.activeElement;
          this.setAttribute('open', '');
          document.addEventListener('keydown', this._watchEscape);
          this.focus();
          this.querySelector('button').focus();
        } else {
          this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
          this.removeAttribute('open');
          document.removeEventListener('keydown', this._watchEscape);
          this.close();
        }
    }
  
  
    close() {
      if (this.open !== false) {
        this.open = false;
      }
      const closeEvent = new CustomEvent('dialog-closed');
      this.dispatchEvent(closeEvent);
    }
  
    _watchEscape(event) {
      if (event.key === 'Escape') {
          this.close();   
      }
    }
}

customElements.define('one-dialog', OneDialog);

const button = document.getElementById('launch-dialog');
button.addEventListener('click', () => {
  document.querySelector('one-dialog').open = true;
})