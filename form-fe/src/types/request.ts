import { IProblem, TProblemType } from "./models";

export interface ILoginReq {
  account: string;
  pwd: string;
}

export interface IRegisterReq {
  account: string;
  pwd: string;
  confirmPwd: string;
}

export interface ILogoffReq {
  account: string;
}

export interface ISetUserInfoReq {
  pwd: string;
  nickname: string;
  avatar: string;
}

export interface IChangePwdReq {
  account: string;
  newPwd: string;
  oldPwd?: string;
  confirmPwd?: string;
}

export interface IChangeAccount {
  account: string;
  newAccount: string;
}

export interface ICancelStarReq {
  id: string;
}

export interface IStarProblemReq {
  problem: Omit<IProblem<TProblemType>, "result" | "id" | "status">;
}

export interface IListReq {
  isStar: boolean;
  offset: number;
  limit: number;
}

export interface ICreateFormReq {
  title: string;
  subTitle: string;
  problems: (IProblem<TProblemType> & { isNew: boolean })[];
}

export interface IInputReq {
  formId: string;
  problems: Required<IProblem<TProblemType>>[];
}

export interface IGetFrom {
  id: string;
}

// 表单状态
export enum EFormStatus {
  delete = 1,
  normal,
  ing,
  end,
}
// 表单
export interface IForm {
  id: string;
  title: string;
  subTitle: string;
  status: EFormStatus;
  ctime: number;
  utime: number;
  author: string;
  isStar: boolean;
  problems: IProblem<TProblemType>[];
}
// 选项状态
export enum ESelectOptionStatus {
  delete = 1,
  normal,
}
// 选项
export interface ISelectOption {
  id: string;
  title: string;
  status: ESelectOptionStatus;
}
// 表单填写
