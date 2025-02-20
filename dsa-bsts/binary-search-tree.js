class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    function insertHelper(node) {
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
        } else {
          insertHelper(node.left);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          insertHelper(node.right);
        }
      }
    }

    insertHelper(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      }
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val) {
    function findHelper(node) {
      if (!node) return undefined;
      if (val === node.val) return node;
      if (val < node.val) return findHelper(node.left);
      return findHelper(node.right);
    }
    return findHelper(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const result = [];
    const queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    let nodeToRemove = this.root;
    let parent = null;

    // Find the node to remove and its parent
    while (nodeToRemove && nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (!nodeToRemove) return undefined;

    // Node to remove has no children
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (!parent) {
        this.root = null;
      } else if (parent.left === nodeToRemove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Node to remove has one child
    else if (!nodeToRemove.left || !nodeToRemove.right) {
      const child = nodeToRemove.left || nodeToRemove.right;
      if (!parent) {
        this.root = child;
      } else if (parent.left === nodeToRemove) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    // Node to remove has two children
    else {
      let successorParent = nodeToRemove;
      let successor = nodeToRemove.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== nodeToRemove) {
        successorParent.left = successor.right;
        successor.right = nodeToRemove.right;
      }
      successor.left = nodeToRemove.left;

      if (!parent) {
        this.root = successor;
      } else if (parent.left === nodeToRemove) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
    }

    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function getHeight(node) {
      if (!node) return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    function checkBalance(node) {
      if (!node) return true;
      
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      
      return checkBalance(node.left) && checkBalance(node.right);
    }

    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    // Find the rightmost node
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If the highest has a left subtree, find the highest in that subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }
    // If no left subtree, return the parent of the highest
    else if (parent) {
      return parent.val;
    }
    
    // If we're at root and it has no right child but has a left child
    return this.root.left.val;
  }
}

module.exports = BinarySearchTree;