export type State = {
  containerOpacity: number | `${number}%`;
  stateLayerOpacity: number | `${number}%`;
  contentOpacity: number | `${number}%`;
};

export type States = {
  hover: State;
  focus: State;
  pressed: State;
  dragged: State;
  disabled: State;
};
