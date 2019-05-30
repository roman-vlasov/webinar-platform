/**
 * Разрешить/запретить скроллить страницу.
 * @param {boolean} scrollState - Нужное состояние скроллинга.
 * @param {string} noScrollClassName - Класс, выключающий скроллинг тега body.
 */
function switchBodyNoScroll(scrollState, noScrollClassName) {
    const el = document.getElementsByTagName('body')[0]
    if (!scrollState) {
        if (el.classList)
            el.classList.add(noScrollClassName)
        else
            el.className += ' ' + noScrollClassName
    } else {
        if (el.classList)
            el.classList.remove(noScrollClassName)
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + noScrollClassName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
}

export { switchBodyNoScroll }