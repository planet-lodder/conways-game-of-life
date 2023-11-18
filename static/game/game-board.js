class MyCircle extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .game-board {
                    width: 100px;
                    height: 100px;
                    background-color: red;
                    border-radius: 50%;
                }
            </style>
            <div class="flex flex-col min-h-full justify-start">
                <div class="flex flex-col flex-1 justify-center">
                    <div class="game-board"></div>
                </div> 
            </div> 
        `;
    }


}
customElements.define('game-board', MyCircle);