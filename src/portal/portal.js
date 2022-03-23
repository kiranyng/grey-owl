import GOComponent from '../core/go-component.js';

const template = `
<style>
    p {
        color: gray;
    }
</style>
<p >I am portal component - mode:{{id}}</p>
<greyowl-header context='headings'></grayowl-header>
`;

class Portal extends GOComponent {
    mode = 'closed';
    cmpName = 'portal';

    dataContext = {
        id: '2013041',
        headings: {
            h1: 'Kiran',
            h2: 'YNG'
        }
    };

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