const missingTemplate = '<div>template unspecified!</div>';

export default class GreyOwl extends HTMLElement {
    _sRoot = null; // @fix find a way to make this object unavailable to externals scripts
    cmpName = this.tagName;
    template = missingTemplate;

    connectedCallback() {
        Logger.log('connected component:', this.cmpName);

        // setup shadow root
        this._sRoot = this.attachShadow({mode: this.mode});

        // renderer processing should happen after the parent component is processed during update phase, so queuing it
        queueMicrotask(() => {
            // rendering
            this._render();
        });
    }

    _render() {
        Logger.log('_render cmp:', this.cmpName);
        Logger.dev('cmp-ctx:', this.dataContext);

        this.beforeRender();

        const template = Handlebars.compile(this.template);
        this._sRoot.innerHTML = template(this.dataContext ? this.dataContext : {});

        // assign contexts
        const contextedEls = this._sRoot.querySelectorAll('[context]');
        Logger.dev('Found context elements:',contextedEls);

        if(contextedEls && this.dataContext){
            contextedEls.forEach((el) => {
                // @feature support alternate context object, below statement supports only current dataContext obj property ref as context
                // @feature support nested contexts, below statement supports only immediate property ref as context
                el.dataContext = this.dataContext[el.getAttribute('context')];

                Logger.dev(`setting context(@${this.cmpName}->{${el.tagName}}):`, el.dataContext);
            });
        }
        
        this.afterRender(this._sRoot);
    }

    shouldUpdate(oldData, newData) {
        // placeholder. should be overridden by child classes to trigger rerender when there is a change

        // @todo do priliminary comparision of all the references in the template
        // @todo make shouldUpdate as optional override just for additional optimization

        return true;
    }

    onDataChange(oldData, newData) {
        Logger.dev(`onDataChange(${this.cmpName}):`,oldData, newData);

        if( oldData !== newData && this.shouldUpdate(oldData, newData) ) {
            // update the component
            this._update(newData);
        } else {
            // process child contextual-components
            const contextedEls = this._sRoot.querySelectorAll('[context]');
            
            if(contextedEls && this.dataContext){
                contextedEls.forEach((el) => {
                    el.onDataChange( oldData[el.getAttribute('context')], newData[el.getAttribute('context')] );

                    Logger.dev(`invoked onDataChange(@${this.cmpName}->{${el.tagName}})`);
                });
            }
        }
    }

    /**
     * `_update` should be private and should not be accessible by the inherited components. No need of 2-way data binding.
     * Data flow should be uni-directional, top to bottom.
     */
    _update(newData) {
        // @note NEVER invoke _update from afterRender callback

        Logger.dev(`rerendering component ${this.cmpName}`);

        // set dataContext with newData
        this.dataContext = newData;

        // @optimize add logic to do some dom diff or prop diff or anything and rerender only required elements/components

        this._render();
    }

    beforeRender() {
        // placeholder. can be overridden by child classes
    }

    afterRender() {
        // placeholder. can be overridden by child classes
    }

    addListeners(){
        // placeholder. can be overridden by child classes
    }

    disconnectedCallback(){
        // placeholder. can be overridden by child classes
    }
}