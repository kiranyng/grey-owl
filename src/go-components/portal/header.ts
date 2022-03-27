import GOComponent, { DataContext } from './../core/go-component';
import Logger from './../utils/debug-log';

export interface HeaderDataContext extends DataContext{
    h1: string,
    h2: { // temp @remove
        one: string,
        two: string
    }
}

const tmpl = `<style>
    h2 {
        color: blue;
    }
</style>
<h1>{{h1}}</h1>
<go-heading2 context='h2'></go-heading2>
<go-heading2 context='h2'></go-heading2>`;

class Header extends GOComponent {
    mode: ShadowRootMode = 'closed';
    template = tmpl;
    cmpName = 'header';

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);
    }

    shouldUpdate(oldData: HeaderDataContext, newData: HeaderDataContext) {
        if(oldData.h1 !== newData.h1){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-header', Header);