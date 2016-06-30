namespace WebSharperApplication

open WebSharper

module Server =

    [<Rpc>]
    let DoSomething input =
        let rev (s: string) = System.String(Array.rev(s.ToCharArray()))
        async {
            return rev input
        }