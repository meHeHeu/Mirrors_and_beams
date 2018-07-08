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
 * NOTE: this function depend on fsize and fstrokew fields
 */
function getNthSvgPos(number) {
	return fstrokew + (fsize + fstrokew) * number;
}

function set_params(game, settings) {
	g = game;

	fsize = settings.field_size;
	fstrokew = settings.field_stroke_width;

	bwidth = getNthSvgPos(g.n);
	bheight = getNthSvgPos(g.m+1);

	root = createSVG("svg", settings.root,
		"width", bwidth,
		"height", bheight,
	);
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
	for(var field of g.board) {
		if(field.obj === OEn.Bulb)
			d.bulbs.push(createBulb(field));
		else if(field.obj === OEn.Source) {
			d.sources.push(createSource(field));
			d.beams.push(createBeam(field));
		}
		else if(field.obj === OEn.Mirror)
			d.mirrors.push(createMirror(field));
	}
}

function newObject(x, y, gameObj) {
	var o = {x, y, gameObj};
	o.svg = createSVG("g", root);
	o.remove = function() {
		svg.parentElement.removeChild(s);
	};
	//o.transform = function() {
	//	this.svg.setAttribute(
	//		"transform",
	//		"rotate("+rotation+" "+(0.5*fsize + this.x)+" "+(0.5*fsize + this.y)+")"
	//		"translate("+getNthSvgPos(this.gameObj.col
	//}
	o.rotate = function(rotation) {
		this.svg.setAttribute(
			"transform",
			"rotate("+rotation+" "+(0.5*fsize + this.x)+" "+(0.5*fsize + this.y)+")"
		);
	};
	o.translate = function(x, y) {
		this.svg.setAttribute(
			"transform",
			"translate("+x+" "+y+")"
		);
	}
	return o;
}

// FIXME: width and height
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
		STROKE_WIDTH = 5;
	var
		start_pos = {
			x: getNthSvgPos(sourceObj.pos.col) + fsize/2,
			y: getNthSvgPos(sourceObj.pos.row) + fsize/2
		},
		end_pos = {
			x: start_pos.x + 400,
			y: start_pos.y + 400
		},
		beam = createSVG("polyline", root,
			"points", start_pos.x + "," + start_pos.y + " " + end_pos.x + "," + end_pos.y,
			"stroke-width", STROKE_WIDTH, 
			"stroke", numbToColor(sourceObj.col),
			"class", "static"
		);

	return beam;
}

function createBulb(bulbObj) {
	const STROKE_COLOR = "#FFFFFF";

	var bulb = newObject(
			getNthSvgPos(bulbObj.pos.col) + 0.1*fsize,
			getNthSvgPos(bulbObj.pos.row) + 0.1*fsize,
			bulbObj
		);

	createFieldEllipse(
		bulb.svg,
		bulb.x, bulb.y,
		0.8*fsize, 0.8*fsize,
		STROKE_COLOR,
		numbToColor(bulbObj.col)
	);

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

d.fields = [];

d.beams = [];
d.bulbs = [];
d.mirrors = [];
d.sources = [];

d.init = function(game, settings) {
	set_params(game, settings);

	createBoard();
	createClipBoard();
	createObjects();
}

d.update = function(mirror, new_pos) {
	mirror.updateDraw();
}

d.getRoot = function() {
	return root;
}

}(window.draw = window.draw || {}));

