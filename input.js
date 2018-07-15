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

	for(var row of d.fields)
		for(var field of row)
			field.setAttribute("onmouseup", "input.svgonmouseup(evt)");

	for(var mirror of d.mirrors)
		for(var s of mirror.svg.childNodes)
			s.setAttribute("onmousedown", "input.svgonmousedown(evt)");
}

i.lockInterface = function() {
	for(var row of d.fields)
		for(var field of row)
			field.removeAttribute("onmouseup");

	for(var mirror of d.mirrors)
		for(var s of mirror.svg.childNodes)
			s.removeAttribute("onmousedown");
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

	if(g.state === GSEn.over) {
		i.lockInterface();
		d.makeGameOver();
	}
}

}(window.input = window.input || {}));

