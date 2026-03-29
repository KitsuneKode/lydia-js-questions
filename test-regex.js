const prompt = `
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
\`\`\`javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
\`\`\`
`;
console.log(prompt.replace(/```[a-z]*\n[\s\S]*?\n```/g, '').trim());
