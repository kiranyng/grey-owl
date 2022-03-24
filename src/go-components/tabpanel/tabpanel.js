import GOComponent from '../core/go-component.js';

const tmpl = `<style>
   div#container {
        margin: 5px;
        border: 1px solid gray;
    }
</style>
<div id="container">
    <go-tabpanel-tabs context="tabs"></go-tabpanel-tabs>
    <go-panel>
        <go-heading3>{{title}}</go-heading3>
    </go-panel>
</div>`;

class TabPanel extends GOComponent {
    cmpName = 'tabpanel';

    template = tmpl;
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

    constructor() {
        super();
        Logger.dev('TabPanel constructor!');

        Store.update(this.dataContext);
        // below callback binding/scoping is important to pocess the right `this` reference
        Store.setCallback( this.onDataChange.bind(this) );
    }

    afterRender(){
        this._sRoot.querySelector('go-tabpanel-tabs').addEventListener('tabchange', (ev) => {
            Logger.dev('tabchange event listened!', ev);

            const item = ev.detail;

            const newState = Store.getDataClone();
            newState.title = item.title;
            newState.tabs.active = item.key;
            Store.update(newState);
        });
    }

    shouldUpdate(oldData, newData) {
        if(oldData.title !== newData.title){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-tabpanel', TabPanel);