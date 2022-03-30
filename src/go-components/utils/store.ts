import Logger from "./debug-log";

interface AppStoreData {

}

const Store = Object.freeze((function(){
    let storeCallback = (oldData: AppStoreData, newData: AppStoreData)=>{
        Logger.warn('store callback not specified!');
    };
    
    let storeData = {};

    return {
        getDataClone: () => {
            return window.JSON.parse(window.JSON.stringify(storeData));
        },
        update(newData: AppStoreData){
            const oldData = storeData;

            storeData = window.JSON.parse(window.JSON.stringify(newData));

            storeCallback(oldData, this.getDataClone());
        },
        // @todo make this an observer/observable to support multiple callbacks
        setCallback:(cb: (oldData:AppStoreData, newData: AppStoreData) => void)=>{
            storeCallback = cb;
        }
    }
})());

export const add= function(a: number, b: number) {
    return a+b;
}

export default Store;