const
rand=_=>(w=>(
	w=[...w(10,0x30),...w(26,0x41),...w(26,0x61),...'-_'],
	[...Array(10)].map(_=>w[Math.random()*64|0]).join('')
))((l,o)=>[...Array(l)].map((_,i)=>String.fromCharCode(i+o))),
links={
	// QRCode v1: 10 chars
	// chars from base64url [A-Za-z0-9\-_]
	// use rand()
	links:_=>new Response(JSON.stringify(links),{headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}}),
	ghp:{description:'GitHub Pages',Location:'https://mcbeeringi.github.io/'},

	h:{description:'HomePage',Location:'https://mcbeeringi.dev/'},
	x:{description:'X(Twitter)',Location:'https://x.com/McbeEringi'},
	g:{description:'GitHub',Location:'https://github.com/mcbeeringi'},
	m:{description:'misskey.io',Location:'https://misskey.io/@mcbeeringi'},
	q:{description:'Qiita',Location:'https://qiita.com/mcbeeringi'},

	'_1dKisX0qg':{description:'test',Location:'https://github.com/mcbeeringi'}
};

export default{
	fetch:req=>(x=>(
		x?typeof x=='function'?x():new Response(null,{status:301,headers:x}):new Response(null,{status:404})
	))(links[new URL(req.url).pathname.slice(1)])
};
