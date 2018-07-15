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
	NW: 315,
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

// FIXME: naming (eg. obj)
function updateSources(obj) {
	var
		currAngle = obj.dir,
		currVector = getCurrentVector(currAngle),
		currField = {
			row: obj.pos.row + currVector.row,
			col: obj.pos.col + currVector.col
		};
	obj.beam_points = [obj.pos];

calculating_beam:
	while(isInBoundries(currField)) {
		var fcontent = getContents(currField);
		if(fcontent !== undefined)
			switch(fcontent.obj) {
			case OEn.Bulb:
				fcontent.state.push(obj.col);
				break;
			case OEn.Mirror:
				obj.beam_points.push(fcontent.pos);
				currAngle = getCurrentAngle(currAngle, fcontent);
				if(currAngle === undefined) {
					currField = undefined;
					break calculating_beam;
				}
				currVector = getCurrentVector(currAngle);
				break;
			case OEn.Source:
				obj.beam_points.push(fcontent.pos);
				currField = undefined;
				break calculating_beam;
			default:
				throw MyException(
					fcontent,
					"Invalid object found on field",
					"invalid_object"
				);
			}
		console.log(currField.row, currField.col);
		currField.row += currVector.row;
		currField.col += currVector.col;
	}
	if(currField !== undefined)
		obj.beam_points.push(currField);
}

function updateBulbs(obj) {
	var needed_colors;
	switch(obj.col) {
	case CEn.R:
	case CEn.G:
	case CEn.B:
		needed_colors = [obj.col];
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
			obj,
			"Invalid color found in the game object.",
			"invalid_color"
		);
	}
	obj.state = isSubset(needed_colors, obj.state);
}

function updateState() {

	for(var obj of g.board)
		if(obj.obj === OEn.Bulb)
			obj.state = [];

	for(var obj of g.board)
		if(obj.obj === OEn.Source)
			updateSources(obj);
	
	var won = true;
	for(var obj of g.board)
		if(obj.obj === OEn.Bulb) {
			updateBulbs(obj);
			if(!obj.state)
				won = false;
		}

	if(won)
		alert("Congratulations! You win!");
	// TODO: this. Move this to index.html maybe.
}


// PUBLIC

g.newGame = function(level) {

	g.n = level.n;
	g.m = level.m;
	g.clipsize = level.clipsize;
	g.board = level.board; // FIXME: copy this, not just apply reference

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

