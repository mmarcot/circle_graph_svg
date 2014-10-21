/**
 * Fonction qui dit si il ya a collision ou non, en calculant la distance entre
 * les deux points centraux grâce au théorème de Pythagore
 * @param  {Array}  tab    Tableau contenant l'ensemble des cercles
 * @param  {int}  x_random Abscisse à tester
 * @param  {int}  y_random Ordonnée à tester
 * @param  {int}  rayon    Le rayon en px du cercle à tester
 * @return {Boolean}          Vrai si collision, faux sinon
 */
function isCollision(tab, x_random, y_random, rayon) {
  for(var i=0; i<tab.length; i++) {
    var AB = Math.abs(tab[i].yc - y_random);
    var BC = Math.abs(tab[i].xc - x_random);
    var AC = Math.sqrt(AB*AB + BC*BC);
    if(AC < tab[i].radius + rayon)
      return true;
  }
  return false;
}



/**
 * Fonction qui déssine l'objet courant sous forme de cercle SVG
 * @param  {Circle} smaller_parent Le plus petit parent
 * @return {Circle}   Les dimensions du cercle représentant l'objet courant
 */
function drawCurrentObject(smaller_parent) {
  var coef = 0.6;
  var current_object = new Circle(smaller_parent.xc, smaller_parent.yc, smaller_parent.radius*coef, "current");

  current_object.draw();

  return current_object;
}



/**
 * Fonction qui dessine les parents sous forme de cercle
 * @param  {CanvasSVG} svg        L'objet svg
 * @param  {int} nb_parents Le nombre de parent de l'objet courant
 * @return {Circle}   Le plus petit cercle des parents
 */
function drawParents(svg, nb_parents) {
  var parent=null;
  var ecart = 5;

  // cas particulier :
  if(nb_parents === 0) {
    parent = new Circle(svg.x_centre, svg.y_centre, svg.cote_min/2, "parent");
  }

  var last_xc = svg.x_centre;
  var last_yc = svg.y_centre;
  var last_r = svg.cote_min/2;

  // boucle de placage 1 à 1 :
  for (var i = 0; i < nb_parents; i++) {

    parent = new Circle(last_xc, last_yc, last_r, "parent");

    // on update :
    last_xc -= ecart * (Math.random()*2-1);
    last_yc -= ecart * (Math.random()*2-1);
    last_r -= ecart;

    // on dessine :
    var last_parent = ( i === nb_parents-1 );
    parent.draw(last_parent);
  }

  return parent;
}



/**
 * Fonction qui s'occupe de déssiner les siblings
 * @param  {CanvasSVG} svg            Le canvas svg
 * @param  {int} nb_siblings    Le nombre de siblings à dessiner
 * @param  {Circle} smaller_parent Le cercle représentant le plus petit des parents
 * @param  {Circle} current_object Le cercle représentant l'objet courant
 */
function drawSiblings(svg, nb_siblings, smaller_parent, current_object) {
  var tab_s = [];
  var placer = 0;
  var cpt_colli = 0;

  // boucle qui place les siblings 1 à 1 :
  while(placer < nb_siblings && cpt_colli < 80) {
    var x_random = Math.random() * svg.width;
    var y_random = Math.random()* svg.height;

    // on met la taille des cercles à l'échelle par rapport au canvas :
    var rayon_siblings = 6 + scaleCircleSize(nb_siblings, "sibling");
    rayon_siblings *= Math.min(svg.width, svg.height)/500;

    // si c'est dans la bonne "portion" de cercle :
    if(smaller_parent.contains(x_random, y_random, -rayon_siblings) &&
      !current_object.contains(x_random, y_random, +rayon_siblings) ) {

      // .. et si il n'y a pas de collision avec les autres siblings :
      if( !isCollision(tab_s, x_random, y_random, rayon_siblings) ) {
        var sibling = new Circle(x_random, y_random, rayon_siblings, "sibling");
        sibling.draw();
        tab_s[tab_s.length] = sibling;
        placer++;
        cpt_colli = 0;
      }
      else
        cpt_colli++;
    }
  }
}



/**
 * Fonction qui permet de mettre à l'echelle la taille des cercles en fonction
 * du nombre
 * @param  {int} nb  Le nombre de semblable
 * @param  {String} hid L'identifiant hiérarchique (sibling, children)
 * @return {int}     La taille
 */
function scaleCircleSize(nb, hid) {
  var size;
  var size_max_siblings = 35;
  var size_max_children = 15;

  if(hid === "sibling") {
    if(nb < 10) size = size_max_siblings;
    else if(nb < 20) size = size_max_siblings * 0.7;
    else if(nb < 30) size = size_max_siblings * 0.55;
    else if(nb < 40) size = size_max_siblings * 0.41;
    else if(nb < 50) size = size_max_siblings * 0.35;
    else if(nb < 60) size = size_max_siblings * 0.33;
    else if(nb < 70) size = size_max_siblings * 0.3;
    else if(nb < 80) size = size_max_siblings * 0.25;
    else if(nb < 90) size = size_max_siblings * 0.22;
    else if(nb < 100) size = size_max_siblings * 0.2;
    else if(nb < 120) size = size_max_siblings * 0.17;
    else if(nb < 140) size = size_max_siblings * 0.13;
    else if(nb < 200) size = size_max_siblings * 0.08;
    else size = 0;
  }
  else if(hid === "children") {
    if(nb < 10) size = size_max_children;
    else if(nb < 20) size = size_max_children * 0.7;
    else if(nb < 30) size = size_max_children * 0.55;
    else if(nb < 40) size = size_max_children * 0.41;
    else if(nb < 50) size = size_max_children * 0.35;
    else if(nb < 60) size = size_max_children * 0.33;
    else if(nb < 70) size = size_max_children * 0.3;
    else if(nb < 80) size = size_max_children * 0.25;
    else if(nb < 90) size = size_max_children * 0.22;
    else if(nb < 100) size = size_max_children * 0.2;
    else if(nb < 120) size = size_max_children * 0.17;
    else if(nb < 140) size = size_max_children * 0.13;
    else if(nb < 200) size = size_max_children * 0.08;
    else size = 0;
  }

  return size;
}


