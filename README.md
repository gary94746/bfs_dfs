# BFS DFS puzzle 8 solver

Puzzle 8 looks like this, you can solved with bfs or dfs algorithms, you inly need to specify in the input.json the initial and the goal state.

![Puzzle 8](https://3.bp.blogspot.com/_IOiKQLPcA3s/SfHnozeIYMI/AAAAAAAAD_s/XD4hyLhZNqw/s320/8_puzzle.png)

The input json file looks lke this

```js
  "initialState": [
    3,
    1,
    2,
    6,
    0,
    4,
    7,
    8,
    5
  ],
  "finalState": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ]
```
The property initialState and finalState is the puzzle representation, so initialState looks like this
3 | 1 | 2       0 | 1 | 2
6 | 0 | 4  =>   3 | 4 | 5
7 | 8 | 5       6 | 7 | 8


The path for the solution will be printed in the terminal, also generate the files in dot format to render the three in png image


To run this project, only execute the folowing command, automatically transpile the ts code to js, and run it.
```bash
yarn run
```

Also generates the output file in dot friendly to generate the trees, you only need to run
!!! make sure that you already install dot

```bash
chmod +x generate-png.bash
./generate-png.bash
```
