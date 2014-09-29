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

/**
 * Focntion qui déssine un cercle SVG
 * @param  {int} cx         x centre
 * @param  {int} cy         y centre
 * @param  {int} radius     rayon en px
 * @param  {colro} fill_color  La couleur
 */
function drawCircle(cx, cy, radius, fill_color) {
  var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  shape.setAttributeNS(null, "cx", cx);
  shape.setAttributeNS(null, "cy", cy);
  shape.setAttributeNS(null, "r", radius);
  shape.setAttributeNS(null, "fill", fill_color);
  document.getElementById('hierarchy').appendChild(shape);
}


/**
 * Fonction qui déssine l'objet courant sous forme de cercle SVG
 * @param  {SVGClass} svg L'objet svg
 */
function drawCurrentObject(svg) {
  var coef = 0.4;
  drawCircle(svg.x_centre, svg.y_centre, (svg.cote_min/2)*coef, "red");
}

/**
 * Fonction qui desiine les parents sous forme de cercle
 * @param  {SVGClass} svg        L'objet svg
 * @param  {int} nb_parents Le nombre de parent de l'objet courant
 */
function drawParents(svg, nb_parents) {
  drawCircle(svg.x_centre, svg.y_centre, svg.cote_min/2, "green");
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

  drawCurrentObject(svg);
  drawParents(svg, nb_parents);
  drawSiblings(svg, nb_siblings);
  drawChildren(svg, nb_children);
});