/**
 * Fonction qui s'occupe de dessiner les enfants de l'objet courant sous
 * forme de cercles
 * @param  {CanvasSVG} svg            Canvas SVG
 * @param  {int} nb_children    Nombre d'enfants
 * @param  {circle} current_object Cercle représentant l'objet courant
 */
function drawChildren(svg, nb_children, current_object) {
  var tab_c = [];
  var placer = 0;
  var cpt_colli = 0;

  while(placer < nb_children && cpt_colli < 70) {
    // on tire les coordonées au sort :
    var x_random = Math.random() * (current_object.radius*2) + current_object.xc-current_object.radius;
    var y_random = Math.random() * (current_object.radius*2) + current_object.yc-current_object.radius;

    // on calcul le rayon des children :
    var rayon_children = 4 + scaleCircleSize(nb_children, "children");
    rayon_children = rayon_children * Math.min(svg.width, svg.height)/500;

    // si c'est contenu dans le current :
    if(current_object.contains(x_random, y_random, -rayon_children) ) {

      // ..et pas de collision :
      if( !isCollision(tab_c, x_random, y_random, rayon_children) ) {
        var child = new Circle(x_random, y_random, rayon_children, "children");
        child.draw();
        tab_c[tab_c.length] = child;
        placer++;
        cpt_colli = 0;
      }
      else
        cpt_colli++;
    }
  }
}


/**
 * Fonction qui permet de dessiner un texte sur le canvas
 * @param  {int} x     L'abscisse du texte
 * @param  {int} y     L'ordonnée du texte
 * @param  {String} color La couleur du texte
 * @param {String} texte La valeur du texte
 */
function drawText(x, y, color, texte, fontsize) {
  fontsize = fontsize || false;
  var shape = document.createElementNS("http://www.w3.org/2000/svg", "text");
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  shape.setAttributeNS(null, "fill", color);
  if(fontsize)
    shape.setAttributeNS(null, "font-size", "" + fontsize);
  shape.textContent = texte;

  document.getElementById('hierarchy').appendChild(shape);
}


/**
 * Fonction qui execute le instructions JQuery pour mettre en forme le hover
 * sur les cercles
 */
function setCircleHover() {
  // parent
  if(nb_parents > 1) {
    $(".parent:not(.last_parent)").hover(function() {
      $(".parent").css("stroke", "#EAEAEA");
      $(this).css("cursor", "pointer");
    },
    function() {
      $(".parent").css("stroke", "black");
    });
  }
  else {
    $(".parent").hover(function() {
      $(".parent").css("stroke", "#EAEAEA");
      $(this).css("cursor", "pointer");
    },
    function() {
      $(".parent").css("stroke", "black");
    });
  }

  // sibling :
  $(".sibling").hover(function() {
    $(".sibling").css("stroke-width", 1);
    $(".sibling").css("stroke", "#EAEAEA");
    $(this).css("cursor", "pointer");
  },
  function() {
    $(".sibling").css("stroke-width", 0);
    $(".sibling").css("stroke", "black");
  });

  // children :
  $(".children").hover(function() {
    $(".children").css("stroke-width", 1);
    $(".children").css("stroke", "#EAEAEA");
    $(this).css("cursor", "pointer");
  },
  function() {
    $(".children").css("stroke-width", 0);
    $(".children").css("stroke", "black");
  });
}



$(document).ready(function() {
  // nb_parents = parseInt($("#parents").html());
  // nb_siblings = parseInt($("#siblings").html());
  // nb_children = parseInt($("#children").html());

  nb_parents = 3;
  if(nb_parents > 5)
    nb_parents = 5;
  nb_siblings = 102;
  nb_children = 8000;

  var svg = new CanvasSVG($("#hierarchy"));

  var smaller_parent = drawParents(svg, nb_parents);
  var current_object = drawCurrentObject(smaller_parent);
  drawSiblings(svg, nb_siblings, smaller_parent, current_object);
  drawChildren(svg, nb_children, current_object);

  //drawText(svg.width*5.2/10, svg.height*4.5/10, "white", "This");
  // drawText(current_object.xc, current_object.yc+5, "black", "Children");
  // drawText(smaller_parent.xc, smaller_parent.yc-(svg.height/4.2), "black", "Siblings");
  // drawText(svg.width*1.5/10, svg.height*1/10, "black", "Parents");

  setCircleHover();
});
