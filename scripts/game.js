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
	NW: 315,
	None: NaN
};

GSEn = { // Game State Enum
	live: 1,
	over: 2
};

Object.freeze(OEn);
Object.freeze(CEn);
Object.freeze(DEn);
Object.freeze(GSEn);


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

function getCurrentAngle(currAngle, mirror) {
	var angleDiff = currAngle - mirror.dir;
	switch(angleDiff) {
	case -135:
		currAngle += 135;
		break;
	case 135:
		currAngle += 225;
		break;
	default:
		return undefined;
	}
	currAngle %= 360;
	return currAngle;
}

function getCurrentVector(angle) {
	return DirectionVectors[getKeyByValue(DEn, angle)];
}

function updateSource(source) {
	var
		currAngle = source.dir,
		currVector = getCurrentVector(currAngle),
		currField = {
			row: source.pos.row + currVector.row,
			col: source.pos.col + currVector.col
		};
	source.beam_points = [source.pos];

calculating_beam:
	while(isInBoundries(currField)) {
		var fcontent = getContents(currField);
		if(fcontent !== undefined)
			switch(fcontent.obj) {
			case OEn.Bulb:
				fcontent.state.push(source.col);
				break;
			case OEn.Mirror:
				source.beam_points.push(fcontent.pos);
				currAngle = getCurrentAngle(currAngle, fcontent);
				if(currAngle === undefined) {
					currField = undefined;
					break calculating_beam;
				}
				currVector = getCurrentVector(currAngle);
				break;
			case OEn.Source:
				source.beam_points.push(fcontent.pos);
				currField = undefined;
				break calculating_beam;
			default:
				throw MyException(
					fcontent,
					"Invalid object found on field",
					"invalid_object"
				);
			}
		currField.row += currVector.row;
		currField.col += currVector.col;
	}
	if(currField !== undefined)
		source.beam_points.push(currField);
}

function updateBulb(bulb) {
	var needed_colors;
	switch(bulb.col) {
	case CEn.R:
	case CEn.G:
	case CEn.B:
		needed_colors = [bulb.col];
		break;
	case CEn.Y:
		needed_colors = [CEn.R, CEn.G];
		break;
	case CEn.C:
		needed_colors = [CEn.G, CEn.B];
		break;
	case CEn.M:
		needed_colors = [CEn.B, CEn.R];
		break;
	default:
		throw MyException(
			bulb,
			"Invalid color found in the game object.",
			"invalid_color"
		);
	}
	bulb.state = isSubset(needed_colors, bulb.state);
}

function updateState() {

	g.state = GSEn.over;

	for(var obj of g.board)
		if(obj.obj === OEn.Bulb)
			obj.state = [];

	for(var obj of g.board)
		if(obj.obj === OEn.Source)
			updateSource(obj);
	
	for(var obj of g.board)
		if(obj.obj === OEn.Bulb) {
			updateBulb(obj);

			if(!obj.state) // check state of the game
				g.state = GSEn.live;
		}
}


// PUBLIC

g.newGame = function(level) {

	g.n = level.n;
	g.m = level.m;
	g.clipsize = level.clipsize;
	g.board = level.board;

	g.state = GSEn.live;

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

