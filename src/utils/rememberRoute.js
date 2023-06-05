//@FileDescription: 面包屑的一些函数
//@Author: 项黎明
export function updateTitle(title) {
    var urlHist = JSON.parse(localStorage.getItem('UrlHist'))
    if (urlHist && urlHist.length) {
        urlHist[urlHist.length - 1].title = title
        localStorage.setItem('UrlHist', JSON.stringify(urlHist))
    }
    console.log('改变标题')
    console.log(urlHist)
}

export function rememberHist(to) {
    var urlHist = JSON.parse(localStorage.getItem('UrlHist'))
    var i
    if (to.path == '/login') {
        return
    }
    if (to.path == '/add_course') {
        for (i = urlHist.length - 1; i >= 0; i--) {
            if (urlHist[i].path == '/course') {
                urlHist.push({ path: to.path, title: to.meta.title })
                break
            } else {
                urlHist.pop()
            }
        }
    } else if (to.matched[1].path == '/course/:course_id') {
        for (i = urlHist.length - 1; i >= 0; i--) {
            if (urlHist[i].path == '/course' || urlHist[i].path == '/subscriptions') {
                urlHist.push({ path: to.path, title: to.meta.title })
                break
            } else {
                urlHist.pop()
            }
        }
    } else if (to.matched[1].path == '/paper/:paper_id') {
        for (i = urlHist.length - 1; i >= 0; i--) {
            if (urlHist[i].path.includes('/course/')) {
                urlHist.push({ path: to.path, title: to.meta.title })
                break
            } else {
                urlHist.pop()
            }
        }
    } else {
        urlHist = [{ path: to.path, title: to.meta.title }]
    }
    if (!urlHist.length) {
        urlHist = [{ path: to.path, title: to.meta.title }]
    }
    localStorage.setItem('UrlHist', JSON.stringify(urlHist))
    console.log(urlHist)
}
