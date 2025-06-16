const
onRequest=ctx=>new Response(null,{status:301,headers:{Location:'/'}});

export{onRequest};
