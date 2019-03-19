export default function getDataByKey(db, storeName, value) {
  return new Promise((resolve) => {
    let transaction = db.transaction(storeName, 'readwrite');
    let store = transaction.objectStore(storeName);
    let request = store.get(value);
    request.onsuccess = function(e) {
      resolve(e.target.result)
    }
  })
}