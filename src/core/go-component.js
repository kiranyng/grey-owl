const missingTemplate = '<div>template unspecified!</div>';

export default class GreyOwl extends HTMLElement {
    constructor() {
        super();

        this.template = missingTemplate;
    }

    connectedCallback() {
        this.beforeRender();

        // rendering
        const _sRoot = this.attachShadow({mode: this.mode});

        const template = Handlebars.compile(this.template);
        _sRoot.innerHTML = template(this);

        this.afterRender(_sRoot);

        this.addListeners(_sRoot);
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