

function drawCurrentObject(svg) {

}

function drawParents(svg, nb_parents) {
  svg.html("<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red' />");
}

function drawSiblings(svg, nb_siblings) {

}

function drawChildren(svg, nb_children) {

}


$(document).ready(function() {
  var nb_parents = parseInt($("#parents").html());
  var nb_siblings = parseInt($("#siblings").html());
  var nb_children = parseInt($("#children").html());

  var svg = $("#hierarchy");

  //drawCurrentObject(svg);
  drawParents(svg, nb_parents);
  // drawSiblings(svg, nb_siblings);
  // drawChildren(svg, nb_children);
});
