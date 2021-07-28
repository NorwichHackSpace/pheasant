import { useReducer } from "react";

export const CONFIG_EDITED = "CONFIG_EDITED";
export const CONFIG_SAVE = "CONFIG_SAVE";
export const SUBJECT_SELECTED = "SUBJECT_SELECTED";
export const USER_CONFIG_RECEIVED = "USER_CONFIG_RECEIVED";
export const USER_CONFIG_SUBJECTS_RECEIVED = "USER_CONFIG_SUBJECTS_RECEIVED";

function reducer(state, action) {
  switch (action.type) {
    case CONFIG_EDITED:
      return { ...state, userEditedConfig: action.userEditedConfig };
    case CONFIG_SAVE:
      return { ...state, userConfigSave: true };
    case SUBJECT_SELECTED:
      return {
        ...state,
        selectedSubject: action.selectedSubject,
        userEditedConfig: "",
      };
    case USER_CONFIG_RECEIVED:
      return {
        ...state,
        userConfigs: {
          ...state.userConfigs,
          [action.selectedSubject]: action.userConfig,
        },
      };
    case USER_CONFIG_SUBJECTS_RECEIVED:
      return { ...state, subjects: action.subjects };
    default:
      throw new Error();
  }
}

export default function useApp() {
  return useReducer(reducer, {
    selectedSubject: "",
    subjects: [
      "/PRIVATE/FX/SALES/CONFIG",
      "/PRIVATE/FX/SALES/CONFIG/TOBOUSER/user1@caplin.com",
      "/PRIVATE/FX/SALES/CONFIG/TOBOUSER/admin",
      "/PRIVATE/FX/admin/SALES/CONFIG",
    ],
    userConfigs: {},
    userEditedConfig: "",
    userConfigSave: false,
  });
}
