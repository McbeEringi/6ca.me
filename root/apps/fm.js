class FMSynth
extends AudioWorkletProcessor{
	static get parameterDescriptors(){
		return[
			{
				name:'frequency',
				defaultValue:440,
				minValue:0,
				// maxValue:1/0,
				automationRate:'a-rate',
			},
			{
				name:'n',
				defaultValue:2,
				minValue:0,
				maxValue:10,
				automationRate:'a-rate',
			},
		];
  }
	process(inps,outs,params){
		const
		o=outs[0]?.[0],
		cos=x=>Math.cos(x*Math.PI*2),
		tri=x=>Math.abs(-4*(x%1)+2)-1,
		param=(x,i)=>params[x]?.[i]??params[x][0],
		f=cos;

		o.forEach((_,i,a,t=(i+currentFrame)/sampleRate)=>a[i]=(
			f(
				t*param('frequency',i)
					+f(t*param('frequency',i)*param('n',i))
			)
			// +f(t*445)
		)*.5);
		outs.flat(1/0).slice(1).forEach(x=>x.set(o));
		return true;
	}
}

registerProcessor(FMSynth.name,FMSynth);
