"use strict";

//Utility module for mygame
var Util = {
    seed : Math.random(),     //not ideal since not private
            
    random : function (newSeed){   //[0 - 1.0)  optional seeding     
        if(newSeed) Util.seed = newSeed;        
        
        Util.seed = (Util.seed*9301 + 49297) % 233280;
        var ret = Util.seed/233280;
        if(ret>=1) ret = .99999;  //maybe rounding error?
        return ret;
    },
     
    drawRotatedImage: function (ctx,theta,image,x,y,wid,ht){
    //using context ctx, draws image rotated theta radians cw and
    //scaled to wid, ht  with its ulc at x, y, 
        var xcen = x+wid/2, ycen = y+ht/2;
        ctx.save(); 
        ctx.translate(xcen,ycen); ctx.rotate(theta); ctx.translate(-xcen,-ycen);        
        ctx.drawImage(image,x,y, wid,ht);
        ctx.restore();
    },
    getCookie: function(name){  //return value of cookie with givn name (or "")
	    if(document.cookie.length>0){
            let s=document.cookie.indexOf(name+"=");
            if(s!=-1){
		        s = s + name.length+1;
		        let e = document.cookie.indexOf(";",s);
		        if(e==-1) e=document.cookie.length;
		        return unescape(document.cookie.substring(s,e));
            }
	    }
	    return "";
    }
    
};
  