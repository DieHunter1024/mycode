// define(['c'],function(c) {
//     return {
//         a:10,
//         b:20,
//         c:function () {
            
//             return this.a*this.b*c.a;
//         }
//     };
// });

define(['c'],function(cc){
        return {
            b:2,
            add:function() {
                return this.b*cc.c;
            }
        };
    }
  );