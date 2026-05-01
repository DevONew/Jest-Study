// inventory.js

function addFruit(fruits, fruit) {
  return [...fruits, fruit];
}

function removeFruit(fruits, fruit) {
  return fruits.filter((f) => f !== fruit);
}

module.exports = { addFruit, removeFruit };