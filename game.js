(function(g, undefined) {


// GLOBAL

OEn = { // Object Enum
	Bulb:   0,
	Mirror: 1,
	Source: 2
};

CEn = { // Color Enum
	R: 0xff0000,
	G: 0x00ff00,
	B: 0x0000ff,

	C: 0x00ffff,
	M: 0xff00ff,
	Y: 0xffff00
};

DEn = { // Direction Enum
	N:  0,
	NE: 45,
	E:  90,
	SE: 135,
	S:  180,
	SW: 225,
	W:  270,
	NW: 305,
	None: NaN
};

Object.freeze(OEn);
Object.freeze(CEn);
Object.freeze(DEn);


// PRIVATE

DirectionVectors = {
	N:  {row: -1, col:  0},
	NE: {row: -1, col:  1},
	E:  {row:  0, col:  1},
	SE: {row:  1, col:  1},
	S:  {row:  1, col:  0},
	SW: {row:  1, col: -1},
	W:  {row:  0, col: -1},
	NW: {row: -1, col: -1},
	None: {row: 0, col: 0}
};

function updateState() {
	g.beam_points = [];

	for(var obj of g.board)
		if(obj.obj === OEn.Bulb)
			obj.state = [];

	for(var obj of g.board)
		if(obj.obj === OEn.Source) {
		console.log("aaaa");
			var
				vec = DirectionVectors[getKeyByValue(DEn, obj.dir)],
				index = {row: obj.pos.row+vec.row, col: obj.pos.col+vec.col};
			while(isInBoundries(index)) {
				var content = getContents(index);
				if(content !== undefined)
					switch(content.obj) {
					case OEn.Bulb:
						console.log("bulb");
						content.state.push(obj.col);
						console.log(content.state);
						break;
					case OEn.Mirror:
						console.log("mirror");
						break;
					case OEn.Source:
						console.log("source");
						break;
					default:
						break;
					}
				console.log(index.row, index.col);
				index.row += vec.row;
				index.col += vec.col;
			}
		}
}

function isInBoundries(pos) {
	return (pos.row >= 0 && pos.row < g.m) && (pos.col >= 0 && pos.col < g.n);
}

function isOnPosition(obj, pos) {
	return obj.pos.row === pos.row && obj.pos.col === pos.col;
}

function getContents(pos) {
	for(var obj of g.board) {
		if(isOnPosition(obj, pos))
			return obj;
	}
}


// PUBLIC

g.newGame = function() {

	g.n = 8;
	g.m = 9;
	g.clipsize = 4;

	g.board = [
	//   object           color       direction    position
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 0, col: 1}},
		{obj: OEn.Source, col: CEn.G, dir: DEn.SE, pos: {row: 2, col: 0}},
		{obj: OEn.Source, col: CEn.R, dir: DEn.SE, pos: {row: 4, col: 0}},
		{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 2}},
		{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 2, col: 5}},
		{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 4, col: 5}},
		{obj: OEn.Bulb  , col: CEn.Y,              pos: {row: 6, col: 5}},
		{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: g.m, col: 0}},
		{obj: OEn.Mirror,             dir: DEn.SE, pos: {row: g.m, col: 1}},
		{obj: OEn.Mirror,             dir: DEn.W , pos: {row: g.m, col: 2}},
		{obj: OEn.Mirror,             dir: DEn.NW, pos: {row: g.m, col: 3}},
	];

	updateState();
}

g.move = function(src, dest) {
	for(var field of g.board)
		if(isOnPosition(field, dest))
			return;

	src.pos = dest;
	updateState();
}

}(window.game = window.game || {}));

