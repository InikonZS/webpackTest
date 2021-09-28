import { doSomething } from './module';
import style from './style.css';
import style2 from './style2.css';
import image from './assets/Group.png';
import svginline from './assets/sorc.inl.svg';
import myf from './file.myf';

const img = document.createElement('img');
img.src = image;
document.body.appendChild(img);
// console.log(svginline);
const img1 = document.createElement('div');
img1.innerHTML = svginline;
document.body.appendChild(img1);
console.log(style);
doSomething();

console.log('Hello World!');

for (let i = 0; i < 10; i++) {
  console.log('dfff');
}

function createEl(style:string, text:string) {
  const el = document.createElement('div');
  el.textContent = (text);
  el.className = style;
  document.body.appendChild(el);
}

createEl(style.stYLe, 'Element from TS');

createEl(style2.style, myf);

const b:string = 'dfs';

setTimeout(() => {
  const a = 'dsf';
  console.log(a + b);
}, 100);
