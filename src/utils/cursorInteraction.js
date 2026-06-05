export const cursorClasses = Object.freeze({
  auto: "cursor-auto",
  pointerClicked: "cursor-pointer-clicked",
  zoomIn: "cursor-zoom-in",
  zoomOut: "cursor-zoom-out",
});

export const cursorInteractions = Object.freeze({
  normal: cursorClasses.auto,
  button: cursorClasses.pointerClicked,
  clickable: cursorClasses.pointerClicked,
  commissionArt: cursorClasses.zoomIn,
  commissionLightbox: cursorClasses.zoomOut,
  commissionPreview: cursorClasses.zoom,
});

export const getCursorClass = (interaction = "normal") =>
  cursorInteractions[interaction] ??
  cursorClasses[interaction] ??
  cursorClasses.auto;

export const withCursorClass = (interaction, className = "") =>
  [getCursorClass(interaction), className].filter(Boolean).join(" ");
