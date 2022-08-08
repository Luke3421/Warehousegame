"use strict";   //forces declaration of the scope of names

//Game is a constructor for a game board.
//A game has a rectangular arrary of crateweights and a location for the bobcat that pushes them around.
//            it has methods move(dir)  to move the bobcat around,
//                            toString to show the gameboard as formatted text

//this version requires execution in an html file containing a div with id "myText" for displaying
 
let Game = function (seed) {  //THIS IS A CONSTRUCTOR FOR A GAME OBJECT it must be called us new
    
    //private game data
    let n = parseInt(Util.random(seed)*5) + 8;     //number of rows and columns
    let b = [ ];      //initb (below) initializes to random weights and n x n
    let bob = { };    //the bob has a row,column, and direction (use 0=North,1=E,2=S,3=W)
    let tgt = { };
    let score = 0;
    let ex = 100;

    bob.r=n-1; bob.c= parseInt(Util.random() * n); bob.d=0;
    tgt.r = parseInt(Util.random()*(n-2)) + 1;
    tgt.c = parseInt(Util.random()*(n-2)) + 1;

    let wtprob = [.5, .75, .875];
    for (let i = 0; i < n; i++){
      b[i] = [];
      for(let j = 0; j < n; j++){
        let rnd = Util.random();
        if(rnd <wtprob[0] )      b[i][j] = 0;
        else if(rnd <wtprob [1]) b[i][j] = 1;
        else if(rnd <wtprob [2]) b[i][j] = 2;
        else                     b[i][j] = 3;

    }
  }

  b[tgt.r][tgt.c] = b[tgt.r][tgt.c]+5;
  b[bob.r][bob.c]=0;
  let goal = {r: bob.r, c:bob.c};
    //=====================================================================================
    let inBounds = function(nextr, nextc){
    return nextr < n && 0 <= nextr && nextc < n && 0 <= nextc;
  }

    let slide = function (d) {  //slides the crates & returns true (or returns false)
        let allowedWt = 3;
        let dr = [-1, 0, 1, 0];    //nesw
        let dc = [0, 1, 0, -1];
        let i, rr, cc;
        let wt = 0;    //amount of wieght we are pushing
        for (i = 1; true; i++) {
            rr = bob.r + i * dr[d];
            cc = bob.c + i * dc[d];
            if(!inBounds(rr, cc)) return false;
            if (b[rr][cc] <= allowedWt) {
                var tempW = b[rr][cc];
            } else {
                var tempW = b[rr][cc] - 5;
            }

            if(wt + tempW > allowedWt) {
                return false;
            }
            if (b[rr][cc] === 0)
                break;    //can slide them i squares
            wt = wt + tempW;
        }
        // now move the crates, starting at the final cell,  rr,cc
        for (let j = 0; j < i; j++) {   //slide the right number of  times
            let rprev = rr - dr[d];
            let cprev = cc - dc[d];
            b[rr][cc] = b[rprev][cprev];
            rr = rprev;
            cc = cprev;
        }
        return true;
    }


    // ===========  public methods  =================
    //Game.prototype.move = function (dirch){   is an alternative approach for a public method
    this.move = function(dirch){
        //dirch is converted to  0123 meaning NESW
        let d=-1;
        if(dirch===87) d=0;   //w
        if(dirch===65) d=3;   //a
        if(dirch===83) d=2;   //s
        if(dirch===68) d=1;   //d
        if(dirch===32) d = bob.d;
        if(d<0) return;       //ignore bad keys

        let dr = [-1, 0, 1,  0];    //nesw
        let dc = [ 0, 1, 0, -1];

        let nextr = bob.r+dr[d];
        let nextc = bob.c+dc[d];


        if(dirch === 32){
            if(inBounds(nextr, nextc) && b[nextr][nextc] > 0 && b[nextr][nextc] <= 3 ){
                score += ex - 1;
                b[bob.r + dr[bob.d]][bob.c+ dc[bob.d]] = 0
            }
        }
        else if(d===bob.d ){   //move the bob one cell in its direction
            if(slide(bob.d)){
                bob.r += dr[d];
                bob.c += dc[d];
          }

				}

        else if (d !== (bob.d+2)%4){  //90 degree pivot
            bob.d = d;
        }
        if(b[goal.r][goal.c] >4){
          alert("You won!");
          document.onkeydown = ()=>{};
          
        }

        score++;

    }

    this.getScore = function (){
      //alert(score = "score");
      return score;

    };  //this is a stub

    Game.prototype.toString = function(){  //public method of Game
        let out = "";
        for(let r=0; r<n; r++){
            for(let c=0; c<n; c++){
                if(r===bob.r && c===bob.c){
                    if     (bob.d===0) out = out + "^";
                    else if(bob.d===1) out = out + ">";
                    else if(bob.d===2) out = out + "v";
                    else               out = out + "<";
                }
                else  out = out + b[r][c];
            }
            out = out + "\n";
        }
        return "<pre>" + out + "</pre>";   //avoid browser formatting
    };
    const createImage = function(src){
      let img = document.createElement('img');
      img.src = src;
      img.width = 50;
      img.height = 50;
      return img;
};
    Game.prototype.draw = function(){
      //table
      let table = document.createElement('table');
      table.setAttribute('id',"mytable");
      for(let r=0; r<n; r++){
        let row = table.insertRow(r);
        for(let c=0; c<n; c++){
          let col = row.insertCell(c);
          if(b[r][c] == 1){
            var img = createImage('crate1x.png');
          }
         if(b[r][c] == 2){
            var img = createImage('crate2x.png');

          }
         if(b[r][c] == 3){
            var img = createImage('crate3x.png');

          }
          if(b[r][c] == 0){
            var img = createImage('empty.png');

          }
          if( r === bob.r && c === bob.c){
            var img = createImage('mydozernorth.png');
            img.style.transform = "rotate(" + bob.d*90 +"deg)"
          }
          if(b[r][c]>4){
              if(b[tgt.r][tgt.c] - 5 == 3){
                 var img = createImage('tgtcrate3.png'); 
              }
              else if (b[tgt.r][tgt.c] - 5 == 2){
                  var img = createImage('tgtcrate2.png'); 
              }
              else{
                  var img = createImage('tgtcrate2.png'); 
              }
            

          }
          col.appendChild(img);
        }
      }

//find which Image
//if blah then blah
// var src
// 0  1   2  3      * 90


document.getElementById('State').innerHTML = "";
document.getElementById('State').appendChild(table);
    }

};       //=========== end Game ================


//=======================================================================
let viewText = function(brd){   //show in existing div myText
    let inner = "<h1>" + brd.toString() + "</h1>";
    let score = "<h3>" + brd.getScore() + "<h3>";
    document.getElementById("myText").innerHTML = inner;
    document.getElementById("score").innerHTML = score;


};

function go(){     //called when the window has finished loading
    console.log("onload");
    
    let brd = new Game(handleSeed());
    document.getElementById("score").innerHTML = "<h3>" + brd.getScore() + "<h3>";
        //random seeding
    document.onkeydown =  function (ev){  //keydown event
        console.log("down ");
        let key = ev.keyCode;
        brd.move(key);
        document.getElementById("score").innerHTML = "<h3>" + brd.getScore() + "<h3>";
        brd.draw();
    };
  
    brd.draw();
    
    
    
    function handleSeed(){
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.has('seed')){ 
            var seed = urlParams.get('seed');
        }else{
            var seed = parseInt(Math.random()*100000);
            window.location.replace("index.html?seed=" +seed);
        }
        document.getElementById("restart").href = "index.html?seed=" +seed;
        return seed;
    }
};
