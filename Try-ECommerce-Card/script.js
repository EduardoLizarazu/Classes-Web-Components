class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:"open" })
    }
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = /*html */`
            <article class="container-card">

                <div class="header-card">
                    <h3>
                        <slot name="title-header"></slot>
                    </h3>
                    <div class="img-card--container">
                        <img src="./nike-blue.png" alt="nike">
                    </div>
                </div>

                <div class="main-card">
                    <h4>
                        <slot name="title-main"></slot>
                        <span>
                            <slot name="title-main--special"></slot>
                        </span>
                    </h4>
                    <div class="content-card">
                        <p>
                            <slot name="main-content"></slot>
                        </p>
                    </div>
                </div>
                <div class="footer-card">
                    <p>
                        <slot name="price"></slot>
                    </p>
                    <div class="button-container">
                        <button>
                            <slot name="buy-button"></slot>
                        </button>
                    </div>
                </div>
            </article>
            ${this.getStyle()}
        `;
        return template;
    }
    getStyle() {
        return /*html */`
        <style>
            :host {
                margin: 0;
                padding: 0;
                display: inline-block;
                width: 100%;
                height: 100%;
                --primary-color: #333;
                --second-color-bg: #47559f;
                --special-color-letter:#c1bec1;
            }
            .container-card {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .header-card { 
                position: relative;
                width: 100%;
                height: 250px;

                display: flex;
                flex-direction: column;
                align-items: center;

                background-color: var(--second-color-bg);
            }
            .header-card h3 {
                align-self: start;

                margin: 0;
                /* margin: 30px 0 0 30px; */
                font-size: 7rem;
                color: var(--primary-color);
                opacity: .3;
            }
            .img-card--container {
                position: absolute;
                top: 100px;
                
                width: 300px;
                height: 300px;
            }
            .img-card--container img {
                width: 100%;
            }

            /* MAIN CARD */

            .main-card {
                margin-top: 15px;
            }
            .main-card h4 {
                margin: 0;
                
                font-size: 2rem;
            }
            .main-card h4 span {
                font-size: 1rem;
                text-transform: uppercase;
            }
            .content-card {
                font-size: 1rem;
            }

            /* FOOTER CARD */
            .footer-card {
                margin: 10px 20px 0 20px;
                display:flex;
                justify-content: space-between;
                align-items: center;
            }
            .footer-card p {
                margin: 0;
                font-size: 2rem;
            }
            .button-container {

            }
            .button-container button {}
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

customElements.define("my-card", MyCard);