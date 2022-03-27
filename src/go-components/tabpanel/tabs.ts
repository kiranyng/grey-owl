import GOComponent from './../core/go-component';

export interface TabItemContext {
    key: string,
    label: string
}

export type TabPosition = 'top' | 'left';

export interface TabsContext {
    tabPosition: TabPosition,
    items: Record<string, TabItemContext>,
    active?: 'true' | 'false'
}

const tmpl = `<style>
    :host {
        display: flex;
        flex-direction: row;

        min-width: 10em;
        padding: 0;
        margin: 0;

        list-style-type: none;

        background: #f1f1f1;
        color: black;
    }

    :host(.leftTabs) {
        flex-direction: column;
    }

    :host > span {
        display: inline;
        text-align: left;

        padding: 5px;
        min-width: 36px;

        background-color: lightgray;
        border-right: 1px solid gray;
    }
    :host(.leftTabs) > span {
        border-right: 0;
        border-bottom: 1px solid gray;
    }
    :host > span:hover{
        background-color: #d4e5eb;
    }
    :host > span.active{
        background-color: #f3f3f3;
        font-weight: bold;
    }
</style>
{{#each items}}
    <span key='{{this.key}}' {{#iff @root.active '==' this.key}} class="active" {{/iff}}>
        {{this.label}}
    </span>
{{/each}}
`;

class TabpanelTabs extends GOComponent {
    cmpName = 'tabpanel-tabs';

    template = tmpl;
    tabPosition: TabPosition = 'top';
    dataContext!: TabsContext;

    afterRender(){
        const attrTabPos: TabPosition = this.dataContext.tabPosition;

        if(attrTabPos){
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

            this.setAttribute('tab-position', attrTabPos);
        }

        const tabs: NodeListOf<HTMLSpanElement> = this._sRoot.querySelectorAll('span');
        Array.from(tabs).forEach(tab => {
            tab.addEventListener('click', (ev) => {
                const itemKey = (ev.target as HTMLElement).getAttribute('key');
                const item = this.dataContext.items[itemKey!];

                this.triggerEvent('tabchange', item);
            });
        });
    }

    shouldUpdate(oldData: TabsContext, newData: TabsContext) {
        // @todo @fix items array comparision should be deep
        if( !oldData || (oldData.items !== newData.items) || (oldData.active !== newData.active)){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-tabpanel-tabs', TabpanelTabs);