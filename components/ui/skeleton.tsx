import { Skeleton } from "moti/skeleton";
import React from "react";
import { DimensionValue } from "react-native";

export type SkeletonBaseProps = {
  width?: DimensionValue;
  height: number;
  radius?:"round"|"square"
};

const SkeletonBase = ({ width = "100%", height, radius="square" }: SkeletonBaseProps) => {

  return (
    <Skeleton
      colorMode={"light"}
      width={width} // Percentage, number, or 'auto'
      height={height} // Number (e.g., fontSize
      radius={radius}
      
    />
  );
};

type SkeletonCircleProps = {
  size?: number;
};

const SkeletonCircle = ({ size = 50 }: SkeletonCircleProps) => {

  return (
    <Skeleton colorMode={"light"} width={size} height={size} radius="round" />
  );
};

export {
    SkeletonBase,
    SkeletonCircle
};

