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
 * Definition d'une classe représentant un cercle
 * @param {int} xc     x du centre
 * @param {int} yc     y du centre
 * @param {int} radius Rayon du cercle
 */
function Circle(xc, yc, radius) {
  this.xc = xc;
  this.yc = yc;
  this.radius = radius;
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
 * Fonction qui dit si un point est dans le cercle
 * @param  {int} center_x Centre x du cercle
 * @param  {int} center_y Centre y du cercle
 * @param  {int} radius   Rayon du cercle
 * @param  {int} x        Abscisse du point à tester
 * @param  {int} y        Ordonnée du point à tester
 * @return {boolean}          Vrai ou faux
 */
function inCircle(center_x, center_y, radius, x, y) {
  square_dist = Math.pow((center_x - x), 2) + Math.pow((center_y - y), 2);
  return (square_dist <= Math.pow(radius, 2));
}


/**
 * Fonction qui déssine l'objet courant sous forme de cercle SVG
 * @param  {SVGClass} svg L'objet svg
 * @return {Circle}   Les dimensions du cercle représentant l'objet courant
 */
function drawCurrentObject(svg) {
  var coef = 0.4;

  drawCircle(svg.x_centre, svg.y_centre, (svg.cote_min/2)*coef, "red");

  return new Circle(svg.x_centre, svg.y_centre, (svg.cote_min/2)*coef);
}


/**
 * Fonction qui dessine les parents sous forme de cercle
 * @param  {SVGClass} svg        L'objet svg
 * @param  {int} nb_parents Le nombre de parent de l'objet courant
 * @return {Circle}   Le plus petit cercle des parents
 */
function drawParents(svg, nb_parents) {
  var ecart = 3;

  for (var i = nb_parents; i > 0; i--) {
    drawCircle(svg.x_centre, svg.y_centre, svg.cote_min/2-i*ecart, "green");
  }

  return new Circle(svg.x_centre, svg.y_centre, svg.cote_min/2-nb_parents*ecart);
}


/**
 * Fonction qui s'occupe de déssiner les siblings
 * @param  {SVGClass} svg            Le canvas svg
 * @param  {int} nb_siblings    Le nombre de siblings à dessiner
 * @param  {Circle} smaller_parent Le cercle représentant le plus petit des parents
 * @param  {Circle} current_object Le cercle représentant l'objet courant
 */
function drawSiblings(svg, nb_siblings, smaller_parent, current_object) {
  var rayon_siblings = 8;

  var placer = 0;
  while(placer < nb_siblings) {
    var x_random = Math.random() * svg.width;
    var y_random = Math.random()* svg.height;

    if(inCircle(smaller_parent.xc, smaller_parent.yc,
        smaller_parent.radius-rayon_siblings, x_random, y_random) &&
      !inCircle(current_object.xc, current_object.yc,
        current_object.radius+rayon_siblings, x_random, y_random) ) {

      drawCircle(x_random, y_random, rayon_siblings, "red");
      placer++;
    }

  }
}


/**
 * Fonction qui s'occupe de dessiner les enfants de l'objet courant sous
 * forme de cercles
 * @param  {SVGClass} svg            Canvas SVG
 * @param  {int} nb_children    Nombre d'enfants
 * @param  {circle} current_object Cercle représentant l'objet courant
 */
function drawChildren(svg, nb_children, current_object) {
  var rayon_children = 5;

  var placer = 0;
  while(placer < nb_children) {
    var x_random = Math.random() * (current_object.radius*2) + current_object.xc-current_object.radius;
    var y_random = Math.random() * (current_object.radius*2) + current_object.yc-current_object.radius;

    if(inCircle(current_object.xc, current_object.yc,
        current_object.radius-rayon_children, x_random, y_random) ) {

      drawCircle(x_random, y_random, rayon_children, "blue");
      placer++;
    }

  }
  alert(cpt);
}


$(document).ready(function() {
  // var nb_parents = parseInt($("#parents").html());
  // var nb_siblings = parseInt($("#siblings").html());
  // var nb_children = parseInt($("#children").html());

  var nb_parents = 3;
  var nb_siblings = 500;
  var nb_children = 500;

  var svg = new SVGClass($("#hierarchy"));

  var current_object = drawCurrentObject(svg);
  var smaller_parent = drawParents(svg, nb_parents);
  drawSiblings(svg, nb_siblings, smaller_parent, current_object);
  drawChildren(svg, nb_children, current_object);
});
