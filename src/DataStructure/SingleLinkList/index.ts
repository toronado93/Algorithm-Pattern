class Node {
  data: number;
  next: null | Node;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class SingleLinkList {
  head: null | Node;
  tail: null | Node;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(nodeItem: Node) {
    // if thre is no item in list
    if (!this.head) {
      this.head = nodeItem;
      this.tail = nodeItem;
      this.size++;

      //   if there is an item in list , onvoming object can not be the head as list already has
    } else {
      // Crucial!!!! in order to link oncoming one with the last item of list we need to access next property of current tail otherwise you can not link the newly one with the last item
      if (this.tail !== null) {
        this.tail.next = nodeItem;
        this.tail = nodeItem;
        this.size++;
      }
    }
  }
  // find the last one delete it from the linkedlist , reduce the index number  , and assign the previous one as a tail and assign its next property to null.
  // class tail gives the last one

  pop(): Node | undefined {
    if (!this.head) {
      return undefined; // The list is empty
    }

    let current = this.head;
    let previous: Node | null = null;

    // Traverse to the end of the list
    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous === null) {
      // There was only one element in the list
      this.head = null;
      this.tail = null;
    } else {
      previous.next = null;
      this.tail = previous;
    }

    this.size--;
    return current; // Return the node that was removed
  }

  get() {
    let current = this.head;

    while (current) {
      console.log(current);
      current = current.next;
    }
  }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

const List = new SingleLinkList();

List.push(node1);
List.push(node2);
List.push(node3);

// read the list

List.get();

// delete the last item
List.pop();
