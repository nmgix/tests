// @ts-ignore
import Canvas from "react-responsive-canvas";

import { createRef, useEffect } from "react";
import "./_heroview.scss";

type DataElem = {
  header: string;
  body: number | string | JSX.Element;
  footer: string;
};

const data: DataElem[] = [
  {
    header: "мы",
    body: 1,
    footer: "на рынке",
  },
  {
    header: "гарантируем",
    body: 50 + "%",
    footer: "безопасность",
  },
  {
    header: "календарик за",
    body: (
      <>
        2001<span className='helper-text'>г</span>
      </>
    ),
    footer: "в подарок",
  },
  {
    header: "путешествие",
    body: 597,
    footer: "дней",
  },
];

const parentRef = createRef<HTMLDivElement>();
const buttonRef = createRef<HTMLButtonElement>();
var canvasElement: HTMLCanvasElement;

const changeGardient = (e: React.MouseEvent<HTMLDivElement>) => {
  var x = e.clientX - e.currentTarget.offsetLeft;
  var y = e.clientY - e.currentTarget.offsetTop;

  var element = e.currentTarget;
  var background = element.querySelector(".background") as HTMLDivElement;
  background.style.background = `radial-gradient(circle farthest-side  at ${x}px ${y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))`;

  // element.style.border = " 1px solid transparent";
  // // @ts-ignore
  // element.style = `-webkit-border-image: -webkit-radial-gradient(circle farthest-side  at ${x}px ${y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)); border-image: radial-gradient(circle farthest-side  at ${x}px ${y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)); -moz-border-image: -moz-radial-gradient(circle farthest-side  at ${x}px ${y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)); border-image-slice: 1;`;
};
const removeGradient = (e: React.MouseEvent<HTMLDivElement>) => {
  var element = e.currentTarget;
  var background = element.querySelector(".background") as HTMLDivElement;
  background.style.background = "transparent";

  // element.style.borderImage = "none";
  // element.style.border = "1px solid rgba(255,255,255,0.05)";
};

const HeroView = () => {
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.style.width = "100%";
  //     canvasRef.current.style.height = "100%";
  //     canvasRef.current.width = canvasRef.current.offsetWidth;
  //     canvasRef.current.height = canvasRef.current.offsetHeight;
  //   }
  //   console.log(canvasRef.current);
  // }, [canvasRef.current, window.innerWidth, window.innerHeight]);
  var ctx: CanvasRenderingContext2D;

  const draw = () => {
    if (canvasElement) {
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
  };

  useEffect(() => {
    if (canvasElement) {
      ctx = canvasElement.getContext("2d")!;
      draw();
    }
  }, [canvasElement]);

  return (
    <div id='hero-view' ref={parentRef}>
      {/* <canvas id='button-to-rocket-canvas' ref={canvasRef}></canvas> */}
      <Canvas
        canvasRef={(el: HTMLCanvasElement) => (canvasElement = el)}
        onResize={draw}
        id='button-to-rocket-canvas'
      />
      <div className='background' style={{ backgroundImage: "url(/images/background.png)" }} draggable={false} />
      <div className='content'>
        <div id='hero'>
          <div className='title'>
            {/* M -258 -57.5 L 258 -57.5 L 258 -6.518096923828125 C 240.209716796875 7.908935546875 226.4842529296875 30.53997802734375 219.69342041015625 57.5 L -258 57.5 L -258 -57.5 Z  */}
            <h1
              style={{
                clipPath: `polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 75% 100%, 75% 100%, 79% 100%, 93% 80%, 97% 25%, 100% 0%)`,
              }}>
              ПУТЕШЕСТВИЕ
            </h1>
            <span>на красную планету</span>
          </div>
          <button ref={buttonRef}>Начать путешествие</button>
          {/* у button будет after со стрелкой, желательно чтобы она привязывалась к точке (к ракете) */}
        </div>
        <div id='info-grid'>
          {data.map((element, index) => {
            return (
              <div
                className='info-grid-element'
                onMouseMove={(e) => changeGardient(e)}
                key={index}
                onMouseLeave={(e) => removeGradient(e)}>
                <div className='background'></div>
                <span>{element.header}</span>
                <h1>{element.body}</h1>
                <span>{element.footer}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroView;
