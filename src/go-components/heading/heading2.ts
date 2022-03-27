import GOComponent from './../core/go-component';
import Logger from './../utils/debug-log';
import Store from './../utils/store';

interface DataContext {
    one: string
}

const tmpl = `
<style>
    h2 {
        color: blue;
    }
</style>
<h2>{{one}}</h2>
`;

class Heading2 extends GOComponent {
    mode: ShadowRootMode = 'closed';
    cmpName = 'heading';

    template = tmpl;

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);

        this._sRoot.querySelector('h2')?.addEventListener('click', () => {
            const newData = Store.getDataClone();
            newData.headings.h2.one = 'TEST';
            Store.update(newData);
        });
    }

    shouldUpdate(oldData: DataContext, newData: DataContext){
        if(oldData.one === newData.one){
            return false;
        }

        return true;
    }
}

window.customElements.define('go-heading2', Heading2);