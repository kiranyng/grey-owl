import GOComponent from '../core/go-component.js';

const tmpl = `<style>
    h2 {
        color: blue;
    }
</style>
<h2>{{h2}}</h2>`;

class Header extends GOComponent {
    mode = 'closed';
    template = tmpl;

    afterRender() {
        console.log('afterRender context:', this.dataContext);
    }
}

window.customElements.define('greyowl-header', Header);