var gridSize = 16;
$(document).ready(function(){
	generateGrid();
	$("#reset").on('click',function(){
		if (window.confirm("Do you want to reset the canvas?")) {
			gridSize = +window.prompt("Enter the new grid size:", '16');
			clearGrid()
			generateGrid()
		}
	});
})

function clearGrid(){
	$("#wraper").empty()
}

function generateGrid(){
	wraper = $("#wraper");
	for (var i = 0; i < gridSize; i++) {
		wraper.append('<div class="line">');
		last_line = $(".line:last");
		for (var j = 0; j < gridSize; j++) {
			last_line.append('<div class="square"></div>');
		};
		wraper.append('</div>');
	};
	$(".square").on('mouseover',function(){
		if ($(this).hasClass("colored") && !$("#overwrite").prop('checked')) {
			if ($("#pen").prop('checked')) {
				$(this).css({"background-color": darkerRGB($(this).css("background-color"))});
			}
		} else {
			$(this).addClass("colored");
			if ($("#random").prop('checked')) {
				var r = getRandomInt(0, 255);
				var g = getRandomInt(0, 255);
				var b = getRandomInt(0, 255);
				$(this).css({"background-color": rgb(r, g, b)});
			} else {
				$(this).css({"background-color": $("#color").val()});
			}
		}
	});
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function darkerRGB(rgbString) {
	tbl = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return rgb(tbl[1] - Math.floor(tbl[1] * 0.1), tbl[2] - Math.floor(tbl[2] * 0.1), tbl[3] - Math.floor(tbl[3] * 0.1));
}
