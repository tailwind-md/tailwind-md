export type State = {
  containerOpacity?: number | `${number}%`;
  contentOpacity?: number | `${number}%`;
  stateLayerOpacity?: number | `${number}%`;
};

export type States = {
  hovered: State;
  focused: State;
  pressed: State;
  dragged: State;
  disabled: State;
  selected: State;
  activated: State;
  enabled: State;
};
