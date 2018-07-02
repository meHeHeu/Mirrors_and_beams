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

	root = createSVG( "svg", settings.root,
		"width", bwidth,
		"height", bheight,
	);
}

function createBoard() {
	d.fields = [];

	for(var i=0; i<g.m; ++i) {
		d.fields.push([]);
		for(var j=0; j<g.n; ++j)
			d.fields[i].push(createSVG("rect", root,
				"x", getNthSvgPos(j),
				"y", getNthSvgPos(i),
				"width", fsize,
				"height", fsize,
				"stroke-width", fstrokew,
				"class", "field"
			));
	}
}

function createClipBoard() {
	d.fields.push([]);
	for(var i=0; i<g.clipsize; ++i) {
		d.fields[g.m].push(createSVG("rect", root,
			"x", getNthSvgPos(i),
			"y", getNthSvgPos(g.m),
			"width", fsize,
			"height", fsize,
			"stroke-width", fstrokew,
			"class", "field"
		));
	}
}

// TODO
function createField() {
}

function createObjects() {
	d.beams = [];
	d.bulbs = [];
	d.mirrors = [];
	d.sources = [];

	for(var field of g.board) {
		if(field.obj === OEn.Bulb)
			d.bulbs.push(createBulb(field.pos.row, field.pos.col, field.col, undefined));
		else if(field.obj === OEn.Source) {
			d.sources.push(createSource(field.pos.row, field.pos.col));
			d.beams.push(createBeam(field.pos.row, field.pos.col, field.col));
		}
		else if(field.obj === OEn.Mirror)
			d.mirrors.push(createMirror(field.pos.row, field.pos.col, field.dir));
	}

	for(var i=0; i<g.clipsize; ++i)
		if(!isNaN(g.clipboard[i]))
			d.mirrors.push(createMirror(g.m, i, g.clipboard[i]));
}

function newObject(x, y) {
	var o = {x, y};

	o.remove = function() {
		for(var s of this.svg)
			s.parentElement.removeChild(s);
	};

	o.rotate = function(rotation) {
		for(var s of this.svg)
			s.setAttribute(
				"transform",
				"rotate("+rotation+" "+(0.5*fsize + this.x)+" "+(0.5*fsize + this.y)+")"
			);
	};

	o.svg = [];

	return o;
}

// FIXME: width and height
function createFieldEllipse(x, y, width, height, stroke_color, fill_color) {
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
		"fill", fill_color
	);

	return ellipse;
}

function createBeam(row, col, color) {
	const
		STROKE_WIDTH = 5;
	var
		start_pos = {x: getNthSvgPos(col) + fsize/2, y: getNthSvgPos(row) + fsize/2},
		end_pos = {x: start_pos.x + 400, y: start_pos.y + 400};

	var beam = createSVG("polyline", root,
		"points", start_pos.x + "," + start_pos.y + " " + end_pos.x + "," + end_pos.y,
		"stroke-width", STROKE_WIDTH, 
		"stroke", color
	);

	return beam;
}

function createBulb(row, col, color, state) {
	const STROKE_COLOR = "#FFFFFF";

	var bulb = newObject(
			getNthSvgPos(col) + 0.1*fsize,
			getNthSvgPos(row) + 0.1*fsize
		);

	bulb.svg.push(createFieldEllipse(
		bulb.x, bulb.y,
		0.8*fsize, 0.8*fsize,
		STROKE_COLOR,
		color
	));

	return bulb;
}

function createMirror(row, col, rotation) {
	const
		GLASS_COLOR = "#AAD0FF",
		MIRROR_COLOR = "#774444",
		STROKE_COLOR = "#000000";

	var mirror = newObject(getNthSvgPos(col), getNthSvgPos(row));

	mirror.svg.push(createSVG("rect", root,
		"width", fsize,
		"height", 0.45*fsize,
		"x", mirror.x,
		"y", mirror.y + 0.25*fsize,
		"stroke-width", 0.03*fsize,
		"stroke", STROKE_COLOR,
		"fill", MIRROR_COLOR
	));

	mirror.svg.push(createSVG("ellipse", root,
		"cx", mirror.x + 0.5*fsize,
		"cy", mirror.y + 0.4*fsize,
		"rx", 0.45*fsize,
		"ry", 0.12*fsize,
		"stroke-width", 0.03*fsize,
		"stroke", STROKE_COLOR,
		"fill", GLASS_COLOR
	));

	mirror.rotate(rotation);

	return mirror;
}

function createSource(row, col) {
	const
		STROKE_COLOR = "#222222",
		FILL_COLOR = "#404040";

	var source = newObject(getNthSvgPos(col), getNthSvgPos(row));

	source.svg.push(createFieldEllipse(
		source.x, source.y,
		fsize, fsize,
		STROKE_COLOR,
		FILL_COLOR
	));

	return source;
}


// PUBLIC

d.init = function(game, settings) {
	set_params(game, settings);

	createBoard();
	createClipBoard();
	createObjects();
}

d.update = function() {
	for(var m of d.mirrors)
		m.remove();
	for(var b of d.bulbs)
		b.remove();
	for(var s of d.sources)
		s.remove();
	createObjects();
}

}(window.draw = window.draw || {}));

