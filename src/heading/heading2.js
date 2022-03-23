import GOComponent from '../core/go-component.js';

const tmpl = `
<style>
    h2 {
        color: blue;
    }
</style>
<h2>{{name}}</h2>
`;

class Header extends GOComponent {
    mode = 'closed';
    cmpName = 'header';

    template = tmpl;

    afterRender() {
        console.log('afterRender context:', this.objContext);
        
        console.log('getAttribute:', this.getAttribute('can-you'));
    }
}

window.customElements.define('greyowl-header', Header);