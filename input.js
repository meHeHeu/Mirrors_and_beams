(function(i, undefined) {


// PRIVATE

var
	g,
	d,
	start_drag_element;


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
	if(start_drag_element !== undefined)
		draw.unmarkChosen(start_drag_element);

	start_drag_element = evt.target;
	draw.markChosen(start_drag_element);
}

i.svgonmouseup = function(evt) {
	if(start_drag_element === undefined)
		return;

	draw.unmarkChosen(start_drag_element);

	var
		end_drag_pos = evt.target.metadata.pos,
		start_metadata = start_drag_element.metadata;

	g.move(start_metadata.gameObj, end_drag_pos);
	d.update(start_metadata, end_drag_pos);

	start_drag_element = undefined;
}

}(window.input = window.input || {}));

