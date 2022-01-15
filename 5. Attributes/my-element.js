class myElement extends HTMLElement {
    // En el constructor estamos creando todo lo que se vaya a guardar en memoria, Para que despues podamos agregarlos como nodos al DOM
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Ponemos los atributos en el contructor
        this.title = this.getAttribute("title");
        this.paragraph = this.getAttribute("paragraph");
        this.img = this.getAttribute("img");
    }
    // Genero directamente el tag template
    getTemplate() {
        // SLOT es el placeholder
        const template = document.createElement("template");
        template.innerHTML =/*html */ `
            <section>
                <!-- Inyectamos los atributos -->
                <h2>${this.title}</h2>
                <div>
                    <p>${this.paragraph}</p>
                    <img src=${this.img}/>
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