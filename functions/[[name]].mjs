const
onRequest=ctx=>new Response(null,{status:302,headers:{Location:'/'}});

export{onRequest};
