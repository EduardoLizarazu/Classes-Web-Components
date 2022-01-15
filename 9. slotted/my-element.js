class myElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML =/*html */ `
            <section>
                <h1>
                    <slot name="title"></slot>
                    </h1>
                <p>    
                    <slot name="paragraph"></slot>
                </p>
                <slot name="paragraph"></slot>
            </section>
            ${this.getStyle()}
        `;
        return template;
    }

    getStyle() {
        return /*html */`
        <style>
            ::slotted(span) {
                font-size: 30px;
                color:red;
            }
            ::slotted(.text) {
                color: blue;
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}
customElements.define("my-element", myElement);