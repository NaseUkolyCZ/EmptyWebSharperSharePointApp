(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Testing,Pervasives,SubtestBuilder,Runner,Concurrency,SectionBuilder,QUnit,Math,Unchecked,List,Seq,Arrays,Operators,TestBuilder,Random,NaN1,Infinity1,String;
 Runtime.Define(Global,{
  WebSharper:{
   Testing:{
    Pervasives:{
     Do:Runtime.Field(function()
     {
      return SubtestBuilder.New();
     }),
     Runner:{
      AddTest:function(t,r,asserter)
      {
       var f,x;
       f=function(args)
       {
        (t(asserter))(args);
        return args;
       };
       x=r(asserter);
       return Runner.Map(f,x);
      },
      AddTestAsync:function(t,r,asserter)
      {
       var f,x;
       f=function(args)
       {
        return Concurrency.Delay(function()
        {
         return Concurrency.Bind((t(asserter))(args),function()
         {
          return Concurrency.Return(args);
         });
        });
       };
       x=r(asserter);
       return Runner.MapAsync(f,x);
      },
      Bind:function(f,x)
      {
       var _,args,args1;
       if(x.$==1)
        {
         args=x.$0;
         _={
          $:1,
          $0:Concurrency.Delay(function()
          {
           return Concurrency.Bind(args,function(_arg1)
           {
            return Runner.ToAsync(f(_arg1));
           });
          })
         };
        }
       else
        {
         args1=x.$0;
         _=f(args1);
        }
       return _;
      },
      Map:function(f,x)
      {
       var _,args,args1;
       if(x.$==1)
        {
         args=x.$0;
         _={
          $:1,
          $0:Concurrency.Delay(function()
          {
           return Concurrency.Bind(args,function(_arg1)
           {
            return Concurrency.Return(f(_arg1));
           });
          })
         };
        }
       else
        {
         args1=x.$0;
         _={
          $:0,
          $0:f(args1)
         };
        }
       return _;
      },
      MapAsync:function(f,x)
      {
       var _,args,args1;
       if(x.$==1)
        {
         args=x.$0;
         _={
          $:1,
          $0:Concurrency.Delay(function()
          {
           return Concurrency.Bind(args,function(_arg1)
           {
            return f(_arg1);
           });
          })
         };
        }
       else
        {
         args1=x.$0;
         _={
          $:1,
          $0:f(args1)
         };
        }
       return _;
      },
      ToAsync:function(x)
      {
       var _,args,args1;
       if(x.$==1)
        {
         args=x.$0;
         _=args;
        }
       else
        {
         args1=x.$0;
         _=Concurrency.Delay(function()
         {
          return Concurrency.Return(args1);
         });
        }
       return _;
      }
     },
     Section:function(name)
     {
      return SectionBuilder.New(name);
     },
     SectionBuilder:Runtime.Class({
      Run:function(s)
      {
       QUnit.module(s.name);
       return s.run.call(null,null);
      }
     },{
      New:function(name)
      {
       var r;
       r=Runtime.New(this,{});
       r.name=name;
       return r;
      }
     }),
     SubtestBuilder:Runtime.Class({
      ApproxEqual:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Math.abs(actual1-expected1)<0.0001,actual1,expected1);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      ApproxEqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Math.abs(actual1-expected1)<0.0001,actual1,expected1,message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      Bind:function(a,f)
      {
       return function(asserter)
       {
        return{
         $:1,
         $0:Concurrency.Delay(function()
         {
          return Concurrency.Bind(a,function(_arg17)
          {
           var matchValue,_,b,b1;
           matchValue=(f(_arg17))(asserter);
           if(matchValue.$==1)
            {
             b=matchValue.$0;
             _=b;
            }
           else
            {
             b1=matchValue.$0;
             _=Concurrency.Return(b1);
            }
           return _;
          });
         })
        };
       };
      },
      DeepEqual:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.deepEqual(actual(args),expected(args));
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      DeepEqualA:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg7)
          {
           return Concurrency.Return(asserter.deepEqual(_arg7,expected1));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      DeepEqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.deepEqual(actual(args),expected(args),message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      DeepEqualMA:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg8)
          {
           return Concurrency.Return(asserter.deepEqual(_arg8,expected1,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      Equal:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Unchecked.Equals(actual1,expected1),actual1,expected1);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      EqualA:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg1)
          {
           return Concurrency.Return(asserter.push(Unchecked.Equals(_arg1,expected1),_arg1,expected1));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      EqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Unchecked.Equals(actual1,expected1),actual1,expected1,message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      EqualMA:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg2)
          {
           return Concurrency.Return(asserter.push(Unchecked.Equals(_arg2,expected1),_arg2,expected1,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      Expect:function(r,assertionCount)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.expect(assertionCount(args));
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      False:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.ok(!value(args));
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      FalseA:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          return Concurrency.Bind(value(args),function(_arg11)
          {
           return Concurrency.Return(asserter.ok(!_arg11));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      FalseM:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.ok(!value(args),message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      FalseMA:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          return Concurrency.Bind(value(args),function(_arg12)
          {
           return Concurrency.Return(asserter.ok(!_arg12,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      For:function(r,src,attempt)
      {
       return function(asserter)
       {
        var loop,f2,x1;
        loop=function(attempt1,acc,src1)
        {
         var _,l,e,r1,f;
         if(src1.$==1)
          {
           l=src1.$1;
           e=src1.$0;
           r1=attempt1(e);
           f=function(args)
           {
            var f1,x;
            f1=function()
            {
             return args;
            };
            x=r1(asserter);
            return Runner.Map(f1,x);
           };
           _=loop(attempt1,Runner.Bind(f,acc),l);
          }
         else
          {
           _=acc;
          }
         return _;
        };
        f2=function(args)
        {
         return loop(attempt(args),{
          $:0,
          $0:args
         },List.ofSeq(src(args)));
        };
        x1=r(asserter);
        return Runner.Bind(f2,x1);
       };
      },
      For1:function(r,y)
      {
       return function(asserter)
       {
        var matchValue,_,a,a1;
        matchValue=r(asserter);
        if(matchValue.$==1)
         {
          a=matchValue.$0;
          _={
           $:1,
           $0:Concurrency.Delay(function()
           {
            return Concurrency.Bind(a,function(_arg18)
            {
             var matchValue1,_1,b,b1;
             matchValue1=(y(_arg18))(asserter);
             if(matchValue1.$==1)
              {
               b=matchValue1.$0;
               _1=b;
              }
             else
              {
               b1=matchValue1.$0;
               _1=Concurrency.Return(b1);
              }
             return _1;
            });
           })
          };
         }
        else
         {
          a1=matchValue.$0;
          _=(y(a1))(asserter);
         }
        return _;
       };
      },
      ForRandom:function(r,times,gen,attempt)
      {
       return function(asserter)
       {
        var loop,x1,f2;
        loop=function(attempt1,acc,src)
        {
         var _,l,e,r1,f;
         if(src.$==1)
          {
           l=src.$1;
           e=src.$0;
           r1=attempt1(e);
           f=function(args)
           {
            var f1,x;
            f1=function()
            {
             return args;
            };
            x=r1(asserter);
            return Runner.Map(f1,x);
           };
           _=loop(attempt1,Runner.Bind(f,acc),l);
          }
         else
          {
           _=acc;
          }
         return _;
        };
        x1=r(asserter);
        f2=function(args)
        {
         var gen1,times1;
         gen1=gen(args);
         times1=times(args);
         return loop(attempt(args),{
          $:0,
          $0:args
         },Seq.toList(Seq.delay(function()
         {
          return Seq.append(Seq.map(function(i)
          {
           return Arrays.get(gen1.Base,i);
          },Operators.range(0,Arrays.length(gen1.Base)-1)),Seq.delay(function()
          {
           return Seq.map(function()
           {
            return gen1.Next.call(null,null);
           },Operators.range(1,times1));
          }));
         })));
        };
        return Runner.Bind(f2,x1);
       };
      },
      JsEqual:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.equal(actual(args),expected(args));
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      JsEqualA:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg5)
          {
           return Concurrency.Return(asserter.equal(_arg5,expected1));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      JsEqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.equal(actual(args),expected(args),message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      JsEqualMA:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg6)
          {
           return Concurrency.Return(asserter.equal(_arg6,expected1,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      NotApproxEqual:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Math.abs(actual1-expected1)>0.0001,actual1,expected1);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      NotApproxEqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(Math.abs(actual1-expected1)>0.0001,actual1,expected1,message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      NotEqual:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(!Unchecked.Equals(actual1,expected1),actual1,expected1);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      NotEqualA:function(r,actual,expected)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg3)
          {
           return Concurrency.Return(asserter.push(!Unchecked.Equals(_arg3,expected1),_arg3,expected1));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      NotEqualM:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var actual1,expected1;
         actual1=actual(args);
         expected1=expected(args);
         return asserter.push(!Unchecked.Equals(actual1,expected1),actual1,expected1,message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      NotEqualMA:function(r,actual,expected,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          var expected1;
          expected1=expected(args);
          return Concurrency.Bind(actual(args),function(_arg4)
          {
           return Concurrency.Return(asserter.push(!Unchecked.Equals(_arg4,expected1),_arg4,expected1,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      Raises:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var _,value1,matchValue;
         try
         {
          value1=value(args);
          _=asserter.ok(false,"Expected raised exception");
         }
         catch(matchValue)
         {
          _=asserter.ok(true);
         }
         return _;
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      RaisesA:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var value1;
         value1=value(args);
         return Concurrency.Delay(function()
         {
          return Concurrency.TryWith(Concurrency.Delay(function()
          {
           return Concurrency.Bind(value1,function()
           {
            return Concurrency.Return(asserter.ok(false,"Expected raised exception"));
           });
          }),function()
          {
           return Concurrency.Return(asserter.ok(true));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      RaisesM:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var _,value1,matchValue;
         try
         {
          value1=value(args);
          _=asserter.ok(false,message);
         }
         catch(matchValue)
         {
          _=asserter.ok(true,message);
         }
         return _;
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      RaisesMA:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         var value1;
         value1=value(args);
         return Concurrency.Delay(function()
         {
          return Concurrency.TryWith(Concurrency.Delay(function()
          {
           return Concurrency.Bind(value1,function()
           {
            return Concurrency.Return(asserter.ok(false,message));
           });
          }),function()
          {
           return Concurrency.Return(asserter.ok(true,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      Return:function(x)
      {
       return function()
       {
        return{
         $:0,
         $0:x
        };
       };
      },
      RunSubtest:function(r,subtest)
      {
       return function(asserter)
       {
        var f,x;
        f=function(a)
        {
         return(subtest(a))(asserter);
        };
        x=r(asserter);
        return Runner.Bind(f,x);
       };
      },
      True:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.ok(value(args));
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      TrueA:function(r,value)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          return Concurrency.Bind(value(args),function(_arg9)
          {
           return Concurrency.Return(asserter.ok(_arg9));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      TrueM:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return asserter.ok(value(args),message);
        };
       };
       return function(asserter)
       {
        return Runner.AddTest(t,r,asserter);
       };
      },
      TrueMA:function(r,value,message)
      {
       var t;
       t=function(asserter)
       {
        return function(args)
        {
         return Concurrency.Delay(function()
         {
          return Concurrency.Bind(value(args),function(_arg10)
          {
           return Concurrency.Return(asserter.ok(_arg10,message));
          });
         });
        };
       };
       return function(asserter)
       {
        return Runner.AddTestAsync(t,r,asserter);
       };
      },
      Yield:function(x)
      {
       return function()
       {
        return{
         $:0,
         $0:x
        };
       };
      },
      Zero:function()
      {
       return function()
       {
        return{
         $:0,
         $0:undefined
        };
       };
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Test:function(name)
     {
      return TestBuilder.New(name);
     },
     TestBuilder:Runtime.Class({
      Run:function(e)
      {
       return QUnit.test(this.name,function(asserter)
       {
        var _,matchValue,_1,asy,done,arg00,e1;
        try
        {
         matchValue=e(asserter);
         if(matchValue.$==1)
          {
           asy=matchValue.$0;
           done=asserter.async();
           arg00=Concurrency.Delay(function()
           {
            return Concurrency.TryFinally(Concurrency.Delay(function()
            {
             return Concurrency.TryWith(Concurrency.Delay(function()
             {
              return Concurrency.Bind(asy,function()
              {
               return Concurrency.Return(null);
              });
             }),function()
             {
              return Concurrency.Return(asserter.ok(false,"Test threw an unexpected asynchronous exception"));
             });
            }),function()
            {
             return done(null);
            });
           });
           _1=Concurrency.Start(arg00,{
            $:0
           });
          }
         else
          {
           _1=null;
          }
         _=_1;
        }
        catch(e1)
        {
         _=asserter.ok(false,"Test threw an unexpected synchronous exception");
        }
        return _;
       });
      }
     },{
      New:function(name)
      {
       var r;
       r=Runtime.New(this,SubtestBuilder.New());
       r.name=name;
       return r;
      }
     })
    },
    Random:{
     ArrayOf:function(generator)
     {
      return{
       Base:[[]],
       Next:function()
       {
        var len;
        len=Random.Natural().Next.call(null,null)%100;
        return Arrays.init(len,function()
        {
         return generator.Next.call(null,null);
        });
       }
      };
     },
     Boolean:Runtime.Field(function()
     {
      return{
       Base:[true,false],
       Next:function()
       {
        return Random.StandardUniform().Next.call(null,null)>0.5;
       }
      };
     }),
     Const:function(x)
     {
      return{
       Base:[x],
       Next:function()
       {
        return x;
       }
      };
     },
     Exponential:function(lambda)
     {
      return{
       Base:[],
       Next:function()
       {
        var p;
        p=Random.StandardUniform().Next.call(null,null);
        return-Math.log(1-p)/lambda;
       }
      };
     },
     Float:Runtime.Field(function()
     {
      return{
       Base:[0],
       Next:function()
       {
        var sign;
        sign=Random.Boolean().Next.call(null,null)?1:-1;
        return sign*Random.Exponential(0.1).Next.call(null,null);
       }
      };
     }),
     FloatExhaustive:Runtime.Field(function()
     {
      return{
       Base:[0,NaN1,Infinity1,-Infinity1],
       Next:function()
       {
        return Random.Float().Next.call(null,null);
       }
      };
     }),
     FloatWithin:function(low,hi)
     {
      return{
       Base:[low,hi],
       Next:function()
       {
        return low+(hi-low)*Math.random();
       }
      };
     },
     Implies:function(a,b)
     {
      return!a?true:b;
     },
     Imply:function(a,b)
     {
      return Random.Implies(a,b);
     },
     Int:Runtime.Field(function()
     {
      return{
       Base:[0,1,-1],
       Next:function()
       {
        return Math.round(Random.Float().Next.call(null,null));
       }
      };
     }),
     ListOf:function(generator)
     {
      var f,gen;
      f=function(array)
      {
       return List.ofArray(array);
      };
      gen=Random.ArrayOf(generator);
      return Random.Map(f,gen);
     },
     Map:function(f,gen)
     {
      var f1;
      f1=gen.Next;
      return{
       Base:Arrays.map(f,gen.Base),
       Next:function(x)
       {
        return f(f1(x));
       }
      };
     },
     Mix:function(a,b)
     {
      var left;
      left=[false];
      return{
       Base:a.Base.concat(b.Base),
       Next:function()
       {
        left[0]=!left[0];
        return left[0]?a.Next.call(null,null):b.Next.call(null,null);
       }
      };
     },
     Natural:Runtime.Field(function()
     {
      var g;
      g=Random.Int().Next;
      return{
       Base:[0,1],
       Next:function(x)
       {
        var value;
        value=g(x);
        return Math.abs(value);
       }
      };
     }),
     OneOf:function(seeds)
     {
      var index;
      index=Random.Within(1,Arrays.length(seeds));
      return{
       Base:seeds,
       Next:function()
       {
        return Arrays.get(seeds,index.Next.call(null,null)-1);
       }
      };
     },
     OptionOf:function(generator)
     {
      return Random.Mix(Random.Const({
       $:0
      }),Random.Map(function(arg0)
      {
       return{
        $:1,
        $0:arg0
       };
      },generator));
     },
     StandardUniform:Runtime.Field(function()
     {
      return{
       Base:[],
       Next:function()
       {
        return Math.random();
       }
      };
     }),
     String:Runtime.Field(function()
     {
      return{
       Base:[""],
       Next:function()
       {
        var len,cs;
        len=Random.Natural().Next.call(null,null)%100;
        cs=Arrays.init(len,function()
        {
         return Random.Int().Next.call(null,null)%256;
        });
        return String.fromCharCode.apply(undefined,cs);
       }
      };
     }),
     StringExhaustive:Runtime.Field(function()
     {
      return{
       Base:[null,""],
       Next:Random.String().Next
      };
     }),
     Tuple2Of:function(a,b)
     {
      return{
       Base:Seq.toArray(Seq.delay(function()
       {
        return Seq.collect(function(x)
        {
         return Seq.map(function(y)
         {
          return[x,y];
         },b.Base);
        },a.Base);
       })),
       Next:function()
       {
        return[a.Next.call(null,null),b.Next.call(null,null)];
       }
      };
     },
     Tuple3Of:function(a,b,c)
     {
      return{
       Base:Seq.toArray(Seq.delay(function()
       {
        return Seq.collect(function(x)
        {
         return Seq.collect(function(y)
         {
          return Seq.map(function(z)
          {
           return[x,y,z];
          },c.Base);
         },b.Base);
        },a.Base);
       })),
       Next:function()
       {
        return[a.Next.call(null,null),b.Next.call(null,null),c.Next.call(null,null)];
       }
      };
     },
     Within:function(low,hi)
     {
      return{
       Base:[low,hi],
       Next:function()
       {
        return Random.Natural().Next.call(null,null)%(hi-low)+low;
       }
      };
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Testing=Runtime.Safe(Global.WebSharper.Testing);
  Pervasives=Runtime.Safe(Testing.Pervasives);
  SubtestBuilder=Runtime.Safe(Pervasives.SubtestBuilder);
  Runner=Runtime.Safe(Pervasives.Runner);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  SectionBuilder=Runtime.Safe(Pervasives.SectionBuilder);
  QUnit=Runtime.Safe(Global.QUnit);
  Math=Runtime.Safe(Global.Math);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  List=Runtime.Safe(Global.WebSharper.List);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Operators=Runtime.Safe(Global.WebSharper.Operators);
  TestBuilder=Runtime.Safe(Pervasives.TestBuilder);
  Random=Runtime.Safe(Testing.Random);
  NaN1=Runtime.Safe(Global.NaN);
  Infinity1=Runtime.Safe(Global.Infinity);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(TestBuilder,SubtestBuilder);
  Random.StringExhaustive();
  Random.String();
  Random.StandardUniform();
  Random.Natural();
  Random.Int();
  Random.FloatExhaustive();
  Random.Float();
  Random.Boolean();
  Pervasives.Do();
  return;
 });
}());
