

function drawCurrentObject(svg) {

}

function drawParents(svg, nb_parents) {
  var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  var min_size = Math.min(svg.width, svg.height);
  shape.setAttributeNS(null, "cx", min_size/2);
  shape.setAttributeNS(null, "cy", min_size/2);
  shape.setAttributeNS(null, "r", min_size/2);
  shape.setAttributeNS(null, "fill", "green");
  document.getElementById('hierarchy').appendChild(shape);
}

function drawSiblings(svg, nb_siblings) {

}

function drawChildren(svg, nb_children) {

}


$(document).ready(function() {
  var nb_parents = parseInt($("#parents").html());
  var nb_siblings = parseInt($("#siblings").html());
  var nb_children = parseInt($("#children").html());

  var svg = {
    width : $("#hierarchy").attr("width"),
    height : $("#hierarchy").attr("height")
  };

  //drawCurrentObject(svg);
  drawParents(svg, nb_parents);
  // drawSiblings(svg, nb_siblings);
  // drawChildren(svg, nb_children);
});
