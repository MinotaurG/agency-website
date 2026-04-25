(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,674941,e=>{"use strict";var t=e.i(115497),r=e.i(650394),i=e.i(547108);let a=(0,r.createContext)({modalStore:{},setModalStore:()=>{}}),o=()=>{let{modalStore:e,setModalStore:t}=(0,r.useContext)(a),[i,o]=(0,r.useState)([]);return(0,r.useEffect)(()=>{if(i[0]){let[r,...a]=i,n={...e};delete n[r],t(n),o(a)}},[i]),{removeModal:e=>{o([...i,e])}}},n=()=>{let{modalStore:e}=(0,r.useContext)(a),{addModal:t}=(()=>{let{modalStore:e,setModalStore:t}=(0,r.useContext)(a);return{addModal:r=>{if(r.id&&e[r.id])return r.id;let a=r.id??(0,i.uuid)();return t({...e,[a]:{...r,id:a}}),a}}})(),{removeModal:n}=o(),{clearModal:_}=(()=>{let{modalStore:e}=(0,r.useContext)(a),{removeModal:t}=o();return{clearModal:()=>{Object.keys(e).forEach(e=>{t(e)})}}})();return{clearModal:_,removeModal:n,addModal:t,modalStore:e}};e.s(["ModalEventProvider",0,({children:e})=>{let[i,o]=(0,r.useState)({});return(0,t.jsx)(a.Provider,{value:{modalStore:i,setModalStore:o},children:e})},"ModalRoot",0,({modalMap:e})=>{let{modalStore:r}=n();return(0,t.jsx)(t.Fragment,{children:Object.values(r).map(r=>{let i=e[r.type];return i?(0,t.jsx)(i,{id:r.id,props:r.props},r.id):null})})},"useModal",0,n])},409462,e=>{"use strict";var t=e.i(115497),r=e.i(650394),i=e.i(606897),a=e.i(798523),o=e.i(552354),n=e.i(253380),_=e.i(786709);let s=.5-.35,l=2*(.5-.35),c=2*Math.PI*10,p=a.css`
  background-color: ${o.COLORS.white};
  box-shadow: ${o.SHADOW.overlay1};
`;a.default.div.withConfig({displayName:"styled__Header",componentId:"sc-366e341b-0"})`
  display: flex;
  align-items: center;
  width: 296px;
`,a.default.div.withConfig({displayName:"styled__Body",componentId:"sc-366e341b-1"})`
  padding-left: 36px;
  margin-top: 4px;
  width: 296px;
`,a.default.div.withConfig({displayName:"styled__Content",componentId:"sc-366e341b-2"})`
  ${p}
  overflow: hidden;
  border-radius: 12px;
  padding: 12px;
`,a.default.div.withConfig({displayName:"styled__Display",componentId:"sc-366e341b-3"})`
  ${e=>e.isHide?`animation: bottomOut 0.4s ${s}s, shrink 0.35s;`:`animation: bottomIn 0.4s, expand 0.35s ${s}s;`}
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;

  @keyframes bottomIn {
    from {
      transform: translate(0, 100%);
      width: 48px;
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      width: 48px;
      opacity: 1;
    }
  }
  @keyframes expand {
    from {
      width: 48px;
    }

    to {
      width: 320px;
    }
  }

  @keyframes bottomOut {
    from {
      transform: translate(0, 0);
      width: 320px;
      opacity: 1;
    }
    to {
      transform: translate(0, 100%);
      width: 320px;
      opacity: 0;
    }
  }

  @keyframes shrink {
    from {
      width: 320px;
    }
    to {
      width: 48px;
    }
  }
`,a.default.div.withConfig({displayName:"styled__TopSpace",componentId:"sc-366e341b-4"})`
  height: 8px;
`,a.default.div.withConfig({displayName:"styled__Container",componentId:"sc-366e341b-5"})`
  height: ${e=>`${e.height}px`};
  ${e=>e.isHide?"transition: height 0.4s ease-in-out;":`transition: height 0.4s ${s}s ease-in-out;`}
`,a.default.div.withConfig({displayName:"styled__ButtonContainer",componentId:"sc-366e341b-6"})`
  display: flex;
  align-items: center;

  animation: disappear ${`${.5-l}s ${l}s`};
  animation-timing-function: ease-in-out;

  @keyframes disappear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,(0,a.default)(i.Icon).withConfig({displayName:"styled__StyledIcon",componentId:"sc-366e341b-7"})`
  position: absolute;
  left: 4px;
  top: 4px;
  z-index: 1;
`,a.default.div.withConfig({displayName:"styled__RootContainer",componentId:"sc-366e341b-8"})`
  position: fixed;
  left: ${e=>e.x}px;
  bottom: ${e=>e.y}px;
  outline: none;
  position: fixed;
  z-index: 100000000;
`,(0,a.default)(n.Typography).withConfig({displayName:"styled__Title",componentId:"sc-366e341b-9"})`
  flex-grow: 1;
`,(0,a.default)(_.Button).withConfig({displayName:"styled__ActionButton",componentId:"sc-366e341b-10"})`
  margin: 0 8px;
`,a.default.div.withConfig({displayName:"styled__IconWrapper",componentId:"sc-366e341b-11"})`
  position: relative;
  margin-right: 12px;
`,a.default.circle.withConfig({displayName:"styled__RingIndicator",componentId:"sc-366e341b-12"})`
  stroke-width: 5px;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke: ${o.COLORS.white};
  stroke-dasharray: ${c} ${c};
  animation: progress ${3.5}s ${.5}s linear;

  @keyframes progress {
    0% {
      // 2*Pi*r, r=10px
      stroke-dasharray: 0 ${c};
    }
    100% {
      stroke-dasharray: ${c} ${c};
    }
  }
`,a.default.circle.withConfig({displayName:"styled__RingTrack",componentId:"sc-366e341b-13"})`
  stroke: ${e=>e.color};
  stroke-width: 4px;
`,a.default.div.withConfig({displayName:"styled__RingContainer",componentId:"sc-366e341b-14"})`
  position: absolute;
  left: 0;
  top: 0;

  svg {
    width: 24px;
    height: 24px;
  }
  circle {
    cx: 12px;
    cy: 12px;
    r: ${10}px;
    fill: transparent;
  }
`,a.default.div.withConfig({displayName:"styled__IconSVGContainer",componentId:"sc-366e341b-15"})`
  padding: 4px;
  width: 24px;
  height: 24px;
`,e.i(367556);var d=e.i(547108);e.i(308303);let u=(0,r.createContext)({toastStore:{},setToastStore:()=>{}});e.s(["ToastEventProvider",0,({children:e})=>{let[i,a]=(0,r.useState)({});return(0,t.jsx)(u.Provider,{value:{toastStore:i,setToastStore:a},children:e})},"useToast",0,()=>{let{addToast:e}=(()=>{let{toastStore:e,setToastStore:t}=(0,r.useContext)(u);return{addToast:r=>{if(r.id&&e[r.id])return r.id;let i=r.id??(0,d.uuid)();return t({...e,[i]:{...r,id:i}}),i}}})(),{removeToast:t}=(()=>{let{toastStore:e,setToastStore:t}=(0,r.useContext)(u),[i,a]=(0,r.useState)([]);return(0,r.useEffect)(()=>{if(i[0]){let[r,...o]=i,n={...e};delete n[r],t(n),a(o)}},[i]),{removeToast:e=>{a([...i,e])}}})(),{toastStore:i}={...(0,r.useContext)(u)};return{addToast:e,removeToast:t,toastStore:i}}],409462)},31487,809493,e=>{"use strict";var t=e.i(115497),r=e.i(699188),i=e.i(650394);let a=(0,i.createContext)({current:null}),o=({children:e,isPersist:r})=>{let o=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let e,t=t=>{var i,a,n;let _;e?.(),i=t,a=o,n=r,a.current={x:i.pageX,y:i.pageY},n||(_=setTimeout(()=>{a.current=null},100)),e=()=>_&&clearTimeout(_)};return document.documentElement.addEventListener("click",t,!0),()=>{e?.(),document.documentElement.removeEventListener("click",t,!0)}},[]),(0,t.jsx)(a.Provider,{value:o,children:e})};e.s(["LastClickPositionRefProvider",0,o,"useLastClickPositionRef",0,()=>(0,i.useContext)(a)],809493);var n=e.i(409462),_=e.i(674941);let s=({children:e})=>(0,t.jsx)(_.ModalEventProvider,{children:(0,t.jsx)(n.ToastEventProvider,{children:e})});e.s(["ClientLayout",0,({children:e})=>(0,t.jsx)(r.IntlLayout,{children:(0,t.jsx)(s,{children:(0,t.jsx)(o,{isPersist:!1,children:e})})})],31487)},601173,e=>{"use strict";var t,r,i,a,o,n,_,s,l,c,p,d,u,E,O,T,I,R,A,m,C,f,N,S,g,P,h,y,L,b,v,D,M,x,U,F,w,G,j,k,H=((t={}).MINE="MINE",t.SHARED="SHARED",t),Y=((r={}).ALL="ALL",r.MINE="MINE",r.SHARED="SHARED",r),V=((i={}).can_query="can_query",i.owner="owner",i),B=((a={}).inquiry="inquiry",a.product="product",a.quotation="quotation",a.report="report",a.supplier="supplier",a),W=((o={}).check_inquiry_prompt="check_inquiry_prompt",o.inquiry_questions_generation_prompt="inquiry_questions_generation_prompt",o.mail_message_response_status_generation_prompt="mail_message_response_status_generation_prompt",o.product_generation_prompt="product_generation_prompt",o.product_image_generation_prompt="product_image_generation_prompt",o.search_agent_name="search_agent_name",o.sendgrid_comment_mention_template="sendgrid_comment_mention_template",o.sendgrid_inquiry_supplier_quote_template="sendgrid_inquiry_supplier_quote_template",o.sendgrid_mail_reauthorize_template="sendgrid_mail_reauthorize_template",o.sendgrid_member_invitation_template="sendgrid_member_invitation_template",o.sendgrid_user_desktop_link_template="sendgrid_user_desktop_link_template",o.sendgrid_user_invitation_template="sendgrid_user_invitation_template",o.supplier_capability_select="supplier_capability_select",o.supplier_category_select="supplier_category_select",o.supplier_certification_select="supplier_certification_select",o.supplier_country_select="supplier_country_select",o.supplier_highlight_select="supplier_highlight_select",o.supplier_key_export_market_select="supplier_key_export_market_select",o.vendor_advantage_generation_prompt="vendor_advantage_generation_prompt",o.vendor_filter_categories_generation_prompt="vendor_filter_categories_generation_prompt",o.vendor_filter_generation_prompt="vendor_filter_generation_prompt",o.vendor_filter_product_query_extensions_generation_prompt="vendor_filter_product_query_extensions_generation_prompt",o.vendor_filter_product_query_generation_prompt="vendor_filter_product_query_generation_prompt",o.vendor_score_generation_prompt="vendor_score_generation_prompt",o.workspace_custom_fields="workspace_custom_fields",o.workspace_survey_categories_generation_prompt="workspace_survey_categories_generation_prompt",o),$=((n={}).json="json",n.number="number",n.select="select",n.string="string",n),q=((_={}).ATTACHMENT="ATTACHMENT",_.FORMULA="FORMULA",_.MULTI_SELECT="MULTI_SELECT",_.NUMBER="NUMBER",_.SELECT="SELECT",_.TEXT="TEXT",_),K=((s={}).ACTIVE_DAY_COUNT="ACTIVE_DAY_COUNT",s.ACTIVE_DAY_PCT="ACTIVE_DAY_PCT",s.CIF_USD_AVG_PER_KG="CIF_USD_AVG_PER_KG",s.CIF_USD_AVG_PER_SHIPMENT="CIF_USD_AVG_PER_SHIPMENT",s.CIF_USD_TOTAL="CIF_USD_TOTAL",s.SHIPMENT_COUNT="SHIPMENT_COUNT",s.WEIGHT_KG_AVG_PER_SHIPMENT="WEIGHT_KG_AVG_PER_SHIPMENT",s.WEIGHT_KG_TOTAL="WEIGHT_KG_TOTAL",s),Q=((l={}).DAILY="DAILY",l.MONTHLY="MONTHLY",l.YEARLY="YEARLY",l),X=((c={}).TEN="TEN",c.TWENTY="TWENTY",c),Z=((p={}).CIF_USD_AVG_PER_KG="CIF_USD_AVG_PER_KG",p.EXPORT_WEIGHT_KG="EXPORT_WEIGHT_KG",p.MOQ="MOQ",p.PRICE="PRICE",p.REVIEW_SCORE="REVIEW_SCORE",p.SHIPMENT_COUNT="SHIPMENT_COUNT",p.WEIGHT_KG_TOTAL="WEIGHT_KG_TOTAL",p),z=((d={}).add_edit_supplier="add_edit_supplier",d.ai_customs_query="ai_customs_query",d.ai_filter="ai_filter",d.ai_keyword_trends="ai_keyword_trends",d.ai_product_generation="ai_product_generation",d.ai_product_image_generation="ai_product_image_generation",d.ai_product_research="ai_product_research",d.ai_product_search="ai_product_search",d.ai_product_video_generation="ai_product_video_generation",d.ai_quotation_answers="ai_quotation_answers",d.ai_supplier_deep_search="ai_supplier_deep_search",d.ai_supplier_search="ai_supplier_search",d.auto_cc="auto_cc",d.basic_manual_filter="basic_manual_filter",d.bonus_credits="bonus_credits",d.credits="credits",d.custom_field="custom_field",d.daily_credits="daily_credits",d.email_template="email_template",d.export_data="export_data",d.filter_suggestion="filter_suggestion",d.follow_up_agent="follow_up_agent",d.highlight_filter="highlight_filter",d.inquiry_management="inquiry_management",d.integrate_email="integrate_email",d.invite_members="invite_members",d.private_supplier_management="private_supplier_management",d.product_management="product_management",d.product_saved_list="product_saved_list",d.quotation_evaluation_summary="quotation_evaluation_summary",d.share_channel="share_channel",d.shipment_filter="shipment_filter",d.supplier_advanced_fields="supplier_advanced_fields",d.supplier_basic_fields="supplier_basic_fields",d.supplier_saved_list="supplier_saved_list",d.table_configuration="table_configuration",d.view_supplier_contact="view_supplier_contact",d),J=((u={}).disabled="disabled",u.enabled="enabled",u),ee=((E={}).CUSTOM="CUSTOM",E.STANDARD="STANDARD",E),et=((O={}).CITY="CITY",O.CONTINENT="CONTINENT",O.COUNTRY="COUNTRY",O.STATE="STATE",O),er=((T={}).PRODUCT_PROFILE="PRODUCT_PROFILE",T.SUPPLIER_PROFILE="SUPPLIER_PROFILE",T.WEBSITE_LINK="WEBSITE_LINK",T),ei=((I={}).ADMIN="ADMIN",I.MEMBER="MEMBER",I),ea=((R={}).PERCENTAGE="PERCENTAGE",R.STANDARD="STANDARD",R),eo=((A={}).ASC="ASC",A.DESC="DESC",A),en=((m={}).add_edit_supplier="add_edit_supplier",m.ai_customs_query="ai_customs_query",m.ai_filter="ai_filter",m.ai_keyword_trends="ai_keyword_trends",m.ai_product_generation="ai_product_generation",m.ai_product_image_generation="ai_product_image_generation",m.ai_product_research="ai_product_research",m.ai_product_search="ai_product_search",m.ai_product_video_generation="ai_product_video_generation",m.ai_quotation_answers="ai_quotation_answers",m.ai_supplier_deep_search="ai_supplier_deep_search",m.ai_supplier_search="ai_supplier_search",m.auto_cc="auto_cc",m.basic_manual_filter="basic_manual_filter",m.bonus_credits="bonus_credits",m.credits="credits",m.custom_field="custom_field",m.daily_credits="daily_credits",m.email_template="email_template",m.export_data="export_data",m.filter_suggestion="filter_suggestion",m.follow_up_agent="follow_up_agent",m.highlight_filter="highlight_filter",m.inquiry_management="inquiry_management",m.integrate_email="integrate_email",m.invite_members="invite_members",m.private_supplier_management="private_supplier_management",m.product_management="product_management",m.product_saved_list="product_saved_list",m.quotation_evaluation_summary="quotation_evaluation_summary",m.share_channel="share_channel",m.shipment_filter="shipment_filter",m.supplier_advanced_fields="supplier_advanced_fields",m.supplier_basic_fields="supplier_basic_fields",m.supplier_saved_list="supplier_saved_list",m.table_configuration="table_configuration",m.view_supplier_contact="view_supplier_contact",m),e_=((C={}).monthly="monthly",C.onetime="onetime",C.yearly="yearly",C),es=((f={}).basic="basic",f.basic_trial="basic_trial",f.custom="custom",f.entry="entry",f.free="free",f.trial="trial",f),el=((N={}).CATEGORY_CONTAINS_ANY="CATEGORY_CONTAINS_ANY",N.VENDOR_CERTIFICATIONS_CONTAINS_ANY="VENDOR_CERTIFICATIONS_CONTAINS_ANY",N.VENDOR_LOCATION_IN="VENDOR_LOCATION_IN",N.VENDOR_LOCATION_NOT_IN="VENDOR_LOCATION_NOT_IN",N),ec=((S={}).LINE_ART="LINE_ART",S.PRODUCT_CLOSE_UP="PRODUCT_CLOSE_UP",S.STANDARD_PRODUCT_IMAGE="STANDARD_PRODUCT_IMAGE",S),ep=((g={}).CREATED_AT="CREATED_AT",g.ID="ID",g.TITLE="TITLE",g.UPDATED_AT="UPDATED_AT",g),ed=((P={}).AMAZON="AMAZON",P.GOOGLE_SHOPPING="GOOGLE_SHOPPING",P.TIKTOK="TIKTOK",P),eu=((h={}).active="active",h.archived="archived",h.draft="draft",h),eE=((y={}).b2b="b2b",y.b2c="b2c",y.private="private",y),eO=((L={}).DOCUMENT="DOCUMENT",L.IMAGE="IMAGE",L.INQUIRY="INQUIRY",L.PRODUCT="PRODUCT",L.SUPPLIER="SUPPLIER",L),eT=((b={}).MARKDOWN="MARKDOWN",b.PRODUCT_DEEP_SEARCH="PRODUCT_DEEP_SEARCH",b.PRODUCT_SEARCH="PRODUCT_SEARCH",b.SUPPLIER_DEEP_SEARCH="SUPPLIER_DEEP_SEARCH",b.SUPPLIER_SEARCH="SUPPLIER_SEARCH",b),eI=((v={}).supplier_search_agent_chat="supplier_search_agent_chat",v),eR=((D={}).CIF="CIF",D.CREATED_AT="CREATED_AT",D.CUSTOMER="CUSTOMER",D.DATE="DATE",D.ID="ID",D.QUANTITY="QUANTITY",D.UPDATED_AT="UPDATED_AT",D.WEIGHT="WEIGHT",D),eA=((M={}).GUEST="GUEST",M.INACTIVE="INACTIVE",M.NORMAL="NORMAL",M.SYSTEM="SYSTEM",M),em=((x={}).DISTRIBUTOR="DISTRIBUTOR",x.MANUFACTURER="MANUFACTURER",x.OTHERS="OTHERS",x.SERVICE_COMPANY="SERVICE_COMPANY",x.TRADING_COMPANY="TRADING_COMPANY",x.WHOLESALER="WHOLESALER",x),eC=((U={}).CATEGORY="CATEGORY",U.CUSTOMER="CUSTOMER",U.DEPARTURE="DEPARTURE",U.DESTINATION="DESTINATION",U.PRODUCT="PRODUCT",U.SUPPLIER="SUPPLIER",U.TAG="TAG",U),ef=((F={}).FEWER_THAN_5_PEOPLE="FEWER_THAN_5_PEOPLE",F.FROM_5_TO_10_PEOPLE="FROM_5_TO_10_PEOPLE",F.FROM_11_TO_50_PEOPLE="FROM_11_TO_50_PEOPLE",F.FROM_51_TO_100_PEOPLE="FROM_51_TO_100_PEOPLE",F.FROM_101_TO_200_PEOPLE="FROM_101_TO_200_PEOPLE",F.FROM_201_TO_300_PEOPLE="FROM_201_TO_300_PEOPLE",F.FROM_301_TO_500_PEOPLE="FROM_301_TO_500_PEOPLE",F.FROM_501_TO_1000_PEOPLE="FROM_501_TO_1000_PEOPLE",F.FROM_1001_TO_2000_PEOPLE="FROM_1001_TO_2000_PEOPLE",F.FROM_2001_TO_5000_PEOPLE="FROM_2001_TO_5000_PEOPLE",F.FROM_5001_TO_10000_PEOPLE="FROM_5001_TO_10000_PEOPLE",F.MORE_THAN_10000_PEOPLE="MORE_THAN_10000_PEOPLE",F),eN=((w={}).CERTIFICATION_CONTAINS_ANY="CERTIFICATION_CONTAINS_ANY",w.CUSTOMER_IN="CUSTOMER_IN",w.CUSTOMER_NOT_IN="CUSTOMER_NOT_IN",w.LOCATION_IN="LOCATION_IN",w.LOCATION_NOT_IN="LOCATION_NOT_IN",w.PRODUCT_CATEGORY_CONTAINS_ANY="PRODUCT_CATEGORY_CONTAINS_ANY",w),eS=((G={}).ANNUAL_REVENUE="ANNUAL_REVENUE",G.COUNTRY="COUNTRY",G.CREATED_AT="CREATED_AT",G.EMPLOYEE_COUNT="EMPLOYEE_COUNT",G.ID="ID",G.NAME="NAME",G.UPDATED_AT="UPDATED_AT",G.YEAR_FOUNDED="YEAR_FOUNDED",G),eg=((j={}).FEWER_THAN_5_PEOPLE="FEWER_THAN_5_PEOPLE",j.FROM_5_TO_10_PEOPLE="FROM_5_TO_10_PEOPLE",j.FROM_11_TO_50_PEOPLE="FROM_11_TO_50_PEOPLE",j.FROM_51_TO_100_PEOPLE="FROM_51_TO_100_PEOPLE",j.FROM_101_TO_200_PEOPLE="FROM_101_TO_200_PEOPLE",j.FROM_201_TO_300_PEOPLE="FROM_201_TO_300_PEOPLE",j.FROM_301_TO_500_PEOPLE="FROM_301_TO_500_PEOPLE",j.FROM_501_TO_1000_PEOPLE="FROM_501_TO_1000_PEOPLE",j.FROM_1001_TO_2000_PEOPLE="FROM_1001_TO_2000_PEOPLE",j.FROM_2001_TO_5000_PEOPLE="FROM_2001_TO_5000_PEOPLE",j.FROM_5001_TO_10000_PEOPLE="FROM_5001_TO_10000_PEOPLE",j.MORE_THAN_10000_PEOPLE="MORE_THAN_10000_PEOPLE",j),eP=((k={}).BRAND="BRAND",k.PLATFORM="PLATFORM",k.TRADER="TRADER",k);e.s(["AIChatKind",()=>H,"AIChatListScope",()=>Y,"AIChatMemberRole",()=>V,"CommentRelationType",()=>B,"ConfigurationName",()=>W,"ConfigurationType",()=>$,"CustomFieldType",()=>q,"CustomsInsightsMetric",()=>K,"CustomsInsightsPeriod",()=>Q,"DistributionMetricBinCount",()=>X,"DistributionMetricField",()=>Z,"FeatureName",()=>z,"FeatureStatus",()=>J,"FormulaVariableType",()=>ee,"LocationType",()=>et,"MatchScoreEvidenceType",()=>er,"MemberRole",()=>ei,"NumberFormatType",()=>ea,"OrderDirection",()=>eo,"PricingFeatureName",()=>en,"PricingRecurring",()=>e_,"PricingType",()=>es,"ProductFilterField",()=>el,"ProductImageStyle",()=>ec,"ProductOrderField",()=>ep,"ProductResearchPlatformKey",()=>ed,"ProductStatus",()=>eu,"ProductType",()=>eE,"ReferenceType",()=>eO,"ReportType",()=>eT,"ShareLinkResourceType",()=>eI,"ShipmentOrderField",()=>eR,"UserType",()=>eA,"VendorBusinessType",()=>em,"VendorCompletionType",()=>eC,"VendorEmployeeCount",()=>ef,"VendorFilterField",()=>eN,"VendorOrderField",()=>eS,"WorkspaceNumberOfEmployees",()=>eg,"WorkspaceType",()=>eP])},982685,e=>{"use strict";let t=/^[a-z]{2}$/i;e.s(["default",0,function(e){if(!t.test(e)){let t=typeof e;throw TypeError(`cc argument must be an ISO 3166-1 alpha-2 string, but got '${"string"===t?e:t}' instead.`)}return String.fromCodePoint(...[...e.toUpperCase()].map(e=>e.codePointAt()+127397))}])},194660,363779,e=>{"use strict";var t,r,i,a,o,n,_,s,l,c,p,d,u,E,O,T=((t={}).KG="KG",t.LBS="LBS",t),I=((r={}).MONTH="MONTH",r.YEAR="YEAR",r),R=((i={}).RECOMMENDED_BY_FRIENDS="friends",i.GOOGLE_OTHER_SEARCH_ENGINES="search-engines",i.AI_TOOLS="ai-tools",i.SOCIAL_MEDIA="social-media",i.LINKEDIN="linkedin",i.INFLUENCER="influencer",i.REDDIT="reddit",i.EMAIL="email",i.OTHER="other",i);(a={}).DISCOVER_SUPPLIERS="discover suppliers",a.AUTOMATE_QUOTES="automate quotes",a.PRODUCT_DEVELOPMENT="product development",a.COMMUNICATION="communication";var A=((o={}).COST="COST",o.MOQ="MOQ",o.QUALITY="QUALITY",o.RECOGNITION="RECOGNITION",o),m=((n={}).SIZE_1_TO_10="1-10",n.SIZE_11_TO_50="11-50",n.SIZE_51_TO_200="51-200",n.SIZE_201_TO_1000="201-1000",n.SIZE_1000_PLUS="1000+",n.INDIVIDUAL="Individual / non-company team",n),C=((_={}).PROCUREMENT="Procurement / sourcing",_.PRODUCT_RND="Product / R&D",_.SUPPLY_CHAIN="Supply chain / operations",_.FOUNDER_CEO="Founder / CEO",_.SALES_INTEL="Sales / market intel",_.LOGISTICS="Logistics / forwarder",_.INDIVIDUAL="Individual / academic",_),f=((s={}).PRODUCT_RESEARCH="Product research",s.SUPPLIER_DISCOVERY="Supplier discovery",s.TRADE_BACKED_VERIFICATION="Trade-backed verification",s.COMPETITIVE_SOURCING_INTEL="Competitive sourcing intel",s.OUTREACH_QUOTES="Outreach & quotes",s.MATERIALS_CERTS_COSTS="Materials, certs & costs",s),N=((l={}).MAIN_PRODUCT_CATEGORIES="main_product_categories",l.PRODUCT_CATEGORIES="product_categories",l.EMAILS="emails",l.COUNTRY="country",l.TARGET_MARKETS="target_markets",l.EMPLOYEES="employees",l.CUSTOMERS="customers",l.RECOGNITION="recognition",l.MOQ="moq",l.QUALITY="quality",l.COST="cost",l.PRODUCT_NAMES="product_names",l),S=((c={}).IS="is",c.IS_NOT="is_not",c.CONTAINS="contains",c.CONTAINS_ANY="contains_any",c.CONTAINS_ALL="contains_all",c.DOES_NOT_CONTAINS="does_not_contains",c.IS_NULL="is_null",c.IS_NOT_NULL="is_not_null",c.MATCHES="matches",c),g=((p={}).HIGH="High",p.MEDIUM="Medium",p.LOW="Low",p),P=((d={}).AFFORDABLE="Affordable",d.AVERAGE="Average",d.PREMIUM="Premium",d),h=((u={}).OEM_MANUFACTURER="OEM_MANUFACTURER",u.ODM_MANUFACTURER="ODM_MANUFACTURER",u.OWN_BRAND="OWN_BRAND",u.HIGH_CAPACITY_FACTORY="HIGH_CAPACITY_FACTORY",u.SMALL_BATCH_PRODUCTION="SMALL_BATCH_PRODUCTION",u.PRODUCT_CUSTOMIZATION="PRODUCT_CUSTOMIZATION",u.FORTUNE_500_COMPANY="FORTUNE_500_COMPANY",u.MASS_MARKET_BRAND_PARTNER="MASS_MARKET_BRAND_PARTNER",u.RECOGNIZED_BRAND_PARTNER="RECOGNIZED_BRAND_PARTNER",u.PATENTED_TECHNOLOGY="PATENTED_TECHNOLOGY",u.INDUSTRY_ASSOCIATION_MEMBER="INDUSTRY_ASSOCIATION_MEMBER",u.HIGH_TECH_ENTERPRISE="HIGH_TECH_ENTERPRISE",u.ESTABLISHED_BRAND="ESTABLISHED_BRAND",u.FAST_GROWING_COMPANY="FAST_GROWING_COMPANY",u.LARGE_ENTERPRISE_GROUP="LARGE_ENTERPRISE_GROUP",u.MULTINATIONAL_ENTERPRISE="MULTINATIONAL_ENTERPRISE",u.ECO_FRIENDLY_SUPPLIER="ECO_FRIENDLY_SUPPLIER",u.SUSTAINABLE_MATERIALS="SUSTAINABLE_MATERIALS",u.LOW_MOQ="LOW_MOQ",u.DROPSHIPPING_READY="DROPSHIPPING_READY",u.EXPERIENCED_EXPORTER="EXPERIENCED_EXPORTER",u.CUSTOM_PACKAGING="CUSTOM_PACKAGING",u.MULTI_COUNTRY_EXPORT="MULTI_COUNTRY_EXPORT",u.HIGH_PRODUCT_RATING="HIGH_PRODUCT_RATING",u.LARGE_EXPORT_VOLUME="LARGE_EXPORT_VOLUME",u),y=((E={}).ALIBABA="ALIBABA",E.MADE_IN_CHINA="MADE_IN_CHINA",E.GLOBALSOURCES="GLOBALSOURCES",E.THOMASNET="THOMASNET",E.EUROPAGES="EUROPAGES",E),L=((O={}).ALIBABA_VERIFIED="ALIBABA_VERIFIED",O.MADE_IN_CHINA_AUDITED="MADE_IN_CHINA_AUDITED",O.GLOBALSOURCES_VERIFIED="GLOBALSOURCES_VERIFIED",O.THOMAS_VERIFIED="THOMAS_VERIFIED",O.DNB_REGISTERED="DNB_REGISTERED",O);e.s(["CompanySize",()=>m,"DateUnit",()=>I,"JobRole",()=>C,"SourceReadyUseCase",()=>f,"SupplierPreference",()=>A,"VendorCriterionField",()=>N,"VendorCriterionOP",()=>S,"VendorHighlightCode",()=>h,"VendorPersonaCost",()=>P,"VendorPersonaScore",()=>g,"VendorSource",()=>y,"VendorVerification",()=>L,"WeightUnit",()=>T,"WorkspaceSourceOfDiscovery",()=>R],363779);var b=e.i(601173),v=e.i(552354);let D={[A.COST]:"Cost",[A.QUALITY]:"Quality",[A.MOQ]:"MOQ",[A.RECOGNITION]:"Recognition"};Object.values(A).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:D[e],name:D[e],text:D[e],color:v.SelectColor.greyLightest}));let M={[b.WorkspaceNumberOfEmployees.FEWER_THAN_5_PEOPLE]:"Fewer than 5 people",[b.WorkspaceNumberOfEmployees.FROM_5_TO_10_PEOPLE]:"5-10 people",[b.WorkspaceNumberOfEmployees.FROM_11_TO_50_PEOPLE]:"11-50 people",[b.WorkspaceNumberOfEmployees.FROM_51_TO_100_PEOPLE]:"51-100 people",[b.WorkspaceNumberOfEmployees.FROM_101_TO_200_PEOPLE]:"101-200 people",[b.WorkspaceNumberOfEmployees.FROM_201_TO_300_PEOPLE]:"201-300 people",[b.WorkspaceNumberOfEmployees.FROM_301_TO_500_PEOPLE]:"301-500 people",[b.WorkspaceNumberOfEmployees.FROM_501_TO_1000_PEOPLE]:"501-1000 people",[b.WorkspaceNumberOfEmployees.FROM_1001_TO_2000_PEOPLE]:"1001-2000 people",[b.WorkspaceNumberOfEmployees.FROM_2001_TO_5000_PEOPLE]:"2001-5000 people",[b.WorkspaceNumberOfEmployees.FROM_5001_TO_10000_PEOPLE]:"5001-10000 people",[b.WorkspaceNumberOfEmployees.MORE_THAN_10000_PEOPLE]:"More than 10000 people"};Object.values(b.WorkspaceNumberOfEmployees).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:M[e],name:M[e],text:M[e],color:v.SelectColor.greyLightest}));let x={[C.PROCUREMENT]:"Procurement / Sourcing",[C.PRODUCT_RND]:"Product Development & Design",[C.SUPPLY_CHAIN]:"Supply chain / Operations",[C.FOUNDER_CEO]:"Owner / Executive",[C.SALES_INTEL]:"Sales",[C.LOGISTICS]:"Logistics",[C.INDIVIDUAL]:"Individual / Academic"};Object.values(C).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:x[e],name:x[e],text:x[e],color:v.SelectColor.greyLightest}));let U=Object.values(m).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:e,name:e,text:e,color:v.SelectColor.greyLightest})),F={[R.RECOMMENDED_BY_FRIENDS]:"Friends/colleagues",[R.GOOGLE_OTHER_SEARCH_ENGINES]:"Search engine (Google/Bing)",[R.AI_TOOLS]:"AI assistant (ChatGPT, Gemini, etc.)",[R.SOCIAL_MEDIA]:"Social media (Instagram, Facebook, etc.)",[R.LINKEDIN]:"LinkedIn",[R.INFLUENCER]:"Influencer / creator",[R.REDDIT]:"Reddit",[R.EMAIL]:"Email",[R.OTHER]:"Other"},w=Object.values(R).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:F[e],name:F[e],text:F[e],color:v.SelectColor.greyLightest})),G={[f.PRODUCT_RESEARCH]:"Product and Trend Research",[f.SUPPLIER_DISCOVERY]:"Supplier Discovery",[f.TRADE_BACKED_VERIFICATION]:"Trade-backed verification",[f.COMPETITIVE_SOURCING_INTEL]:"Competitive sourcing intelligence",[f.OUTREACH_QUOTES]:"Supplier Outreach & Quote Intelligence",[f.MATERIALS_CERTS_COSTS]:"Supplier Compliance & Verification"};Object.values(f).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:G[e],name:G[e],text:G[e],color:v.SelectColor.greyLightest}));let j={[b.WorkspaceType.BRAND]:"Brand",[b.WorkspaceType.TRADER]:"Trader",[b.WorkspaceType.PLATFORM]:"Platform"};Object.values(b.WorkspaceType).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:j[e],name:j[e],text:j[e],color:v.SelectColor.greyLightest}));let k={[g.LOW]:"Limited",[g.MEDIUM]:"Recognized",[g.HIGH]:"Established"};Object.values(g).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:k[e],name:k[e],text:k[e],color:v.SelectColor.greyLightest}));let H={[g.LOW]:"Basic",[g.MEDIUM]:"Satisfactory",[g.HIGH]:"Exceptional"};Object.values(g).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:H[e],name:H[e],text:H[e],color:v.SelectColor.greyLightest}));let Y={[g.LOW]:"Low",[g.MEDIUM]:"Medium",[g.HIGH]:"High"};Object.values(g).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:Y[e],name:Y[e],text:Y[e],color:v.SelectColor.greyLightest}));let V={[P.AFFORDABLE]:"Affordable",[P.AVERAGE]:"Average",[P.PREMIUM]:"Premium"};Object.values(P).map(e=>({id:e,code:e,optionId:e,key:e,value:e,label:V[e],name:V[e],text:V[e],color:v.SelectColor.greyLightest})),e.s(["COST_LABELS",0,V,"MOQ_LABELS",0,Y,"ONBOARDING_COMPANY_SIZE_OPTIONS",0,U,"QUALITY_LABELS",0,H,"RECOGNITION_LABELS",0,k,"WORKSPACE_SOURCE_OF_DISCOVERY_OPTIONS",0,w],194660)},155839,e=>{"use strict";e.s(["SOURCE_READY_ORGANIZATION_LOGO",0,{"@type":"ImageObject",url:"https://cdn.sourceready.com/public/logo-full.svg",width:"616 px",height:"104 px"}])},537024,(e,t,r)=>{t.exports=function(e,t){for(var r=-1,i=null==e?0:e.length;++r<i&&!1!==t(e[r],r,e););return e}},271963,(e,t,r)=>{var i=e.r(406305),a=e.r(422367),o=Object.prototype.hasOwnProperty;t.exports=function(e,t,r){var n=e[t];o.call(e,t)&&a(n,r)&&(void 0!==r||t in e)||i(e,t,r)}},92320,(e,t,r)=>{var i=e.r(271963),a=e.r(406305);t.exports=function(e,t,r,o){var n=!r;r||(r={});for(var _=-1,s=t.length;++_<s;){var l=t[_],c=o?o(r[l],e[l],l,r,e):void 0;void 0===c&&(c=e[l]),n?a(r,l,c):i(r,l,c)}return r}},999958,(e,t,r)=>{var i=e.r(92320),a=e.r(375493);t.exports=function(e,t){return e&&i(t,a(t),e)}},493967,(e,t,r)=>{t.exports=function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}},119919,(e,t,r)=>{var i=e.r(377882),a=e.r(85057),o=e.r(493967),n=Object.prototype.hasOwnProperty;t.exports=function(e){if(!i(e))return o(e);var t=a(e),r=[];for(var _ in e)"constructor"==_&&(t||!n.call(e,_))||r.push(_);return r}},409516,(e,t,r)=>{var i=e.r(312069),a=e.r(119919),o=e.r(775484);t.exports=function(e){return o(e)?i(e,!0):a(e)}},509977,(e,t,r)=>{var i=e.r(92320),a=e.r(409516);t.exports=function(e,t){return e&&i(t,a(t),e)}},370168,(e,t,r)=>{var i=e.r(971640),a=r&&!r.nodeType&&r,o=a&&t&&!t.nodeType&&t,n=o&&o.exports===a?i.Buffer:void 0,_=n?n.allocUnsafe:void 0;t.exports=function(e,t){if(t)return e.slice();var r=e.length,i=_?_(r):new e.constructor(r);return e.copy(i),i}},615573,(e,t,r)=>{t.exports=function(e,t){var r=-1,i=e.length;for(t||(t=Array(i));++r<i;)t[r]=e[r];return t}},256990,(e,t,r)=>{var i=e.r(92320),a=e.r(526480);t.exports=function(e,t){return i(e,a(e),t)}},970818,(e,t,r)=>{t.exports=e.r(947453)(Object.getPrototypeOf,Object)},491355,(e,t,r)=>{var i=e.r(203941),a=e.r(970818),o=e.r(526480),n=e.r(525485);t.exports=Object.getOwnPropertySymbols?function(e){for(var t=[];e;)i(t,o(e)),e=a(e);return t}:n},414067,(e,t,r)=>{var i=e.r(92320),a=e.r(491355);t.exports=function(e,t){return i(e,a(e),t)}},477739,(e,t,r)=>{var i=e.r(33757),a=e.r(491355),o=e.r(409516);t.exports=function(e){return i(e,o,a)}},481934,(e,t,r)=>{var i=Object.prototype.hasOwnProperty;t.exports=function(e){var t=e.length,r=new e.constructor(t);return t&&"string"==typeof e[0]&&i.call(e,"index")&&(r.index=e.index,r.input=e.input),r}},136157,(e,t,r)=>{var i=e.r(663382);t.exports=function(e){var t=new e.constructor(e.byteLength);return new i(t).set(new i(e)),t}},34027,(e,t,r)=>{var i=e.r(136157);t.exports=function(e,t){var r=t?i(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.byteLength)}},447691,(e,t,r)=>{var i=/\w*$/;t.exports=function(e){var t=new e.constructor(e.source,i.exec(e));return t.lastIndex=e.lastIndex,t}},657187,(e,t,r)=>{var i=e.r(151193),a=i?i.prototype:void 0,o=a?a.valueOf:void 0;t.exports=function(e){return o?Object(o.call(e)):{}}},916228,(e,t,r)=>{var i=e.r(136157);t.exports=function(e,t){var r=t?i(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}},608147,(e,t,r)=>{var i=e.r(136157),a=e.r(34027),o=e.r(447691),n=e.r(657187),_=e.r(916228);t.exports=function(e,t,r){var s=e.constructor;switch(t){case"[object ArrayBuffer]":return i(e);case"[object Boolean]":case"[object Date]":return new s(+e);case"[object DataView]":return a(e,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return _(e,r);case"[object Map]":case"[object Set]":return new s;case"[object Number]":case"[object String]":return new s(e);case"[object RegExp]":return o(e);case"[object Symbol]":return n(e)}}},548447,(e,t,r)=>{var i=e.r(377882),a=Object.create;t.exports=function(){function e(){}return function(t){if(!i(t))return{};if(a)return a(t);e.prototype=t;var r=new e;return e.prototype=void 0,r}}()},914054,(e,t,r)=>{var i=e.r(548447),a=e.r(970818),o=e.r(85057);t.exports=function(e){return"function"!=typeof e.constructor||o(e)?{}:i(a(e))}},308032,(e,t,r)=>{var i=e.r(854059),a=e.r(460779);t.exports=function(e){return a(e)&&"[object Map]"==i(e)}},756140,(e,t,r)=>{var i=e.r(308032),a=e.r(916306),o=e.r(376750),n=o&&o.isMap;t.exports=n?a(n):i},308216,(e,t,r)=>{var i=e.r(854059),a=e.r(460779);t.exports=function(e){return a(e)&&"[object Set]"==i(e)}},630726,(e,t,r)=>{var i=e.r(308216),a=e.r(916306),o=e.r(376750),n=o&&o.isSet;t.exports=n?a(n):i},97843,(e,t,r)=>{var i=e.r(318732),a=e.r(537024),o=e.r(271963),n=e.r(999958),_=e.r(509977),s=e.r(370168),l=e.r(615573),c=e.r(256990),p=e.r(414067),d=e.r(950710),u=e.r(477739),E=e.r(854059),O=e.r(481934),T=e.r(608147),I=e.r(914054),R=e.r(145948),A=e.r(904216),m=e.r(756140),C=e.r(377882),f=e.r(630726),N=e.r(375493),S=e.r(409516),g="[object Arguments]",P="[object Function]",h="[object Object]",y={};y[g]=y["[object Array]"]=y["[object ArrayBuffer]"]=y["[object DataView]"]=y["[object Boolean]"]=y["[object Date]"]=y["[object Float32Array]"]=y["[object Float64Array]"]=y["[object Int8Array]"]=y["[object Int16Array]"]=y["[object Int32Array]"]=y["[object Map]"]=y["[object Number]"]=y[h]=y["[object RegExp]"]=y["[object Set]"]=y["[object String]"]=y["[object Symbol]"]=y["[object Uint8Array]"]=y["[object Uint8ClampedArray]"]=y["[object Uint16Array]"]=y["[object Uint32Array]"]=!0,y["[object Error]"]=y[P]=y["[object WeakMap]"]=!1,t.exports=function e(t,r,L,b,v,D){var M,x=1&r,U=2&r,F=4&r;if(L&&(M=v?L(t,b,v,D):L(t)),void 0!==M)return M;if(!C(t))return t;var w=R(t);if(w){if(M=O(t),!x)return l(t,M)}else{var G=E(t),j=G==P||"[object GeneratorFunction]"==G;if(A(t))return s(t,x);if(G==h||G==g||j&&!v){if(M=U||j?{}:I(t),!x)return U?p(t,_(M,t)):c(t,n(M,t))}else{if(!y[G])return v?t:{};M=T(t,G,x)}}D||(D=new i);var k=D.get(t);if(k)return k;D.set(t,M),f(t)?t.forEach(function(i){M.add(e(i,r,L,i,t,D))}):m(t)&&t.forEach(function(i,a){M.set(a,e(i,r,L,a,t,D))});var H=F?U?u:d:U?S:N,Y=w?void 0:H(t);return a(Y||t,function(i,a){Y&&(i=t[a=i]),o(M,a,e(i,r,L,a,t,D))}),M}},100183,(e,t,r)=>{var i=e.r(271963),a=e.r(314433),o=e.r(194910),n=e.r(377882),_=e.r(277993);t.exports=function(e,t,r,s){if(!n(e))return e;t=a(t,e);for(var l=-1,c=t.length,p=c-1,d=e;null!=d&&++l<c;){var u=_(t[l]),E=r;if("__proto__"===u||"constructor"===u||"prototype"===u)break;if(l!=p){var O=d[u];void 0===(E=s?s(O,u,d):void 0)&&(E=n(O)?O:o(t[l+1])?[]:{})}i(d,u,E),d=d[u]}return e}},697885,(e,t,r)=>{var i=e.r(100183);t.exports=function(e,t,r){return null==e?e:i(e,t,r)}},533160,e=>{"use strict";var t=e.i(115497),r=e.i(650394),i=e.i(195360),a=e.i(752387),o=e.i(932872),n=e.i(629103),_=e.i(670594),s=e.i(640238);e.s(["InputText",0,e=>{let{autoComplete:l="off",leading:c,passedRef:p,onKeyDown:d,inputType:u,style:E,title:O,titleIcon:T,trailing:I,inputId:R,isRequired:A,className:m,tooltip:C,placeholder:f="Enter",disabled:N,autoFocus:S,hideErrorMsg:g,defaultValue:P,renderTitle:h,tabIndex:y,type:L,maxLength:b,inputMode:v,readOnly:D,useEllipsis:M,hideExpand:x,maxRows:U,containerRef:F,onCompositionStart:w,onCompositionEnd:G}=e,{isError:j,isActive:k,setIsActive:H,value:Y,onBlur:V,onChange:B,onFocus:W,isDisabled:$,errorMessage:q}=(0,_.useInput)(e),K=(0,r.useRef)(null),Q=p??K,X=Array.isArray(Y)?Y.join(","):Y;return(0,r.useEffect)(()=>{S&&Q.current&&setTimeout(()=>{Q.current?.focus()},0)},[S,Q]),(0,t.jsx)(a.InputWrapper,{tooltip:C,error:q,title:O,titleIcon:T,isRequired:A,isActive:k,hideErrorMsg:g,renderTitle:h,style:E,className:m,children:D?(0,t.jsx)(i.ReadOnlyText,{text:X??void 0,useEllipsis:M,maxRows:U,hideExpand:x}):(0,t.jsx)(o.InputContainer,{ref:F,leading:c,isDisabled:$??N??!1,isError:j,trailing:I,style:{cursor:"unset"},isActive:k,children:(0,t.jsx)(n.TextInputContainer,{onCompositionStart:w,onCompositionEnd:G,id:R,autoComplete:l,className:"panda-input-text--input",disabled:$??N,name:e.input?.name,onBlur:e=>{H(!1),V&&V(e,e.target.value)},onChange:e=>{B&&B(e.target.value,e)},onFocus:e=>{H(!0),W&&W(e)},onKeyDown:d,ref:Q,type:L??u,value:Y??"",placeholder:f,defaultValue:P,tabIndex:y,maxLength:b,inputMode:v,size:(0,s.default)([Y?.length??f?.length??0,1])})})})}])},338765,e=>{"use strict";var t=e.i(115497),r=e.i(113357),i=e.i(650394),a=e.i(798523),o=e.i(552354);let n=a.default.div.withConfig({displayName:"styled__Circle",componentId:"sc-e0a35cf3-0"})`
  background-color: white;
  border-radius: 5px;
  height: 10px;
  width: 10px;

  transform: ${e=>e.isActive?"translateX(8px)":"translateX(0px)"};

  ${({hasAnimation:e})=>e?"transition: box-shadow 90ms ease-in, transform 90ms ease-out":"transition: none"}
`,_=a.default.button.withConfig({displayName:"styled__CircleContainer",componentId:"sc-e0a35cf3-1"})`
  align-items: center;
  border-radius: 6px;
  background-color: ${e=>e.isActive?e.isDisabled?o.COLORS.blueLight3:o.COLORS.blue:e.isDisabled?o.COLORS.greyLight2:o.COLORS.greyLight1};
  display: flex;
  height: 12px;
  padding: 1px;
  justify-content: flex-start;
  ${e=>e.isDisabled?"pointer-events: none;":""}

  width: 20px;

  ${e=>-1===e.tabIndex?"&:hover {":"&:hover, &:focus {"} {
    cursor: pointer;

    .panda-switch-thang {
      box-shadow: 0px 0px 0px 3px
        ${e=>e.isActive?"rgba(87, 126, 255, 0.2)":"rgba(41, 45, 61, 0.1)"};
    }
  }
  &:active {
    .panda-switch-thang {
      box-shadow: 0px 0px 0px 5px
        ${e=>e.isActive?"rgba(87, 126, 255, 0.2)":"rgba(41, 45, 61, 0.1)"};
    }
  }
`;e.s(["Switch",0,({style:e={},isDisabled:a=!1,onClick:o,value:s,tabIndex:l=-1,hasAnimation:c=!0,className:p})=>{let d=void 0===s,[u,E]=(0,i.useState)(!d&&s),O=d?u:s;return(0,t.jsx)(_,{className:(0,r.default)(["panda-switch",p]),style:e,isActive:O,disabled:a,isDisabled:a,tabIndex:l,onClick:e=>{e.preventDefault(),d&&E(!u),o&&o(!s,e)},children:(0,t.jsx)(n,{isActive:O,className:"panda-switch-thang",hasAnimation:c})})}],338765)},780800,(e,t,r)=>{var i=e.r(97843);t.exports=function(e){return i(e,5)}},689525,e=>{"use strict";var t=e.i(780800),r=e.i(691152),i=e.i(824183),a=e.i(697885),o=e.i(310282),n=e.i(650394);class _{data;_initValue;constructor(e){this._initValue=e,this.data=(0,t.default)(this._initValue),(0,o.makeAutoObservable)(this,{})}get initialValue(){return this._initValue}reset(e){e&&(this._initValue=e),this.data=(0,t.default)(this._initValue)}get hasModified(){return!(0,i.default)(this.data,this._initValue)}pathIsModified(e){return!(0,i.default)((0,r.default)(this.data,e),(0,r.default)(this._initValue,e))}getModifiedFields(){let e={},t=(r,o,n=[])=>{if("object"!=typeof r||null===r||Array.isArray(r)){if(!(0,i.default)(r,o)){let t=n.reduce((e,t)=>e?`${e}.${t}`:t,"");(0,a.default)(e,t,r)}return}Object.keys(r).forEach(_=>{let s=[...n,_],l=r[_],c=o?.[_];if(!(0,i.default)(l,c))if("object"!=typeof l||null===l||Array.isArray(l)){let t=s.reduce((e,t)=>e?`${e}.${t}`:t,"");(0,a.default)(e,t,l)}else t(l,c,s)})};return t(this.data,this._initValue),e}}e.s(["useMobxForm",0,e=>{let[t]=(0,n.useState)(new _(e));return{mobxform:t}}])},619587,600514,52508,e=>{"use strict";var t=e.i(115497),r=e.i(650394),i=e.i(552049),a=e.i(552354),o=e.i(224879),n=e.i(442779),_=e.i(527222),s=e.i(785361),l=e.i(50539),c=e.i(606897),p=e.i(533160),d=e.i(602106),u=e.i(338765),E=e.i(253380);e.i(259480);var O=e.i(830055),T=e.i(533066),I=e.i(798523);let R=({title:e,titleOptions:i,titleActiveOption:a,titleCount:o,isDisabled:s,onSelectTitleOption:l,onClear:c})=>{let[p,d]=(0,r.useState)(!1),u=(0,r.useRef)(null),E=i?.find(e=>e.value===a);return(0,r.useEffect)(()=>{l||d(!1)},[l]),(0,t.jsxs)(A,{children:[(0,t.jsxs)(m,{children:[(0,t.jsx)(N,{children:e}),!!l&&(0,t.jsx)(f,{ref:u,type:"tag",isDisabled:s,text:E?.name,icon:"CHEVRON_DOWN_SMALL",iconPosition:"trailing",onClick:s?void 0:()=>d(!0)})]}),!!o&&o>0&&(0,t.jsx)(C,{type:"plain",text:o.toString(),typographyType:"caption",onRemove:c,isDisabled:s,hideIcon:!0}),!!l&&(0,t.jsx)(_.DropdownWrapper,{isOpen:p,refElement:u.current,onClose:e=>{d(!p),e?.stopPropagation()},hasOffset:!0,usePortal:!0,style:{width:"320px"},placement:"bottom-start",children:(0,t.jsx)(n.DropdownMenuDynamic,{options:i??[],activeValue:a,onClose:()=>d(!1),onClick:l})})]})},A=I.default.div.withConfig({displayName:"InputSelectTitle__Container",componentId:"sc-5b58bc96-0"})`
  display: flex;
  justify-content: space-between;
  height: 32px;
  align-items: center;
`,m=I.default.div.withConfig({displayName:"InputSelectTitle__LeftContainer",componentId:"sc-5b58bc96-1"})`
  display: flex;
  align-items: center;
  gap: 8px;
`,C=(0,I.default)(i.Chip).withConfig({displayName:"InputSelectTitle__ClearChip",componentId:"sc-5b58bc96-2"})`
  height: 18px;

  background-color: ${e=>e.isDisabled?a.COLORS.black03:a.COLORS.black05};

  .panda-chip-remove > div {
    background-color: ${e=>e.isDisabled?a.COLORS.black15:a.COLORS.black30};
  }

  span {
    color: ${e=>e.isDisabled?a.COLORS.black20:a.COLORS.black60};
  }

  svg {
    color: ${a.COLORS.black05};
  }
`,f=(0,I.default)(i.Chip).withConfig({displayName:"InputSelectTitle__ClickableChip",componentId:"sc-5b58bc96-3"})`
  ${e=>e.isDisabled&&I.css`
      pointer-events: none;
      span {
        color: ${a.COLORS.black20};
      }
      svg {
        color: ${a.COLORS.black20};
      }
    `}
`;var N=(0,I.default)(E.Typography).withConfig({displayName:"InputSelectTitle___StyledTypography",componentId:"sc-5b58bc96-4"})({fontWeight:500});e.s(["InputSelectTitle",0,R],600514);var S=e.i(786709);let g=({isLoading:e,isDisabled:r,children:i,width:a,ref:o,...n})=>(0,t.jsx)(P,{buttonType:r?"primary":"secondary",icon:e?void 0:"SPARK",color:r?void 0:"blue",isDisabled:r,isLoading:e,width:a,ref:o,...n,children:e?"Loading":i}),P=(0,I.default)(S.Button).withConfig({displayName:"AIButton__Container",componentId:"sc-f176751c-0"})`
  align-self: flex-start;
  ${e=>e.width&&I.css`
      width: ${e.width}px;
    `}

  ${e=>!e.isDisabled&&I.css`
      background: linear-gradient(90deg, #e8f4ff 0%, #f7edff 49.52%, #fff6e6 100%);
    `}

  span {
    ${e=>!e.isDisabled&&(e.isLoading?I.css`
            background: linear-gradient(
              90deg,
              rgba(87, 126, 255, 0.5) 0%,
              rgba(255, 96, 220, 0.5) 50%,
              rgba(255, 142, 86, 0.5) 100%
            );
            ${h}
          `:I.css`
            background: linear-gradient(90deg, #577eff 0%, #ff60dc 50%, #ff8e56 100%);
            ${h}
          `)}
  }
`,h=I.css`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;e.s(["AIButton",0,g],52508);let y="__ask_ai__",L=(0,O.observer)(({className:e,value:O,onSearch:I,onChange:A,title:m,titleIcon:C,titleCount:f,isDisabled:N,placeholder:S,onExclude:P,isExclude:h,omitAddItem:L,clearOnBlur:U,debounceTime:F,highlight:w,onFindSimilar:G,onGetSuggestion:j,onAskAI:k,renderItem:H,renderGroupTitle:Y,getSelectedLabel:V})=>{let[B,W]=(0,r.useState)([]),[$,q]=(0,r.useState)(!1),[K,Q]=(0,r.useState)(!1),X=(0,r.useRef)(null),Z=(0,r.useRef)(null),[z,J]=(0,r.useState)(""),[ee,et]=(0,r.useState)(!1),er=(0,l.getValueArray)(O),[ei,ea]=(0,r.useState)(null),[eo,en]=(0,r.useState)(!1),[e_,es]=(0,r.useState)(!1),el=!!k,ec=(0,r.useMemo)(()=>{let e=[];return el&&e.push({name:`Ask AI for "${z}"`,value:y,icon:"SPARK_LINEAR_GRADIENT"}),K||e.push(...B),e},[B,el,z,K]),ep=(0,r.useMemo)(()=>(0,T.default)(async e=>{e?(Q(!0),W(await I(e)),Q(!1)):W([])},F??300),[I,F]),ed=e=>{X.current?.blur(),A?.(Array.from(new Set(e))),W([]),J("")},eu=e=>{J(e),Q(!0),ep(e)},eE=async()=>{if(k){es(!0),et(!1);try{await k(z)}finally{es(!1)}}};return(0,r.useEffect)(()=>{ea(el?0:null)},[z,ee,el]),(0,t.jsxs)(b,{className:e,children:[(0,t.jsx)(p.InputText,{passedRef:X,value:e_?"AI searching...":z,onChange:eu,renderTitle:()=>(0,t.jsx)(R,{title:m,titleIcon:C,titleCount:f,isDisabled:N,onClear:()=>{ed([])}}),isDisabled:N||e_,placeholder:S,onBlur:()=>{et(!1),U&&J("")},onFocus:()=>{et(!0)},onKeyDown:e=>{switch(e.key){case"Enter":if($)break;let t=null!==ei?ec[ei]?.value:void 0;t===y?eE():t&&!K?ed([...er,t]):ed([...er,z]);break;case"Escape":X.current?.blur();break;case"ArrowUp":if(K)break;e.preventDefault(),ea(e=>null==e||e<=0?ec.length:e-1);break;case"ArrowDown":if(K)break;e.preventDefault(),ea(e=>null==e||e>=ec.length?0:e+1)}},onCompositionStart:()=>q(!0),onCompositionEnd:()=>q(!1),leading:e_?(0,t.jsx)(d.Spinner,{itemSize:"mini"}):(0,t.jsx)(c.Icon,{icon:"SEARCH"}),trailing:z&&(0,t.jsx)("div",{onClick:()=>eu(""),children:(0,t.jsx)(D,{icon:"CLOSE",fill:a.COLORS.black03,circleFill:a.COLORS.black30})}),containerRef:Z}),P&&(0,t.jsxs)(M,{children:[(0,t.jsx)(u.Switch,{value:h,isDisabled:N,onClick:e=>P(e)}),(0,t.jsx)(E.Typography,{children:"Exclude selection"})]}),(0,t.jsx)(_.DropdownWrapper,{refElement:Z.current,style:{width:Z.current?.offsetWidth},isOpen:!!z&&ee,onClose:()=>{},placement:"bottom-start",offset:[0,4],usePortal:!0,children:(0,t.jsx)(n.DropdownMenuDynamic,{externalSearchText:z,options:ec,onClose:()=>{},onClick:e=>{e.value===y?eE():ed([...er,e.value])},renderAddItem:K?()=>(0,t.jsxs)(v,{children:[(0,t.jsx)(d.Spinner,{itemSize:"mini"}),"Finding options..."]}):L?void 0:e=>`Search "${e}"`,onAddClick:!K&&L?void 0:e=>ed([...er,e]),renderItem:(e,r,i)=>e.value===y?(0,t.jsx)(o.DropdownItemContent,{option:e}):H?H(e,r,i):(0,t.jsx)(o.DropdownItemContent,{option:e}),renderGroupTitle:Y,focusOption:ei,setFocusOption:ea})}),!er.length&&!!j&&(0,t.jsx)(g,{width:148,isDisabled:N,isLoading:eo,onClick:async()=>{try{en(!0),await j()}finally{en(!1)}},children:"Get suggestions"}),!!er.length&&(0,t.jsxs)(x,{children:[er.map(e=>(0,t.jsx)(i.Chip,{text:(0,s.getHighlightText)(V?V(e):e,w),size:"large",type:"tag",hideIcon:!0,color:a.SelectColor.greyLightest,onRemove:N?void 0:()=>ed(er.filter(t=>t!==e))},e)),!!G&&(0,t.jsx)(g,{width:116,isLoading:eo,isDisabled:N,onClick:async()=>{try{en(!0),await G()}finally{en(!1)}},children:"Find similar"})]})]})}),b=I.default.div.withConfig({displayName:"InputSelectSearch__Container",componentId:"sc-fc1dd5e9-0"})`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=I.default.div.withConfig({displayName:"InputSelectSearch__LoadingContainer",componentId:"sc-fc1dd5e9-1"})`
  display: flex;
  align-items: center;
  gap: 8px;
`,D=(0,I.default)(c.Icon).withConfig({displayName:"InputSelectSearch__ClearIcon",componentId:"sc-fc1dd5e9-2"})`
  cursor: pointer;
`,M=I.default.div.withConfig({displayName:"InputSelectSearch__ExcludeTab",componentId:"sc-fc1dd5e9-3"})`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
`,x=I.default.div.withConfig({displayName:"InputSelectSearch__OptionsContainer",componentId:"sc-fc1dd5e9-4"})`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;e.s(["InputSearchSelect",0,L],619587)},223865,e=>{e.v(t=>Promise.all(["static/chunks/12cq8x90cgm51.js"].map(t=>e.l(t))).then(()=>t(507520)))},984515,e=>{e.v(t=>Promise.all(["static/chunks/02rv2gbgm77de.js"].map(t=>e.l(t))).then(()=>t(171317)))}]);