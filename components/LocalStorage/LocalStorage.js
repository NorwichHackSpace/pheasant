export function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

export function saveToLS(key, value) {
  let oldStore = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
  let newStore = {[key]: value};
  newStore = {...oldStore,...newStore };
  newStore = JSON.stringify(newStore);
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      newStore
    );
  }
}
