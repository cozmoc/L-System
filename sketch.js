let angle,input1,input2;
let axiom = "F";
let sentence = axiom;
let len = 200;
let rules = [];

function generate() {
  rules[0] = {
    a: input1.value() || "F",
    b: input2.value() || "FF+[+F-F-F]-[-F+F+F]"
  }
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP('Now drawing: '+sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(800, 800);
  createElement('h2','L-System');
  createElement('h4','<a href="https://en.wikipedia.org/wiki/L-system" target="_blank">Read About L-System Here</a>');
  createElement('h3','Click Generate or Create your own rules! (use only "F + - [ ]")');
  angle = radians(25);
  createP("Rule's A:");
  input1 = createInput();
  createP("Rule's B:");
  input2 = createInput();
  input1.elt.placeholder="F";
  input2.elt.placeholder="FF+[+F-F-F]-[-F+F+F]";
  background(51);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
  createP(axiom);
}
