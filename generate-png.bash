#!/bin/bash
BFS_FILE=./generated/bfs
DFS_FILE=./generated/dfs

if test -f "$BFS_FILE"; then 
	dot -Tpng ./generated/dfs -o ./generated/dfs.png
	echo 'BFS png file generated'
else 
	echo "BFS file not found"
fi

if test -f "$DFS_FILE"; then 
	dot -Tpng ./generated/bfs -o ./generated/bfs.png
	echo 'DFS png file generated'
else 
	echo "DFS file not found"
fi
