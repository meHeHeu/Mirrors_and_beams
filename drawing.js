(function(d, undefined) {


// PRIVATE

var
	g,
	root,
	fwidth,
	fheight,
	strokew,
	fminwh;

function set_params(game, settings) {
	g = game;
	root = settings.root;
	fwidth = settings.field_width;
	fheight = settings.field_height;
	strokew = settings.stroke_width;

	fminwh = Math.min(fwidth, fheight);
}

function getNthSvgPos(dim, number) {
	return strokew + (dim + strokew) * number;
};

function newObject(x, y) {
	var o = {x, y}; // FIXME: wtf is x and y?

	o.remove = function() {
		for(var s of this.svg)
			s.parentElement.removeChild(s);
	};

	o.rotate = function(rotation) {
		for(var s of this.svg)
			s.setAttribute(
				"transform",
				"rotate("+rotation+" "+(0.5*fwidth + this.x)+" "+(0.5*fheight + this.y)+")"
			);
	};

	o.svg = [];

	return o;
}

function createBoard() {
	const
		BOARD_WIDTH = getNthSvgPos(fwidth, g.n),
		BOARD_HEIGHT = getNthSvgPos(fheight, g.m);

	d.board = createSVG("svg", root, BOARD_WIDTH, BOARD_HEIGHT);
	d.fields = [];

	for(var i=0; i<g.m; ++i) {
		d.fields.push([]);

		for(var j=0; j<g.n; ++j) {
			var rect_el = createSVG("rect", d.board);

			setAttribs(
				rect_el,
				["x", getNthSvgPos(fwidth, j)],
				["y", getNthSvgPos(fheight, i)],
				["width", fwidth],
				["height", fheight],
				["stroke-width", strokew],
				["class", "field"]
			);

			d.fields[i].push(rect_el);
		}
	}
}

function createClipBoard() {
	const
		CLIP_WIDTH  = getNthSvgPos(fwidth, g.clipsize),
		CLIP_HEIGHT = 2 * strokew + fwidth;

	d.clipboard = createSVG("svg", root, CLIP_WIDTH, CLIP_HEIGHT);
	d.clipfields = [];

	for(var i=0; i<g.clipsize; ++i) {
		var rect_el = createSVG("rect", d.clipboard);
		setAttribs(
			rect_el,
			["x", getNthSvgPos(fwidth, i)],
			["y", strokew],
			["width", fwidth],
			["height", fheight],
			["stroke-width", strokew],
			["class", "field"]
		);
		d.clipfields.push(rect_el);
	}
}

function createObjects() {
	d.bulbs = [];
	d.mirrors = [];
	d.sources = [];

	for(var field of g.board) {
		if(field.obj === OEn.Bulb)
			d.bulbs.push(createBulb(field.pos.row, field.pos.col, field.col, undefined));
		else if(field.obj === OEn.Source)
			d.sources.push(createSource(field.pos.row, field.pos.col));
		else if(field.obj === OEn.Mirror)
			d.mirrors.push(createMirror(d.board, field.pos.row, field.pos.col, field.dir));
	}

	for(var i=0; i<g.clipsize; ++i)
		if(!isNaN(g.clipboard[i]))
			d.mirrors.push(createMirror(d.clipboard, 0, i, g.clipboard[i]));
}

function createBulb(row, col, color, state) {
	const STROKE_COLOR = "#FFFFFF";

	var bulb = newObject(
			getNthSvgPos(fwidth, col) + 0.1*fwidth,
			getNthSvgPos(fheight, row) + 0.1*fheight
		);

	bulb.svg.push(createFieldEllipse(
		bulb.x, bulb.y,
		0.8*fwidth, 0.8*fheight,
		STROKE_COLOR,
		color
	));

	return bulb;
}

function createSource(row, col) {
	const
		STROKE_COLOR = "#222222",
		FILL_COLOR = "#404040";

	var source = newObject(getNthSvgPos(fwidth, col), getNthSvgPos(fheight, row));

	source.svg.push(createFieldEllipse(
		source.x, source.y,
		fwidth, fheight,
		STROKE_COLOR,
		FILL_COLOR
	));

	return source;
}

function createFieldEllipse(x, y, width, height, stroke_color, fill_color) {
	const
		RX = 0.5 * width,
		RY = 0.5 * height;

	var ellipse = createSVG("ellipse", d.board);
	setAttribs(
		ellipse,
		["cx", x + RX],
		["cy", y + RY],
		["rx", RX],
		["ry", RY],
		["stroke-width", 0.03*fminwh],
		["stroke", stroke_color],
		["fill", fill_color]
	);

	return ellipse;
}

function createMirror(root, row, col, rotation) {
	const
		GLASS_COLOR = "#AAD0FF",
		MIRROR_COLOR = "#774444",
		STROKE_COLOR = "#000000";

	var mirror = newObject(getNthSvgPos(fwidth, col), getNthSvgPos(fheight, row));

	mirror.svg.push(createSVG("rect", root, fwidth, 0.45*fheight));
	setAttribs(
		mirror.svg[0],
		["x", mirror.x],
		["y", mirror.y + 0.25*fheight],
		["stroke-width", 0.03*fminwh],
		["stroke", STROKE_COLOR],
		["fill", MIRROR_COLOR]
	);

	mirror.svg.push(createSVG("ellipse", root));
	setAttribs(
		mirror.svg[1],
		["cx", mirror.x + 0.5*fwidth],
		["cy", mirror.y + 0.4*fheight],
		["rx", 0.45*fwidth],
		["ry", 0.12*fheight],
		["stroke-width", 0.03*fminwh],
		["stroke", STROKE_COLOR],
		["fill", GLASS_COLOR]
	);

	mirror.rotate(rotation);

	return mirror;
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

