(function(l, undefined) {

l.testa = {

	n: 3,
	m: 3,
	clipsize: 0,

	board: [
	//   object           color       direction    position
		{obj: OEn.Source, col: CEn.R, dir: DEn.S , pos: {row: 0, col: 1}},
		{obj: OEn.Mirror,             dir: DEn.NE, pos: {row: 2, col: 1}}
	]
};

l.testb = {

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
	]
};

l[1] = {

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
	]
};

}(window.levels = window.levels || {}))

