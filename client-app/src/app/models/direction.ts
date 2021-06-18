export interface Direction {
  directionId: string;
  cookingDirection: string;
  cookingStepNumber: number;
}

export class DirectionFormValues {
  cookingStepNumber: number = 0;
  cookingDirection: string = "";
}
