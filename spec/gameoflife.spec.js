// eslint-disable-next-line
const should = require('chai').should();
const game = require('../gameoflife.js');
const Generation = game.Generation;
describe('game of life', () => {
	describe('generations are updated according to the rules', () => {
		it('returns the next generation', () => {
			const gameoflife = new Generation({
				'2,4': true,
				'3,4': true,
				'4,4': true,
			});
			gameoflife
				.start()
				.generation.should.eql({ '3,4': true, '3,3': true, '3,5': true });
		});
		it('kills a cell if it has less than 2 neighboring cells ', () => {
			const gameoflife = new Generation({
				'2,4': true,
				'7,4': true,
				'4,9': true,
			});
			gameoflife.start().generation.should.eql({});
		});
		it('kills a cell if a cells has more than 3 neighboring cells', () => {
			const gameoflife = new Generation({
				'0,9': true,
				'2,9': true,
				'1,8': true,
				'0,8': true,
			});
			gameoflife
				.start()
				.generation.should.eql({ '0,9': true, '1,8': true, '0,8': true });
		});
		it('preserves a cell with 2 or more neighboring cells', () => {
			const gameoflife = new Generation({
				'0,9': true,
				'1,8': true,
				'0,8': true,
			});
			// eslint-disable-next-line
			gameoflife.start().generation['0,9'].should.be.true;
		});
		it('allows a new cell to be produced if it has 3 neighboring cells', () => {
			const gameoflife = new Generation({
				'0,9': true,
				'1,8': true,
				'0,8': true,
			});
			// eslint-disable-next-line
			gameoflife.start().generation['1,9'].should.be.true;
		});
	});
	describe('generational patterns', () => {
		it('creates an ongoing oscillator', () => {
			const gameoflife = new Generation({
				'2,4': true,
				'3,4': true,
				'4,4': true,
			});
			gameoflife
				.start()
				.generation.should.eql({ '3,4': true, '3,3': true, '3,5': true });
			gameoflife
				.start()
				.generation.should.eql({ '2,4': true, '3,4': true, '4,4': true });
			gameoflife
				.start()
				.generation.should.eql({ '3,4': true, '3,3': true, '3,5': true });
			gameoflife
				.start()
				.generation.should.eql({ '2,4': true, '3,4': true, '4,4': true });
		});
		it('creates a still life square', () => {
			const gameoflife = new Generation({
				'2,2': true,
				'2,1': true,
				'3,2': true,
				'3,1': true,
			});
			gameoflife.start().generation.should.eql({
				'2,2': true,
				'2,1': true,
				'3,2': true,
				'3,1': true,
			});
			gameoflife.start().generation.should.eql({
				'2,2': true,
				'2,1': true,
				'3,2': true,
				'3,1': true,
			});
		});
	});
});
