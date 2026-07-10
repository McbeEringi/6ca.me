class FMSynth
extends AudioWorkletProcessor{
	constructor(){
		super();
		this.t=[0,0,0,0,0,0];
		this.fb=0;
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
			// {
			// 	name:'n',
			// 	defaultValue:2,
			// 	minValue:0,
			// 	maxValue:8,
			// 	automationRate:'a-rate',
			// },
		];
  }
	process(inps,outs,params){
		const
		o=outs[0]?.[0],
		pi2=Math.PI*2,
		cos=x=>Math.cos(x),
		tri=x=>Math.abs(-4*(x/pi2%1)+2)-1,
		param=(x,i)=>params[x]?.[i]??params[x][0],
		f=cos;

		o.forEach((_,i,a,t=(i+currentFrame)/sampleRate)=>(
			a[i]=(
				f(this.t[0]*pi2+f(this.t[1]*pi2)*.8)+
				f(this.t[2]*pi2+f(this.t[3]*pi2)*.8)+
				f(this.t[4]*pi2+(this.fb=f(this.t[5]*pi2+this.fb*1)*.8))
			)*.2,
			this.t=this.t.map((x,j)=>(
				x+1/sampleRate*(param('frequency',i)*[1,14,1,1,1,1][j]+[3,0,0,0,-7,0][j])//(j?param('n',i):1)
			)%1)
		));
		outs.flat(1/0).slice(1).forEach(x=>x.set(o));
		return true;
	}
}

registerProcessor(FMSynth.name,FMSynth);
