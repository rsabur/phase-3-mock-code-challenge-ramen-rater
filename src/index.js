// write your code here

const ramenMenuCollection = document.querySelector('#ramen-menu')
const ramenForm = document.querySelector('#ramen-rating')

function showRamenMenu() {
    fetch('http://localhost:3000/ramens')
        .then(resp => resp.json())
        .then(ramenArr => {
            // console.log(ramenArr)
            ramenArr.forEach(ramenObj => {
                showEachRamen(ramenObj)
            })
        })
}

function showEachRamen(ramenObj) {
    ramenMenuItems = document.createElement('div')
    ramenMenuItems.classList.add('ramen-item')
    ramenMenuItems.dataset.id = ramenObj.id
    // console.log(ramenObj.name)

    ramenMenuItems.innerHTML =
        `<img src="${ramenObj.image}"alt="${ramenObj.name}">`

    // console.log(ramenCollection)
    ramenMenuCollection.append(ramenMenuItems)
}

function ramenDetailsHelper(ramenObj) {
    const detailImage = document.querySelector('img.detail-image')
    detailImage.src = ramenObj.image
    detailImage.alt = ramenObj.name

    const detailName = document.querySelector('h2.name')
    detailName.textContent = ramenObj.name

    const detailRest = document.querySelector('h3.restaurant')
    detailRest.textContent = ramenObj.restaurant

    const currRating = document.querySelector('#rating')
    currRating.value = ramenObj.rating

    const currComment = document.querySelector('#comment')
    currComment.value = ramenObj.comment

    ramenForm.dataset.id = ramenObj.id
}


function showRamenDetails() {
    ramenMenuCollection.addEventListener('click', event => {
        const ramenParent = event.target.closest('div')


        fetch(`http://localhost:3000/ramens/${ramenParent.dataset.id}`)
            .then(resp => resp.json())
            .then(ramenObj => {
                ramenDetailsHelper(ramenObj)
            })
    })
}



ramenForm.addEventListener('submit', event => {
    event.preventDefault()

    const rating = event.target.rating.value
    const comment = event.target.comment.value
    
    fetch(`http:localhost:3000/ramens/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({rating, comment})
    })
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data)
        // })
})



/****** APP INIT ******/
showRamenMenu()
showRamenDetails()