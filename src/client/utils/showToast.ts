import { Toaster, Intent, IconName } from "@blueprintjs/core";

const toaster = Toaster.create({
  position: "bottom-left"
});

export function showToast({
  message,
  intent,
  icon
}: {
  message: string;
  intent?: Intent;
  icon?: IconName;
}) {
  toaster.show({
    message,
    intent,
    icon
  });
}
