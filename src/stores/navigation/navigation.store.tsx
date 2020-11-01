import { observable } from "mobx";

export const NavigationStore = {
    path: observable.box<string>(),
}