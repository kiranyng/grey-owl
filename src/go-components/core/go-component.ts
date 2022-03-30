// import Handlebars from "handlebars";
import Logger from "./../utils/debug-log";
const Handlebars = require('handlebars');

export interface DataContext {
    [key: string]: any
};

const missingTemplate = '<div>template unspecified!</div>';


export default class GreyOwl extends HTMLElement {
    mode: ShadowRootMode = "closed";
    _sRoot!: ShadowRoot; // @fix find a way to make this object unavailable to externals scripts
    
    cmpName = this.tagName;
    template = missingTemplate;
    dataContext: DataContext;

    constructor() {
        super();

        this.dataContext = {};
    }

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

        const template = Handlebars.compile(this.template); // @todo use precompled templates instead
        this._sRoot.innerHTML = template(this.dataContext ? this.dataContext : {});

        // assign contexts
        const contextedEls = this._sRoot.querySelectorAll('[context]');
        Logger.dev('Found context elements:',contextedEls);

        if(contextedEls && this.dataContext){
            contextedEls.forEach((el) => {
                // @feature support alternate context object, below statement supports only current dataContext obj property ref as context
                // @feature support nested contexts, below statement supports only immediate property ref as context
                (el as GreyOwl).dataContext = (this.dataContext[el.getAttribute('context')!] as DataContext);

                Logger.dev(`setting context(@${this.cmpName}->{${el.tagName}}):`, (el as GreyOwl).dataContext);
            });
        }
        
        this.afterRender();
    }

    shouldUpdate(oldData: DataContext, newData: DataContext) {
        // placeholder. should be overridden by child classes to trigger rerender when there is a change

        // @todo do priliminary comparision of all the references in the template
        // @todo make shouldUpdate as optional override just for additional optimization

        return false;
    }

    onDataChange(oldData: DataContext, newData: DataContext) {
        Logger.dev(`onDataChange(${this.cmpName}):`,oldData, newData);

        this.dataContext = newData;

        if( oldData !== newData && this.shouldUpdate(oldData, newData) ) {
            Logger.dev('do update!', this.cmpName, 'newData:', newData);
            // update the component
            this._update(newData);
        } else {
            // process child contextual-components
            const contextedEls = this._sRoot.querySelectorAll('[context]');
            
            if(contextedEls && this.dataContext){
                contextedEls.forEach((el) => {
                    (el as GreyOwl).onDataChange( oldData[el.getAttribute('context')!], newData[el.getAttribute('context')!] );

                    Logger.dev(`invoked onDataChange(@${this.cmpName}->{${el.tagName}})`);
                });
            }
        }
    }

    /**
     * `_update` should be private and should not be accessible by the inherited components. No need of 2-way data binding.
     * Data flow should be uni-directional, top to bottom.
     */
    _update(newData: DataContext) {
        // @note NEVER invoke _update from afterRender callback

        Logger.dev(`rerendering component ${this.cmpName} with new contextData:`, newData);

        // set dataContext with newData
        this.dataContext = newData;

        // @optimize add logic to do some dom diff or prop diff etc., and rerender only required elements/components

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

    // @workaround for typescript to allow accessing this dynamicly injected method via decorator
    onSpyUpdate( fn: (key: string, newValue: any, oldValue: any) => void) {
        // placeholder. whenever an spy decorated property changes, this method gets invoked - overridden by the spy
    }

    triggerEvent(eventName: string, detail: any) {
        const event = new CustomEvent(eventName, { detail });

        Logger.log(`Triggering event ${eventName}`, event);

        // Dispatch the event.
        this.dispatchEvent(event);
      }
}