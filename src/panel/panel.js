import GOComponent from '../core/go-component.js';

const tmpl = `<style>
    div#panel {
        display: flex;
        
        padding:5px;
        
        min-height: 50px;
    }
</style>
<div id="panel"><slot></slot></div>
`;

class Panel extends GOComponent {
    template = tmpl;
    cmpName = 'panel';

    afterRender() {
        Logger.dev(`afterRender(${this.cmpName})`);
    }
}

window.customElements.define('go-panel', Panel);