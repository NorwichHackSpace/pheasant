export function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("dashboard")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

export function saveToLS(key, value) {
  let oldStore = {};
  try {
    oldStore = JSON.parse(global.localStorage.getItem("dashboard")) || {};
  } catch (e) {
    console.error(e);
  }

  let newStore = { [key]: value };
  newStore = { ...oldStore, ...newStore };
  newStore = JSON.stringify(newStore);
  if (global.localStorage) {
    global.localStorage.setItem(
      "dashboard",
      newStore
    );
  }
}
