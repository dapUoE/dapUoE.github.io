import{W as L,S as M,t as P,V as U,u as g,n as z,b as A,g as G,v as O,w as V,x as W,L as q}from"./three-Ct3P9eCs.js";const s=18,B=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes,uImg,uFocus;
uniform float uTime,uReveal,uDusk;
uniform vec3 uDrops[${s}];
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
vec2 cover(vec2 uv){
 float ra=uRes.x/uRes.y,ia=uImg.x/uImg.y;
 vec2 s=ra>ia?vec2(1.,ia/ra):vec2(ra/ia,1.);
 return (uv-.5)*s+.5+(uFocus-.5)*(1.-s);
}
void main(){
 float ra=uRes.x/uRes.y;
 vec2 disp=vec2(0.);
 for(int i=0;i<${s};i++){
  vec3 d=uDrops[i];float age=uTime-d.z;
  if(age<0.||age>2.6)continue;
  vec2 diff=(vUv-d.xy)*vec2(ra,1.);float dist=length(diff);
  float ring=sin(dist*42.-age*11.);
  float env=exp(-age*2.1)*exp(-dist*5.5)*(1.-smoothstep(age*.62-.02,age*.62+.12,dist));
  disp+=normalize(diff+1e-5)*ring*env*.028;
 }
 vec2 uv=cover(vUv+disp);
 float ca=length(disp)*1.6+.0008;
 vec3 col=vec3(texture2D(uTex,uv+vec2(ca,0.)).r,texture2D(uTex,uv).g,texture2D(uTex,uv-vec2(ca,0.)).b);
 // Light catches the ripple crests.
 col+=vec3(1.,.72,.55)*max(0.,dot(disp,vec2(-.7,.7)))*9.;
 // Dusk: cool the photo and sink it towards night indigo.
 vec3 night=vec3(.102,.086,.192);
 col=mix(col,mix(night,col*vec3(.55,.5,.85),.25),uDusk);
 float n=fbm(vUv*vec2(ra,1.)*4.2);
 float edge=uReveal*1.3-.15;
 float a=clamp((edge-n)*14.,0.,1.);
 float glow=smoothstep(0.,.5,a)*(1.-smoothstep(.5,1.,a));
 col=mix(col,vec3(1.,.36,.21),glow*.9);
 gl_FragColor=vec4(col,a);
}`,X="varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}";function $(a,{src:S,focus:E=[.5,.66],onReady:c}={}){const i=new L({alpha:!0,antialias:!1,powerPreference:"high-performance"});i.setPixelRatio(Math.min(devicePixelRatio,2)),i.setClearColor(0,0),a.append(i.domElement);const h=new M,C=new P(-1,1,1,-1,0,1),x=Array.from({length:s},()=>new U(-9,-9,-99)),t={uTex:{value:null},uRes:{value:new g(1,1)},uImg:{value:new g(1,1)},uFocus:{value:new g(...E)},uTime:{value:0},uReveal:{value:0},uDusk:{value:0},uDrops:{value:x}},w=new z({uniforms:t,vertexShader:X,fragmentShader:B,transparent:!0}),T=new A(new G(2,2),w);h.add(T);const y=new O;let D=!1,r=0,l=-99,v=0,u=!0,m=!1,f={x:-1,y:-1};new V().load(S,e=>{m||(e.colorSpace=W,e.minFilter=q,e.generateMipmaps=!1,t.uTex.value=e,t.uImg.value.set(e.image.width,e.image.height),D=!0,c==null||c(),n())});function I(){const e=a.clientWidth,o=a.clientHeight;i.setSize(e,o,!1),i.domElement.style.width="100%",i.domElement.style.height="100%",t.uRes.value.set(e,o),n()}function R(){r=0,!(!D||m)&&(t.uTime.value=y.getElapsedTime(),u&&!document.hidden&&i.render(h,C),t.uTime.value-l<2.7&&(r=requestAnimationFrame(R)))}function n(){r||(r=requestAnimationFrame(R))}function k(e){const o=a.getBoundingClientRect(),d=(e.clientX-o.left)/o.width,p=1-(e.clientY-o.top)/o.height;Math.hypot(d-f.x,p-f.y)<.035||(f={x:d,y:p},l=y.getElapsedTime(),x[v].set(d,p,l),v=(v+1)%s,n())}a.addEventListener("pointermove",k);const b=new ResizeObserver(I);b.observe(a);const F=new IntersectionObserver(([e])=>{u=e.isIntersecting,u&&n()});return F.observe(a),{set reveal(e){t.uReveal.value=e,n()},set dusk(e){t.uDusk.value=e,n()},dispose(){var e;m=!0,cancelAnimationFrame(r),a.removeEventListener("pointermove",k),b.disconnect(),F.disconnect(),w.dispose(),T.geometry.dispose(),(e=t.uTex.value)==null||e.dispose(),i.dispose(),i.domElement.remove()}}}export{$ as createFluidPortrait};
