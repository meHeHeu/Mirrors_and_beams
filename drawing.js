function draw(game) {
	var result = [];
	
	for(var i=0; i<game.n; ++i) {
		result.push([]);
		for(var j=0; j<game.m; ++j)
			result[i].push("O");
	}
	
	for(var i=0, d=game.data[0]; i<game.data.length; d=game.data[++i])
		result[d.pos[0]][d.pos[1]] = d.obj;
	
	game.htmlNode.innerHTML = result.toString();
}

