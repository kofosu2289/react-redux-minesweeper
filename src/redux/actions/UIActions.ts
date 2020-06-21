interface ITestAction {
  type: "TEST",
  payload: string,
}

export type UIActions =
| ITestAction