// @ts-ignore
import Canvas from "react-responsive-canvas";

import { createRef, useEffect, useRef } from "react";
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

const changeGardient = (e: React.MouseEvent<HTMLDivElement>) => {
  var x = e.clientX - e.currentTarget.offsetLeft;
  var y = e.clientY - e.currentTarget.offsetTop;

  var element = e.currentTarget;
  var background = element.querySelector(".background") as HTMLDivElement;
  background.style.background = `radial-gradient(circle farthest-side  at ${x}px ${y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))`;
};
const removeGradient = (e: React.MouseEvent<HTMLDivElement>) => {
  var element = e.currentTarget;
  var background = element.querySelector(".background") as HTMLDivElement;
  background.style.background = "transparent";
};

const HeroView = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    var bodyRect = document.body.getBoundingClientRect();
    var buttonRect = buttonRef.current!.getBoundingClientRect();
    var offsetX = buttonRect.left - bodyRect.left;
    var offsetY = buttonRect.top - bodyRect.top;

    var targetX = window.innerWidth / 2;
    var targetY = 450;

    var grad = ctx.createLinearGradient(
      offsetX + buttonRect.width + 14,
      offsetY + buttonRect.height,
      (offsetX + buttonRect.width + 12) * 2,
      targetY
    );
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(1, "white");

    ctx.strokeStyle = grad;

    ctx.beginPath();

    ctx.arc(targetX, targetY, 4, 0, 2 * Math.PI);

    ctx.lineWidth = 1;
    ctx.moveTo(offsetX + buttonRect.width + 12, offsetY + buttonRect.height / 2);
    ctx.lineTo((offsetX + buttonRect.width + 12) * 1.3, targetY);
    // ctx.strokeStyle = "white";
    ctx.lineTo(targetX - 5, targetY);

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasElement.current;
    // canvas!.width = parentRef.current?.offsetWidth!
    if (canvas) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas!.getContext("2d")!;

      draw(context);
    }
  }, [draw]);

  const changeCanvas = () => {
    var canvas = canvasElement.current;
    var parent = parentRef.current;
    const context = canvas!.getContext("2d")!;

    if (canvas && parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw(context);
    }
  };

  const handleResize = () => {
    changeCanvas();
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  });

  // сделал для того чтобы нормально ставились градиенты к центру
  const DataElement: React.FC<{ element: DataElem; index: number }> = ({ element, index }) => {
    return (
      <div
        className={`info-grid-element info-grid-element${index}`}
        onMouseMove={(e) => changeGardient(e)}
        key={index}
        onMouseLeave={(e) => removeGradient(e)}>
        <div className='background'></div>
        <span>{element.header}</span>
        <h1>{element.body}</h1>
        <span>{element.footer}</span>
      </div>
    );
  };

  return (
    <div id='hero-view' ref={parentRef}>
      {/* <Canvas
        canvasRef={(el: HTMLCanvasElement) => (canvasElement = el)}
        onResize={draw}
        id='button-to-rocket-canvas'
      /> */}
      <div
        className='main-background'
        style={{ backgroundImage: "url(/images/background.png)" }}
        draggable={false}></div>
      <div />
      <div className='content'>
        <div id='hero'>
          <div className='title'>
            {/* M -258 -57.5 L 258 -57.5 L 258 -6.518096923828125 C 240.209716796875 7.908935546875 226.4842529296875 30.53997802734375 219.69342041015625 57.5 L -258 57.5 L -258 -57.5 Z  */}
            <h1>ПУТЕШЕСТВИЕ</h1>
            <span>на красную планету</span>
          </div>
          <div
            className='planet-background'
            style={{ backgroundImage: "url(/images/planet.png)" }}
            draggable={false}></div>
          <canvas id='button-to-rocket-canvas' ref={canvasElement}></canvas>

          <button ref={buttonRef}>Начать путешествие</button>
          {/* у button будет after со стрелкой, желательно чтобы она привязывалась к точке (к ракете) */}
        </div>
        <div id='info-grid'>
          {/* {data.map((element, index) => {
            return (
              <div
                className={`info-grid-element info-grid-element${index + 1}`}
                onMouseMove={(e) => changeGardient(e)}
                key={index}
                onMouseLeave={(e) => removeGradient(e)}>
                <div className='background'></div>
                <span>{element.header}</span>
                <h1>{element.body}</h1>
                <span>{element.footer}</span>
              </div>
            );
          })} */}
          <DataElement element={data[0]} index={1} />
          <DataElement element={data[1]} index={2} />
          <DataElement element={data[2]} index={4} />
          <DataElement element={data[3]} index={3} />
        </div>
      </div>
    </div>
  );
};

export default HeroView;
