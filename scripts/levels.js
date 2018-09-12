(function(l, undefined) {

// PRIVATE

var levels = {};

levels.testa = {

n: 3,
m: 3,
clipsize: 0,

board: [
//   object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 0, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 2, col: 1}}
]};

levels.testb = {

n: 3,
m: 3,
clipsize: 0,

board: [
//   object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 0, col: 1}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.S , pos: {row: 0, col: 2}},
	{obj: OEn.Bulb,   col: CEn.R,              pos: {row: 1, col: 1}},
	{obj: OEn.Bulb,   col: CEn.Y,              pos: {row: 1, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 2, col: 0}}
]};

levels.testc = {

n: 6,
m: 7,
clipsize: 0,

board: [
//   object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 1, col: 1}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.S , pos: {row: 1, col: 2}},
	{obj: OEn.Source, col: CEn.B, dir: DEn.S , pos: {row: 1, col: 3}},
	{obj: OEn.Bulb,   col: CEn.R,              pos: {row: 3, col: 2}},
	{obj: OEn.Bulb,   col: CEn.G,              pos: {row: 4, col: 3}},
	{obj: OEn.Bulb,   col: CEn.B,              pos: {row: 5, col: 4}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 0, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 6, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 6, col: 5}}
]};

levels[1] = {

n: 8,
m: 9,
clipsize: 4,

board: [
//   object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 1}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.SE, pos: {row: 2, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 4, col: 0}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 2, col: 5}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 5}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 6, col: 5}},
	{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: 9, col: 3}},
]};

// PUBLIC

l.names = Object.keys(levels);
Object.freeze(l.names);

l.getLevel = function(name) {
	var
		level = levels[name],
		levelCopy = {n: level.n, m: level.m, clipsize: level.clipsize, board: []},
		board = levelCopy.board;

	for(var o of level.board) {
		board.push({
			obj: o.obj,
			col: o.col,
			dir: o.dir,
			pos: {row: o.pos.row, col: o.pos.col}
		});
	}

	return levelCopy;
}

}(window.levels = window.levels || {}))

