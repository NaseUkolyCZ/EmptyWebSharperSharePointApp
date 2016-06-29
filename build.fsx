#r "packages/FAKE/tools/FakeLib.dll"
open Fake

Target "BuildApp" (fun _ ->
  !! "src/**/*.?sproj"
  |> MSBuildRelease "" "Build"
  |> Log "AppBuild-Output: "
)

// start build
RunTargetOrDefault "BuildApp"
