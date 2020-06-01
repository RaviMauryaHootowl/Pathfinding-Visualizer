import React, { useState, useEffect } from 'react';
import './AlgoVisualizer.css';
import { dijkstraAlgo } from '../../algorithms/dijkstraAlgo';

const baseGrid = [
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

const AlgoVisualizer = () => {
	const [grid, setGrid] = useState(baseGrid);
	const [isMousePressed, setIsMousePressed] = useState(false);
	const [isMouseDraggingStartPos, setIsMouseDraggingStartPos] = useState(false);
	const [isMouseDraggingEndPos, setIsMouseDraggingEndPos] = useState(false);
	const [initPos, setInitPos ] = useState({
		si : 9,
		sj : 0,
		ei : 0,
		ej : 9
	}); 

	const MAX_PATH_LENGTH = 81;

	useEffect(() => {
		const tGrid = grid;
		let prevsi = 0, prevsj = 0;
		let prevei = 0, prevej = 0;
		for(let i = 0; i < tGrid.length; i++){
			for(let j = 0; j < tGrid[i].length; j++){
				if(tGrid[i][j] == 0){
					prevsi = i;
					prevsj = j;
				}
				else if(tGrid[i][j] == -10){
					prevei = i;
					prevej = j;
				}
			}
		}

		tGrid[prevsi][prevsj] = -1;
		tGrid[prevei][prevej] = -1;
		tGrid[initPos.si][initPos.sj] = 0;
		tGrid[initPos.ei][initPos.ej] = -10;
		setGrid([...tGrid]);
		const {si, sj, ei, ej} = initPos;
		document.querySelector(`.node-${prevsi}-${prevsj}`).className = `eachCell node-${prevsi}-${prevsj}`;
		document.querySelector(`.node-${prevei}-${prevej}`).className = `eachCell node-${prevei}-${prevej}`;
		document.querySelector(`.node-${si}-${sj}`).className = `eachCell node-${si}-${sj} start`;
		document.querySelector(`.node-${ei}-${ej}`).className = `eachCell node-${ei}-${ej} end`;
	}, [initPos])

	const changeColor = (i, j, type) => {
		if (i == initPos.si && j == initPos.sj || i == initPos.ei && j == initPos.ej) {
			return;
		}
		if (type == 'visual') {
			document.querySelector(`.node-${i}-${j}`).className = `eachCell node-${i}-${j} visualCell`;
		} else {
			document.querySelector(`.node-${i}-${j}`).className = `eachCell node-${i}-${j} pathCell`;
		}
	}

	const solveTheGrid = () => {
		const [shortPathList, listOfAllNodes, solvedGrid] = dijkstraAlgo(grid, initPos);
		setGrid(solvedGrid);
		// Fill visualize color
		for (let i = 0; i < listOfAllNodes.length; i++) {
			setTimeout(() => {
				const node = listOfAllNodes[i];
				changeColor(node[0], node[1], 'visual');
			}, 50 * i);
		}

		// Fill path color
		for (let i = 0; i < shortPathList.length; i++) {
			setTimeout(() => {
				const node = shortPathList[i];
				changeColor(node[0], node[1], 'path');
			}, 50 * (i + listOfAllNodes.length));
		}
	}

	const toggleWall = (i, j) => {
		
		if (grid[i][j] != -5) {
			const tGrid = grid;
			tGrid[i][j] = -5;
			setGrid([...tGrid]);
			document.querySelector(`.node-${i}-${j}`).className = `eachCell node-${i}-${j} wall`;
		} else {
			const tGrid = grid;
			tGrid[i][j] = -1;
			setGrid([...tGrid]);
			document.querySelector(`.node-${i}-${j}`).className = `eachCell node-${i}-${j}`;
		}
	}

	const onCellEnter = (i, j) => {
		if(isMouseDraggingStartPos){
			setInitPos({...initPos, si : i, sj : j});
			return;
		}else if(isMouseDraggingEndPos){
			setInitPos({...initPos, ei : i, ej : j});
			return;
		}
		if (isMousePressed) {
			toggleWall(i, j);
		}
	}

	const onCellIn = (i, j) => {
		if(i == initPos.si && j == initPos.sj){
			setIsMouseDraggingStartPos(true);
			return;
		}else if(i == initPos.ei && j == initPos.ej){
			setIsMouseDraggingEndPos(true);
			return;
		}
		setIsMousePressed(true);
		toggleWall(i, j);
	}

	const onCellOut = () => {
		if(isMouseDraggingEndPos) {setIsMouseDraggingEndPos(false)}
		if(isMouseDraggingStartPos) {setIsMouseDraggingStartPos(false)}
		if(isMousePressed) {setIsMousePressed(false)}
	}

	return (
		<div className="algoPage">
			<div className="solveBtnContainer">
				<button className="solveBtn" onClick={solveTheGrid}>Find Shortest Path</button>
			</div>
			<div className="gridContainer">
				<div className="grid">
					{
						grid.map((row, rowIndex) => {
							return row.map((cell, cellIndex) => {
								return (
								<div onMouseDown={() => { onCellIn(rowIndex, cellIndex); }} onMouseUp={onCellOut} onMouseEnter={() => { onCellEnter(rowIndex, cellIndex) }} className={`eachCell node-${rowIndex}-${cellIndex}`}></div>
								);
							})
						}
						)
					}
				</div>
			</div>
			
			<div className="credits">
				<span>Made by Ravi Maurya</span>
			</div>
		</div>
	);
}

export default AlgoVisualizer;
