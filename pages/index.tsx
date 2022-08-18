import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { ScrollableView } from "../components/ScrollableView";

const Home: NextPage = () => {
  return (
    <div>
      <Button>Любой контент</Button>
      <Button asLink>Любой контент</Button>
      <div style={{ height: "500px" }}>
        <ScrollableView>
          <ul style={{ display: "flex", flexDirection: "column" }}>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
            <li>
              <Button>Любой контент</Button>
            </li>
          </ul>
        </ScrollableView>
      </div>
      <Icon icon='asteroid.svg' size='m' />
      <Icon icon='dinosaur.svg' size='xl' />
    </div>
  );
};

export default Home;
