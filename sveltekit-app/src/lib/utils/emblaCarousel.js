
export function useEmblaCarousel() {
  const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {

    const togglePrevNextBtnsState = () => {
      if (!emblaApi || !prevBtn || !nextBtn) return
      emblaApi.canScrollPrev()
        ? prevBtn.removeAttribute('disabled')
        : prevBtn.setAttribute('disabled', 'disabled')
      emblaApi.canScrollNext()
        ? nextBtn.removeAttribute('disabled')
        : nextBtn.setAttribute('disabled', 'disabled')
    }

    emblaApi
      .on('init', togglePrevNextBtnsState)
      .on('select', togglePrevNextBtnsState)
      .on('reInit', togglePrevNextBtnsState)

    return () => {
      prevBtn.removeAttribute('disabled')
      nextBtn.removeAttribute('disabled')
    }
  }

  const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => emblaApi.scrollPrev()
    const scrollNext = () => emblaApi.scrollNext()

    prevBtn.addEventListener('click', scrollPrev)
    nextBtn.addEventListener('click', scrollNext)

    const cleanupToggle = addTogglePrevNextBtnsActive(emblaApi, prevBtn, nextBtn)

    return () => {
      cleanupToggle()
      prevBtn.removeEventListener('click', scrollPrev)
      nextBtn.removeEventListener('click', scrollNext)
    }
  }

  const addDotBtnsAndClickHandlers = (emblaApi, dotsNode, selectedIndex) => {

    let dotNodes = []

    const renderDots = () => {
      dotsNode.innerHTML = emblaApi.scrollSnapList()
        .map(() => '<button class="embla__dot" type="button"></button>')
        .join('')

      dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener('click', () => emblaApi.scrollTo(index, true))
      })
    }

    // const toggleDotBtnsActive = () => {
    //   const previous = emblaApi.previousScrollSnap()
    //   const selected = emblaApi.selectedScrollSnap()

    //   selectedIndex.value = selected

    //   if (dotNodes[previous]) dotNodes[previous].classList.remove('embla__dot--selected')
    //   if (dotNodes[selected]) dotNodes[selected].classList.add('embla__dot--selected')
    // }

    emblaApi
      .on('init', renderDots)
      .on('reInit', renderDots)
  }

  return {
    addPrevNextBtnsClickHandlers,
    addDotBtnsAndClickHandlers,
  }
}
