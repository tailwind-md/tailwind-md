type StateOpacitySet = {
  containerOpacity: number | `${number}%`;
  stateLayerOpacity: number | `${number}%`;
  contentOpacity: number | `${number}%`;
};

export type SystemStates = {
  hover: StateOpacitySet;
  focus: StateOpacitySet;
  pressed: StateOpacitySet;
  dragged: StateOpacitySet;
  disabled: StateOpacitySet;
};
