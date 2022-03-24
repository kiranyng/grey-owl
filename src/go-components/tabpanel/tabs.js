import GOComponent from '../core/go-component.js';

const tmpl = `<style>
    ul {
        display: flex;
        padding: 0;
        margin: 0;

        list-style-type: none;

        background: #f1f1f1;
        color: black;
    }
    ul > li{
        display: inline;
        text-align: left;

        padding: 5px;
        min-width: 36px;

        background-color: lightgray;
        border-right: 1px solid gray;
    }
    ul > li:hover{
        background-color: #d4e5eb;
    }
    ul > li.active{
        background-color: white;
        font-weight: bold;
    }
</style>
<ul>
    {{#each items}}
        <li key='{{this.key}}' {{#iff @root.active '==' this.key}} class="active" {{/iff}}>
            {{this.title}}
        </li>
    {{/each}}
</ul>
`;

class TabpanelTabs extends GOComponent {
    cmpName = 'tabpanel-tabs';

    template = tmpl;

    afterRender(){
        this._sRoot.querySelector('ul').addEventListener('click', (ev) => {
            Logger.dev('ul click event', ev.target.tagName);

            if(ev.target.tagName.toLowerCase() === 'li') {
                const itemKey = ev.target.getAttribute('key');
                const item = this.dataContext.items[itemKey];

                this.triggerEvent('tabchange', item);
            }
        });
    }

    shouldUpdate(oldData, newData) {
        // @todo @fix items array comparision should be deep
        if((oldData.items !== newData.items) || (oldData.active !== newData.active)){
            return true;
        }

        return false;
    }
}

window.customElements.define('go-tabpanel-tabs', TabpanelTabs);