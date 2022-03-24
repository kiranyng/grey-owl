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
        <li {{#if this.active}} class="active" {{/if}}>
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
            
        });
    }
}

window.customElements.define('go-tabpanel-tabs', TabpanelTabs);