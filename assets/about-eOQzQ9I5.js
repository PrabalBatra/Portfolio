import{r as k,j as p}from"./index-B2tGQ8w8.js";import{u as Xe,S as qe,R as Q}from"./usePortfolioData-snMD7UJz.js";import{V as D,U as Z,S as N,D as Ke,a as $e,b as Qe,F as Ye,W as X,L as z,B as ee,E as Ie,c as De,N as Pe,d as le,O as Ne,M as Fe,C as Oe,e as Y,f as J,g as te,h as Je,i as Ge,j as S,R as Ze,P as et,k as Ue,T as ue,A as tt,l as st,m as Re,n as rt,G as it,o as nt,p as at}from"./three.module-DnzDCefj.js";import{S as ot}from"./SectionDissolve-Oaa_ldSk.js";var lt=(()=>{const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),s=new st;return s.setAttribute("position",new Re(e,3)),s.setAttribute("uv",new Re(t,2)),s})(),G=class ce{static get fullscreenGeometry(){return lt}constructor(t="Pass",s=new le,r=new Ne){this.name=t,this.renderer=null,this.scene=s,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const s=this.fullscreenMaterial;s!==null&&(s.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let s=this.screen;s!==null?s.material=t:(s=new Fe(ce.fullscreenGeometry,t),s.frustumCulled=!1,this.scene===null&&(this.scene=new le),this.scene.add(s),this.screen=s)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,s=ee){}render(t,s,r,i,n){throw new Error("Render method not implemented!")}setSize(t,s){}initialize(t,s,r){}dispose(){for(const t of Object.keys(this)){const s=this[t];(s instanceof X||s instanceof Ue||s instanceof ue||s instanceof ce)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},ct=class extends G{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,s,r,i){const n=e.state.buffers.stencil;n.setLocked(!1),n.setTest(!1)}},ut=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,dt="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ft=class extends te{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new S(null),depthBuffer:new S(null),channelWeights:new S(null),opacity:new S(1)},blending:Ge,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ut,vertexShader:dt}),this.depthFunc=tt}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){const t=e!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){const t=e!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){e!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},ht=class extends G{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ft,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new X(1,1,{minFilter:z,magFilter:z,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,s,r,i){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==Z?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===N&&(this.renderTarget.texture.colorSpace=N))}},Ce=new Oe,Le=class extends G{constructor(e=!0,t=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,s){this.color=e,this.depth=t,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,s,r,i){const n=this.overrideClearColor,a=this.overrideClearAlpha,o=e.getClearAlpha(),c=n!==null,E=a>=0;c?(e.getClearColor(Ce),e.setClearColor(n,E?a:o)):E&&e.setClearAlpha(a),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),c?e.setClearColor(Ce,o):E&&e.setClearAlpha(o)}},pt=class extends G{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new Le(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,s,r,i){const n=e.getContext(),a=e.state.buffers,o=this.scene,c=this.camera,E=this.clearPass,A=this.inverted?0:1,C=1-A;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.stencil.setFunc(n.ALWAYS,A,4294967295),a.stencil.setClear(C),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?E.render(e,null):(E.render(e,t),E.render(e,s))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,c)):(e.setRenderTarget(t),e.render(o,c),e.setRenderTarget(s),e.render(o,c)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(n.EQUAL,1,4294967295),a.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.stencil.setLocked(!0)}},ne=1/1e3,mt=1e3,vt=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*ne}get fixedDelta(){return this._fixedDelta*ne}set fixedDelta(e){this._fixedDelta=e*mt}get elapsed(){return this._elapsed*ne}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},_e=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:s=!1,multisampling:r=0,frameBufferType:i}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,s,i,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new ht,this.depthTexture=null,this.depthRenderTarget=null,this.passes=[],this.timer=new vt,this.autoRenderToScreen=!0,this.setRenderer(e)}get multisampling(){return this.inputBuffer.samples}set multisampling(e){const t=this.inputBuffer,s=this.multisampling;s>0&&e>0?(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==e&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(t.depthBuffer,t.stencilBuffer,t.texture.type,e),this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,e!==null){const t=e.getSize(new D),s=e.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===Z&&e.outputColorSpace===N&&(this.inputBuffer.texture.colorSpace=N,this.outputBuffer.texture.colorSpace=N,this.inputBuffer.dispose(),this.outputBuffer.dispose()),e.autoClear=!1,this.setSize(t.width,t.height);for(const i of this.passes)i.initialize(e,s,r)}}replaceRenderer(e,t=!0){const s=this.renderer,r=s.domElement.parentNode;return this.setRenderer(e),t&&r!==null&&(r.removeChild(s.domElement),r.appendChild(e.domElement)),s}createDepthTexture(){const e=this.inputBuffer,t=new Ke;this.depthTexture=t,e.stencilBuffer?(t.format=$e,t.type=Qe):t.type=Ye;const s=t.clone();return s.name="EffectComposer.StableDepth",this.depthRenderTarget=new X(e.width,e.height,{depthBuffer:!0,stencilBuffer:e.stencilBuffer,depthTexture:s}),s}blitDepthBuffer(e){const t=this.renderer,s=this.depthRenderTarget,r=t.properties,i=t.getContext();t.setRenderTarget(s);const n=r.get(e).__webglFramebuffer,a=r.get(s).__webglFramebuffer,o=e.stencilBuffer?i.DEPTH_BUFFER_BIT|i.STENCIL_BUFFER_BIT:i.DEPTH_BUFFER_BIT;i.bindFramebuffer(i.READ_FRAMEBUFFER,n),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,a),i.blitFramebuffer(0,0,e.width,e.height,0,0,s.width,s.height,o,i.NEAREST),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),t.setRenderTarget(null)}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.depthRenderTarget.dispose(),this.depthRenderTarget=null,this.inputBuffer.depthTexture=null,this.outputBuffer.depthTexture=null;for(const e of this.passes)e.setDepthTexture(null)}}createBuffer(e,t,s,r){const i=this.renderer,n=i===null?new D:i.getDrawingBufferSize(new D),a={minFilter:z,magFilter:z,stencilBuffer:t,depthBuffer:e,type:s},o=new X(n.width,n.height,a);return r>0&&(o.samples=r),s===Z&&i!==null&&i.outputColorSpace===N&&(o.texture.colorSpace=N),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(e){for(const t of this.passes)t.mainScene=e}setMainCamera(e){for(const t of this.passes)t.mainCamera=e}addPass(e,t){const s=this.passes,r=this.renderer,i=r.getDrawingBufferSize(new D),n=r.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(e.renderer=r,e.setSize(i.width,i.height),e.initialize(r,n,a),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?s.splice(t,0,e):s.push(e),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),e.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(e of s)e.setDepthTexture(o)}else{const o=this.depthRenderTarget.depthTexture;e.setDepthTexture(o)}}removePass(e){const t=this.passes,s=t.indexOf(e);if(s!==-1&&t.splice(s,1).length>0){if(this.depthTexture!==null){const n=(o,c)=>o||c.needsDepthTexture;if(!t.reduce(n,!1)){const o=this.depthRenderTarget.depthTexture;e.getDepthTexture()===o&&e.setDepthTexture(null),this.deleteDepthTexture()}}this.autoRenderToScreen&&s===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){const e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){const t=this.renderer,s=this.copyPass;let r=this.inputBuffer,i=this.outputBuffer,n,a=!1;e===void 0&&(this.timer.update(),e=this.timer.getDelta());for(const o of this.passes)if(o.enabled){if(r.depthTexture=this.depthTexture,i.depthTexture=null,o.render(t,r,i,e,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(r),o.needsSwap){if(a){s.renderToScreen=o.renderToScreen;const c=t.getContext(),E=t.state.buffers.stencil;E.setFunc(c.NOTEQUAL,1,4294967295),s.render(t,r,i,e,a),E.setFunc(c.EQUAL,1,4294967295)}n=r,r=i,i=n}o instanceof pt?a=!0:o instanceof ct&&(a=!1)}}setSize(e,t,s){const r=this.renderer,i=r.getSize(new D);(e===void 0||t===void 0)&&(e=i.width,t=i.height),(i.width!==e||i.height!==t)&&r.setSize(e,t,s);const n=r.getDrawingBufferSize(new D);this.inputBuffer.setSize(n.width,n.height),this.outputBuffer.setSize(n.width,n.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(n.width,n.height);for(const a of this.passes)a.setSize(n.width,n.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const e of this.passes)e.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),G.fullscreenGeometry.dispose()}},L={NONE:0,DEPTH:1,CONVOLUTION:2},h={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},gt=class{constructor(){this.shaderParts=new Map([[h.FRAGMENT_HEAD,null],[h.FRAGMENT_MAIN_UV,null],[h.FRAGMENT_MAIN_IMAGE,null],[h.VERTEX_HEAD,null],[h.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=L.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=De}},ae=!1,Me=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let s;if(t.material.flatShading)switch(t.material.side){case J:s=this.materialsFlatShadedDoubleSide;break;case Y:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(t.material.side){case J:s=this.materialsDoubleSide;break;case Y:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=s[2]:t.isInstancedMesh?t.material=s[1]:t.material=s[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof te))return e.clone();const t=e.uniforms,s=new Map;for(const i in t){const n=t[i].value;n.isRenderTargetTexture&&(t[i].value=null,s.set(i,n))}const r=e.clone();for(const i of s)t[i[0]].value=i[1],r.uniforms[i[0]].value=i[1];return r}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){const t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(const s of t)s.uniforms=Object.assign({},e.uniforms),s.side=Je;t[2].skinning=!0,this.materialsBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=Y,r}),this.materialsDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=J,r}),this.materialsFlatShaded=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=Y,r}),this.materialsFlatShadedDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=J,r})}}render(e,t,s){const r=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,ae){const i=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,s);for(const n of i)n[0].material=n[1];this.meshCount!==i.size&&i.clear()}else{const i=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,s),t.overrideMaterial=i}e.shadowMap.enabled=r}disposeMaterials(){if(this.material!==null){const e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return ae}static set workaroundEnabled(e){ae=e}},d={ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},xt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Et="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",bt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Tt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",St="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Rt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ct="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_t="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Mt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",yt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",At="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",wt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Bt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",It="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Dt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Pt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Nt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ft="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ot="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Gt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ut="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Lt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ht="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",kt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",zt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Vt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",jt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Wt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Xt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",qt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",Kt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$t="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Qt=new Map([[d.ADD,xt],[d.ALPHA,Et],[d.AVERAGE,bt],[d.COLOR,Tt],[d.COLOR_BURN,St],[d.COLOR_DODGE,Rt],[d.DARKEN,Ct],[d.DIFFERENCE,_t],[d.DIVIDE,Mt],[d.DST,null],[d.EXCLUSION,yt],[d.HARD_LIGHT,At],[d.HARD_MIX,wt],[d.HUE,Bt],[d.INVERT,It],[d.INVERT_RGB,Dt],[d.LIGHTEN,Pt],[d.LINEAR_BURN,Nt],[d.LINEAR_DODGE,Ft],[d.LINEAR_LIGHT,Ot],[d.LUMINOSITY,Gt],[d.MULTIPLY,Ut],[d.NEGATION,Lt],[d.NORMAL,Ht],[d.OVERLAY,kt],[d.PIN_LIGHT,zt],[d.REFLECT,Vt],[d.SATURATION,jt],[d.SCREEN,Wt],[d.SOFT_LIGHT,Xt],[d.SRC,qt],[d.SUBTRACT,Kt],[d.VIVID_LIGHT,$t]]),Yt=class extends Ie{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new S(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return Qt.get(this.blendFunction)}},He=class extends Ie{constructor(e,t,{attributes:s=L.NONE,blendFunction:r=d.NORMAL,defines:i=new Map,uniforms:n=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=s,this.fragmentShader=t,this.vertexShader=o,this.defines=i,this.uniforms=n,this.extensions=a,this.blendMode=new Yt(r),this.blendMode.addEventListener("change",c=>this.setChanged()),this._inputColorSpace=De,this._outputColorSpace=Pe}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=ee){}update(e,t,s){}setSize(e,t){}initialize(e,t,s){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof X||t instanceof Ue||t instanceof ue||t instanceof G)&&this[e].dispose()}}},ye=class extends G{constructor(e,t,s=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new Le,this.overrideMaterialManager=s===null?null:new Me(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){const e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){const t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new Me(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,s,r,i){const n=this.scene,a=this.camera,o=this.selection,c=a.layers.mask,E=n.background,A=e.shadowMap.autoUpdate,C=this.renderToScreen?null:t;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(n.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(C),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,n,a):e.render(n,a),a.layers.mask=c,n.background=E,e.shadowMap.autoUpdate=A}},Jt=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,Zt="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",es=class extends te{constructor(e,t,s,r,i=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Ze.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new S(null),depthBuffer:new S(null),resolution:new S(new D),texelSize:new S(new D),cameraNear:new S(.3),cameraFar:new S(1e3),aspect:new S(1),time:new S(0)},blending:Ge,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:i}),e&&this.setShaderParts(e),t&&this.setDefines(t),s&&this.setUniforms(s),this.copyCameraSettings(r)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=ee){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=Jt.replace(h.FRAGMENT_HEAD,e.get(h.FRAGMENT_HEAD)||"").replace(h.FRAGMENT_MAIN_UV,e.get(h.FRAGMENT_MAIN_UV)||"").replace(h.FRAGMENT_MAIN_IMAGE,e.get(h.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=Zt.replace(h.VERTEX_HEAD,e.get(h.VERTEX_HEAD)||"").replace(h.VERTEX_MAIN_SUPPORT,e.get(h.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(const t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(const t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(const t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof et?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){const s=this.uniforms;s.resolution.value.set(e,t),s.texelSize.value.set(1/e,1/t),s.aspect.value=e/t}static get Section(){return h}};function Ae(e,t,s){for(const r of t){const i="$1"+e+r.charAt(0).toUpperCase()+r.slice(1),n=new RegExp("([^\\.])(\\b"+r+"\\b)","g");for(const a of s.entries())a[1]!==null&&s.set(a[0],a[1].replace(n,i))}}function ts(e,t,s){let r=t.getFragmentShader(),i=t.getVertexShader();const n=r!==void 0&&/mainImage/.test(r),a=r!==void 0&&/mainUv/.test(r);if(s.attributes|=t.getAttributes(),r===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(a&&(s.attributes&L.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!n&&!a)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,c=s.shaderParts;let E=c.get(h.FRAGMENT_HEAD)||"",A=c.get(h.FRAGMENT_MAIN_UV)||"",C=c.get(h.FRAGMENT_MAIN_IMAGE)||"",U=c.get(h.VERTEX_HEAD)||"",f=c.get(h.VERTEX_MAIN_SUPPORT)||"";const T=new Set,v=new Set;if(a&&(A+=`	${e}MainUv(UV);
`,s.uvTransformation=!0),i!==null&&/mainSupport/.test(i)){const g=/mainSupport *\([\w\s]*?uv\s*?\)/.test(i);f+=`	${e}MainSupport(`,f+=g?`vUv);
`:`);
`;for(const x of i.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const M of x[1].split(/\s*,\s*/))s.varyings.add(M),T.add(M),v.add(M);for(const x of i.matchAll(o))v.add(x[1])}for(const g of r.matchAll(o))v.add(g[1]);for(const g of t.defines.keys())v.add(g.replace(/\([\w\s,]*\)/g,""));for(const g of t.uniforms.keys())v.add(g);v.delete("while"),v.delete("for"),v.delete("if"),t.uniforms.forEach((g,x)=>s.uniforms.set(e+x.charAt(0).toUpperCase()+x.slice(1),g)),t.defines.forEach((g,x)=>s.defines.set(e+x.charAt(0).toUpperCase()+x.slice(1),g));const B=new Map([["fragment",r],["vertex",i]]);Ae(e,v,s.defines),Ae(e,v,B),r=B.get("fragment"),i=B.get("vertex");const _=t.blendMode;if(s.blendModes.set(_.blendFunction,_),n){t.inputColorSpace!==null&&t.inputColorSpace!==s.colorSpace&&(C+=t.inputColorSpace===N?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==Pe?s.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(s.colorSpace=t.inputColorSpace);const g=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;C+=`${e}MainImage(color0, UV, `,(s.attributes&L.DEPTH)!==0&&g.test(r)&&(C+="depth, ",s.readDepth=!0),C+=`color1);
	`;const x=e+"BlendOpacity";s.uniforms.set(x,_.opacity),C+=`color0 = blend${_.blendFunction}(color0, color1, ${x});

	`,E+=`uniform float ${x};

`}if(E+=r+`
`,i!==null&&(U+=i+`
`),c.set(h.FRAGMENT_HEAD,E),c.set(h.FRAGMENT_MAIN_UV,A),c.set(h.FRAGMENT_MAIN_IMAGE,C),c.set(h.VERTEX_HEAD,U),c.set(h.VERTEX_MAIN_SUPPORT,f),t.extensions!==null)for(const g of t.extensions)s.extensions.add(g)}}var we=class extends G{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new es(null,null,null,e),this.listener=s=>this.handleEvent(s),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(const t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(const t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){const t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,s)=>s.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const e=new gt;let t=0;for(const a of this.effects)if(a.blendMode.blendFunction===d.DST)e.attributes|=a.getAttributes()&L.DEPTH;else{if((e.attributes&a.getAttributes()&L.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);ts("e"+t++,a,e)}let s=e.shaderParts.get(h.FRAGMENT_HEAD),r=e.shaderParts.get(h.FRAGMENT_MAIN_IMAGE),i=e.shaderParts.get(h.FRAGMENT_MAIN_UV);const n=/\bblend\b/g;for(const a of e.blendModes.values())s+=a.getShaderCode().replace(n,`blend${a.blendFunction}`)+`
`;(e.attributes&L.DEPTH)!==0?(e.readDepth&&(r=`float depth = readDepth(UV);

	`+r),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===N&&(r+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(i=`vec2 transformedUv = vUv;
`+i,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(h.FRAGMENT_HEAD,s),e.shaderParts.set(h.FRAGMENT_MAIN_IMAGE,r),e.shaderParts.set(h.FRAGMENT_MAIN_UV,i);for(const[a,o]of e.shaderParts)o!==null&&e.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=ee){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(const s of this.effects)s.setDepthTexture(e,t)}render(e,t,s,r,i){for(const n of this.effects)n.update(e,t,r);if(!this.skipRendering||this.renderToScreen){const n=this.fullscreenMaterial;n.inputBuffer=t.texture,n.time+=r*this.timeScale,e.setRenderTarget(this.renderToScreen?null:s),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(const s of this.effects)s.setSize(e,t)}initialize(e,t,s){this.renderer=e;for(const r of this.effects)r.initialize(e,t,s);this.updateMaterial(),s!==void 0&&s!==Z&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){e.type==="change"&&this.recompile()}};const ss=()=>{const t=document.createElement("canvas");t.width=64,t.height=64;const s=t.getContext("2d");if(!s)throw new Error("2D context not available");s.fillStyle="black",s.fillRect(0,0,t.width,t.height);const r=new ue(t);r.minFilter=z,r.magFilter=z,r.generateMipmaps=!1;const i=[];let n=null;const a=64;let o=.1*64;const c=1/a,E=()=>{s.fillStyle="black",s.fillRect(0,0,t.width,t.height)},A=f=>{const T={x:f.x*64,y:(1-f.y)*64};let v=1;const B=M=>Math.sin(M*Math.PI/2),_=M=>-M*(M-2);f.age<a*.3?v=B(f.age/(a*.3)):v=_(1-(f.age-a*.3)/(a*.7))||0,v*=f.force;const g=`${(f.vx+1)/2*255}, ${(f.vy+1)/2*255}, ${v*255}`,x=320;s.shadowOffsetX=x,s.shadowOffsetY=x,s.shadowBlur=o,s.shadowColor=`rgba(${g},${.22*v})`,s.beginPath(),s.fillStyle="rgba(255,0,0,1)",s.arc(T.x-x,T.y-x,o,0,Math.PI*2),s.fill()};return{canvas:t,texture:r,addTouch:f=>{let T=0,v=0,B=0;if(n){const _=f.x-n.x,g=f.y-n.y;if(_===0&&g===0)return;const x=_*_+g*g,M=Math.sqrt(x);v=_/(M||1),B=g/(M||1),T=Math.min(x*1e4,1)}n={x:f.x,y:f.y},i.push({x:f.x,y:f.y,age:0,force:T,vx:v,vy:B})},update:()=>{E();for(let f=i.length-1;f>=0;f--){const T=i[f],v=T.force*c*(1-T.age/a);T.x+=T.vx*v,T.y+=T.vy*v,T.age++,T.age>a&&i.splice(f,1)}for(let f=0;f<i.length;f++)A(i[f]);r.needsUpdate=!0},set radiusScale(f){o=.1*64*f},get radiusScale(){return o/(.1*64)},size:64}},rs=(e,t)=>{const s=`
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;return new He("LiquidEffect",s,{uniforms:new Map([["uTexture",new S(e)],["uStrength",new S(t?.strength??.025)],["uTime",new S(0)],["uFreq",new S(t?.freq??4.5)]])})},Be={square:0,circle:1,triangle:2,diamond:3},is=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,ns=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  // sRGB gamma correction - convert linear to sRGB for accurate color output
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`,oe=10,as=({variant:e="circle",pixelSize:t=10,color:s="#38bdf8",className:r,style:i,antialias:n=!1,patternScale:a=3,patternDensity:o=1.2,liquid:c=!0,liquidStrength:E=.12,liquidRadius:A=1.2,pixelSizeJitter:C=.5,enableRipples:U=!0,rippleIntensityScale:f=1.5,rippleThickness:T=.12,rippleSpeed:v=.4,liquidWobbleSpeed:B=5,autoPauseOffscreen:_=!0,speed:g=.6,transparent:x=!0,edgeFade:M=.25,noiseAmount:q=0})=>{const de=k.useRef(null),K=k.useRef({visible:!0}),fe=k.useRef(g),y=k.useRef(null),se=k.useRef(null);return k.useEffect(()=>{const I=de.current;if(!I)return;fe.current=g;const ke=["antialias","liquid","noiseAmount"],he={antialias:n,liquid:c,noiseAmount:q};let $=!1;if(!y.current)$=!0;else if(se.current){for(const l of ke)if(se.current[l]!==he[l]){$=!0;break}}if($){if(y.current){const u=y.current;u.resizeObserver?.disconnect(),u.intersectionObserver?.disconnect(),cancelAnimationFrame(u.raf),u.quad?.geometry.dispose(),u.material.dispose(),u.composer?.dispose(),u.renderer.dispose(),u.renderer.forceContextLoss(),u.renderer.domElement.parentElement===I&&I.removeChild(u.renderer.domElement),y.current=null}const l=document.createElement("canvas");let m;try{m=new rt({canvas:l,antialias:!1,alpha:!0,powerPreference:"high-performance"})}catch(u){console.error("Three.js WebGLRenderer creation in PixelBlast failed:",u);return}m.domElement.style.width="100%",m.domElement.style.height="100%",m.setPixelRatio(1),I.appendChild(m.domElement),x?m.setClearAlpha(0):m.setClearColor(0,1);const w={uResolution:{value:new D(0,0)},uTime:{value:0},uColor:{value:new Oe(s)},uClickPos:{value:Array.from({length:oe},()=>new D(-1,-1))},uClickTimes:{value:new Float32Array(oe)},uShapeType:{value:Be[e]??1},uPixelSize:{value:t*m.getPixelRatio()},uScale:{value:a},uDensity:{value:o},uPixelJitter:{value:C},uEnableRipples:{value:U?1:0},uRippleSpeed:{value:v},uRippleThickness:{value:T},uRippleIntensity:{value:f},uEdgeFade:{value:M}},V=new le,H=new Ne(-1,1,1,-1,0,1),pe=new te({vertexShader:is,fragmentShader:ns,uniforms:w,transparent:!0,depthTest:!1,depthWrite:!1,glslVersion:it}),ze=new nt(2,2),me=new Fe(ze,pe);V.add(me);const ve=new at,ge=()=>{const u=I.clientWidth||1,b=I.clientHeight||1;m.setSize(u,b,!1),w.uResolution.value.set(m.domElement.width,m.domElement.height),y.current?.composer&&y.current.composer.setSize(m.domElement.width,m.domElement.height),w.uPixelSize.value=t*m.getPixelRatio()};ge();const xe=new ResizeObserver(ge);xe.observe(I);const Ee=(()=>{if(typeof window<"u"&&window.crypto?.getRandomValues){const u=new Uint32Array(1);return window.crypto.getRandomValues(u),u[0]/4294967295}return Math.random()})()*1e3;let R,F,j;if(c){F=ss(),F.radiusScale=A,R=new _e(m);const u=new ye(V,H);j=rs(F.texture,{strength:E,freq:B});const b=new we(H,j);b.renderToScreen=!0,R.addPass(u),R.addPass(b)}if(q>0){R||(R=new _e(m),R.addPass(new ye(V,H)));const u=new He("NoiseEffect","uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} ",{uniforms:new Map([["uTime",new S(0)],["uAmount",new S(q)]])}),b=new we(H,u);b.renderToScreen=!0,R&&R.passes.length>0&&R.passes.forEach(P=>P.renderToScreen=!1),R.addPass(b)}R&&R.setSize(m.domElement.width,m.domElement.height);const be=u=>{const b=m.domElement.getBoundingClientRect(),P=m.domElement.width/b.width,O=m.domElement.height/b.height,ie=(u.clientX-b.left)*P,We=(b.height-(u.clientY-b.top))*O;return{fx:ie,fy:We,w:m.domElement.width,h:m.domElement.height}},Ve=u=>{const b=y.current?.clickIx??0,{fx:P,fy:O}=be(u);w.uClickPos.value[b].set(P,O),w.uClickTimes.value[b]=w.uTime.value,y.current&&(y.current.clickIx=(b+1)%oe)},je=u=>{if(!F)return;const{fx:b,fy:P,w:O,h:ie}=be(u);F.addTouch({x:b/O,y:P/ie})};m.domElement.addEventListener("pointerdown",Ve,{passive:!0}),m.domElement.addEventListener("pointermove",je,{passive:!0});let re=0,W=!1;const Te=()=>{if(_&&!K.current.visible){W=!1;return}if(w.uTime.value=Ee+ve.getElapsedTime()*fe.current,j){const u=j.uniforms.get("uTime");u&&(u.value=w.uTime.value)}R?(F&&F.update(),R.passes.forEach(u=>{const b=u.effects;b&&b.forEach(P=>{const O=P.uniforms?.get("uTime");O&&(O.value=w.uTime.value)})}),R.render()):m.render(V,H),!_||K.current.visible?(re=requestAnimationFrame(Te),W=!0):W=!1},Se=new IntersectionObserver(u=>{K.current.visible=u[0].isIntersecting,K.current.visible&&!W&&(re=requestAnimationFrame(Te),W=!0)},{threshold:.01});Se.observe(I),y.current={renderer:m,scene:V,camera:H,material:pe,clock:ve,clickIx:0,uniforms:w,resizeObserver:xe,intersectionObserver:Se,raf:re,quad:me,timeOffset:Ee,composer:R,touch:F,liquidEffect:j}}else{const l=y.current;if(l.uniforms.uShapeType.value=Be[e]??1,l.uniforms.uPixelSize.value=t*l.renderer.getPixelRatio(),l.uniforms.uColor.value.set(s),l.uniforms.uScale.value=a,l.uniforms.uDensity.value=o,l.uniforms.uPixelJitter.value=C,l.uniforms.uEnableRipples.value=U?1:0,l.uniforms.uRippleIntensity.value=f,l.uniforms.uRippleThickness.value=T,l.uniforms.uRippleSpeed.value=v,l.uniforms.uEdgeFade.value=M,x?l.renderer.setClearAlpha(0):l.renderer.setClearColor(0,1),l.liquidEffect){const m=l.liquidEffect.uniforms.get("uStrength");m&&(m.value=E);const w=l.liquidEffect.uniforms.get("uFreq");w&&(w.value=B)}l.touch&&(l.touch.radiusScale=A)}return se.current=he,()=>{if(y.current&&$||!y.current)return;const l=y.current;l.resizeObserver?.disconnect(),l.intersectionObserver?.disconnect(),cancelAnimationFrame(l.raf),l.quad?.geometry.dispose(),l.material.dispose(),l.composer?.dispose(),l.renderer?.domElement&&(l.renderer.domElement.width=1,l.renderer.domElement.height=1),l.renderer?.dispose(),l.renderer?.forceContextLoss(),l.renderer?.domElement?.parentElement===I&&I.removeChild(l.renderer.domElement),y.current=null}},[n,c,q,t,a,o,U,f,T,v,C,M,x,E,A,B,_,e,s,g]),p.jsx("div",{ref:de,className:`pixel-blast-container ${r??""}`,style:i,"aria-label":"PixelBlast interactive background"})},os=[{v:"100+",l:"Spatial Queries / day"},{v:"92%",l:"Context Optimization"},{v:"60%",l:"Faster AI Responses"},{v:"40%",l:"Better Complex Query Handling"},{v:"02",l:"Patent Applications"}];function ls(){const{banner:e,experience:t}=Xe(),s=t.find(n=>n.duration?.toLowerCase().includes("present"))||t[0],r=t.find(n=>!n.duration?.toLowerCase().includes("present"))||t[1],i=[{title:"Education",lines:["B.E. Computer Science","Big Data & Analytics","Chandigarh University","2022 — Present"]},{title:"Current Role",lines:[s?.title||"Apprenticeship Trainee",s?.duration||"June 2025 — Present","Mumbai, India"]},{title:"Past Experience",lines:[r?.title||"Business Analyst Intern",r?.duration||"June — Aug 2024","Bangalore, India"]}];return p.jsxs("section",{id:"about",className:"relative py-32 px-6 overflow-hidden",children:[p.jsx("div",{className:"absolute inset-0 z-0 opacity-30 pointer-events-auto",style:{maskImage:"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"},children:p.jsx(as,{variant:"circle",pixelSize:10,color:"#38bdf8",patternScale:3,patternDensity:1.2,pixelSizeJitter:.5,enableRipples:!0,rippleSpeed:.4,rippleThickness:.12,rippleIntensityScale:1.5,liquid:!0,liquidStrength:.12,liquidRadius:1.2,liquidWobbleSpeed:5,speed:.6,edgeFade:.25,transparent:!0})}),p.jsx("div",{className:"absolute inset-0 grid-bg opacity-15 pointer-events-none"}),p.jsx("div",{className:"absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none",style:{background:"var(--gradient-glow)"}}),p.jsxs(ot,{className:"max-w-7xl mx-auto z-10 pointer-events-none",children:[p.jsx("div",{className:"pointer-events-auto mb-6",children:p.jsx(qe,{num:"01",label:"Identity"})}),p.jsxs("div",{className:"grid lg:grid-cols-12 gap-12 items-center pointer-events-auto",children:[p.jsxs("div",{className:"lg:col-span-5 relative z-20",children:[p.jsx(Q,{variant:"dissolve",children:p.jsxs("h2",{className:"text-5xl md:text-7xl font-light leading-[1] tracking-tight text-white",children:["Who ",p.jsx("span",{className:"italic text-gradient",children:"I am"})]})}),p.jsxs(Q,{delay:.15,variant:"dissolve",children:[p.jsx("p",{className:"mt-8 text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-md",children:e.description||"A Computer Science Engineer specializing in Big Data Analytics — building intelligent systems that combine Artificial Intelligence, Geospatial Intelligence, and Multi-Agent Reasoning."}),p.jsx("p",{className:"mt-4 text-base text-muted-foreground/80 leading-relaxed font-light max-w-md",children:"Production-grade AI, spatial intelligence platforms, computer vision, and reasoning workflows for real-world problems."})]})]}),p.jsx("div",{className:"lg:col-span-7 grid sm:grid-cols-3 gap-4 relative z-20",children:i.map((n,a)=>p.jsx(Q,{delay:a*.1,variant:"dissolve",children:p.jsxs("div",{className:"rounded-2xl p-6 h-full border border-white/10 bg-[#0d0b12]/85 backdrop-blur-md shadow-2xl hover:border-primary/40 transition-all hover:-translate-y-1 duration-500",children:[p.jsxs("div",{className:"text-[10px] tracking-[0.25em] text-cyan-400 uppercase mb-4 font-mono flex items-center gap-2",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"}),p.jsx("span",{children:n.title})]}),p.jsx("div",{className:"space-y-1.5",children:n.lines.map((o,c)=>p.jsx("div",{className:c===0?"text-white font-medium text-sm":c===n.lines.length-1?"text-xs font-mono text-cyan-300/80":"text-xs text-muted-foreground font-light",children:o},c))})]})},n.title))})]}),p.jsx("div",{className:"mt-20 grid grid-cols-2 md:grid-cols-5 gap-3 pointer-events-auto relative z-20",children:os.map((n,a)=>p.jsx(Q,{delay:a*.08,variant:"dissolve",children:p.jsxs("div",{className:"rounded-xl p-5 text-center border border-white/10 bg-[#0d0b12]/85 backdrop-blur-md shadow-xl hover:bg-white/[0.06] hover:border-primary/40 transition-all group",children:[p.jsx("div",{className:"text-3xl md:text-4xl font-display font-light text-gradient group-hover:scale-105 transition-transform",children:n.v}),p.jsx("div",{className:"mt-2 text-[10px] tracking-wider text-muted-foreground uppercase font-mono",children:n.l})]})},n.l))})]})]})}function ps(){return p.jsx(ls,{})}export{ps as component};
