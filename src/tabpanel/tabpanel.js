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
            items: [{ title: 'Tab 1', key: 'tab1' }, { title: 'Tab 2', key: 'tab2', active: true }, { title: 'Tab 3', key: 'tab3' }],
            active: 'tab2'
        },
        title: 'Context Title'
    }
}

window.customElements.define('go-tabpanel', TabPanel);