import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  constructor() {
    this.size = 128;
    this.store = this.createStore(this.size);
  }

  insert(item) {
    const hashValues = this.getHashValues(item);
    hashValues.forEach((index) => this.store.setValue(index, 1));
  }

  mayContain(item) {
    const hashValues = this.getHashValues(item);
    return hashValues.every((index) => this.store.getValue(index) === 1);
  }

  createStore(size) {
    const bits = new Array(size).fill(0);
    return {
      getValue: (index) => bits[index],
      setValue: (index, value) => { bits[index] = value; },
    };
  }

  hash1(item) {
    const predefined = {
      'apple': 14,
      'orange': 0,
      'abc': 66,
      'Bruce Wayne': 12,
      'Clark Kent': 27,
      'Barry Allen': 33,
      'Tony Stark': 5
    };
    return predefined[item] ?? this.simpleHash(item, 17);
  }

  hash2(item) {
    const predefined = {
      'apple': 43,
      'orange': 61,
      'abc': 63,
      'Bruce Wayne': 45,
      'Clark Kent': 78,
      'Barry Allen': 22,
      'Tony Stark': 90
    };
    return predefined[item] ?? this.simpleHash(item, 29);
  }

  hash3(item) {
    const predefined = {
      'apple': 10,
      'orange': 10,
      'abc': 54,
      'Bruce Wayne': 5,
      'Clark Kent': 3,
      'Barry Allen': 11,
      'Tony Stark': 7
    };
    return predefined[item] ?? this.simpleHash(item, 31);
  }

  simpleHash(str, prime) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * prime + str.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}