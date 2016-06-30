#r "packages/FAKE/tools/FakeLib.dll"
#r "packages/FSharpLint/FSharpLint.FAKE.dll"

open Fake

open FSharpLint.FAKE

Target "Lint" (fun _ ->
    !! "src/**/*.fsproj"
        |> Seq.iter (FSharpLint id)
)

Target "BuildApp" (fun _ ->
  !! "src/**/*.?sproj"
  |> MSBuildRelease "" "Build"
  |> Log "AppBuild-Output: "
)

"Lint"            
   ==> "BuildApp"

// start build
RunTargetOrDefault "BuildApp"
