import BN from "bn.js";
import { Md5 } from "ts-md5";
export class ZkWasmUtil {
    static hexToBNs(hexString) {
        let bytes = new Array(hexString.length / 2);
        for (var i = 0; i < hexString.length; i += 2) {
            bytes[i] = new BN(hexString.slice(i, i + 2), 16);
        }
        return bytes;
    }
    static parseArg(input) {
        let inputArray = input.split(":");
        let value = inputArray[0];
        let type = inputArray[1];
        let re1 = new RegExp(/^[0-9A-Fa-f]+$/); // hexdecimal
        let re2 = new RegExp(/^\d+$/); // decimal
        // Check if value is a number
        if (!(re1.test(value.slice(2)) || re2.test(value))) {
            console.log("Error: input value is not an interger number");
            return null;
        }
        // Convert value byte array
        if (type == "i64") {
            let v;
            if (value.slice(0, 2) == "0x") {
                v = new BN(value.slice(2), 16);
            }
            else {
                v = new BN(value);
            }
            return [v];
        }
        else if (type == "bytes" || type == "bytes-packed") {
            if (value.slice(0, 2) != "0x") {
                console.log("Error: bytes input need start with 0x");
                return null;
            }
            let bytes = ZkWasmUtil.hexToBNs(value.slice(2));
            return bytes;
        }
        else {
            console.log("Unsupported input data type: %s", type);
            return null;
        }
    }
    static convertToMd5(value) {
        let md5 = new Md5();
        md5.appendByteArray(value);
        let hash = md5.end();
        if (!hash)
            return "";
        return hash.toString();
    }
    //this is form data 
    static createAddImageSignMessage(params) {
        //sign all the fields except the image itself and signature
        let message = "";
        message += params.name;
        message += params.image_md5;
        message += params.user_address;
        message += params.description_url;
        message += params.avator_url;
        message += params.circuit_size;
        return message;
    }
    static createProvingSignMessage(params) {
        return JSON.stringify(params);
    }
    static createDeploySignMessage(params) {
        return JSON.stringify(params);
    }
    static createResetImageMessage(params) {
        return JSON.stringify(params);
    }
    static createModifyImageMessage(params) {
        return JSON.stringify(params);
    }
}
