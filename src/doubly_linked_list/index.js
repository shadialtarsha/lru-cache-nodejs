class Node {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this.size++;
    return newNode;
  }

  removeNode(node) {
    if (!node || this.isEmpty()) {
      return;
    }

    const previousNode = node.previous;
    const nextNode = node.next;

    if (previousNode && nextNode) {
      previousNode.next = nextNode;
      nextNode.previous = previousNode;
    } else if (nextNode) {
      this.head = nextNode;
      nextNode.previous = null;
    } else if (previousNode) {
      this.tail = previousNode;
      previousNode.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    node.next = null;
    node.previous = null;

    this.size--;
  }

  removeTail() {
    return this.removeNode(this.tail);
  }
}

module.exports = DoublyLinkedList;