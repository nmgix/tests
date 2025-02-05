import { LinkData } from "../components/PageComponents/User/Content";
import structuredClone from "@ungap/structured-clone";

export const concatLinks = (links1: LinkData[] | null, links2: LinkData[] | null) => {
  let localLinks1: LinkData[] | null = structuredClone(links1);
  let localLinks2: LinkData[] | null = structuredClone(links2);

  if (!localLinks2) {
    return localLinks1;
  }
  if (!localLinks1) {
    return localLinks2;
  }

  return localLinks1.concat(localLinks2).reduce((acc, curr) => {
    let foundId = acc.find((link) => link.id === curr.id);

    if (!foundId) {
      acc.push(curr);
    }
    return acc;
  }, [] as LinkData[]);
};
