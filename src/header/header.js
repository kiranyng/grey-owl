const templateEl = document.createElement(`<template>
    <div class="header">
        <h1>My Website</h1>
        <greyowl-portal></greyowl-portal>
    </div>
</template>`);

class PortalHeader extends HTMLElement {
    constructor() {
        super();

        this.shadowRoot = templateEl.cloneNode().getRootNode();
    }
}

window.customElements.define('greyowl-portal', Portal);