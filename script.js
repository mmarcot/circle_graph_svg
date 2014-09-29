/**
 * Definition d'une classe javascript représentant un canvas SVG
 * @param {JQueryObject} ref Référence à l'objet jquery
 */
function SVGClass(ref) {
  this.ref = ref;
  this.width = this.ref.attr("width");
  this.height = this.ref.attr("height");
  this.cote_min = Math.min(this.width, this.height);
  this.x_centre = this.width / 2;
  this.y_centre = this.height / 2;
}


function drawCurrentObject(svg) {

}

function drawParents(svg, nb_parents) {
  var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  shape.setAttributeNS(null, "cx", svg.x_centre);
  shape.setAttributeNS(null, "cy", svg.y_centre);
  shape.setAttributeNS(null, "r", svg.cote_min/2);
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

  var svg = new SVGClass($("#hierarchy"));

  //drawCurrentObject(svg);
  drawParents(svg, nb_parents);
  // drawSiblings(svg, nb_siblings);
  // drawChildren(svg, nb_children);
});
