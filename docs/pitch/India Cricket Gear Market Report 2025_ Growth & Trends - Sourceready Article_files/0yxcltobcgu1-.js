(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,741836,121903,110755,e=>{"use strict";var t,i,o,a=e.i(115497),d=e.i(601173),r=e.i(786709),l=e.i(552354),n=e.i(590665),s=e.i(606897),c=e.i(264409),p=e.i(694181),u=e.i(751913),h=e.i(253380),m=e.i(409462);e.i(259480);var g=e.i(830055),f=e.i(798523),x=e.i(41953),y=e.i(274935),C=e.i(833484),S=e.i(650394),_=e.i(527222),w=e.i(422659),I=e.i(761685),v=e.i(712584),b=e.i(824183),T=e.i(986261),P=e.i(310282);let M="all-products",L="my-products";var O=((t={}).name="name",t.category="category",t.purchasePrice="purchasePrice",t.moq="moq",t.review="review",t.productScope="productScope",t.manualBound="manualBound",t.vendorLocation="vendorLocation",t.vendorTargetMarkets="vendorTargetMarkets",t.vendorCertifications="vendorCertifications",t.vendorBusinessType="vendorBusinessType",t.vendorYearFounded="vendorYearFounded",t.vendorEmployeeCount="vendorEmployeeCount",t.vendorVerifiedSources="vendorVerifiedSources",t),j=((i={}).PRODUCT="PRODUCT",i.VENDOR="VENDOR",i),N=((o={}).ALL="ALL",o.PLATFORM="PLATFORM",o.CUSTOM="CUSTOM",o);e.s(["ALL_PRODUCTS_LIST_ID",0,M,"FILTER_LABEL_MAP",0,{name:"Product name",category:"Product category",purchasePrice:"Purchase price (USD)",moq:"MOQ",review:"Review (out of 5)",productScope:"Product scope",manualBound:"Only show products added to supplier",vendorLocation:"Supplier location",vendorTargetMarkets:"Supplier key export market",vendorCertifications:"Supplier certifications",vendorBusinessType:"Supplier business type",vendorYearFounded:"Supplier founding years",vendorEmployeeCount:"Supplier employee count",vendorVerifiedSources:"Supplier verified sources"},"MENUS",0,[{type:"PRODUCT",icon:"PRODUCT",title:"Product",filters:["purchasePrice","moq","review","productScope","manualBound"]},{type:"VENDOR",icon:"FILE_COMPANY_INFO",title:"Supplier",filters:["vendorLocation","vendorTargetMarkets","vendorCertifications","vendorYearFounded","vendorEmployeeCount","vendorVerifiedSources"]}],"MY_PRODUCTS_LIST_ID",0,L,"MenuType",()=>j,"PRODUCT_SCOPE_SEGMENTS",0,[{id:"ALL",name:"All"},{id:"PLATFORM",name:"Platform"},{id:"CUSTOM",name:"Custom"}],"ProductFilterItemKey",()=>O,"ProductScope",()=>N],121903);class k{entityById={};_listIds=[];constructor(){(0,P.makeAutoObservable)(this,{})}getRow(e){return this.entityById[e]}getData=async e=>{let t=(await v.appSDK.ProductList({id:e})).productList;if(!t)return;let i=this.entityById[t.id];return i?((0,P.runInAction)(()=>{this.entityById[t.id]={...i,...t}}),this.entityById[t.id]):((0,P.runInAction)(()=>{this.entityById[t.id]=t}),t)};listData=async e=>{let t=(await v.appSDK.ProductLists({input:e.where??{}})).productLists,i=[];return t.forEach(e=>{e&&((0,P.runInAction)(()=>{this.entityById[e.id]=e}),i.push(e.id))}),(0,P.runInAction)(()=>{this._listIds=(0,T.default)([...this._listIds,...i])}),{total:t.length,pageInfo:{page:e.page,size:e.size},data:t}};async createData(e){let t=(await v.appSDK.CreateProductList({input:e})).createProductList;return(0,P.runInAction)(()=>{this.entityById[t.id]=t,this._listIds.push(t.id)}),t.id}async updateData({id:e,input:t}){await v.appSDK.UpdateProductList({id:e,input:t}),(0,P.runInAction)(()=>{let i=this.entityById[e];i&&(this.entityById[e]={...i,name:t.name})})}async deleteData(e){this.getRow(e)&&(await v.appSDK.DeleteProductList({id:e}),(0,P.runInAction)(()=>{delete this.entityById[e],this._listIds=this._listIds.filter(t=>t!==e)}))}async addProductsToProductLists(e,t){await v.appSDK.AddProductsToProductLists({listIds:e,productIds:t})}async removeProductsFromProductLists(e,t){await v.appSDK.RemoveProductsFromProductLists({listIds:e,productIds:t})}get tabs(){return[{id:M,name:"All products",icon:"PRODUCT"}].concat(this.listIds.map(e=>({id:e,name:this.getRow(e)?.name??"",icon:"LIST"})))}get productSelectTabs(){return[{id:L,name:"My products"}].concat(this.listIds.map(e=>({id:e,name:this.getRow(e)?.name??"",icon:"LIST"})))}get listIds(){return this._listIds}set listIds(e){(0,b.default)(e,this._listIds)||(this._listIds=e,v.appSDK.SortProductLists({input:e.map((e,t)=>({id:e,order:t}))}))}}let R=null,D=(0,g.observer)(({isOpen:e,setIsOpen:t,refElement:i,productIds:o,onSave:d})=>{let l=(R||(R=new k),R),[n,s]=(0,S.useState)(!1),[c,p]=(0,S.useState)([]),{rows:u,loadListData:g}=(0,I.useTableData)({entityStore:l,isPending:!e}),{addToast:f}=(0,m.useToast)(),x=(0,S.useMemo)(()=>u.map(e=>({value:e.id,name:e.name??"(Unnamed list)"})),[u]),y=async e=>{s(!0);try{let t=await l.createData({name:e});t&&(f({title:"Supplier list created",type:"success"}),await g(),p(e=>[...e,t]))}catch(e){f({title:"Failed to create list",description:e.message,type:"error"})}s(!1)},C=async()=>{if(c.length)try{s(!0),await l.addProductsToProductLists(c,o),f({title:"Products added to list",type:"success"}),await d?.()}finally{s(!1),t(!1)}};return(0,a.jsxs)($,{isOpen:e,refElement:i,onClose:()=>t(!1),hasOffset:!0,usePortal:!0,placement:"bottom-start",children:[(0,a.jsxs)(F,{children:[(0,a.jsx)(h.Typography,{type:"h3",children:"Add to product list"}),(0,a.jsx)(r.Button,{buttonType:"text",icon:"CLOSE",onClick:()=>t(!1)})]}),(0,a.jsx)(w.InputSelect,{title:"Add product(s) to list",placeholder:"Select or add product list",searchPlaceholder:"Search or add product list",options:x,value:c,isDisabled:n,autofocus:!0,includeSearch:!0,usePortal:!0,isMulti:!0,onAddClick:e=>y(e),onChange:e=>{e&&Array.isArray(e)&&p(e)}}),(0,a.jsxs)(E,{children:[(0,a.jsx)(r.Button,{buttonType:"text",onClick:()=>t(!1),children:"Cancel"}),(0,a.jsx)(r.Button,{buttonType:"primary",onClick:C,isLoading:n,children:"Confirm"})]})]})}),$=(0,f.default)(_.DropdownWrapper).withConfig({displayName:"AddToProductList__Wrapper",componentId:"sc-f1b6b382-0"})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  width: 480px;
`,E=f.default.div.withConfig({displayName:"AddToProductList__Footer",componentId:"sc-f1b6b382-1"})`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,F=f.default.div.withConfig({displayName:"AddToProductList__Header",componentId:"sc-f1b6b382-2"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;e.s(["AddToProductList",0,D],110755);var A=e.i(347726),B=e.i(170581);let H=(0,g.observer)(({className:e,card:t,checked:i,onCheck:o,showReference:r,globalFilterMatch:n,filterMatch:s,titleMaxRow:p=2,showImageSearch:g=!0,inSlideout:f,fromPublicSupplier:_,onButtonMouseEnter:w,onButtonMouseLeave:I})=>{let{media:v,title:b,shop:T,retailPrice:P,retailPriceUnit:M,moq:L,freight:O,freightUnit:j,type:N,purchasePrice:k,purchasePriceUnit:R}=t,$=v?.[0],{checkAuthFlow:E}=(0,y.useCheckAuthFlow)(),F=P&&M?`${M}${P}`:void 0,H=k&&R?`${R}${k}`:void 0,ed=N===d.ProductType.b2c?F:H,[er,el]=(0,S.useState)(!1),en=(0,S.useRef)(null),es=(0,c.useIsSmallWindow)(),{pushSlideout:ec}=(0,A.useSlideout)(),{addToast:ep}=(0,m.useToast)(),{handleImageSearch:eu}=(0,C.useImageSearch)(),eh=E(()=>{el(!0)});E(()=>{t.id&&(0,B.getEmitter)().emit(B.EventEmitterType.PRODUCT_DETAIL_REFERENCE,[t],ep)});let em=E(e=>{e.stopPropagation(),ec({type:x.SlideoutHistoryType.PRODUCT_DETAILS,id:t.id,isFromSearch:!!r,showImageSearch:g})});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(U,{className:e,isSaveToListOpen:er,globalFilterMatch:n,filterMatch:s,onClick:em,children:[(0,a.jsxs)(V,{children:[$?.url?(0,a.jsx)(q,{attachment:$,quality:"high"}):(0,a.jsx)(z,{icon:"PRODUCT",size:{width:64,height:64}}),!!t.manualBound&&_&&(0,a.jsx)(u.Tooltip,{contentTitle:"Added by you",isWrapped:!1,children:(0,a.jsx)(W,{children:(0,a.jsx)(ea,{icon:"HAND_RAISED",size:{width:12,height:12},$_css:l.COLORS.blue})})})]}),!es&&(0,a.jsxs)(K,{children:[(0,a.jsx)(Y,{children:!!o&&(0,a.jsx)(G,{className:"product-checkbox",isChecked:i,onClick:(e,t)=>{t?.stopPropagation(),o(e)}})}),(0,a.jsxs)(Q,{children:[g&&$?.url&&(0,a.jsx)(X,{tooltip:"Image search",icon:"SEARCH_FRAME",buttonType:"secondary",onMouseEnter:w,onMouseLeave:I,onClick:e=>{e.stopPropagation(),eu($.url,!f)}}),(0,a.jsx)(J,{className:"product-savelist",tooltip:"Save to collection",buttonType:"secondary",icon:"LIST_ADD",onMouseEnter:w,onMouseLeave:I,onClick:e=>{e.stopPropagation(),eh()},ref:en})]})]}),(0,a.jsxs)(Z,{children:[!!T&&(0,a.jsxs)(ee,{children:[T?.logo&&(0,a.jsx)(et,{type:N,icon:T.logo,size:{width:16,height:16}}),(0,a.jsx)(h.Typography,{type:"caption",children:T?.name})]}),(0,a.jsx)(ei,{type:es?"caption2":"body1",maxRows:p,children:b}),!!ed&&(0,a.jsx)(eo,{type:"body1",children:ed}),O?(0,a.jsx)(h.Typography,{type:"caption",children:`${j}${O} delivery`}):L?(0,a.jsx)(h.Typography,{type:"caption",children:`Min. Order: ${L}`}):null]})]}),(0,a.jsx)(D,{isOpen:er,setIsOpen:el,refElement:en.current,productIds:t.id?[t.id]:[]})]})}),U=f.default.div.withConfig({displayName:"ProductCard__Container",componentId:"sc-98fd215-0"})`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  cursor: pointer;
  border-radius: 10px;
  padding: 2px;

  @media ${c.Mobile} {
    gap: 4px;
    padding: 1px;
  }

  background-color: ${e=>e.globalFilterMatch?l.COLORS.yellow10:e.filterMatch?l.COLORS.blue05:l.COLORS.white};

  &:hover {
    .product-checkbox,
    .product-savelist {
      display: flex;
    }
  }

  ${e=>e.isSaveToListOpen&&f.css`
      .product-savelist {
        display: flex;
      }
    `}
`,K=f.default.div.withConfig({displayName:"ProductCard__Header",componentId:"sc-98fd215-1"})`
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 0 8px;
  left: 0;
  right: 0;
`,W=f.default.div.withConfig({displayName:"ProductCard__CustomBadge",componentId:"sc-98fd215-2"})`
  position: absolute;
  display: flex;
  bottom: 8px;
  left: 8px;
  padding: 0 5px;
  border-radius: 8px;
  height: 16px;
  background: rgba(41, 45, 61, 0.08);
  backdrop-filter: blur(4px);
  align-items: center;
`,V=f.default.div.withConfig({displayName:"ProductCard__ImageContainer",componentId:"sc-98fd215-3"})`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;

  ${c.PictureBackground}
`,q=(0,f.default)(p.Thumbnail).withConfig({displayName:"ProductCard__Picture",componentId:"sc-98fd215-4"})`
  width: 100%;
  height: 100%;
  color: ${l.COLORS.black10};
  object-fit: cover;

  transition: transform 300ms ease;

  &:hover {
    transform: scale(110%);
  }
`,z=(0,f.default)(s.Icon).withConfig({displayName:"ProductCard__EmptyPicture",componentId:"sc-98fd215-5"})`
  color: ${l.COLORS.black10};
`,G=(0,f.default)(n.CheckboxItem).withConfig({displayName:"ProductCard__Checkbox",componentId:"sc-98fd215-6"})`
  display: ${e=>e.isChecked?"flex":"none"};
`,Y=f.default.div.withConfig({displayName:"ProductCard__ButtonContainer",componentId:"sc-98fd215-7"})`
  display: flex;
  gap: 8px;
`;var Q=(0,f.default)(Y).withConfig({displayName:"ProductCard___StyledButtonContainer",componentId:"sc-98fd215-8"})({flexDirection:"column"});let J=(0,f.default)(r.Button).withConfig({displayName:"ProductCard__SaveCollection",componentId:"sc-98fd215-9"})`
  background-color: ${l.COLORS.white};
  display: none;
`;(0,f.default)(r.Button).withConfig({displayName:"ProductCard__Reference",componentId:"sc-98fd215-10"})`
  background-color: ${l.COLORS.white};
`;let X=(0,f.default)(r.Button).withConfig({displayName:"ProductCard__ImageSearch",componentId:"sc-98fd215-11"})`
  background-color: ${l.COLORS.white};
`,Z=f.default.div.withConfig({displayName:"ProductCard__Fields",componentId:"sc-98fd215-12"})`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,ee=f.default.div.withConfig({displayName:"ProductCard__SourceContainer",componentId:"sc-98fd215-13"})`
  display: flex;
  align-items: center;
  gap: 4px;
`,et=(0,f.default)(s.Icon).withConfig({displayName:"ProductCard__SourceLogo",componentId:"sc-98fd215-14"})`
  border: 1px solid ${l.COLORS.black10};
  border-radius: ${e=>e.type===d.ProductType.b2b?"4px":"8px"};
`,ei=(0,f.default)(h.Typography).withConfig({displayName:"ProductCard__Title",componentId:"sc-98fd215-15"})`
  font-weight: 500;
`,eo=(0,f.default)(h.Typography).withConfig({displayName:"ProductCard__Price",componentId:"sc-98fd215-16"})`
  font-weight: 500;
`;var ea=(0,f.default)(s.Icon).withConfig({displayName:"ProductCard___StyledIcon",componentId:"sc-98fd215-17"})(e=>({color:e.$_css}));e.s(["ProductCard",0,H],741836)},413371,e=>{"use strict";e.s(["FIELDS_HIGHLIGHT_KEY",0,"FIELDS_HIGHLIGHT"])},155577,e=>{"use strict";var t=e.i(626940);let i=(e,i)=>(o,a,d)=>{(i?e=>window.open(e,"_blank"):e?e=>t.default.replace(e,void 0,d):e=>{let i=t.default.asPath.split("?")[0];e.split("?")[0]===i?t.default.replace(e,void 0,d):t.default.push(e,void 0,d)})(o)},o=i(!1,!1),a=i(!0,!1);i(!1,!0),e.s(["pushRoute",0,o,"replaceRoute",0,a])},429602,e=>{"use strict";var t=e.i(115497),i=e.i(786709),o=e.i(606897),a=e.i(264409),d=e.i(253380);e.i(259480);var r=e.i(830055),l=e.i(798523),n=e.i(336621),s=e.i(60520),c=e.i(650394),p=e.i(799438),u=e.i(601173),h=e.i(552354),m=e.i(482443),g=e.i(552049),f=e.i(837661),x=e.i(113357);let y=(0,r.observer)(({className:e,supplier:i,item:o,onCloseEvidencePopup:a})=>{let[d,r]=(0,c.useState)(!1),l=(0,c.useRef)(null),n=(0,s.getMatchScoreText)(o),h=(0,s.getMatchScoreIcon)(o),m=(0,s.getMatchScoreChipColor)(o),g=(0,c.useMemo)(()=>(o.evidences??[]).map(e=>{switch(e.type){case u.MatchScoreEvidenceType.WEBSITE_LINK:return{type:"website",title:e.title,link:e.source,description:e.text};case u.MatchScoreEvidenceType.SUPPLIER_PROFILE:if(e.sourceId&&"products"===e.source){let t=i.products?.find(t=>t.id===e.sourceId);if(!t)return;return{type:"product",id:t.id,title:t.title,logo:t.media?.[0]?.url,category:t.category}}return{type:"supplier",title:i.name,description:e.text,id:i.id,logo:i.logo?.[0]?.url,country:i.country,anchorField:e.source,sourceId:e.sourceId};default:return}}).filter(p.isNotNullable),[o.evidences,i.country,i.id,i.logo,i.name,i.products]);return(0,t.jsxs)(C,{className:(0,x.default)(e,"supplier-requirement-item"),children:[(0,t.jsx)(w,{type:"tag",icon:h,text:n,color:m}),(0,t.jsx)(v,{type:"caption",isTextEllipsis:!1,children:o.name}),(0,t.jsxs)(S,{children:[(0,t.jsx)(I,{type:"caption",isTextEllipsis:!1,children:o.reason}),!!o.evidences?.length&&(0,t.jsx)(_,{ref:l,type:"tag",iconSize:{width:8,height:8},icon:"SPARK_SINGLE",text:o.evidences?.length,onClick:e=>{e.stopPropagation(),r(!0)}})]}),(0,t.jsx)(f.EvidencePopup,{hideFooter:!0,title:"Links",evidences:g,isOpen:d,onClose:()=>{r(!1),a?.()},refElement:l})]})}),C=l.default.div.withConfig({displayName:"SupplierRequirementItem__Item",componentId:"sc-f4a2106e-0"})`
  display: flex;
  flex-direction: column;
  background-color: ${h.COLORS.black03};
  border-radius: 8px;
  padding: 12px;
  gap: 8px;
`,S=l.default.div.withConfig({displayName:"SupplierRequirementItem__Reason",componentId:"sc-f4a2106e-1"})`
  display: inline;
  line-height: 16px !important;
`,_=(0,l.default)(g.Chip).withConfig({displayName:"SupplierRequirementItem__InlineChip",componentId:"sc-f4a2106e-2"})`
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  height: 16px;
  padding: 1px 5px 1px 1px;
  gap: 0px;

  span {
    ${m.Caption2Mixin}
  }

  svg {
    color: ${h.COLORS.blue60};
  }
`,w=(0,l.default)(g.Chip).withConfig({displayName:"SupplierRequirementItem__MatchChip",componentId:"sc-f4a2106e-3"})`
  span {
    ${m.CaptionMixin}
  }
  ${({color:e})=>e&&l.css`
      background-color: ${function(e){if(Number.isNaN(.1))throw Error("alpha must be a number between 0 and 1");let t=e.replace("#","").toLowerCase();if(3===t.length&&(t=t.split("").map(e=>e+e).join("")),8===t.length&&(t=t.slice(0,6)),6!==t.length)throw Error("Invalid hex color format");let i=Math.round(25.5).toString(16).padStart(2,"0");return`#${t}${i}`}(e===h.SelectColor.redLightest?h.COLORS.red60:e===h.SelectColor.yellowLightest?h.COLORS.yellow60:h.COLORS.green60)};
    `}
`,I=(0,l.default)(d.Typography).withConfig({displayName:"SupplierRequirementItem__ReasonText",componentId:"sc-f4a2106e-4"})`
  color: ${h.COLORS.black60};
  display: inline;
`;var v=(0,l.default)(d.Typography).withConfig({displayName:"SupplierRequirementItem___StyledTypography",componentId:"sc-f4a2106e-5"})({fontWeight:500});let b=(0,r.observer)(({className:e,hideIcon:i,row:r,requirements:l,maxRows:p})=>{let u=r.matchScore?.summary,[h,m]=(0,c.useState)(!1),[g,f]=(0,c.useState)(!1),x=(0,s.getFitFromMatchScore)(r.matchScore?.score??null)??n.SupplierMatchScoreFit.POOR,y=(0,s.getFadeGradient)(x),C=(0,a.useIsSmallWindow)();return(0,t.jsxs)(T,{className:e,children:[!!u&&(0,t.jsxs)(P,{children:[!i&&(0,t.jsx)(M,{children:(0,t.jsx)(o.Icon,{icon:"SPARK_LINEAR_GRADIENT"})}),(0,t.jsx)(d.Typography,{isTextEllipsis:!!p&&!h,maxRows:p,onEllipsis:f,type:C?"caption":"body1",children:u}),u&&g&&(h?(0,t.jsx)(O,{fit:x,children:(0,t.jsx)(k,{buttonType:"text",icon:"CHEVRON_UP_SMALL",itemSize:"small",onClick:e=>{e.stopPropagation(),m(!1)}})}):(0,t.jsxs)(O,{fit:x,children:[(0,t.jsx)(j,{$gradient:y}),(0,t.jsx)(N,{buttonType:"text",itemSize:"small",icon:"CHEVRON_DOWN_SMALL",onClick:e=>{e.stopPropagation(),m(!0)}})]}))]}),(0,t.jsx)(L,{children:(l??[]).map(e=>{let i=r.matchScore?.items?.find(t=>t.name===e.name);return i?(0,t.jsx)(R,{supplier:r,item:i,$_css:C?"240px":"320px"},e.name):null})})]})}),T=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__Container",componentId:"sc-d36a1e98-0"})`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 16px;

  @media ${a.Mobile} {
    gap: 8px;
  }
`,P=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__TitleContainer",componentId:"sc-d36a1e98-1"})`
  display: flex;
  gap: 8px;
  position: relative;
`,M=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__IconContainer",componentId:"sc-d36a1e98-2"})`
  padding-top: 2px;
`,L=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__CardContainer",componentId:"sc-d36a1e98-3"})`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  margin-bottom: -12px;

  @media ${a.Mobile} {
    scrollbar-width: none;
    margin-bottom: 0;
  }
`,O=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__ViewMoreWrapper",componentId:"sc-d36a1e98-4"})`
  position: absolute;
  bottom: -4px;
  right: 0;
  display: flex;
  align-items: flex-end;

  button {
    background-color: ${({fit:e})=>s.FIT_TO_COLOR10[e]};
  }
`,j=l.default.div.withConfig({displayName:"SupplierMatchScoreDetail__FadeGradient",componentId:"sc-d36a1e98-5"})`
  width: 24px;
  height: 20px;
  background: ${({$gradient:e})=>e};
`,N=(0,l.default)(i.Button).withConfig({displayName:"SupplierMatchScoreDetail__ViewMoreButton",componentId:"sc-d36a1e98-6"})``,k=(0,l.default)(i.Button).withConfig({displayName:"SupplierMatchScoreDetail__ViewLessButton",componentId:"sc-d36a1e98-7"})``;var R=(0,l.default)(y).withConfig({displayName:"SupplierMatchScoreDetail___StyledSupplierRequirementItem",componentId:"sc-d36a1e98-8"})(e=>({width:e.$_css,flexShrink:0}));e.s(["SupplierMatchScoreDetail",0,b],429602)},360047,935115,473706,e=>{"use strict";var t=e.i(115497),i=e.i(786709),o=e.i(482443),a=e.i(606897),d=e.i(264409),r=e.i(253380),l=e.i(674941);e.i(259480);var n=e.i(830055),s=e.i(486065),c=e.i(798523),p=e.i(60520);let u=(0,n.observer)(({highlights:e,showMoreCount:i=4})=>{let{addModal:o}=(0,l.useModal)(),a=(0,d.useIsSmallWindow)(),n=e??[],c=n.length>i,u=c?n.slice(0,i):n;return 0===n.length?null:(0,t.jsxs)(h,{children:[(0,t.jsx)(m,{children:u.map(e=>{let i=(0,p.getHighlightMeta)(e.code);return(0,t.jsxs)(g,{children:[a?"·":(0,t.jsx)(x,{icon:i.icon}),(0,t.jsx)(r.Typography,{type:a?"caption2":"body1",children:i.title})]},e.code)})}),c&&(0,t.jsxs)(f,{itemSize:a?"small":"medium",buttonType:"text",onClick:e=>{e.stopPropagation(),o({type:s.ModalType.SupplierHighlightsModal,props:{highlights:n}})},children:["+",n.length-u.length," more"]})]})}),h=c.default.div.withConfig({displayName:"Highlight__Container",componentId:"sc-fdd1c21c-0"})`
  display: flex;
  align-items: center;
  height: 32px;
  gap: 8px;

  @media ${d.Mobile} {
    gap: 4px;
    height: 14px;
  }
`,m=c.default.div.withConfig({displayName:"Highlight__List",componentId:"sc-fdd1c21c-1"})`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media ${d.Mobile} {
    gap: 8px;
  }
`,g=c.default.div.withConfig({displayName:"Highlight__Item",componentId:"sc-fdd1c21c-2"})`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`,f=(0,c.default)(i.Button).withConfig({displayName:"Highlight__MoreButton",componentId:"sc-fdd1c21c-3"})`
  flex-shrink: 0;

  @media ${d.Mobile} {
    span {
      ${o.Caption2Mixin}
    }
  }
`;var x=(0,c.default)(a.Icon).withConfig({displayName:"Highlight___StyledIcon",componentId:"sc-fdd1c21c-4"})({flexShrink:0});e.s(["HighlightList",0,u],360047);var y=e.i(552354),C=e.i(785361),S=e.i(415806),_=e.i(103693),w=e.i(650394);let I=(0,n.observer)(({stats:e,customers:i,targetMarkets:o,reviewScore:a,products:r,reviewDetails:l,description:n,highlight:s,onCardClick:c})=>{let p=(0,S.getMobxSchemaStore)(),u=(0,d.useIsSmallWindow)(),h=(0,w.useMemo)(()=>{let t=s?.globalFilter,d=s?.filter,r=e=>!!e&&(t?e.toLowerCase().includes(t.toLowerCase()):!!d&&(0,_.matchText)(e,d)),c=[];e?.shipment_count&&c.push({title:"Shipments",value:e.shipment_count,field:"stats",moreText:"View detail",isHighlighted:!1});let h=(()=>{if(!i)return{customer:void 0,isHighlighted:!1};let e=s?i.find(e=>r(e.name)):void 0;return{customer:e||i[0],isHighlighted:!!e}})();if(h.customer){let e=i&&i.length-1,o=u?h.customer.name+(e&&e>0?`,+${e}`:""):h.customer.name;c.push({title:"Key customer",value:(0,C.getHighlightText)(o,{globalFilter:t,filter:d}),field:"customers",moreText:e?`${e} more`:void 0,isHighlighted:h.isHighlighted})}let m=(()=>{if(!o)return{market:void 0,isHighlighted:!1};let e=o.map(e=>p.supplierKeyExportMarketOptionsByCode[e]),t=s?e.find(e=>r(e?.name)):void 0;return{market:t||p.supplierKeyExportMarketOptionsByCode[o[0]],isHighlighted:!!t}})();if(m.market){let e=o&&o.length-1,i=u?m.market.name+(e&&e>0?`,+${e}`:""):m.market.name;c.push({title:"Key market",value:(0,C.getHighlightText)(i,{globalFilter:t,filter:d}),field:"targetMarkets",moreText:e?`${e} more`:void 0,isHighlighted:m.isHighlighted})}if(null!=a){let e=l?.length||0;c.push({title:"Review",value:a,field:"reviewScore",moreText:e?`${e} reviews`:void 0,isHighlighted:!1})}if(n){let e=!!s&&r(n);c.push({title:"Description",value:(0,C.getHighlightText)(n,{globalFilter:t,filter:d},{extractContext:!0,contextLength:10}),field:"description",moreText:"View all",isHighlighted:e})}return c.sort((e,t)=>e.isHighlighted&&!t.isHighlighted?-1:!e.isHighlighted&&t.isHighlighted?1:0),c.slice(0,4).map(({isHighlighted:e,...t})=>t)},[i,l?.length,a,e?.shipment_count,o,s,n,p.supplierKeyExportMarketOptionsByCode,u]),m=!!r?.length;return 0===h.length?null:u?(0,t.jsx)(M,{children:h.map(e=>(0,t.jsxs)(L,{onClick:t=>{t.stopPropagation(),c?.(e.field)},children:[(0,t.jsx)(O,{type:"caption2",$_css:y.COLORS.black60,children:e.title}),(0,t.jsx)(j,{type:"caption2",children:e.value})]},e.title))}):(0,t.jsx)(v,{hasProductImages:m,children:h.map(e=>(0,t.jsxs)(b,{children:[(0,t.jsx)(N,{useTooltip:!0,type:"caption",$_css2:y.COLORS.black60,children:e.title}),(0,t.jsxs)(T,{children:[(0,t.jsx)(k,{children:e.value}),!!e.moreText&&(0,t.jsx)(P,{buttonType:"text",itemSize:"small",icon:"ARROW_RIGHT",iconPosition:"trailing",onClick:()=>{c?.(e.field)},children:e.moreText})]})]},e.title))})}),v=c.default.div.withConfig({displayName:"FieldCards__CardContainer",componentId:"sc-5ce4c9c2-0"})`
  display: ${({hasProductImages:e})=>e?"grid":"flex"};
  gap: 8px;

  ${({hasProductImages:e})=>e?c.css`
          /* Grid 布局：有产品图片时 */
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 92px);
          width: 240px;
          height: 192px;

          /* 1个卡片：占满2列2行 */
          > :only-child {
            grid-column: 1 / 3;
            grid-row: 1 / 3;
            width: 240px;
            height: 192px;
          }

          /* 2个卡片：每个占2列，分两行 */
          > :first-child:nth-last-child(2) {
            grid-column: 1 / 3;
            grid-row: 1;
            width: 240px;
            height: 92px;
          }
          > :last-child:nth-child(2) {
            grid-column: 1 / 3;
            grid-row: 2;
            width: 240px;
            height: 92px;
          }

          /* 3个卡片：前2个各占1列第1行，第3个占2列第2行 */
          > :first-child:nth-last-child(3) {
            grid-column: 1 / 2; /* 明确只占第1列 */
            grid-row: 1;
            width: 116px;
            height: 92px;
          }
          > :nth-child(2):nth-last-child(2) {
            grid-column: 2 / 3; /* 明确只占第2列 */
            grid-row: 1;
            width: 116px;
            height: 92px;
          }
          > :last-child:nth-child(3) {
            grid-column: 1 / 3;
            grid-row: 2;
            width: 240px;
            height: 92px;
          }

          /* 4个卡片：每个占1列，分两行 */
          > :first-child:nth-last-child(4) {
            grid-column: 1 / 2;
            grid-row: 1;
            width: 116px;
            height: 92px;
          }
          > :nth-child(2):nth-last-child(3) {
            grid-column: 2 / 3;
            grid-row: 1;
            width: 116px;
            height: 92px;
          }
          > :nth-child(3):nth-last-child(2) {
            grid-column: 1 / 2;
            grid-row: 2;
            width: 116px;
            height: 92px;
          }
          > :last-child:nth-child(4) {
            grid-column: 2 / 3;
            grid-row: 2;
            width: 116px;
            height: 92px;
          }
        `:c.css`
          /* Flex 布局：无产品图片时 */
          flex-direction: row;
          flex-wrap: nowrap;

          > * {
            min-width: 0;
            height: 92px;
            width: fit-content;
            max-width: 240px;
          }
        `}
`,b=c.default.div.withConfig({displayName:"FieldCards__ItemContainer",componentId:"sc-5ce4c9c2-1"})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${y.COLORS.black03};
  border-radius: 8px;
  padding: 8px 8px 6px 8px;
  position: relative;
`,T=c.default.div.withConfig({displayName:"FieldCards__BottomContainer",componentId:"sc-5ce4c9c2-2"})`
  position: relative;
  display: flex;
  flex-direction: column;
`,P=(0,c.default)(i.Button).withConfig({displayName:"FieldCards__MoreButton",componentId:"sc-5ce4c9c2-3"})`
  color: ${y.COLORS.black60};
  align-self: flex-start;
  margin-left: -3px;

  svg {
    width: 12px;
    height: 12px;
  }
`,M=c.default.div.withConfig({displayName:"FieldCards__MobileContainer",componentId:"sc-5ce4c9c2-4"})`
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 4px;
  position: relative;
`,L=c.default.div.withConfig({displayName:"FieldCards__MobileItemContainer",componentId:"sc-5ce4c9c2-5"})`
  display: flex;
  flex-direction: column;
  background-color: ${y.COLORS.black03};
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  width: 88px;
`;var O=(0,c.default)(r.Typography).withConfig({displayName:"FieldCards___StyledTypography",componentId:"sc-5ce4c9c2-6"})(e=>({color:e.$_css})),j=(0,c.default)(r.Typography).withConfig({displayName:"FieldCards___StyledTypography2",componentId:"sc-5ce4c9c2-7"})({fontWeight:500}),N=(0,c.default)(r.Typography).withConfig({displayName:"FieldCards___StyledTypography3",componentId:"sc-5ce4c9c2-8"})(e=>({color:e.$_css2})),k=(0,c.default)(r.Typography).withConfig({displayName:"FieldCards___StyledTypography4",componentId:"sc-5ce4c9c2-9"})({fontWeight:500});e.s(["FieldCards",0,I],935115);var R=e.i(751913),D=e.i(41953),$=e.i(347726),E=e.i(274935),F=e.i(741836),A=e.i(828213);let B=(0,n.observer)(({supplierId:e,products:i,productCount:o,productHighlights:a,highlight:r,isFromSearch:l,fromPublicSupplier:n})=>{let[s,c]=(0,w.useState)(!1),{checkAuthFlow:p}=(0,E.useCheckAuthFlow)(),{pushSlideout:u}=(0,$.useSlideout)(),h=(0,d.useIsSmallWindow)(),m=(0,w.useMemo)(()=>{if(!i)return[];let e=[],t=[],o=[];for(let d of i){if(!d.id)continue;let i=a?.[d.id],r=i?.filterMatch??!1,l=i?.globalFilterMatch??!1,n={product:d,filterMatch:r,globalFilterMatch:l};l?e.push(n):r?t.push(n):o.push(n)}return[...e,...t,...o]},[i,a]),g=(0,w.useMemo)(()=>i&&o>i.length,[o,i]);if(!i||i?.length===0)return null;let f=p(t=>{t.stopPropagation(),u({type:D.SlideoutHistoryType.PRODUCT_CARD_LIST,supplierId:e,productPriorityIds:m.map(({product:e})=>e.id),showReference:l,manual:!0,fromPublicSupplier:n,filterMode:D.ProductFilterMode.SUPPLIER})});return(0,t.jsxs)(A.HorizontalScroller,{hasMore:!!g,onViewAll:g?e=>{f(e)}:void 0,scrollAmount:144,children:[m.map(({product:e,filterMatch:i,globalFilterMatch:o})=>{let a=e.media?.[0];if(!a)return null;let d=(0,C.getHighlightText)(e.title,r,{inTooltip:!0});return(0,t.jsx)(R.Tooltip,{contentDesc:d,isDisabled:s,persistPopupWhenDisabled:!0,children:(0,t.jsx)(H,{card:{id:e.id,title:e.title,purchasePrice:e.purchasePrice,purchasePriceUnit:e.purchasePriceUnit,media:e.media},filterMatch:i,globalFilterMatch:o,titleMaxRow:1,showReference:l,onButtonMouseEnter:()=>c(!0),onButtonMouseLeave:()=>c(!1)})},a.fileId)}),h&&g&&(0,t.jsxs)(U,{buttonType:"secondary",onClick:f,children:["+",o-i.length]})]})}),H=(0,c.default)(F.ProductCard).withConfig({displayName:"ProductList__SupplierProductCard",componentId:"sc-e103e4b0-0"})`
  width: 140px;

  @media ${d.Mobile} {
    width: 90px;
  }

  flex-shrink: 0;
`,U=(0,c.default)(i.Button).withConfig({displayName:"ProductList__ViewAllButton",componentId:"sc-e103e4b0-1"})`
  width: 90px;
  height: 90px;
  flex-shrink: 0;

  span {
    font-weight: 500;
  }
`;e.s(["ProductList",0,B],473706)},891165,e=>{"use strict";var t=e.i(115497),i=e.i(798523);e.i(259480);var o=e.i(830055),a=e.i(650394),d=e.i(590665),r=e.i(413371),l=e.i(113357),n=e.i(239359),s=e.i(360047),c=e.i(935115),p=e.i(473706),u=e.i(998266),h=e.i(786709),m=e.i(552354),g=e.i(606897),f=e.i(264409),x=e.i(253380),y=e.i(429602),C=e.i(60520);let S=(0,o.observer)(({row:e,requirements:i})=>{let o=(0,f.useIsSmallWindow)(),[d,r]=(0,a.useState)(!!e.matchScore);(0,a.useEffect)(()=>{r(!!e.matchScore)},[e.matchScore]);let l=(0,C.getMatchScoreBgColor)(e.matchScore);return(0,t.jsxs)(_,{bgColor:l,showDetail:d,children:[(0,t.jsxs)(w,{children:[(0,t.jsx)(T,{supplier:e,trailingIcon:d?"CHEVRON_UP":"CHEVRON_DOWN",onClick:()=>r(!d)}),!o&&i.map(i=>{let o=e.matchScore?.items?.find(e=>e.name===i.name);if(!o)return(0,t.jsxs)(v,{children:[(0,t.jsx)(b,{width:12}),(0,t.jsx)(b,{width:56})]},i.name);let a=(0,C.getMatchScoreIcon)(o),d=(0,C.getMatchScoreColor)(o),l=(0,C.getMatchScoreButtonColor)(o);return(0,t.jsx)(h.Button,{buttonType:"text",color:l,useCustomChildren:!0,onClick:()=>r(e=>!e),children:(0,t.jsxs)(I,{children:[(0,t.jsx)(g.Icon,{icon:a,size:{width:14,height:14},fill:d}),(0,t.jsx)(M,{$_css:m.COLORS.black60,children:i.value})]})},i.name)})]}),d&&!!e.matchScore&&(0,t.jsx)(P,{row:e,requirements:i,hideIcon:o,maxRows:o?2:void 0})]})}),_=i.default.div.withConfig({displayName:"MatchScore__Container",componentId:"sc-2c063e1e-0"})`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${f.Mobile} {
    border-radius: 8px;
    gap: 4px;

    ${({showDetail:e,bgColor:t})=>e&&i.css`
        padding: 8px;
        background: ${t};

        .supplier-requirement-item {
          background-color: rgba(255, 255, 255, 0.5);
        }
      `}
  }
`,w=i.default.div.withConfig({displayName:"MatchScore__TopContainer",componentId:"sc-2c063e1e-1"})`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,I=i.default.div.withConfig({displayName:"MatchScore__Item",componentId:"sc-2c063e1e-2"})`
  display: flex;
  align-items: center;
  gap: 4px;
`;i.default.div.withConfig({displayName:"MatchScore__Space",componentId:"sc-2c063e1e-3"})`
  height: 16px;
  width: 1px;
  background-color: ${m.COLORS.black05};
`;let v=i.default.div.withConfig({displayName:"MatchScore__EmptyContainer",componentId:"sc-2c063e1e-4"})`
  display: flex;
  gap: 4px;
`,b=i.default.div.withConfig({displayName:"MatchScore__EmptyBlock",componentId:"sc-2c063e1e-5"})`
  background-color: rgba(0, 0, 0, 0.06);
  width: ${e=>e.width}px;
  border-radius: 4px;
  height: 12px;
`;var T=(0,i.default)(u.SupplierMatchScoreChip).withConfig({displayName:"MatchScore___StyledSupplierMatchScoreChip",componentId:"sc-2c063e1e-6"})({alignSelf:"flex-start"}),P=(0,i.default)(y.SupplierMatchScoreDetail).withConfig({displayName:"MatchScore___StyledSupplierMatchScoreDetail",componentId:"sc-2c063e1e-7"})({padding:0}),M=(0,i.default)(x.Typography).withConfig({displayName:"MatchScore___StyledTypography",componentId:"sc-2c063e1e-8"})(e=>({color:e.$_css}));let L=i.default.div.withConfig({displayName:"styled__Container",componentId:"sc-16732231-0"})`
  display: flex;
  gap: 8px;
  background-color: ${m.COLORS.white};

  @media ${f.Mobile} {
    padding: 16px;
  }
`,O=i.default.div.withConfig({displayName:"styled__RightContainer",componentId:"sc-16732231-1"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  flex: 1;

  @media ${f.Mobile} {
    gap: 8px;
  }
`,j=i.css`
  margin-top: 12px;
  flex-shrink: 0;
`,N=i.default.div.withConfig({displayName:"styled__MiddleContainer",componentId:"sc-16732231-2"})`
  display: flex;
  gap: 12px;

  @media ${f.Mobile} {
    flex-direction: column;
    gap: 8px;
  }
`,k=i.default.div.withConfig({displayName:"styled__TopContainer",componentId:"sc-16732231-3"})`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 12px;

  [data-dropdown-open='true'] & {
    pointer-events: none;
  }

  @media ${f.Mobile} {
    gap: 8px;
  }
`,R=i.default.div.withConfig({displayName:"styled__HeaderContainer",componentId:"sc-16732231-4"})`
  display: flex;
  align-items: center;
  gap: 8px;
`,D=(0,o.observer)(({className:e,row:i,isSelected:o,highlight:d,requirements:n,isFromSearch:u,onCheck:h,onRowClick:m,renderRowActions:g})=>{let f=(0,a.useMemo)(()=>!!((0,C.isStateExisted)("shipment_count",i.stats)||i.customers?.[0]||i.targetMarkets?.[0]||null!=i.reviewScore||i.description),[i]),x=!!i.products?.length,y=(0,a.useCallback)(e=>{m?.(i,e)},[m,i.id,i.name]);return(0,t.jsxs)(L,{className:(0,l.default)(e,"supplier-card-list-item"),children:[h&&(0,t.jsx)($,{itemSize:"small",isChecked:o,onClick:h}),(0,t.jsxs)(O,{children:[(0,t.jsxs)(k,{onClick:e=>{m?.(i)},children:[(0,t.jsxs)(R,{children:[(0,t.jsx)(E,{supplier:{logo:i.logo,name:i.name,verifiedSources:i.verifiedSources,country:i.country,yearFounded:i.yearFounded,employeeCount:i.employeeCount,businessTypes:i.businessTypes,workspaceID:i.workspaceID},size:"small",highlight:d}),g?.(i)]}),(0,t.jsx)(s.HighlightList,{highlights:i.highlights})]}),(f||x)&&(0,t.jsxs)(N,{children:[(0,t.jsx)(c.FieldCards,{stats:i.stats,customers:i.customers,targetMarkets:i.targetMarkets,reviewScore:i.reviewScore,reviewDetails:i.reviewDetails,products:i.products,description:i.description,highlight:d,onCardClick:y}),(0,t.jsx)(p.ProductList,{supplierId:i.id,products:i.products,productCount:i.productCount,isFromSearch:u,productHighlights:i[r.FIELDS_HIGHLIGHT_KEY]?.productImages,highlight:d,fromPublicSupplier:(0,C.checkIsPublicSupplier)(i)})]}),n&&n.length>0&&(0,t.jsx)(S,{row:i,requirements:n})]})]})});var $=(0,i.default)(d.CheckboxItem).withConfig({displayName:"Item___StyledCheckboxItem",componentId:"sc-ace5dc20-0"})`${j}`,E=(0,i.default)(n.SupplierHeader).withConfig({displayName:"Item___StyledSupplierHeader",componentId:"sc-ace5dc20-1"})({flex:1,minWidth:0});e.s(["SupplierCardListItem",0,D],891165)}]);