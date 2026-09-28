'use strict';
(()=>{
const form=document.querySelector('#newsletter-form'),feedback=document.querySelector('#newsletter-feedback'),link=document.querySelector('#newsletter-email');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.elements.name.value.trim(),email=form.elements.email.value.trim();if(!name){form.elements.name.setCustomValidity('Please enter your name.');form.elements.name.reportValidity();return}const body=`Hello Climate Action Office,\n\nI would like to receive Maynooth DZ community news and event updates.\n\nName: ${name}\nEmail: ${email}\n\nI agree to the website privacy and cookie policies. Please confirm my subscription and let me know how I can unsubscribe.\n`;link.href='mailto:climateaction@kildarecoco.ie?subject='+encodeURIComponent('Maynooth DZ — community updates request')+'&body='+encodeURIComponent(body);feedback.hidden=false;});
form.addEventListener('input',()=>{form.elements.name.setCustomValidity('');feedback.hidden=true;link.removeAttribute('href')});
})();
