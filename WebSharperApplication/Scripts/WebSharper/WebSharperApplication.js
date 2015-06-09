(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,List,Html,Client,Attr,Tags,WebSharperApplication,Client1,EventsPervasives,Remoting,AjaxRemotingProvider,Concurrency;
 Runtime.Define(Global,{
  WebSharperApplication:{
   Client:{
    Main:function()
    {
     var x,_this,_this1,input,x1,_this2,label,x2,x3,_this3,x4,x5,_this4;
     _this=Attr.Attr();
     x=List.ofArray([_this.NewAttr("value","")]);
     _this1=Tags.Tags();
     input=_this1.NewTag("input",x);
     x1=List.ofArray([Tags.Tags().text("")]);
     _this2=Tags.Tags();
     label=_this2.NewTag("div",x1);
     x3=List.ofArray([Tags.Tags().text("Click")]);
     _this3=Tags.Tags();
     x4=_this3.NewTag("button",x3);
     x5=function()
     {
      return function()
      {
       return Client1.Start(input.get_Value(),function(out)
       {
        return label.set_Text(out);
       });
      };
     };
     EventsPervasives.Events().OnClick(x5,x4);
     x2=List.ofArray([input,label,x4]);
     _this4=Tags.Tags();
     return _this4.NewTag("div",x2);
    },
    Start:function(input,k)
    {
     var f,arg00,t;
     f=function()
     {
      var x,f1;
      x=AjaxRemotingProvider.Async("WebSharperApplication:0",[input]);
      f1=function(_arg1)
      {
       var x1;
       x1=k(_arg1);
       return Concurrency.Return(x1);
      };
      return Concurrency.Bind(x,f1);
     };
     arg00=Concurrency.Delay(f);
     t={
      $:0
     };
     return Concurrency.Start(arg00,t);
    }
   },
   Controls:{
    EntryPoint:Runtime.Class({
     get_Body:function()
     {
      return Client1.Main();
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  WebSharperApplication=Runtime.Safe(Global.WebSharperApplication);
  Client1=Runtime.Safe(WebSharperApplication.Client);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  return Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
