class Heap {
  constructor(arr = []) {
    this.heap = [...arr]; // copy so input array is not mutated
    this.heapify();
  }

  get size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  extractMax() {
    const max = this.heap[0];
    const last = this.heap.pop();
    // Root was the only element, nothing to repair
    if (this.heap.length) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return max;
  }

  heapify() {
    const lastLeaf = this.heap.length - 1;
    const lastParent = Math.floor((lastLeaf - 1) / 2);

    for (let i = lastParent; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  siftUp(i) {
    // 0 is the root therefore has no parent
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      // Parent is greater, already in correct position
      if (this.heap[parent] >= this.heap[i]) return;

      // Parent is not in correct position, therefore swap (sift up)
      this.swap(i, parent);
      i = parent;
    }
  }

  siftDown(i) {
    const size = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let largest = i;

      // Compare with children
      if (left < size && this.heap[largest] < this.heap[left]) largest = left;
      if (right < size && this.heap[largest] < this.heap[right]) largest = right;

      // Parent is largest
      if (largest === i) return;

      // Swap with largest child
      this.swap(largest, i);
      i = largest; // re-compute level down
    }
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

// const heap = new Heap(arr)
