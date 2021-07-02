import React, { useState, useEffect } from 'react'

import './index.less'

import One from './One'
import Two from './Two'
import Three from './Three'
import Four from './Four'
import Five from './Five'


export default function index() {
    let dom, startY, endY
    const [currentIndex, setCurrentIndex] = useState(1)
   
    useEffect(() => {
        dom = document.querySelector('.current')
    }, [currentIndex])

    const handleTouchStart = (e) => {
        startY = e.targetTouches[0].pageY
    }

    const handleTouchMove = (e) => {
        endY = e.targetTouches[0].pageY
        console.log(startY - endY);
        if ((startY - endY) > 100 && currentIndex !== 5) {
            dom.style.transform = `translateY(-${startY - endY}px)`;
        } else if ((startY - endY) < 100 && currentIndex !== 1) {
            dom.style.transform = `translateY(${endY - startY}px)`;
        }else{
            dom.style.transform = `translateY(0)`;
        }
    }

    const handleTouchEnd = (e) => {
        dom.style.transition = `transform 1s ease`
        if ((startY - endY) > 100 && currentIndex !== 5) {
            dom.style.transform = `translateY(-1000px)`;
            setTimeout(() => {

                setCurrentIndex(currentIndex + 1)
                dom.style.transform = `translateY(0)`
                dom.style.transition = ``

            }, 500)

        } else if ((startY - endY) < 100 && currentIndex !== 1) {
            dom.style.transform = `translateY(1000px)`;
            setTimeout(() => {

                setCurrentIndex(currentIndex - 1)
                dom.style.transform = `translateY(0)`
                dom.style.transition = ``
            }, 500)

        } else {
            dom.style.transform = `translateY(0)`;
        }

    }

    return (
        <div className="content" >
            <div className="content-box" onTouchStart={(e) => handleTouchStart(e)} onTouchMove={(e) => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                <section className={`part part1 ${currentIndex == 1 ? 'current' : ''}`} >
                    <One currentIndex={currentIndex} />
                </section>
                <section className={`part part2 ${currentIndex == 2 ? 'current' : ''}`} >
                    <Two currentIndex={currentIndex} />
                </section>
                <section className={`part part3 ${currentIndex == 3 ? 'current' : ''}`} >
                    <Three currentIndex={currentIndex} />
                </section>
                <section className={`part part4 ${currentIndex == 4 ? 'current' : ''}`} >
                    <Four currentIndex={currentIndex} />
                </section>
                <section className={`part part5 ${currentIndex == 5 ? 'current' : ''}`} >
                    <Five currentIndex={currentIndex} />
                </section>

            </div>

        </div>
    )
}
