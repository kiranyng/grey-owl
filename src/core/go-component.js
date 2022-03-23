const missingTemplate = '<div>template unspecified!</div>';

export default class GreyOwl extends HTMLElement {
    _sRoot = null; // TODO find a way to make this object unavailable to externals scripts

    constructor() {
        super();

        this.template = missingTemplate;
    }

    connectedCallback() {
        console.log('cmp:', this.cmpName);
        console.log('cmp-ctx:', this.dataContext);

        this.beforeRender();

        // rendering
        this._sRoot = this.attachShadow({mode: this.mode});

        const template = Handlebars.compile(this.template);
        this._sRoot.innerHTML = template(this.dataContext ? this.dataContext : {});

        // assign contexts
        const contextedEls = this._sRoot.querySelector('[context]');
        console.log(contextedEls);

        if(contextedEls && this.dataContext){
            contextedEls.dataContext = this.dataContext[contextedEls.getAttribute('context')];

            console.log('updated context:', contextedEls.dataContext);
        }

        this.afterRender(this._sRoot);

        this.addListeners(this._sRoot);
    }

    beforeRender() {
        // placeholder, can be overridden by child classes
    }

    afterRender() {
        // placeholder, can be overridden by child classes
    }

    addListeners(){
        // placeholder, can be overridden by child classes
    }

    disconnectedCallback(){
        // detach event listeners
        removeEventListener();
    }
}