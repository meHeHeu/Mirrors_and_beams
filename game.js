(function(g, undefined) {


// GLOBAL

OEn = { // Object Enum
	Bulb:   0,
	Mirror: 1,
	Source: 2
};

CEn = { // Color Enum
	R: "#FF0000",
	G: "#00FF00",
	B: "#0000FF",

	C: "#00FFFF",
	M: "#FF00FF",
	Y: "#FFFF00"
};

DEn = { // Direction Enum
	N:  0,
	NE: 45,
	E:  90,
	SE: 135,
	S:  180,
	SW: 225,
	W:  270,
	NW: 305
};

TEn = { // Type of board Enum
	board: 0,
	clipb: 1
};

Object.freeze(OEn);
Object.freeze(CEn);
Object.freeze(DEn);
Object.freeze(TEn);


// PRIVATE

function fieldIsEmpty(dest) {
	var
		b = g.board,
		blen = g.board.length;

	for(var i=0; i<blen; ++i)
		if(b[i].pos.row === dest.row && b[i].pos.col === dest.col)
			return false;

	return true;
}


// PUBLIC

g.newGame = function() {

	g.n = 8;
	g.m = 9;
	g.clipsize = 4;

	g.board = [
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 1}},
		{obj: OEn.Source, col: CEn.G, dir: DEn.SE, pos: {row: 2, col: 0}},
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 4, col: 0}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {row: 4, col: 2}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {row: 2, col: 5}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {row: 4, col: 5}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {row: 6, col: 5}},
	];

	g.clipboard = [
		DEn.NW,
		DEn.SE,
		DEn.W,
		DEn.NW
	];
}

g.move = function(src, dest) {
	if(src.t === TEn.clipb)
		if(g.clipboard[src.col] != NaN)
			if(fieldIsEmpty(dest)) {
				g.board.push({obj: OEn.Mirror, dir: g.clipboard[src.col], pos: {col: dest.col, row: dest.row}});
				g.clipboard[src.col] = NaN;
			}
}

}(window.game = window.game || {}));

