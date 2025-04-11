class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    value: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// ✅ Example Tree Structure:

const root1 = new TreeNode(1);
const root2 = new TreeNode(1);
const root3 = new TreeNode(2, root1, root2);

const root5 = new TreeNode(1);
const root6 = new TreeNode(5);
const root7 = new TreeNode(3, root5, root6);

const rootMain = new TreeNode(4, root3, root7);

//psuedo

const hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
  if (!root) return false;

  const recursiveHelper = (
    node: TreeNode | null,
    currentSum: number
  ): boolean => {
    if (!node) return false;

    currentSum += node.value;

    // If it's a leaf node, check if we've reached our target sum
    if (!node.left && !node.right) {
      return currentSum === targetSum;
    }

    // Try both paths
    return (
      recursiveHelper(node.left, currentSum) ||
      recursiveHelper(node.right, currentSum)
    );
  };

  return recursiveHelper(root, 0);
};

console.log(hasPathSum(rootMain, 7));
