export default function (proto) {

    let searchString = document.location.search

    let sary = searchString.substring(1).split('&')
    let locationObj={}
    for(let si=0,sl=sary.length; si<sl; si++){
        let subary = sary[si].split('=')
        locationObj[subary[0]] = subary[1]
    }

    return locationObj[proto]

}