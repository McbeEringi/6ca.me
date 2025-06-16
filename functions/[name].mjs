const
onRequest=ctx=>new Response(...({
	links:_=>[JSON.stringfy('link table goes here...'),{headers:{'Content-Type':'application/json'}}]
}[ctx.params.name]||(_=>`Hello, ${ctx.params.name}!`))());

export{onRequest};
