#!/bin/env -S bun
import{cp}from'node:fs/promises'
import{dirname,sep}from'node:path';
import links from'./links.mjs'
cp('src','dst',{recursive:1});
await Bun.write(
	'dst/_redirects',
	links.map(({name,src,dst,code})=>`${src}#${name.replace(/\s/g,'_')} ${dst} ${code}`).join('\n')
);

await Bun.write(
	'dst/index.html',
	new HTMLRewriter().on('div.links',{element:e=>e.append(
		links.map(x=>decodeURIComponent(e.getAttribute('tmpl')).replace(/{{(.+?)}}/g,(_,i)=>x[i])).join('\n'),
		{html:1}
	)}).transform(await Bun.file('dst/index.html').text())
);
