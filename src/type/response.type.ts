export interface BaseResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
}
