(function(l, undefined) {

// PRIVATE

var levels = {};


levels.testa = {
	n: 3,
	m: 3,
	clipsize: 0,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 0, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 2, col: 1}}
]};

levels.testb = {
	n: 3,
	m: 3,
	clipsize: 0,
	board: [
//	 object           color       direction    position
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
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 1}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.SE, pos: {row: 2, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 4, col: 0}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 3, col: 5}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 5}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 6, col: 5}},
	{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: 9, col: 3}},
]};

levels[2] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.G, dir: DEn.S , pos: {row: 0, col: 1}},
//	{obj: OEn.Source, col: CEn.B, dir: DEn.E , pos: {row: 6, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.NE, pos: {row: 8, col: 2}},
//	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 3, col: 1}},
//	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.G,              pos: {row: 4, col: 3}},
	{obj: OEn.Bulb  , col: CEn.G,              pos: {row: 4, col: 5}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 5, col: 6}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 6, col: 6}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 3}},
]};

levels[3] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.E,  pos: {row: 0, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.W,  pos: {row: 3, col: 7}},
	{obj: OEn.Source, col: CEn.B, dir: DEn.E,  pos: {row: 5, col: 0}},
//	{obj: OEn.Source, col: CEn.G, dir: DEn.NW, pos: {row: 8, col: 6}},
//	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 2, col: 3}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 5, col: 1}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 5, col: 3}},
//	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 6, col: 7}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 7, col: 1}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 7, col: 3}},
	{obj: OEn.Mirror,             dir: DEn.E , pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.SW, pos: {row: 9, col: 3}},
]};

levels[4] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.B, dir: DEn.SE, pos: {row: 0, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 1}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.NW, pos: {row: 5, col: 7}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.N , pos: {row: 8, col: 1}},
	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 2, col: 2}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 1, col: 2}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 5, col: 2}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 5, col: 5}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 7, col: 4}},
	{obj: OEn.Bulb  , col: CEn.B,              pos: {row: 7, col: 6}},
	{obj: OEn.Mirror,             dir: DEn.N , pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 3}},
]};

levels[5] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//   object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.NE, pos: {row: 2, col: 0}},
	{obj: OEn.Source, col: CEn.B, dir: DEn.S , pos: {row: 1, col: 6}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.W , pos: {row: 3, col: 7}},
	{obj: OEn.Source, col: CEn.B, dir: DEn.NE, pos: {row: 8, col: 3}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 2, col: 2}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 3, col: 2}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.B,              pos: {row: 5, col: 4}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 7, col: 2}},
	{obj: OEn.Bulb  , col: CEn.B,              pos: {row: 8, col: 7}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: 9, col: 3}},
]};

levels[6] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.B, dir: DEn.SE, pos: {row: 0, col: 0}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 2}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 7, col: 0}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.NW, pos: {row: 8, col: 6}},
//	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 1, col: 1}},
	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 3, col: 1}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 6, col: 1}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 7, col: 1}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 6, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.N , pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 3}},
]};

levels[7] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 0, col: 1}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 3}},
	{obj: OEn.Source, col: CEn.B, dir: DEn.NW, pos: {row: 5, col: 7}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.W , pos: {row: 6, col: 7}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 3, col: 3}},
	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 6, col: 3}},
	{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 6, col: 2}},
	{obj: OEn.Bulb  , col: CEn.M,              pos: {row: 8, col: 3}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 3}},
]};

levels[8] = {
	n: 8,
	m: 9,
	clipsize: 4,
	board: [
//	 object           color       direction    position
	{obj: OEn.Source, col: CEn.B, dir: DEn.SW, pos: {row: 0, col: 5}},
	{obj: OEn.Source, col: CEn.R, dir: DEn.E , pos: {row: 0, col: 6}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.SW, pos: {row: 3, col: 7}},
	{obj: OEn.Source, col: CEn.G, dir: DEn.NE, pos: {row: 8, col: 3}},
	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 3, col: 1}},
	{obj: OEn.Bulb  , col: CEn.C,              pos: {row: 4, col: 2}},
	{obj: OEn.Bulb  , col: CEn.G,              pos: {row: 4, col: 3}},
	{obj: OEn.Bulb  , col: CEn.G,              pos: {row: 4, col: 5}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 5, col: 6}},
	{obj: OEn.Bulb  , col: CEn.R,              pos: {row: 6, col: 6}},
	{obj: OEn.Mirror,             dir: DEn.SW, pos: {row: 9, col: 0}},
	{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 9, col: 1}},
	{obj: OEn.Mirror,             dir: DEn.W , pos: {row: 9, col: 2}},
	{obj: OEn.Mirror,             dir: DEn.S , pos: {row: 9, col: 3}},
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

