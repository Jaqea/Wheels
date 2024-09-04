function TreeNode(val, left, right) {
  this.val = val || null;
  this.left = left || null;
  this.right = right || null;
}

function preTraversal(root) {
  const stack = [];
  let top = 0;
  stack[top++] = root;

  while (top) {
    const node = stack[--top];
    console.log(node.val);
    if (node.right) {
      stack[top++] = node.right;
    }
    if (node.left) {
      stack[top++] = node.left;
    }
  }
}

// function preTraversal(node) {
//   if (!node) {
//     return null;
//   }

//   console.log(node.val);
//   preTraversal(node.left);
//   preTraversal(node.right);
// }

function midTraversal(root) {
  const stack = [];
  let top = 0,
    p = root;

  while (p || top) {
    if (p) {
      stack[top++] = p;
      p = p.left;
    } else {
      p = stack[--top];
      console.log(p.val);
      p = p.right;
    }
  }
}

// function midTraversal(node) {
//   if (!node) {
//     return null;
//   }

//   midTraversal(node.left);
//   console.log(node.val);
//   midTraversal(node.right);
// }

function behandTraversal(root) {
  const stack = [],
    res = [];
  let top = 0;
  stack[top++] = root;

  while (top) {
    const node = stack[--top];
    res.push(node.val);
    if (node.left) {
      stack[top++] = node.left;
    }
    if (node.right) {
      stack[top++] = node.right;
    }
  }

  return res.reverse();
}

// function behandTraversal(node) {
//   if (!node) {
//     return null;
//   }

//   behandTraversal(node.left);
//   behandTraversal(node.right);
//   console.log(node.val);
// }

function levelTraveral(root) {
  const queue = [],
    res = [];
  let front = (rear = 0);
  queue[rear++] = root;

  while (front !== rear) {
    const len = rear - front;
    const item = [];

    for (let i = 0; i < len; i++) {
      const node = queue[front++];
      item.push(node.val);
      if (node.left) {
        queue[rear++] = node.left;
      }
      if (node.right) {
        queue[rear++] = node.right;
      }
    }

    res.push(item);
  }

  return res;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);

behandTraversal(root);
