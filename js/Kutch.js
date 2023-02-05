
   


//  script for nav bar 
        burger = document.querySelector('.burger')
        navbar = document.querySelector('.navbar')
        navlist = document.querySelector('.nav-list')
        rightnav = document.querySelector('.right-nav')

        burger.addEventListener('click', () => {
            rightnav.classList.toggle('v-class-resp')
            navlist.classList.toggle('v-class-resp')
            navbar.classList.toggle('h-nav-resp')


        }) 

    //  script for slide bar

        let slide = document.querySelectorAll('.slide');
        var current = 0;

        function cls() {
            for (let i = 0; i < slide.length; i++) {
                slide[i].style.display = 'none';
            }
        }

        function next() {
            cls();
            if (current === slide.length - 1) current = -1;
            current++;

            slide[current].style.display = 'block';
            slide[current].style.opacity = 0.4;

            var x = 0.4;
            var intX = setInterval(function () {
                x += 0.1;
                slide[current].style.opacity = x;
                if (x >= 1) {
                    clearInterval(intX);
                    x = 0.4;
                }
            }, 100);

        }

        function prev() {
            cls();
            if (current === 0) current = slide.length;
            current--;

            slide[current].style.display = 'block';
            slide[current].style.opacity = 0.4;

            var x = 0.4;
            var intX = setInterval(function () {
                x += 0.1;
                slide[current].style.opacity = x;
                if (x >= 1) {
                    clearInterval(intX);
                    x = 0.4;
                }
            }, 100);

        }

        function start() {
            cls();
            slide[current].style.display = 'block';
        }
        start();
    
        //CODE FOR PICTURE_SLIDER


        const carousel = document.querySelector(".carousel"),
            firstImg = carousel.querySelectorAll("img")[0];
        arrowIcons = document.querySelectorAll(".wapper i");

        //script for arrow icons 
        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth + 14; //get first img width & add 14margin value 
                //if check icon is left reduce width value from the carouselscroll left else add to eat
                carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth
                setTimeout(() => showHideIcons(), 60) //call hidden icon in 60ms
            });
        });

        //Script for auto slider for image

        const autoSlide = () => {

            if (carousel.scrollLeft == (carousel.scrolWidth - carousel.clientWidth)) return;
            // get different value  that needs to add and reduce carousel left to take middel img center
            positionDiff = Math.abs(positionDiff);
            let firstImgWidth = firstImg.clientWidth + 14;
            let valDifference = firstImgWidth - positionDiff
            if (carousel.scrollLeft > prevScrolleft) {
                //logic for this line 
                // return carousel.scrollLeft += positionDiff > firstImgWidth /3 ? valDifference : - positionDiff // scroling to the right 

                //  if you didn't understand ternary if else 
                // you can write like this too. Both do same

                //  if(positionDiff > firstImgWidth / 3)
                //   {
                //      carousel.scrollLeft += valDifference; 
                //     }
                //      else {
                //         carousel.scrollLeft positionDiff ;
                //     }


                return carousel.scrollLeft += positionDiff > firstImgWidth / 4 ? valDifference : - positionDiff // scroling to the right 
            }
            carousel.scrollLeft -= positionDiff > firstImgWidth / 4 ? valDifference : - positionDiff // scroling to left


        }



        // //  if you didn't understand ternary if else 
        // // you can write like this too. Both do same

        // //  if(positionDiff > firstImgWidth / 3)
        // //   {
        // //      carousel.scrollLeft += valDifference; 
        // //     }
        // //      else {
        // //         carousel.scrollLeft positionDiff ;
        // //     }



        const showHideIcons = () => {
            //showing to the hidden icon accoding to carousl scroll left value
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //get max scroll bar width 
            arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"
            arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block"

        }

        let isDragStart = false, isDragging = false, prevPageX, prevScrolleft, positionDiff;
        const dragStart = (e) => {
            // update the globel variables value on mouse down event    
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrolleft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            // scroll images /carousel to left accoding to mouse pointer 
            if (!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging")
            //scrollLeft return the nunber of pixel an element content scroll horizontel
            // pageX return the horizontel cooridinate of mouse while
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrolleft - positionDiff;
            showHideIcons()
        }

        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging")
            if (isDragging) return;
            isDragging = false;
            autoSlide();

        }

        carousel.addEventListener("mousedown", dragStart)
        carousel.addEventListener("touchstart", dragStart)


        carousel.addEventListener("mousemove", dragging)
        carousel.addEventListener("touchmove", dragging)


        carousel.addEventListener("mouseup", dragStop)
        carousel.addEventListener("mouseleave", dragStop)
        carousel.addEventListener("touchend", dragStop)