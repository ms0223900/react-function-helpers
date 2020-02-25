import { PercentXY } from "../types";
import { regularizeNumberToDigit2 } from '../fn';

const halfPercent = 50;
const degreeCorrection = 90;

const getDegreeFromPercentXY = (percentXY: PercentXY) => {
  const {
    percentX,
    percentY,
  } = percentXY;
  const vectorX = percentX - halfPercent;
  const vectorY = percentY - halfPercent;

  const turn = Math.atan2(vectorY, vectorX);
  const rawDegree = turn / Math.PI * 180;

  const degree = regularizeNumberToDigit2(rawDegree, 0);
  const correctedDegree = degree + degreeCorrection;
  return correctedDegree;
};

export default getDegreeFromPercentXY;