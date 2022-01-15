/**
 * 
 * 1. Generamos nuestra clase, extends HTMLElement
 * 2. En el constructor, inicializamos lo que se va a guardar en memoria
 *      3. Si tenemos algun elemento HTML que con el queremos construir
 * 4. Inicializamos como nodos en el metodo connectedCallback()
 * 
*/

const template = document.createElement("div");
template.innerHTML = /*HTML*/`
    <style>
        .text {
            color: red;
        }
        p {
            color: blue;
        }
    </style>
    <p class="text">Hello World! 2</p>
    <p>texto ejemplo para la clase</p>
`;

class myElement extends HTMLElement {
    // En el constructor estamos creando todo lo que se vaya a guardar en memoria, Para que despues podamos agregarlos como nodos al DOM
    constructor() {
        // Estamos heredando de una clase por lo que necesitamos el super
        super();

        // Renderizar text
        this.p = document.createElement("p");
    }
    // esto es lo que va a buscar la clase para entender que esto se tiene que agregar al DOM - SIN TYPOS
    connectedCallback() {
        this.p.textContent = "Hola Mundo!";
        this.appendChild(this.p);
        this.append(template);
    }
}
// Necesitmos que la clase se convieta en una etiqueta y para eso
/**
 * Param 1: EL nombre de la etiqueta
 * Param 2: De la clase a la cual se va a generar
*/
customElements.define("my-element", myElement);