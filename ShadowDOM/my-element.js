class myElement extends HTMLElement {
    // En el constructor estamos creando todo lo que se vaya a guardar en memoria, Para que despues podamos agregarlos como nodos al DOM
    constructor() {
        super();
        this.attachShadow({ mode: "open" }) 
    }
    // Genero directamente el tag template
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML =/*html */ `
            <section>
                <h2 class="title">Template Generate</h2>
                <div>
                    <p>I am a paragraph of a create template in javascript</p>
                </div>
            </section>
            ${this.getStyle()}
        `;
        return template;
    }
    // split code style
    getStyle() {
        return /*HTML*/`
            <style>
                h2 {
                    color: red;
                }
            </style>
        `;
    }

    // CLONAR, lo dividimos en render por buenas practicas de splitting code
    // false => Solo clona solo la primera etiqueta
    // true => clona las etiqutas anidadadas

    // Tenemos que decirle que se entre al showdowRoot
    // Si queremos obtener un nodo, ya tenemos que agregar
    // shadowRoot.querySelector();
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    // agregar al DOM
    connectedCallback() {
        this.render();
    }
}
customElements.define("my-element", myElement);