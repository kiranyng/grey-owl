import GOComponent from '../core/go-component.js';

const tmpl = `
<style>
    h2 {
        color: blue;
    }
</style>
<h2>{{one}}</h2>
`;

class Heading2 extends GOComponent {
    mode = 'closed';
    cmpName = 'heading';

    template = tmpl;

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);
        Logger.dev('getAttribute:', this.getAttribute('can-you'));

        this._sRoot.querySelector('h2').addEventListener('click', () => {
            const newData = Store.getDataClone();
            // newData.id = 'ABCD';
            newData.headings.h2.one = 'TEST';
            Store.update(newData);
        });
    }

    shouldUpdate(oldData, newData){
        if(oldData.one === newData.one){
            return false;
        }

        return true;
    }
}

window.customElements.define('go-heading2', Heading2);