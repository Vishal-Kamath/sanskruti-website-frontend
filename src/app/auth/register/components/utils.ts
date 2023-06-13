import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { RootState } from "@/redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import z from "zod";

export const validateType = (
  value: any,
  schema: z.ZodSchema,
  onErrorMessage: NotificationType,
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => {
  try {
    schema.parse(value);
    return true;
  } catch {
    dispatch(setNotification(onErrorMessage));
    dispatch(showNotification());
    return false;
  }
};
