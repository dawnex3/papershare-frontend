//@FileDescription: 监听LocalStorage变化
//@Author: 项黎明
function dispatchEventStroage() {
    const signSetItem = localStorage.setItem
    localStorage.setItem = function (key, val) {
        let setEvent = new Event('setItemEvent')
        setEvent.key = key
        setEvent.newValue = val
        window.dispatchEvent(setEvent)
        signSetItem.apply(this, arguments)
    }
}

export default dispatchEventStroage
