const
rand=_=>(w=>(
	w=[...w(10,0x30),...w(26,0x41),...w(26,0x61),...'-_'],
	[...Array(10)].map(_=>w[Math.random()*64|0]).join('')
))((l,o)=>[...Array(l)].map((_,i)=>String.fromCharCode(i+o))),
links={
	// QRCode v1: 10 chars
	// chars from base64url [A-Za-z0-9\-_]
	// use rand()
	'_1dKisX0qg':{description:'test',Location:'https://github.com/mcbeeringi'}
},
onRequest=ctx=>new Response(...({
	links:_=>[JSON.stringify(links),{headers:{'Content-Type':'application/json'}}]
}[ctx.params.name]||(i=>(
	links[i]?[null,{status:302,headers:links[i]}]:
	[`Hello, ${i}!`]
)))(ctx.params.name));

export{onRequest};
