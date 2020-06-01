import { Queue } from '../Queue/Queue';

// Start and End nodes
const MAX_PATH_LENGTH = 81;


export const dijkstraAlgo = (grid, initPos) => {
    const {si, sj, ei, ej} = initPos;

    const listOfAllNodes = [];
    const tGrid = grid;
    const queue = new Queue();
    queue.enqueue([si, sj]);
    listOfAllNodes.push([si, sj]);

    while (!queue.isEmpty()) {
        const [i, j] = queue.dequeue();

        //UP
        if (i != 0 && tGrid[i - 1][j] != -5) {
            if (tGrid[i - 1][j] == -10) {
                tGrid[i - 1][j] = tGrid[i][j] + 1;
                break;
            }
            else if (tGrid[i - 1][j] == -1) {
                tGrid[i - 1][j] = tGrid[i][j] + 1;
                queue.enqueue([i - 1, j]);
                listOfAllNodes.push([i - 1, j]);
            }
            else { tGrid[i - 1][j] = Math.min(tGrid[i - 1][j], tGrid[i][j] + 1) }
        }

        //DOWN
        if (i != 9 && tGrid[i + 1][j] != -5) {
            if (tGrid[i + 1][j] == -10) {
                tGrid[i + 1][j] = tGrid[i][j] + 1;
                break;
            }
            else if (tGrid[i + 1][j] == -1) {
                tGrid[i + 1][j] = tGrid[i][j] + 1;
                queue.enqueue([i + 1, j]);
                listOfAllNodes.push([i + 1, j]);
            }
            else { tGrid[i + 1][j] = Math.min(tGrid[i + 1][j], tGrid[i][j] + 1) }
        }

        //LEFT
        if (j != 0 && tGrid[i][j - 1] != -5) {
            if (tGrid[i][j - 1] == -10) {
                tGrid[i][j - 1] = tGrid[i][j] + 1;
                break;
            }
            else if (tGrid[i][j - 1] == -1) {
                tGrid[i][j - 1] = tGrid[i][j] + 1;
                queue.enqueue([i, j - 1]);
                listOfAllNodes.push([i, j - 1]);
            }
            else { tGrid[i][j - 1] = Math.min(tGrid[i][j - 1], tGrid[i][j] + 1) }
        }

        //RIGHT
        if (j != 9 && tGrid[i][j + 1] != -5) {
            if (tGrid[i][j + 1] == -10) {
                tGrid[i][j + 1] = tGrid[i][j] + 1;
                break;
            }
            else if (tGrid[i][j + 1] == -1) {
                tGrid[i][j + 1] = tGrid[i][j] + 1;
                queue.enqueue([i, j + 1]);
                listOfAllNodes.push([i, j + 1]);
            }
            else { tGrid[i][j + 1] = Math.min(tGrid[i][j + 1], tGrid[i][j] + 1) }
        }
    }
    const shortPathList = findShortPath(tGrid, initPos);
    console.log(tGrid);
    return [shortPathList, listOfAllNodes, tGrid];
}

const findShortPath = (grid, initPos) => {
    const {si, sj, ei, ej} = initPos;
    let i = ei, j = ej;
    const listOfNodes = [];
    listOfNodes.push([i, j]);
    let count = 0;
    while (i != si || j != sj) {
        count++;
        if (count >= MAX_PATH_LENGTH) {
            break;
        }
        //UP
        if (i != 0 && grid[i - 1][j] == grid[i][j] - 1) {
            listOfNodes.push([i - 1, j]);
            i--;
            continue;
        }
        //DOWN
        if (i != 9 && grid[i + 1][j] == grid[i][j] - 1) {
            listOfNodes.push([i + 1, j]);
            i++;
            continue;
        }

        //LEFT
        if (j != 0 && grid[i][j - 1] == grid[i][j] - 1) {
            listOfNodes.push([i, j - 1]);
            j--;
            continue;
        }

        //RIGHT
        if (j != 9 && grid[i][j + 1] == grid[i][j] - 1) {
            listOfNodes.push([i, j + 1]);
            j++;
            continue;
        }
    }
    return listOfNodes;
}