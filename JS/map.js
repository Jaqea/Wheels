/**
 * 邻接表存储DFS
 * @param graph - 邻接表存储的图
 * @param index - 当前节点索引
 * @param n - 节点个数
 */
function dfs(graph, index, n) {
  const res = [],
    path = [index];

  const dfsed = () => {
    if (index === n - 1) {
      res.push([...path]);
      return;
    }

    for (let i = 0, len = graph[index].length; i < len; i++) {
      path.push(graph[index][i]);
      dfs(graph, graph[x][i], n);
      path.pop();
    }
  };

  dfsed();

  return res;
}

/**
 * 邻接矩阵存储BFS
 * @param graph - 邻接矩阵存储的图
 * @param x - 开始搜索的横坐标
 * @param y - 开始搜索的纵坐标
 */
function bfs(graph, x, y) {
  const dir = [
    [0, 1, 0, -1],
    [1, 0, -1, 0],
  ];

  const queue = [];
  let front = (rear = 0);
  const visited = new Array(graph.length)
    .fill()
    .map(() => Array(graph[0].length).fill(0));

  queue[rear++] = [x, y];
  visited[x][y] = 1;

  while (front !== rear) {
    const pos = queue[front++];
    const curX = pos[0];
    const curY = pos[1];

    for (let i = 0; i < 4; i++) {
      const nextX = curX + dir[0][i];
      const nextY = curY + dir[1][i];

      if (
        nextX > -1 &&
        nextX < graph.length &&
        nextY > -1 &&
        nextY < graph[0].length &&
        !visited[(nextX, nextY)]
      ) {
        queue[rear++] = [nextX, nextY];
        visited[nextX][nextY] = 1;
      }
    }
  }
}
