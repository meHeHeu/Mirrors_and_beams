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

function fieldIsEmpty(game, dest) {
	var b = game.board;
	for(var i=0; i<b.length; ++i)
		if(b[i].pos.x === dest.x && b[i].pos.y === dest.y)
			return false;
	return true;
}


// PUBLIC

g.newGame = function() {

	g.n = 9;
	g.m = 8;
	g.clipsize = 4;

	g.board = [
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {x: 0, y: 1}},
		{obj: OEn.Source, col: CEn.G, dir: DEn.SE, pos: {x: 2, y: 0}},
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {x: 4, y: 0}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {x: 4, y: 2}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {x: 2, y: 5}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {x: 4, y: 5}},
		{obj: OEn.Bulb  , col: CEn.Y, pos: {x: 6, y: 5}},
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
		if(g.clipboard[src.x] != null)
			if(fieldIsEmpty(g, dest)) {
				g.board.push({obj: OEn.Mirror, dir: g.clipboard[src.x], pos: {x: dest.x, y: dest.y}});
				g.clipboard[src.x] = null;
			}
}

}(window.game = window.game || {}));

