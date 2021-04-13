// write your code here
document.addEventListener('DOMContentLoaded', event => {

    const ramenCollection = document.querySelector('#ramen-menu')
    const updateRamenInfo = document.querySelector('form#ramen-rating')

    function showAllRamen() {
        // console.log('Ready for ramen')
        fetch('http://localhost:3000/ramens')
            .then(resp => resp.json())
            .then(ramenArr => {
                // console.log(ramenArr[0])
                ramenArr.forEach(showOneRamen)
                detailedRamenHelper(ramenArr[0])
            })
    }
    showAllRamen()

    function showOneRamen(ramenObj) {
        // debugger
        // const outerDiv = document.querySelector('#ramen-menu')
        const outerDiv = document.createElement('div')
        // console.log(outerDiv)
        outerDiv.classList.add('img')
        outerDiv.dataset.id = ramenObj.id

        outerDiv.innerHTML =
            `
        <img src="${ramenObj.image}">
        `
        ramenCollection.append(outerDiv)
    }

    ramenCollection.addEventListener('click', event => {
        // console.log(event.target) 
        if (event.target.matches('img')) selectedRamen(event.target)
    })

    function selectedRamen(ramenElement) {

        const ramenParentDiv = ramenElement.closest('.img')

        fetch(`http://localhost:3000/ramens/${ramenParentDiv.dataset.id}`)
            .then(resp => resp.json())
            .then(ramen => {
                detailedRamenHelper(ramen)
            })
    }

    function detailedRamenHelper(aSingleRamen) {
        const ramenDiv = document.querySelector('div#ramen-detail')

        const ramenImage = ramenDiv.querySelector('.detail-image')
        ramenImage.src = aSingleRamen.image
        ramenImage.alt = aSingleRamen.name

        const ramenName = ramenDiv.querySelector('.name')
        ramenName.textContent = aSingleRamen.name

        const ramenRest = ramenDiv.querySelector('.restaurant')
        ramenRest.textContent = aSingleRamen.restaurant

        const currRating = document.querySelector('#rating')
        currRating.value = aSingleRamen.rating

        const currComment = document.querySelector('#comment')
        currComment.value = aSingleRamen.comment

        updateRamenInfo.dataset.id = aSingleRamen.id
    }


    updateRamenInfo.addEventListener('submit', event => {
        event.preventDefault()
        // console.log(event.target)

        const rating = event.target.rating.value
        const comment = event.target.comment.value

        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ rating, comment })
        })
            .then(resp => resp.json())
    })
})
