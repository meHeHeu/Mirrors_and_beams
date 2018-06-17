function createSvgNode(game, root) {
	const
		SIZE_WIDTH = 45,
		SIZE_HEIGHT = 45,
		STROKE = 5,
		SVG_SIZE_WIDTH = (SIZE_WIDTH + 2 * STROKE) * game.n,
		SVG_SIZE_HEIGHT = (SIZE_HEIGHT + 2 * STROKE) * game.m;

	game.svg_elements = [];

	var svg_el = createSVG("svg", root, SVG_SIZE_WIDTH, SVG_SIZE_HEIGHT);

	for(var i=0; i<game.n; ++i) {
		var g_el = createSVG("g", svg_el);
		g_el.setAttribute("style", "stroke-width: " + STROKE + ";");

		game.svg_elements.push([]);

		for(var j=0; j<game.m; ++j) {
			var rect_el = createSVG("rect", g_el);
			setAttribs(
				rect_el,
				["x", STROKE + i * (STROKE + SIZE_WIDTH)],
				["y", STROKE + j * (STROKE + SIZE_HEIGHT)],
				["width", SIZE_WIDTH],
				["height", SIZE_HEIGHT]
			);
			game.svg_elements[i].push(rect_el);
		}
	}
};

function updateSvgNode() {
}

