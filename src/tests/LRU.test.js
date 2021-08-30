const { expect } = require("chai");
const LRU = require("../lru");

describe("LRU Cache", () => {
  it("should be able to create a new LRU cache with fixed capacity", () => {
    const capacity = 2;
    const newCache = new LRU(capacity);

    newCache.put("key1", "value1");
    newCache.put("key2", "value2");
    expect(newCache.size).to.eq(2);

    newCache.put("key3", "value3");
    expect(newCache.size).to.eq(2);
  });

  it("should evict by default the old elements if none of the elements have been used", () => {
    const capacity = 2;
    const newCache = new LRU(capacity);

    newCache.put("key1", "value1");
    newCache.put("key2", "value2");
    expect(newCache.size).to.eq(2);

    newCache.put("key3", "value3");
    expect(newCache.size).to.eq(2);

    expect(newCache.get("key1")).to.eql(-1);
  });

  it("should replace the value of an existing key and place the value in the beginning", () => {
    const capacity = 2;
    const newCache = new LRU(capacity);

    newCache.put("key1", "value1");
    newCache.put("key2", "value2");
    expect(newCache.size).to.eq(2);
    expect(newCache.doublyList.head.value).to.be.eq("value2");

    newCache.put("key1", "newValue");
    expect(newCache.doublyList.head.value).to.be.eq("newValue");

    expect(newCache.get("key1")).to.eq("newValue");
  });

  it("should evict the least recently used item", () => {
    const capacity = 2;
    const newCache = new LRU(capacity);

    newCache.put("key1", "value1");
    newCache.put("key2", "value2");
    expect(newCache.size).to.eq(2);

    expect(newCache.get("key1")).to.eq("value1");

    newCache.put("key3", "value3");
    expect(newCache.size).to.eq(2);

    expect(newCache.get("key1")).to.eq("value1");
    expect(newCache.get("key2")).to.eql(-1);
    expect(newCache.get("key3")).to.eql("value3");
  });
});
