function play(e) {
  let a = e.target;
  let path = a.dataset.path;
  console.log(`play: ${a.dataset.path}`);

  document.querySelector('video').src = '/video/' + path;
}

function expand(e) {
  let a = e.target;
  let path = a.dataset.path;

  if (!a.classList.contains('loaded')) {
    let ul = document.createElement('ul');
    fetch(path, ul);
    a.parentNode.appendChild(ul);
    a.classList.add('loaded');
  }
}

function fetch(path, ul) {
  ajax.get(`/list/${path}`).then(data => {
    for (let file of data) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = file.name;
      a.href = 'javascript:;';
      a.dataset.path = file.path;

      if (file.type === 'File') {
        a.classList.add('file');
        a.addEventListener('click', play);
      } else {
        a.classList.add('dir');
        a.addEventListener('click', expand);
      }

      li.appendChild(a);
      ul.appendChild(li);
    }
  });
}

let ul = document.querySelector('.root');
fetch('', ul);