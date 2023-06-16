/* const dbOpenRequest = window.indexedDB.open("commande")

function initDb() {
    dbOpenRequest.onsuccess = (e) => {
    console.log("Database initialized...");
    }
    const db = dbOpenRequest.result;
    const transtation = db.transaction(["composition"], "readwrite");
    return transtation.objectStore("composition");
    
}

/**
 * 
 * @param {Object} data 
 */

/*
export function addObject(data) {
    return initDb().add(data)
}
/**
 * 
 * @param {Object} data 
 * @param {*} key 
 */
/*
export function updateObject(data,key) {
    return initDb().put(data,key)
}
/**
 * 
 * @param {*} key 
 */
/*
export function deleteObject(key) {
    return initDb().delete(key)
} 
*/

export function addLocalStorage(data) {
    const getData = JSON.parse(window.localStorage.getItem("commande"));
    if (typeof getData === "object") {
        return window.localStorage.setItem("commande",JSON.stringify({...getData,data}))
    } else {
        window.localStorage.setItem("commande",JSON.stringify({data}))
    }
}
export function getLocalSorage() {
    return JSON.parse(window.localStorage.getItem("commande"))&&JSON.parse(window.localStorage.getItem("commande")).data;
}