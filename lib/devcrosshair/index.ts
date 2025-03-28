import { getInitialState } from "./state";
import { createUI } from "./ui";
import {
  rgbToHex,
  showNotification,
  copyUsingExecCommand,
  calculateDistance,
} from "./utils";
import { initUI } from "./ui-init";
import { updateGrid } from "./grid";
import {
  positionDisplays,
  updateElementInfo,
  updateFontInfo,
  updateMeasurement,
} from "./display";
import {
  handleMouseMove,
  handleKeyUp,
  handleClick,
  handleKeyDown,
} from "./handlers";
import {
  toggleActive,
  toggleCoordinates,
  toggleElementInfo,
  toggleFontInfo,
  toggleMeasureMode,
  toggleGrid,
  copyInfo,
} from "./controls";
import { showSettings } from "./settings";
import { cleanup } from "./cleanup";
import { init } from "./init";

export function generateDevCrosshairScript(): string {
  return `(function(){
${getInitialState()}

${createUI()}

${rgbToHex()}

${showNotification()}

${copyUsingExecCommand()}

${calculateDistance()}

${positionDisplays()}

${updateElementInfo()}

${updateFontInfo()}

${updateMeasurement()}

${updateGrid()}

${toggleActive()}

${toggleCoordinates()}

${toggleElementInfo()}

${toggleFontInfo()}

${toggleMeasureMode()}

${toggleGrid()}

${copyInfo()}

${showSettings()}

${handleMouseMove()}

${handleClick()}

${handleKeyDown()}

${handleKeyUp()}

${cleanup()}

${initUI()}

${init()}

init();
})();`;
}
