class FMSynth
extends AudioWorkletProcessor{
	constructor(){
		super();
		this.t=[0,0];
	}
	static get parameterDescriptors(){
		return[
			{
				name:'frequency',
				defaultValue:440,
				minValue:0,
				maxValue:20_000,
				automationRate:'a-rate',
			},
			{
				name:'n',
				defaultValue:2,
				minValue:0,
				maxValue:8,
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

		o.forEach((_,i,a,t=(i+currentFrame)/sampleRate)=>(
			this.t=this.t.map((x,j)=>(x+1/sampleRate*param('frequency',i)*(j?param('n',i):1))%1),
			a[i]=(
				f(this.t[0]+f(this.t[1]))
			)*.2)
		);
		outs.flat(1/0).slice(1).forEach(x=>x.set(o));
		return true;
	}
}

registerProcessor(FMSynth.name,FMSynth);
