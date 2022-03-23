import GOComponent from '../core/go-component.js';

const template = `
<style>
    p {
        color: gray;
    }
</style>
<p>I am portal component - mode:{{id}}</p>
<button id="alertBtn">update</button>
<greyowl-header context='headings'></grayowl-header>`;

class Portal extends GOComponent {
    mode = 'closed';
    cmpName = 'portal';
    _compRef = this;

    dataContext = {
        id: '2013041',
        headings: {
            h1: 'KiranYNG',
            h2: {
                one: 'Kiran',
                two: 'YNG'
            }
        }
    };

    constructor() {
        super();

        this.template = template;

        Store.update(this.dataContext);
        // below callback binding/scoping is important to pocess the right `this` reference
        Store.setCallback( this.onDataChange.bind(this) );
    }

    afterRender() {
        // attach event listeners
        this._sRoot.querySelector('#alertBtn').addEventListener('click', (ev) => {
            Logger.dev('clicked button!', ev);
/*
            this.dataContext.id = '12345';
            this.dataContext.headings.h2.one = 'KiranKumarYNG';
*/
            const newData = Store.getDataClone();
            newData.id = '98765';
            Store.update(newData);
        });
    }

    shouldUpdate(oldData, newData) {
        if(oldData.id === newData.id){
            return false;
        }

        return true;
    }
}

window.customElements.define('greyowl-portal', Portal);