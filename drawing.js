// PUBLIC
function createBoard(game, root) {
	const
		stroke_width = game.svg_settings.stroke_width,
		field_width = game.svg_settings.field_width,
		field_height = game.svg_settings.field_height,
		SVG_WIDTH = getNthSvgPos(stroke_width, field_width, game.m),
		SVG_HEIGHT = getNthSvgPos(stroke_width, field_height, game.n);

	game.svg_board = createSVG("svg", root, SVG_WIDTH, SVG_HEIGHT);
	game.svg_fields = [];

	for(var i=0; i<game.n; ++i) {
		game.svg_fields.push([]);

		for(var j=0; j<game.m; ++j) {
			var rect_el = createSVG("rect", game.svg_board);

			setAttribs(
				rect_el,
				["x", getNthSvgPos(stroke_width, field_width, j)],
				["y", getNthSvgPos(stroke_width, field_height, i)],
				["width", field_width],
				["height", field_height],
				["stroke-width", stroke_width],
				["class", "field"]
			);

			game.svg_fields[i].push(rect_el);
		}
	}
}

function createClipBoard(game, root) {
	const
		stroke_width = game.svg_settings.stroke_width,
		field_width = game.svg_settings.field_width,
		field_height = game.svg_settings.field_height,
		SVG_CLIP_WIDTH  = getNthSvgPos(stroke_width, field_width, game.clip_size),
		SVG_CLIP_HEIGHT = 2 * stroke_width + field_width;

	game.svg_clip_board = createSVG("svg", root, SVG_CLIP_WIDTH, SVG_CLIP_HEIGHT);
	game.svg_clip_fields = [],
	game.svg_mirrors = [];

	for(var i=0; i<game.clip_size; ++i) {
		var
			rect_el = createSVG("rect", game.svg_clip_board),
			pos = {x: stroke_width + i * (stroke_width + field_width), y: stroke_width};

		setAttribs(
			rect_el,
			["x", pos.x],
			["y", pos.y],
			["width", field_width],
			["height", field_height],
			["stroke-width", stroke_width],
			["class", "field"]
		);
		
		game.svg_clip_fields.push(rect_el);
		game.svg_mirrors.push(createMirror(game.svg_clip_board, pos.x, pos.y, field_width, field_height, game.clipboard[i]));
	}
}

function createBoardObjects(game) {
	const
		stroke_width = game.svg_settings.stroke_width,
		field_width = game.svg_settings.field_width,
		field_height = game.svg_settings.field_height;

	game.svg_objects = [];

	for(var field of game.board) {
		var svg_field = game.svg_fields[field.pos.x][field.pos.y];
		if(field.obj === OEn.Bulb)
			game.svg_objects.push(createBulb(
				game.svg_board,
				getNthSvgPos(stroke_width, field_width, field.pos.y) + 0.1*field_width,
				getNthSvgPos(stroke_width, field_height, field.pos.x) + 0.1*field_height,
				field_width * 0.8,
				field_height * 0.8,
				field.col,
				undefined
			));
	}
	for(var field of game.board) {
		var svg_field = game.svg_fields[field.pos.x][field.pos.y];
		if(field.obj === OEn.Source)
			game.svg_objects.push(createSource(
				game.svg_board,
				getNthSvgPos(stroke_width, field_width, field.pos.y),
				getNthSvgPos(stroke_width, field_height, field.pos.x),
				field_width,
				field_height,
			));
	}
}

function updateBoard(game) {
	var mirror_number = game.clip_size;
	for(var field of game.board)
		if(field.obj === OEn.Mirror)
			game.svg_objects[--mirror_number].setAttribute(
				"transform",
				"translate("+field.pos.x+" "+field.pos.y+")"
			);
}

function getNthSvgPos(stroke_width, dim, number) {
	return stroke_width + (dim + stroke_width) * number;
};

function createBulb(root, x, y, width, height, color, state) {
	const STROKE_COLOR = 0xFFFFFF;
	var bulb = {};
	bulb.svg_ellipse = createFieldEllipse(root, x, y, width, height, STROKE_COLOR, color);

	return bulb;
}

function createMirror(root, x, y, width, height, rotation) {
	const
		GLASS_COLOR = "#AAD0FF",
		MIRROR_COLOR = "#774444";
	var
		mirror = {},
		minWidthHeight = Math.min(width, height);

	mirror.svg_rect = createSVG("rect", root, width, 0.45*height);
	setAttribs(
		mirror.svg_rect,
		["x", x],
		["y", y + 0.25*height],
		["transform", "rotate("+rotation+" "+(0.5*width+x)+" "+(0.5*height+y)+")"],
		["stroke-width", 0.03*minWidthHeight],
		["stroke", "#000000"],
		["fill", MIRROR_COLOR]
	);

	mirror.svg_ellipse = createSVG("ellipse", root);
	mirror.svg_ellipse = setAttribs(
		mirror.svg_ellipse,
		["cx", x + 0.5*width],
		["cy", y + 0.4*height],
		["rx", 0.45*width],
		["ry", 0.12*height],
		["transform", "rotate("+rotation+" "+(0.5*width+x)+" "+(0.5*height+y)+")"],
		["stroke-width", 0.03*minWidthHeight],
		["stroke", "#000000"],
		["fill", GLASS_COLOR]
	);

	return mirror;
}

function createSource(root, x, y, width, height) {
	const
		STROKE_COLOR = 0x222222,
		FILL_COLOR = 0x000000;
	var source = {};

	source.svg_ellipse = createFieldEllipse(root, x, y, width, height, STROKE_COLOR, FILL_COLOR);
}

function createFieldEllipse(root, x, y, width, height, stroke_color, fill_color) {
	const
		rx = 0.5 * width,
		ry = 0.5 * height;
	var ellipse = createSVG("ellipse", root);
	setAttribs(
		ellipse,
		["cx", x + rx],
		["cy", y + ry],
		["rx", rx],
		["ry", ry],
		["stroke-width", 0.03*Math.min(width, height)],
		["stroke", stroke_color],
		["fill", fill_color]
	);
	return ellipse;
}

