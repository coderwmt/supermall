//由于refresh频繁使用，使用防抖动函数debounce
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}
