import GreyOwl from "../core/go-component";

const tmpl = `
    <style></style>
    <slot></slot>
`;

class Accordian extends GreyOwl {
    cmpName = 'accordian';

    template: string = tmpl;
    panels!: HTMLElement[];
    activeKey!: string;

    afterRender(): void {
        this._sRoot.querySelector('slot')?.addEventListener('slotchange', (ev) => {
            this.panels = (ev.target as HTMLSlotElement).assignedNodes() as HTMLElement[];

            let isFirst = true;
            this.panels.forEach((item) => {
                if(item.tagName && item.tagName.toLowerCase() === 'go-panel'){
                    const key = item.getAttribute('key');

                    if(isFirst || this.activeKey === key){
                        this.activeKey = key!;

                        // @experiment @remove @refactor
                        (item as any).varient = 'TEST';

                        isFirst = false;
                    } else {
                        item.setAttribute('hide', 'true');
                    }
                }
            });
        });
    }
}

customElements.define('go-accordian', Accordian);