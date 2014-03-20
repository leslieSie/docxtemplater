(function(){var t,l;l="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",l.XmlUtil(l.XmlUtil=function(){function t(){}return t.prototype.getListXmlElements=function(t,l,e){var n,o,s,f,g,r,u,i,a,h;for(null==l&&(l=0),null==e&&(e=t.length-1),i=DocUtils.preg_match_all("<(/?[^/> ]+)([^>]*)>",t.substr(l,e)),r=[],n=a=0,h=i.length;h>a;n=++a)u=i[n],"/"===u[1][0]?(f=!1,r.length>0&&(g=r[r.length-1],s=g.tag.substr(1,g.tag.length-2),o=u[1].substr(1),s===o&&(f=!0)),f?r.pop():r.push({tag:"<"+u[1]+">",offset:u.offset})):"/"===u[2][u[2].length-1]||r.push({tag:"<"+u[1]+">",offset:u.offset});return r},t.prototype.getListDifferenceXmlElements=function(t,l,e){var n;for(null==l&&(l=0),null==e&&(e=t.length-1),n=this.getListXmlElements(t,l,e);;){if(n.length<=1)break;if(n[0].tag.substr(2)!==n[n.length-1].tag.substr(1))break;n.pop(),n.shift()}return n},t}())}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",a.TemplaterState=t=function(){function t(){}return t.prototype.calcStartTag=function(t){return this.matches[t.start.numXmlTag].offset+this.matches[t.start.numXmlTag][1].length+this.charactersAdded[t.start.numXmlTag]+t.start.numCharacter},t.prototype.calcEndTag=function(t){return this.matches[t.end.numXmlTag].offset+this.matches[t.end.numXmlTag][1].length+this.charactersAdded[t.end.numXmlTag]+t.end.numCharacter+1},t.prototype.initialize=function(){return this.inForLoop=!1,this.inTag=!1,this.inDashLoop=!1,this.textInsideTag=""},t.prototype.startTag=function(){if(this.inTag===!0)throw"Tag already open with text: "+this.textInsideTag;return this.inTag=!0,this.textInsideTag="",this.tagStart=this.currentStep},t.prototype.loopType=function(){return this.inDashLoop?"dash":this.inForLoop?"for":"simple"},t.prototype.endTag=function(){var t;if(this.inTag===!1)throw"Tag already closed";return this.inTag=!1,this.tagEnd=this.currentStep,"#"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inForLoop=!0,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.substr(1)}),"-"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inDashLoop=!0,t=/^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.replace(t,"$2"),element:this.textInsideTag.replace(t,"$1")}),"/"===this.textInsideTag[0]?this.loopClose={start:this.tagStart,end:this.tagEnd}:void 0},t}()}).call(this);
(function(){var t,e,i,s=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t){this.zip=t}var e;return e=["gif","jpeg","jpg","emf","png"],t.prototype.getImageList=function(){var t,i,n,l;l=/[^.]+\.([^.]+)/,i=[];for(n in this.zip.files)t=n.replace(l,"$1"),s.call(e,t)>=0&&i.push({path:n,files:this.zip.files[n]});return i},t.prototype.setImage=function(t,e,i){return null==i&&(i={}),this.zip.remove(t),this.zip.file(t,e,i)},t.prototype.loadImageRels=function(){var t,e,i;return e=DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].asText()),this.xmlDoc=DocUtils.Str2xml(e),t=function(){var t,e,s,n;for(s=this.xmlDoc.getElementsByTagName("Relationship"),n=[],t=0,e=s.length;e>t;t++)i=s[t],n.push(parseInt(i.getAttribute("Id").substr(3)));return n}.call(this),this.maxRid=t.max(),this.imageRels=[],this},t.prototype.addExtensionRels=function(t,e){var i,s,n,l,a,o,r,m,p;for(s=this.zip.files["[Content_Types].xml"].asText(),r=DocUtils.Str2xml(s),i=!0,n=r.getElementsByTagName("Default"),m=0,p=n.length;p>m;m++)a=n[m],a.getAttribute("Extension")===e&&(i=!1);return i?(o=r.getElementsByTagName("Types")[0],l=r.createElement("Default"),l.namespaceURI=null,l.setAttribute("ContentType",t),l.setAttribute("Extension",e),o.appendChild(l),this.setImage("[Content_Types].xml",DocUtils.encode_utf8(DocUtils.xml2Str(r)))):void 0},t.prototype.addImageRels=function(t,e){var i,s,n,l;if(null!=this.zip.files["word/media/"+t])throw"file already exists";return this.maxRid++,s={name:"word/media/"+t,data:e,options:{base64:!1,binary:!0,compression:null,date:new Date,dir:!1}},this.zip.file(s.name,s.data,s.options),i=t.replace(/[^.]+\.([^.]+)/,"$1"),this.addExtensionRels("image/"+i,i),l=this.xmlDoc.getElementsByTagName("Relationships")[0],n=this.xmlDoc.createElement("Relationship"),n.namespaceURI=null,n.setAttribute("Id","rId"+this.maxRid),n.setAttribute("Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"),n.setAttribute("Target","media/"+t),l.appendChild(n),this.setImage("word/_rels/document.xml.rels",DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc))),this.maxRid},t.prototype.getImageByRid=function(t){var e,i,s,n,l,a;for(n=this.xmlDoc.getElementsByTagName("Relationship"),l=0,a=n.length;a>l;l++)if(s=n[l],e=s.getAttribute("Id"),t===e&&(i=s.getAttribute("Target"),"media/"===i.substr(0,6)))return this.zip.files["word/"+i];return null},t}(),i.ImgManager=t}).call(this);
(function(){var t,e,n;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser","node"===e&&(global.http=require("http"),global.https=require("https"),global.fs=require("fs"),global.vm=require("vm"),global.DOMParser=require("xmldom").DOMParser,global.XMLSerializer=require("xmldom").XMLSerializer,global.PNG=require("../libs/pngjs/png-node"),global.url=require("url"),["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js","bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","qrcode.js","findpat.js","alignpat.js","databr.js"].forEach(function(t){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../libs/jsqrcode/"+t),t)}),["jszip.js"].forEach(function(t){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../libs/jszip2.0/dist/"+t),t)})),n.DocxGen=t=function(){function t(t,e,n){this.Tags=null!=e?e:{},this.options=n,this.setOptions(this.options),this.finishedCallback=function(){},this.localImageCreator=function(t,e){var n;return n=JSZipBase64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC"),e(n)},this.filesProcessed=0,this.qrCodeNumCallBack=0,this.qrCodeWaitingFor=[],null!=t&&t.length>0&&this.load(t)}var n;return n=["word/document.xml","word/footer1.xml","word/footer2.xml","word/footer3.xml","word/header1.xml","word/header2.xml","word/header3.xml"],t.prototype.setOptions=function(t){return this.options=t,null!=this.options?(this.intelligentTagging=null!=this.options.intelligentTagging?this.options.intelligentTagging:!0,this.qrCode=null!=this.options.qrCode?this.options.qrCode:!1,this.parser=null!=this.options.parser?this.parser:null):void 0},t.prototype.loadFromFile=function(t,e){var n;return null==e&&(e={}),n={success:function(t){return this.successFun=t},successFun:function(){}},null==e.docx&&(e.docx=!1),null==e.async&&(e.async=!1),this.setOptions(e),null==e.callback&&(e.callback=function(t){return function(e){return t.load(e),n.successFun(t)}}(this)),DocUtils.loadDoc(t,e),e.async===!1?this:n},t.prototype.qrCodeCallBack=function(t,e){var n;return null==e&&(e=!0),e===!0?this.qrCodeWaitingFor.push(t):e===!1&&(n=this.qrCodeWaitingFor.indexOf(t),this.qrCodeWaitingFor.splice(n,1)),this.testReady()},t.prototype.testReady=function(){return 0===this.qrCodeWaitingFor.length&&this.filesProcessed===n.length?(this.ready=!0,this.finishedCallback()):void 0},t.prototype.logUndefined=function(){},t.prototype.getImageList=function(){return this.imgManager.getImageList()},t.prototype.setImage=function(t,e,n){return null==n&&(n={}),null==n.binary&&(n.binary=!0),this.imgManager.setImage(t,e,n)},t.prototype.load=function(t){return this.loadedContent=t,this.zip=new JSZip(t),this.imgManager=new ImgManager(this.zip).loadImageRels(),this},t.prototype.applyTags=function(t,e){var i,o,s,l,r,a;for(this.Tags=null!=t?t:this.Tags,null==e&&(e=null),s=0,r=n.length;r>s;s++)o=n[s],null==this.zip.files[o]&&this.filesProcessed++;for(l=0,a=n.length;a>l;l++)o=n[l],null!=this.zip.files[o]&&(i=new DocXTemplater(this.zip.files[o].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging,qrCodeCallback:e,localImageCreator:this.localImageCreator},this,this.Tags,this.intelligentTagging,[],{},0,e,this.localImageCreator),null!=this.parser&&(i.parser=this.parser),this.setData(o,i.applyTags().content),this.filesProcessed++);return this.testReady()},t.prototype.setData=function(t,e,n){return null==n&&(n={}),this.zip.remove(t),this.zip.file(t,e,n)},t.prototype.getTags=function(){var t,e,i,o,s,l;for(i=[],s=0,l=n.length;l>s;s++)e=n[s],null!=this.zip.files[e]&&(t=new DocXTemplater(this.zip.files[e].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}),null!=this.parser&&(t.parser=this.parser),o=t.applyTags().usedTags,DocUtils.sizeOfObject(o)&&i.push({fileName:e,vars:o}));return i},t.prototype.setTags=function(t){return this.Tags=t,this},t.prototype.output=function(t){var n;return null==t&&(t={}),null==t.download&&(t.download=!0),null==t.name&&(t.name="output.docx"),null==t.type&&(t.type="string"),n=this.zip.generate({type:t.type}),t.download&&("node"===e?fs.writeFile(process.cwd()+"/"+t.name,n,"base64",function(t){if(t)throw t}):document.location.href="data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"+n),n},t.prototype.getFullText=function(t,e){var n;return null==t&&(t="word/document.xml"),null==e&&(e=""),""===e?(n=this.zip.files[t].asText(),this.getFullText(t,n)):new DocXTemplater(e,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}).getFullText()},t.prototype.download=function(t,e,n){var i;return null==n&&(n="default.docx"),i=this.zip.generate(),Downloadify.create("downloadify",{filename:function(){return n},data:function(){return i},onCancel:function(){return alert("You have cancelled the saving of this file.")},onError:function(){return alert("You must put something in the File Contents or there will be nothing to save!")},swf:t,downloadImage:e,width:100,height:30,transparent:!0,append:!1,dataType:"base64"})},t}(),"node"===e&&(module.exports=n.DocxGen)}).call(this);
(function(){var e,n,t=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.DocUtils={},n.docX=[],n.docXData=[],DocUtils.nl2br=function(e){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2")},DocUtils.loadDoc=function(t,r){var o,l,i,c,a,u,s,f,d,p,g,h,m,D,b,y,w;if(null==r&&(r={}),h=null!=r.docx?!r.docx:!1,l=null!=r.async?r.async:!1,p=null!=r.intelligentTagging?r.intelligentTagging:!1,c=null!=r.callback?r.callback:null,i="",null==t)throw"path not defined";if(-1!==t.indexOf("/")?(b=t,f=b):(f=t,""===i&&null!=DocUtils.pathConfig&&(i="browser"===e?DocUtils.pathConfig.browser:DocUtils.pathConfig.node),b=i+t),g=function(e){return n.docXData[f]=e,h===!1?(n.docX[f]=new DocxGen(e,{},{intelligentTagging:p}),n.docX[f]):(null!=c&&c(n.docXData[f]),l===!1?n.docXData[f]:void 0)},"browser"===e)w=new XMLHttpRequest,w.open("GET",b,l),w.overrideMimeType&&w.overrideMimeType("text/plain; charset=x-user-defined"),w.onreadystatechange=function(){if(4===this.readyState){if(200===this.status)return g(this.response);if(null!=c)return c(!0)}},w.send();else if(d=new RegExp("(https?)","i"),d.test(t)){switch(y=url.parse(t),r={hostname:y.hostname,path:y.path,method:"GET",rejectUnauthorized:!1},s=function(){throw"Error on HTTPS Call"},D=function(e){var n;return e.setEncoding("binary"),n="",e.on("data",function(e){return n+=e}),e.on("end",function(){return g(n)})},y.protocol){case"https:":m=https.request(r,D).on("error",s);break;case"http:":m=http.request(r,D).on("error",s)}m.end()}else if(l===!0)fs.readFile(b,"binary",function(e,n){if(e){if(null!=c)return c(!0)}else if(g(n),null!=c)return c(n)});else try{if(a=fs.readFileSync(b,"binary"),o=g(a),null==c)return o;c(a)}catch(U){u=U,null!=c&&c()}return f},DocUtils.clone=function(e){var n,t,r;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return n="",null!=e.global&&(n+="g"),null!=e.ignoreCase&&(n+="i"),null!=e.multiline&&(n+="m"),null!=e.sticky&&(n+="y"),new RegExp(e.source,n);r=new e.constructor;for(t in e)r[t]=DocUtils.clone(e[t]);return r},DocUtils.xml2Str=function(e){var n,t,r;if(void 0===e)throw"xmlNode undefined!";try{"undefined"!=typeof global&&null!==global?(n=new XMLSerializer,t=n.serializeToString(e)):t=(new XMLSerializer).serializeToString(e)}catch(o){r=o,t=e.xml}return t=t.replace(/\x20xmlns=""/g,"")},DocUtils.Str2xml=function(e){var t,r;return n.DOMParser?(t=new DOMParser,r=t.parseFromString(e,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async=!1,r.loadXML(e)),r},DocUtils.replaceFirstFrom=function(e,n,t,r){return e.substr(0,r)+e.substr(r).replace(n,t)},DocUtils.encode_utf8=function(e){return unescape(encodeURIComponent(e))},DocUtils.convert_spaces=function(e){return e.replace(new RegExp(String.fromCharCode(160),"g")," ")},DocUtils.decode_utf8=function(e){var n;try{return void 0===e?void 0:decodeURIComponent(escape(DocUtils.convert_spaces(e)))}catch(t){throw n=t,console.log(e),console.log("could not decode"),"end"}},DocUtils.base64encode=function(e){return btoa(unescape(encodeURIComponent(e)))},DocUtils.preg_match_all=function(e,n){var r,o;return"object"!=typeof e&&(e=new RegExp(e,"g")),r=[],o=function(){var e,n,o,l,i;return e=arguments[0],o=4<=arguments.length?t.call(arguments,1,i=arguments.length-2):(i=1,[]),n=arguments[i++],l=arguments[i++],o.unshift(e),o.offset=n,r.push(o)},n.replace(e,o),r},DocUtils.sizeOfObject=function(e){var n,t,r;r=0,t=0;for(n in e)r++;return r},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)}}).call(this);
(function(){var e,t,m;m="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",e=e=function(){function e(e){this.xmlTemplater=e,this.imgMatches=[]}return e.prototype.findImages=function(){return this.imgMatches=DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<\/w:drawing>/g,this.xmlTemplater.content),this},e.prototype.replaceImages=function(){var e,m,o,r,l,a,s,n,i,c,p,d,g,h,x,u,f,w;for(n=[],e=function(e){return e.xmlTemplater.numQrCode--,console.log(e.data.length),e.xmlTemplater.DocxGen.setImage("word/media/"+e.imgName,e.data),e.xmlTemplater.DocxGen.qrCodeCallBack(e.num,!1)},f=this.imgMatches,w=[],g=x=0,u=f.length;u>x;g=++x)if(l=f[g],h=DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'+l[0]+"</w:document>"),this.xmlTemplater.DocxGen.qrCode)d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(i=d.getAttribute("r:embed"),s=this.xmlTemplater.DocxGen.imgManager.getImageByRid(i),null!==s?(p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p&&"Copie_"!==p.getAttribute("name").substr(0,6)?(r=("Copie_"+this.xmlTemplater.imageId+".png").replace(/\x20/,""),this.xmlTemplater.DocxGen.qrCodeNumCallBack++,this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!0),a=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,""),this.xmlTemplater.imageId++,this.xmlTemplater.DocxGen.setImage("word/media/"+r,s.data),p.setAttribute("name",""+r),d.setAttribute("r:embed","rId"+a),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),c=DocUtils.xml2Str(m),this.xmlTemplater.content=this.xmlTemplater.content.replace(l[0],c),this.xmlTemplater.numQrCode++,"browser"===t?(n[g]=new DocxQrCode(s.asBinary(),this.xmlTemplater,r,this.xmlTemplater.DocxGen.qrCodeNumCallBack),w.push(n[g].decode(e))):w.push(/\.png$/.test(s.name)?function(t){return function(m){var o,r,l,a,i;return o=JSZip.base64.encode(s.asBinary()),r=new Buffer(o,"base64"),i=new PNG(r),a=function(o){return i.decoded=o,n[g]=new DocxQrCode(i,t.xmlTemplater,m,t.xmlTemplater.DocxGen.qrCodeNumCallBack),n[g].decode(e)},l=i.decode(a)}}(this)(r):this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!1))):w.push(void 0)):w.push(void 0)):w.push(void 0);else if(null!=this.xmlTemplater.currentScope.img)if(null!=this.xmlTemplater.currentScope.img[g]){if(r=this.xmlTemplater.currentScope.img[g].name,o=this.xmlTemplater.currentScope.img[g].data,null==this.xmlTemplater.DocxGen)throw"DocxGen not defined";a=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,o),p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p?(this.xmlTemplater.imageId++,p.setAttribute("id",this.xmlTemplater.imageId),p.setAttribute("name",""+r),d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(d.setAttribute("r:embed","rId"+a),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),w.push(this.xmlTemplater.content=this.xmlTemplater.content.replace(l[0],DocUtils.xml2Str(m)))):w.push(void 0)):w.push(void 0)}else w.push(void 0);else w.push(void 0);return w},e}(),m.ImgReplacer=e}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t,a,r,s,l){if(this.xmlTemplater=a,this.imgName=null!=r?r:"",this.num=s,this.callback=l,this.data=t,void 0===this.data)throw"data of qrcode can't be undefined";"browser"===e&&(this.base64Data=JSZip.base64.encode(this.data)),this.ready=!1,this.result=null}return t.prototype.decode=function(t){var a;return this.callback=t,a=this,this.qr=new QrCode,this.qr.callback=function(){var t;return a.ready=!0,a.result=this.result,t=new a.xmlTemplater.currentClass(this.result,a.xmlTemplater.toJson()),t.applyTags(),a.result=t.content,a.searchImage()},"browser"===e?this.qr.decode("data:image/png;base64,"+this.base64Data):this.qr.decode(this.data,this.data.decoded)},t.prototype.searchImage=function(){var t,e,a;if("gen:"===this.result.substr(0,4))return t=function(e){return function(a){return e.data=a,e.callback(e,e.imgName,e.num),e.xmlTemplater.DocxGen.localImageCreator(e.result,t)}}(this);if(null===this.result||void 0===this.result||"error decoding QR Code"===this.result.substr(0,22))return this.callback(this,this.imgName,this.num);a=function(t){return function(e){return t.data=e,t.callback(t,t.imgName,t.num)}}(this);try{return DocUtils.loadDoc(this.result,{docx:!1,callback:a,async:!1})}catch(r){return e=r,console.log(e)}},t}(),a.DocxQrCode=t}).call(this);
(function(){var t,e,a,l=[].slice;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(e,a){null==e&&(e=""),null==a&&(a={}),this.tagXml="",this.currentClass=t,this.fromJson(a),this.currentScope=this.Tags,this.templaterState=new TemplaterState}return t.prototype.load=function(t){var e;return this.content=t,this.templaterState.matches=this._getFullTextMatchesFromData(),this.templaterState.charactersAdded=function(){var t,a,l;for(l=[],e=t=0,a=this.templaterState.matches.length;a>=0?a>t:t>a;e=a>=0?++t:--t)l.push(0);return l}.call(this),this.handleRecursiveCase()},t.prototype.parser=function(t){return{get:function(e){return e[t]}}},t.prototype.getValueFromScope=function(t,e){var a,l,n;if(null==t&&(t=this.templaterState.loopOpen.tag),null==e&&(e=this.currentScope),a=this.parser(t),l=a.get(e),null!=l)if("string"==typeof l){if(this.useTag(t),n=DocUtils.encode_utf8(l),-1!==n.indexOf("{")||-1!==n.indexOf("}"))throw"You can't enter { or  } inside the content of a variable"}else n=l;else this.useTag(t),n="undefined",this.DocxGen.logUndefined(t,e);return n},t.prototype.getFullText=function(){var t,e;return this.templaterState.matches=this._getFullTextMatchesFromData(),e=function(){var e,a,l,n;for(l=this.templaterState.matches,n=[],e=0,a=l.length;a>e;e++)t=l[e],n.push(t[2]);return n}.call(this),DocUtils.convert_spaces(e.join(""))},t.prototype._getFullTextMatchesFromData=function(){return this.templaterState.matches=DocUtils.preg_match_all("(<"+this.tagXml+"[^>]*>)([^<>]*)</"+this.tagXml+">",this.content)},t.prototype.calcOuterXml=function(t,e,a,l){var n,r;if(n=t.indexOf("</"+l+">",a),-1===n)throw"can't find endTag "+n;if(n+=("</"+l+">").length,r=Math.max(t.lastIndexOf("<"+l+">",e),t.lastIndexOf("<"+l+" ",e)),-1===r)throw"can't find startTag";return{text:t.substr(r,n-r),startTag:r,endTag:n}},t.prototype.findOuterTagsContent=function(){var t,e;return e=this.templaterState.calcStartTag(this.templaterState.loopOpen),t=this.templaterState.calcEndTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.findInnerTagsContent=function(){var t,e;return e=this.templaterState.calcEndTag(this.templaterState.loopOpen),t=this.templaterState.calcStartTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.fromJson=function(t){return this.Tags=null!=t.Tags?t.Tags:{},this.DocxGen=null!=t.DocxGen?t.DocxGen:null,this.intelligentTagging=null!=t.intelligentTagging?t.intelligentTagging:!1,this.scopePath=null!=t.scopePath?t.scopePath:[],this.usedTags=null!=t.usedTags?t.usedTags:{},this.imageId=null!=t.imageId?t.imageId:0},t.prototype.toJson=function(){return{Tags:DocUtils.clone(this.Tags),DocxGen:this.DocxGen,intelligentTagging:DocUtils.clone(this.intelligentTagging),scopePath:DocUtils.clone(this.scopePath),usedTags:this.usedTags,localImageCreator:this.localImageCreator,imageId:this.imageId}},t.prototype.forLoop=function(t,e){var a,l,n,r,s,i,h,m;if(null==t&&(t=this.findInnerTagsContent().content),null==e&&(e=this.findOuterTagsContent().content),i=this.currentScope[this.templaterState.loopOpen.tag],l="",null!=i){if("object"==typeof i)for(a=h=0,m=i.length;m>h;a=++h)r=i[a],s=this.calcSubXmlTemplater(t,r),l+=s.content;i===!0&&(s=this.calcSubXmlTemplater(t,this.currentScope),l+=s.content)}else s=this.calcSubXmlTemplater(t,{});if(this.content=this.content.replace(e,l),n=this.calcSubXmlTemplater(this.content),-1!==n.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+n.getFullText()+" (3)";return n},t.prototype.dashLoop=function(t,e){var a,l,n,r,s,i,h,m,o,p,g;for(null==e&&(e=!1),p=this.findOuterTagsContent(),a=p.content,h=p.start,n=p.end,s=this.calcOuterXml(this.content,h,n,t),m=o=0,g=this.templaterState.matches.length;g>=0?g>=o:o>=g;m=g>=0?++o:--o)this.templaterState.charactersAdded[m]-=s.startTag;if(i=s.text,-1===this.content.indexOf(i))throw"couln't find outerXmlText in @content";if(r=i,l=r,this.templaterState.tagEnd={numXmlTag:this.templaterState.loopOpen.end.numXmlTag,numCharacter:this.templaterState.loopOpen.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopOpen.start.numXmlTag,numCharacter:this.templaterState.loopOpen.start.numCharacter},e===!1&&(this.templaterState.textInsideTag="-"+this.templaterState.loopOpen.element+" "+this.templaterState.loopOpen.tag),e===!0&&(this.templaterState.textInsideTag="#"+this.templaterState.loopOpen.tag),r=this.replaceTagByValue("",r),l===r)throw"innerXmlText should have changed after deleting the opening tag";if(l=r,this.templaterState.textInsideTag="/"+this.templaterState.loopOpen.tag,this.templaterState.tagEnd={numXmlTag:this.templaterState.loopClose.end.numXmlTag,numCharacter:this.templaterState.loopClose.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopClose.start.numXmlTag,numCharacter:this.templaterState.loopClose.start.numCharacter},r=this.replaceTagByValue("",r),l===r)throw"innerXmlText should have changed after deleting the opening tag";return this.forLoop(r,i)},t.prototype.xmlToBeReplaced=function(t,e,a,l){return t===!0?a:e===!0?"<"+this.tagXml+' xml:space="preserve">'+a+"</"+this.tagXml+">":this.templaterState.matches[l][1]+a+("</"+this.tagXml+">")},t.prototype.replaceXmlTag=function(t,e){var a,l,n,r,s,i,h;if(h=e.xmlTagNumber,l=e.insideValue,s=null!=e.spacePreserve?e.spacePreserve:!0,n=null!=e.noStartTag?e.noStartTag:!1,r=this.xmlToBeReplaced(n,s,l,h),this.templaterState.matches[h][2]=l,i=this.templaterState.matches[h].offset+this.templaterState.charactersAdded[h],this.templaterState.charactersAdded[h+1]+=r.length-this.templaterState.matches[h][0].length,-1===t.indexOf(this.templaterState.matches[h][0]))throw"content "+this.templaterState.matches[h][0]+" not found in content";if(a=t,t=DocUtils.replaceFirstFrom(t,this.templaterState.matches[h][0],r,i),this.templaterState.matches[h][0]=r,a===t)throw"offset problem0: didnt changed the value (should have changed from "+this.templaterState.matches[this.templaterState.tagStart.numXmlTag][0]+" to "+r;return t},t.prototype.replaceTagByValue=function(t,e){var a,l,n,r,s,i,h,m,o,p,g,c,u,S;if(null==e&&(e=this.content),-1===this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].indexOf("}"))throw"no closing tag at @templaterState.tagEnd.numXmlTag "+this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2];if(-1===this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].indexOf("{"))throw"no opening tag at @templaterState.tagStart.numXmlTag "+this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2];if(a=e,this.templaterState.tagEnd.numXmlTag===this.templaterState.tagStart.numXmlTag)l=this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].replace("{"+this.templaterState.textInsideTag+"}",t),e=this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:l,noStartTag:null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first||null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last});else if(this.templaterState.tagEnd.numXmlTag>this.templaterState.tagStart.numXmlTag){for(h=/^([^{]*){.*$/,m=this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].match(h),e=null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first||null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last?this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:t,noStartTag:null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last}):this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:m[1]+t}),r=o=c=this.templaterState.tagStart.numXmlTag+1,u=this.templaterState.tagEnd.numXmlTag;u>=c?u>o:o>u;r=u>=c?++o:--o)this.templaterState.charactersAdded[r+1]=this.templaterState.charactersAdded[r],e=this.replaceXmlTag(e,{xmlTagNumber:r,insideValue:"",spacePreserve:!1});i=/^[^}]*}(.*)$/,l=this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].replace(i,"$1"),this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag+1]=this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag],e=this.replaceXmlTag(e,{xmlTagNumber:r,insideValue:l})}for(S=this.templaterState.matches,n=p=0,g=S.length;g>p;n=++p)s=S[n],n>this.templaterState.tagEnd.numXmlTag&&(this.templaterState.charactersAdded[n+1]=this.templaterState.charactersAdded[n]);if(a===e)throw"copycontent=content !!";return e},t.prototype.applyTags=function(){var t,e,a,l,n,r,s,i,h,m,o,p,g,c,u;for(this.templaterState.initialize(),c=this.templaterState.matches,r=i=0,o=c.length;o>i;r=++i)for(l=c[r],e=l[2],n=h=0,p=e.length;p>h;n=++h){for(t=e[n],this.templaterState.currentStep={numXmlTag:r,numCharacter:n},u=this.templaterState.matches,s=m=0,g=u.length;g>m;s=++m)if(a=u[s],r>=s&&this.content[a.offset+this.templaterState.charactersAdded[s]]!==a[0][0])throw"no < at the beginning of "+a[0][0]+" (2)";if("{"===t)this.templaterState.startTag();else if("}"===t){if(this.templaterState.endTag(),"simple"===this.templaterState.loopType()&&this.replaceSimpleTag(),"/"===this.templaterState.textInsideTag[0]&&"/"+this.templaterState.loopOpen.tag===this.templaterState.textInsideTag)return this.replaceLoopTag()}else this.templaterState.inTag===!0&&(this.templaterState.textInsideTag+=t)}return new ImgReplacer(this).findImages().replaceImages(),this},t.prototype.handleRecursiveCase=function(){var t,e,a;return a=function(t){return function(){var e,a,n,r,s;return e=arguments[0],n=4<=arguments.length?l.call(arguments,1,s=arguments.length-2):(s=1,[]),a=arguments[s++],r=arguments[s++],n.unshift(e),n.offset=a,n.first=!0,t.templaterState.matches.unshift(n),t.templaterState.charactersAdded.unshift(0)}}(this),this.content.replace(/^()([^<]+)/,a),e=function(t){return function(){var e,a,n,r,s;return e=arguments[0],n=4<=arguments.length?l.call(arguments,1,s=arguments.length-2):(s=1,[]),a=arguments[s++],r=arguments[s++],n.unshift(e),n.offset=a,n.last=!0,t.templaterState.matches.push(n),t.templaterState.charactersAdded.push(0)}}(this),t="(<"+this.tagXml+"[^>]*>)([^>]+)$",this.content.replace(new RegExp(t),e)},t.prototype.useTag=function(t){var e,a,l,n,r,s;for(l=this.usedTags,s=this.scopePath,e=n=0,r=s.length;r>n;e=++n)a=s[e],null==l[a]&&(l[a]={}),l=l[a];return""!==t?l[t]=!0:void 0},t.prototype.calcIntellegentlyDashElement=function(){return!1},t.prototype.replaceSimpleTag=function(){return this.content=this.replaceTagByValue(this.getValueFromScope(this.templaterState.textInsideTag))},t.prototype.replaceLoopTag=function(){var t;return"dash"===this.templaterState.loopType()?this.dashLoop(this.templaterState.loopOpen.element):this.intelligentTagging===!0&&(t=this.calcIntellegentlyDashElement(),t!==!1)?this.dashLoop(t,!0):this.forLoop()},t.prototype.calcSubXmlTemplater=function(t,e){var a,l;if(a=this.toJson(),null!=e&&(a.Tags=e,a.scopePath=a.scopePath.concat(this.templaterState.loopOpen.tag)),l=new this.currentClass(t,a),l.applyTags(),-1!==l.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+l.getFullText()+" (1)";return this.imageId=l.imageId,l},t}(),a.XmlTemplater=t}).call(this);
(function(){var t,n,e,l={}.hasOwnProperty,o=function(t,n){function e(){this.constructor=t}for(var o in n)l.call(n,o)&&(t[o]=n[o]);return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t};e="undefined"!=typeof global&&null!==global?global:window,n="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(t){function n(t,e){if(null==t&&(t=""),null==e&&(e={}),n.__super__.constructor.call(this,"",e),this.currentClass=n,this.tagXml="w:t","string"!=typeof t)throw"content must be string!";this.load(t)}var e;return o(n,t),e=new XmlUtil,n.prototype.calcIntellegentlyDashElement=function(){var t,l,o,r,s,a,i,c;for(c=this.findOuterTagsContent(),t=c.content,r=c.start,l=c.end,o=e.getListXmlElements(this.content,r,l-r),a=0,i=o.length;i>a;a++)if(s=o[a],"<w:tc>"===s.tag)return"w:tr";return n.__super__.calcIntellegentlyDashElement.call(this)},n}(XmlTemplater),e.DocXTemplater=t}).call(this);