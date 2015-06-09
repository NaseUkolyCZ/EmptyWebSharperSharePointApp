declare module WebSharperApplication {
    module Skin {
        interface Page {
            Title: string;
            Body: __ABBREV.__List.T<any>;
        }
    }
    module Controls {
        interface EntryPoint {
            get_Body(): __ABBREV.__Client.IControlBody;
        }
    }
    module Client {
        var Start : {
            (input: string, k: {
                (x: string): void;
            }): void;
        };
        var Main : {
            (): __ABBREV.__Client.Element;
        };
    }
    interface Action {
    }
    interface Website {
    }
}
declare module __ABBREV {
    
    export import __List = WebSharper.List;
    export import __Client = WebSharper.Html.Client;
}
