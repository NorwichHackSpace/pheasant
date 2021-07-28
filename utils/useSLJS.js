import { useEffect } from "react";
import { USER_CONFIG_RECEIVED, USER_CONFIG_SUBJECTS_RECEIVED } from "./useApp";

export default function useSLJS(
  selectedSubject,
  streamLink,
  dispatch,
  userConfigSave,
  state
) {
  useEffect(() => {
    const modifiedUserConfig = JSON.stringify(
      state.userConfigs[state.selectedSubject]
    );
    const publishSubject = "/PRIVATE/CONFIGMODIFICATION";
    console.log(modifiedUserConfig);
    if (modifiedUserConfig) {
      streamLink.publishToSubject(
        publishSubject,
        modifiedUserConfig,
        {
          onCommandError: function (subject, commandErrorEvent) {
            console.log(
              "Publish Error to subject: " +
                subject +
                " Error:" +
                commandErrorEvent.getError()
            );
          },
          onCommandOk: function (subject) {
            console.log("Publish to " + subject + " Succesful");
          },
        },
        null
      );
    }
  }, [userConfigSave]);

  useEffect(() => {
    if (selectedSubject === "") {
      return;
    }

    const subscriptionListener = {
      onSubscriptionError(_, evt) {
        console.error(evt.toString());
      },
      onSubscriptionStatus(_, evt) {
        console.log(evt.toString());
      },
      onRecordUpdate(_, evt) {
        const jsonString = evt.getFields().json;
        const userConfig = JSON.parse(jsonString);

        dispatch({ type: USER_CONFIG_RECEIVED, selectedSubject, userConfig });
      },
    };
    const subscription = streamLink.subscribe(
      selectedSubject,
      subscriptionListener
    );

    return () => subscription.unsubscribe();
  }, [selectedSubject, streamLink, dispatch]);

  //I can't remember what this is used for???

  // useEffect(() => {
  //   let subjects = [];
  //   const subscriptionListener = {
  //     onSubscriptionError(_, evt) {
  //       console.error(evt.toString());
  //     },
  //     onSubscriptionStatus(_, evt) {},

  //     onContainerUpdate(_, evt) {
  //       evt.updateModel({
  //         clear() {
  //           subjects = [];
  //         },
  //         insert(index, element) {
  //           subjects.splice(index, 0, element.getSubject());
  //         },
  //       });
  //       dispatch({ type: USER_CONFIG_SUBJECTS_RECEIVED, subjects });
  //     },
  //   };
  //   const subscription = streamLink.subscribe(
  //     "/PRIVATE/FX/SALES/CONFIG/TOBOUSER/user1@caplin.com",
  //     subscriptionListener
  //   );

  //   return () => subscription.unsubscribe();
  // }, [streamLink, dispatch]);
}
