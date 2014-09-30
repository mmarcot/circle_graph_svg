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

  /**
   * Est ce que le point passé en parametre est contenu dans le cercle ?
   * @param  {int} x     Abscisse du point à tester
   * @param  {int} y     Ordonnée du point à tester
   * @param  int} scale  Permet de mettre à l'echelle le rayon en retranchant ou ajoutant une somme
   * @return {boolean}       Vrai ou faux
   */
  this.contains = function(x, y, scale) {
    var rad = this.radius + scale;
    square_dist = Math.pow((this.xc - x), 2) + Math.pow((this.yc - y), 2);
    return (square_dist <= Math.pow(rad, 2));
  };

  /**
   * Fonction qui permet de dessiner le cercle
   * @param  {String} fill_color La couleur de remplissage
   */
  this.draw = function(fill_color) {
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttributeNS(null, "cx", this.xc);
    shape.setAttributeNS(null, "cy", this.yc);
    shape.setAttributeNS(null, "r", this.radius);
    shape.setAttributeNS(null, "fill", fill_color);
    document.getElementById('hierarchy').appendChild(shape);
  };
}


/**
 * Fonction qui déssine l'objet courant sous forme de cercle SVG
 * @param  {SVGClass} svg L'objet svg
 * @return {Circle}   Les dimensions du cercle représentant l'objet courant
 */
function drawCurrentObject(svg) {
  var coef = 0.4;
  var current_object = new Circle(svg.x_centre, svg.y_centre, (svg.cote_min/2)*coef);

  current_object.draw("red");

  return current_object;
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
    var parent = new Circle(svg.x_centre, svg.y_centre, svg.cote_min/2-i*ecart);
    parent.draw("green");
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
  var placer = 0;
  while(placer < nb_siblings) {
    var x_random = Math.random() * svg.width;
    var y_random = Math.random()* svg.height;
    var rayon_siblings = Math.random()*10 + 15;

    if(smaller_parent.contains(x_random, y_random, -rayon_siblings) &&
      !current_object.contains(x_random, y_random, +rayon_siblings) ) {

      var sibling = new Circle(x_random, y_random, rayon_siblings);
      sibling.draw("red");
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
  var placer = 0;
  while(placer < nb_children) {
    var rayon_children = Math.random()*3 + 3;

    var x_random = Math.random() * (current_object.radius*2) + current_object.xc-current_object.radius;
    var y_random = Math.random() * (current_object.radius*2) + current_object.yc-current_object.radius;

    if(current_object.contains(x_random, y_random, -rayon_children) ) {
      var child = new Circle(x_random, y_random, rayon_children);
      child.draw("blue");
      placer++;
    }
  }
}


$(document).ready(function() {
  // var nb_parents = parseInt($("#parents").html());
  // var nb_siblings = parseInt($("#siblings").html());
  // var nb_children = parseInt($("#children").html());

  var nb_parents = 3;
  var nb_siblings = 50;
  var nb_children = 500;

  var svg = new SVGClass($("#hierarchy"));

  var current_object = drawCurrentObject(svg);
  var smaller_parent = drawParents(svg, nb_parents);
  drawSiblings(svg, nb_siblings, smaller_parent, current_object);
  drawChildren(svg, nb_children, current_object);
});
