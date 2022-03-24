import GOComponent from '../core/go-component.js';

const tmpl = `
<style>
    :host {
        width: 100%;
    }
</style>
<h3><slot></slot></h3>
`;

class Heading3 extends GOComponent {
    mode = 'closed';
    cmpName = 'heading3';

    template = tmpl;
}

window.customElements.define('go-heading3', Heading3);