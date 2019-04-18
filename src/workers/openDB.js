export default function openDB(name,version){
  return new Promise((resolve,reject) => {
    var request = indexedDB.open(name,version);
    request.onerror = function() {
      reject("openDB error!");
    };
    request.onsuccess = function(e) {
      resolve(e.target.result)
    };
    request.onupgradeneeded = function(e) {
      let db = e.target.result;
      if(!db.objectStoreNames.contains('members')) {
        db.createObjectStore('members', {keyPath: 'userId'});
        db.createObjectStore('groups', {keyPath: 'name'});
      }
    }
  })
}