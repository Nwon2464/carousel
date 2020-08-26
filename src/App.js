import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import "./styles.css";

function Slide({ slide, offset, width }) {
  const active = offset === 0 ? true : null;
  // const ref = useTilt(active);
  // console.log(width);
  console.log("offset:", offset);
  return (
    <div
      // ref={styleRef}
      className="slide"
      data-active={active}
      style={{
        // transform:"translateX(100%)"/
        "--offset": offset,
        // backgroundImage: `url('${slide.image}')`,

        transform: `translateX(-20% * ${offset} )`
        // "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
      {slide.title}..{offset}
      {/* <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div> */}
    </div>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  const styleRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [slides, setSlides] = useState({});
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    //   const sliders = styleRef.current;

    const sliders = document.body.querySelector(".slides");
    const next = document.body.querySelector(".next-btn");

    console.log(sliders.firstElementChild);
    // console.log(next);
    // const prev = document.body.querySelector(".button1");
    next.addEventListener("click", () => {
      let i = 0;
      while (i < 5) {
        sliders.style.transform = `translateX(calc(-100% * ${i++}))`;
      }
    });
    // sliders.addEventListener("transitionend", () => {
    //   console.log("A");
    //   sliders.appendChild(sliders.firstElementChild);
    //   sliders.style.transition = "none";
    //   sliders.style.transform = `translateX(0%)`;
    //   sliders.style.transition = "all 0.3s";
    //   //
    // });
  }, []);
  // useEffect(() => {
  //   console.log(styleRef.current.firstElementChild);
  //   const handler = () => {
  //     if (state.slideIndex === 0) {
  //       styleRef.current.prepend(styleRef.current.lastElementChild);
  //     } else if (state.slideIndex === -2) {
  //       styleRef.current.appendChild(styleRef.current.firstElementChild);
  //     }
  //     styleRef.current.appendChild(styleRef.current.firstElementChild);
  //     styleRef.current.style.transition = "none";
  //     styleRef.current.style.transform = "translate(0)";
  //     styleRef.current.style.transition = "all 0.5s";
  //   };
  //   styleRef.current.addEventListener("transitionend", handler);
  //   // setWidth([...styleRef.current.children][1].getBoundingClientRect().width);

  //   // setSlides([...styleRef.current.children]);
  //   // setSlideWidth(
  //   //   [...styleRef.current.children][0].getBoundingClientRect().width
  //   // );
  //   // console.log(styleRef.current.children);
  //   // const positionSlides = (slides) => {
  //   //   for (let i = 0; i < slides.length; i++) {
  //   //     slides[i].style.left = slideWidth * i + "px";
  //   //   }
  //   // };
  //   // positionSlides(slides);
  // }, []);
  // console.log(state.slideIndex);
  return (
    <>
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>
      <button className="next-btn" onClick={() => dispatch({ type: "NEXT" })}>
        ›
      </button>

      <div ref={styleRef} className="slides">
        {/* {datas.map((slide, i) => {
        return (
          <Slide
            width={width}
            slide={slide}
            key={i}
            offset={state.slideIndex - i}
            className="slide"
          >
            {slide.title}
          </Slide>
        );
      })} */}

        {datas.map((slide, i) => {
          console.log(state.slideIndex, i);
          return (
            <div
              key={i}
              className="slide"
              data-active={state.slideIndex - i === 0 ? true : null}
              style={{
                // "--offset": state.slideIndex - i,
                backgroundImage: `url('${slide.image}')`,
                transform: `translateX(calc(-100% * ${state.slideIndex - i}))`

                // transform: `translateX(-20% * ${state.slideIndex - i} )`
              }}
            >
              {slide.title}..{state.slideIndex - i}
            </div>
          );
        })}

        {/* <h1>Hello World {state.slideIndex}</h1> */}

        {/* <ul ref={styleRef} className="slides">
        {datas.map((el, i) => {
          return (
            <li style={{ left: `${slideWidth * i}px` }} className={`slide`}>
              <img src={el.image} alt="a" />
              <div>{el.title}</div>
            </li>
          );
        })} */}

        {/* {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })} */}
      </div>
    </>
  );
}

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % datas.length
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? datas.length - 1 : state.slideIndex - 1
    };
  }
};

const datas = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image:
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image:
      "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  }
];
