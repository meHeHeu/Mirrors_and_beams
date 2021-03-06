(function(d, undefined) {


// PRIVATE

var
	g,
	bwidth,
	hwidth,
	fsize,
	fstrokew,
	root;

/*
 * NOTE: this function depends on fsize and fstrokew fields
 */
function getNthSvgPos(number) {
	return fstrokew + (fsize + fstrokew) * number;
}

function createBoard() {
	for(var i=0; i<g.m; ++i) {
		d.fields.push([]);
		for(var j=0; j<g.n; ++j)
			d.fields[i].push(createField(i, j));
	}
}

function createClipBoard() {
	d.fields.push([]);
	for(var i=0; i<g.clipsize; ++i)
		d.fields[g.m].push(createField(g.m, i));
}

function createField(i, j) {
	var sf = createSVG("rect", root,
		"x", getNthSvgPos(j),
		"y", getNthSvgPos(i),
		"width", fsize,
		"height", fsize,
		"stroke-width", fstrokew,
		"class", "field"
	);
	sf.metadata = {
		pos: {row: i, col: j}
	};
	return sf;
}

function createObjects() {
	for(var obj of g.board) {
		if(obj.obj === OEn.Bulb)
			d.bulbs.push(createBulb(obj));
		else if(obj.obj === OEn.Source) {
			d.sources.push(createSource(obj));
			d.beams.push(createBeam(obj));
		}
		else if(obj.obj === OEn.Mirror)
			d.mirrors.push(createMirror(obj));
	}
}

function newObject(x, y, gameObj) {
	var o = {x, y, gameObj};
	o.svg = createSVG("g", root);
	o.remove = function() {
		svg.parentElement.removeChild(s);
	};
	return o;
}

function createFieldEllipse(root, x, y, width, height, stroke_color, fill_color) {
	const
		RX = 0.5 * width,
		RY = 0.5 * height;

	var ellipse = createSVG("ellipse", root,
		"cx", x + RX,
		"cy", y + RY,
		"rx", RX,
		"ry", RY,
		"stroke-width", 0.03*fsize,
		"stroke", stroke_color,
		"fill", fill_color,
		"class", "static"
	);

	return ellipse;
}

function createBeam(sourceObj) {
	const
		STROKE_WIDTH = fsize / 10;

	if(sourceObj.beam_points.length < 2)
		return undefined;

	var beam = createSVG("polyline", root,
			"points", makePolylinePointList(sourceObj.beam_points),
			"stroke", sourceObj.col,
			"stroke-width", STROKE_WIDTH, 
			"class", "static"
	);

	return beam;
}

function makePolylinePointList(plist) {
	var result = "";

	for(var point of plist) {
		var
			half_fsize = fsize / 2,
			x = getNthSvgPos(point.col) + half_fsize,
			y = getNthSvgPos(point.row) + half_fsize;

		result += x + "," + y + " ";
	}

	return result;
}

function createBulb(bulbObj) {
	const STROKE_COLOR = "#FFFFFF";

	function getColor() {
		return bulbObj.state ? bulbObj.col : setLumosity(bulbObj.col, 0.5);
	}

	var bulb = newObject(
		getNthSvgPos(bulbObj.pos.col) + 0.1*fsize,
		getNthSvgPos(bulbObj.pos.row) + 0.1*fsize,
		bulbObj
	);
	var ellipse = createFieldEllipse(
		bulb.svg,
		bulb.x, bulb.y,
		0.8*fsize, 0.8*fsize,
		STROKE_COLOR,
		getColor()
	);
	
	bulb.updateDraw = function() {
		ellipse.setAttribute("fill", getColor());
	}

	return bulb;
}

function createMirror(mirrorObj) {
	const
		GLASS_COLOR = "#AAD0FF",
		MIRROR_COLOR = "#774444",
		STROKE_COLOR = "#000000";

	var
		mirror = newObject(
			getNthSvgPos(mirrorObj.pos.col),
			getNthSvgPos(mirrorObj.pos.row),
			mirrorObj
		),
		frame = createSVG("rect", mirror.svg,
			"width", fsize,
			"height", 0.45*fsize,
			"x", 0,
			"y", 0.25 * fsize,
			"stroke-width", 0.03*fsize,
			"stroke", STROKE_COLOR,
			"fill", MIRROR_COLOR,
			"class", "draggable"
		),
		glass = createSVG("ellipse", mirror.svg,
			"cx", 0.5*fsize,
			"cy", 0.4*fsize,
			"rx", 0.45*fsize,
			"ry", 0.12*fsize,
			"stroke-width", 0.03*fsize,
			"stroke", STROKE_COLOR,
			"fill", GLASS_COLOR,
			"class", "draggable"
		);

	frame.metadata = mirror;
	glass.metadata = mirror;

	mirror.updateDraw = function() {
		this.svg.setAttribute(
			"transform",
			"translate("+getNthSvgPos(this.gameObj.pos.col)+" "+getNthSvgPos(this.gameObj.pos.row)+") " +
			"rotate("+this.gameObj.dir+" "+(0.5*fsize)+" "+(0.5*fsize)+")"
		);
	}

	mirror.updateDraw();

	return mirror;
}

function createSource(sourceObj) {
	const
		STROKE_COLOR = "#222222",
		FILL_COLOR = "#404040";

	var source = newObject(
		getNthSvgPos(sourceObj.pos.col),
		getNthSvgPos(sourceObj.pos.row),
		sourceObj
	);

	createFieldEllipse(
		source.svg,
		source.x, source.y,
		fsize, fsize,
		STROKE_COLOR,
		FILL_COLOR
	);

	return source;
}


// PUBLIC


d.init = function(game, game_root, field_size) {
	g = game;

	fsize = field_size;
	fstrokew = fsize / 9;

	bwidth = getNthSvgPos(g.n);
	bheight = getNthSvgPos(g.m+1);

	removeAllChildren(game_root);
	root = createSVG("svg", game_root,
		"width", bwidth,
		"height", bheight,
	);

	d.fields = [];

	d.beams = [];
	d.bulbs = [];
	d.mirrors = [];
	d.sources = [];

	createBoard();
	createClipBoard();
	createObjects();
}

d.update = function(mirror) {
	mirror.updateDraw();

	for(var beam of d.beams)
		root.removeChild(beam);
	
	d.beams = [];
	for(var obj of g.board)
		if(obj.obj === OEn.Source)
			d.beams.push(createBeam(obj));

	for(var field of d.bulbs)
		field.updateDraw();
}

d.markChosen = function(mirror) {
	var rect = mirror.parentElement.childNodes[0];
	rect.classList.add("chosen");
}

d.unmarkChosen = function(mirror) {
	var rect = mirror.parentElement.childNodes[0];
	rect.classList.remove("chosen");
}

d.getRoot = function() {
	return root;
}

}(window.draw = window.draw || {}));

