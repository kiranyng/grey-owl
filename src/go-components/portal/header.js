import GOComponent from '../core/go-component.js';

const tmpl = `<style>
    h2 {
        color: blue;
    }
</style>
<h1>{{h1}}</h1>
<go-heading2 context='h2'></go-heading2>
<go-heading2 context='h2'></go-heading2>`;

class Header extends GOComponent {
    mode = 'closed';
    template = tmpl;
    cmpName = 'header';

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);
    }

    shouldUpdate(oldData, newData) {
        if(oldData.h1 !== newData.h1){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-header', Header);