!function(){"use strict";var e="";function t(e,t,r){!function(e){return e.some((e=>!e.validity.valid))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))}var r=e+"8650253b58b46f0f1c06.svg",o=e+"1ecf96fab54a91c898b4.svg",n=e+"40608da7369d39bc1077.svg",a=e+"d73f076c46eb5467f5fc.svg";const s=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}getAppInfo(){return Promise.all([this.getInitalCards(),this.getUserInfo()])}getInitalCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}makeCard(e){let{link:t,name:r}=e;return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({link:t,name:r})}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}deleteCard(e){let{id:t}=e;return fetch(`${this._baseUrl}/cards/${t}`,{method:"DELETE",headers:this._headers}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}changeLikeStatus(e){let{id:t,isLiked:r}=e;return fetch(`${this._baseUrl}/cards/${t}/likes`,{method:r?"DELETE":"PUT",headers:this._headers}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}updateProfileInfo(e){let{name:t,about:r}=e;return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}updateAvatar(e){let{avatar:t}=e;return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((e=>{if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}))}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"d11d0e4f-579c-4c1f-9935-38514d3f14dc","Content-Type":"application/json"}}),c=document.getElementById("image-logo"),l=document.getElementById("image-avatar"),d=document.getElementById("image-pen"),i=document.getElementById("image-pen-white"),u=document.getElementById("image-plus");c.src=r,d.src=o,i.src=a,u.src=n;const m=document.querySelector(".profile__edit-btn"),f=document.querySelector("#edit-modal"),_=document.querySelector("#photo-modal"),h=_.querySelector(".modal__photo"),v=_.querySelector(".modal__description"),p=document.forms["edit-profile"],y=p.querySelector("#name"),S=p.querySelector("#description"),b=document.querySelector(".profile__name"),E=document.querySelector(".profile__description");function L(e){e.classList.add("modal_opened"),document.addEventListener("keydown",k)}function g(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",k)}function k(e){const t=document.querySelector(".modal_opened");"Escape"===e.key&&g(t)}s.getAppInfo().then((e=>{const t=e[0],r=e[1];l.src=r.avatar,l.alt=r.name,b.textContent=r.name,E.textContent=r.about,t.forEach((e=>{const t=x(e);q.append(t)}))})).catch((e=>{console.error(e)})),document.querySelectorAll(".modal").forEach((e=>{e.addEventListener("click",(function(t){t.target.parentElement.classList.contains("page")&&g(e)}))})),document.querySelectorAll(".modal__close-button").forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(r=>{e.classList.contains("modal__close-button_cancel")&&r.preventDefault(),g(t)}))})),m.addEventListener("click",(()=>{L(f),y.value=b.textContent,S.value=E.textContent})),p.addEventListener("submit",(function(e){e.preventDefault();const t=y.value,r=S.value;s.updateProfileInfo({name:t,about:r}).then((e=>{b.textContent=e.name,E.textContent=e.about,g(f)})).catch((e=>{console.error(e)}))}));const q=document.querySelector(".cards__list"),C=document.querySelector("#card");let $,j;function x(e){const t=C.content.cloneNode(!0),r=t.querySelector(".card__button"),o=t.querySelector(".card__delete-button"),n=e.link,a=e.name,c=t.querySelector(".card__image");return c.src=n,c.alt=a,t.querySelector(".card__name").textContent=a,o.addEventListener("click",(()=>{!function(e,t){$=e,j=t._id,L(I)}(o.closest(".card"),e)})),e.isLiked&&r.classList.add("card__button_liked"),r.addEventListener("click",(t=>{!function(e,t){const r=e.target.classList.contains("card__button_liked");s.changeLikeStatus({id:t,isLiked:r}).then((()=>{e.target.classList.toggle("card__button_liked")})).catch((e=>{console.error(e)}))}(t,e._id)})),c.addEventListener("click",(()=>{h.src=n,h.alt=a,v.textContent=a,L(_)})),t}const I=document.querySelector("#delete-modal");I.querySelector(".modal__prompt-buttons").addEventListener("submit",(function(e){e.preventDefault(),M(!0),s.deleteCard({id:j}).then((()=>{$.remove(),g(I)})).catch((e=>{console.error(e)})).finally(M(!1))}));const P=document.querySelector(".profile__new-btn"),U=document.querySelector("#add-modal"),A=document.forms["add-post"],B=A.querySelector("#link"),D=A.querySelector("#caption");P.addEventListener("click",(()=>{L(U)})),A.addEventListener("submit",(function(e){e.preventDefault();const t={name:D.value,link:B.value};z(!0),s.makeCard({link:t.link,name:t.name}).then((()=>{q.prepend(x(t)),g(U),B.value="",D.value=""})).catch((e=>{console.error(e)})).finally(z(!1))}));const T=document.querySelector("#avatar-modal"),w=document.forms["avatar-form"],N=w.querySelector("#avatar-pic");var O;document.querySelector(".profile__avatar-btn").addEventListener("click",(()=>{L(T)})),w.addEventListener("submit",(function(e){e.preventDefault();const t=N.value;z(!0),s.updateAvatar({avatar:t}).then((()=>{l.src=t,g(T),N.value=""})).catch((e=>{console.error(e)})).finally(z(!1))})),O={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",errorSelector:".modal__error",inactiveButtonClass:"modal__save-button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visiable"},Array.from(document.querySelectorAll(O.formSelector)).forEach((e=>{e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,r){const o=e.querySelector(r.submitButtonSelector),n=Array.from(e.querySelectorAll(r.inputSelector));t(n,o,r),n.forEach((a=>{a.addEventListener("input",(function(){!function(e,t,r){t.validity.valid?function(e,t,r){const o=e.querySelector(`${r.errorSelector}-${t.id}`);t.classList.remove(r.inputErrorClass),o.classList.remove(r.errorClass),o.textContent=""}(e,t,r):function(e,t,r,o){const n=e.querySelector(`${r.errorSelector}-${t.id}`);t.classList.add(r.inputErrorClass),n.textContent=o,n.classList.add(r.errorClass)}(e,t,r,t.validationMessage)}(e,a,r),t(n,o,r)}))}))}(e,O)}));const J=document.getElementById("loading-modal"),H=J.querySelector(".modal__prompt");function z(e){e?(H.textContent="Saving...",J.classList.add("modal_opened")):(H.textContent="",J.classList.remove("modal_opened"))}function M(e){e?(H.textContent="Deleteing...",J.classList.add("modal_opened")):(H.textContent="",J.classList.remove("modal_opened"))}}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU9rSixZQUNyQ0ssRUFBYS9ELFlBQWMsRUFDN0IsQ0FXSWdFLENBQWVGLEVBQWFwSixFQUFjRixHQTNCOUMsU0FBd0JzSixFQUFhcEosRUFBY0YsRUFBUXlKLEdBQ3pELE1BQU1GLEVBQWVELEVBQVlyRixjQUMvQixHQUFHakUsRUFBT2dKLGlCQUFpQjlJLEVBQWF1QyxNQUUxQ3ZDLEVBQWFLLFVBQVVHLElBQUlWLEVBQU9pSixpQkFDbENNLEVBQWEvRCxZQUFjaUUsRUFDM0JGLEVBQWFoSixVQUFVRyxJQUFJVixFQUFPa0osV0FDcEMsQ0FhSVEsQ0FDRUosRUFDQXBKLEVBQ0FGLEVBQ0FFLEVBQWF5SixrQkFLbkIsQ0E0Qk1DLENBQW1CTixFQUFhcEosRUFBY0YsR0FDOUNILEVBQWtCQyxFQUFXQyxFQUFlQyxFQUM5QyxHQUFFLEdBRU4sQ0FRSTZKLENBQWtCUixFQUFRckosRUFBTyxJRThMckMsTUFBTThKLEVBQWV6RyxTQUFTQyxlQUFlLGlCQUN2Q3lHLEVBQWNELEVBQWE3RixjQUFjLGtCQUUvQyxTQUFTc0UsRUFBY3lCLEdBQ2pCQSxHQUNGRCxFQUFZdkUsWUFBYyxZQUMxQnNFLEVBQWF2SixVQUFVRyxJQUFJLGtCQUUzQnFKLEVBQVl2RSxZQUFjLEdBQzFCc0UsRUFBYXZKLFVBQVVDLE9BQU8sZ0JBRWxDLENBRUEsU0FBU3VILEVBQWVrQyxHQUNsQkEsR0FDRkYsRUFBWXZFLFlBQWMsZUFDMUJzRSxFQUFhdkosVUFBVUcsSUFBSSxrQkFFM0JxSixFQUFZdkUsWUFBYyxHQUMxQnNFLEVBQWF2SixVQUFVQyxPQUFPLGdCQUVsQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvc2NyaXB0cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvQXBpLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7IiwiLy8gRGVjbGFyaW5nIGEgY29uZmlndXJhdGlvbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbi8vIG5lY2Vzc2FyeSBjbGFzc2VzIGFuZCBzZWxlY3RvcnMuXG5jb25zdCBzZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zYXZlLWJ1dHRvblwiLFxuICBlcnJvclNlbGVjdG9yOiBcIi5tb2RhbF9fZXJyb3JcIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2lhYmxlXCIsXG59O1xuXG5mdW5jdGlvbiBzaG93SW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcsIG1lc3NhZ2UpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgJHtjb25maWcuZXJyb3JTZWxlY3Rvcn0tJHtpbnB1dEVsZW1lbnQuaWR9YFxuICApO1xuICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmVycm9yQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgJHtjb25maWcuZXJyb3JTZWxlY3Rvcn0tJHtpbnB1dEVsZW1lbnQuaWR9YFxuICApO1xuICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmVycm9yQ2xhc3MpO1xuICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjaGVja0lucHV0VmFsaWRpdHkoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSB7XG4gIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgc2hvd0lucHV0RXJyb3IoXG4gICAgICBmb3JtRWxlbWVudCxcbiAgICAgIGlucHV0RWxlbWVudCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSB7XG4gIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZykge1xuICBpZiAoaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbGVtZW50LCBjb25maWcpIHtcbiAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKVxuICApO1xuXG4gIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcblxuICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0lucHV0VmFsaWRpdHkoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVZhbGlkYXRpb24oY29uZmlnKSB7XG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpKTtcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsLCBjb25maWcpO1xuICB9KTtcbn1cblxuLy9lbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbmV4cG9ydCB7IGVuYWJsZVZhbGlkYXRpb24sIHNldHRpbmdzIH07XG4iLCJjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0YWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbWFrZUNhcmQoeyBsaW5rLCBuYW1lIH0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbGluaywgbmFtZSB9KSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoeyBpZCB9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUxpa2VTdGF0dXMoeyBpZCwgaXNMaWtlZCB9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByb2ZpbGVJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUF2YXRhcih7IGF2YXRhciB9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgYXZhdGFyIH0pLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iLCJpbXBvcnQgeyBlbmFibGVWYWxpZGF0aW9uLCBzZXR0aW5ncyB9IGZyb20gXCIuLi9zY3JpcHRzL3ZhbGlkYXRpb24uanNcIjtcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL2ltcG9ydCBpbml0aWFsQ2FyZHMgZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XG5cbmltcG9ydCBsb2dvU3JjIGZyb20gXCIuLi9pbWFnZXMvTG9nby5zdmdcIjtcbi8vaW1wb3J0IGF2YXRhclNyYyBmcm9tIFwiLi4vaW1hZ2VzL2F2YXRhci5qcGdcIjtcbmltcG9ydCBwZW5TcmMgZnJvbSBcIi4uL2ltYWdlcy9wZW4uc3ZnXCI7XG5pbXBvcnQgcGx1c1NyYyBmcm9tIFwiLi4vaW1hZ2VzL3BsdXMuc3ZnXCI7XG5pbXBvcnQgcGVuV2hpdGVTcmMgZnJvbSBcIi4uL2ltYWdlcy9wZW4td2hpdGUuc3ZnXCI7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQxMWQwZTRmLTU3OWMtNGMxZi05OTM1LTM4NTE0ZDNmMTRkY1wiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IGltYWdlTG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1hZ2UtbG9nb1wiKTtcbmNvbnN0IGltYWdlQXZhdGFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZS1hdmF0YXJcIik7XG5jb25zdCBpbWFnZVBlbkJsYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZS1wZW5cIik7XG5jb25zdCBpbWFnZVBlbldoaXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZS1wZW4td2hpdGVcIik7XG5jb25zdCBpbWFnZVBsdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlLXBsdXNcIik7XG5cbmltYWdlTG9nby5zcmMgPSBsb2dvU3JjO1xuaW1hZ2VQZW5CbGFjay5zcmMgPSBwZW5TcmM7XG5pbWFnZVBlbldoaXRlLnNyYyA9IHBlbldoaXRlU3JjO1xuaW1hZ2VQbHVzLnNyYyA9IHBsdXNTcmM7XG5cbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ0blwiKTtcbmNvbnN0IGVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1tb2RhbFwiKTtcblxuY29uc3QgcGhvdG9Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvdG8tbW9kYWxcIik7XG5jb25zdCBwaG90b01vZGFsSW1hZ2UgPSBwaG90b01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3Bob3RvXCIpO1xuY29uc3QgcGhvdG9Nb2RhbENhcHRpb24gPSBwaG90b01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Rlc2NyaXB0aW9uXCIpO1xuXG5jb25zdCBwcm9maWxlRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZVwiXTtcblxuY29uc3QgbmFtZUlucHV0ID0gcHJvZmlsZUZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGpvYklucHV0ID0gcHJvZmlsZUZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIik7XG5cbmNvbnN0IHByb2ZpbGVOYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcblxuYXBpXG4gIC5nZXRBcHBJbmZvKClcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkQ2FyZHMgPSByZXN1bHRbMF07XG4gICAgY29uc3Qgc2F2ZWRQcm9maWxlID0gcmVzdWx0WzFdO1xuICAgIGltYWdlQXZhdGFyLnNyYyA9IHNhdmVkUHJvZmlsZVtcImF2YXRhclwiXTtcbiAgICBpbWFnZUF2YXRhci5hbHQgPSBzYXZlZFByb2ZpbGVbXCJuYW1lXCJdO1xuICAgIHByb2ZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IHNhdmVkUHJvZmlsZVtcIm5hbWVcIl07XG4gICAgcHJvZmlsZUpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBzYXZlZFByb2ZpbGVbXCJhYm91dFwiXTtcbiAgICBzYXZlZENhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIGNvbnN0IGNhcmRFbCA9IGdldENhcmRFbGVtZW50cyhjYXJkKTtcbiAgICAgIGNhcmRzTGlzdC5hcHBlbmQoY2FyZEVsKTtcbiAgICB9KTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXNjYXBlTGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGVzY2FwZUxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlTGlzdGVuZXIoZXZ0KSB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9vcGVuZWRcIik7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY2xvc2VNb2RhbChtb2RhbCk7XG4gIH1cbn1cblxuY29uc3QgbW9kYWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbFwiKTtcbm1vZGFsTGlzdC5mb3JFYWNoKChtb2RhbCkgPT4ge1xuICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZVwiKSkge1xuICAgICAgY2xvc2VNb2RhbChtb2RhbCk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5jb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19jbG9zZS1idXR0b25cIik7XG5jbG9zZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gYnV0dG9uLmNsb3Nlc3QoXCIubW9kYWxcIik7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4ge1xuICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlLWJ1dHRvbl9jYW5jZWxcIikpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBjbG9zZU1vZGFsKHBvcHVwKTtcbiAgfSk7XG59KTtcblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGVkaXRNb2RhbCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHByb2ZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudDtcbiAgam9iSW5wdXQudmFsdWUgPSBwcm9maWxlSm9iRWxlbWVudC50ZXh0Q29udGVudDtcbn0pO1xuXG4vLyBUaGUgZm9ybSBzdWJtaXNzaW9uIGhhbmRsZXIuIE5vdGUgdGhhdCBpdHMgbmFtZVxuLy8gc3RhcnRzIHdpdGggYSB2ZXJiIGFuZCBjb25jaXNlbHkgZGVzY3JpYmVzIHdoYXQgaXQgZG9lcy5cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KGV2dCkge1xuICAvLyBQcmV2ZW50IGRlZmF1bHQgYnJvd3NlciBiZWhhdmlvciwgc2VlIGV4cGxhbmF0aW9uIGJlbG93LlxuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBuZXdOYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICBjb25zdCBuZXdKb2IgPSBqb2JJbnB1dC52YWx1ZTtcblxuICBhcGlcbiAgICAudXBkYXRlUHJvZmlsZUluZm8oeyBuYW1lOiBuZXdOYW1lLCBhYm91dDogbmV3Sm9iIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGFbXCJuYW1lXCJdO1xuICAgICAgcHJvZmlsZUpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhW1wiYWJvdXRcIl07XG4gICAgICBjbG9zZU1vZGFsKGVkaXRNb2RhbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xufVxuXG4vLyBDb25uZWN0IHRoZSBoYW5kbGVyIHRvIHRoZSBmb3JtLCBzbyBpdCB3aWxsIHdhdGNoIGZvciB0aGUgc3VibWl0IGV2ZW50LlxucHJvZmlsZUZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlUHJvZmlsZUZvcm1TdWJtaXQpO1xuXG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xuY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkXCIpO1xuXG5sZXQgc2VsZWN0ZWRDYXJkO1xubGV0IHNlbGVjdGVkQ2FyZElkO1xuXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudHMoZGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgbGlrZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fYnV0dG9uXCIpO1xuICBjb25zdCBkZWxldGVCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG5cbiAgY29uc3QgY2FyZEltYWdlID0gZGF0YVtcImxpbmtcIl07XG4gIGNvbnN0IGNhcmROYW1lID0gZGF0YVtcIm5hbWVcIl07XG4gIGNvbnN0IGNhcmRJbWFnZUVsZW1lbnQgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuXG4gIGNhcmRJbWFnZUVsZW1lbnQuc3JjID0gY2FyZEltYWdlO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGNhcmROYW1lO1xuICBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX25hbWVcIikudGV4dENvbnRlbnQgPSBjYXJkTmFtZTtcblxuICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwYXJlbnRDYXJkID0gZGVsZXRlQnV0dG9uLmNsb3Nlc3QoXCIuY2FyZFwiKTtcbiAgICBoYW5kbGVEZWxldGVDYXJkKHBhcmVudENhcmQsIGRhdGEpO1xuICB9KTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fYnV0dG9uX2xpa2VkXCIpO1xuICB9XG5cbiAgbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4ge1xuICAgIGhhbmRsZUxpa2UoZXZ0LCBkYXRhLl9pZCk7XG4gIH0pO1xuXG4gIGNhcmRJbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwaG90b01vZGFsSW1hZ2Uuc3JjID0gY2FyZEltYWdlO1xuICAgIHBob3RvTW9kYWxJbWFnZS5hbHQgPSBjYXJkTmFtZTtcbiAgICBwaG90b01vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGNhcmROYW1lO1xuICAgIG9wZW5Nb2RhbChwaG90b01vZGFsKTtcbiAgfSk7XG4gIHJldHVybiBjYXJkRWxlbWVudDtcbn1cblxuY29uc3QgZGVsZXRlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlbGV0ZS1tb2RhbFwiKTtcbmNvbnN0IGRlbGV0ZUZvcm0gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19wcm9tcHQtYnV0dG9uc1wiKTtcblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YSkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBkYXRhW1wiX2lkXCJdO1xuICAvL2NvbnNvbGUubG9nKHNlbGVjdGVkQ2FyZElkKTtcbiAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgaGFuZGxlRGVsZXRpbmcodHJ1ZSk7XG4gIGFwaVxuICAgIC5kZWxldGVDYXJkKHsgaWQ6IHNlbGVjdGVkQ2FyZElkIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpO1xuICAgICAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoaGFuZGxlRGVsZXRpbmcoZmFsc2UpKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTGlrZShldnQsIGlkKSB7XG4gIGNvbnN0IGlzTGlrZWQgPSBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2J1dHRvbl9saWtlZFwiKTtcbiAgYXBpXG4gICAgLmNoYW5nZUxpa2VTdGF0dXMoeyBpZDogaWQsIGlzTGlrZWQ6IGlzTGlrZWQgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19idXR0b25fbGlrZWRcIik7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xufVxuXG5kZWxldGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRGVsZXRlU3VibWl0KTtcblxuY29uc3QgcG9zdEFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmV3LWJ0blwiKTtcbmNvbnN0IGFkZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtbW9kYWxcIik7XG5cbmNvbnN0IHBvc3RGb3JtRWxlbWVudCA9IGRvY3VtZW50LmZvcm1zW1wiYWRkLXBvc3RcIl07XG5cbmNvbnN0IGxpbmtJbnB1dCA9IHBvc3RGb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpbmtcIik7XG5jb25zdCBjYXB0aW9uSW5wdXQgPSBwb3N0Rm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXB0aW9uXCIpO1xuXG5wb3N0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG9wZW5Nb2RhbChhZGRNb2RhbCk7XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlQWRkRm9ybVN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IG5ld0NhcmQgPSB7XG4gICAgbmFtZTogY2FwdGlvbklucHV0LnZhbHVlLFxuICAgIGxpbms6IGxpbmtJbnB1dC52YWx1ZSxcbiAgfTtcbiAgaGFuZGxlTG9hZGluZyh0cnVlKTtcbiAgYXBpXG4gICAgLm1ha2VDYXJkKHsgbGluazogbmV3Q2FyZC5saW5rLCBuYW1lOiBuZXdDYXJkLm5hbWUgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjYXJkc0xpc3QucHJlcGVuZChnZXRDYXJkRWxlbWVudHMobmV3Q2FyZCkpO1xuICAgICAgY2xvc2VNb2RhbChhZGRNb2RhbCk7XG4gICAgICBsaW5rSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgY2FwdGlvbklucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseShoYW5kbGVMb2FkaW5nKGZhbHNlKSk7XG59XG5wb3N0Rm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRGb3JtU3VibWl0KTtcblxuY29uc3QgZWRpdEF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XG5jb25zdCBhdmF0YXJGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJhdmF0YXItZm9ybVwiXTtcbmNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyRm9ybS5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1waWNcIik7XG5jb25zdCBhdmF0YXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG5hdmF0YXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGVkaXRBdmF0YXJNb2RhbCk7XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlQXZhdGFyU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgbmV3QXZhdGFyID0gYXZhdGFySW5wdXQudmFsdWU7XG4gIGhhbmRsZUxvYWRpbmcodHJ1ZSk7XG4gIGFwaVxuICAgIC51cGRhdGVBdmF0YXIoeyBhdmF0YXI6IG5ld0F2YXRhciB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGltYWdlQXZhdGFyLnNyYyA9IG5ld0F2YXRhcjtcbiAgICAgIGNsb3NlTW9kYWwoZWRpdEF2YXRhck1vZGFsKTtcbiAgICAgIGF2YXRhcklucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseShoYW5kbGVMb2FkaW5nKGZhbHNlKSk7XG59XG5hdmF0YXJGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlQXZhdGFyU3VibWl0KTtcbmVuYWJsZVZhbGlkYXRpb24oc2V0dGluZ3MpO1xuXG5jb25zdCBsb2FkaW5nTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmctbW9kYWxcIik7XG5jb25zdCBsb2FkaW5nVGV4dCA9IGxvYWRpbmdNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19wcm9tcHRcIik7XG5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRpbmcoaXNMb2FkaW5nKSB7XG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICBsb2FkaW5nVGV4dC50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XG4gICAgbG9hZGluZ01vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgbG9hZGluZ1RleHQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGxvYWRpbmdNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0aW5nKGlzRGVsZXRlaW5nKSB7XG4gIGlmIChpc0RlbGV0ZWluZykge1xuICAgIGxvYWRpbmdUZXh0LnRleHRDb250ZW50ID0gXCJEZWxldGVpbmcuLi5cIjtcbiAgICBsb2FkaW5nTW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkaW5nVGV4dC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgbG9hZGluZ01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJfX3dlYnBhY2tfcmVxdWlyZV9fIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJidXR0b25FbGVtZW50IiwiY29uZmlnIiwic29tZSIsImlucHV0RWxlbWVudCIsInZhbGlkaXR5IiwidmFsaWQiLCJoYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJhZGQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzIiwiX2Jhc2VVcmwiLCJiYXNlVXJsIiwiX2hlYWRlcnMiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0YWxDYXJkcyIsImdldFVzZXJJbmZvIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwibWFrZUNhcmQiLCJfcmVmIiwibGluayIsIm5hbWUiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImRlbGV0ZUNhcmQiLCJfcmVmMiIsImlkIiwiY2hhbmdlTGlrZVN0YXR1cyIsIl9yZWYzIiwiaXNMaWtlZCIsInVwZGF0ZVByb2ZpbGVJbmZvIiwiX3JlZjQiLCJhYm91dCIsInVwZGF0ZUF2YXRhciIsIl9yZWY1IiwiYXZhdGFyIiwiYXV0aG9yaXphdGlvbiIsImltYWdlTG9nbyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbWFnZUF2YXRhciIsImltYWdlUGVuQmxhY2siLCJpbWFnZVBlbldoaXRlIiwiaW1hZ2VQbHVzIiwic3JjIiwibG9nb1NyYyIsInBlblNyYyIsInBlbldoaXRlU3JjIiwicGx1c1NyYyIsInByb2ZpbGVFZGl0QnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImVkaXRNb2RhbCIsInBob3RvTW9kYWwiLCJwaG90b01vZGFsSW1hZ2UiLCJwaG90b01vZGFsQ2FwdGlvbiIsInByb2ZpbGVGb3JtRWxlbWVudCIsImZvcm1zIiwibmFtZUlucHV0Iiwiam9iSW5wdXQiLCJwcm9maWxlTmFtZUVsZW1lbnQiLCJwcm9maWxlSm9iRWxlbWVudCIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVzY2FwZUxpc3RlbmVyIiwiY2xvc2VNb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJyZXN1bHQiLCJzYXZlZENhcmRzIiwic2F2ZWRQcm9maWxlIiwiYWx0IiwidGV4dENvbnRlbnQiLCJmb3JFYWNoIiwiY2FyZCIsImNhcmRFbCIsImdldENhcmRFbGVtZW50cyIsImNhcmRzTGlzdCIsImFwcGVuZCIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwicXVlcnlTZWxlY3RvckFsbCIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImJ1dHRvbiIsInBvcHVwIiwiY2xvc2VzdCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJuZXdOYW1lIiwibmV3Sm9iIiwiZGF0YSIsImNhcmRUZW1wbGF0ZSIsInNlbGVjdGVkQ2FyZCIsInNlbGVjdGVkQ2FyZElkIiwiY2FyZEVsZW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwibGlrZUJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsImNhcmRJbWFnZSIsImNhcmROYW1lIiwiY2FyZEltYWdlRWxlbWVudCIsImRlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlQ2FyZCIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJoYW5kbGVEZWxldGluZyIsImZpbmFsbHkiLCJwb3N0QWRkQnV0dG9uIiwiYWRkTW9kYWwiLCJwb3N0Rm9ybUVsZW1lbnQiLCJsaW5rSW5wdXQiLCJjYXB0aW9uSW5wdXQiLCJuZXdDYXJkIiwiaGFuZGxlTG9hZGluZyIsInByZXBlbmQiLCJlZGl0QXZhdGFyTW9kYWwiLCJhdmF0YXJGb3JtIiwiYXZhdGFySW5wdXQiLCJuZXdBdmF0YXIiLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJlcnJvclNlbGVjdG9yIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIkFycmF5IiwiZnJvbSIsImZvcm1FbCIsImZvcm1FbGVtZW50IiwiZXJyb3JFbGVtZW50IiwiaGlkZUlucHV0RXJyb3IiLCJtZXNzYWdlIiwic2hvd0lucHV0RXJyb3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNldEV2ZW50TGlzdGVuZXJzIiwibG9hZGluZ01vZGFsIiwibG9hZGluZ1RleHQiLCJpc0xvYWRpbmciLCJpc0RlbGV0ZWluZyJdLCJzb3VyY2VSb290IjoiIn0=