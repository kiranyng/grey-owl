import { Spy } from '../utils/decorators';
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
<slot></slot>`;
// @todo add an optional TitleBar cmp here - with collapsible funtionality maintained by panel, listening to click event

export type PanelVarient = 'normal' | 'titlebar' | 'minimized';

class Panel extends GOComponent {
    template = tmpl;
    cmpName = 'panel';

    @Spy
    varient = 'normal';

    afterRender() {
        if(this.getAttribute('varient') === 'hidden'){
            this.classList.add("hidden");
        } else {
            this.classList.remove("hidden");
        }

        Logger.dev(`afterRender(${this.cmpName})`);

        // auto update attribues on property update. @refactor
        this.onSpyUpdate((key: string, oldValue: string, newValue: string) => {
            Logger.dev('Observable decorator invoked!');

            switch(key){
                case 'varient':
                    this.setAttribute(key, newValue);
                    break;
            }
        });
    }

    static get observedAttributes() {
        return ['varient'];
    }
      
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'varient':
                if(newValue == 'hidden'){
                    this.classList.add("hidden");
                } else {
                    this.classList.remove("hidden");
                }
            break;
        }
    }
}

window.customElements.define('go-panel', Panel);