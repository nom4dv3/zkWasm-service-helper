import { QueryParams, ProvingParams, DeployParams, Statistics, AddImageParams, WithSignature, UserQueryParams, PaymentParams, TxHistoryQueryParams, LogQuery, ResetImageParams } from "../interface/interface.js";
import { ZkWasmServiceEndpoint } from "./endpoint.js";
export declare class ZkWasmServiceHelper {
    endpoint: ZkWasmServiceEndpoint;
    constructor(endpoint: string, username: string, useraddress: string);
    queryImage(md5: string): Promise<any>;
    queryUser(user_query: UserQueryParams): Promise<any>;
    queryTxHistory(history_query: TxHistoryQueryParams): Promise<any>;
    queryConfig(): Promise<any>;
    loadStatistics(): Promise<Statistics>;
    loadTasks(query: QueryParams): Promise<any>;
    queryLogs(query: WithSignature<LogQuery>): Promise<any>;
    addPayment(payRequest: PaymentParams): Promise<any>;
    addNewWasmImage(task: WithSignature<AddImageParams>): Promise<any>;
    addProvingTask(task: WithSignature<ProvingParams>): Promise<any>;
    parseProvingTaskInput(rawInputs: string): Array<string>;
    addDeployTask(task: WithSignature<DeployParams>): Promise<any>;
    addResetTask(task: WithSignature<ResetImageParams>): Promise<any>;
}
