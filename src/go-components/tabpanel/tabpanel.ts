import GOComponent from './../core/go-component';
import Logger from './../utils/debug-log';
import { TabItemContext, TabPosition, TabsContext } from './tabs';


interface TabPanelContext {
    tabs: TabsContext
}

const tmpl = `<style>
   :host {
        width: 100%;

        display: flex;
        flex-direction: column;

        margin: 5px;
        border: 1px solid gray;
    }
    :host(.leftTabs) {
        flex-direction: row;
    }
</style>
<go-tabpanel-tabs context="tabs"></go-tabpanel-tabs>
<slot accept="go-panel"></slot>
`;

class TabPanel extends GOComponent {
    cmpName = 'tabpanel';

    template = tmpl;

    tabPosition: TabPosition = 'top';
    panels: Record<string, HTMLElement> = {};

    /*
    dataContext = {
        tabs: {
            // items: [{ title: 'Tab 1', key: 'tab1' }, { title: 'Tab 2', key: 'tab2' }, { title: 'Tab 3', key: 'tab3' }],
            items: {
                'tab1': {
                    title: 'Tab 1',
                    key: 'tab1'
                },
                'tab2': {
                    title: 'Tab 2',
                    key: 'tab2'
                },
                'tab3': {
                    title: 'Tab 3',
                    key: 'tab3'
                }
            },
            active: 'tab2'
        },
        title: 'Click a tab',
        panels:{
            items:{
                'tab1': {
                    title: 'I am Tab 1',
                    description: 'Tab 1 description here..'
                },'tab2': {
                    title: 'I am Tab 2',
                    description: 'Tab 2 description here..'
                },'tab3': {
                    title: 'I am Tab 3',
                    description: 'Tab 3 description here..'
                },
            }
        }
    }
*/
    constructor() {
        super();
        Logger.dev('TabPanel constructor!');

        // below callback binding/scoping is important to execute on the component context instead of Store context
        // Store.setCallback( this.onDataChange.bind(this) );
    }

    beforeRender(){
        const attrTabPos = this.getAttribute('tab-position');

        switch(attrTabPos){
            case 'left': 
                this.tabPosition = 'left';

                this.classList.add('leftTabs');
            break;
            case 'top':
            default: 
                this.classList.remove('leftTabs');
                this.tabPosition = 'top';
        }
    }

    afterRender(){
        this._sRoot.querySelector('slot')?.addEventListener('slotchange', (ev) => {
            Logger.dev('slot change event!',ev.target);

            const newData: TabPanelContext = {
                tabs: {
                    tabPosition: this.tabPosition,
                    items: {},
                    active: 'false'
                }
            };

            const nodes = (ev.target as HTMLSlotElement).assignedNodes();
            Logger.dev('assigned nodes:', nodes);

            let isFirst = true;
            nodes.forEach((element, index) => {
                Logger.dev('el',element);

                // @todo filter non-panel based components and hide them
                if((element as HTMLElement).tagName && (element as HTMLElement).tagName.toLowerCase() === 'go-panel'){
                    const el =  (element as HTMLElement);

                    const key = el.getAttribute('key')!;
                    const label = el.getAttribute('label')!;
                    const active = el.getAttribute('active')!;

                    this.panels[key] = el;

                    newData.tabs.items[key] = {
                        key,
                        label
                    }

                    if(active === 'true' || isFirst){
                        isFirst = false;

                        newData.tabs.active = key;

                        el.setAttribute('hide', 'false');
                    } else {
                        el.setAttribute('hide', 'true');
                    }
                }
            });

            this.onDataChange(this.dataContext, newData);
        });

        this._sRoot.querySelector('go-tabpanel-tabs')?.addEventListener('tabchange', (ev) => {
            Logger.dev('tabchange event listened!', ev);

            const item: TabItemContext = (<any>ev).detail;

            // update attrubute changes
            Object.values(this.panels).map(panel => {
                Logger.dev('panel iter:', panel);

                item.key == panel.getAttribute('key') ?
                    panel.setAttribute('hide', 'false'):
                    panel.setAttribute('hide', 'true');
            });

            // notify data changes
            const newState = JSON.parse(JSON.stringify(this.dataContext));
            newState.tabs.active = item.key;
            
            this.onDataChange(this.dataContext, newState);
            Logger.dev('final dataContext:', newState);
        });
    }

    shouldUpdate(oldData: TabPanelContext, newData: TabPanelContext) {
        return false;
    }
}

window.customElements.define('go-tabpanel', TabPanel);