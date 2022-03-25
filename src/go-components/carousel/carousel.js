import GOComponent from '../core/go-component.js';

const tmpl = `<style>
   :host {
        width: 100%;    
        height: 100%;

        display: flex;
        flex-direction: row;

        margin: 5px;
        border: 1px solid gray;

        position: relative;

        overflow: hidden;
    }
    :host(.topToBottom) {
        flex-direction: column;
    }
    ::slotted(go-panel) {
        width: 100%;
        height: 100%;

        position: absolute; 
        transform: translateX(-100%);
    }
    ::slotted(go-panel.slide-in) {
        z-index: 2;
        animation: slide-in 1s forwards;
    }
    ::slotted(go-panel.slide-out) {
        animation: slide-out 1s forwards;
    }
</style>
<slot accept="go-panel"></slot>
`;

/* Moved to styles.scss: Slotted Animations inconsistancy (WC issue: https://github.com/WICG/webcomponents/issues/715)
@keyframes slide-in {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
}

@-webkit-keyframes slide-in {
    0% { -webkit-transform: translateX(-100%); }
    100% { -webkit-transform: translateX(0%); }
}
    
@keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
}

@-webkit-keyframes slide-out {
    0% { -webkit-transform: translateX(0%); }
    100% { -webkit-transform: translateX(-100%); }
} */

class Carousel extends GOComponent {
    cmpName = 'carousel';

    template = tmpl;

    direction = 'left-right'; // 'top-bottom'
    panels = [];
    activePanelIndex = 0;

    constructor() {
        super();
        Logger.dev('Carousel constructor!');
    }

    beforeRender(){
        const dir = this.getAttribute('direction');

        switch(dir){
            case 'top-bottom':
                this.direction = 'top-bottom';
                this.classList.add('topToBottom');
            break;
            case 'left-right': 
            default: 
                this.direction = 'left-right';
                this.classList.remove('topToBottom');
        }
    }

    afterRender(){
        this._sRoot.querySelector('slot').addEventListener('slotchange', (ev) => {
            const nodes = ev.target.assignedNodes();

            Logger.dev('>>> panels:', nodes);
            nodes.forEach((element) => {
                
                Logger.dev('>>> el tagname:', element.tagName);

                // @todo filter non-panel based components and hide them
                if(element.tagName && element.tagName.toLowerCase() === 'go-panel'){
                    this.panels.push(element);
                }
            });

            this.activePanelIndex = 0;
            this.panels?.[this.activePanelIndex].classList.add('slide-in');
        });

        // add timer for animations
        setInterval(() => {
            if(this.panels.length === 0){
                return;
            }

            this.panels?.[this.activePanelIndex].classList.remove('slide-in');
            this.panels?.[this.activePanelIndex].classList.add('slide-out');

            this.activePanelIndex += 1;
            if(this.activePanelIndex === this.panels.length){
                this.activePanelIndex = 0;
            }

            this.panels?.[this.activePanelIndex].classList.remove('slide-out');
            this.panels?.[this.activePanelIndex].classList.add('slide-in');
        }, 5000);
    }

    shouldUpdate(oldData, newData) {
        return false;
    }
}

window.customElements.define('go-carousel', Carousel);