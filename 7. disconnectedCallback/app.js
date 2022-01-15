/** CICLO DE VIDA
 * 
 * 1. Constructor
 * 2. connectedCallback -> DOM
 * 3. disconnectedCallback -> Take out events - etc.
 *      a. Define the component
 *      b. Remove the component -> DOM
 * 
*/

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        //Aqui estamos establecieno en memoria las cosas que vamos a utilizar 
        //Para nuestro componente
        console.log("Hello form the constructor - Memory");
        //Pero esto no quiere decir que ya exista en el dom
    }

    //Para que exista en el dom llamaremos a nuestro siguiente ciclo de via
    connectedCallback() {
        //Nuestro elemento ya existe como nodo en el dom entonces ya podemos generar la iteracion
        console.log("Hello form the DOM");
    }
    disconnectedCallback() {
        //Tercer ciclo de vida esto quiere decir que estamos retirando el elemento del dom
        console.log("Out of the DOM")
    }
}

//Definimos nuestro componente para utilizarlo como etiqueta
customElements.define("my-custom-element", MyCustomElement);

//Retiramos el elemento del dom seleccionandolo con un query selector
  //Y removiendolo con la funcion remove que sirve para eliminar nodos.
document.querySelector("my-custom-element").remove();