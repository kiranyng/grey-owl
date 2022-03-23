import GOComponent from '../core/go-component.js';

const tmpl = `<style>
    h2 {
        color: blue;
    }
</style>
<h1>{{h1}}</h1>
<greyowl-heading2 context='h2'></greyowl-heading2>
<greyowl-heading2 context='h2'></greyowl-heading2>`;

class Header extends GOComponent {
    mode = 'closed';
    template = tmpl;
    cmpName = 'header';

    afterRender() {
        Logger.dev('afterRender context:', this.dataContext);
    }
}

window.customElements.define('greyowl-header', Header);