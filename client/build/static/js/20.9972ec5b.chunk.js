(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[20],{170:function(t,e,n){"use strict";n.r(e);var r=n(2),c=n.n(r),a=n(6),i=n(5),s=n(17),u=n.n(s),o=n(0),d=n(1);e.default=function(){var t=Object(o.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],s=Object(o.useState)(!1),l=Object(i.a)(s,2),h=l[0],j=l[1],b=Object(o.useState)(!1),f=Object(i.a)(b,2),p=f[0],O=f[1];Object(o.useEffect)((function(){O(!0),x(),O(!1)}),[]);var x=function(){var t=Object(a.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u()({url:"/api/admin/restaurant/list",method:"GET"}).then((function(t){r(t.data.data)})).catch((function(t){}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),m=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return j(!0),t.next=3,u()({url:"/api/admin/validate/mail/restaurant/".concat(e),method:"GET"}).then(function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:j(!1);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return j(!0),t.next=3,u()({url:"/api/admin/block/mail/restaurant/".concat(e),method:"GET"}).then(function(){var t=Object(a.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:j(!1);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"super-admin",children:[Object(d.jsx)("h2",{children:"Page de validation Email par le Super Admin"}),Object(d.jsxs)("table",{border:"1",style:{textAlign:"center"},children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Email"}),Object(d.jsx)("th",{children:"Verified"}),Object(d.jsx)("th",{children:"Authorized"}),Object(d.jsx)("th",{children:"Actions"})]})}),!p&&Object(d.jsx)("tbody",{children:n.map((function(t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:t.email}),Object(d.jsx)("td",{children:t.isVerified?"\u2705":"\ud83d\udeab"}),Object(d.jsx)("td",{children:t.isAuthorized?"\u2705":"\ud83d\udeab"}),Object(d.jsx)("td",{children:t.isAuthorized?Object(d.jsx)("button",{disabled:h,onClick:function(){return v(t._id)},children:"Block mail"}):Object(d.jsx)("button",{disabled:h,onClick:function(){return m(t._id)},children:"Validate mail"})})]},t.email)}))})]})]})}}}]);
//# sourceMappingURL=20.9972ec5b.chunk.js.map