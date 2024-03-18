
const inputPermis = ['0','1','2','3','4','5','6','7','8','9','Backspace']

const Elements = document.querySelectorAll(".element")
const btnCalc = document.querySelector('.img')

empecherLettre(Elements[0].children[1],2)
empecherLettre(Elements[1].children[1],2)
empecherLettre(Elements[2].children[1],4)


function animeBut () {
    btnCalc.classList.add("shake-vertical")
    setTimeout(()=>{
        btnCalc.classList.remove("shake-vertical")
    }, 500)
}


function empecherLettre(element, max) {
    element.addEventListener('keydown', (e)=> {
        if(!inputPermis.includes(e.key) || (element.value.length >= max && e.key != "Backspace")){
            e.preventDefault()
        }
    })
}

const codeMois = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function dataValide(jj, mm, yy) {

    const currentDate = new Date()

    if(jj > 31 || mm > 12 || yy < 0 ) {
        return -1 // erreur de format non valide
    }

    jour = jj
    mois = codeMois[mm-1]
    annee = yy
    const date = new Date(`${mois} ${jj}, ${annee}`)

    if (date.getDate() == jour && date.getMonth() == mm-1 && date.getFullYear() == annee) {
        if (currentDate.getTime() >= date.getTime()) {
            return date
        } else {
            return -2 // erreur de date futur
        }
    } else {
        return -3 // erreur de février
    }
}

btnCalc.addEventListener('click', ()=>{
    let valide = true
    jj = Elements[0].children[1].value
    mm = Elements[1].children[1].value
    yyyy = Elements[2].children[1].value

    if (jj == "") {
        Elements[0].children[2].classList.remove("hidden")
        valide = false
        animeBut()
    } else {
        Elements[0].children[2].classList.add("hidden")
    }

    if (mm == "") {
        Elements[1].children[2].classList.remove("hidden")
        valide = false
        animeBut()
    } else {
        Elements[1].children[2].classList.add("hidden")
    }

    if (yyyy == "") {
        Elements[2].children[2].classList.remove("hidden")
        valide = false
        animeBut()
    } else {
        Elements[2].children[2].classList.add("hidden")
    }

    if (valide) {
        const currentDate = new Date()
        const date = dataValide(jj, mm, yyyy)
        if (typeof date != "number") {
            const age = new Date(currentDate.getTime()- date.getTime())
            let day = age.getDate()
            let month = age.getMonth()
            let year = age.getFullYear() - 1970
            if (date.getDate() == currentDate.getDate() && date.getMonth() == currentDate.getMonth()) {
                day = 0
                month = 0
            }

            document.querySelector('.day').innerHTML = `${day}`
            document.querySelector('.month').innerHTML = `${month}`
            document.querySelector('.year').innerHTML = `${year}`
        } else {
            animeBut()
            reset()
            if(date == -1) {
                Elements[0].children[2].innerHTML = 'Invalid Date'
                Elements[1].children[2].innerHTML = 'Invalid Date'
                Elements[2].children[2].innerHTML = 'Invalid Date'
                Elements[0].children[2].classList.remove("hidden")
                Elements[1].children[2].classList.remove("hidden")
                Elements[2].children[2].classList.remove("hidden")
            }
            if(date == -2) {
                Elements[2].children[2].innerHTML = 'Must be in the past'
                Elements[2].children[2].classList.remove("hidden")
            }
            if (date == -3) {
                Elements[0].children[2].innerHTML = 'Must be a valid date'
                Elements[0].children[2].classList.remove("hidden")
            }
        }
    } else {
        animeBut()
        reset()
    }
})

function reset() {
    document.querySelector('.day').innerHTML = "--"
    document.querySelector('.month').innerHTML = "--"
    document.querySelector('.year').innerHTML = "--"
}

