export interface Direction {
  directionId: string;
  cookingDirection: string;
  cookingStepNumber: number;
}

export class DirectionFormValues {
  directionId: string = "";
  cookingDirection: string = "";
  cookingStepNumber: number = 0;
}
