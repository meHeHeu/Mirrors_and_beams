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

function createBoard() {
	const
		BOARD_WIDTH = getNthSvgPos(fwidth, g.m),
		BOARD_HEIGHT = getNthSvgPos(fheight, g.n);

	d.board = createSVG("svg", root, BOARD_WIDTH, BOARD_HEIGHT);
	d.fields = [];

	for(var i=0; i<g.n; ++i) {
		d.fields.push([]);

		for(var j=0; j<g.m; ++j) {
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
	d.clipfields = [],
	d.mirrors = [];

	for(var i=0; i<g.clipsize; ++i) {
		var
			rect_el = createSVG("rect", d.clipboard),
			pos = {x: getNthSvgPos(fwidth, i), y: strokew};

		setAttribs(
			rect_el,
			["x", pos.x],
			["y", pos.y],
			["width", fwidth],
			["height", fheight],
			["stroke-width", strokew],
			["class", "field"]
		);
		
		d.clipfields.push(rect_el);
		d.mirrors.push(createMirror(d.clipboard, pos.x, pos.y, g.clipboard[i]));
	}
}

function createBoardObjects() {
	d.objects = [];

	for(var field of g.board) {
		if(field.obj === OEn.Bulb)
			d.objects.push(createBulb(
				field.pos.x, field.pos.y,
				field.col, undefined
			));
		if(field.obj === OEn.Source)
			d.objects.push(createSource(field.pos.x, field.pos.y));
	}
}

function createBulb(x, y, color, state) {
	const STROKE_COLOR = "#FFFFFF";
	var bulb = {};

	bulb.svg_ellipse = createFieldEllipse(
		getNthSvgPos(fwidth, y) + 0.1*fwidth,
		getNthSvgPos(fheight, x) + 0.1*fheight,
		0.8*fwidth, 0.8*fheight,
		STROKE_COLOR,
		color
	);
	return bulb;
}

function createSource(x, y) {
	const
		STROKE_COLOR = "#222222",
		FILL_COLOR = "#404040";

	var source = {};

	source.svg_ellipse = createFieldEllipse(
		getNthSvgPos(fwidth, y),
		getNthSvgPos(fheight, x),
		fwidth,
		fheight,
		STROKE_COLOR,
		FILL_COLOR
	);

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

function createMirror(root, x, y, rotation) {
	const
		GLASS_COLOR = "#AAD0FF",
		MIRROR_COLOR = "#774444",
		STROKE_COLOR = "#000000";
	var mirror = {};

	function getRotation(rotation) {
		return "rotate("+rotation+" "+(0.5*fwidth + x)+" "+(0.5*fheight + y)+")";
	}

	mirror.rotate = function(rotation) {
		mirror.frame.setAttribute("transform", getRotation(rotation));
		mirror.glass.setAttribute("transform", getRotation(rotation));
	}

	mirror.frame = createSVG("rect", root, fwidth, 0.45*fheight);
	setAttribs(
		mirror.frame,
		["x", x],
		["y", y + 0.25*fheight],
		["stroke-width", 0.03*fminwh],
		["stroke", STROKE_COLOR],
		["fill", MIRROR_COLOR]
	);

	mirror.glass = createSVG("ellipse", root);
	setAttribs(
		mirror.glass,
		["cx", x + 0.5*fwidth],
		["cy", y + 0.4*fheight],
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
	createBoardObjects();
}

d.updateBoard = function() {
	var mirror_number = g.clipsize;
	for(var field of g.board)
		if(field.obj === OEn.Mirror)
			d.objects[--mirror_number].setAttribute(
				"transform",
				"translate("+field.pos.x+" "+field.pos.y+")"
			);
}

}(window.draw = window.draw || {}));

