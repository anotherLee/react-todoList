
export {save, load}

function save(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

function load(key) {
  return JSON.parse(localStorage.getItem(key))
}