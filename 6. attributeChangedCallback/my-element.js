class myElement extends HTMLElement {
    // En el constructor estamos creando todo lo que se vaya a guardar en memoria, Para que despues podamos agregarlos como nodos al DOM
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    /** Utilizamos el ciclo de vida
     *  
     * Para hacerlo necesitamos poner un observer, donde le vamos a decir los atributos
     * Los attribute que no se encuentren en la lista, no los tomara en cuenta
     * 
     * Aqui le estamos diciendo al observer que solo van a haber esos 3 attr
    */
    static get observedAttributes() {
        return ["title", "paragraph", "img"];
    }

    /** attributeChangedCallback
     * Param 1 (currentVal): Valor actual, el valor que existe
     * Param 2 (oldVal):  Valor viejo, es el valor que estaba
     * Param 3 (newVal): Valor nuevo, en caso de que exita uno nuevo
     */
     attributeChangedCallback(currentVal, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (currentVal === "title") this.title = newVal;
            if (currentVal === "paragraph") this.paragraph = newVal;
            if (currentVal === "img") this.img = newVal;
        }
    }

    // Genero directamente el tag template
    getTemplate() {
        // SLOT es el placeholder
        const template = document.createElement("template");
        template.innerHTML =/*html */ `
            <section>
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