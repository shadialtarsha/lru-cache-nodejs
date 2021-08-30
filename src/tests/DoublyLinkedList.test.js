const { expect } = require("chai");
const DoublyLinkedList = require("../doubly_linked_list");

describe("Doubly Linked List", () => {
  it("should create a new Doubly Linked List", () => {
    const list = new DoublyLinkedList();
    expect(list.head).to.be.null;
    expect(list.tail).to.be.null;
    expect(list.size).to.eq(0);
  });

  it("should add new nodes to the front successfully", () => {
    const list = new DoublyLinkedList();
    expect(list.head).to.be.null;
    expect(list.tail).to.be.null;
    expect(list.size).to.eq(0);

    list.insert("key1", 3);
    expect(list.head.key).to.eq("key1");
    expect(list.head.value).to.eq(3);
    expect(list.tail.value).to.eq(3);
    expect(list.head.next).to.be.null;
    expect(list.tail.next).to.be.null;
    expect(list.size).to.eq(1);

    list.insert("key2", 5);
    expect(list.head.key).to.eq("key2");
    expect(list.head.value).to.eq(5);
    expect(list.tail.value).to.eq(3);
    expect(list.head.next.value).to.eql(3);
    expect(list.tail.next).to.be.null;
    expect(list.size).to.eq(2);
  });

  it("should remove a node successfully", () => {
    const list = new DoublyLinkedList();
    expect(list.head).to.be.null;
    expect(list.tail).to.be.null;
    expect(list.size).to.eq(0);

    // value1 <-> value2 <-> value3 <-> value4 <-> value5
    const fifthNode = list.insert("key5", "value5");
    const fourthNode = list.insert("key4", "value4");
    const thirdNode = list.insert("key3", "value3");
    const secondNode = list.insert("key2", "value2");
    const firstNode = list.insert("key1", "value1");
    expect(list.size).to.eq(5);

    // value1 <-> value2 <-> value4 <-> value5
    list.removeNode(thirdNode);
    expect(secondNode.next).to.be.eql(fourthNode);
    expect(fourthNode.previous).to.be.eql(secondNode);
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(fifthNode);
    expect(list.size).to.eq(4);

    // value1 <-> value2 <-> value4
    list.removeNode(fifthNode);
    expect(fourthNode.next).to.be.null;
    expect(fourthNode.previous).to.be.eql(secondNode);
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(fourthNode);
    expect(list.size).to.eq(3);

    // value2 <-> value4
    list.removeNode(firstNode);
    expect(secondNode.next).to.be.eql(fourthNode);
    expect(secondNode.previous).to.be.null;
    expect(list.head).to.be.eql(secondNode);
    expect(list.tail).to.be.eql(fourthNode);
    expect(list.size).to.eq(2);

    // value2
    list.removeNode(fourthNode);
    expect(secondNode.next).to.be.null;
    expect(secondNode.previous).to.be.null;
    expect(list.head).to.be.eql(secondNode);
    expect(list.tail).to.be.eql(secondNode);
    expect(list.size).to.eq(1);

    list.removeNode(secondNode);
    expect(list.head).to.be.null;
    expect(list.tail).to.null;
    expect(list.isEmpty()).to.be.true;
  });

  it("should remove from the tail successfully", () => {
    const list = new DoublyLinkedList();
    expect(list.head).to.be.null;
    expect(list.tail).to.be.null;
    expect(list.size).to.eq(0);

    // value1 <-> value2 <-> value3 <-> value4 <-> value5
    const fifthNode = list.insert("key5", "value5");
    const fourthNode = list.insert("key4", "value4");
    const thirdNode = list.insert("key3", "value3");
    const secondNode = list.insert("key2", "value2");
    const firstNode = list.insert("key1", "value1");
    expect(list.size).to.eq(5);

    // value1 <-> value2 <-> value3 <-> value4
    list.removeTail();
    expect(fourthNode.next).to.be.null;
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(fourthNode);
    expect(list.size).to.eq(4);

    // value1 <-> value2 <-> value3
    list.removeTail();
    expect(thirdNode.next).to.be.null;
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(thirdNode);
    expect(list.size).to.eq(3);

    // value1 <-> value2
    list.removeTail();
    expect(secondNode.next).to.be.null;
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(secondNode);
    expect(list.size).to.eq(2);

    // value1
    list.removeTail();
    expect(firstNode.next).to.be.null;
    expect(list.head).to.be.eql(firstNode);
    expect(list.tail).to.be.eql(firstNode);
    expect(list.size).to.eq(1);

    list.removeNode(firstNode);
    expect(list.head).to.be.null;
    expect(list.tail).to.null;
    expect(list.isEmpty()).to.be.true;
  });
});
