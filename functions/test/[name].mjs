const
onRequest=ctx=>ctx.params.name.length<4&&new Response(`Hello, ${ctx.params.name}!`)

export{onRequest};
