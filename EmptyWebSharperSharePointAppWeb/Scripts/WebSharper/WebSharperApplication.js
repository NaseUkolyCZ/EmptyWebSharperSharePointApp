(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,List,Html,Client,Attr,Tags,WebSharperApplication,Client1,EventsPervasives,Concurrency,Remoting,AjaxRemotingProvider;
 Runtime.Define(Global,{
  WebSharperApplication:{
   Client:{
    Main:function()
    {
     var x,input,x1,label,arg10,arg101,x2,arg00;
     x=List.ofArray([Attr.Attr().NewAttr("value","")]);
     input=Tags.Tags().NewTag("input",x);
     x1=List.ofArray([Tags.Tags().text("")]);
     label=Tags.Tags().NewTag("div",x1);
     arg101=List.ofArray([Tags.Tags().text("Click")]);
     x2=Tags.Tags().NewTag("button",arg101);
     arg00=function()
     {
      return function()
      {
       return Client1.Start(input.get_Value(),function(out)
       {
        return label.set_Text(out);
       });
      };
     };
     EventsPervasives.Events().OnClick(arg00,x2);
     arg10=List.ofArray([input,label,x2]);
     return Tags.Tags().NewTag("div",arg10);
    },
    Start:function(input,k)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(AjaxRemotingProvider.Async("WebSharperApplication:0",[input]),function(_arg1)
      {
       return Concurrency.Return(k(_arg1));
      });
     }),{
      $:0
     });
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
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  return AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
