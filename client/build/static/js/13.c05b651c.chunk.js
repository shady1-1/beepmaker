(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[13],{130:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(35);function s(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(a.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var s=0,r=function(){};return{s:r,n:function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}},142:function(e,t,n){},174:function(e,t,n){"use strict";n.r(t);var a=n(2),s=n.n(a),r=n(130),o=n(6),i=n(5),c=n(17),l=n.n(c),u=n(0),d=n(3),j=n(21),p=n(34),b=(n(142),n(1));t.default=function(){var e=Object(u.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(u.useState)(""),f=Object(i.a)(c,2),m=f[0],v=f[1],h=Object(u.useState)(!1),O=Object(i.a)(h,2),g=O[0],w=O[1],x=Object(u.useState)(null),y=Object(i.a)(x,2),k=y[0],N=y[1],S=Object(u.useState)(!0),P=Object(i.a)(S,2),q=P[0],F=P[1],J=Object(d.i)(),T=function(){var e=Object(o.a)(s.a.mark((function e(t){var n,o,i,c,u,d,j;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),w(!0),a(""),n=document.querySelector("form"),o=new FormData(n),i=[],c=Object(r.a)(o.values());try{for(c.s();!(u=c.n()).done;)d=u.value,i.push(d)}catch(s){c.e(s)}finally{c.f()}return j=JSON.stringify({newPassword1:i.shift(),newPassword2:i.shift()}),e.next=11,l()({url:"/api/restaurant/resetPassword",method:"POST",data:j,headers:{Authorization:"auth-token:".concat(k),"Content-Type":"application/json"}}).then((function(e){if(n.reset(),a(e.data.message),/`/.test(e.data.message)){var t=e.data.message.split("`"),s=t.pop(),r=t.pop();a("New passwords length (".concat(r.length,") ").concat(s.slice(2)))}v(e.data.success?"ok":"ko"),w(!1),F(!1)})).catch((function(e){var t;n.reset();var s=(null===e||void 0===e||null===(t=e.request)||void 0===t?void 0:t.response)?JSON.parse(e.request.response).message:e.message;a(s),v("ko"),w(!1)}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),e.next=3,l()({url:"/api/restaurant/verify-forgotPassword",method:"POST",headers:{Authorization:"auth-token:".concat(t),"Content-Type":"application/json"}}).then((function(e){var t,n,s,r;N(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.token),a(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message),v((null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.success)?"ok":"ko"),!1===(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.success)&&F(!1),w(!1)})).catch((function(e){var t,n=(null===e||void 0===e||null===(t=e.request)||void 0===t?void 0:t.response)?JSON.parse(e.request.response).message:e.message;a(n),v("ko"),F(!1),w(!1)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(t){e.apply(this,arguments)}(J.token)}),[J]),Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{className:"resetPassword-container",children:[Object(b.jsx)("div",{className:"container-left",children:Object(b.jsx)("img",{alt:"loading",src:"../img/login3.jpg"})}),Object(b.jsx)("div",{className:"container-right",children:g?Object(b.jsx)("div",{className:"container-loader",children:Object(b.jsx)("div",{className:"loader"})}):Object(b.jsxs)("div",{className:"login",children:[Object(b.jsx)(j.b,{to:"/",children:Object(b.jsx)("img",{alt:"loading",src:"../img/Group73.png"})}),!0===q?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"login-title",children:"Modifier votre mot de passe"}),Object(b.jsxs)("form",{onSubmit:T,children:[Object(b.jsx)("input",{type:"password",placeholder:"Nouveau mot de passe",name:"new-password1",required:!0}),Object(b.jsx)("input",{type:"password",placeholder:"V\xe9rifier le nouveau mot de passe",name:"new-password2",required:!0}),n&&Object(b.jsx)("div",{className:"alert-message "+m,children:n}),Object(b.jsx)("button",{type:"submit",disabled:g,className:"btn btn-submit",children:"Modifier"})]})]}):n&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"alert-message "+m,children:n}),"ko"===m?Object(b.jsx)(j.b,{className:"login-link",to:p.a.adminForgotPassword,children:"Envoyer un autre Email ?"}):Object(b.jsx)(j.b,{className:"login-link",to:p.a.adminLoginPage,children:"Page de connexion ?"})]})]})})]})})}}}]);
//# sourceMappingURL=13.c05b651c.chunk.js.map