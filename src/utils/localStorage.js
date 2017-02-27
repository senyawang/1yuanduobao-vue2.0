

let localStorage = window.localStorage

let obj = {
    get(key){
        return JSON.parse(localStorage.getItem(key)) || []
    },
    set(key, val){
        let v = JSON.stringify(val)
        localStorage.setItem(key, v)
    },
    del(key){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}

export default obj