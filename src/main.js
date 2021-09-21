const $siteList = $('.siteList');
const $addLink = $('#addLink');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {logo: 'A', url: 'https://www.acfun.cn'},
  {logo: 'B', url: 'https://www.bilibili.com'}
]
const deleteUrl = (url) => {
  return url.replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

const render = () => {
  $siteList.find('li:not(#addLink)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="title">${node.logo}</div>
    <div class="link">${deleteUrl(node.url)}</div>
    <div class="close">
      <svg class="icon">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
  </li>`).insertBefore($addLink)

  $li.on('click', () => {
    window.open(node.url)
  })
  $li.on('click', '.close', (e) => {
    e.stopPropagation() // 阻止冒泡
    hashMap.splice(index, 1)
    render()
  })
  });
}
render()

$("#addLink").on('click', () => {
  let url = window.prompt('请输入你要添加的网址')
  if(url.indexOf('http') !== 0){
    url = 'https://' + url;
  }
  hashMap.push({
    logo: deleteUrl(url)[0].toUpperCase(),
    url: url
  })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
  const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})