export function Spy(target: any, key: string): any { // observe a property
    const targetKey = "onSpyUpdate"; // @todo @refactor

    target[targetKey] =
    function (fn: (propKey: string, prev: any, next: any) => void) {
        let prev = this[key];
        Reflect.defineProperty(this, key, {
            set(next) {
                fn(key, prev, next);
                prev = next;
            }
        })
    };
}