export default class Storage{
    static setValues(data:any){
        localStorage.setItem(data.key,data.value);
    }
    static getValues(key:any){
        let value = localStorage.getItem(key);
        return value;
    }
    static removeValues(key:any){
        localStorage.removeItem(key);
    }
    static removeAll(){
        localStorage.clear();
    }
}