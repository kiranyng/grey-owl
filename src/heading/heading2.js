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
    cmpName = 'header';

    template = tmpl;

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);
        Logger.dev('getAttribute:', this.getAttribute('can-you'));

        this._sRoot.querySelector('h2').addEventListener('click', () => {
            const newData = Store.getDataClone();
            //newData.id = 'ABCD';
            newData.headings.h2.one = 'Kiran';
            Store.update(newData);
        });
    }

    shouldUpdate(oldData, newData){
        if(oldData.headings.h2.one === newData.headings.h2.one){
            return false;
        }

        return true;
    }
}

window.customElements.define('greyowl-heading2', Heading2);