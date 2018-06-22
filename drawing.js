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
		game.svg_mirrors.push(createMirror(game.svg_clip_board, pos.x, pos.y, field_width, field_height));
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
		svg_field.setAttribute("fill", field.col);
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
	const STROKE_COLOR = "#FFFFFF";
	var bulb = {};

	bulb.svg_ellipse = createSVG("ellipse", root);
	setAttribs(
		bulb.svg_ellipse,
		["x", x],
		["y", y],
		["stroke-width", 0.03*minWidthHeight],
		["stroke", "#FFFFFF"],
		["fill", STROKE_COLOR]
	);

	return bulb;
}

function createMirror(root, x, y, width, height) {
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
		["stroke-width", 0.03*minWidthHeight],
		["stroke", "#000000"],
		["fill", MIRROR_COLOR]
	);

	mirror.svg_ellipse = createSVG("ellipse", root);
	setAttribs(
		mirror.svg_ellipse,
		["cx", x + 0.5*width],
		["cy", y + 0.4*height],
		["rx", 0.45*width],
		["ry", 0.12*height],
		["stroke-width", 0.03*minWidthHeight],
		["stroke", "#000000"],
		["fill", GLASS_COLOR]
	);

	return mirror;
}

