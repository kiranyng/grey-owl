import GOComponent from './../core/go-component';
import Logger from './../utils/debug-log';
import Store from './../utils/store';
import { HeaderDataContext } from './header';

interface PortalDataContext {
    id: string,
    headings: HeaderDataContext
}

const tmpl = `
<style>
    p {
        color: gray;
    }
</style>
<p>I am portal component - mode:{{id}}</p>
<button id="alertBtn">update</button>
<go-header context='headings'></go-header>`;

class Portal extends GOComponent {
    mode: ShadowRootMode = 'closed';
    cmpName = 'portal';

    template = tmpl;

    dataContext: PortalDataContext = {
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

        Store.update(this.dataContext);
        // below callback binding/scoping is important to pocess the right `this` reference
        Store.setCallback( this.onDataChange.bind(this) );
    }

    afterRender() {
        // attach event listeners
        this._sRoot.querySelector('#alertBtn')?.addEventListener('click', (ev) => {
            Logger.dev('clicked button!', ev);
            
            const newData = Store.getDataClone();
            newData.id = '98765';
            Store.update(newData);
        });
    }

    shouldUpdate(oldData: PortalDataContext, newData: PortalDataContext) {
        if(oldData.id !== newData.id){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-portal', Portal);