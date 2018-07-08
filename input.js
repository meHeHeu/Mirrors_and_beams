(function(i, undefined) {


// PRIVATE

var
	g,
	d,
	start_drag_metadata;


// PUBLIC

i.init = function(game, drawing) {
	g = game;
	d = drawing;

	for(var i=0; i<g.m; ++i)
		for(var j=0; j<g.n; ++j)
			d.fields[i][j].setAttribute("onmouseup", "input.svgonmouseup(evt)");

	for(var i=0; i<g.clipsize; ++i)
		d.fields[g.m][i].setAttribute("onmouseup", "input.svgonmouseup(evt)");

	for(var mirror of d.mirrors)
		for(var s of mirror.svg.childNodes)
			s.setAttribute("onmousedown", "input.svgonmousedown(evt)");
}

i.svgonmousedown = function(evt) {
	start_drag_metadata = evt.target.metadata;
	console.log("mdown", start_drag_metadata);
}

i.svgonmouseup = function(evt) {
	var end_drag_pos = evt.target.metadata.pos;
	g.move(start_drag_metadata.gameObj, end_drag_pos);
	d.update(start_drag_metadata, end_drag_pos);
	console.log("mup", end_drag_pos);
}

}(window.input = window.input || {}));

