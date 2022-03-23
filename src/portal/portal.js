import GOComponent from '../core/go-component.js';

const template = `
<style>
    p {
        color: gray;
    }
</style>
<p>I am portal component - mode:{{mode}}</p>
`;

class Portal extends GOComponent {
    mode = 'closed';

    constructor() {
        super();

        this.template = template;
    }

    addListeners(shadowRoot) {
        // attach event listeners
        addEventListener('click', (ev) => {
            if(ev.target == shadowRoot.querySelector('p')[0]){
                console.log('Hurray! you clicked the right one!', ev.target);
            }
            console.log('clicked portal!', ev.target, shadowRoot.querySelector('p'));
        });
    }
}

window.customElements.define('greyowl-portal', Portal);