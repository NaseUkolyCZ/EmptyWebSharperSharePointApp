namespace WebSharperApplication 

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI.Next
open WebSharper.UI.Next.Server
open SharePointContext
open System.Web
open System.Linq.Expressions

type Expr = 
  static member Quote<'a>(e:Expression<System.Func<'a, obj>>) = e
  
type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Next.Html

    type MainTemplate = Templating.Template<"Main.html">

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<EndPoint>) endpoint : Doc list =
        let ( => ) txt act =
             liAttr [if endpoint = act then yield attr.``class`` "active"] [
                aAttr [attr.href (ctx.Link act)] [text txt]
             ]
        [
            li ["Home" => EndPoint.Home]
            li ["About" => EndPoint.About]
        ]

    let Main ctx action title body =
        Content.Page(
            MainTemplate.Doc(
                title = title,
                menubar = MenuBar ctx action,
                body = body,
                my_scripts = [ Doc.Verbatim JavaScript.Content ]
            )
        )

module Site =
    open WebSharper.UI.Next.Html
    open Microsoft.SharePoint.Client

    let SharePointContextUser () =
        let spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext.Current)
        use clientContext = spContext.CreateUserClientContextForSPHost()
        let spUser = clientContext.Web.CurrentUser;
        clientContext.Load<Microsoft.SharePoint.Client.User>(
            spUser, 
            Expr.Quote<Microsoft.SharePoint.Client.User>( fun user -> upcast user.Title) 
        );
        clientContext.ExecuteQuery();
        spUser

    let getSomeData () =
        let spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext.Current)
        use clientContext = spContext.CreateUserClientContextForSPHost()
        let web = clientContext.Web
        clientContext.Load(web)
        clientContext.ExecuteQuery();
        let lists = web.Lists
        clientContext.Load<ListCollection>(lists)
        clientContext.ExecuteQuery();
        lists

    let HomePage ctx =
        Templating.Main ctx EndPoint.Home "Home" [
            h1 [text (sprintf "%s, say hi to the server with %d lists!" (SharePointContextUser().Title) (getSomeData().Count) ) ]
            div [client <@ Client.Main() @>]
        ]

    let AboutPage ctx =
        Templating.Main ctx EndPoint.About "About" [
            h1 [text "About"]
            p [text "This is a template WebSharper client-server application."]
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
            | EndPoint.About -> AboutPage ctx
        )
