import classNames from "classnames";
import Image from "next/image";
import { FlightData, Route } from "../../../types/FlightData";
import { Button } from "../../Usual/Button";
import styles from "./FlightContent.module.scss";
import { useState } from "react";

const FlightContent: React.FC<FlightData> = (flightData) => {
  const { carrier, refundable, route, otherTime } = flightData;

  const generateRouteDate = (route: Route) => {
    route.from.time = new Date(route.from.time);
    route.to.time = new Date(route.to.time);
    return route;
  };

  const [selectedTime, setSelectedTime] = useState<Route>(() => generateRouteDate(route));

  const changeSelectedTime = (route: Route) => {
    setSelectedTime(generateRouteDate(route));
  };

  return (
    <div className={classNames(styles.flightContent)}>
      <div className={classNames(styles.carrier)}>
        {!refundable && <span className={classNames(styles.unrefundable)}>Невозвратный</span>}
        <div className={classNames(styles.carrierInfo)}>
          <Image
            src={"/static/carrier-icons/" + carrier.replace(" ", "_") + ".svg"}
            alt={carrier + " logo"}
            width={39}
            height={39}
            draggable={false}
          />
          <h3>{carrier}</h3>
        </div>
      </div>
      <div className={classNames(styles.flightData)}>
        <div className={classNames(styles.visualBlockWrapper)}>
          <div className={classNames(styles.visualBlock)}>
            <div className={classNames(styles.destinationInfo)}>
              <h3>{selectedTime.from.time.toLocaleTimeString().split(":").slice(0, 2).join(":")}</h3>
              <div>
                <span>{selectedTime.from.city}</span>
                <span>{selectedTime.from.time.toLocaleDateString()}</span>
              </div>
            </div>
            <div className={classNames(styles.visualTravel)}>
              <div>
                <div className={classNames(styles.visualTravelDot)}>
                  {selectedTime.from.airportCode}
                  <div />
                </div>
                <div className={classNames(styles.visualTravelDot)}>
                  {selectedTime.to.airportCode}
                  <div />
                </div>
              </div>
              <hr />
              <span className={classNames(styles.visualTravelTravelTime)}>
                В пути{" "}
                {Math.abs(
                  Math.floor(((selectedTime.to.time.getTime() - selectedTime.from.time.getTime()) % 86400000) / 3600000)
                )}{" "}
                ч{" "}
                {Math.abs(
                  Math.floor(
                    (((selectedTime.to.time.getTime() - selectedTime.from.time.getTime()) % 86400000) % 3600000) / 60000
                  )
                )}{" "}
                мин
              </span>
            </div>
            <div className={classNames(styles.destinationInfo)}>
              <h3>{selectedTime.to.time.toLocaleTimeString().split(":").slice(0, 2).join(":")}</h3>
              <div>
                <span>{selectedTime.to.city}</span>
                <span>{selectedTime.to.time.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className={classNames(styles.luggageWrapper)}>
            <div className={classNames(styles.luggage)}>
              <Image src={"/static/icons/bag.svg"} alt={"bag logo"} width={20} height={20} draggable={false} />
              <Image src={"/static/icons/luggage.svg"} alt={"bar logo"} width={20} height={37.25} draggable={false} />
            </div>
          </div>
        </div>
        {otherTime && (
          <div className={classNames(styles.otherTimeBlock)}>
            <ul>
              {[route, ...otherTime].map((ot) => (
                <li>
                  <Button
                    onClick={() => changeSelectedTime(ot)}
                    classnames={ot.uuid === selectedTime.uuid ? [styles.button, styles.buttonActive] : [styles.button]}>
                    <span className={classNames(styles.buttonHightlightedText)}>
                      {new Date(ot.from.time).toLocaleTimeString().split(":").slice(0, 2).join(":") + " - "}
                    </span>
                    <span className={classNames(styles.buttonSecondaryText)}>
                      {new Date(ot.to.time).toLocaleTimeString().split(":").slice(0, 2).join(":")}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightContent;
