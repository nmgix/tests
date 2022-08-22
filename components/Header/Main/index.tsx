import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { ApodImage } from "../../../types/apod";
import Button from "../../Common/Button";
import classes from "./styles.module.scss";

type HeaderMainProps = {
  img: ApodImage | undefined;
};

const HeaderMain: React.FC<HeaderMainProps> = memo(({ img }) => {
  const router = useRouter();

  return (
    <header className={classes.headerMain}>
      <div className={classes.adopWrapper}>
        {img !== undefined ? (
          img.media_type && img.media_type === "video" ? (
            <iframe
              src={`${img.url.replace(
                "?rel=0",
                ""
              )}?autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1&showinfo=0&playlist=${img.url
                .match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)![0]
                .replace("youtube.com/embed/", "")}`}
              width='100%'
              height='100%'
              frameBorder='0'></iframe>
          ) : (
            <Image
              loader={() => img.url}
              src={img!.url}
              objectFit='cover'
              draggable={false}
              layout='fill'
              unoptimized
              priority
            />
          )
        ) : (
          <></>
        )}
      </div>

      <div className={classes.title}>
        <h2>ARMAGGEDON V2</h2>
        <span>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</span>
      </div>

      <ul className={classes.menu}>
        <li>
          <Button asLink color='#FFF' active={router.pathname === "/"}>
            <Link href={"/"}>Астероиды</Link>
          </Button>
        </li>
        <li>
          <Button asLink color='#FFF' active={router.pathname === "/order"}>
            <Link href={"/order"}>Заказ</Link>
          </Button>
        </li>
      </ul>
    </header>
  );
});

export default HeaderMain;
