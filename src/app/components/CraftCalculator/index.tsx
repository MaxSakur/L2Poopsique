"use client";

import React, { FC, ReactElement, SyntheticEvent, useCallback, useState } from "react";
import Column from "../Column";
import { sWeapons } from "@/assets/s_weapons";
import { sArmor } from "@/assets/s_armor";
import { sAccessories } from "@/assets/s_accesories";
import styles from "./CraftCalculator.module.css";
import Image, { StaticImageData } from "next/image";
import Divider from "../Divider";
import { IoIosRemoveCircle } from "react-icons/io";
import {
  convertItemsToFangs,
  convertItemsToResources,
  getAA,
  randomizeColor,
} from "@/utils";

export type CraftItem = {
  name: string;
  count: number;
};

export type CraftCollection = CraftItem[];

type CraftCategoryImagesProps = {
  data: { [name: string]: StaticImageData };
  onPress: (itemName: string) => void;
  categoryLabel?: string;
  onRemove: (itemName: string) => void;
  chosenData: any[];
};

const CraftCategoryImages: FC<CraftCategoryImagesProps> = ({
  data,
  onPress,
  chosenData,
  categoryLabel,
  onRemove,
}) => {
  const handleImageClick = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.target instanceof HTMLImageElement) {
      onPress(e.target.alt);
    }
  };

  const handleCountRender = (name: string): ReactElement | undefined => {
    if (chosenData.some((el) => el.name === name)) {
      const filteredItem: CraftItem = chosenData.filter(
        (el) => el.name === name
      )[0];
      return (
        <div className={styles.controls}>
          <div className={styles.remove} onClick={() => onRemove(name)}>
            <IoIosRemoveCircle size={20} />
          </div>
          <div className={styles.counter}>{filteredItem.count}</div>
        </div>
      );
    }
  };

  return (
    <Divider style={styles.itemCollection} text={categoryLabel}>
      {Object.entries(data).map(([name, src]) => (
        <div key={name} className={styles.imageClickableContainer}>
          {chosenData.length !== 0 && handleCountRender(name)}
          <Image
            src={src}
            alt={name}
            onClick={handleImageClick}
            className={styles.itemImage}
          />
        </div>
      ))}
    </Divider>
  );
};

const CraftCalculator = () => {
  const [craftCollection, setCraftCollection] = useState<CraftCollection>([]);

  const imagesData = [
    { label: "Weapons", data: sWeapons },
    { label: "Armors", data: sArmor },
    { label: "Accessories", data: sAccessories },
  ];

  useCallback(()=>{}, [])

  const handleAppToCollection = (itemName: string) => {
    setCraftCollection((prev) => {
      const existingItem = prev.find((item) => item.name === itemName);
      if (existingItem) {
        return prev.map((item) =>
          item.name === itemName ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { name: itemName, count: 1 }];
      }
    });
  };

  const handleRemoveFromCollection = (itemName: string) => {
    setCraftCollection((prev) => {
      const res = prev.filter((item) => item.name !== itemName);
      return res;
    });
  };

  return (
    <div className={styles.craftContainer}>
      <Column>
        {imagesData.map(({ data, label }, index) => (
          <CraftCategoryImages
            key={index}
            data={data}
            categoryLabel={label}
            chosenData={craftCollection}
            onPress={(e) => handleAppToCollection(e)}
            onRemove={(e) => handleRemoveFromCollection(e)}
          />
        ))}
      </Column>
      <Column>
        <Divider style={styles.itemCollection} text={"All Resources"}>
          {convertItemsToResources(craftCollection).map(
            (el: CraftItem, index: number) => {
              const lineColor = randomizeColor();
              return (
                <div
                  className={styles.resource}
                  key={index}
                  style={{ borderBottomColor: lineColor }}
                >
                  <p style={{ color: lineColor }}>{el.name}</p>
      
                  <p style={{ color: lineColor }}>{el.count}</p>
                </div>
              );
            }
          )}
        </Divider>
      </Column>

      <Column>
        <Divider style={styles.itemCollection} text={"Stokato Nest"}>
          <p>
            {convertItemsToFangs(
              convertItemsToResources(craftCollection)
            ).totalFangs.toFixed(0)}
          </p>
        </Divider>
        <Divider style={styles.restCollection} text={"Rest items"}>
          {convertItemsToFangs(
            convertItemsToResources(craftCollection)
          ).unmatchedItems.map((el, index) => {
            return (
              <div key={index} className={styles.restResource}>
                <p>{el.name} </p>
                <p>{el.count} </p>
              </div>
            );
          })}
        </Divider>
        <Divider style={styles.itemCollection} text={"AA to unseal"}>
          {(getAA(craftCollection) * 1000000).toFixed(0)}
        </Divider>
      </Column>
    </div>
  );
};

export default CraftCalculator;
