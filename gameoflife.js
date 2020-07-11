class Generation {
	constructor(generation) {
		this.grid = {};
		this.generation = generation;
	}
	board() {
		const x = 10;
		const y = 10;
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				this.grid[`${i},${j}`] = false;
			}
		}
		return this;
	}
	cells() {
		for (const cell in this.generation) {
			this.grid[cell] = true;
		}
		return this;
	}
	gameOfLife() {
		let newCells = {};
		for (const cell in this.generation) {
			let neighbors = 0;
			const coords = cell.split(',');
			const x = Number(coords[0]);
			const y = Number(coords[1]);
			for (let cx = -1; cx <= 1; cx++) {
				for (let cy = -1; cy <= 1; cy++) {
					if (
						!newCells[`${x + cx},${y + cy}`] &&
						this.grid[`${x + cx},${y + cy}`] === false
					) {
						newCells[`${x + cx},${y + cy}`] = 1;
					} else if (this.grid[`${x + cx},${y + cy}`] === false) {
						newCells[`${x + cx},${y + cy}`]++;
					}

					if (!(cx === 0 && cy === 0) && this.grid[`${x + cx},${y + cy}`]) {
						neighbors++;
					}
				}
			}
			// Any live cell with fewer than two live neighbors dies (under population)
			// Any live cell with two or three live neighbors lives on to the next generation
			// Any live cell with more than three live neighbors dies (over population)
			if (
				!(neighbors === 3 || (this.generation[`${x},${y}`] && neighbors === 2))
			) {
				delete this.generation[`${x},${y}`];
			}
		}

		for (const cell in newCells) {
			const coords = cell.split(',');
			// Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
			if (newCells[cell] === 3) {
				this.generation[`${coords[0]},${coords[1]}`] = true;
			}
		}
		newCells = {};
		return this;
	}
	start() {
		this.board()
			.cells()
			.gameOfLife();
		return this;
	}
	loop() {
		setTimeout(() => {
			this.start();
			this.loop(200);
		}, 200);
	}
}

module.exports = {
	Generation: Generation,
};
