export const storage = {
    get(key) {
      const val = window.localStorage.getItem(key);
      if (!val) {
        return null;
      }
      if(val > ""){
        return JSON.parse(val);
      }
    },
    set(key, val) {
      window.localStorage.setItem(key, JSON.stringify(val));

/*       
      if(val > ""){
        window.localStorage.setItem(key, JSON.stringify(val));
      }
 */

    },
    remove(key) {
      window.localStorage.removeItem(key);
    },
    clear() {
      window.localStorage.clear();
    },
  };
  
  export default storage;
  