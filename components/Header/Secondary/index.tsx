import React, { Fragment } from "react";
import { Metrics, MetricsKey } from "../../../helpers/metrics";
import Button from "../../Common/Button";
import { useAsteroidContext } from "../../Common/Context";
import HeaderWrapper from "../HeaderWrapper";
import classes from "./styles.module.scss";

type HeaderSecondaryProps = {
  withIcon?: JSX.Element;
  alterName?: string;
  withDate?: Date;
  withoutHazardous?: boolean;
};

const HeaderSecondary: React.FC<HeaderSecondaryProps> = ({ withIcon, withDate, withoutHazardous, alterName }) => {
  const { selecetedMetric, changeMetric, showHazardous, changeShowHazardous } = useAsteroidContext();

  return (
    <Fragment>
      <header className={classes.headerSecondary}>
        {withIcon ? (
          <div className={classes.withIcon}>
            <div className={classes.mobileWithIcon}>
              <HeaderWrapper
                title={alterName ? alterName : "Ближайшие подлёты"}
                withDate={withDate}
                childrenInTitle={<div className={classes.iconWrapper}>{withIcon}</div>}>
                <div className={classes.controlsWrapper}>
                  <div className={classes.controls}>
                    <div className={classes.metricsSwitch}>
                      <span>Отображать расстояние:</span>
                      <ul>
                        {Object.keys(Metrics)
                          .filter((s) => isNaN(Number(s)))
                          .map((metric, index) => {
                            return (
                              <Fragment key={index}>
                                {index !== 0 ? <li key={index}>|</li> : <></>}
                                <li key={index !== 0 ? index + 1 : 0}>
                                  <Button
                                    onClick={() => changeMetric(metric as MetricsKey)}
                                    active={selecetedMetric === metric}
                                    asLink>
                                    {Metrics[metric as keyof typeof Metrics]}
                                  </Button>
                                </li>
                              </Fragment>
                            );
                          })}
                      </ul>
                    </div>
                    {!withoutHazardous ? (
                      <div className={classes.hazardousSwitch}>
                        <input
                          id='showHazardous'
                          type={"checkbox"}
                          checked={showHazardous}
                          onChange={() => changeShowHazardous()}
                        />
                        <label htmlFor='showHazardous'>Показать только опасные</label>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </HeaderWrapper>
            </div>
            <div className={classes.laptopWithIcon}>
              <div className={classes.iconWrapper}>{withIcon}</div>
              <HeaderWrapper title={alterName ? alterName : "Ближайшие подлёты"} withDate={withDate}>
                <div className={classes.controls}>
                  <div className={classes.metricsSwitch}>
                    <span>Отображать расстояние:</span>
                    <ul>
                      {Object.keys(Metrics)
                        .filter((s) => isNaN(Number(s)))
                        .map((metric, index) => {
                          return (
                            <Fragment key={index}>
                              {index !== 0 ? <li key={index}>|</li> : <></>}
                              <li key={index !== 0 ? index + 1 : 0}>
                                <Button
                                  onClick={() => changeMetric(metric as MetricsKey)}
                                  active={selecetedMetric === metric}
                                  asLink>
                                  {Metrics[metric as keyof typeof Metrics]}
                                </Button>
                              </li>
                            </Fragment>
                          );
                        })}
                    </ul>
                  </div>
                  {!withoutHazardous ? (
                    <div className={classes.hazardousSwitch}>
                      <input
                        id='showHazardous'
                        type={"checkbox"}
                        checked={showHazardous}
                        onChange={() => changeShowHazardous()}
                      />
                      <label htmlFor='showHazardous'>Показать только опасные</label>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </HeaderWrapper>
            </div>
          </div>
        ) : (
          <div className={classes.withoutIcon}>
            <HeaderWrapper title={alterName ? alterName : "Ближайшие подлёты"} withDate={withDate}>
              <div className={classes.controlsWrapper}>
                <div className={classes.controls}>
                  <div className={classes.metricsSwitch}>
                    <span>Отображать расстояние:</span>
                    <ul>
                      {Object.keys(Metrics)
                        .filter((s) => isNaN(Number(s)))
                        .map((metric, index) => {
                          return (
                            <Fragment key={index}>
                              {index !== 0 ? <li key={index}>|</li> : <></>}
                              <li key={index !== 0 ? index + 1 : 0}>
                                <Button
                                  onClick={() => changeMetric(metric as MetricsKey)}
                                  active={selecetedMetric === metric}
                                  asLink>
                                  {Metrics[metric as keyof typeof Metrics]}
                                </Button>
                              </li>
                            </Fragment>
                          );
                        })}
                    </ul>
                  </div>
                  {!withoutHazardous ? (
                    <div className={classes.hazardousSwitch}>
                      <input
                        id='showHazardous'
                        type={"checkbox"}
                        checked={showHazardous}
                        onChange={() => changeShowHazardous()}
                      />
                      <label htmlFor='showHazardous'>Показать только опасные</label>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </HeaderWrapper>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default HeaderSecondary;
