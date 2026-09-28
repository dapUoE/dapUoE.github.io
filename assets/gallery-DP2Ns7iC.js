import{W,S as G,P as q,g as I,w as V,n as _,u as D,b as $,x as X,k as g,y as Y}from"./three-Ct3P9eCs.js";const J=`
uniform float uBend,uActive;
varying vec2 vUv;
void main(){
 vUv=uv;vec3 p=position;
 p.z+=(sin(uv.x*3.14159)*.7+sin(uv.y*3.14159)*.3)*uBend*.9;
 p.z+=sin(uv.x*3.14159)*.08*uActive;
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
}`,K=`
precision highp float;
uniform sampler2D uTex;
uniform float uOffset,uFrac,uActive,uBend,uReady,uHover;
uniform vec2 uSize;
varying vec2 vUv;
void main(){
 vec2 q=abs(vUv-.5)*uSize-(uSize*.5-uSize.y*.035);
 float d=length(max(q,0.))-uSize.y*.035;
 float alpha=1.-smoothstep(0.,uSize.y*.004,d);
 float v=1.-(uOffset*(1.-uFrac)+(1.-vUv.y)*uFrac);
 vec2 uv=vec2(vUv.x,v);
 float shift=uBend*.02;
 vec3 col=vec3(texture2D(uTex,uv+vec2(shift,0.)).r,texture2D(uTex,uv).g,texture2D(uTex,uv-vec2(shift,0.)).b);
 float g=dot(col,vec3(.299,.587,.114));
 col=mix(vec3(g)*.5,col,.3+.7*uActive)*(.5+.5*uActive);
 col+=vec3(1.,.55,.4)*uHover*.06*(1.-vUv.y);
 gl_FragColor=vec4(col,alpha*uReady);
}`;function Q(i,{sites:b,onHover:u,onSelect:w}){const o=new W({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),i.append(o.domElement);const z=new G,v=new q(30,1,.1,100);v.position.z=10;const S=new I(1,1,40,24),l=i.clientWidth<760,m=l?370/800:1.6,j=new V,d=b.map((t,e)=>{const a={uTex:{value:null},uOffset:{value:0},uFrac:{value:.2},uActive:{value:0},uBend:{value:0},uReady:{value:0},uHover:{value:0},uSize:{value:new D(1.6,1)}},r=new _({uniforms:a,vertexShader:J,fragmentShader:K,transparent:!0}),n=new $(S,r);return n.userData.index=e,z.add(n),j.load(`/assets/sites/${t.key}-${l?"phone-strip":"strip"}.jpg`,s=>{s.colorSpace=X,s.anisotropy=Math.min(8,o.capabilities.getMaxAnisotropy()),a.uTex.value=s,a.uFrac.value=s.image.width/m/s.image.height,a.uReady.value=1,p=!0}),{mesh:n,uniforms:a}});let R=0,f=0,x=0,h=-1,y=!1,M=0,p=!0,c={w:1.6,h:1,spacing:2};function E(){const t=i.clientWidth,e=i.clientHeight;o.setSize(t,e),v.aspect=t/e,v.updateProjectionMatrix();const a=2*Math.tan(g.degToRad(15))*v.position.z,r=a*v.aspect,n=l?Math.min(a*.56,r*.6/m):Math.min(a*.58,r*.8/m);c={w:n*m,h:n,spacing:n*m*(l?1.14:1.08)},d.forEach(s=>{s.mesh.scale.set(c.w,c.h,1),s.uniforms.uSize.value.set(c.w,c.h)}),p=!0}function C(){const t=R*(b.length-1);d.forEach((e,a)=>{const r=a-t,n=Math.abs(r);e.mesh.position.set(r*c.spacing,c.h*(l?.1:.04),-Math.min(n,2)*1.1),e.mesh.rotation.y=-g.clamp(r,-1.5,1.5)*.32;const s=1-Math.min(n,1)*.12;e.mesh.scale.set(c.w*s,c.h*s,1),e.uniforms.uActive.value=1-Math.min(n,1),e.uniforms.uOffset.value=g.clamp(t-a+.5,0,1),e.uniforms.uBend.value=f,e.uniforms.uHover.value+=((h===a?1:0)-e.uniforms.uHover.value)*.15})}function A(){f+=(x-f)*.09,x*=.9,(p||Math.abs(f)>5e-4||d.some(t=>t.uniforms.uHover.value>.001))&&(C(),o.render(z,v),p=!1),M=y?requestAnimationFrame(A):0}const T=new Y,F=new D;function B(t){const e=i.getBoundingClientRect();F.set((t.clientX-e.left)/e.width*2-1,-(t.clientY-e.top)/e.height*2+1),T.setFromCamera(F,v);const a=T.intersectObjects(d.map(r=>r.mesh))[0];return a?a.object.userData.index:-1}const L=t=>{const e=B(t);e!==h&&(h=e),u==null||u(e,t)},U=()=>{h=-1,u==null||u(-1)},k=t=>{const e=B(t);e>=0&&(w==null||w(e))};i.addEventListener("pointermove",L),i.addEventListener("pointerleave",U),i.addEventListener("click",k);const O=new ResizeObserver(E);O.observe(i);const P=new IntersectionObserver(([t])=>{y=t.isIntersecting,y&&!M&&A()});return P.observe(i),E(),{update(t,e=0){R=t,x=g.clamp(e/2600,-1,1),p=!0},dispose(){cancelAnimationFrame(M),O.disconnect(),P.disconnect(),i.removeEventListener("pointermove",L),i.removeEventListener("pointerleave",U),i.removeEventListener("click",k),d.forEach(t=>{var e;(e=t.uniforms.uTex.value)==null||e.dispose(),t.mesh.material.dispose()}),S.dispose(),o.dispose(),o.domElement.remove()}}}export{Q as createGallery};
