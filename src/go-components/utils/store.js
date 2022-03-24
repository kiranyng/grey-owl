const Store = Object.freeze((function(){
    let storeCallback = ()=>{
        Logger.warn('store callback not specified!');
    };
    
    let storeData = {};

    return {
        getDataClone: () => {
            return window.JSON.parse(window.JSON.stringify(storeData));
        },
        update(newData){
            const oldData = storeData;

            storeData = window.JSON.parse(window.JSON.stringify(newData));

            storeCallback(oldData, this.getDataClone());
        },
        // @todo make this an observer/observable to support multiple callbacks
        setCallback:(cb)=>{
            storeCallback = cb;
        }
    }
})());

window.Store = Store;