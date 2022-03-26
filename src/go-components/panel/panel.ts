import GOComponent from './../core/go-component';
import Logger from './../utils/debug-log';

const tmpl = `<style>
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        
        padding:5px;
        
        min-height: 50px;
    }

    :host(.hidden) {
        display: none;
    }
</style>
<slot></slot>
`;

class Panel extends GOComponent {
    template = tmpl;
    cmpName = 'panel';

    afterRender() {
        if(this.getAttribute('hide')){
            this.classList.add("hidden");
        } else {
            this.classList.remove("hidden");
        }

        Logger.dev(`afterRender(${this.cmpName})`);
    }

    static get observedAttributes() {
        return ['hide'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'hide':
                if(newValue == 'true'){
                    this.classList.add("hidden");
                } else {
                    this.classList.remove("hidden");
                }
            break;
        }
    }
}

window.customElements.define('go-panel', Panel);