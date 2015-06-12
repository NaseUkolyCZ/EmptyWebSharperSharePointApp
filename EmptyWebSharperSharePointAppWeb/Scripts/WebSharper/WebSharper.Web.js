(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Arrays,window;
 Runtime.Define(Global,{
  WebSharper:{
   Web:{
    InlineControl:Runtime.Class({
     get_Body:function()
     {
      var f;
      f=Arrays.fold(function(obj)
      {
       return function(field)
       {
        return obj[field];
       };
      },window,this.funcName);
      return f.apply(null,this.args);
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  return window=Runtime.Safe(Global.window);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
